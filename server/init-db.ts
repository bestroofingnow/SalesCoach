import { db } from './db';
import { companies, users, trainingTracks, trainingModules, lessons, quizQuestions, scriptLibrary } from '@shared/schema';
import { hashPassword } from './auth';
import { sql } from 'drizzle-orm';
import { createComprehensiveTrainingData } from './training-data';
import { PHONE_TRAINING_SCRIPTS } from './phone-script-data';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create super admin user if not exists
    const superAdminEmail = 'james@bestroofingnow.com';
    const existingSuperAdmin = await db
      .select()
      .from(users)
      .where(sql`email = ${superAdminEmail}`)
      .limit(1);
    
    if (existingSuperAdmin.length === 0) {
      const hashedPassword = await hashPassword('abc123');
      await db.insert(users).values({
        email: superAdminEmail,
        password: hashedPassword,
        firstName: 'James',
        lastName: 'Best',
        role: 'super_admin',
        isActive: true
      });
      console.log('✅ Created super admin user');
    }
    
    // Check if we have training tracks, if not, create them
    const tracks = await db.select().from(trainingTracks);
    if (tracks.length === 0) {
      await createInitialTrainingData();
    } else {
      console.log('Training data already exists, skipping creation');
    }
    
    // Check if we have phone training scripts, if not, create them
    const scripts = await db.select().from(scriptLibrary).limit(1);
    if (scripts.length === 0) {
      await createPhoneTrainingScripts();
    } else {
      console.log('Phone training scripts already exist, skipping creation');
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function createInitialTrainingData() {
  // Use the comprehensive training data
  await createComprehensiveTrainingData();
}

async function createPhoneTrainingScripts() {
  try {
    console.log('Creating phone training scripts...');
    
    // Insert all phone training scripts
    await db.insert(scriptLibrary).values(PHONE_TRAINING_SCRIPTS);
    
    console.log(`✅ Created ${PHONE_TRAINING_SCRIPTS.length} phone training scripts`);
  } catch (error) {
    console.error('Error creating phone training scripts:', error);
  }
}