import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProgressSchema, insertQuizResponseSchema, loginSchema, createUserByAdminSchema, insertChatConversationSchema, insertChatMessageSchema } from "@shared/schema";
import { generateContextualHint, generateQuizHint, explainConcept } from "./ai-hints";
import { generateChatResponse, generateCommunicationDraft } from "./chat-service";
import { authenticateUser, authMiddleware, adminMiddleware, companyAdminMiddleware, superAdminMiddleware, hashPassword, verifyPassword } from "./auth";
import { vapiService } from "./vapi-service";
import bcrypt from "bcryptjs";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database on startup
  const { initializeDatabase } = await import('./init-db');
  await initializeDatabase();

  // Public auth routes (no authentication required)
  app.post('/api/auth/login', async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Request body is required" });
      }
      const loginData = loginSchema.parse(req.body);
      const result = await authenticateUser(loginData);
      
      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Return user data without password
      const { password, ...userWithoutPassword } = result.user;
      res.json({ user: userWithoutPassword, token: result.token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid login data", errors: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Protected auth routes
  app.get('/api/auth/user', authMiddleware, async (req: any, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const { password, ...userWithoutPassword } = req.user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });


  // Profile routes
  app.get('/api/users/profile', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const user = await storage.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const progress = await storage.getUserProgress(userId);
      
      // Calculate stats
      const completedModules = progress.filter(p => p.progressType === 'module_completed').length;
      const totalModules = await storage.getModules();
      const quizzes = await storage.getUserQuizResponses(userId);
      const avgScore = 0; // Since we don't have quiz responses stored yet
      
      const profileData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: "", // User model doesn't have phone field
        location: "", // User model doesn't have location field
        role: user.role,
        joinedDate: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(),
        completedModules,
        totalModules: totalModules.length,
        certifications: 0,
        avgQuizScore: avgScore
      };
      
      res.json(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.patch('/api/users/profile', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const updates = req.body;
      const updatedUser = await storage.updateUser(userId, updates);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.get('/api/users/stats', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      
      const progress = await storage.getUserProgress(userId);
      const quizzes = await storage.getUserQuizResponses(userId);
      const modulesCompleted = progress.filter(p => p.progressType === 'module_completed').length;
      const quizzesPassed = progress.filter(p => p.progressType === 'quiz_passed').length;
      
      const stats = {
        totalTrainingHours: Math.round(modulesCompleted * 1.5),
        modulesCompleted,
        quizzesPassed,
        currentStreak: Math.floor(Math.random() * 7) + 1,
        rank: modulesCompleted >= 10 ? "Expert" : modulesCompleted >= 5 ? "Advanced" : modulesCompleted >= 2 ? "Intermediate" : "Beginner",
        points: modulesCompleted * 100 + quizzesPassed * 50
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Change password endpoint for users
  app.post('/api/users/change-password', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      
      // Get user with password
      const user = await storage.getUser(userId);
      if (!user || !user.password) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Verify current password
      const isValidPassword = await verifyPassword(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      
      // Hash new password and update
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUser(userId, { password: hashedPassword });
      
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // Admin routes
  app.post('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "Request body is required" });
      }
      const userData = createUserByAdminSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      
      // Hash password and create user
      const hashedPassword = await hashPassword(userData.password);
      const { password, ...userDataWithoutPassword } = userData;
      
      const newUser = await storage.createUser({
        ...userDataWithoutPassword,
        password: hashedPassword
      });
      
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      // Remove passwords from response
      const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.put('/api/admin/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const updateData = req.body;
      const updatedUser = await storage.updateUser(id, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.put('/api/admin/users/:id/password', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await storage.updateUser(id, { password: hashedPassword });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // VAPI Role-Play Training Routes
  app.get('/api/vapi/config', authMiddleware, async (_req: any, res) => {
    try {
      const assistantId = process.env.VAPI_ASSISTANT_ID || 'd2794e4d-af9a-4fe3-8f56-2ebd781d2c6a';
      const publicKey = process.env.VAPI_PUBLIC_KEY || 'c4cdfc01-71c2-49e7-b13c-c8ba6e109ce2';
      res.json({ assistantId, publicKey });
    } catch (error) {
      console.error('Error fetching VAPI config:', error);
      res.status(500).json({ message: 'Failed to fetch VAPI config' });
    }
  });
  app.get('/api/vapi/agent', authMiddleware, async (req: any, res) => {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) {
        return res.status(400).json({ message: "User not associated with a company" });
      }
      
      const agent = await vapiService.getOrCreateVapiAgent(companyId);
      if (!agent) {
        return res.status(500).json({ message: "Failed to get or create VAPI agent" });
      }
      
      res.json(agent);
    } catch (error) {
      console.error("Error fetching VAPI agent:", error);
      res.status(500).json({ message: "Failed to fetch VAPI agent" });
    }
  });
  
  app.post('/api/vapi/start-call', authMiddleware, async (req: any, res) => {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) {
        return res.status(400).json({ message: "User not associated with a company" });
      }
      
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
      }
      
      const agent = await vapiService.getOrCreateVapiAgent(companyId);
      if (!agent) {
        return res.status(500).json({ message: "Failed to get VAPI agent" });
      }
      
      const call = await vapiService.startPhoneCall(agent, phoneNumber);
      if (!call) {
        return res.status(500).json({ message: "Failed to start phone call" });
      }
      
      res.json(call);
    } catch (error) {
      console.error("Error starting VAPI call:", error);
      res.status(500).json({ message: "Failed to start phone call" });
    }
  });

  // VAPI web call endpoint for browser-based voice training
  app.post('/api/vapi/start-web-call', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      const companyId = req.user?.companyId;
      
      if (!userId || !companyId) {
        return res.status(401).json({ message: "User not authenticated or company not found" });
      }
      
      // Get or create VAPI agent for the company
      const agent = await vapiService.getOrCreateVapiAgent(companyId);
      if (!agent) {
        return res.status(500).json({ message: "Failed to get VAPI agent configuration" });
      }
      
      // Start the web call for training
      const callResult = await vapiService.startWebCall(agent, userId);
      
      if (callResult?.error) {
        return res.status(500).json({ 
          message: "Failed to start web call", 
          error: callResult.error,
          details: callResult.details
        });
      }
      
      res.json({
        message: "Web call started successfully",
        call: callResult,
        assistantId: agent.vapiAssistantId || (process.env.VAPI_ASSISTANT_ID || 'd2794e4d-af9a-4fe3-8f56-2ebd781d2c6a'),
        publicKey: process.env.VAPI_PUBLIC_KEY || 'c4cdfc01-71c2-49e7-b13c-c8ba6e109ce2'
      });
      
    } catch (error) {
      console.error("Error starting web call:", error);
      res.status(500).json({ message: "Failed to start web call" });
    }
  });
  

  // VAPI call termination endpoint
  app.delete("/api/vapi/calls/:callId", authMiddleware, async (req: any, res) => {
    try {
      const { callId } = req.params;
      
      if (!callId) {
        return res.status(400).json({ message: "Call ID is required" });
      }
      
      const success = await vapiService.endCall(callId);
      
      if (!success) {
        return res.status(500).json({ message: "Failed to end call" });
      }
      
      res.json({ message: "Call ended successfully", callId });
    } catch (error) {
      console.error("Error ending VAPI call:", error);
      res.status(500).json({ message: "Failed to end call" });
    }
  });
  app.put('/api/vapi/agent/:agentId', authMiddleware, companyAdminMiddleware, async (req: any, res) => {
    try {
      const { agentId } = req.params;
      const updates = req.body;
      
      const updatedAgent = await vapiService.updateAgentConfiguration(agentId, updates);
      if (!updatedAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      res.json(updatedAgent);
    } catch (error) {
      console.error("Error updating VAPI agent:", error);
      res.status(500).json({ message: "Failed to update VAPI agent" });
    }
  });

  // Company management routes (for admins)
  app.get('/api/company', authMiddleware, async (req: any, res) => {
    try {
      const companyId = req.user?.companyId;
      if (!companyId) {
        return res.status(400).json({ message: "User not associated with a company" });
      }
      
      const company = await storage.getCompany(companyId);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });
  
  app.put('/api/company', authMiddleware, companyAdminMiddleware, async (req: any, res) => {
    try {
      const companyId = req.companyId || req.user?.companyId;
      if (!companyId) {
        return res.status(400).json({ message: "Company ID not found" });
      }
      
      const updates = req.body;
      const updatedCompany = await storage.updateCompany(companyId, updates);
      
      if (!updatedCompany) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(updatedCompany);
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ message: "Failed to update company" });
    }
  });

  // User notes routes
  app.get('/api/notes', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const notes = await storage.getUserNotes(userId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });
  
  app.get('/api/lessons/:lessonId/notes', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      const { lessonId } = req.params;
      
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const notes = await storage.getNotesByLesson(userId, lessonId);
      res.json(notes);
    } catch (error) {
      console.error("Error fetching lesson notes:", error);
      res.status(500).json({ message: "Failed to fetch lesson notes" });
    }
  });
  
  app.post('/api/notes', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Determine noteType based on context
      let noteType = 'general';
      if (req.body.lessonId) {
        noteType = 'lesson';
      } else if (req.body.moduleId) {
        noteType = 'module';
      } else if (req.body.trackId) {
        noteType = 'track';
      }
      
      const noteData = {
        ...req.body,
        userId,
        noteType
      };
      
      const note = await storage.createUserNote(noteData);
      res.json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ message: "Failed to create note" });
    }
  });
  
  app.put('/api/notes/:noteId', authMiddleware, async (req: any, res) => {
    try {
      const { noteId } = req.params;
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }
      
      const updatedNote = await storage.updateUserNote(noteId, content);
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      res.json(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Failed to update note" });
    }
  });
  
  app.delete('/api/notes/:noteId', authMiddleware, async (req: any, res) => {
    try {
      const { noteId } = req.params;
      
      await storage.deleteUserNote(noteId);
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ message: "Failed to delete note" });
    }
  });

  // Training tracks
  app.get('/api/tracks', authMiddleware, async (req, res) => {
    try {
      const tracks = await storage.getTrainingTracks();
      res.json(tracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).json({ message: "Failed to fetch training tracks" });
    }
  });

  // Training modules for a track
  app.get('/api/tracks/:trackId/modules', authMiddleware, async (req, res) => {
    try {
      const { trackId } = req.params;
      const modules = await storage.getTrainingModules(trackId);
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ message: "Failed to fetch training modules" });
    }
  });

  // Lessons for a module
  app.get('/api/modules/:moduleId/lessons', authMiddleware, async (req, res) => {
    try {
      const { moduleId } = req.params;
      const lessons = await storage.getLessons(moduleId);
      res.json(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).json({ message: "Failed to fetch lessons" });
    }
  });

  // Get specific lesson
  app.get('/api/lessons/:lessonId', authMiddleware, async (req, res) => {
    try {
      const { lessonId } = req.params;
      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error) {
      console.error("Error fetching lesson:", error);
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // User progress
  app.get('/api/users/progress', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const progress = await storage.getUserProgress(userId);
      
      // Get tracks with modules for sidebar display
      const tracks = await storage.getTrainingTracks();
      const sidebarData = {
        overall: {
          completed: 0,
          total: 3 // Total modules across all tracks for now
        },
        tracks: await Promise.all(tracks.map(async (track) => {
          const modules = await storage.getTrainingModules(track.id);
          return {
            id: track.id,
            name: track.name,
            icon: track.icon || 'fas fa-book',
            color: track.color || 'blue',
            completed: 0, // For now, will be calculated based on actual progress
            total: modules.length,
            modules: modules.map(module => ({
              id: module.id,
              title: module.title,
              completed: false // For now, will be calculated based on actual progress
            }))
          };
        }))
      };
      
      res.json(sidebarData);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Mark lesson as completed
  app.post('/api/progress/lesson', authMiddleware, async (req: any, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      if (!req.body) {
        return res.status(400).json({ message: "Request body is required" });
      }
      const userId = req.user.id;
      const progressData = insertProgressSchema.parse({
        ...req.body,
        userId,
        progressType: 'lesson_completed'
      });
      
      const progress = await storage.recordProgress(progressData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      console.error("Error recording progress:", error);
      res.status(500).json({ message: "Failed to record progress" });
    }
  });

  // Quiz questions for a lesson or module
  app.get('/api/quiz/:type/:id', authMiddleware, async (req, res) => {
    try {
      const { type, id } = req.params;
      let questions;
      
      if (type === 'lesson') {
        questions = await storage.getQuizQuestions(id, 'lesson');
      } else if (type === 'module') {
        questions = await storage.getQuizQuestions(id, 'module');
      } else {
        return res.status(400).json({ message: "Invalid quiz type" });
      }
      
      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Submit quiz responses
  app.post('/api/quiz/submit', authMiddleware, async (req: any, res) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      if (!req.body) {
        return res.status(400).json({ message: "Request body is required" });
      }
      const userId = req.user.id;
      const { responses, quizType, quizId } = req.body;
      
      // Validate responses
      const validatedResponses = z.array(insertQuizResponseSchema).parse(responses);
      
      const result = await storage.submitQuizResponses(userId, validatedResponses, quizType, quizId);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid quiz responses", errors: error.errors });
      }
      console.error("Error submitting quiz:", error);
      res.status(500).json({ message: "Failed to submit quiz" });
    }
  });

  // User certifications
  app.get('/api/users/certifications', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const certifications = await storage.getUserCertifications(userId);
      res.json(certifications);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  // Dashboard stats
  app.get('/api/dashboard/stats', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // AI Hints endpoints
  app.post('/api/ai/hint', authMiddleware, async (req: any, res) => {
    try {
      const { moduleTitle, lessonTitle, lessonContent, userQuestion, previousHints } = req.body;
      
      if (!moduleTitle || !lessonTitle || !lessonContent) {
        return res.status(400).json({ message: "Missing required context" });
      }
      
      const hint = await generateContextualHint({
        moduleTitle,
        lessonTitle,
        lessonContent,
        userQuestion,
        previousHints
      });
      
      res.json({ hint });
    } catch (error) {
      console.error("Error generating hint:", error);
      res.status(500).json({ message: "Failed to generate hint" });
    }
  });

  app.post('/api/ai/quiz-hint', authMiddleware, async (req: any, res) => {
    try {
      const { question, options, moduleContext } = req.body;
      
      if (!question || !options || !moduleContext) {
        return res.status(400).json({ message: "Missing required quiz context" });
      }
      
      const hint = await generateQuizHint(question, options, moduleContext);
      res.json({ hint });
    } catch (error) {
      console.error("Error generating quiz hint:", error);
      res.status(500).json({ message: "Failed to generate quiz hint" });
    }
  });

  app.post('/api/ai/explain', authMiddleware, async (req: any, res) => {
    try {
      const { concept, moduleContext } = req.body;
      
      if (!concept || !moduleContext) {
        return res.status(400).json({ message: "Missing concept or context" });
      }
      
      const explanation = await explainConcept(concept, moduleContext);
      res.json({ explanation });
    } catch (error) {
      console.error("Error explaining concept:", error);
      res.status(500).json({ message: "Failed to explain concept" });
    }
  });

  // Chat routes
  app.get('/api/chat/conversations', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const conversations = await storage.getChatConversations(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.post('/api/chat/conversations', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { title } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
      
      const conversationData = insertChatConversationSchema.parse({
        userId,
        title
      });
      
      const conversation = await storage.createChatConversation(conversationData);
      res.status(201).json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid conversation data", errors: error.errors });
      }
      console.error("Error creating conversation:", error);
      res.status(500).json({ message: "Failed to create conversation" });
    }
  });

  app.get('/api/chat/conversations/:id/messages', authMiddleware, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Verify user owns this conversation
      const conversations = await storage.getChatConversations(userId);
      const conversation = conversations.find(c => c.id === id);
      
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      
      const messages = await storage.getChatMessages(id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/chat/conversations/:id/messages', authMiddleware, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Message content is required" });
      }
      
      // Verify user owns this conversation
      const conversations = await storage.getChatConversations(userId);
      const conversation = conversations.find(c => c.id === id);
      
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      
      // Save user message
      const userMessageData = insertChatMessageSchema.parse({
        conversationId: id,
        role: 'user',
        content
      });
      
      const userMessage = await storage.addChatMessage(userMessageData);
      
      // Get conversation history for context
      const allMessages = await storage.getChatMessages(id);
      const conversationHistory = allMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Generate AI response
      const aiResponse = await generateChatResponse(
        content,
        {
          userId,
          userRole: req.user.role,
        },
        conversationHistory.slice(0, -1) // Exclude the current message
      );
      
      // Save AI response
      const aiMessageData = insertChatMessageSchema.parse({
        conversationId: id,
        role: 'assistant',
        content: aiResponse
      });
      
      const aiMessage = await storage.addChatMessage(aiMessageData);
      
      // Return both messages
      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.post('/api/chat/draft-communication', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { type, purpose, recipient, details } = req.body;
      
      if (!type || !purpose || !recipient || !details) {
        return res.status(400).json({ message: "All fields are required: type, purpose, recipient, details" });
      }
      
      // Debug: Check what API key we have
      const apiKey = process.env.OPENAI_API_KEY;
      console.log('Draft communication - API Key status:', apiKey ? `Available (starts with: ${apiKey.substring(0, 15)}...)` : 'Not found');
      
      const draft = await generateCommunicationDraft(
        type,
        purpose,
        recipient,
        details,
        {
          userId,
          userRole: req.user.role,
        }
      );
      
      res.json({ draft });
    } catch (error) {
      console.error("Error generating communication draft:", error);
      res.status(500).json({ message: "Failed to generate communication draft" });
    }
  });

  app.put('/api/chat/conversations/:id/title', authMiddleware, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const { title } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
      
      // Verify user owns this conversation
      const conversations = await storage.getChatConversations(userId);
      const conversation = conversations.find(c => c.id === id);
      
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      
      const updatedConversation = await storage.updateConversationTitle(id, title);
      res.json(updatedConversation);
    } catch (error) {
      console.error("Error updating conversation title:", error);
      res.status(500).json({ message: "Failed to update conversation title" });
    }
  });

  // Video upload and serving endpoints
  app.post('/api/videos/upload', authMiddleware, async (req: any, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getVideoUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting video upload URL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get('/api/videos/:videoId', async (req, res) => {
    try {
      const { videoId } = req.params;
      const objectStorageService = new ObjectStorageService();
      const videoFile = await objectStorageService.getVideoFile(`/videos/${videoId}`);
      objectStorageService.downloadObject(videoFile, res);
    } catch (error) {
      console.error("Error serving video:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // Update lesson with video URL
  app.put('/api/lessons/:id/video', authMiddleware, adminMiddleware, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { videoUrl } = req.body;

      if (!videoUrl) {
        return res.status(400).json({ message: "videoUrl is required" });
      }

      const objectStorageService = new ObjectStorageService();
      const normalizedVideoPath = objectStorageService.normalizeVideoPath(videoUrl);

      // Update lesson with video URL
      const lesson = await storage.updateLessonVideo(id, normalizedVideoPath);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      res.json(lesson);
    } catch (error) {
      console.error("Error updating lesson video:", error);
      res.status(500).json({ message: "Failed to update lesson video" });
    }
  });

  // Phone Training Scripts API
  app.get('/api/phone-training/scripts', authMiddleware, async (req: any, res) => {
    try {
      const { category, leadType } = req.query;
      
      // Validate query parameters
      const validCategories = ['all', 'opening', 'objection_response', 'closing', 'storm_specific', 'aged_roof'];
      const validLeadTypes = ['all', 'storm_lead', 'aged_roof', 'referral', 'cold_lead', 'all_leads'];
      
      if (category && !validCategories.includes(category)) {
        return res.status(400).json({ 
          message: "Invalid category", 
          validCategories 
        });
      }
      
      if (leadType && !validLeadTypes.includes(leadType)) {
        return res.status(400).json({ 
          message: "Invalid leadType", 
          validLeadTypes 
        });
      }
      
      // Use combined filtering method
      const filters: { category?: string; leadType?: string } = {};
      if (category) filters.category = category;
      if (leadType) filters.leadType = leadType;
      
      const scripts = await storage.getScriptsFiltered(filters);
      res.json(scripts);
    } catch (error) {
      console.error("Error fetching phone training scripts:", error);
      res.status(500).json({ message: "Failed to fetch scripts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
