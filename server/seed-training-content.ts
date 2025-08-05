import { db } from './db';
import { trainingTracks, trainingModules, lessons, quizQuestions } from '@shared/schema';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function clearExistingData() {
  console.log('Clearing existing training data...');
  
  // Delete in reverse order of dependencies
  await db.delete(quizQuestions);
  await db.delete(lessons);
  await db.delete(trainingModules);
  await db.delete(trainingTracks);
  
  console.log('Existing data cleared.');
}

async function seedTrainingData() {
  console.log('Starting to seed training data...');
  
  try {
    // Clear existing data first
    await clearExistingData();
    
    // Create Training Tracks
    const [residentialTrack, commercialTrack, restorationTrack] = await db.insert(trainingTracks).values([
      {
        id: 'residential-roofing',
        name: 'Residential Roofing',
        description: 'Master residential roofing techniques, materials, and customer service',
        icon: 'fas fa-home',
        color: 'blue',
        totalModules: 8
      },
      {
        id: 'commercial-roofing',
        name: 'Commercial Roofing',
        description: 'Learn commercial roofing systems, materials, and project management',
        icon: 'fas fa-building',
        color: 'orange',
        totalModules: 7
      },
      {
        id: 'restoration-insurance',
        name: 'Restoration & Insurance',
        description: 'Navigate insurance claims, storm damage assessment, and restoration processes',
        icon: 'fas fa-shield-alt',
        color: 'purple',
        totalModules: 9
      }
    ]).returning();
    
    console.log('Training tracks created.');
    
    // Create Residential Roofing Modules
    const residentialModules = await db.insert(trainingModules).values([
      {
        id: 'res-company-culture',
        trackId: residentialTrack.id,
        title: 'Company Culture & Values',
        description: 'Deep dive into BRN values, mission, and what makes us different',
        icon: 'fas fa-star',
        orderIndex: 1,
        totalLessons: 4
      },
      {
        id: 'res-roofing-basics',
        trackId: residentialTrack.id,
        title: 'Roofing Fundamentals',
        description: 'Essential knowledge about roof systems, components, and terminology',
        icon: 'fas fa-graduation-cap',
        orderIndex: 2,
        totalLessons: 6
      },
      {
        id: 'res-materials',
        trackId: residentialTrack.id,
        title: 'Materials & Installation',
        description: 'Comprehensive guide to roofing materials and proper installation techniques',
        icon: 'fas fa-tools',
        orderIndex: 3,
        totalLessons: 5
      },
      {
        id: 'res-sales-process',
        trackId: residentialTrack.id,
        title: 'Sales Excellence',
        description: 'Master the art of consultative roofing sales and customer relationships',
        icon: 'fas fa-handshake',
        orderIndex: 4,
        totalLessons: 6
      },
      {
        id: 'res-inspection',
        trackId: residentialTrack.id,
        title: 'Roof Inspections',
        description: 'Learn to conduct thorough inspections using our drone technology',
        icon: 'fas fa-search',
        orderIndex: 5,
        totalLessons: 4
      },
      {
        id: 'res-warranties',
        trackId: residentialTrack.id,
        title: 'Warranties & Service',
        description: 'Understand our 50-year warranty and service commitments',
        icon: 'fas fa-certificate',
        orderIndex: 6,
        totalLessons: 3
      },
      {
        id: 'res-customer-service',
        trackId: residentialTrack.id,
        title: 'Customer Experience',
        description: 'Create magical moments and exceptional customer experiences',
        icon: 'fas fa-heart',
        orderIndex: 7,
        totalLessons: 4
      },
      {
        id: 'res-production',
        trackId: residentialTrack.id,
        title: 'Production & Quality',
        description: 'Installation best practices and quality control standards',
        icon: 'fas fa-hard-hat',
        orderIndex: 8,
        totalLessons: 5
      }
    ]).returning();
    
    // Create Commercial Roofing Modules
    const commercialModules = await db.insert(trainingModules).values([
      {
        id: 'com-intro',
        trackId: commercialTrack.id,
        title: 'Commercial Roofing Introduction',
        description: 'Overview of commercial roofing industry and opportunities',
        icon: 'fas fa-city',
        orderIndex: 1,
        totalLessons: 4
      },
      {
        id: 'com-systems',
        trackId: commercialTrack.id,
        title: 'Commercial Roofing Systems',
        description: 'TPO, EPDM, PVC, Metal, and other commercial systems',
        icon: 'fas fa-layer-group',
        orderIndex: 2,
        totalLessons: 8
      },
      {
        id: 'com-flat-roofs',
        trackId: commercialTrack.id,
        title: 'Flat Roof Fundamentals',
        description: 'Design, drainage, and maintenance of flat roofing systems',
        icon: 'fas fa-square',
        orderIndex: 3,
        totalLessons: 5
      },
      {
        id: 'com-inspection',
        trackId: commercialTrack.id,
        title: 'Commercial Inspections',
        description: 'Core samples, moisture detection, and assessment techniques',
        icon: 'fas fa-clipboard-check',
        orderIndex: 4,
        totalLessons: 4
      },
      {
        id: 'com-services',
        trackId: commercialTrack.id,
        title: 'Commercial Services',
        description: 'Maintenance plans, repairs, and restoration services',
        icon: 'fas fa-wrench',
        orderIndex: 5,
        totalLessons: 5
      },
      {
        id: 'com-project-mgmt',
        trackId: commercialTrack.id,
        title: 'Project Management',
        description: 'Managing commercial roofing projects from start to finish',
        icon: 'fas fa-project-diagram',
        orderIndex: 6,
        totalLessons: 4
      },
      {
        id: 'com-technology',
        trackId: commercialTrack.id,
        title: 'Technology & Innovation',
        description: 'Solar, green roofs, and cutting-edge commercial solutions',
        icon: 'fas fa-solar-panel',
        orderIndex: 7,
        totalLessons: 3
      }
    ]).returning();
    
    // Create Restoration & Insurance Modules
    const restorationModules = await db.insert(trainingModules).values([
      {
        id: 'ins-intro',
        trackId: restorationTrack.id,
        title: 'Insurance Restoration Overview',
        description: 'Understanding the insurance restoration industry',
        icon: 'fas fa-umbrella',
        orderIndex: 1,
        totalLessons: 4
      },
      {
        id: 'ins-basics',
        trackId: restorationTrack.id,
        title: 'Insurance Fundamentals',
        description: 'Policy types, coverage, and insurance company operations',
        icon: 'fas fa-file-contract',
        orderIndex: 2,
        totalLessons: 6
      },
      {
        id: 'ins-damage',
        trackId: restorationTrack.id,
        title: 'Storm Damage Assessment',
        description: 'Identifying and documenting hail, wind, and weather damage',
        icon: 'fas fa-cloud-bolt',
        orderIndex: 3,
        totalLessons: 5
      },
      {
        id: 'ins-process',
        trackId: restorationTrack.id,
        title: 'Claims Process',
        description: 'Step-by-step guide through the insurance claims process',
        icon: 'fas fa-clipboard-list',
        orderIndex: 4,
        totalLessons: 8
      },
      {
        id: 'ins-xactimate',
        trackId: restorationTrack.id,
        title: 'Xactimate & Estimating',
        description: 'Creating accurate estimates and supplements',
        icon: 'fas fa-calculator',
        orderIndex: 5,
        totalLessons: 5
      },
      {
        id: 'ins-adjusters',
        trackId: restorationTrack.id,
        title: 'Working with Adjusters',
        description: 'Building relationships and navigating adjuster meetings',
        icon: 'fas fa-user-tie',
        orderIndex: 6,
        totalLessons: 4
      },
      {
        id: 'ins-documentation',
        trackId: restorationTrack.id,
        title: 'Documentation & Photos',
        description: 'Professional documentation for successful claims',
        icon: 'fas fa-camera',
        orderIndex: 7,
        totalLessons: 4
      },
      {
        id: 'ins-homeowner',
        trackId: restorationTrack.id,
        title: 'Homeowner Education',
        description: 'Educating homeowners on insurance rights and processes',
        icon: 'fas fa-chalkboard-teacher',
        orderIndex: 8,
        totalLessons: 5
      },
      {
        id: 'ins-ethics',
        trackId: restorationTrack.id,
        title: 'Ethics & Compliance',
        description: 'Legal requirements and ethical restoration practices',
        icon: 'fas fa-balance-scale',
        orderIndex: 9,
        totalLessons: 3
      }
    ]).returning();
    
    console.log('Training modules created.');
    
    // Create detailed lessons for Company Culture module
    const companyCultureLessons = await db.insert(lessons).values([
      {
        moduleId: 'res-company-culture',
        title: 'Our Story & Values Deep Dive',
        content: `<h2>Welcome to the Best Roofing Now Family!</h2>
<p>Understanding our company culture isn't just about memorizing values - it's about living them every day and sharing that passion with customers.</p>

<h3>Our Origin Story (Use This in Presentations)</h3>
<div class="story-section bg-blue-50 p-6 rounded-lg mb-6">
  <p class="mb-4"><strong>The Script:</strong> "Best Roofing Now was founded in 2021 by Fred and James Turner, a father-son team right here in Charlotte. We're not some big national company - we're your neighbors who decided to do roofing the right way."</p>
  
  <p class="mb-4"><strong>Why This Matters:</strong> Local connection builds immediate trust. People prefer supporting local businesses.</p>
  
  <p class="mb-2"><strong>Follow-up Questions to Ask:</strong></p>
  <ul class="list-disc pl-6">
    <li>"How long have you lived in Charlotte?"</li>
    <li>"Do you prefer working with local companies?"</li>
    <li>"Have you heard of us from any neighbors?"</li>
  </ul>
</div>

<h3>Our 6 Core Values - Memory System: "I-L-W-S-C-C"</h3>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🤝 INTEGRITY with TRANSPARENCY</h4>
  <p class="mb-3"><strong>What it means:</strong> We never hide anything from customers. If we see it, you see it.</p>
  
  <p class="mb-2"><strong>How to demonstrate:</strong></p>
  <ul class="list-disc pl-6 mb-4">
    <li>Show drone footage in real-time during inspection</li>
    <li>Point out areas that DON'T need work</li>
    <li>Explain exactly what we found and why it matters</li>
    <li>Never exaggerate damage</li>
  </ul>
  
  <p class="bg-blue-100 p-4 rounded"><strong>Customer script:</strong> "I'm going to show you exactly what I'm seeing up there. I'll point out both the good and the areas that need attention. I believe you deserve complete honesty about your roof's condition."</p>
</div>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">❤️ LOVE of COMMUNITY</h4>
  <p class="mb-3"><strong>What it means:</strong> Charlotte isn't just where we work - it's our home. We care about our neighbors.</p>
  
  <p class="mb-2"><strong>How to demonstrate:</strong></p>
  <ul class="list-disc pl-6 mb-4">
    <li>Mention other neighborhoods you've worked in</li>
    <li>Share stories of helping neighbors</li>
    <li>Offer to check neighbors' roofs too</li>
    <li>Get involved in community events</li>
  </ul>
  
  <p class="bg-blue-100 p-4 rounded"><strong>Customer script:</strong> "We've been helping Charlotte homeowners for years. Just last month, we replaced three roofs on this very street. Mrs. Johnson two houses down? We helped her navigate her insurance claim."</p>
</div>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">💪 WORK HARD to PLAY HARD</h4>
  <p class="mb-3"><strong>What it means:</strong> We're serious about quality work, but we also know how to have fun and celebrate success.</p>
  
  <p class="bg-blue-100 p-4 rounded"><strong>Customer script:</strong> "We take our work seriously, but we also love what we do. There's nothing better than seeing a homeowner's face when they see their beautiful new roof!"</p>
</div>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🎓 SHARING KNOWLEDGE</h4>
  <p class="mb-3"><strong>What it means:</strong> We educate customers so they can make informed decisions, even if they don't choose us.</p>
  
  <p class="bg-blue-100 p-4 rounded"><strong>Customer script:</strong> "Let me teach you what to look for when evaluating roofing companies. Even if you don't choose us, you'll know what questions to ask."</p>
</div>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">⭐ COMMITMENT to EXCELLENCE</h4>
  <p class="mb-3"><strong>What it means:</strong> Good enough isn't good enough. We aim for perfection every time.</p>
  
  <p class="bg-blue-100 p-4 rounded"><strong>Customer script:</strong> "Excellence isn't negotiable for us. We check our work multiple times, and we don't consider a job done until you're completely satisfied."</p>
</div>

<div class="value-deep-dive bg-gray-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">✨ CRAFTING MAGICAL MOMENTS</h4>
  <p class="mb-3"><strong>What it means:</strong> We create experiences so positive that customers become raving fans.</p>
  
  <p class="mb-2"><strong>Examples of magical moments:</strong></p>
  <ul class="list-disc pl-6">
    <li>Cleaning their gutters without being asked</li>
    <li>Remembering their dog's name</li>
    <li>Following up during the first big storm</li>
    <li>Sending anniversary cards</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-company-culture',
        title: 'What Makes BRN Different',
        content: `<h2>Your Competitive Arsenal</h2>
<p class="text-lg mb-6">Every competitor claims to be "the best." Here's why we actually ARE different, and how to prove it.</p>

<div class="competitive-advantage bg-blue-50 p-6 rounded-lg mb-6">
  <h3 class="text-2xl font-bold mb-4">🚁 Drone Technology Advantage</h3>
  
  <h4 class="text-lg font-semibold mb-3">Customer Benefits Script:</h4>
  <p class="bg-white p-4 rounded mb-4">"Our drone inspection is like having X-ray vision for your roof. We can see every single shingle, every piece of flashing, every potential problem area. Most contractors miss 30-40% of damage because they can't see it from the ground."</p>
  
  <h4 class="text-lg font-semibold mb-3">Proof Points:</h4>
  <ul class="list-disc pl-6">
    <li>Show side-by-side photos: ground view vs. drone view</li>
    <li>Demonstrate the drone live if weather permits</li>
    <li>Mention insurance companies prefer drone documentation</li>
    <li>Safety benefit: no one walking on their roof</li>
  </ul>
</div>

<div class="competitive-advantage bg-orange-50 p-6 rounded-lg mb-6">
  <h3 class="text-2xl font-bold mb-4">🛡️ 50-Year Full Warranty</h3>
  
  <h4 class="text-lg font-semibold mb-3">Customer Script:</h4>
  <p class="bg-white p-4 rounded mb-4">"Our 50-year full warranty covers both our workmanship AND the manufacturer's materials. That means if anything goes wrong with our work or these materials for 50 years, we fix it at no cost to you. Most contractors only warranty their work for 1-2 years."</p>
  
  <h4 class="text-lg font-semibold mb-3">What Our 50-Year Full Warranty Covers:</h4>
  <ul class="list-disc pl-6 mb-4">
    <li><strong>Workmanship:</strong> Our installation and labor for 50 years</li>
    <li><strong>Materials:</strong> Full CertainTeed manufacturer coverage for 50 years</li>
    <li><strong>Wind Damage:</strong> Up to 130 mph depending on shingle</li>
    <li><strong>Algae Growth:</strong> StreakFighter algae resistance</li>
    <li><strong>Manufacturing Defects:</strong> Complete material replacement</li>
  </ul>
  
  <h4 class="text-lg font-semibold mb-3">Competitive Advantage Script:</h4>
  <p class="bg-white p-4 rounded">"When you compare contractors, ask them about their warranty. Most will say 'we warranty our work for a year, and the manufacturer warranties the materials.' We're different - we stand behind EVERYTHING for 50 full years. That's confidence in our quality."</p>
</div>

<div class="competitive-advantage bg-purple-50 p-6 rounded-lg">
  <h3 class="text-2xl font-bold mb-4">🕐 24/7 Emergency Service</h3>
  
  <h4 class="text-lg font-semibold mb-3">Customer Script:</h4>
  <p class="bg-white p-4 rounded mb-4">"When a storm hits at 2 AM on Sunday, you don't want to leave voicemails. You want someone who answers the phone and can be at your house with a tarp in two hours. That's what 24/7 service really means."</p>
  
  <h4 class="text-lg font-semibold mb-3">What This Really Means:</h4>
  <ul class="list-disc pl-6">
    <li>Emergency tarping within 2 hours</li>
    <li>Real person answers the phone, not voicemail</li>
    <li>Available weekends and holidays</li>
    <li>Storm response team mobilized within hours</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 15
      },
      {
        moduleId: 'res-company-culture',
        title: 'The 50-Year Warranty Advantage',
        content: `<h2>Your Most Powerful Competitive Weapon</h2>
<p class="text-lg mb-6">Your 50-year full warranty isn't just a feature - it's proof of confidence, quality, and commitment that no competitor can match.</p>

<h3 class="text-2xl font-bold mb-4">Understanding the BRN 50-Year Full Warranty</h3>

<div class="warranty-breakdown bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">📋 What "Full Warranty" Means</h4>
  <p class="mb-4"><strong>Complete Coverage:</strong> Both workmanship AND materials are covered for the full 50 years.</p>
  
  <p class="mb-3"><strong>The Difference:</strong></p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div class="bg-white p-4 rounded">
      <p class="font-semibold text-red-600 mb-2">Typical Contractor:</p>
      <p>"We warranty our work for 1 year, manufacturer warranties materials for 25-30 years"</p>
    </div>
    <div class="bg-white p-4 rounded">
      <p class="font-semibold text-green-600 mb-2">Best Roofing Now:</p>
      <p>"We warranty EVERYTHING - our work AND the materials - for 50 full years"</p>
    </div>
  </div>
  
  <p class="mb-2"><strong>Customer Education Script:</strong></p>
  <p class="bg-blue-200 p-4 rounded">"Most roofing companies will tell you they warranty their work for a year or two, and then you're on your own except for manufacturer defects. We're different. For 50 years, if ANYTHING goes wrong - whether it's our installation or the materials - we fix it at no cost to you."</p>
</div>

<h3 class="text-2xl font-bold mb-4">How to Position the 50-Year Warranty</h3>

<div class="positioning-strategy bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🎯 Early in the Conversation</h4>
  <p class="mb-3"><strong>When to mention:</strong> Right after showing damage or explaining the need for replacement.</p>
  
  <p class="mb-2"><strong>Script:</strong></p>
  <p class="bg-white p-4 rounded">"Before we talk about anything else, I want you to know that everything we do comes with our 50-year full warranty. That means you'll never have to worry about this roof again - not just for a few years, but for five decades."</p>
</div>

<div class="positioning-strategy bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">💪 Against Competition</h4>
  <p class="mb-3"><strong>When customer mentions other quotes:</strong></p>
  
  <p class="mb-2"><strong>Script:</strong></p>
  <p class="bg-white p-4 rounded">"That's smart to get multiple quotes. When you compare them, ask each contractor this question: 'If something goes wrong with your work in 10 years, who pays to fix it?' Most will give you a complicated answer about manufacturer warranties and limited coverage. We'll say 'We do, and we'll fix it for free.'"</p>
</div>

<div class="positioning-strategy bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🛡️ Handling Price Objections</h4>
  <p class="mb-3"><strong>When price becomes an issue:</strong></p>
  
  <p class="mb-2"><strong>Script:</strong></p>
  <p class="bg-white p-4 rounded">"I understand you're looking at the upfront cost, but let's talk about the total cost of ownership. With our 50-year warranty, this is the last roof you'll ever buy. Other contractors might be cheaper today, but what happens when you need repairs in 5, 10, or 15 years? Those costs add up fast."</p>
</div>

<h3 class="text-2xl font-bold mb-4">Warranty Objection Handling</h3>

<div class="warranty-objection bg-red-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">"What if your company goes out of business?"</h4>
  <p class="mb-3"><strong>Your Response:</strong></p>
  <p class="bg-white p-4 rounded mb-4">"Great question! We've partnered with CertainTeed, one of the largest building material manufacturers in America. Our warranty is backed by their SureStart PLUS program, which means even if something happened to us, you're still covered. Plus, we've been growing steadily since 2021 and have the strongest financial backing in Charlotte."</p>
  
  <p class="mb-2"><strong>Follow-up proof points:</strong></p>
  <ul class="list-disc pl-6">
    <li>Show CertainTeed certification</li>
    <li>Mention our A+ BBB rating</li>
    <li>Reference our growth and stability</li>
    <li>Point out our investment in technology and training</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      },
      {
        moduleId: 'res-company-culture',
        title: 'Creating Magical Moments',
        content: `<h2>The Art of Creating Unforgettable Customer Experiences</h2>
<p class="text-lg mb-6">Magical moments turn customers into raving fans who refer everyone they know. Here's how to create them consistently.</p>

<h3 class="text-2xl font-bold mb-4">Understanding Magical Moments</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <p class="mb-4">A magical moment is when you exceed expectations so dramatically that customers can't help but tell others about it. It's not about grand gestures - it's about thoughtful, unexpected acts of service.</p>
  
  <h4 class="text-lg font-semibold mb-3">The Formula:</h4>
  <p class="bg-white p-4 rounded">Expectation + Unexpected Delight = Magical Moment</p>
</div>

<h3 class="text-2xl font-bold mb-4">Examples of BRN Magical Moments</h3>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="magical-moment bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏠 The Property Care Package</h4>
    <p class="mb-3"><strong>What we do:</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Clean gutters during installation</li>
      <li>Power wash driveway splatter</li>
      <li>Touch up paint on shutters</li>
      <li>Replace mailbox numbers</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Customer reaction:</strong> "They didn't just replace my roof - they made my whole house look better!"</p>
  </div>
  
  <div class="magical-moment bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🐕 The Pet Protocol</h4>
    <p class="mb-3"><strong>What we do:</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Remember pet names</li>
      <li>Bring dog treats</li>
      <li>Take photos of pets "supervising"</li>
      <li>Create safe zones during work</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Customer reaction:</strong> "They cared about Bella as much as they cared about our roof!"</p>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="magical-moment bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">☔ The Storm Follow-Up</h4>
    <p class="mb-3"><strong>What we do:</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Call after first major storm</li>
      <li>Free post-storm inspection</li>
      <li>Send weather alerts</li>
      <li>Priority emergency response</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Customer reaction:</strong> "They called to check on us before we even thought to check the roof!"</p>
  </div>
  
  <div class="magical-moment bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🎉 The Celebration Package</h4>
    <p class="mb-3"><strong>What we do:</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Completion celebration photo</li>
      <li>Anniversary card each year</li>
      <li>Referral rewards</li>
      <li>VIP customer events</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Customer reaction:</strong> "We're not just customers - we're part of the BRN family!"</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Creating Your Own Magical Moments</h3>

<div class="creation-guide bg-yellow-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The MAGIC Framework</h4>
  
  <div class="space-y-4">
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-lg mb-2">M - Make it Personal</p>
      <p>Remember names, preferences, and past conversations. Use their dog's name, ask about their vacation, remember their coffee order.</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-lg mb-2">A - Anticipate Needs</p>
      <p>Think ahead about what would make their life easier. Offer to move patio furniture, provide temporary shade, coordinate with their schedule.</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-lg mb-2">G - Go Beyond the Roof</p>
      <p>Notice what else could help them. Tighten a loose railing, oil a squeaky gate, recommend trusted contractors for other needs.</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-lg mb-2">I - Inspire Stories</p>
      <p>Do things worth talking about. The goal is for them to say "You won't believe what my roofer did..."</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-lg mb-2">C - Capture & Celebrate</p>
      <p>Document the moments. Take photos, share successes, celebrate with the customer.</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Implementation Checklist</h3>
<div class="bg-gray-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Daily Magical Moment Opportunities:</h4>
  <ul class="checklist space-y-2">
    <li class="flex items-center"><span class="mr-2">☐</span> Arrive 5 minutes early with a smile</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Compliment something about their home</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Ask about family/pets by name</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Offer to help with something unrelated</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Leave a handwritten thank you note</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Follow up unexpectedly</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Share a photo of their beautiful new roof</li>
    <li class="flex items-center"><span class="mr-2">☐</span> Remember and act on previous conversations</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 22
      }
    ]).returning();
    
    // Create lessons for Roofing Fundamentals module
    const roofingBasicsLessons = await db.insert(lessons).values([
      {
        moduleId: 'res-roofing-basics',
        title: 'Introduction to Residential Roofing',
        content: `<h2>Welcome to the World of Professional Roofing</h2>
<p class="text-lg mb-6">The roofing industry is one of the most stable and essential industries in America, with over $20 billion spent annually. As a BRN professional, you're part of an industry that literally keeps America covered.</p>

<h3 class="text-2xl font-bold mb-4">Industry Overview</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Market Size & Growth</h4>
  <ul class="list-disc pl-6 mb-4">
    <li>$19.9 billion industry in 2021</li>
    <li>Expected 4% annual growth</li>
    <li>50,000+ roofing businesses in the US</li>
    <li>87% are single-family homes</li>
  </ul>
  
  <div class="bg-white p-4 rounded">
    <p class="font-bold mb-2">Key Growth Drivers:</p>
    <ul class="list-disc pl-6">
      <li>Aging housing stock (average roof lasts 20-30 years)</li>
      <li>Increasing severe weather events</li>
      <li>Rising home values driving quality upgrades</li>
      <li>Energy efficiency awareness</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Why Roofing Matters</h3>
<div class="importance-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏠 Protection</h4>
    <p>A roof is a home's first line of defense against weather, protecting the family's biggest investment and everything they value inside.</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">💰 Investment</h4>
    <p>A new roof can return 60-70% of its cost in increased home value, making it one of the best home improvements for ROI.</p>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">⚡ Efficiency</h4>
    <p>Modern roofing materials can reduce energy costs by up to 30%, paying for themselves over time through utility savings.</p>
  </div>
  
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🛡️ Insurance</h4>
    <p>Many insurance companies offer discounts for impact-resistant roofing, and some won't insure homes with roofs over 20 years old.</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">State of the Industry 2024</h3>
<div class="bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Current Trends</h4>
  
  <div class="trend mb-4">
    <p class="font-bold">1. Technology Integration</p>
    <ul class="list-disc pl-6">
      <li>Drone inspections (like ours!) becoming standard</li>
      <li>Digital measurements and estimates</li>
      <li>Virtual consultations gaining popularity</li>
    </ul>
  </div>
  
  <div class="trend mb-4">
    <p class="font-bold">2. Material Evolution</p>
    <ul class="list-disc pl-6">
      <li>Impact-resistant shingles in high demand</li>
      <li>Cool roof technology for energy savings</li>
      <li>Sustainable and recycled materials growing</li>
    </ul>
  </div>
  
  <div class="trend mb-4">
    <p class="font-bold">3. Labor Market</p>
    <ul class="list-disc pl-6">
      <li>Skilled labor shortage driving wages up</li>
      <li>Increased focus on training and retention</li>
      <li>Technology helping crews work more efficiently</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Revenue Sources in Residential Roofing</h3>
<div class="bg-yellow-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Where the Money Comes From:</h4>
  <ul class="revenue-sources space-y-3">
    <li class="flex justify-between items-center bg-white p-3 rounded">
      <span class="font-semibold">Roof Replacements</span>
      <span class="text-green-600 font-bold">31%</span>
    </li>
    <li class="flex justify-between items-center bg-white p-3 rounded">
      <span class="font-semibold">Insurance Restoration</span>
      <span class="text-green-600 font-bold">28%</span>
    </li>
    <li class="flex justify-between items-center bg-white p-3 rounded">
      <span class="font-semibold">Repairs & Maintenance</span>
      <span class="text-green-600 font-bold">18%</span>
    </li>
    <li class="flex justify-between items-center bg-white p-3 rounded">
      <span class="font-semibold">New Construction</span>
      <span class="text-green-600 font-bold">13%</span>
    </li>
    <li class="flex justify-between items-center bg-white p-3 rounded">
      <span class="font-semibold">Commercial Projects</span>
      <span class="text-green-600 font-bold">10%</span>
    </li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 15
      },
      {
        moduleId: 'res-roofing-basics',
        title: 'The History and Evolution of Roofing',
        content: `<h2>From Caves to Modern Marvels: The Story of Roofing</h2>
<p class="text-lg mb-6">Understanding where roofing came from helps us appreciate where it's going. This knowledge makes you a more credible expert when talking with customers.</p>

<h3 class="text-2xl font-bold mb-4">Ancient Roofing (Pre-1800s)</h3>
<div class="timeline bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg mb-6">
  <div class="era mb-4">
    <h4 class="text-lg font-bold">🏛️ Early Civilizations</h4>
    <ul class="list-disc pl-6">
      <li><strong>China (3000 BC):</strong> First clay tiles - still used today!</li>
      <li><strong>Greece/Rome:</strong> Slate and tile roofing for durability</li>
      <li><strong>Northern Europe:</strong> Thatched roofs from straw and reeds</li>
      <li><strong>Middle East:</strong> Flat roofs for water collection</li>
    </ul>
  </div>
  
  <p class="bg-white p-4 rounded"><strong>Customer Connection:</strong> "Roofing has been protecting families for over 5,000 years. The materials have evolved, but the purpose remains the same - keeping your loved ones safe and dry."</p>
</div>

<h3 class="text-2xl font-bold mb-4">American Roofing Evolution</h3>
<div class="american-timeline space-y-4 mb-6">
  <div class="era bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏚️ Colonial Period (1600-1800)</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Wood shingles dominated (fire hazard!)</li>
      <li>Wealthy homes used slate or clay</li>
      <li>First building codes emerged after city fires</li>
    </ul>
    <p class="text-sm italic">Fun fact: Boston banned wood shingles in 1646 after major fires!</p>
  </div>
  
  <div class="era bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏭 Industrial Revolution (1800-1900)</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Mass production of roofing materials begins</li>
      <li>Asphalt discovered as waterproofing</li>
      <li>Metal roofing becomes affordable</li>
      <li>First roofing felt papers developed</li>
    </ul>
    <p class="text-sm italic">This era set the foundation for modern roofing!</p>
  </div>
  
  <div class="era bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏘️ Modern Era (1900-2000)</h4>
    <ul class="list-disc pl-6 mb-3">
      <li><strong>1903:</strong> First asphalt shingles invented</li>
      <li><strong>1950s:</strong> Fiberglass mat technology</li>
      <li><strong>1970s:</strong> Architectural shingles debut</li>
      <li><strong>1980s:</strong> Impact-resistant materials</li>
    </ul>
    <p class="text-sm italic">The birth of the roofing we know today!</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Digital Age of Roofing (2000-Present)</h3>
<div class="modern-era bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🚀 Technology Revolution</h4>
  
  <div class="innovation-grid grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Materials Innovation</p>
      <ul class="list-disc pl-6">
        <li>Solar-integrated shingles</li>
        <li>Cool roof technology</li>
        <li>Synthetic slate/shake</li>
        <li>Self-healing materials</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Process Innovation</p>
      <ul class="list-disc pl-6">
        <li>Drone inspections (BRN leads here!)</li>
        <li>Satellite measurements</li>
        <li>AI damage detection</li>
        <li>Digital documentation</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Future of Roofing</h3>
<div class="future-vision bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🔮 What's Coming Next</h4>
  
  <div class="future-trends space-y-3">
    <div class="trend bg-white p-4 rounded">
      <p class="font-bold">Smart Roofs</p>
      <p>Sensors detecting leaks, temperature regulation, automatic snow melting</p>
    </div>
    
    <div class="trend bg-white p-4 rounded">
      <p class="font-bold">Sustainable Materials</p>
      <p>Recycled plastics, living roofs, carbon-negative materials</p>
    </div>
    
    <div class="trend bg-white p-4 rounded">
      <p class="font-bold">Robotic Installation</p>
      <p>Automated shingle placement, precision cutting, safer installations</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Why History Matters in Sales</h3>
<div class="sales-application bg-yellow-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Using History to Build Trust</h4>
  
  <p class="mb-4">When you understand roofing history, you position yourself as an expert, not just a salesperson.</p>
  
  <div class="script bg-white p-4 rounded mb-4">
    <p class="font-bold mb-2">Example Customer Script:</p>
    <p>"You know, it's fascinating how roofing has evolved. Your neighborhood was built in the 1990s, so you probably have the second generation of architectural shingles. The technology has improved so much since then - today's shingles have better adhesion, impact resistance, and warranties that were unimaginable back then. Let me show you what 30 years of innovation looks like..."</p>
  </div>
  
  <p class="font-bold">Key Talking Points:</p>
  <ul class="list-disc pl-6">
    <li>Connect their home's age to roofing evolution</li>
    <li>Explain how modern materials solve old problems</li>
    <li>Position yourself as an educator, not a pushy salesperson</li>
    <li>Show how BRN uses cutting-edge technology (drones!) with time-tested craftsmanship</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-roofing-basics',
        title: 'Roof Shapes and Styles',
        content: `<h2>Understanding Roof Architecture</h2>
<p class="text-lg mb-6">Every roof shape has a purpose, advantages, and unique challenges. Master this knowledge to speak intelligently about any home you encounter.</p>

<h3 class="text-2xl font-bold mb-4">Common Roof Shapes</h3>

<div class="roof-type bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏠 Gable Roof (Most Common)</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Description:</strong> Triangle-shaped, two slopes meeting at a ridge</p>
      <p class="mb-3"><strong>Popularity:</strong> 75% of American homes</p>
      
      <p class="font-bold mb-2">Advantages:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Excellent water drainage</li>
        <li>More attic space</li>
        <li>Good ventilation options</li>
        <li>Cost-effective to build</li>
      </ul>
    </div>
    
    <div>
      <p class="font-bold mb-2">Challenges:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Vulnerable to high winds</li>
        <li>Can lift in hurricanes</li>
        <li>Requires good bracing</li>
      </ul>
      
      <div class="bg-white p-4 rounded mt-4">
        <p class="font-bold mb-2">Sales Tip:</p>
        <p>"With gable roofs, proper installation of ridge vents and wind-resistant shingles is crucial. Our 130mph wind warranty gives you peace of mind."</p>
      </div>
    </div>
  </div>
</div>

<div class="roof-type bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏡 Hip Roof</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Description:</strong> Four slopes, all meeting at the top</p>
      <p class="mb-3"><strong>Popularity:</strong> Common in hurricane zones</p>
      
      <p class="font-bold mb-2">Advantages:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Most wind-resistant design</li>
        <li>Stable in storms</li>
        <li>Good for insurance rates</li>
        <li>No flat walls exposed</li>
      </ul>
    </div>
    
    <div>
      <p class="font-bold mb-2">Challenges:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>More complex = higher cost</li>
        <li>Less attic space</li>
        <li>More seams = potential leaks</li>
        <li>Requires experienced installers</li>
      </ul>
      
      <div class="bg-white p-4 rounded mt-4">
        <p class="font-bold mb-2">Sales Tip:</p>
        <p>"Hip roofs already have great wind resistance. Combined with our impact-resistant shingles, you'll have maximum storm protection."</p>
      </div>
    </div>
  </div>
</div>

<div class="roof-type bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏘️ Complex/Combination Roofs</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Description:</strong> Mix of valleys, hips, gables, and dormers</p>
      <p class="mb-3"><strong>Popularity:</strong> Common in custom homes</p>
      
      <p class="font-bold mb-2">Advantages:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Architecturally interesting</li>
        <li>Adds home value</li>
        <li>Room for additions</li>
        <li>Multiple attic spaces</li>
      </ul>
    </div>
    
    <div>
      <p class="font-bold mb-2">Challenges:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Many potential leak points</li>
        <li>Valleys collect debris</li>
        <li>Higher installation cost</li>
        <li>Complex flashing needed</li>
      </ul>
      
      <div class="bg-white p-4 rounded mt-4">
        <p class="font-bold mb-2">Sales Tip:</p>
        <p>"Complex roofs require master craftsmen. Our certified installers specialize in proper valley and flashing installation - that's where amateur roofers fail."</p>
      </div>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Other Common Roof Types</h3>

<div class="other-roofs grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="roof-card bg-purple-50 p-4 rounded-lg">
    <h4 class="font-bold mb-2">Mansard Roof</h4>
    <ul class="list-disc pl-6">
      <li>Four-sided with double slopes</li>
      <li>French-inspired design</li>
      <li>Maximum living space</li>
      <li>Expensive but elegant</li>
    </ul>
  </div>
  
  <div class="roof-card bg-yellow-50 p-4 rounded-lg">
    <h4 class="font-bold mb-2">Gambrel Roof</h4>
    <ul class="list-disc pl-6">
      <li>Barn-style design</li>
      <li>Two slopes on each side</li>
      <li>Great attic space</li>
      <li>Classic American look</li>
    </ul>
  </div>
  
  <div class="roof-card bg-pink-50 p-4 rounded-lg">
    <h4 class="font-bold mb-2">Flat/Low Slope</h4>
    <ul class="list-disc pl-6">
      <li>Modern aesthetic</li>
      <li>Usable roof space</li>
      <li>Requires special materials</li>
      <li>Regular maintenance crucial</li>
    </ul>
  </div>
  
  <div class="roof-card bg-indigo-50 p-4 rounded-lg">
    <h4 class="font-bold mb-2">Shed Roof</h4>
    <ul class="list-disc pl-6">
      <li>Single sloping plane</li>
      <li>Modern/minimalist</li>
      <li>Easy to build</li>
      <li>Good for additions</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Roof Pitch: The Critical Factor</h3>
<div class="pitch-guide bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Understanding Pitch/Slope</h4>
  
  <p class="mb-4">Pitch is expressed as rise over run (e.g., 6/12 = 6 inches rise per 12 inches horizontal)</p>
  
  <div class="pitch-categories space-y-3">
    <div class="bg-white p-4 rounded">
      <p class="font-bold">Low Slope (0/12 to 3/12)</p>
      <ul class="list-disc pl-6">
        <li>Requires special materials (not shingles)</li>
        <li>Membrane or built-up roofing</li>
        <li>Standing water concerns</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold">Conventional (4/12 to 9/12)</p>
      <ul class="list-disc pl-6">
        <li>Ideal for shingles</li>
        <li>Good water runoff</li>
        <li>Walkable for maintenance</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold">Steep Slope (10/12 and up)</p>
      <ul class="list-disc pl-6">
        <li>Excellent drainage</li>
        <li>More visible from street</li>
        <li>Higher installation cost</li>
        <li>Special equipment needed</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Using Roof Knowledge in Sales</h3>
<div class="sales-application bg-blue-100 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Professional Assessment Script</h4>
  
  <div class="bg-white p-4 rounded">
    <p class="mb-3">"I see you have a [ROOF TYPE] with approximately a [PITCH] slope. This design has some great advantages like [LIST ADVANTAGES], though we'll want to pay special attention to [POTENTIAL CHALLENGES]."</p>
    
    <p class="mb-3">"With this roof style, I always recommend [SPECIFIC SOLUTION] because [TECHNICAL REASON]. For example, on your valleys here, we'll use [SPECIFIC TECHNIQUE] to ensure long-term protection."</p>
    
    <p>"The good news is, our installation crew specializes in [ROOF TYPE] roofs. We've done over [NUMBER] in [NEIGHBORHOOD] alone. Let me show you some examples..."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-roofing-basics',
        title: 'Parts of a Roof System',
        content: `<h2>The Anatomy of a Roof: Know Every Component</h2>
<p class="text-lg mb-6">A roof is a complex system where every component plays a crucial role. Master this vocabulary to communicate professionally and identify issues accurately.</p>

<h3 class="text-2xl font-bold mb-4">The Complete Roof System</h3>
<div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg mb-6">
  <p class="text-lg mb-4">Think of a roof as a protective shield with multiple layers, each serving a specific purpose. Missing or failing any component compromises the entire system.</p>
  
  <div class="bg-white p-4 rounded">
    <p class="font-bold mb-2">The 7-Layer Protection System:</p>
    <ol class="list-decimal pl-6">
      <li>Roof Deck (Structure)</li>
      <li>Underlayment (Water Barrier)</li>
      <li>Ice & Water Shield (Critical Areas)</li>
      <li>Starter Strips (Edge Protection)</li>
      <li>Field Shingles (Primary Defense)</li>
      <li>Hip & Ridge Caps (Peak Protection)</li>
      <li>Ventilation System (Airflow)</li>
    </ol>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Critical Roof Components</h3>

<div class="component bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏗️ Roof Deck/Sheathing</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>What it is:</strong> The wooden boards (usually OSB or plywood) that form the roof's foundation</p>
      
      <p class="font-bold mb-2">Key Points:</p>
      <ul class="list-disc pl-6">
        <li>Should be minimum 7/16" thick</li>
        <li>Must be properly spaced (1/8" gap)</li>
        <li>Checked for rot or damage</li>
        <li>H-clips between panels prevent sagging</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Common Issues to Spot:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Sagging between rafters</li>
        <li>Dark water stains</li>
        <li>Delamination (layers separating)</li>
        <li>Inadequate thickness</li>
      </ul>
      
      <p class="text-sm italic">Sales Tip: "We always inspect the decking before installation. Bad decking under new shingles is like putting makeup on a broken foundation."</p>
    </div>
  </div>
</div>

<div class="component bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🛡️ Underlayment</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>What it is:</strong> The protective layer between deck and shingles</p>
      
      <p class="font-bold mb-2">Types We Use:</p>
      <ul class="list-disc pl-6">
        <li><strong>Synthetic:</strong> Superior tear resistance</li>
        <li><strong>Felt:</strong> Traditional, budget option</li>
        <li><strong>Self-adhering:</strong> Premium protection</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Why It Matters:</p>
      <p class="mb-2">Underlayment is your secondary defense when shingles fail. It can mean the difference between a small repair and interior damage.</p>
      
      <p class="text-sm italic">Customer Script: "We use synthetic underlayment that's 10x stronger than traditional felt. It's like having a bulletproof vest under your shingles."</p>
    </div>
  </div>
</div>

<div class="component bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">❄️ Ice & Water Shield</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>What it is:</strong> Self-adhering membrane for vulnerable areas</p>
      
      <p class="font-bold mb-2">Where It Goes:</p>
      <ul class="list-disc pl-6">
        <li>Eaves (first 3 feet minimum)</li>
        <li>Valleys (full length)</li>
        <li>Around all penetrations</li>
        <li>Chimneys and skylights</li>
        <li>Low-slope areas</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">The Magic:</p>
      <p class="mb-2">Self-seals around nails, creating a watertight barrier. Required by code in snow regions.</p>
      
      <p class="text-sm italic">Sales Point: "Ice dams caused $2.3 billion in damage last winter. Our ice & water shield in all critical areas gives you complete protection."</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Visible Roof Components</h3>

<div class="visible-components grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="component-card bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏠 Field Shingles</h4>
    <p class="mb-2"><strong>Purpose:</strong> Primary weather protection</p>
    <ul class="list-disc pl-6">
      <li>Cover 80% of roof area</li>
      <li>Overlapping design sheds water</li>
      <li>Multiple style options</li>
      <li>25-50 year warranties</li>
    </ul>
  </div>
  
  <div class="component-card bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🎩 Ridge Caps</h4>
    <p class="mb-2"><strong>Purpose:</strong> Protect roof peak</p>
    <ul class="list-disc pl-6">
      <li>Specially designed for bending</li>
      <li>Enhanced wind resistance</li>
      <li>Often impact-resistant</li>
      <li>Critical ventilation component</li>
    </ul>
  </div>
  
  <div class="component-card bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">📐 Valleys</h4>
    <p class="mb-2"><strong>Purpose:</strong> Channel water where slopes meet</p>
    <ul class="list-disc pl-6">
      <li>Handle 10x normal water flow</li>
      <li>Open vs. closed valley methods</li>
      <li>Premium valley metals available</li>
      <li>#1 leak location if done wrong</li>
    </ul>
  </div>
  
  <div class="component-card bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🔧 Flashing</h4>
    <p class="mb-2"><strong>Purpose:</strong> Seal roof penetrations</p>
    <ul class="list-disc pl-6">
      <li>Step flashing at walls</li>
      <li>Pipe boots for plumbing</li>
      <li>Chimney flashing systems</li>
      <li>Must be replaced with roof</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Ventilation System</h3>
<div class="ventilation bg-yellow-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🌬️ Proper Airflow is Critical</h4>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="font-bold mb-2">Intake Ventilation:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Soffit vents (under eaves)</li>
        <li>Drip edge vents</li>
        <li>Smart vents</li>
      </ul>
      
      <p class="font-bold mb-2">Exhaust Ventilation:</p>
      <ul class="list-disc pl-6">
        <li>Ridge vents (best option)</li>
        <li>Box vents</li>
        <li>Power vents</li>
        <li>Turbine vents</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Why Ventilation Matters:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>Prevents ice dams</li>
        <li>Reduces summer heat (30°F cooler!)</li>
        <li>Stops moisture damage</li>
        <li>Extends shingle life by 25%</li>
        <li>Required for warranty</li>
      </ul>
      
      <p class="text-sm italic">Key Stat: "Poor ventilation voids most manufacturer warranties. We calculate exact ventilation needs for your home."</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Using Component Knowledge in Sales</h3>
<div class="sales-scripts bg-gray-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Professional Inspection Script</h4>
  
  <div class="script bg-white p-4 rounded mb-4">
    <p class="mb-3">"Let me walk you through what I'm seeing on your roof. Starting with the shingles, I notice [SPECIFIC OBSERVATION]. But shingles are just the visible part - it's what's underneath that really protects your home."</p>
    
    <p class="mb-3">"Your valleys here [POINT TO AREA] handle enormous water volume during storms. I can see the current flashing is [CONDITION]. We'll install new valley metal with ice & water shield extending 3 feet on each side."</p>
    
    <p>"I'm also checking your ventilation. You currently have [TYPE], but I'm calculating you need [AMOUNT] of net free area. Proper ventilation can reduce your cooling costs by 15% and prevent winter ice dams."</p>
  </div>
  
  <p class="font-bold mb-2">Component Checklist for Every Inspection:</p>
  <ul class="checklist space-y-1">
    <li>☐ Shingle condition and age</li>
    <li>☐ Valley integrity</li>
    <li>☐ Flashing around all penetrations</li>
    <li>☐ Ridge cap condition</li>
    <li>☐ Gutter and drip edge</li>
    <li>☐ Ventilation calculation</li>
    <li>☐ Visible decking issues</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 30
      },
      {
        moduleId: 'res-roofing-basics',
        title: 'Types of Roofing Materials',
        content: `<h2>Mastering Roofing Materials: Your Product Knowledge Bible</h2>
<p class="text-lg mb-6">Deep product knowledge builds trust and helps customers make confident decisions. Become the expert who can explain not just what we sell, but why it's the best choice.</p>

<h3 class="text-2xl font-bold mb-4">Asphalt Shingles: The American Standard</h3>
<div class="material-overview bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">📊 Market Dominance</h4>
  <ul class="stats-list mb-4">
    <li>• 80% of American homes use asphalt shingles</li>
    <li>• $7.5 billion annual market</li>
    <li>• 12.5 billion square feet installed yearly</li>
  </ul>
  
  <div class="bg-white p-4 rounded">
    <p class="font-bold mb-2">Why Asphalt Dominates:</p>
    <ul class="list-disc pl-6">
      <li>Best cost-to-performance ratio</li>
      <li>Easy installation and repair</li>
      <li>Wide variety of styles and colors</li>
      <li>Proven 100+ year track record</li>
      <li>Suitable for most climates</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Types of Asphalt Shingles</h3>

<div class="shingle-type bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏠 3-Tab Shingles (Basic)</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Characteristics:</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Single layer construction</li>
        <li>Flat appearance</li>
        <li>Uniform look</li>
        <li>Lighter weight (200-250 lbs/square)</li>
        <li>20-25 year warranties</li>
      </ul>
      
      <p class="font-bold mb-2">Price Range:</p>
      <p>$90-120 per square installed</p>
    </div>
    
    <div>
      <p class="font-bold mb-2">Pros:</p>
      <ul class="list-disc pl-6 mb-3 text-green-700">
        <li>Most affordable option</li>
        <li>Easy to repair</li>
        <li>Classic appearance</li>
      </ul>
      
      <p class="font-bold mb-2">Cons:</p>
      <ul class="list-disc pl-6 mb-3 text-red-700">
        <li>Shorter lifespan</li>
        <li>Less wind resistance</li>
        <li>Can look "cheap"</li>
        <li>Limited style options</li>
      </ul>
      
      <div class="bg-white p-3 rounded mt-3">
        <p class="text-sm italic">BRN Position: "We can install 3-tab, but for just 15% more, architectural shingles double your wind resistance and add tremendous curb appeal."</p>
      </div>
    </div>
  </div>
</div>

<div class="shingle-type bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🏆 Architectural Shingles (Our Recommendation)</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Characteristics:</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Multi-layer laminated construction</li>
        <li>Dimensional appearance</li>
        <li>Random tab sizes</li>
        <li>Heavier (350-450 lbs/square)</li>
        <li>30-50 year warranties</li>
      </ul>
      
      <p class="font-bold mb-2">Price Range:</p>
      <p>$150-250 per square installed</p>
    </div>
    
    <div>
      <p class="font-bold mb-2">Pros:</p>
      <ul class="list-disc pl-6 mb-3 text-green-700">
        <li>Superior durability</li>
        <li>110-130 mph wind rating</li>
        <li>Beautiful shadow lines</li>
        <li>Hides imperfections</li>
        <li>Better warranties</li>
      </ul>
      
      <p class="font-bold mb-2">Cons:</p>
      <ul class="list-disc pl-6 mb-3 text-red-700">
        <li>Higher upfront cost</li>
        <li>Heavier (structure consideration)</li>
      </ul>
      
      <div class="bg-white p-3 rounded mt-3">
        <p class="text-sm italic">BRN Advantage: "Our CertainTeed Landmark PRO shingles are the Mercedes of architectural shingles - that's why we can offer the 50-year warranty."</p>
      </div>
    </div>
  </div>
</div>

<div class="shingle-type bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">💎 Designer/Luxury Shingles</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="mb-3"><strong>Characteristics:</strong></p>
      <ul class="list-disc pl-6 mb-4">
        <li>Multi-layer, maximum dimension</li>
        <li>Mimic slate, wood, or tile</li>
        <li>Heaviest weight (450+ lbs/square)</li>
        <li>Lifetime warranties available</li>
        <li>Premium aesthetics</li>
      </ul>
      
      <p class="font-bold mb-2">Price Range:</p>
      <p>$300-500+ per square installed</p>
    </div>
    
    <div>
      <p class="font-bold mb-2">Perfect For:</p>
      <ul class="list-disc pl-6 mb-3">
        <li>High-end homes</li>
        <li>Historical reproductions</li>
        <li>Maximum curb appeal</li>
        <li>Homeowners planning to stay long-term</li>
      </ul>
      
      <div class="bg-white p-3 rounded">
        <p class="text-sm italic">Sales Tip: "These give you the look of a $50,000 slate roof for a fraction of the cost, with better performance and our 50-year warranty."</p>
      </div>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Alternative Roofing Materials</h3>

<div class="alternatives grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="alt-material bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏺 Clay/Concrete Tile</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>50-100+ year lifespan</li>
      <li>Fireproof</li>
      <li>$300-1000/square</li>
      <li>Very heavy (structure concerns)</li>
      <li>Fragile to walk on</li>
    </ul>
    <p class="text-sm italic">Market Position: "Beautiful but requires reinforced structure. Our architectural shingles give similar aesthetics without the weight."</p>
  </div>
  
  <div class="alt-material bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🪨 Natural Slate</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>100+ year lifespan</li>
      <li>Ultimate prestige</li>
      <li>$800-1500/square</li>
      <li>Extremely heavy</li>
      <li>Specialized installation</li>
    </ul>
    <p class="text-sm italic">Market Position: "Gorgeous but 10x our price. Our luxury shingles mimic slate perfectly at 80% less cost."</p>
  </div>
  
  <div class="alt-material bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🏗️ Metal Roofing</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>40-70 year lifespan</li>
      <li>Energy efficient</li>
      <li>$300-700/square</li>
      <li>Can be noisy</li>
      <li>Denting concerns</li>
    </ul>
    <p class="text-sm italic">Market Position: "Great option but consider our impact-resistant shingles - similar longevity, better sound dampening, easier repairs."</p>
  </div>
  
  <div class="alt-material bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">🌲 Wood Shingles/Shakes</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Natural beauty</li>
      <li>30-50 years if maintained</li>
      <li>$350-500/square</li>
      <li>Fire risk</li>
      <li>High maintenance</li>
    </ul>
    <p class="text-sm italic">Market Position: "Love the look? Our designer shingles give you wood aesthetics with zero maintenance and fire safety."</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Understanding Shingle Technology</h3>
<div class="technology bg-yellow-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🔬 What Makes Quality Shingles</h4>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <p class="font-bold mb-2">Construction Elements:</p>
      <ul class="list-disc pl-6">
        <li><strong>Mat:</strong> Fiberglass for strength</li>
        <li><strong>Asphalt:</strong> Waterproofing layer</li>
        <li><strong>Granules:</strong> UV protection & color</li>
        <li><strong>Sealant Strip:</strong> Wind resistance</li>
        <li><strong>Release Film:</strong> Prevents sticking</li>
      </ul>
    </div>
    
    <div>
      <p class="font-bold mb-2">Advanced Features:</p>
      <ul class="list-disc pl-6">
        <li><strong>StreakFighter:</strong> Algae resistance</li>
        <li><strong>NailTrak:</strong> Wider nailing area</li>
        <li><strong>QuadraBond:</strong> 4x adhesion</li>
        <li><strong>Impact Resistance:</strong> Class 4 rating</li>
        <li><strong>Cool Roof:</strong> Reflects heat</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The BRN Material Advantage</h3>
<div class="brn-advantage bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Why We Recommend CertainTeed</h4>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">🏆 Industry Leader</p>
      <ul class="list-disc pl-6">
        <li>120+ years experience</li>
        <li>Most trusted brand</li>
        <li>Highest quality standards</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">🛡️ Best Warranties</p>
      <ul class="list-disc pl-6">
        <li>SureStart PLUS coverage</li>
        <li>Transferable protection</li>
        <li>No proration period</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">🎨 Superior Options</p>
      <ul class="list-disc pl-6">
        <li>Most color choices</li>
        <li>Matching accessories</li>
        <li>Designer collections</li>
      </ul>
    </div>
  </div>
  
  <div class="bg-blue-200 p-4 rounded mt-4">
    <p class="font-bold mb-2">Your Material Script:</p>
    <p>"We're CertainTeed certified installers, which means we can offer their best warranties. When you combine their premium materials with our certified installation and 50-year full warranty, you're getting the ultimate roofing protection available today."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 5,
        estimatedMinutes: 35
      },
      {
        moduleId: 'res-roofing-basics',
        title: 'The Value of a New Roof',
        content: `<h2>Communicating ROI: Why a New Roof is a Smart Investment</h2>
<p class="text-lg mb-6">Master the art of showing value beyond price. When customers understand the true benefits, price becomes secondary to value.</p>

<h3 class="text-2xl font-bold mb-4">The Investment Mindset Shift</h3>
<div class="mindset-shift bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">From Cost to Investment</h4>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-red-600 mb-2">❌ Wrong Approach:</p>
      <p>"A new roof costs $15,000"</p>
      <p class="text-sm mt-2">This creates sticker shock and resistance</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold text-green-600 mb-2">✅ Right Approach:</p>
      <p>"A new roof investment returns $10,500 in home value, saves $200/year in energy, and protects your $400,000 home"</p>
      <p class="text-sm mt-2">This frames it as a smart financial decision</p>
    </div>
  </div>
  
  <div class="bg-yellow-100 p-4 rounded mt-4">
    <p class="font-bold">The Reframing Script:</p>
    <p>"I understand $15,000 seems like a lot. But let's look at what you're really getting: immediate home value increase, energy savings, insurance benefits, and 50 years of worry-free protection. When you break it down, that's just $25 per month for complete peace of mind."</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Quantifiable Financial Benefits</h3>

<div class="financial-benefits bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">💰 1. Home Value Increase</h4>
  
  <div class="stats-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div class="bg-white p-4 rounded">
      <p class="text-2xl font-bold text-green-600">68.8%</p>
      <p class="font-semibold">Average ROI on roof replacement</p>
      <p class="text-sm">Source: Remodeling Magazine 2023</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="text-2xl font-bold text-green-600">$15,000</p>
      <p class="font-semibold">Average value added to home</p>
      <p class="text-sm">On typical $300,000 home</p>
    </div>
  </div>
  
  <div class="bg-green-100 p-4 rounded">
    <p class="font-bold mb-2">Real Estate Agent Script:</p>
    <p>"Real estate agents tell us that homes with new roofs sell 7% faster and for 5% more money. Buyers see a new roof as one less major expense they'll face."</p>
  </div>
</div>

<div class="financial-benefits bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">⚡ 2. Energy Savings</h4>
  
  <div class="savings-calculator bg-white p-4 rounded mb-4">
    <p class="font-bold mb-3">Annual Savings Breakdown:</p>
    <ul class="space-y-2">
      <li class="flex justify-between">
        <span>Improved ventilation:</span>
        <span class="font-bold text-green-600">$150-200/year</span>
      </li>
      <li class="flex justify-between">
        <span>Reflective shingles:</span>
        <span class="font-bold text-green-600">$100-150/year</span>
      </li>
      <li class="flex justify-between">
        <span>Better insulation:</span>
        <span class="font-bold text-green-600">$50-100/year</span>
      </li>
      <li class="flex justify-between border-t pt-2">
        <span class="font-bold">Total Annual Savings:</span>
        <span class="font-bold text-green-600">$300-450</span>
      </li>
    </ul>
  </div>
  
  <div class="bg-orange-100 p-4 rounded">
    <p class="font-bold mb-2">Energy Savings Script:</p>
    <p>"With proper ventilation and our energy-efficient shingles, customers typically see their summer cooling bills drop by 15-20%. Over 20 years, that's $6,000-9,000 in savings."</p>
  </div>
</div>

<div class="financial-benefits bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">🛡️ 3. Insurance Benefits</h4>
  
  <div class="insurance-grid grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p class="font-bold mb-2">Premium Discounts:</p>
      <ul class="list-disc pl-6">
        <li>Impact-resistant: 15-35% off</li>
        <li>New roof: 5-10% off</li>
        <li>Wind-rated: 10-20% off</li>
        <li>Annual savings: $200-800</li>
      </ul>
    </div>
    
    <div>
      <p class="font-bold mb-2">Coverage Benefits:</p>
      <ul class="list-disc pl-6">
        <li>Maintains insurability</li>
        <li>Lower deductibles available</li>
        <li>Full replacement coverage</li>
        <li>No depreciation penalties</li>
      </ul>
    </div>
  </div>
  
  <div class="bg-purple-100 p-4 rounded mt-4">
    <p class="font-bold mb-2">Insurance Script:</p>
    <p>"Many insurance companies won't renew policies on roofs over 20 years old. Plus, with our impact-resistant shingles, you'll qualify for significant discounts. One customer saved $600/year - that's $30,000 over the life of the roof!"</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Emotional & Lifestyle Benefits</h3>

<div class="emotional-benefits bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">❤️ Beyond the Numbers</h4>
  
  <div class="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="benefit-card bg-white p-4 rounded">
      <h5 class="font-bold mb-2">🏡 Pride of Ownership</h5>
      <p>"There's something special about pulling into your driveway and seeing a beautiful new roof. It's like your home got a facelift."</p>
    </div>
    
    <div class="benefit-card bg-white p-4 rounded">
      <h5 class="font-bold mb-2">😌 Peace of Mind</h5>
      <p>"No more buckets in the attic during storms. No more worrying every time the weather forecast shows rain."</p>
    </div>
    
    <div class="benefit-card bg-white p-4 rounded">
      <h5 class="font-bold mb-2">👨‍👩‍👧‍👦 Family Protection</h5>
      <p>"Your roof protects everything you love. With our 50-year warranty, you're protecting them for generations."</p>
    </div>
    
    <div class="benefit-card bg-white p-4 rounded">
      <h5 class="font-bold mb-2">🏆 Neighborhood Status</h5>
      <p>"Be the house everyone admires. We've done 15 roofs on your street - ask your neighbors how they feel about their decision."</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Cost of NOT Replacing</h3>

<div class="cost-of-waiting bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">⚠️ The Hidden Costs of Delay</h4>
  
  <div class="costs-timeline bg-white p-4 rounded mb-4">
    <p class="font-bold mb-3">What Happens When You Wait:</p>
    
    <div class="timeline space-y-3">
      <div class="year">
        <p class="font-semibold">Year 1-2: Minor Issues</p>
        <ul class="list-disc pl-6 text-sm">
          <li>Small leaks: $500-1,000 repairs</li>
          <li>Energy loss: $300-400/year</li>
          <li>Insurance increases: $100-200/year</li>
        </ul>
      </div>
      
      <div class="year">
        <p class="font-semibold">Year 3-5: Growing Problems</p>
        <ul class="list-disc pl-6 text-sm">
          <li>Multiple leaks: $2,000-5,000</li>
          <li>Decking damage: $3,000-7,000</li>
          <li>Interior damage: $5,000-10,000</li>
          <li>Mold remediation: $3,000-8,000</li>
        </ul>
      </div>
      
      <div class="year">
        <p class="font-semibold">Year 5+: Major Failure</p>
        <ul class="list-disc pl-6 text-sm">
          <li>Structural damage: $10,000-25,000</li>
          <li>Complete tear-off required: +$3,000</li>
          <li>Emergency premiums: +50%</li>
          <li>Possible uninsurability</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="bg-red-100 p-4 rounded">
    <p class="font-bold mb-2">The Delay Cost Script:</p>
    <p>"I've seen homeowners spend $30,000 fixing damage that could have been prevented with a $15,000 roof replacement. Plus, emergency repairs always cost 2-3x more than planned replacements. Why risk it?"</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Value Comparison Framework</h3>

<div class="comparison bg-gray-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">📊 Putting It in Perspective</h4>
  
  <div class="comparisons space-y-3">
    <div class="bg-white p-4 rounded">
      <p class="font-bold">vs. Kitchen Remodel</p>
      <p>"A kitchen remodel costs $40,000 and returns 59% ROI. A new roof costs $15,000 and returns 68% ROI, PLUS protects that kitchen investment."</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold">vs. New Car</p>
      <p>"A new car loses 20% value driving off the lot. A new roof adds immediate value and protects your biggest investment for 50 years."</p>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold">vs. Daily Coffee</p>
      <p>"At $25/month over 50 years, your new roof costs less than a daily Starbucks habit, but protects your entire home."</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Value Close</h3>
<div class="value-close bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Bringing It All Together</h4>
  
  <div class="closing-script bg-white p-4 rounded">
    <p class="font-bold mb-3">The Ultimate Value Script:</p>
    
    <p class="mb-3">"Let me summarize the value you're getting with your new roof investment:</p>
    
    <ul class="list-disc pl-6 mb-3">
      <li>Immediate home value increase of $10,000-15,000</li>
      <li>Energy savings of $300-450 per year</li>
      <li>Insurance discounts saving you $200-800 annually</li>
      <li>50-year warranty protecting against future costs</li>
      <li>Peace of mind that your family is protected</li>
    </ul>
    
    <p class="mb-3">When you add it all up, your roof pays for itself while giving you five decades of protection. The only question is: do you want to capture these benefits now, or pay more to fix problems later?"</p>
    
    <p class="font-bold">Then stop talking and wait for their response.</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 6,
        estimatedMinutes: 28
      }
    ]).returning();
    
    console.log('Company culture and roofing basics lessons created.');
    
    // Add quiz questions for the company culture module
    await db.insert(quizQuestions).values([
      {
        moduleId: 'res-company-culture',
        question: 'What does the "I" in our I-L-W-S-C-C value system stand for?',
        options: JSON.stringify([
          'Innovation',
          'Integrity with Transparency',
          'Investment',
          'Improvement'
        ]),
        correctAnswer: 1,
        explanation: 'The "I" stands for Integrity with Transparency - we never hide anything from customers.'
      },
      {
        moduleId: 'res-company-culture',
        question: 'How long is our full warranty coverage?',
        options: JSON.stringify([
          '10 years',
          '25 years',
          '50 years',
          '30 years'
        ]),
        correctAnswer: 2,
        explanation: 'We offer a 50-year full warranty covering both workmanship AND materials.'
      },
      {
        moduleId: 'res-company-culture',
        question: 'What year was Best Roofing Now founded?',
        options: JSON.stringify([
          '2019',
          '2020',
          '2021',
          '2022'
        ]),
        correctAnswer: 2,
        explanation: 'Best Roofing Now was founded in 2021 by Fred and James Turner, a father-son team in Charlotte.'
      },
      {
        moduleId: 'res-company-culture',
        question: 'What technology gives BRN a major competitive advantage?',
        options: JSON.stringify([
          'Virtual Reality headsets',
          'Drone inspections',
          'Robot installers',
          '3D printing'
        ]),
        correctAnswer: 1,
        explanation: 'Our drone technology allows us to see every detail of a roof safely and accurately, missing nothing.'
      }
    ]).returning();
    
    // Add quiz questions for roofing basics module
    await db.insert(quizQuestions).values([
      {
        moduleId: 'res-roofing-basics',
        question: 'What percentage of American homes use asphalt shingles?',
        options: JSON.stringify([
          '50%',
          '65%',
          '80%',
          '90%'
        ]),
        correctAnswer: 2,
        explanation: '80% of American homes use asphalt shingles due to their excellent cost-to-performance ratio.'
      },
      {
        moduleId: 'res-roofing-basics',
        question: 'What is the most common roof shape in America?',
        options: JSON.stringify([
          'Hip roof',
          'Gable roof',
          'Flat roof',
          'Mansard roof'
        ]),
        correctAnswer: 1,
        explanation: 'Gable roofs (triangle-shaped with two slopes) are found on 75% of American homes.'
      },
      {
        moduleId: 'res-roofing-basics',
        question: 'What is the minimum recommended roof deck thickness?',
        options: JSON.stringify([
          '1/4 inch',
          '3/8 inch',
          '7/16 inch',
          '1/2 inch'
        ]),
        correctAnswer: 2,
        explanation: 'Roof decking should be minimum 7/16" thick for proper structural support.'
      }
    ]).returning();
    
    console.log('Quiz questions created.');
    console.log('Training content seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding training data:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the seed function
seedTrainingData().catch(console.error);