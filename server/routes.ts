import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertProgressSchema, insertQuizResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Training tracks
  app.get('/api/tracks', isAuthenticated, async (req, res) => {
    try {
      const tracks = await storage.getTrainingTracks();
      res.json(tracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      res.status(500).json({ message: "Failed to fetch training tracks" });
    }
  });

  // Training modules for a track
  app.get('/api/tracks/:trackId/modules', isAuthenticated, async (req, res) => {
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
  app.get('/api/modules/:moduleId/lessons', isAuthenticated, async (req, res) => {
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
  app.get('/api/lessons/:lessonId', isAuthenticated, async (req, res) => {
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
  app.get('/api/users/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Mark lesson as completed
  app.post('/api/progress/lesson', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
  app.get('/api/quiz/:type/:id', isAuthenticated, async (req, res) => {
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
  app.post('/api/quiz/submit', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
  app.get('/api/users/certifications', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const certifications = await storage.getUserCertifications(userId);
      res.json(certifications);
    } catch (error) {
      console.error("Error fetching certifications:", error);
      res.status(500).json({ message: "Failed to fetch certifications" });
    }
  });

  // Dashboard stats
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
