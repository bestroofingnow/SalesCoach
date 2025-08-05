import { 
  users, 
  trainingTracks, 
  trainingModules, 
  lessons, 
  quizQuestions, 
  userProgress, 
  userCertifications,
  certifications,
  type User, 
  type UpsertUser, 
  type TrainingTrack, 
  type TrainingModule, 
  type Lesson, 
  type QuizQuestion, 
  type UserProgress, 
  type UserCertification,
  type InsertProgress,
  type QuizResponse 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, count, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Training content methods
  getTrainingTracks(): Promise<TrainingTrack[]>;
  getTrainingModules(trackId: string): Promise<TrainingModule[]>;
  getLessons(moduleId: string): Promise<Lesson[]>;
  getLesson(lessonId: string): Promise<Lesson | undefined>;
  
  // Progress methods
  getUserProgress(userId: string): Promise<UserProgress[]>;
  recordProgress(progress: InsertProgress): Promise<UserProgress>;
  
  // Quiz methods
  getQuizQuestions(id: string, type: 'lesson' | 'module'): Promise<QuizQuestion[]>;
  submitQuizResponses(userId: string, responses: QuizResponse[], quizType: string, quizId: string): Promise<{ score: number; passed: boolean }>;
  
  // Certification methods
  getUserCertifications(userId: string): Promise<UserCertification[]>;
  
  // Dashboard methods
  getDashboardStats(userId: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // Try to find existing user
    const existingUser = await this.getUser(userData.id!);
    
    if (existingUser) {
      // Update existing user
      const [user] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: sql`NOW()`
        })
        .where(eq(users.id, userData.id!))
        .returning();
      return user;
    } else {
      // Create new user
      const [user] = await db
        .insert(users)
        .values(userData)
        .returning();
      return user;
    }
  }

  async getTrainingTracks(): Promise<TrainingTrack[]> {
    return await db.select().from(trainingTracks);
  }

  async getTrainingModules(trackId: string): Promise<TrainingModule[]> {
    return await db
      .select()
      .from(trainingModules)
      .where(eq(trainingModules.trackId, trackId));
  }

  async getLessons(moduleId: string): Promise<Lesson[]> {
    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId));
  }

  async getLesson(lessonId: string): Promise<Lesson | undefined> {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonId));
    return lesson || undefined;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async recordProgress(progress: InsertProgress): Promise<UserProgress> {
    const [newProgress] = await db
      .insert(userProgress)
      .values(progress)
      .returning();
    return newProgress;
  }

  async getQuizQuestions(id: string, type: 'lesson' | 'module'): Promise<QuizQuestion[]> {
    if (type === 'lesson') {
      return await db
        .select()
        .from(quizQuestions)
        .where(eq(quizQuestions.lessonId, id));
    } else {
      return await db
        .select()
        .from(quizQuestions)
        .where(eq(quizQuestions.moduleId, id));
    }
  }

  async submitQuizResponses(
    userId: string, 
    responses: QuizResponse[], 
    quizType: string, 
    quizId: string
  ): Promise<{ score: number; passed: boolean }> {
    // Get the correct answers for validation
    const questionIds = responses.map(r => r.questionId);
    const questions = await db
      .select()
      .from(quizQuestions)
      .where(sql`${quizQuestions.id} = ANY(${questionIds})`);
    
    // Calculate score
    let correctAnswers = 0;
    for (const response of responses) {
      const question = questions.find(q => q.id === response.questionId);
      if (question && question.correctAnswer === response.selectedAnswer) {
        correctAnswers++;
      }
    }
    
    const score = Math.round((correctAnswers / responses.length) * 100);
    const passed = score >= 70; // 70% passing threshold
    
    // Record the quiz completion
    if (passed) {
      const progressData: any = {
        userId,
        progressType: 'quiz_passed',
        score
      };
      
      if (quizType === 'lesson') {
        progressData.lessonId = quizId;
      } else {
        progressData.moduleId = quizId;
      }
      
      await this.recordProgress(progressData);
    }
    
    return { score, passed };
  }

  async getUserCertifications(userId: string): Promise<UserCertification[]> {
    return await db
      .select()
      .from(userCertifications)
      .where(eq(userCertifications.userId, userId));
  }

  async getDashboardStats(userId: string): Promise<any> {
    // Get progress stats
    const progressStats = await db
      .select({
        progressType: userProgress.progressType,
        count: count(userProgress.id)
      })
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .groupBy(userProgress.progressType);
    
    // Get total counts
    const [totalTracks] = await db.select({ count: count() }).from(trainingTracks);
    const [totalModules] = await db.select({ count: count() }).from(trainingModules);
    const [totalLessons] = await db.select({ count: count() }).from(lessons);
    
    // Get track-specific progress (for now we'll use generic progress for all tracks)
    const completedLessons = progressStats.find(p => p.progressType === 'lesson_completed')?.count || 0;
    const passedQuizzes = progressStats.find(p => p.progressType === 'quiz_passed')?.count || 0;
    const completedTracks = progressStats.find(p => p.progressType === 'track_completed')?.count || 0;
    
    const totalTracksCount = totalTracks?.count || 0;
    const totalModulesCount = totalModules?.count || 0;
    const totalLessonsCount = totalLessons?.count || 0;
    
    // Create the expected frontend structure
    const stats = {
      residential: {
        completed: Math.floor(completedLessons / 3), // Distribute across tracks
        total: Math.floor(totalLessonsCount / 3) || 1
      },
      commercial: {
        completed: Math.floor(completedLessons / 3),
        total: Math.floor(totalLessonsCount / 3) || 1
      },
      restoration: {
        completed: Math.floor(completedLessons / 3),
        total: Math.floor(totalLessonsCount / 3) || 1
      },
      certifications: {
        earned: completedTracks,
        total: totalTracksCount
      },
      // Keep the original stats for other uses
      completedLessons,
      passedQuizzes,
      completedTracks,
      totalTracks: totalTracksCount,
      totalModules: totalModulesCount,
      totalLessons: totalLessonsCount
    };
    
    return stats;
  }
}

export const storage = new DatabaseStorage();