import { 
  users, 
  companies,
  userNotes,
  vapiAgents,
  trainingTracks, 
  trainingModules, 
  lessons, 
  quizQuestions, 
  userProgress, 
  userCertifications,
  certifications,
  chatConversations,
  chatMessages,
  type User, 
  type UpsertUser,
  type Company,
  type InsertCompany,
  type UserNote,
  type InsertUserNote,
  type VapiAgent,
  type InsertVapiAgent,
  type TrainingTrack, 
  type TrainingModule, 
  type Lesson, 
  type QuizQuestion, 
  type UserProgress, 
  type UserCertification,
  type ChatConversation,
  type ChatMessage,
  type InsertChatConversation,
  type InsertChatMessage,
  type InsertProgress,
  type QuizResponse 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, count, sql, inArray } from "drizzle-orm";

export interface IStorage {
  // Company methods
  getCompany(id: string): Promise<Company | undefined>;
  getCompanyBySubdomain(subdomain: string): Promise<Company | undefined>;
  createCompany(companyData: InsertCompany): Promise<Company>;
  updateCompany(id: string, companyData: Partial<Company>): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsersByCompany(companyId: string): Promise<User[]>;
  createUser(userData: Omit<UpsertUser, 'id'>): Promise<User>;
  updateUser(id: string, userData: Partial<User>): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Training content methods
  getTrainingTracks(): Promise<TrainingTrack[]>;
  getTrainingModules(trackId: string): Promise<TrainingModule[]>;
  getLessons(moduleId: string): Promise<Lesson[]>;
  getLesson(lessonId: string): Promise<Lesson | undefined>;
  updateLessonVideo(lessonId: string, videoUrl: string): Promise<Lesson | undefined>;
  
  // Progress methods
  getUserProgress(userId: string): Promise<UserProgress[]>;
  recordProgress(progress: InsertProgress): Promise<UserProgress>;
  
  // Quiz methods
  getQuizQuestions(id: string, type: 'lesson' | 'module'): Promise<QuizQuestion[]>;
  submitQuizResponses(userId: string, responses: QuizResponse[], quizType: string, quizId: string): Promise<{ score: number; passed: boolean }>;
  getUserQuizResponses(userId: string): Promise<QuizResponse[]>;
  
  // Module methods
  getModules(): Promise<TrainingModule[]>;
  
  // Certification methods
  getUserCertifications(userId: string): Promise<UserCertification[]>;
  
  // Dashboard methods
  getDashboardStats(userId: string): Promise<any>;
  
  // Chat methods
  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  getChatConversations(userId: string): Promise<ChatConversation[]>;
  getChatMessages(conversationId: string): Promise<ChatMessage[]>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  updateConversationTitle(conversationId: string, title: string): Promise<ChatConversation>;
  
  // User notes methods
  getUserNotes(userId: string): Promise<UserNote[]>;
  getNotesByLesson(userId: string, lessonId: string): Promise<UserNote[]>;
  createUserNote(noteData: InsertUserNote): Promise<UserNote>;
  updateUserNote(id: string, content: string): Promise<UserNote | undefined>;
  deleteUserNote(id: string): Promise<void>;
  
