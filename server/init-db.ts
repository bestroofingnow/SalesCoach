import { db } from './db';
import { companies, users, trainingTracks, trainingModules, lessons, quizQuestions } from '@shared/schema';
import { hashPassword } from './auth';
import { sql } from 'drizzle-orm';
import { createComprehensiveTrainingData } from './training-data';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create demo company if not exists
    const existingCompanies = await db.select().from(companies).limit(1);
    let demoCompanyId = null;
    
    if (existingCompanies.length === 0) {
      const [demoCompany] = await db.insert(companies).values({
        name: 'Demo Roofing Company',
        subdomain: 'demo',
        industry: 'Roofing Services',
        location: 'Demo Location',
        services: [
          'Residential Roofing',
          'Commercial Roofing',
          'Restoration Services',
          'Emergency Roof Repairs',
          'Roof Inspections',
          'Insurance Claims Assistance'
        ],
        values: [
          'Quality craftsmanship',
          'Customer satisfaction',
          'Professional integrity',
          'Safety first',
          'Continuous learning and improvement'
        ],
        trainingAreas: [
          'Residential roofing techniques and materials',
          'Commercial roofing systems and installation',
          'Restoration and insurance claim processes',
          'Safety protocols and procedures',
          'Customer service excellence',
          'Sales and communication skills'
        ],
        subscriptionStatus: 'trial',
        subscriptionPlan: 'basic',
        isActive: true
      }).returning();
      demoCompanyId = demoCompany.id;
      console.log('✅ Created demo company');
    } else {
      demoCompanyId = existingCompanies[0].id;
    }
    
    // Create super admin user if not exists
    const superAdminEmail = 'superadmin@roofingacademy.com';
    const existingSuperAdmin = await db
      .select()
      .from(users)
      .where(sql`email = ${superAdminEmail}`)
      .limit(1);
    
    if (existingSuperAdmin.length === 0) {
      const securePassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-6);
      const hashedPassword = await hashPassword(securePassword);
      console.log(`\n🔐 IMPORTANT: Super Admin user created with password: ${securePassword}`);
      console.log('📧 Super Admin email: superadmin@roofingacademy.com');
      console.log('⚠️  Please save this password and change it after first login!\n');
      await db.insert(users).values({
        email: superAdminEmail,
        password: hashedPassword,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'super_admin',
        isActive: true
      });
      console.log('✅ Created super admin user');
    }
    
    // Create demo company admin user if not exists
    const adminEmail = 'admin@demo.com';
    const existingAdmin = await db
      .select()
      .from(users)
      .where(sql`email = ${adminEmail}`)
      .limit(1);
    
    if (existingAdmin.length === 0) {
      const securePassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-6);
      const hashedPassword = await hashPassword(securePassword);
      console.log(`\n🔐 IMPORTANT: Admin user created with password: ${securePassword}`);
      console.log('📧 Admin email: admin@demo.com');
      console.log('⚠️  Please save this password and change it after first login!\n');
      await db.insert(users).values({
        companyId: demoCompanyId,
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Demo',
        lastName: 'Admin',
        role: 'admin',
        isActive: true
      });
      console.log('✅ Created demo company admin user');
    }
    
    // Check if we have training tracks, if not, create them
    const tracks = await db.select().from(trainingTracks);
    if (tracks.length === 0) {
      await createInitialTrainingData();
    } else {
      console.log('Training data already exists, skipping creation');
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