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

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").default("trainee"), // trainee, instructor, admin
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

// Relations
export const trackRelations = relations(trainingTracks, ({ many }) => ({
  modules: many(trainingModules),
}));

export const moduleRelations = relations(trainingModules, ({ one, many }) => ({
  track: one(trainingTracks, {
    fields: [trainingModules.trackId],
    references: [trainingTracks.id],
  }),
  lessons: many(lessons),
  questions: many(quizQuestions),
}));

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  module: one(trainingModules, {
    fields: [lessons.moduleId],
    references: [trainingModules.id],
  }),
  questions: many(quizQuestions),
}));

export const userRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  certifications: many(userCertifications),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  completedAt: true,
});

export const insertQuizResponseSchema = z.object({
  questionId: z.string(),
  selectedAnswer: z.number(),
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type TrainingTrack = typeof trainingTracks.$inferSelect;
export type TrainingModule = typeof trainingModules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type UserProgress = typeof userProgress.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type UserCertification = typeof userCertifications.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type QuizResponse = z.infer<typeof insertQuizResponseSchema>;
