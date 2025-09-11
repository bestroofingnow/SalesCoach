import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Companies table for multi-tenancy
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  subdomain: varchar("subdomain").unique(), // for custom subdomains
  logoUrl: text("logo_url"),
  primaryColor: varchar("primary_color").default("#1a1a1a"),
  // Company customization
  industry: varchar("industry").default("Roofing Services"),
  location: varchar("location"),
  services: jsonb("services").default([]).notNull(), // Array of service offerings
  values: jsonb("values").default([]).notNull(), // Array of company values
  trainingAreas: jsonb("training_areas").default([]).notNull(), // Array of training focus areas
  // Billing
  subscriptionStatus: varchar("subscription_status").default("trial"), // trial, active, suspended, cancelled
  subscriptionPlan: varchar("subscription_plan").default("basic"), // basic, pro, enterprise
  monthlyPlatformFee: integer("monthly_platform_fee").default(99), // $99/month
  perUserFee: integer("per_user_fee").default(20), // $20/user
  activeUserCount: integer("active_user_count").default(0),
  billingStartDate: timestamp("billing_start_date"),
  nextBillingDate: timestamp("next_billing_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with password authentication and multi-tenancy
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").references(() => companies.id),
  email: varchar("email").unique().notNull(),
  password: varchar("password"), // hashed password - nullable for migration
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("user"), // super_admin, admin, user
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User notes for training
export const userNotes = pgTable("user_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  lessonId: varchar("lesson_id").references(() => lessons.id),
  moduleId: varchar("module_id").references(() => trainingModules.id),
  trackId: varchar("track_id").references(() => trainingTracks.id),
  noteType: varchar("note_type").notNull(), // lesson, module, track, general
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// VAPI Agent configurations per company
export const vapiAgents = pgTable("vapi_agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").references(() => companies.id).notNull(),
  agentName: varchar("agent_name").notNull().default("Coach Betty"),
  vapiApiKey: text("vapi_api_key"),
  vapiPhoneNumber: varchar("vapi_phone_number"),
  vapiAssistantId: varchar("vapi_assistant_id"), // VAPI Assistant ID for web calls
  voiceId: varchar("voice_id").default("6aDn1KB0hjpdcocrUkmq"), // 11labs voice ID
  model: varchar("model").default("gpt-4o-mini"), // OpenAI model
  systemPrompt: text("system_prompt"), // Custom system prompt with company knowledge
  companyKnowledge: text("company_knowledge"), // Company-specific knowledge base
  scriptContent: text("script_content"), // Training script content
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Training tracks (residential, commercial, restoration)
export const trainingTracks = pgTable("training_tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon"),
  color: varchar("color"),
  totalModules: integer("total_modules").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Training modules within tracks
export const trainingModules = pgTable("training_modules", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackId: varchar("track_id").references(() => trainingTracks.id).notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  icon: varchar("icon"),
  orderIndex: integer("order_index").notNull(),
  totalLessons: integer("total_lessons").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Individual lessons within modules
export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  moduleId: varchar("module_id").references(() => trainingModules.id).notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  videoUrl: varchar("video_url"),
  orderIndex: integer("order_index").notNull(),
  estimatedMinutes: integer("estimated_minutes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz questions
export const quizQuestions = pgTable("quiz_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  lessonId: varchar("lesson_id").references(() => lessons.id),
  moduleId: varchar("module_id").references(() => trainingModules.id),
  question: text("question").notNull(),
  options: jsonb("options").notNull(), // Array of options
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User progress tracking
export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  trackId: varchar("track_id").references(() => trainingTracks.id),
  moduleId: varchar("module_id").references(() => trainingModules.id),
  lessonId: varchar("lesson_id").references(() => lessons.id),
  progressType: varchar("progress_type").notNull(), // lesson_completed, quiz_passed, track_completed
  completedAt: timestamp("completed_at").defaultNow(),
  score: integer("score"), // For quiz results
});

// Certifications and badges
export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon"),
  color: varchar("color"),
  requirements: jsonb("requirements"), // Array of required completions
  createdAt: timestamp("created_at").defaultNow(),
});

// User earned certifications
export const userCertifications = pgTable("user_certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  certificationId: varchar("certification_id").references(() => certifications.id).notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

// Phone training specific tables

// Practice scenarios for role-playing (declared first to avoid reference issues)
export const practiceScenarios = pgTable("practice_scenarios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  prospectProfile: jsonb("prospect_profile").notNull(), // Name, situation, concerns, etc.
  leadType: varchar("lead_type").notNull(), // storm_lead, aged_roof, referral, etc.
  difficulty: varchar("difficulty").notNull(), // beginner, intermediate, advanced
  expectedObjections: jsonb("expected_objections"), // Array of likely objections
  coachingTips: text("coaching_tips"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Call recordings and practice sessions
export const callRecordings = pgTable("call_recordings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  scenarioId: varchar("scenario_id").references(() => practiceScenarios.id),
  audioUrl: varchar("audio_url"), // URL to stored audio file
  duration: integer("duration"), // Duration in seconds
  callType: varchar("call_type").notNull(), // practice, real_call, role_play
  outcome: varchar("outcome"), // appointment_set, no_interest, callback, etc.
  score: integer("score"), // Overall call score (1-30 based on rubric)
  notes: text("notes"), // User or coach notes
  createdAt: timestamp("created_at").defaultNow(),
});

// Performance metrics tracking
export const performanceMetrics = pgTable("performance_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  date: timestamp("date").notNull(),
  totalDials: integer("total_dials").default(0),
  totalContacts: integer("total_contacts").default(0),
  appointmentsSet: integer("appointments_set").default(0),
  contactRate: integer("contact_rate"), // Percentage * 100 (e.g., 25% = 2500)
  appointmentRate: integer("appointment_rate"), // Percentage * 100
  averageCallDuration: integer("average_call_duration"), // Seconds
  averageCallScore: integer("average_call_score"), // 1-30 scale
  createdAt: timestamp("created_at").defaultNow(),
});

// Script library and templates
export const scriptLibrary = pgTable("script_library", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  category: varchar("category").notNull(), // opening, objection_response, closing, etc.
  leadType: varchar("lead_type"), // storm_lead, aged_roof, all_leads, etc.
  scriptContent: text("script_content").notNull(),
  tags: jsonb("tags"), // Array of searchable tags
  difficulty: varchar("difficulty").default("beginner"), // beginner, intermediate, advanced
  successRate: integer("success_rate"), // Percentage * 100 based on usage
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Call scoring rubric details
export const callScoringRubric = pgTable("call_scoring_rubric", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  callRecordingId: varchar("call_recording_id").references(() => callRecordings.id).notNull(),
  openingRapport: integer("opening_rapport"), // 1-5 score
  reasonForCalling: integer("reason_for_calling"), // 1-5 score
  qualifyingQuestions: integer("qualifying_questions"), // 1-5 score
  objectionHandling: integer("objection_handling"), // 1-5 score
  closing: integer("closing"), // 1-5 score
  professionalism: integer("professionalism"), // 1-5 score
  totalScore: integer("total_score"), // Sum of above (6-30)
  feedback: text("feedback"), // Detailed feedback and improvement suggestions
  scoredBy: varchar("scored_by").references(() => users.id), // Coach or self-scored
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
  vapiAgents: many(vapiAgents),
}));

export const trackRelations = relations(trainingTracks, ({ many }) => ({
  modules: many(trainingModules),
  userNotes: many(userNotes),
}));

export const moduleRelations = relations(trainingModules, ({ one, many }) => ({
  track: one(trainingTracks, {
    fields: [trainingModules.trackId],
    references: [trainingTracks.id],
  }),
  lessons: many(lessons),
  questions: many(quizQuestions),
  userNotes: many(userNotes),
}));

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  module: one(trainingModules, {
    fields: [lessons.moduleId],
    references: [trainingModules.id],
  }),
  questions: many(quizQuestions),
  userNotes: many(userNotes),
}));

