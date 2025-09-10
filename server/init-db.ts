import { db } from './db';
import { companies, users, trainingTracks, trainingModules, lessons, quizQuestions } from '@shared/schema';
import { hashPassword } from './auth';
import { sql } from 'drizzle-orm';

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
    }
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function createInitialTrainingData() {
  console.log('Creating initial training data...');
  
  // Create the three main training tracks
  const [residentialTrack] = await db.insert(trainingTracks).values({
    name: 'Residential Roofing',
    description: 'Master residential roofing techniques and sales',
    icon: 'home',
    color: 'blue',
    totalModules: 8
  }).returning();
  
  const [commercialTrack] = await db.insert(trainingTracks).values({
    name: 'Commercial Roofing', 
    description: 'Learn commercial roofing systems and projects',
    icon: 'building',
    color: 'green',
    totalModules: 8
  }).returning();
  
  const [restorationTrack] = await db.insert(trainingTracks).values({
    name: 'Restoration & Insurance',
    description: 'Insurance claims and restoration expertise',
    icon: 'shield',
    color: 'purple',
    totalModules: 8
  }).returning();
  
  // Create a sample module for each track
  const [residentialModule1] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Company Culture & Core Values',
    description: 'Understanding your company\'s mission and values',
    icon: 'star',
    orderIndex: 1,
    totalLessons: 3
  }).returning();
  
  const [commercialModule1] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Commercial Roofing Fundamentals',
    description: 'Introduction to commercial roofing systems',
    icon: 'briefcase',
    orderIndex: 1,
    totalLessons: 3
  }).returning();
  
  const [restorationModule1] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Insurance Fundamentals',
    description: 'Understanding insurance processes and claims',
    icon: 'clipboard',
    orderIndex: 1,
    totalLessons: 3
  }).returning();
  
  // Create sample lessons
  await db.insert(lessons).values([
    {
      moduleId: residentialModule1.id,
      title: 'Welcome to Your Roofing Company',
      content: '<h1>Welcome to Your Roofing Company</h1><p>Learn about our company history, mission, and values.</p>',
      orderIndex: 1,
      estimatedMinutes: 15
    },
    {
      moduleId: commercialModule1.id,
      title: 'Types of Commercial Roofing',
      content: '<h1>Commercial Roofing Systems</h1><p>Overview of different commercial roofing types.</p>',
      orderIndex: 1,
      estimatedMinutes: 20
    },
    {
      moduleId: restorationModule1.id,
      title: 'Insurance Basics',
      content: '<h1>Understanding Insurance</h1><p>How insurance claims work in roofing.</p>',
      orderIndex: 1,
      estimatedMinutes: 25
    }
  ]);
  
  console.log('Initial training data created');
}