  // VAPI Agent methods
  getVapiAgent(companyId: string): Promise<VapiAgent | undefined>;
  createVapiAgent(agentData: InsertVapiAgent): Promise<VapiAgent>;
  updateVapiAgent(id: string, agentData: Partial<VapiAgent>): Promise<VapiAgent | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Company methods
  async getCompany(id: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async getCompanyBySubdomain(subdomain: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.subdomain, subdomain));
    return company || undefined;
  }

  async createCompany(companyData: InsertCompany): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(companyData)
      .returning();
    return company;
  }

  async updateCompany(id: string, companyData: Partial<Company>): Promise<Company | undefined> {
    const [company] = await db
      .update(companies)
      .set({
        ...companyData,
        updatedAt: sql`NOW()`
      })
      .where(eq(companies.id, id))
      .returning();
    return company || undefined;
  }

  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: Omit<UpsertUser, 'id'>): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: sql`NOW()`
      })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getUsersByCompany(companyId: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.companyId, companyId));
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

  async updateLessonVideo(lessonId: string, videoUrl: string): Promise<Lesson | undefined> {
    const [lesson] = await db
      .update(lessons)
      .set({ videoUrl })
      .where(eq(lessons.id, lessonId))
      .returning();
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
    // Validate inputs
    if (!responses || responses.length === 0) {
      throw new Error('No quiz responses provided');
    }
    
    // Get the correct answers for validation
    const questionIds = responses.map(r => r.questionId);
    const questions = await db
      .select()
      .from(quizQuestions)
      .where(inArray(quizQuestions.id, questionIds));
    
    // Calculate score
    let correctAnswers = 0;
    for (const response of responses) {
      const question = questions.find(q => q.id === response.questionId);
      if (question && question.correctAnswer === response.selectedAnswer) {
        correctAnswers++;
      }
    }
    
    // Prevent division by zero
    const score = responses.length > 0 ? Math.round((correctAnswers / responses.length) * 100) : 0;
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

  async getUserQuizResponses(userId: string): Promise<QuizResponse[]> {
    // Since we don't have a dedicated quiz responses table, we'll return an empty array for now
    // In a real app, you'd have a table to store quiz responses
    return [];
  }

  async getModules(): Promise<TrainingModule[]> {
    return await db.select().from(trainingModules);
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
    
    // Create the expected frontend structure with safe division
    const safeTotal = Math.max(totalLessonsCount, 1); // Ensure minimum of 1
    const trackTotal = Math.max(Math.floor(safeTotal / 3), 1); // Ensure minimum of 1 per track
    const stats = {
      residential: {
        completed: totalLessonsCount > 0 ? Math.floor(completedLessons / 3) : 0,
        total: trackTotal
      },
      commercial: {
        completed: totalLessonsCount > 0 ? Math.floor(completedLessons / 3) : 0,
        total: trackTotal
      },
      restoration: {
        completed: totalLessonsCount > 0 ? Math.floor(completedLessons / 3) : 0,
        total: trackTotal
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

  async createChatConversation(conversationData: InsertChatConversation): Promise<ChatConversation> {
    const [conversation] = await db
      .insert(chatConversations)
      .values(conversationData)
      .returning();
    return conversation;
  }

  async getChatConversations(userId: string): Promise<ChatConversation[]> {
    return await db
      .select()
      .from(chatConversations)
      .where(eq(chatConversations.userId, userId))
      .orderBy(sql`${chatConversations.updatedAt} DESC`);
  }

  async getChatMessages(conversationId: string): Promise<ChatMessage[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.conversationId, conversationId))
      .orderBy(chatMessages.createdAt);
  }

  async addChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db
      .insert(chatMessages)
      .values(messageData)
      .returning();
    
    // Update conversation timestamp
    await db
      .update(chatConversations)
      .set({ updatedAt: sql`NOW()` })
      .where(eq(chatConversations.id, messageData.conversationId));
    
    return message;
  }

  async updateConversationTitle(conversationId: string, title: string): Promise<ChatConversation> {
    const [conversation] = await db
      .update(chatConversations)
      .set({ 
        title,
        updatedAt: sql`NOW()` 
      })
      .where(eq(chatConversations.id, conversationId))
      .returning();
    return conversation;
  }

  // User notes methods
  async getUserNotes(userId: string): Promise<UserNote[]> {
    return await db
      .select()
      .from(userNotes)
      .where(eq(userNotes.userId, userId))
      .orderBy(sql`${userNotes.updatedAt} DESC`);
  }

  async getNotesByLesson(userId: string, lessonId: string): Promise<UserNote[]> {
    return await db
      .select()
      .from(userNotes)
      .where(and(
        eq(userNotes.userId, userId),
        eq(userNotes.lessonId, lessonId)
      ))
      .orderBy(sql`${userNotes.updatedAt} DESC`);
  }

  async createUserNote(noteData: InsertUserNote): Promise<UserNote> {
    const [note] = await db
      .insert(userNotes)
      .values(noteData)
      .returning();
    return note;
  }

  async updateUserNote(id: string, content: string): Promise<UserNote | undefined> {
    const [note] = await db
      .update(userNotes)
      .set({ 
        content,
        updatedAt: sql`NOW()` 
      })
      .where(eq(userNotes.id, id))
      .returning();
    return note || undefined;
  }

  async deleteUserNote(id: string): Promise<void> {
    await db.delete(userNotes).where(eq(userNotes.id, id));
  }

  // VAPI Agent methods
  async getVapiAgent(companyId: string): Promise<VapiAgent | undefined> {
    const [agent] = await db
      .select()
      .from(vapiAgents)
      .where(and(
        eq(vapiAgents.companyId, companyId),
        eq(vapiAgents.isActive, true)
      ));
    return agent || undefined;
  }

  async createVapiAgent(agentData: InsertVapiAgent): Promise<VapiAgent> {
    const [agent] = await db
      .insert(vapiAgents)
      .values(agentData)
      .returning();
    return agent;
  }

  async updateVapiAgent(id: string, agentData: Partial<VapiAgent>): Promise<VapiAgent | undefined> {
    const [agent] = await db
      .update(vapiAgents)
      .set({
        ...agentData,
        updatedAt: sql`NOW()`
      })
      .where(eq(vapiAgents.id, id))
      .returning();
    return agent || undefined;
  }
}

export const storage = new DatabaseStorage();