export const userNotesRelations = relations(userNotes, ({ one }) => ({
  user: one(users, {
    fields: [userNotes.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userNotes.lessonId],
    references: [lessons.id],
  }),
  module: one(trainingModules, {
    fields: [userNotes.moduleId],
    references: [trainingModules.id],
  }),
  track: one(trainingTracks, {
    fields: [userNotes.trackId],
    references: [trainingTracks.id],
  }),
}));

export const vapiAgentRelations = relations(vapiAgents, ({ one }) => ({
  company: one(companies, {
    fields: [vapiAgents.companyId],
    references: [companies.id],
  }),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
  progress: many(userProgress),
  certifications: many(userCertifications),
  callRecordings: many(callRecordings),
  performanceMetrics: many(performanceMetrics),
  scriptLibrary: many(scriptLibrary),
  notes: many(userNotes),
  conversations: many(chatConversations),
}));

// Phone training relations
export const practiceScenarioRelations = relations(practiceScenarios, ({ many }) => ({
  callRecordings: many(callRecordings),
}));

export const callRecordingRelations = relations(callRecordings, ({ one }) => ({
  user: one(users, {
    fields: [callRecordings.userId],
    references: [users.id],
  }),
  scenario: one(practiceScenarios, {
    fields: [callRecordings.scenarioId],
    references: [practiceScenarios.id],
  }),
  rubric: one(callScoringRubric, {
    fields: [callRecordings.id],
    references: [callScoringRubric.callRecordingId],
  }),
}));

