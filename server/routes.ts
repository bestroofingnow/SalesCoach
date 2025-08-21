import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProgressSchema, insertQuizResponseSchema, loginSchema, createUserByAdminSchema, insertChatConversationSchema, insertChatMessageSchema } from "@shared/schema";
import { generateContextualHint, generateQuizHint, explainConcept } from "./ai-hints";
import { generateChatResponse, generateCommunicationDraft } from "./chat-service";
import { authenticateUser, authMiddleware, adminMiddleware, hashPassword } from "./auth";
import bcrypt from "bcryptjs";

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

  const httpServer = createServer(app);
  return httpServer;
}
