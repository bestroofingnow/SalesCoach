import { db } from './db';
import { trainingTracks, trainingModules, lessons, quizQuestions } from '@shared/schema';

export async function createComprehensiveTrainingData() {
  console.log('Creating comprehensive roofing training curriculum...');
  
  // Create the three main training tracks
  const [residentialTrack] = await db.insert(trainingTracks).values({
    name: 'Residential Roofing',
    description: 'Master residential roofing techniques, materials, and sales excellence',
    icon: 'home',
    color: 'blue',
    totalModules: 8
  }).returning();
  
  const [commercialTrack] = await db.insert(trainingTracks).values({
    name: 'Commercial Roofing', 
    description: 'Learn commercial roofing systems, project management, and large-scale installations',
    icon: 'building',
    color: 'green',
    totalModules: 8
  }).returning();
  
  const [restorationTrack] = await db.insert(trainingTracks).values({
    name: 'Restoration & Insurance',
    description: 'Master insurance claims, storm damage assessment, and restoration processes',
    icon: 'shield',
    color: 'purple',
    totalModules: 8
  }).returning();
  
  // RESIDENTIAL ROOFING MODULES
  
  // Module 1: Company Culture (Empty for customization)
  const [residentialModule1] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Company Culture & Core Values',
    description: 'Understanding your company\'s mission, values, and culture',
    icon: 'star',
    orderIndex: 1,
    totalLessons: 3
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule1.id,
      title: 'Welcome to Your Company',
      content: '<h1>Welcome to Your Company</h1><p>This section should be customized by your company admin to include your specific company history, mission, and values.</p>',
      orderIndex: 1,
      estimatedMinutes: 15
    },
    {
      moduleId: residentialModule1.id,
      title: 'Company Values & Mission',
      content: '<h1>Company Values & Mission</h1><p>This section should be customized to reflect your company\'s core values and mission statement.</p>',
      orderIndex: 2,
      estimatedMinutes: 15
    },
    {
      moduleId: residentialModule1.id,
      title: 'Team Structure & Expectations',
      content: '<h1>Team Structure & Expectations</h1><p>This section should be customized to explain your company\'s organizational structure and employee expectations.</p>',
      orderIndex: 3,
      estimatedMinutes: 20
    }
  ]);
  
  // Module 2: Roofing Fundamentals
  const [residentialModule2] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Roofing Fundamentals',
    description: 'Essential knowledge about roofing systems, materials, and terminology',
    icon: 'book',
    orderIndex: 2,
    totalLessons: 4
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule2.id,
      title: 'Roofing Anatomy & Components',
      content: `<h1>Roofing Anatomy & Components</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Understanding Roof Structure</h2>
          <p>A comprehensive understanding of roofing anatomy is essential for success in the roofing industry.</p>
        </div>
        
        <h2>Key Roofing Components</h2>
        <ul>
          <li><strong>Decking/Sheathing:</strong> The foundation layer, typically plywood or OSB</li>
          <li><strong>Underlayment:</strong> Water-resistant barrier beneath shingles</li>
          <li><strong>Shingles:</strong> The visible outer layer providing weather protection</li>
          <li><strong>Flashing:</strong> Metal pieces preventing water intrusion at joints</li>
          <li><strong>Ridge Vents:</strong> Allow hot air to escape from the attic</li>
          <li><strong>Soffit Vents:</strong> Provide intake ventilation</li>
          <li><strong>Gutters:</strong> Channel water away from the foundation</li>
          <li><strong>Drip Edge:</strong> Directs water into gutters</li>
        </ul>
        
        <h2>Roof Pitch and Slope</h2>
        <p>Understanding roof pitch is crucial for material selection and installation methods:</p>
        <ul>
          <li><strong>Low Slope:</strong> 2/12 to 4/12 pitch</li>
          <li><strong>Conventional:</strong> 4/12 to 9/12 pitch</li>
          <li><strong>Steep Slope:</strong> 9/12 and higher</li>
        </ul>
        
        <h2>Common Roofing Terms</h2>
        <ul>
          <li><strong>Square:</strong> 100 square feet of roofing area</li>
          <li><strong>Ridge:</strong> The peak where two roof planes meet</li>
          <li><strong>Valley:</strong> The internal angle where two roof planes meet</li>
          <li><strong>Eave:</strong> The edge of the roof that overhangs the wall</li>
          <li><strong>Rake:</strong> The sloped edge of a roof over a wall</li>
          <li><strong>Hip:</strong> The external angle where two roof planes meet</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule2.id,
      title: 'Roofing Materials Overview',
      content: `<h1>Roofing Materials Overview</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Material Selection Matters</h2>
          <p>The right material choice depends on climate, budget, aesthetics, and structural requirements.</p>
        </div>
        
        <h2>Asphalt Shingles</h2>
        <ul>
          <li><strong>3-Tab Shingles:</strong> Economical, 20-25 year lifespan</li>
          <li><strong>Architectural Shingles:</strong> Dimensional appearance, 30-50 year lifespan</li>
          <li><strong>Premium/Designer Shingles:</strong> Maximum durability and aesthetics</li>
        </ul>
        
        <h2>Metal Roofing</h2>
        <ul>
          <li><strong>Standing Seam:</strong> Vertical panels with concealed fasteners</li>
          <li><strong>Metal Tiles:</strong> Mimic traditional tile appearance</li>
          <li><strong>Corrugated Metal:</strong> Cost-effective for various applications</li>
          <li><strong>Benefits:</strong> 50+ year lifespan, energy efficient, fire resistant</li>
        </ul>
        
        <h2>Tile Roofing</h2>
        <ul>
          <li><strong>Clay Tiles:</strong> Traditional, extremely durable, 50-100 years</li>
          <li><strong>Concrete Tiles:</strong> More affordable than clay, versatile styles</li>
          <li><strong>Considerations:</strong> Heavy weight requires structural support</li>
        </ul>
        
        <h2>Specialty Materials</h2>
        <ul>
          <li><strong>Slate:</strong> Premium natural stone, 100+ year lifespan</li>
          <li><strong>Wood Shakes/Shingles:</strong> Natural aesthetic, requires maintenance</li>
          <li><strong>Synthetic Materials:</strong> Mimic natural materials with less weight</li>
          <li><strong>Solar Tiles:</strong> Integrated photovoltaic systems</li>
        </ul>
        
        <h2>Material Selection Factors</h2>
        <ul>
          <li>Climate and weather patterns</li>
          <li>Home architectural style</li>
          <li>HOA requirements</li>
          <li>Budget constraints</li>
          <li>Energy efficiency goals</li>
          <li>Maintenance preferences</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 30
    },
    {
      moduleId: residentialModule2.id,
      title: 'Understanding Roof Damage',
      content: `<h1>Understanding Roof Damage</h1>
        <div class="bg-orange-50 p-6 rounded-lg mb-6">
          <h2>Identifying Damage Early</h2>
          <p>Recognizing signs of damage helps homeowners understand the urgency of repairs or replacement.</p>
        </div>
        
        <h2>Weather-Related Damage</h2>
        
        <h3>Hail Damage</h3>
        <ul>
          <li>Impact marks with missing granules</li>
          <li>Circular cracks or dents</li>
          <li>Exposed mat or fiberglass</li>
          <li>Soft spots indicating bruising</li>
        </ul>
        
        <h3>Wind Damage</h3>
        <ul>
          <li>Missing shingles</li>
          <li>Lifted or curled edges</li>
          <li>Creased shingles</li>
          <li>Debris impact areas</li>
        </ul>
        
        <h3>Water Damage Signs</h3>
        <ul>
          <li>Water stains on ceilings</li>
          <li>Mold or mildew growth</li>
          <li>Rotted decking</li>
          <li>Sagging roof areas</li>
        </ul>
        
        <h2>Age-Related Deterioration</h2>
        <ul>
          <li><strong>Granule Loss:</strong> Bare spots on shingles</li>
          <li><strong>Curling:</strong> Edges lifting or center buckling</li>
          <li><strong>Cracking:</strong> Visible splits in shingles</li>
          <li><strong>Missing Shingles:</strong> Complete shingle loss</li>
          <li><strong>Moss/Algae Growth:</strong> Indicates moisture retention</li>
        </ul>
        
        <h2>Installation Defects</h2>
        <ul>
          <li>Improper nailing patterns</li>
          <li>Inadequate ventilation</li>
          <li>Poor flashing installation</li>
          <li>Incorrect shingle alignment</li>
          <li>Insufficient ice and water shield</li>
        </ul>
        
        <h2>Interior Warning Signs</h2>
        <ul>
          <li>Light coming through roof boards</li>
          <li>Higher energy bills</li>
          <li>Sagging roof deck</li>
          <li>Water damage in attic</li>
          <li>Outside light visible through roof</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule2.id,
      title: 'Roofing Safety Essentials',
      content: `<h1>Roofing Safety Essentials</h1>
        <div class="bg-red-50 p-6 rounded-lg mb-6">
          <h2>Safety First, Always</h2>
          <p>Roofing is one of the most dangerous construction trades. Proper safety practices save lives.</p>
        </div>
        
        <h2>Personal Protective Equipment (PPE)</h2>
        <ul>
          <li><strong>Hard Hat:</strong> Protects from falling objects</li>
          <li><strong>Safety Harness:</strong> Fall arrest system for steep slopes</li>
          <li><strong>Non-Slip Footwear:</strong> Proper traction on roof surfaces</li>
          <li><strong>Safety Glasses:</strong> Eye protection from debris</li>
          <li><strong>Work Gloves:</strong> Hand protection and better grip</li>
        </ul>
        
        <h2>Ladder Safety</h2>
        <ul>
          <li>Maintain 3 points of contact</li>
          <li>Extend ladder 3 feet above roof edge</li>
          <li>Set proper angle (4:1 ratio)</li>
          <li>Secure ladder at top and bottom</li>
          <li>Never exceed weight capacity</li>
          <li>Face ladder when climbing</li>
        </ul>
        
        <h2>Roof Safety Practices</h2>
        <ul>
          <li>Check weather conditions before starting</li>
          <li>Never work on wet or icy roofs</li>
          <li>Use roof brackets or toe boards</li>
          <li>Maintain clean work area</li>
          <li>Be aware of power lines</li>
          <li>Use proper lifting techniques</li>
        </ul>
        
        <h2>Fall Protection Systems</h2>
        <ul>
          <li><strong>Guardrails:</strong> Physical barriers at roof edges</li>
          <li><strong>Safety Nets:</strong> Catch falling workers or materials</li>
          <li><strong>Personal Fall Arrest:</strong> Harness, lanyard, and anchor point</li>
          <li><strong>Warning Lines:</strong> Visual barriers for low-slope roofs</li>
        </ul>
        
        <h2>Emergency Procedures</h2>
        <ul>
          <li>Know location of first aid kit</li>
          <li>Have emergency numbers readily available</li>
          <li>Establish communication system</li>
          <li>Plan evacuation routes</li>
          <li>Regular safety meetings and training</li>
        </ul>`,
      orderIndex: 4,
      estimatedMinutes: 20
    }
  ]);
  
  // Module 3: Sales Excellence
  const [residentialModule3] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Sales Excellence & Customer Service',
    description: 'Master the art of consultative selling and exceptional customer service',
    icon: 'trending-up',
    orderIndex: 3,
    totalLessons: 5
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule3.id,
      title: 'Consultative Selling Approach',
      content: `<h1>Consultative Selling Approach</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Be a Trusted Advisor</h2>
          <p>Successful roofing sales focus on solving problems, not pushing products.</p>
        </div>
        
        <h2>The Consultative Selling Process</h2>
        
        <h3>1. Build Rapport</h3>
        <ul>
          <li>Warm, genuine greeting</li>
          <li>Find common ground</li>
          <li>Show genuine interest in their home</li>
          <li>Listen more than you talk</li>
        </ul>
        
        <h3>2. Discover Needs</h3>
        <ul>
          <li>"What concerns do you have about your roof?"</li>
          <li>"Have you noticed any issues inside your home?"</li>
          <li>"What's most important to you in a roofing solution?"</li>
          <li>"What's your timeline for this project?"</li>
        </ul>
        
        <h3>3. Educate the Customer</h3>
        <ul>
          <li>Explain what you're seeing during inspection</li>
          <li>Use photos and samples</li>
          <li>Discuss material options relevant to their needs</li>
          <li>Explain the installation process</li>
        </ul>
        
        <h3>4. Present Solutions</h3>
        <ul>
          <li>Offer multiple options (good, better, best)</li>
          <li>Connect features to their specific needs</li>
          <li>Discuss warranties and guarantees</li>
          <li>Be transparent about pricing</li>
        </ul>
        
        <h3>5. Handle Objections</h3>
        <ul>
          <li>Listen fully without interrupting</li>
          <li>Acknowledge their concerns</li>
          <li>Ask clarifying questions</li>
          <li>Provide relevant information</li>
          <li>Confirm understanding</li>
        </ul>
        
        <h2>Building Trust</h2>
        <ul>
          <li>Be punctual and professional</li>
          <li>Dress appropriately</li>
          <li>Use the customer's name</li>
          <li>Follow through on promises</li>
          <li>Provide references and testimonials</li>
          <li>Show certifications and credentials</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 30
    },
    {
      moduleId: residentialModule3.id,
      title: 'Effective Communication Skills',
      content: `<h1>Effective Communication Skills</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Communication is Key</h2>
          <p>How you say something is often more important than what you say.</p>
        </div>
        
        <h2>Active Listening Techniques</h2>
        <ul>
          <li><strong>Full Attention:</strong> Make eye contact, put away distractions</li>
          <li><strong>Non-Verbal Cues:</strong> Nod, lean in, maintain open posture</li>
          <li><strong>Paraphrase:</strong> "So what I'm hearing is..."</li>
          <li><strong>Ask Questions:</strong> "Can you tell me more about...?"</li>
          <li><strong>Summarize:</strong> Confirm understanding before responding</li>
        </ul>
        
        <h2>Explaining Technical Concepts</h2>
        <ul>
          <li>Use simple, everyday language</li>
          <li>Avoid industry jargon</li>
          <li>Use analogies customers understand</li>
          <li>Visual aids and demonstrations</li>
          <li>Check for understanding frequently</li>
        </ul>
        
        <h2>Powerful Questions to Ask</h2>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <ul>
            <li>"What prompted you to look into roofing services?"</li>
            <li>"What's your biggest concern about your current roof?"</li>
            <li>"How long do you plan to stay in this home?"</li>
            <li>"Have you had roofing work done before?"</li>
            <li>"What's your ideal timeline for this project?"</li>
            <li>"Who else is involved in making this decision?"</li>
          </ul>
        </div>
        
        <h2>Presenting Information Effectively</h2>
        <ul>
          <li><strong>Structure:</strong> Problem → Solution → Benefits</li>
          <li><strong>Clarity:</strong> One point at a time</li>
          <li><strong>Relevance:</strong> Connect to their specific situation</li>
          <li><strong>Visual:</strong> Use samples, photos, diagrams</li>
          <li><strong>Interactive:</strong> Encourage questions</li>
        </ul>
        
        <h2>Handling Difficult Conversations</h2>
        <ul>
          <li>Stay calm and professional</li>
          <li>Don't take things personally</li>
          <li>Focus on facts, not emotions</li>
          <li>Find common ground</li>
          <li>Offer alternatives</li>
          <li>Know when to walk away</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule3.id,
      title: 'Overcoming Common Objections',
      content: `<h1>Overcoming Common Objections</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>Objections are Opportunities</h2>
          <p>Each objection is a chance to provide value and build trust.</p>
        </div>
        
        <h2>Price Objections</h2>
        
        <h3>"It's too expensive"</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p><strong>Response Framework:</strong></p>
          <ul>
            <li>Acknowledge: "I understand price is an important factor."</li>
            <li>Reframe: "Let's look at this as an investment in your home."</li>
            <li>Value: "Consider the cost of ongoing repairs vs. a permanent solution."</li>
            <li>Options: "We have several options to fit different budgets."</li>
          </ul>
        </div>
        
        <h3>"I need to get other quotes"</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p><strong>Response:</strong></p>
          <p>"That's smart - you should compare. While you're comparing, look at:</p>
          <ul>
            <li>Warranty terms and what's covered</li>
            <li>Company reputation and reviews</li>
            <li>Insurance and licensing</li>
            <li>Materials quality and specifications</li>
            <li>Installation methods and crew experience</li>
          </ul>
          <p>I'm confident we'll compare favorably. What questions can I answer to help you compare?"</p>
        </div>
        
        <h2>Timing Objections</h2>
        
        <h3>"We're not ready yet"</h3>
        <ul>
          <li>Explore: "What would need to happen for you to be ready?"</li>
          <li>Educate: "Let me show you what waiting might mean..."</li>
          <li>Offer: "We can schedule for when you're ready"</li>
        </ul>
        
        <h3>"We need to think about it"</h3>
        <ul>
          <li>Understand: "Of course. What specifically would you like to think about?"</li>
          <li>Address: Handle specific concerns</li>
          <li>Follow-up: "When would be a good time to reconnect?"</li>
        </ul>
        
        <h2>Trust Objections</h2>
        
        <h3>"How do I know you'll do quality work?"</h3>
        <ul>
          <li>Show credentials and certifications</li>
          <li>Provide references and testimonials</li>
          <li>Offer to show current job sites</li>
          <li>Explain warranty and guarantee</li>
          <li>Share company history and experience</li>
        </ul>
        
        <h2>The Feel-Felt-Found Method</h2>
        <p>"I understand how you <strong>feel</strong>. Other homeowners have <strong>felt</strong> the same way. What they <strong>found</strong> was..."</p>
        
        <h2>Key Principles</h2>
        <ul>
          <li>Never argue or get defensive</li>
          <li>Ask questions to understand the real concern</li>
          <li>Provide evidence and social proof</li>
          <li>Offer alternatives when possible</li>
          <li>Know when to gracefully exit</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 30
    },
    {
      moduleId: residentialModule3.id,
      title: 'Creating Winning Proposals',
      content: `<h1>Creating Winning Proposals</h1>
        <div class="bg-yellow-50 p-6 rounded-lg mb-6">
          <h2>Your Proposal is Your Promise</h2>
          <p>A professional proposal sets expectations and builds confidence.</p>
        </div>
        
        <h2>Essential Proposal Elements</h2>
        
        <h3>1. Professional Presentation</h3>
        <ul>
          <li>Clean, branded template</li>
          <li>Clear, easy-to-read formatting</li>
          <li>Professional photos of the property</li>
          <li>Detailed scope of work</li>
        </ul>
        
        <h3>2. Detailed Scope of Work</h3>
        <ul>
          <li><strong>Tear-off:</strong> Complete removal of existing roofing</li>
          <li><strong>Deck Inspection:</strong> Check and repair damaged decking</li>
          <li><strong>Ice & Water Shield:</strong> Coverage areas specified</li>
          <li><strong>Underlayment:</strong> Type and coverage</li>
          <li><strong>Shingles:</strong> Brand, style, color, warranty</li>
          <li><strong>Ventilation:</strong> Ridge vents, soffit vents</li>
          <li><strong>Flashing:</strong> All areas to be flashed</li>
          <li><strong>Clean-up:</strong> Daily and final cleanup procedures</li>
        </ul>
        
        <h3>3. Material Specifications</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p>Include specific details:</p>
          <ul>
            <li>Manufacturer and product names</li>
            <li>Colors and styles selected</li>
            <li>Warranty information</li>
            <li>Technical specifications</li>
            <li>Compliance with local codes</li>
          </ul>
        </div>
        
        <h3>4. Investment Options</h3>
        <p>Present three options when possible:</p>
        <ul>
          <li><strong>Good:</strong> Basic materials, standard warranty</li>
          <li><strong>Better:</strong> Upgraded materials, enhanced warranty</li>
          <li><strong>Best:</strong> Premium materials, maximum warranty</li>
        </ul>
        
        <h3>5. Timeline and Process</h3>
        <ul>
          <li>Estimated start date</li>
          <li>Project duration</li>
          <li>Weather contingencies</li>
          <li>Daily work hours</li>
          <li>Key milestones</li>
        </ul>
        
        <h3>6. Terms and Conditions</h3>
        <ul>
          <li>Payment schedule</li>
          <li>Warranty details</li>
          <li>Change order process</li>
          <li>Cancellation policy</li>
          <li>Insurance information</li>
        </ul>
        
        <h2>Presentation Best Practices</h2>
        <ul>
          <li>Review proposal in person when possible</li>
          <li>Walk through each section</li>
          <li>Use visual aids and samples</li>
          <li>Answer questions thoroughly</li>
          <li>Provide digital and physical copies</li>
          <li>Follow up within 24-48 hours</li>
        </ul>`,
      orderIndex: 4,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule3.id,
      title: 'Closing Techniques',
      content: `<h1>Closing Techniques</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Closing is Helping</h2>
          <p>When you believe in your solution, closing is helping the customer make the right decision.</p>
        </div>
        
        <h2>Recognizing Buying Signals</h2>
        <ul>
          <li>Asking specific questions about timeline</li>
          <li>Discussing color or style preferences</li>
          <li>Asking about warranty details</li>
          <li>Inquiring about payment options</li>
          <li>Using ownership language ("my roof", "our installer")</li>
          <li>Asking what happens next</li>
        </ul>
        
        <h2>Trial Closes</h2>
        <p>Test readiness throughout the conversation:</p>
        <ul>
          <li>"How does this solution sound so far?"</li>
          <li>"Is this the type of quality you're looking for?"</li>
          <li>"Does this timeline work for you?"</li>
          <li>"Which of these options best fits your needs?"</li>
        </ul>
        
        <h2>Effective Closing Techniques</h2>
        
        <h3>The Assumptive Close</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p>Assume they're moving forward:</p>
          <p>"I'll have our installation team contact you to schedule. What days work best for you?"</p>
        </div>
        
        <h3>The Alternative Choice Close</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p>Offer two positive options:</p>
          <p>"Would you prefer to start next week or the following week?"</p>
          <p>"Would the architectural shingles or the premium shingles work better for you?"</p>
        </div>
        
        <h3>The Summary Close</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p>Recap the value:</p>
          <p>"So we're going to solve your leak problem, upgrade to impact-resistant shingles, add proper ventilation, and back it all with our 10-year workmanship warranty. Should we get started?"</p>
        </div>
        
        <h3>The Urgency Close</h3>
        <div class="bg-white p-4 rounded shadow-sm mb-4">
          <p>When appropriate:</p>
          <p>"We have an opening next week due to a cancellation. After that, we're booked for three weeks. Should we reserve that spot for you?"</p>
        </div>
        
        <h2>After the Close</h2>
        <ul>
          <li>Stop talking - let them process</li>
          <li>Complete paperwork professionally</li>
          <li>Review next steps clearly</li>
          <li>Thank them for their business</li>
          <li>Set expectations for follow-up</li>
          <li>Leave on a positive note</li>
        </ul>
        
        <h2>If They Say No</h2>
        <ul>
          <li>Stay professional and friendly</li>
          <li>Ask for feedback</li>
          <li>Leave the door open</li>
          <li>Follow up appropriately</li>
          <li>Ask for referrals if relationship is good</li>
        </ul>`,
      orderIndex: 5,
      estimatedMinutes: 25
    }
  ]);
  
  // Module 4: Digital Tools & Technology
  const [residentialModule4] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Digital Tools & Technology',
    description: 'Master modern tools for measurements, estimates, and presentations',
    icon: 'smartphone',
    orderIndex: 4,
    totalLessons: 3
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule4.id,
      title: 'Digital Measurement Tools',
      content: `<h1>Digital Measurement Tools</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Technology Enhances Accuracy</h2>
          <p>Modern digital tools provide precise measurements and professional presentations.</p>
        </div>
        
        <h2>Satellite Measurement Tools</h2>
        
        <h3>Popular Platforms</h3>
        <ul>
          <li><strong>EagleView:</strong> High-resolution aerial measurements</li>
          <li><strong>HOVER:</strong> 3D modeling from photos</li>
          <li><strong>RoofSnap:</strong> Sketch and measure</li>
          <li><strong>GAF QuickMeasure:</strong> Aerial reports</li>
        </ul>
        
        <h3>Benefits of Digital Measurements</h3>
        <ul>
          <li>Accurate square footage calculations</li>
          <li>Detailed roof diagrams</li>
          <li>Pitch and slope measurements</li>
          <li>Identify all roof features</li>
          <li>Save time on estimates</li>
          <li>Reduce measurement errors</li>
        </ul>
        
        <h2>Using Measurement Reports</h2>
        <ul>
          <li>Review all measurements carefully</li>
          <li>Verify with ground observations</li>
          <li>Account for waste factors</li>
          <li>Include all roof penetrations</li>
          <li>Calculate ridge and hip lengths</li>
          <li>Measure valley requirements</li>
        </ul>
        
        <h2>Mobile Apps for Field Work</h2>
        <ul>
          <li><strong>Photo Documentation:</strong> CompanyCam, HOVER</li>
          <li><strong>Estimation:</strong> AccuLynx, JobNimbus</li>
          <li><strong>Contracts:</strong> DocuSign, PandaDoc</li>
          <li><strong>Payments:</strong> Square, Stripe</li>
        </ul>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Always verify digital measurements on-site</li>
          <li>Document unique features with photos</li>
          <li>Include waste factors (typically 10-15%)</li>
          <li>Account for starter strips and ridge caps</li>
          <li>Note any special installation requirements</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 20
    },
    {
      moduleId: residentialModule4.id,
      title: 'CRM and Project Management',
      content: `<h1>CRM and Project Management</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Stay Organized, Stay Successful</h2>
          <p>Effective use of CRM and project management tools is essential for modern roofing businesses.</p>
        </div>
        
        <h2>CRM Fundamentals</h2>
        
        <h3>Key CRM Functions</h3>
        <ul>
          <li><strong>Contact Management:</strong> Store all customer information</li>
          <li><strong>Lead Tracking:</strong> Follow prospects through sales pipeline</li>
          <li><strong>Communication History:</strong> Record all interactions</li>
          <li><strong>Task Management:</strong> Schedule follow-ups and reminders</li>
          <li><strong>Document Storage:</strong> Contracts, photos, permits</li>
        </ul>
        
        <h3>Lead Management Process</h3>
        <ul>
          <li>Enter new leads immediately</li>
          <li>Set follow-up reminders</li>
          <li>Track lead source</li>
          <li>Update status regularly</li>
          <li>Note all conversations</li>
          <li>Schedule appointments</li>
        </ul>
        
        <h2>Project Management</h2>
        
        <h3>Project Phases to Track</h3>
        <ul>
          <li><strong>Initial Contact:</strong> First inquiry</li>
          <li><strong>Inspection:</strong> Property assessment</li>
          <li><strong>Estimate:</strong> Proposal creation</li>
          <li><strong>Contract:</strong> Agreement signed</li>
          <li><strong>Permits:</strong> Required approvals</li>
          <li><strong>Materials:</strong> Ordering and delivery</li>
          <li><strong>Installation:</strong> Work progress</li>
          <li><strong>Final Inspection:</strong> Quality check</li>
          <li><strong>Collection:</strong> Payment received</li>
        </ul>
        
        <h3>Communication Management</h3>
        <ul>
          <li>Automated appointment reminders</li>
          <li>Progress updates to customers</li>
          <li>Team scheduling and coordination</li>
          <li>Weather delay notifications</li>
          <li>Completion confirmations</li>
        </ul>
        
        <h2>Data to Track</h2>
        <ul>
          <li>Lead source effectiveness</li>
          <li>Conversion rates by sales rep</li>
          <li>Average project value</li>
          <li>Time from lead to close</li>
          <li>Customer satisfaction scores</li>
          <li>Referral generation</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule4.id,
      title: 'Digital Presentations',
      content: `<h1>Digital Presentations</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>Visual Selling Power</h2>
          <p>Digital presentations help customers visualize their new roof and make confident decisions.</p>
        </div>
        
        <h2>Creating Effective Presentations</h2>
        
        <h3>Essential Elements</h3>
        <ul>
          <li>Before and after visualizations</li>
          <li>Material samples and colors</li>
          <li>Warranty information</li>
          <li>Installation process timeline</li>
          <li>Company credentials</li>
          <li>Customer testimonials</li>
        </ul>
        
        <h3>Visualization Tools</h3>
        <ul>
          <li><strong>HOVER:</strong> 3D home modeling</li>
          <li><strong>GAF Virtual Home Remodeler:</strong> Color selection</li>
          <li><strong>Owens Corning Design EyeQ:</strong> Roof visualizer</li>
          <li><strong>CertainTeed ColorView:</strong> Style selection</li>
        </ul>
        
        <h2>Presentation Flow</h2>
        
        <h3>1. Problem Documentation</h3>
        <ul>
          <li>Photos of current issues</li>
          <li>Detailed inspection findings</li>
          <li>Potential consequences of delay</li>
        </ul>
        
        <h3>2. Solution Presentation</h3>
        <ul>
          <li>Recommended materials</li>
          <li>Color and style options</li>
          <li>Installation methodology</li>
          <li>Timeline and process</li>
        </ul>
        
        <h3>3. Value Demonstration</h3>
        <ul>
          <li>Energy savings potential</li>
          <li>Increased home value</li>
          <li>Warranty coverage</li>
          <li>Company advantages</li>
        </ul>
        
        <h2>Digital Proposal Tools</h2>
        <ul>
          <li>Interactive pricing options</li>
          <li>Digital signature capability</li>
          <li>Instant financing applications</li>
          <li>Automatic follow-up scheduling</li>
        </ul>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Keep presentations concise (15-20 minutes)</li>
          <li>Use high-quality images</li>
          <li>Personalize to customer's home</li>
          <li>Practice smooth navigation</li>
          <li>Have offline backup ready</li>
          <li>Send digital copy after meeting</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 20
    }
  ]);
  
  // Continue with remaining Residential modules...
  // Module 5: Customer Experience
  const [residentialModule5] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Customer Experience Excellence',
    description: 'Deliver exceptional service from first contact to final follow-up',
    icon: 'heart',
    orderIndex: 5,
    totalLessons: 3
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule5.id,
      title: 'First Impressions Matter',
      content: `<h1>First Impressions Matter</h1>
        <div class="bg-pink-50 p-6 rounded-lg mb-6">
          <h2>You Never Get a Second Chance</h2>
          <p>The first 30 seconds of interaction set the tone for the entire relationship.</p>
        </div>
        
        <h2>Before the Door Opens</h2>
        <ul>
          <li>Park professionally (not blocking driveway)</li>
          <li>Wear clean, professional attire with ID badge</li>
          <li>Have materials organized and ready</li>
          <li>Turn off vehicle and music</li>
          <li>Approach with confidence and smile</li>
        </ul>
        
        <h2>The Professional Introduction</h2>
        <ul>
          <li>Ring doorbell once, step back 3-4 feet</li>
          <li>Smile and make eye contact</li>
          <li>Clear, friendly greeting</li>
          <li>State your name and company</li>
          <li>Confirm appointment and purpose</li>
          <li>Ask permission to proceed</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 20
    },
    {
      moduleId: residentialModule5.id,
      title: 'Communication Excellence',
      content: `<h1>Communication Excellence</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Master Communicators Win More Business</h2>
          <p>Clear, professional communication builds trust and closes deals.</p>
        </div>
        
        <h2>Active Listening Techniques</h2>
        <ul>
          <li>Maintain appropriate eye contact</li>
          <li>Nod and use verbal confirmations</li>
          <li>Take notes on key points</li>
          <li>Ask clarifying questions</li>
          <li>Summarize what you heard</li>
          <li>Never interrupt</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule5.id,
      title: 'Following Up for Success',
      content: `<h1>Following Up for Success</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>The Fortune is in the Follow-Up</h2>
          <p>Consistent follow-up separates professionals from amateurs.</p>
        </div>
        
        <h2>Immediate Follow-Up (24 Hours)</h2>
        <ul>
          <li>Send thank you message</li>
          <li>Email proposal as promised</li>
          <li>Include any requested information</li>
          <li>Confirm next steps</li>
          <li>Provide your direct contact</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 20
    }
  ]);
  
  // Module 6: Installation Process
  const [residentialModule6] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Installation Process & Quality',
    description: 'Understanding proper installation techniques and quality standards',
    icon: 'hammer',
    orderIndex: 6,
    totalLessons: 3
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule6.id,
      title: 'Installation Standards',
      content: `<h1>Installation Standards</h1>
        <div class="bg-orange-50 p-6 rounded-lg mb-6">
          <h2>Quality Installation = Happy Customers</h2>
          <p>Understanding proper installation ensures you can confidently sell and deliver quality.</p>
        </div>
        
        <h2>Pre-Installation Requirements</h2>
        <ul>
          <li>Permits obtained and posted</li>
          <li>Materials delivered and inspected</li>
          <li>Dumpster properly placed</li>
          <li>Property protection in place</li>
          <li>Weather forecast checked</li>
          <li>Crew briefed on scope</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule6.id,
      title: 'Common Installation Mistakes',
      content: `<h1>Common Installation Mistakes</h1>
        <div class="bg-red-50 p-6 rounded-lg mb-6">
          <h2>Learn from Others' Mistakes</h2>
          <p>Knowing common errors helps you ensure quality and avoid callbacks.</p>
        </div>
        
        <h2>Ventilation Mistakes</h2>
        <ul>
          <li>Insufficient intake ventilation</li>
          <li>Blocked soffit vents</li>
          <li>Mixing ventilation types</li>
          <li>Short-circuiting airflow</li>
          <li>Not calculating proper ratios</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 20
    },
    {
      moduleId: residentialModule6.id,
      title: 'Job Site Management',
      content: `<h1>Job Site Management</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>Professional Job Sites Build Trust</h2>
          <p>How the job site is managed reflects on your company's professionalism.</p>
        </div>
        
        <h2>Property Protection</h2>
        <ul>
          <li>Tarps for landscaping</li>
          <li>Plywood over windows</li>
          <li>Cover AC units</li>
          <li>Protect pool/spa</li>
          <li>Move outdoor furniture</li>
          <li>Document pre-existing damage</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 20
    }
  ]);
  
  // Module 7: Financing Options
  const [residentialModule7] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Financing & Payment Options',
    description: 'Help customers afford their roofing investment',
    icon: 'dollar-sign',
    orderIndex: 7,
    totalLessons: 2
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule7.id,
      title: 'Financing Solutions',
      content: `<h1>Financing Solutions</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Make It Affordable</h2>
          <p>Financing options help more customers say yes to needed repairs.</p>
        </div>
        
        <h2>Why Offer Financing</h2>
        <ul>
          <li>Increases closing rate by 30-40%</li>
          <li>Higher average tickets</li>
          <li>Helps customers in emergencies</li>
          <li>Competitive advantage</li>
          <li>Faster decision making</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 20
    },
    {
      moduleId: residentialModule7.id,
      title: 'Insurance Claim Assistance',
      content: `<h1>Insurance Claim Assistance</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Be Their Insurance Advocate</h2>
          <p>Helping with insurance claims provides value and builds trust.</p>
        </div>
        
        <h2>How We Help With Claims</h2>
        <ul>
          <li>Free inspection and documentation</li>
          <li>Meet with adjusters</li>
          <li>Provide detailed estimates</li>
          <li>Handle supplements</li>
          <li>Work within insurance scope</li>
          <li>Only collect deductible</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 20
    }
  ]);
  
  // Module 8: Building Your Business
  const [residentialModule8] = await db.insert(trainingModules).values({
    trackId: residentialTrack.id,
    title: 'Building Your Business',
    description: 'Generate leads, get referrals, and grow your success',
    icon: 'users',
    orderIndex: 8,
    totalLessons: 3
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: residentialModule8.id,
      title: 'Lead Generation Strategies',
      content: `<h1>Lead Generation Strategies</h1>
        <div class="bg-yellow-50 p-6 rounded-lg mb-6">
          <h2>Consistent Leads = Consistent Income</h2>
          <p>Master multiple lead generation methods to keep your pipeline full.</p>
        </div>
        
        <h2>Door-to-Door Canvassing</h2>
        <ul>
          <li>Target storm-damaged areas</li>
          <li>Work in teams for safety</li>
          <li>Professional appearance always</li>
          <li>Have clear talking points</li>
          <li>Leave professional materials</li>
          <li>Follow up on interests immediately</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 25
    },
    {
      moduleId: residentialModule8.id,
      title: 'Building Your Reputation',
      content: `<h1>Building Your Reputation</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>Your Reputation is Everything</h2>
          <p>A strong reputation makes selling easier and generates automatic referrals.</p>
        </div>
        
        <h2>Online Reviews Strategy</h2>
        <ul>
          <li>Ask at the point of maximum happiness</li>
          <li>Make it easy with links</li>
          <li>Guide them on what to write</li>
          <li>Respond to all reviews</li>
          <li>Address negative reviews professionally</li>
          <li>Showcase reviews everywhere</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 20
    },
    {
      moduleId: residentialModule8.id,
      title: 'Goal Setting and Success',
      content: `<h1>Goal Setting and Success</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Success Doesn't Happen by Accident</h2>
          <p>Set clear goals and work your plan to achieve the success you deserve.</p>
        </div>
        
        <h2>Setting SMART Goals</h2>
        <ul>
          <li><strong>Specific:</strong> Clear and defined</li>
          <li><strong>Measurable:</strong> Track progress</li>
          <li><strong>Achievable:</strong> Realistic targets</li>
          <li><strong>Relevant:</strong> Aligned with values</li>
          <li><strong>Time-bound:</strong> Clear deadlines</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 20
    }
  ]);
  
  // COMMERCIAL ROOFING MODULES
  
  // Module 1: Commercial Fundamentals
  const [commercialModule1] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Commercial Roofing Fundamentals',
    description: 'Understanding commercial roofing systems and requirements',
    icon: 'briefcase',
    orderIndex: 1,
    totalLessons: 4
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: commercialModule1.id,
      title: 'Commercial vs Residential Roofing',
      content: `<h1>Commercial vs Residential Roofing</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>A Different Approach</h2>
          <p>Commercial roofing requires specialized knowledge, techniques, and business practices.</p>
        </div>
        
        <h2>Key Differences</h2>
        
        <h3>Structural Differences</h3>
        <ul>
          <li><strong>Roof Slope:</strong> Commercial often flat or low-slope</li>
          <li><strong>Size:</strong> Significantly larger square footage</li>
          <li><strong>Load Requirements:</strong> HVAC units, foot traffic</li>
          <li><strong>Access:</strong> Internal drains vs. gutters</li>
          <li><strong>Penetrations:</strong> More vents, skylights, equipment</li>
        </ul>
        
        <h3>Material Differences</h3>
        <ul>
          <li><strong>Commercial:</strong> TPO, EPDM, PVC, Modified Bitumen, BUR</li>
          <li><strong>Residential:</strong> Asphalt shingles, tile, metal panels</li>
          <li><strong>Installation:</strong> Adhered, mechanically attached, or ballasted</li>
          <li><strong>Warranties:</strong> Often 20-30 years vs. residential 10-50 years</li>
        </ul>
        
        <h3>Business Differences</h3>
        <ul>
          <li><strong>Decision Makers:</strong> Multiple stakeholders</li>
          <li><strong>Budget Process:</strong> Capital expenditure planning</li>
          <li><strong>Timing:</strong> Minimize business disruption</li>
          <li><strong>Insurance:</strong> Higher liability requirements</li>
          <li><strong>Contracts:</strong> More complex terms and conditions</li>
        </ul>
        
        <h2>Commercial Project Stakeholders</h2>
        <ul>
          <li><strong>Property Manager:</strong> Day-to-day operations</li>
          <li><strong>Building Owner:</strong> Investment decisions</li>
          <li><strong>Facility Manager:</strong> Maintenance and operations</li>
          <li><strong>Tenants:</strong> Business disruption concerns</li>
          <li><strong>Insurance Company:</strong> Risk assessment</li>
          <li><strong>Local Authorities:</strong> Permits and codes</li>
        </ul>
        
        <h2>Commercial Project Phases</h2>
        <ul>
          <li>Initial assessment and budgeting</li>
          <li>Specification development</li>
          <li>Bidding process</li>
          <li>Contract negotiation</li>
          <li>Permit acquisition</li>
          <li>Installation scheduling</li>
          <li>Quality control inspections</li>
          <li>Warranty registration</li>
          <li>Maintenance program setup</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 25
    },
    {
      moduleId: commercialModule1.id,
      title: 'Commercial Roofing Systems',
      content: `<h1>Commercial Roofing Systems</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>System Knowledge is Essential</h2>
          <p>Understanding different commercial systems helps you recommend the right solution.</p>
        </div>
        
        <h2>TPO (Thermoplastic Polyolefin)</h2>
        <ul>
          <li><strong>Characteristics:</strong> White, heat-reflective, energy efficient</li>
          <li><strong>Installation:</strong> Heat-welded seams, mechanically attached or adhered</li>
          <li><strong>Lifespan:</strong> 20-30 years</li>
          <li><strong>Best For:</strong> Energy efficiency, cool roof requirements</li>
          <li><strong>Advantages:</strong> UV resistant, chemical resistant, recyclable</li>
        </ul>
        
        <h2>EPDM (Ethylene Propylene Diene Monomer)</h2>
        <ul>
          <li><strong>Characteristics:</strong> Black rubber membrane</li>
          <li><strong>Installation:</strong> Adhered, ballasted, or mechanically fastened</li>
          <li><strong>Lifespan:</strong> 20-25 years</li>
          <li><strong>Best For:</strong> Budget-conscious projects</li>
          <li><strong>Advantages:</strong> Proven track record, easy repairs</li>
        </ul>
        
        <h2>PVC (Polyvinyl Chloride)</h2>
        <ul>
          <li><strong>Characteristics:</strong> White, highly durable membrane</li>
          <li><strong>Installation:</strong> Heat-welded seams</li>
          <li><strong>Lifespan:</strong> 20-30+ years</li>
          <li><strong>Best For:</strong> Restaurants, chemical exposure</li>
          <li><strong>Advantages:</strong> Chemical resistant, fire resistant</li>
        </ul>
        
        <h2>Modified Bitumen</h2>
        <ul>
          <li><strong>Characteristics:</strong> Asphalt-based with modifiers</li>
          <li><strong>Installation:</strong> Torch-applied, cold-applied, or self-adhered</li>
          <li><strong>Lifespan:</strong> 15-20 years</li>
          <li><strong>Best For:</strong> High foot traffic areas</li>
          <li><strong>Advantages:</strong> Multiple layers, granulated surface options</li>
        </ul>
        
        <h2>Built-Up Roofing (BUR)</h2>
        <ul>
          <li><strong>Characteristics:</strong> Multiple layers of tar and gravel</li>
          <li><strong>Installation:</strong> Hot tar application</li>
          <li><strong>Lifespan:</strong> 15-30 years</li>
          <li><strong>Best For:</strong> Traditional flat roofs</li>
          <li><strong>Advantages:</strong> Proven system, UV protection from gravel</li>
        </ul>
        
        <h2>Metal Roofing Systems</h2>
        <ul>
          <li><strong>Standing Seam:</strong> Concealed fasteners, 30-50 years</li>
          <li><strong>R-Panel:</strong> Exposed fasteners, economical</li>
          <li><strong>Structural:</strong> Can span open framing</li>
          <li><strong>Advantages:</strong> Long lifespan, low maintenance</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 30
    },
    {
      moduleId: commercialModule1.id,
      title: 'Commercial Roof Maintenance',
      content: `<h1>Commercial Roof Maintenance</h1>
        <div class="bg-orange-50 p-6 rounded-lg mb-6">
          <h2>Maintenance Extends Roof Life</h2>
          <p>Regular maintenance can double a commercial roof's lifespan and prevent costly failures.</p>
        </div>
        
        <h2>Maintenance Program Components</h2>
        
        <h3>Bi-Annual Inspections</h3>
        <ul>
          <li>Spring: Check winter damage</li>
          <li>Fall: Prepare for winter</li>
          <li>After severe weather events</li>
          <li>Document all findings</li>
        </ul>
        
        <h3>Inspection Checklist</h3>
        <ul>
          <li><strong>Membrane:</strong> Tears, punctures, blisters</li>
          <li><strong>Seams:</strong> Separation, deterioration</li>
          <li><strong>Flashings:</strong> Loose, damaged, or missing</li>
          <li><strong>Drains:</strong> Clear of debris, proper flow</li>
          <li><strong>Penetrations:</strong> Sealed, secure</li>
          <li><strong>Parapet Walls:</strong> Coping secure, sealed</li>
          <li><strong>HVAC Units:</strong> Properly secured, curbs sealed</li>
        </ul>
        
        <h2>Common Commercial Roof Problems</h2>
        <ul>
          <li><strong>Ponding Water:</strong> Standing water over 48 hours</li>
          <li><strong>Membrane Shrinkage:</strong> Pulling at edges and penetrations</li>
          <li><strong>Blow-offs:</strong> Wind damage to improperly secured systems</li>
          <li><strong>Punctures:</strong> Foot traffic, dropped tools, HVAC work</li>
          <li><strong>Poor Installation:</strong> Improper flashing, seaming</li>
        </ul>
        
        <h2>Preventive Maintenance Tasks</h2>
        <ul>
          <li>Clear drains and scuppers</li>
          <li>Remove debris</li>
          <li>Trim overhanging vegetation</li>
          <li>Seal minor cracks and gaps</li>
          <li>Check and tighten fasteners</li>
          <li>Apply protective coatings as needed</li>
        </ul>
        
        <h2>Maintenance Documentation</h2>
        <ul>
          <li>Date and weather conditions</li>
          <li>Areas inspected</li>
          <li>Problems identified</li>
          <li>Repairs performed</li>
          <li>Photos of issues</li>
          <li>Recommendations for future work</li>
          <li>Warranty compliance records</li>
        </ul>
        
        <h2>Value Proposition for Clients</h2>
        <ul>
          <li>Extends roof life by 5-10 years</li>
          <li>Prevents emergency repairs</li>
          <li>Maintains warranty validity</li>
          <li>Reduces energy costs</li>
          <li>Protects building contents</li>
          <li>Predictable budget planning</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 25
    },
    {
      moduleId: commercialModule1.id,
      title: 'Commercial Sales Process',
      content: `<h1>Commercial Sales Process</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>B2B Sales Excellence</h2>
          <p>Commercial roofing sales requires a professional, consultative approach with multiple decision makers.</p>
        </div>
        
        <h2>Lead Generation</h2>
        <ul>
          <li><strong>Property Management Companies:</strong> Multiple properties</li>
          <li><strong>Real Estate Investors:</strong> Portfolio maintenance</li>
          <li><strong>Facility Managers:</strong> Direct relationships</li>
          <li><strong>General Contractors:</strong> Subcontract opportunities</li>
          <li><strong>Insurance Adjusters:</strong> Storm damage projects</li>
        </ul>
        
        <h2>Initial Contact Best Practices</h2>
        <ul>
          <li>Research the company beforehand</li>
          <li>Identify the decision maker</li>
          <li>Understand their business needs</li>
          <li>Schedule a professional meeting</li>
          <li>Prepare relevant case studies</li>
        </ul>
        
        <h2>Commercial Proposal Elements</h2>
        
        <h3>Executive Summary</h3>
        <ul>
          <li>Current roof condition</li>
          <li>Recommended solution</li>
          <li>Investment required</li>
          <li>ROI and payback period</li>
        </ul>
        
        <h3>Technical Specifications</h3>
        <ul>
          <li>Detailed scope of work</li>
          <li>Material specifications</li>
          <li>Installation methodology</li>
          <li>Code compliance</li>
          <li>Warranty details</li>
        </ul>
        
        <h3>Project Management</h3>
        <ul>
          <li>Timeline and phases</li>
          <li>Safety protocols</li>
          <li>Business disruption mitigation</li>
          <li>Communication plan</li>
          <li>Quality control process</li>
        </ul>
        
        <h2>Value Engineering</h2>
        <ul>
          <li>Multiple options with cost-benefit analysis</li>
          <li>Life-cycle cost comparisons</li>
          <li>Energy savings calculations</li>
          <li>Maintenance cost projections</li>
          <li>Tax incentives and rebates</li>
        </ul>
        
        <h2>Closing Commercial Deals</h2>
        <ul>
          <li>Understand the approval process</li>
          <li>Address all stakeholder concerns</li>
          <li>Provide references from similar projects</li>
          <li>Offer flexible payment terms</li>
          <li>Include maintenance programs</li>
          <li>Be patient - decisions take time</li>
        </ul>`,
      orderIndex: 4,
      estimatedMinutes: 30
    }
  ]);
  
  // Continue with more Commercial modules (2-8)...
  
  // RESTORATION & INSURANCE MODULES
  
  // Module 1: Insurance Fundamentals
  const [restorationModule1] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Insurance Claims Fundamentals',
    description: 'Master the insurance claims process from start to finish',
    icon: 'clipboard',
    orderIndex: 1,
    totalLessons: 4
  }).returning();
  
  await db.insert(lessons).values([
    {
      moduleId: restorationModule1.id,
      title: 'Understanding Insurance Coverage',
      content: `<h1>Understanding Insurance Coverage</h1>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h2>Insurance Knowledge is Power</h2>
          <p>Understanding insurance policies helps you better serve homeowners during the claims process.</p>
        </div>
        
        <h2>Types of Coverage</h2>
        
        <h3>Replacement Cost Value (RCV)</h3>
        <ul>
          <li>Covers full replacement cost</li>
          <li>No depreciation deducted</li>
          <li>May require actual replacement</li>
          <li>Typically paid in two checks</li>
        </ul>
        
        <h3>Actual Cash Value (ACV)</h3>
        <ul>
          <li>Replacement cost minus depreciation</li>
          <li>Single payment</li>
          <li>May not cover full replacement</li>
          <li>Common on older roofs</li>
        </ul>
        
        <h2>Common Perils Covered</h2>
        <ul>
          <li><strong>Wind:</strong> Including hurricanes and tornadoes</li>
          <li><strong>Hail:</strong> Size and impact damage</li>
          <li><strong>Fire:</strong> Direct fire damage</li>
          <li><strong>Lightning:</strong> Strike damage</li>
          <li><strong>Weight of Ice/Snow:</strong> Collapse or damage</li>
          <li><strong>Vandalism:</strong> Intentional damage</li>
          <li><strong>Falling Objects:</strong> Trees, debris</li>
        </ul>
        
        <h2>Common Exclusions</h2>
        <ul>
          <li>Wear and tear</li>
          <li>Lack of maintenance</li>
          <li>Improper installation</li>
          <li>Flood damage (separate policy)</li>
          <li>Earthquake (separate policy)</li>
          <li>Gradual deterioration</li>
        </ul>
        
        <h2>Policy Components</h2>
        <ul>
          <li><strong>Deductible:</strong> Homeowner's out-of-pocket</li>
          <li><strong>Coverage Limits:</strong> Maximum payout</li>
          <li><strong>Endorsements:</strong> Additional coverage</li>
          <li><strong>Exclusions:</strong> What's not covered</li>
          <li><strong>Conditions:</strong> Requirements for coverage</li>
        </ul>
        
        <h2>Reading an Insurance Estimate</h2>
        <ul>
          <li>Line items for materials and labor</li>
          <li>Overhead and profit (O&P)</li>
          <li>Depreciation calculations</li>
          <li>Supplements for additional damage</li>
          <li>Code upgrade requirements</li>
        </ul>`,
      orderIndex: 1,
      estimatedMinutes: 30
    },
    {
      moduleId: restorationModule1.id,
      title: 'The Claims Process',
      content: `<h1>The Claims Process</h1>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h2>Navigate Claims Successfully</h2>
          <p>Understanding each step of the claims process helps ensure proper coverage for homeowners.</p>
        </div>
        
        <h2>Claims Process Steps</h2>
        
        <h3>1. Damage Occurs</h3>
        <ul>
          <li>Document date and time</li>
          <li>Take immediate photos</li>
          <li>Prevent further damage</li>
          <li>Keep damaged materials</li>
        </ul>
        
        <h3>2. Initial Contact</h3>
        <ul>
          <li>Homeowner files claim</li>
          <li>Claim number assigned</li>
          <li>Adjuster assigned</li>
          <li>Initial documentation provided</li>
        </ul>
        
        <h3>3. Inspection Scheduled</h3>
        <ul>
          <li>Adjuster contacts homeowner</li>
          <li>Inspection date set</li>
          <li>Contractor should attend</li>
          <li>Prepare documentation</li>
        </ul>
        
        <h3>4. Adjuster Inspection</h3>
        <ul>
          <li>Meet adjuster on-site</li>
          <li>Point out all damage</li>
          <li>Provide test squares if needed</li>
          <li>Document with photos</li>
          <li>Get adjuster's contact info</li>
        </ul>
        
        <h3>5. Initial Settlement</h3>
        <ul>
          <li>Review adjuster's estimate</li>
          <li>Identify missing items</li>
          <li>Calculate ACV payment</li>
          <li>Understand depreciation</li>
        </ul>
        
        <h3>6. Supplementing</h3>
        <ul>
          <li>Document additional damage</li>
          <li>Submit with photos</li>
          <li>Include code requirements</li>
          <li>Justify all additions</li>
        </ul>
        
        <h3>7. Work Completion</h3>
        <ul>
          <li>Complete approved scope</li>
          <li>Document with photos</li>
          <li>Obtain completion certificate</li>
        </ul>
        
        <h3>8. Final Payment</h3>
        <ul>
          <li>Submit completion docs</li>
          <li>Recoverable depreciation released</li>
          <li>Final invoice matches claim</li>
        </ul>
        
        <h2>Your Role as Advocate</h2>
        <ul>
          <li>Educate homeowner on process</li>
          <li>Ensure all damage documented</li>
          <li>Attend adjuster meeting</li>
          <li>Review estimates thoroughly</li>
          <li>Submit proper supplements</li>
          <li>Communicate regularly</li>
        </ul>`,
      orderIndex: 2,
      estimatedMinutes: 25
    },
    {
      moduleId: restorationModule1.id,
      title: 'Working with Adjusters',
      content: `<h1>Working with Adjusters</h1>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h2>Build Professional Relationships</h2>
          <p>Successful collaboration with adjusters ensures proper claim settlements.</p>
        </div>
        
        <h2>Types of Adjusters</h2>
        
        <h3>Staff Adjusters</h3>
        <ul>
          <li>Employed by insurance company</li>
          <li>Handle routine claims</li>
          <li>Follow company guidelines</li>
          <li>May have limited authority</li>
        </ul>
        
        <h3>Independent Adjusters</h3>
        <ul>
          <li>Third-party contractors</li>
          <li>Handle overflow or catastrophe claims</li>
          <li>Work for multiple carriers</li>
          <li>Often more experienced</li>
        </ul>
        
        <h3>Public Adjusters</h3>
        <ul>
          <li>Represent homeowner</li>
          <li>Charge percentage of claim</li>
          <li>Handle negotiations</li>
          <li>May complicate contractor role</li>
        </ul>
        
        <h2>Meeting Best Practices</h2>
        
        <h3>Before the Meeting</h3>
        <ul>
          <li>Inspect thoroughly</li>
          <li>Mark damage clearly</li>
          <li>Prepare test squares</li>
          <li>Have documentation ready</li>
          <li>Know policy coverage</li>
        </ul>
        
        <h3>During the Meeting</h3>
        <ul>
          <li>Be professional and courteous</li>
          <li>Provide safe roof access</li>
          <li>Point out all damage</li>
          <li>Take photos together</li>
          <li>Agree on scope when possible</li>
          <li>Get contact information</li>
        </ul>
        
        <h3>After the Meeting</h3>
        <ul>
          <li>Review estimate immediately</li>
          <li>Document any disagreements</li>
          <li>Submit supplements promptly</li>
          <li>Maintain communication</li>
        </ul>
        
        <h2>Communication Tips</h2>
        <ul>
          <li>Always be respectful</li>
          <li>Use industry terminology correctly</li>
          <li>Provide clear documentation</li>
          <li>Respond promptly to requests</li>
          <li>Keep homeowner informed</li>
          <li>Build long-term relationships</li>
        </ul>
        
        <h2>Common Adjuster Concerns</h2>
        <ul>
          <li><strong>Scope Inflation:</strong> Stay honest and accurate</li>
          <li><strong>Documentation:</strong> Provide clear evidence</li>
          <li><strong>Pricing:</strong> Use market rates</li>
          <li><strong>Communication:</strong> Be responsive</li>
          <li><strong>Quality:</strong> Deliver as promised</li>
        </ul>`,
      orderIndex: 3,
      estimatedMinutes: 25
    },
    {
      moduleId: restorationModule1.id,
      title: 'Documentation and Supplements',
      content: `<h1>Documentation and Supplements</h1>
        <div class="bg-yellow-50 p-6 rounded-lg mb-6">
          <h2>Documentation Drives Success</h2>
          <p>Proper documentation is the key to getting claims approved and paid correctly.</p>
        </div>
        
        <h2>Essential Documentation</h2>
        
        <h3>Photo Documentation</h3>
        <ul>
          <li><strong>Overview Photos:</strong> All roof slopes</li>
          <li><strong>Detail Photos:</strong> Close-ups of damage</li>
          <li><strong>Test Squares:</strong> 10'x10' marked areas</li>
          <li><strong>Collateral Damage:</strong> Gutters, vents, etc.</li>
          <li><strong>Interior Damage:</strong> If applicable</li>
        </ul>
        
        <h3>Photo Best Practices</h3>
        <ul>
          <li>Use high resolution</li>
          <li>Include measuring tape for scale</li>
          <li>Circle or mark damage</li>
          <li>Take before, during, after photos</li>
          <li>Organize by roof section</li>
          <li>Label clearly</li>
        </ul>
        
        <h2>Creating Effective Supplements</h2>
        
        <h3>Common Supplement Items</h3>
        <ul>
          <li>Additional damage found during tear-off</li>
          <li>Decking replacement</li>
          <li>Code upgrades required</li>
          <li>Permit fees</li>
          <li>Dumpster and disposal</li>
          <li>Additional materials needed</li>
        </ul>
        
        <h3>Supplement Format</h3>
        <ul>
          <li>Use Xactimate or similar format</li>
          <li>Match line item codes</li>
          <li>Include quantities and measurements</li>
          <li>Provide supporting photos</li>
          <li>Explain necessity clearly</li>
        </ul>
        
        <h2>Documentation Checklist</h2>
        <ul>
          <li>□ Date of loss documentation</li>
          <li>□ Weather reports</li>
          <li>□ Initial damage photos</li>
          <li>□ Inspection reports</li>
          <li>□ Adjuster estimate</li>
          <li>□ Supplement requests</li>
          <li>□ Work in progress photos</li>
          <li>□ Completion photos</li>
          <li>□ Invoices and receipts</li>
          <li>□ Warranty documentation</li>
        </ul>
        
        <h2>Digital Tools</h2>
        <ul>
          <li><strong>CompanyCam:</strong> Photo documentation</li>
          <li><strong>Xactimate:</strong> Estimating platform</li>
          <li><strong>Symbility:</strong> Claims platform</li>
          <li><strong>EagleView:</strong> Aerial measurements</li>
          <li><strong>HOVER:</strong> 3D modeling</li>
        </ul>`,
      orderIndex: 4,
      estimatedMinutes: 30
    }
  ]);
  
  // Module 2-8 for Commercial Track
  const [commercialModule2] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Commercial Sales Process',
    description: 'Master B2B sales for commercial roofing projects',
    icon: 'trending-up',
    orderIndex: 2,
    totalLessons: 3
  }).returning();
  
  const [commercialModule3] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Commercial Project Management',
    description: 'Execute large-scale commercial roofing projects successfully',
    icon: 'clipboard-list',
    orderIndex: 3,
    totalLessons: 3
  }).returning();
  
  const [commercialModule4] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Maintenance Programs',
    description: 'Develop profitable commercial maintenance contracts',
    icon: 'tool',
    orderIndex: 4,
    totalLessons: 2
  }).returning();
  
  const [commercialModule5] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Energy Efficiency Solutions',
    description: 'Cool roofs, solar, and energy savings opportunities',
    icon: 'sun',
    orderIndex: 5,
    totalLessons: 2
  }).returning();
  
  const [commercialModule6] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Commercial Warranties',
    description: 'Understanding and selling commercial warranty programs',
    icon: 'shield',
    orderIndex: 6,
    totalLessons: 2
  }).returning();
  
  const [commercialModule7] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Emergency Services',
    description: '24/7 emergency response for commercial clients',
    icon: 'alert-circle',
    orderIndex: 7,
    totalLessons: 2
  }).returning();
  
  const [commercialModule8] = await db.insert(trainingModules).values({
    trackId: commercialTrack.id,
    title: 'Building Commercial Relationships',
    description: 'Long-term partnerships and account management',
    icon: 'handshake',
    orderIndex: 8,
    totalLessons: 2
  }).returning();
  
  // Module 2-8 for Restoration Track
  const [restorationModule2] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Storm Damage Assessment',
    description: 'Identify and document all types of storm damage',
    icon: 'cloud-lightning',
    orderIndex: 2,
    totalLessons: 3
  }).returning();
  
  const [restorationModule3] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Xactimate Mastery',
    description: 'Create accurate estimates using industry-standard software',
    icon: 'calculator',
    orderIndex: 3,
    totalLessons: 3
  }).returning();
  
  const [restorationModule4] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Supplement Strategies',
    description: 'Get paid for all necessary work through proper supplements',
    icon: 'file-plus',
    orderIndex: 4,
    totalLessons: 2
  }).returning();
  
  const [restorationModule5] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Emergency Tarping',
    description: 'Provide immediate protection and secure the job',
    icon: 'umbrella',
    orderIndex: 5,
    totalLessons: 2
  }).returning();
  
  const [restorationModule6] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Water Damage Restoration',
    description: 'Handle interior damage from roof leaks',
    icon: 'droplet',
    orderIndex: 6,
    totalLessons: 2
  }).returning();
  
  const [restorationModule7] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Large Loss Projects',
    description: 'Manage catastrophic damage and complex claims',
    icon: 'building',
    orderIndex: 7,
    totalLessons: 2
  }).returning();
  
  const [restorationModule8] = await db.insert(trainingModules).values({
    trackId: restorationTrack.id,
    title: 'Customer Advocacy',
    description: 'Help customers navigate the insurance process',
    icon: 'heart-handshake',
    orderIndex: 8,
    totalLessons: 2
  }).returning();
  
  // Create quiz questions for each module
  await createQuizQuestions([
    residentialModule1.id,
    residentialModule2.id,
    residentialModule3.id,
    residentialModule4.id,
    residentialModule5.id,
    residentialModule6.id,
    residentialModule7.id,
    residentialModule8.id,
    commercialModule1.id,
    commercialModule2.id,
    commercialModule3.id,
    commercialModule4.id,
    commercialModule5.id,
    commercialModule6.id,
    commercialModule7.id,
    commercialModule8.id,
    restorationModule1.id,
    restorationModule2.id,
    restorationModule3.id,
    restorationModule4.id,
    restorationModule5.id,
    restorationModule6.id,
    restorationModule7.id,
    restorationModule8.id
  ]);
  
  console.log('Comprehensive roofing training curriculum created successfully!');
}

async function createQuizQuestions(moduleIds: string[]) {
  // Create sample quiz questions for each module
  for (const moduleId of moduleIds) {
    await db.insert(quizQuestions).values([
      {
        moduleId,
        question: 'What is the primary purpose of this training module?',
        options: [
          'To increase sales',
          'To improve knowledge and skills',
          'To meet requirements',
          'To pass time'
        ],
        correctAnswer: 1,
        explanation: 'Training modules are designed to improve knowledge and skills in specific areas.'
      },
      {
        moduleId,
        question: 'How should you apply what you learned in this module?',
        options: [
          'Ignore it',
          'Apply it immediately in your work',
          'Wait for permission',
          'Only in certain situations'
        ],
        correctAnswer: 1,
        explanation: 'The best way to benefit from training is to apply new knowledge immediately in your work.'
      }
    ]);
  }
}