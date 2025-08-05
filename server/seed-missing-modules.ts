import { db } from './db';
import { trainingModules, lessons, quizQuestions, trainingTracks } from '@shared/schema';

async function seedMissingModules() {
  console.log('Starting to seed missing modules...');
  
  try {
    // First, create a new track for general company resources
    const [generalTrack] = await db.insert(trainingTracks).values({
      id: 'general-resources',
      name: 'General Resources',
      description: 'Company culture, certifications, and resources',
      icon: 'fas fa-book',
      color: 'green',
      totalModules: 3
    }).returning();
    
    console.log('Created general resources track');
    
    // Create the missing modules
    const modules = await db.insert(trainingModules).values([
      {
        id: 'gen-company-culture',
        trackId: 'general-resources',
        title: 'Company Culture & Values',
        description: 'Learn about Best Roofing Now\'s mission, values, and culture',
        icon: 'fas fa-star',
        orderIndex: 1,
        totalLessons: 4
      },
      {
        id: 'gen-certifications',
        trackId: 'general-resources',
        title: 'Certifications',
        description: 'Professional certifications and continuing education',
        icon: 'fas fa-certificate',
        orderIndex: 2,
        totalLessons: 3
      },
      {
        id: 'gen-doc-library',
        trackId: 'general-resources',
        title: 'Document Library',
        description: 'Forms, templates, and company resources',
        icon: 'fas fa-folder',
        orderIndex: 3,
        totalLessons: 3
      }
    ]).returning();
    
    console.log('Created missing modules');
    
    // Add lessons for Company Culture module
    await db.insert(lessons).values([
      {
        moduleId: 'gen-company-culture',
        title: 'Welcome to Best Roofing Now',
        content: `<h2>Welcome to the Best Roofing Now Family</h2>
<p class="text-lg mb-6">At Best Roofing Now, we're more than just a roofing company - we're a team dedicated to excellence, integrity, and community service.</p>

<h3 class="text-2xl font-bold mb-4">Our Mission</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <p class="text-lg font-semibold">"To protect Charlotte's homes and businesses with superior roofing solutions while building lasting relationships based on trust, quality, and exceptional service."</p>
</div>

<h3 class="text-2xl font-bold mb-4">Our Story</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <p class="mb-4">Founded in Charlotte, North Carolina, Best Roofing Now has grown from a small family business to one of the region's most trusted roofing contractors.</p>
  <p class="mb-4">What sets us apart isn't just our technical expertise - it's our commitment to treating every customer like family and every roof like it's our own.</p>
  <p>We believe in doing things right the first time, standing behind our work, and building a legacy of excellence that will last for generations.</p>
</div>

<h3 class="text-2xl font-bold mb-4">Why BRN?</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">For Our Customers</h5>
    <ul class="list-disc pl-6">
      <li>Honest, transparent pricing</li>
      <li>Quality materials and workmanship</li>
      <li>Comprehensive warranties</li>
      <li>24/7 emergency response</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">For Our Team</h5>
    <ul class="list-disc pl-6">
      <li>Career growth opportunities</li>
      <li>Comprehensive training</li>
      <li>Competitive compensation</li>
      <li>Family-oriented culture</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 10
      },
      {
        moduleId: 'gen-company-culture',
        title: 'Our Core Values',
        content: `<h2>The BRN Way: Our Core Values</h2>
<p class="text-lg mb-6">These values guide every decision we make and every interaction we have.</p>

<h3 class="text-2xl font-bold mb-4">1. Integrity Above All</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <p class="mb-4"><strong>What it means:</strong> We do the right thing, even when no one is watching.</p>
  <ul class="list-disc pl-6">
    <li>Never compromise on quality</li>
    <li>Always be honest with customers</li>
    <li>Honor our commitments</li>
    <li>Admit mistakes and make them right</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">2. Excellence in Everything</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <p class="mb-4"><strong>What it means:</strong> Good enough is never good enough.</p>
  <ul class="list-disc pl-6">
    <li>Continuous improvement mindset</li>
    <li>Attention to detail</li>
    <li>Pride in our work</li>
    <li>Going the extra mile</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">3. Community First</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <p class="mb-4"><strong>What it means:</strong> We're invested in Charlotte's success.</p>
  <ul class="list-disc pl-6">
    <li>Supporting local suppliers</li>
    <li>Giving back through charity</li>
    <li>Hiring locally</li>
    <li>Building lasting relationships</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">4. Team Unity</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <p class="mb-4"><strong>What it means:</strong> We win together or not at all.</p>
  <ul class="list-disc pl-6">
    <li>Respect for all team members</li>
    <li>Open communication</li>
    <li>Support each other's growth</li>
    <li>Celebrate successes together</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 12
      },
      {
        moduleId: 'gen-company-culture',
        title: 'Our Standards & Expectations',
        content: `<h2>The BRN Standard</h2>
<p class="text-lg mb-6">Excellence isn't just a goal - it's our minimum standard. Here's what we expect from every team member.</p>

<h3 class="text-2xl font-bold mb-4">Professional Standards</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Appearance & Conduct</h4>
  <ul class="list-disc pl-6">
    <li>Clean, professional BRN uniform daily</li>
    <li>Well-groomed appearance</li>
    <li>Professional language at all times</li>
    <li>Respectful behavior to all</li>
    <li>No smoking on job sites</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Work Standards</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Quality Expectations</h4>
  <ul class="list-disc pl-6">
    <li>Follow all installation specifications</li>
    <li>Clean job site daily</li>
    <li>Document work thoroughly</li>
    <li>Double-check all work</li>
    <li>Never cut corners</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Customer Service Standards</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The BRN Experience</h4>
  <ul class="list-disc pl-6">
    <li>Arrive on time, every time</li>
    <li>Introduce yourself professionally</li>
    <li>Explain work clearly</li>
    <li>Answer questions patiently</li>
    <li>Leave property better than found</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Safety Standards</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Non-Negotiable Safety</h4>
  <ul class="list-disc pl-6">
    <li>100% fall protection compliance</li>
    <li>Daily safety briefings</li>
    <li>Proper PPE always</li>
    <li>Report all incidents immediately</li>
    <li>Stop work if unsafe</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 15
      },
      {
        moduleId: 'gen-company-culture',
        title: 'Career Growth at BRN',
        content: `<h2>Your Career Path at Best Roofing Now</h2>
<p class="text-lg mb-6">We're committed to your growth. Here's how we help you build a successful career.</p>

<h3 class="text-2xl font-bold mb-4">Career Progression</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Growth Opportunities</h4>
  <div class="space-y-3">
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Entry Level → Lead Installer</p>
      <p>Master basic skills, show leadership, typically 1-2 years</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Lead Installer → Foreman</p>
      <p>Run crews, manage projects, typically 2-3 years</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Foreman → Project Manager</p>
      <p>Oversee multiple projects, client relations, 3-5 years</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Sales Track Available</p>
      <p>Transition to sales with full training and support</p>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Benefits & Compensation</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">We Take Care of Our Team</h4>
  <ul class="list-disc pl-6">
    <li>Competitive base pay with performance bonuses</li>
    <li>Health insurance options</li>
    <li>Paid time off and holidays</li>
    <li>Tool purchase programs</li>
    <li>Continuing education support</li>
    <li>Retirement planning assistance</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Recognition Programs</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Celebrating Excellence</h4>
  <ul class="list-disc pl-6">
    <li>Employee of the Month awards</li>
    <li>Annual excellence awards</li>
    <li>Safety achievement recognition</li>
    <li>Customer service stars</li>
    <li>Team achievement celebrations</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 12
      }
    ]).returning();
    
    // Add lessons for Certifications module
    await db.insert(lessons).values([
      {
        moduleId: 'gen-certifications',
        title: 'Professional Certifications Overview',
        content: `<h2>Advance Your Career with Certifications</h2>
<p class="text-lg mb-6">Professional certifications demonstrate your expertise and commitment to excellence.</p>

<h3 class="text-2xl font-bold mb-4">Why Certifications Matter</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Benefits of Certification</h4>
  <ul class="list-disc pl-6">
    <li>Higher earning potential</li>
    <li>Professional credibility</li>
    <li>Customer confidence</li>
    <li>Career advancement</li>
    <li>Industry recognition</li>
    <li>Continuous learning</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">BRN Supported Certifications</h3>
<div class="certifications space-y-4">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Manufacturer Certifications</h4>
    <ul class="list-disc pl-6">
      <li><strong>GAF Master Elite:</strong> Top 2% of contractors nationwide</li>
      <li><strong>CertainTeed ShingleMaster:</strong> Premium installation certification</li>
      <li><strong>Owens Corning Preferred:</strong> Factory-trained excellence</li>
      <li><strong>Firestone Master Contractor:</strong> Commercial roofing expertise</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Industry Certifications</h4>
    <ul class="list-disc pl-6">
      <li><strong>HAAG Certified Inspector:</strong> Insurance claim expertise</li>
      <li><strong>NRCA ProCertification:</strong> National roofing excellence</li>
      <li><strong>OSHA 30-Hour:</strong> Safety leadership</li>
      <li><strong>EPA RRP:</strong> Lead-safe certified</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 15
      },
      {
        moduleId: 'gen-certifications',
        title: 'Certification Requirements & Process',
        content: `<h2>Your Path to Certification</h2>
<p class="text-lg mb-6">We support your certification journey every step of the way.</p>

<h3 class="text-2xl font-bold mb-4">General Requirements</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Common Prerequisites</h4>
  <ul class="list-disc pl-6">
    <li>Minimum experience requirements (varies by cert)</li>
    <li>Completion of training modules</li>
    <li>Passing written examinations</li>
    <li>Hands-on skill demonstrations</li>
    <li>Continuing education commitments</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">BRN Certification Support</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">How We Help You Succeed</h4>
  <ul class="list-disc pl-6">
    <li><strong>Paid Training Time:</strong> Study on the clock</li>
    <li><strong>Exam Fees Covered:</strong> We pay for your first attempt</li>
    <li><strong>Study Materials:</strong> Access to all resources</li>
    <li><strong>Mentorship:</strong> Learn from certified pros</li>
    <li><strong>Bonus Program:</strong> Earn extra for certifications</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Certification Timeline</h3>
<div class="bg-purple-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Typical Progression</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>0-6 Months:</strong> Complete BRN basic training</li>
    <li><strong>6-12 Months:</strong> OSHA 30-Hour certification</li>
    <li><strong>Year 1-2:</strong> First manufacturer certification</li>
    <li><strong>Year 2-3:</strong> HAAG or specialty certification</li>
    <li><strong>Year 3+:</strong> Master certifications</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 18
      },
      {
        moduleId: 'gen-certifications',
        title: 'Maintaining Your Certifications',
        content: `<h2>Staying Current and Certified</h2>
<p class="text-lg mb-6">Certifications require ongoing commitment. Here's how to maintain your credentials.</p>

<h3 class="text-2xl font-bold mb-4">Continuing Education Requirements</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Annual Requirements by Certification</h4>
  <ul class="list-disc pl-6">
    <li><strong>GAF Master Elite:</strong> Annual recertification training</li>
    <li><strong>HAAG Certified:</strong> 16 hours CE every 2 years</li>
    <li><strong>NRCA ProCertified:</strong> 8 hours annually</li>
    <li><strong>OSHA:</strong> Refresher every 4 years recommended</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Tracking Your Certifications</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Stay Organized</h4>
  <ul class="list-disc pl-6">
    <li>BRN maintains certification database</li>
    <li>Automatic renewal reminders</li>
    <li>CE credit tracking system</li>
    <li>Digital certificate storage</li>
    <li>Public profile updates</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Leveraging Your Certifications</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Maximize Your Investment</h4>
  <ul class="list-disc pl-6">
    <li>Add to email signatures</li>
    <li>Update LinkedIn profile</li>
    <li>Use in sales presentations</li>
    <li>Display on business cards</li>
    <li>Mention in customer conversations</li>
    <li>Teach others what you've learned</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 14
      }
    ]).returning();
    
    // Add lessons for Document Library module
    await db.insert(lessons).values([
      {
        moduleId: 'gen-doc-library',
        title: 'Forms & Templates',
        content: `<h2>Essential Forms and Templates</h2>
<p class="text-lg mb-6">Access all the forms and templates you need for daily operations.</p>

<h3 class="text-2xl font-bold mb-4">Sales Forms</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Customer-Facing Documents</h4>
  <ul class="list-disc pl-6">
    <li><strong>Inspection Report Template:</strong> Professional damage documentation</li>
    <li><strong>Estimate Template:</strong> Clear, detailed pricing forms</li>
    <li><strong>Contract Templates:</strong> Residential and commercial versions</li>
    <li><strong>Change Order Forms:</strong> Document scope changes</li>
    <li><strong>Insurance Claim Assistance Forms:</strong> Help customers file claims</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Production Forms</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Job Site Documentation</h4>
  <ul class="list-disc pl-6">
    <li><strong>Daily Job Report:</strong> Track progress and issues</li>
    <li><strong>Material Order Forms:</strong> Accurate ordering sheets</li>
    <li><strong>Quality Checklist:</strong> Ensure nothing is missed</li>
    <li><strong>Photo Documentation Guide:</strong> What photos to take</li>
    <li><strong>Completion Certificate:</strong> Customer sign-off</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Safety Forms</h3>
<div class="bg-red-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Keep Everyone Safe</h4>
  <ul class="list-disc pl-6">
    <li><strong>Job Hazard Analysis:</strong> Pre-job safety planning</li>
    <li><strong>Safety Meeting Sign-In:</strong> Document attendance</li>
    <li><strong>Incident Report Forms:</strong> Proper documentation</li>
    <li><strong>Equipment Inspection Logs:</strong> Regular checks</li>
    <li><strong>Near Miss Reports:</strong> Prevent future incidents</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 12
      },
      {
        moduleId: 'gen-doc-library',
        title: 'Company Policies & Procedures',
        content: `<h2>BRN Policies and Procedures</h2>
<p class="text-lg mb-6">Clear policies ensure consistent, professional operations.</p>

<h3 class="text-2xl font-bold mb-4">HR Policies</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Employee Guidelines</h4>
  <ul class="list-disc pl-6">
    <li><strong>Employee Handbook:</strong> Complete guide to BRN policies</li>
    <li><strong>Code of Conduct:</strong> Professional behavior standards</li>
    <li><strong>PTO Policy:</strong> Time off procedures</li>
    <li><strong>Dress Code:</strong> Appearance standards</li>
    <li><strong>Social Media Policy:</strong> Online behavior guidelines</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Operational Procedures</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Standard Operating Procedures</h4>
  <ul class="list-disc pl-6">
    <li><strong>Job Site Setup:</strong> Consistent preparation</li>
    <li><strong>Customer Communication:</strong> Scripts and guidelines</li>
    <li><strong>Quality Control:</strong> Inspection procedures</li>
    <li><strong>Warranty Process:</strong> Handling callbacks</li>
    <li><strong>Emergency Response:</strong> 24/7 procedures</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Financial Procedures</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Money Matters</h4>
  <ul class="list-disc pl-6">
    <li><strong>Expense Reports:</strong> Reimbursement procedures</li>
    <li><strong>Mileage Tracking:</strong> Vehicle use policies</li>
    <li><strong>Tool Purchase Program:</strong> How to participate</li>
    <li><strong>Commission Structure:</strong> Sales compensation</li>
    <li><strong>Bonus Programs:</strong> Performance incentives</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 15
      },
      {
        moduleId: 'gen-doc-library',
        title: 'Reference Materials',
        content: `<h2>Technical References and Resources</h2>
<p class="text-lg mb-6">Quick access to technical information and industry resources.</p>

<h3 class="text-2xl font-bold mb-4">Installation Guides</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Manufacturer Specifications</h4>
  <ul class="list-disc pl-6">
    <li><strong>GAF Installation Guide:</strong> Complete shingle installation</li>
    <li><strong>CertainTeed Specs:</strong> Product-specific details</li>
    <li><strong>TPO/EPDM Guides:</strong> Commercial installation</li>
    <li><strong>Flashing Details:</strong> Proper techniques</li>
    <li><strong>Ventilation Calculator:</strong> Proper sizing</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Building Codes</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Stay Compliant</h4>
  <ul class="list-disc pl-6">
    <li><strong>NC Building Code:</strong> Current requirements</li>
    <li><strong>Charlotte Amendments:</strong> Local variations</li>
    <li><strong>Permit Requirements:</strong> When needed</li>
    <li><strong>Inspection Checklists:</strong> Pass every time</li>
    <li><strong>Code Updates:</strong> Recent changes</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Quick References</h3>
<div class="bg-purple-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Handy Information</h4>
  <ul class="list-disc pl-6">
    <li><strong>Pitch Conversion Chart:</strong> Degrees to rise/run</li>
    <li><strong>Bundle Calculator:</strong> Quick estimates</li>
    <li><strong>Nail Pattern Guides:</strong> High wind requirements</li>
    <li><strong>Color Charts:</strong> All manufacturers</li>
    <li><strong>Warranty Comparison:</strong> Side-by-side guide</li>
    <li><strong>Supplier Contacts:</strong> Quick ordering</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 10
      }
    ]).returning();
    
    // Add quiz questions for the new modules
    await db.insert(quizQuestions).values([
      // Company Culture Quiz
      {
        moduleId: 'gen-company-culture',
        question: 'What is Best Roofing Now\'s #1 core value?',
        options: JSON.stringify(['Excellence in Everything', 'Integrity Above All', 'Community First', 'Team Unity']),
        correctAnswer: 1,
        explanation: 'Integrity Above All is our #1 core value - we do the right thing even when no one is watching.'
      },
      {
        moduleId: 'gen-company-culture',
        question: 'What should you do if you encounter an unsafe condition on a job site?',
        options: JSON.stringify(['Continue working carefully', 'Tell a coworker', 'Stop work immediately and report it', 'Wait until the safety meeting']),
        correctAnswer: 2,
        explanation: 'Safety is non-negotiable. Always stop work immediately if conditions are unsafe and report to your supervisor.'
      },
      
      // Certifications Quiz
      {
        moduleId: 'gen-certifications',
        question: 'Which certification puts contractors in the top 2% nationwide?',
        options: JSON.stringify(['OSHA 30-Hour', 'GAF Master Elite', 'EPA RRP', 'NRCA ProCertification']),
        correctAnswer: 1,
        explanation: 'GAF Master Elite certification is only held by the top 2% of roofing contractors nationwide.'
      },
      {
        moduleId: 'gen-certifications',
        question: 'How does BRN support your certification efforts?',
        options: JSON.stringify(['You pay all costs yourself', 'Only study materials provided', 'Paid training time, exam fees, and bonuses', 'Time off to study only']),
        correctAnswer: 2,
        explanation: 'BRN provides comprehensive support including paid training time, covering exam fees, and bonus programs for certifications.'
      },
      
      // Document Library Quiz
      {
        moduleId: 'gen-doc-library',
        question: 'Where can you find the proper nail pattern for high-wind installations?',
        options: JSON.stringify(['Employee Handbook', 'Quick References section', 'HR Policies', 'Financial Procedures']),
        correctAnswer: 1,
        explanation: 'The Quick References section contains nail pattern guides for high-wind requirements.'
      }
    ]).returning();
    
    console.log('Successfully added all missing modules and content!');
    
  } catch (error) {
    console.error('Error seeding missing modules:', error);
    throw error;
  }
}

// Run the seed function
seedMissingModules().catch(console.error);