export const performanceMetricsRelations = relations(performanceMetrics, ({ one }) => ({
  user: one(users, {
    fields: [performanceMetrics.userId],
    references: [users.id],
  }),
}));

export const scriptLibraryRelations = relations(scriptLibrary, ({ one }) => ({
  createdBy: one(users, {
    fields: [scriptLibrary.createdBy],
    references: [users.id],
  }),
}));

export const callScoringRubricRelations = relations(callScoringRubric, ({ one }) => ({
  callRecording: one(callRecordings, {
    fields: [callScoringRubric.callRecordingId],
    references: [callRecordings.id],
  }),
  scoredBy: one(users, {
    fields: [callScoringRubric.scoredBy],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  activeUserCount: true,
  nextBillingDate: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserNoteSchema = createInsertSchema(userNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVapiAgentSchema = createInsertSchema(vapiAgents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createUserByAdminSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  password: true,
}).extend({
  password: z.string().min(6),
});

export const insertProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  completedAt: true,
});

export const insertQuizResponseSchema = z.object({
  questionId: z.string(),
  selectedAnswer: z.number(),
});

// Phone training insert schemas
export const insertPracticeScenarioSchema = createInsertSchema(practiceScenarios).omit({
  id: true,
  createdAt: true,
});

export const insertCallRecordingSchema = createInsertSchema(callRecordings).omit({
  id: true,
  createdAt: true,
});

export const insertPerformanceMetricsSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertScriptLibrarySchema = createInsertSchema(scriptLibrary).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCallScoringRubricSchema = createInsertSchema(callScoringRubric).omit({
  id: true,
  createdAt: true,
});

// Types
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UserNote = typeof userNotes.$inferSelect;
export type InsertUserNote = z.infer<typeof insertUserNoteSchema>;
export type VapiAgent = typeof vapiAgents.$inferSelect;
export type InsertVapiAgent = z.infer<typeof insertVapiAgentSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type CreateUserData = z.infer<typeof createUserByAdminSchema>;
export type TrainingTrack = typeof trainingTracks.$inferSelect;
export type TrainingModule = typeof trainingModules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type UserCertification = typeof userCertifications.$inferSelect;

// Phone training types
export type PracticeScenario = typeof practiceScenarios.$inferSelect;
export type CallRecording = typeof callRecordings.$inferSelect;
export type PerformanceMetrics = typeof performanceMetrics.$inferSelect;
export type ScriptLibrary = typeof scriptLibrary.$inferSelect;
export type CallScoringRubric = typeof callScoringRubric.$inferSelect;
export type InsertPracticeScenario = z.infer<typeof insertPracticeScenarioSchema>;
export type InsertCallRecording = z.infer<typeof insertCallRecordingSchema>;
export type InsertPerformanceMetrics = z.infer<typeof insertPerformanceMetricsSchema>;
export type InsertScriptLibrary = z.infer<typeof insertScriptLibrarySchema>;
export type InsertCallScoringRubric = z.infer<typeof insertCallScoringRubricSchema>;
// Chat system tables
export const chatConversations = pgTable("chat_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: varchar("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").references(() => chatConversations.id).notNull(),
  role: varchar("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat relations
export const chatConversationsRelations = relations(chatConversations, ({ one, many }) => ({
  user: one(users, {
    fields: [chatConversations.userId],
    references: [users.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  conversation: one(chatConversations, {
    fields: [chatMessages.conversationId],
    references: [chatConversations.id],
  }),
}));

// Chat schemas
export const insertChatConversationSchema = createInsertSchema(chatConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

// Chat types
export type ChatConversation = typeof chatConversations.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatConversation = z.infer<typeof insertChatConversationSchema>;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type QuizResponse = z.infer<typeof insertQuizResponseSchema>;

// Additional helper types
export type UserRole = 'super_admin' | 'admin' | 'user';
export type SubscriptionStatus = 'trial' | 'active' | 'suspended' | 'cancelled';
export type SubscriptionPlan = 'basic' | 'pro' | 'enterprise';
