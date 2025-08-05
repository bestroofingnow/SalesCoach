import { db } from './db';
import { lessons, quizQuestions } from '@shared/schema';

async function seedRemainingLessons() {
  console.log('Starting to seed remaining lessons...');
  
  try {
    // Materials & Installation Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-materials',
        title: 'Choosing the Right Shingles',
        content: `<h2>Selecting the Perfect Shingles for Your Customer</h2>
<p class="text-lg mb-6">Help customers make confident decisions by understanding their unique needs and matching them with the right product.</p>

<h3 class="text-2xl font-bold mb-4">The Selection Process</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Step 1: Understand Their Priorities</h4>
  <ul class="list-disc pl-6">
    <li><strong>Budget:</strong> What's their comfortable investment range?</li>
    <li><strong>Aesthetics:</strong> What look are they trying to achieve?</li>
    <li><strong>Longevity:</strong> How long do they plan to stay in the home?</li>
    <li><strong>Weather:</strong> What are their main weather concerns?</li>
    <li><strong>Energy:</strong> Are they interested in energy savings?</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">CertainTeed Product Line Overview</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Landmark Series</h4>
    <p class="mb-3"><strong>Our Volume Leader</strong></p>
    <ul class="list-disc pl-6">
      <li>30-year warranty</li>
      <li>Class A fire rating</li>
      <li>110 mph wind warranty</li>
      <li>StreakFighter protection</li>
      <li>16 color options</li>
    </ul>
    <p class="mt-3 bg-white p-3 rounded"><strong>Perfect for:</strong> Value-conscious homeowners wanting quality</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Landmark PRO</h4>
    <p class="mb-3"><strong>Our Premium Choice</strong></p>
    <ul class="list-disc pl-6">
      <li>Lifetime warranty</li>
      <li>130 mph wind warranty</li>
      <li>Class 4 impact rating</li>
      <li>MAX DEF colors</li>
      <li>Insurance discounts</li>
    </ul>
    <p class="mt-3 bg-white p-3 rounded"><strong>Perfect for:</strong> Long-term homeowners in storm zones</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-materials',
        title: 'Installation Best Practices',
        content: `<h2>Professional Installation Standards</h2>
<p class="text-lg mb-6">Quality installation is the difference between a 20-year roof and a 50-year roof. Master these standards to deliver excellence.</p>

<h3 class="text-2xl font-bold mb-4">The BRN Installation Process</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Pre-Installation Checklist</h4>
  <ol class="list-decimal pl-6">
    <li><strong>Weather Check:</strong> No rain for 24 hours</li>
    <li><strong>Material Staging:</strong> Organized by installation order</li>
    <li><strong>Safety Setup:</strong> Barriers, signage, fall protection</li>
    <li><strong>Customer Prep:</strong> Move vehicles, protect landscaping</li>
    <li><strong>Tool Inspection:</strong> All equipment ready</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Critical Installation Steps</h3>
<div class="installation-steps space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">1. Deck Preparation</h4>
    <ul class="list-disc pl-6">
      <li>Inspect every square foot</li>
      <li>Replace damaged decking</li>
      <li>Ensure proper spacing</li>
      <li>Check for proper ventilation</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Quality Check:</strong> "If you wouldn't put it on your mother's house, don't install it."</p>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">2. Ice & Water Shield</h4>
    <ul class="list-disc pl-6">
      <li>Minimum 3 feet at eaves</li>
      <li>Full valley coverage</li>
      <li>6 inches past interior walls</li>
      <li>Around all penetrations</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Pro Tip:</strong> "More ice shield is never wrong - it's cheap insurance."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-materials',
        title: 'Color Selection and Curb Appeal',
        content: `<h2>The Art of Color Selection</h2>
<p class="text-lg mb-6">Help customers choose colors that enhance their home's beauty and value. Color is emotion - get it right and they'll love you forever.</p>

<h3 class="text-2xl font-bold mb-4">Color Psychology in Roofing</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Dark Colors</h4>
    <ul class="list-disc pl-6">
      <li><strong>Charcoal/Black:</strong> Modern, sophisticated</li>
      <li><strong>Dark Brown:</strong> Traditional, earthy</li>
      <li><strong>Dark Gray:</strong> Contemporary, versatile</li>
    </ul>
    <p class="mt-3"><strong>Benefits:</strong> Hide imperfections, create contrast</p>
    <p><strong>Considerations:</strong> Absorb more heat, show fading</p>
  </div>
  
  <div class="bg-gray-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Light Colors</h4>
    <ul class="list-disc pl-6">
      <li><strong>Light Gray:</strong> Clean, modern</li>
      <li><strong>Tan/Beige:</strong> Warm, welcoming</li>
      <li><strong>Light Brown:</strong> Natural, timeless</li>
    </ul>
    <p class="mt-3"><strong>Benefits:</strong> Energy efficient, expand visual space</p>
    <p><strong>Considerations:</strong> Show dirt, less dramatic</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Color Matching System</h3>
<div class="bg-blue-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">BRN's 3-Step Color Process</h4>
  <ol class="list-decimal pl-6 space-y-3">
    <li>
      <strong>Identify Fixed Elements</strong>
      <p>Brick, stone, siding that won't change</p>
    </li>
    <li>
      <strong>Determine Undertones</strong>
      <p>Warm (red, orange, yellow) vs. Cool (blue, gray, green)</p>
    </li>
    <li>
      <strong>Create Harmony or Contrast</strong>
      <p>Match undertones for harmony, oppose for drama</p>
    </li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      },
      {
        moduleId: 'res-materials',
        title: 'Accessory Products and Upgrades',
        content: `<h2>Maximizing Value with Accessories</h2>
<p class="text-lg mb-6">Accessory products increase ticket size while solving real problems. Master these add-ons to boost revenue and customer satisfaction.</p>

<h3 class="text-2xl font-bold mb-4">Essential Accessories</h3>
<div class="accessories-grid space-y-4">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Ridge Vents</h4>
    <p class="mb-3"><strong>The #1 Upgrade</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Improves attic ventilation by 80%</li>
      <li>Reduces summer temps by 20-30°F</li>
      <li>Prevents ice dams</li>
      <li>Extends shingle life</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Sales Script:</strong> "For just $400 more, you'll save that in energy costs the first year alone."</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Gutter Guards</h4>
    <p class="mb-3"><strong>The Convenience Sell</strong></p>
    <ul class="list-disc pl-6 mb-3">
      <li>Never clean gutters again</li>
      <li>Prevents water damage</li>
      <li>Stops pest nesting</li>
      <li>5-year warranty</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>Sales Script:</strong> "How much do you hate cleaning gutters? What if you never had to do it again?"</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 22
      },
      {
        moduleId: 'res-materials',
        title: 'Warranty and Quality Assurance',
        content: `<h2>Delivering on Our 50-Year Promise</h2>
<p class="text-lg mb-6">Our warranty is only as good as our installation quality. Learn the systems that ensure every roof lives up to our promise.</p>

<h3 class="text-2xl font-bold mb-4">Quality Control Checkpoints</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The 5-Stage Quality System</h4>
  <ol class="list-decimal pl-6 space-y-3">
    <li><strong>Pre-Installation Inspection</strong> - Document existing conditions</li>
    <li><strong>Deck Inspection</strong> - Foreman approval required</li>
    <li><strong>Mid-Point Check</strong> - Verify underlayment and flashing</li>
    <li><strong>Completion Inspection</strong> - 27-point checklist</li>
    <li><strong>Customer Walkthrough</strong> - Explain what was done</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Common Installation Mistakes to Avoid</h3>
<div class="mistakes-grid grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-red-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">❌ Improper Nailing</h5>
    <ul class="list-disc pl-6">
      <li>Too high (blow-offs)</li>
      <li>Too low (leaks)</li>
      <li>Overdriven (tears)</li>
      <li>Underdriven (pops up)</li>
    </ul>
  </div>
  
  <div class="bg-red-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">❌ Poor Flashing</h5>
    <ul class="list-disc pl-6">
      <li>Reusing old flashing</li>
      <li>Incorrect overlap</li>
      <li>Missing step flashing</li>
      <li>Improper sealing</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 5,
        estimatedMinutes: 20
      }
    ]).returning();
    
    // Sales Excellence Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-sales-process',
        title: 'The Psychology of Roofing Sales',
        content: `<h2>Understanding the Customer's Mind</h2>
<p class="text-lg mb-6">Sales isn't about pushing products - it's about understanding fears, desires, and helping people make confident decisions.</p>

<h3 class="text-2xl font-bold mb-4">The Emotional Drivers</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">What Really Motivates Roofing Decisions</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Fear-Based Motivators</p>
      <ul class="list-disc pl-6">
        <li>Water damage to belongings</li>
        <li>Mold and health issues</li>
        <li>Catastrophic failure</li>
        <li>Being taken advantage of</li>
        <li>Making the wrong choice</li>
      </ul>
    </div>
    
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Desire-Based Motivators</p>
      <ul class="list-disc pl-6">
        <li>Beautiful home appearance</li>
        <li>Neighborhood status</li>
        <li>Peace of mind</li>
        <li>Energy savings</li>
        <li>Increased home value</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">The Trust Equation</h3>
<div class="bg-blue-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Trust = Credibility + Reliability + Intimacy / Self-Orientation</h4>
  <ul class="space-y-3">
    <li><strong>Credibility:</strong> Your knowledge and expertise (certifications, experience)</li>
    <li><strong>Reliability:</strong> Doing what you say (showing up on time, following through)</li>
    <li><strong>Intimacy:</strong> Personal connection (remembering names, caring about their specific needs)</li>
    <li><strong>Self-Orientation:</strong> How much you're focused on YOUR needs vs. theirs (lower is better)</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-sales-process',
        title: 'The BRN Sales System',
        content: `<h2>Our Proven 7-Step Sales Process</h2>
<p class="text-lg mb-6">Follow this system exactly and watch your close rate soar. Each step builds on the previous one - skip a step and the sale collapses.</p>

<h3 class="text-2xl font-bold mb-4">The INSPECT Method</h3>
<div class="sales-process space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">I - Introduction & Rapport</h4>
    <p class="mb-3"><strong>Time: 5-10 minutes</strong></p>
    <ul class="list-disc pl-6">
      <li>Warm greeting with a smile</li>
      <li>Comment on something positive about their home</li>
      <li>Share your local connection</li>
      <li>Ask about their roofing concerns</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Script:</strong> "Hi! I'm [Name] with Best Roofing Now. What a beautiful garden you have! I've been helping your neighbors here in [Neighborhood] for [Time]. What prompted you to look into your roof?"</p>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">N - Needs Discovery</h4>
    <p class="mb-3"><strong>Time: 10-15 minutes</strong></p>
    <ul class="list-disc pl-6">
      <li>Ask open-ended questions</li>
      <li>Listen more than you talk</li>
      <li>Uncover their real motivations</li>
      <li>Identify decision makers</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Key Questions:</strong><br/>
    "What's your biggest concern about your roof?"<br/>
    "How long do you plan to stay in this home?"<br/>
    "Have you had any issues we should know about?"</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">S - Survey with Technology</h4>
    <p class="mb-3"><strong>Time: 20-30 minutes</strong></p>
    <ul class="list-disc pl-6">
      <li>Drone inspection (WOW factor)</li>
      <li>Show them live footage</li>
      <li>Point out issues AND good areas</li>
      <li>Take detailed photos</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Script:</strong> "Let me show you something amazing. Our drone lets us see your entire roof safely. Watch this screen - I'll explain everything I'm seeing..."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 30
      },
      {
        moduleId: 'res-sales-process',
        title: 'Presentation Mastery',
        content: `<h2>Delivering a Compelling Presentation</h2>
<p class="text-lg mb-6">Your presentation should educate, build value, and make the decision obvious. Master this and price becomes secondary.</p>

<h3 class="text-2xl font-bold mb-4">The Perfect Presentation Structure</h3>
<div class="bg-yellow-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The 15-Minute Value Builder</h4>
  <ol class="list-decimal pl-6 space-y-3">
    <li><strong>Problem Summary (2 min)</strong> - What we found and why it matters</li>
    <li><strong>Solution Overview (3 min)</strong> - How we'll solve their specific issues</li>
    <li><strong>Company Credibility (2 min)</strong> - Why BRN is the right choice</li>
    <li><strong>Product Selection (3 min)</strong> - Options tailored to their needs</li>
    <li><strong>Installation Process (2 min)</strong> - What to expect</li>
    <li><strong>Warranty & Protection (2 min)</strong> - Our 50-year advantage</li>
    <li><strong>Investment & Financing (1 min)</strong> - Making it affordable</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Visual Selling Tools</h3>
<div class="tools-grid grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Digital Tools</h5>
    <ul class="list-disc pl-6">
      <li>iPad with before/after photos</li>
      <li>Drone footage from inspection</li>
      <li>Warranty comparisons</li>
      <li>Financing calculator</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Physical Samples</h5>
    <ul class="list-disc pl-6">
      <li>Shingle samples board</li>
      <li>Cut-away roof model</li>
      <li>Damaged shingle examples</li>
      <li>Color selection fan</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 28
      },
      {
        moduleId: 'res-sales-process',
        title: 'Objection Handling Like a Pro',
        content: `<h2>Turning Objections into Opportunities</h2>
<p class="text-lg mb-6">Objections aren't rejections - they're requests for more information. Master these responses and close more deals.</p>

<h3 class="text-2xl font-bold mb-4">The Big 5 Objections</h3>
<div class="objections space-y-4">
  <div class="bg-red-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">1. "The Price is Too High"</h4>
    <p class="font-semibold mb-2">Translation: "I don't see the value yet"</p>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"I understand price is important. Let me ask - is it the total investment that concerns you, or are you comparing this to another quote?"</p>
      <p class="mb-2"><strong>If total investment:</strong> "Let's talk about our financing options. Most families invest just $150-200/month."</p>
      <p><strong>If comparing:</strong> "I'd love to see what they're offering. Often the cheapest price means cutting corners that cost you more later."</p>
    </div>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">2. "I Need to Think About It"</h4>
    <p class="font-semibold mb-2">Translation: "I'm not convinced yet" or "I'm afraid of making a mistake"</p>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"That's perfectly reasonable - this is a big decision. What specifically would you like to think about? Is it the company, the products, or the investment?"</p>
      <p class="italic">Then address their specific concern and offer:</p>
      <p>"What if I could lock in today's price for 30 days while you consider it? Prices are going up next month."</p>
    </div>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">3. "I Need to Get Other Quotes"</h4>
    <p class="font-semibold mb-2">Translation: "I don't trust you yet" or "I want to verify your price"</p>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"That's smart! I always recommend getting 3 quotes. While you're comparing, here's what to ask the others..."</p>
      <ul class="list-disc pl-6 mt-2">
        <li>Do they offer a 50-year full warranty?</li>
        <li>Are they certified installers?</li>
        <li>Do they use drone inspections?</li>
        <li>What's their BBB rating?</li>
      </ul>
      <p class="mt-2">"I'm confident once you compare apples to apples, you'll see our value. Can I follow up in 3 days to answer any questions?"</p>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 32
      },
      {
        moduleId: 'res-sales-process',
        title: 'Closing with Confidence',
        content: `<h2>The Art of the Ethical Close</h2>
<p class="text-lg mb-6">Closing isn't pushy when you truly believe you're helping the customer. Learn to close with confidence and integrity.</p>

<h3 class="text-2xl font-bold mb-4">Recognizing Buying Signals</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">They're Ready When They:</h4>
  <ul class="list-disc pl-6 space-y-2">
    <li>Ask about specific dates or scheduling</li>
    <li>Inquire about financing terms</li>
    <li>Discuss color options in detail</li>
    <li>Ask "what happens next?"</li>
    <li>Start using "when" instead of "if"</li>
    <li>Bring up specific concerns about installation</li>
    <li>Ask about warranty details</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">The Top 5 Closing Techniques</h3>
<div class="closing-techniques space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">1. The Assumptive Close</h4>
    <p class="mb-3">Assume they're moving forward and discuss next steps.</p>
    <p class="bg-white p-3 rounded"><strong>Script:</strong> "So I'll have our installation coordinator call you tomorrow to schedule. Do mornings or afternoons work better for you?"</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">2. The Alternative Choice Close</h4>
    <p class="mb-3">Give them options that both result in a sale.</p>
    <p class="bg-white p-3 rounded"><strong>Script:</strong> "Would you prefer the Landmark or Landmark PRO shingles? Both are excellent, but the PRO gives you that lifetime warranty."</p>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">3. The Urgency Close</h4>
    <p class="mb-3">Create legitimate urgency without being pushy.</p>
    <p class="bg-white p-3 rounded"><strong>Script:</strong> "I can lock in this price today, but our manufacturer increase hits next Monday. Plus, our schedule is booking into next month already."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 5,
        estimatedMinutes: 26
      },
      {
        moduleId: 'res-sales-process',
        title: 'Follow-Up and Referral Systems',
        content: `<h2>Building a Referral Machine</h2>
<p class="text-lg mb-6">The sale doesn't end at signing - it begins. Master follow-up and watch referrals multiply your income.</p>

<h3 class="text-2xl font-bold mb-4">The Follow-Up Timeline</h3>
<div class="timeline bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Critical Touch Points</h4>
  <div class="space-y-3">
    <div class="bg-white p-3 rounded">
      <p class="font-bold">24 Hours After Sale:</p>
      <p>Thank you call - eliminate buyer's remorse</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">1 Week Before Installation:</p>
      <p>Preparation call - confirm details</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Day of Installation:</p>
      <p>Morning check-in - we're on our way!</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Day After Completion:</p>
      <p>Satisfaction call - address any concerns</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">1 Week Later:</p>
      <p>Referral request - they're most excited now</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">After First Storm:</p>
      <p>Check-in call - shows you care</p>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 6,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Roof Inspections Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-inspection',
        title: 'Drone Inspection Mastery',
        content: `<h2>Leveraging Technology for Superior Inspections</h2>
<p class="text-lg mb-6">Our drone technology sets us apart. Master it to impress customers and catch issues others miss.</p>

<h3 class="text-2xl font-bold mb-4">Drone Operation Basics</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Pre-Flight Checklist</h4>
  <ol class="list-decimal pl-6">
    <li>Check weather conditions (wind under 20mph)</li>
    <li>Verify battery levels (minimum 80%)</li>
    <li>Clear airspace check</li>
    <li>Customer permission confirmed</li>
    <li>Safety perimeter established</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">What to Look For</h3>
<div class="inspection-grid grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Shingle Issues</h5>
    <ul class="list-disc pl-6">
      <li>Missing or displaced shingles</li>
      <li>Curling or cupping</li>
      <li>Granule loss patterns</li>
      <li>Cracking or splitting</li>
      <li>Moss or algae growth</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Structural Concerns</h5>
    <ul class="list-disc pl-6">
      <li>Sagging areas</li>
      <li>Damaged flashing</li>
      <li>Vent problems</li>
      <li>Gutter issues</li>
      <li>Chimney deterioration</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 22
      },
      {
        moduleId: 'res-inspection',
        title: 'Traditional Inspection Techniques',
        content: `<h2>The Complete Physical Inspection</h2>
<p class="text-lg mb-6">While drones are amazing, nothing replaces a thorough physical inspection for the complete picture.</p>

<h3 class="text-2xl font-bold mb-4">The 27-Point Inspection</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Exterior Inspection Points</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p class="font-bold mb-2">From Ground Level:</p>
      <ol class="list-decimal pl-6">
        <li>Overall roof appearance</li>
        <li>Shingle alignment</li>
        <li>Visible damage or wear</li>
        <li>Gutter condition</li>
        <li>Downspout functionality</li>
        <li>Soffit ventilation</li>
        <li>Fascia board condition</li>
      </ol>
    </div>
    
    <div>
      <p class="font-bold mb-2">On-Roof Inspection:</p>
      <ol class="list-decimal pl-6" start="8">
        <li>Shingle adhesion</li>
        <li>Nail pops</li>
        <li>Boot conditions</li>
        <li>Valley integrity</li>
        <li>Ridge cap condition</li>
        <li>Step flashing</li>
        <li>Chimney flashing</li>
      </ol>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-inspection',
        title: 'Documenting and Reporting',
        content: `<h2>Professional Documentation Standards</h2>
<p class="text-lg mb-6">Proper documentation protects everyone and builds trust. Learn to create reports that sell themselves.</p>

<h3 class="text-2xl font-bold mb-4">Photo Documentation Best Practices</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Perfect Inspection Photo</h4>
  <ul class="list-disc pl-6">
    <li><strong>Wide shots:</strong> Show context and overall condition</li>
    <li><strong>Close-ups:</strong> Detail specific problems</li>
    <li><strong>Multiple angles:</strong> Prove extent of damage</li>
    <li><strong>Include markers:</strong> Use chalk or pointers for clarity</li>
    <li><strong>Good lighting:</strong> Avoid shadows that hide details</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Creating Compelling Reports</h3>
<div class="report-structure bg-green-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Report Sections</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Executive Summary</strong> - One paragraph overview</li>
    <li><strong>Critical Issues</strong> - Immediate concerns with photos</li>
    <li><strong>Maintenance Items</strong> - Future concerns to monitor</li>
    <li><strong>Positive Findings</strong> - What's in good condition</li>
    <li><strong>Recommendations</strong> - Clear next steps</li>
    <li><strong>Cost Estimates</strong> - Investment options</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-inspection',
        title: 'Safety Protocols',
        content: `<h2>Safety First: Protecting Yourself and Others</h2>
<p class="text-lg mb-6">No sale is worth an injury. Follow these protocols religiously to go home safe every day.</p>

<h3 class="text-2xl font-bold mb-4">Personal Safety Equipment</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Required PPE for Every Inspection</h4>
  <ul class="list-disc pl-6">
    <li><strong>Slip-resistant shoes:</strong> Cougar Paws or equivalent</li>
    <li><strong>Safety harness:</strong> For slopes over 6/12</li>
    <li><strong>Hard hat:</strong> When workers are above</li>
    <li><strong>Safety glasses:</strong> Always when on roof</li>
    <li><strong>Gloves:</strong> For handling materials</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">When NOT to Inspect</h3>
<div class="bg-yellow-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Automatic No-Go Conditions</h4>
  <ul class="list-disc pl-6">
    <li>Wet or icy conditions</li>
    <li>Wind over 25 mph</li>
    <li>Lightning within 10 miles</li>
    <li>Extreme heat (roof over 140°F)</li>
    <li>Structural instability suspected</li>
  </ul>
  <p class="bg-white p-3 rounded mt-4"><strong>Remember:</strong> "We can always come back. We can't undo an accident."</p>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Warranties & Service Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-warranties',
        title: 'Understanding Warranty Types',
        content: `<h2>Warranty Education: Your Competitive Edge</h2>
<p class="text-lg mb-6">Most customers don't understand warranties. Educate them properly and our 50-year warranty sells itself.</p>

<h3 class="text-2xl font-bold mb-4">Types of Roofing Warranties</h3>
<div class="warranty-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Manufacturer's Material Warranty</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Covers defects in shingles</li>
      <li>Usually 25-50 years</li>
      <li>Often prorated after 10 years</li>
      <li>Doesn't cover installation</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>The Problem:</strong> "If installation fails, you're not covered."</p>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Workmanship Warranty</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Covers installation errors</li>
      <li>Usually 1-10 years</li>
      <li>Varies by contractor</li>
      <li>Critical for protection</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>The Problem:</strong> "Most contractors only offer 1-2 years."</p>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">BRN's 50-Year Full Warranty</h4>
    <ul class="list-disc pl-6 mb-3">
      <li>Covers materials AND workmanship</li>
      <li>Non-prorated for 50 years</li>
      <li>Transferable to new owners</li>
      <li>Backed by CertainTeed</li>
    </ul>
    <p class="bg-white p-3 rounded"><strong>The Advantage:</strong> "Complete protection for half a century."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-warranties',
        title: 'Warranty Claims Process',
        content: `<h2>Handling Warranty Claims Professionally</h2>
<p class="text-lg mb-6">How we handle claims defines our reputation. Master this process to turn problems into testimonials.</p>

<h3 class="text-2xl font-bold mb-4">The Claim Response System</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">24-Hour Response Protocol</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Initial Contact:</strong> Respond within 2 hours</li>
    <li><strong>Schedule Inspection:</strong> Within 48 hours</li>
    <li><strong>Document Everything:</strong> Photos, notes, customer concerns</li>
    <li><strong>Determine Coverage:</strong> Is it warranty or wear?</li>
    <li><strong>Communicate Decision:</strong> Clear, honest, documented</li>
    <li><strong>Execute Repair:</strong> Within 7 days for covered items</li>
    <li><strong>Follow Up:</strong> Ensure satisfaction</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 18
      },
      {
        moduleId: 'res-warranties',
        title: 'Maintenance Programs',
        content: `<h2>Protecting Their Investment</h2>
<p class="text-lg mb-6">Regular maintenance extends roof life and generates recurring revenue. Win-win!</p>

<h3 class="text-2xl font-bold mb-4">BRN Maintenance Program</h3>
<div class="bg-green-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Annual Inspection Package</h4>
  <ul class="list-disc pl-6 mb-4">
    <li>Spring and fall inspections</li>
    <li>Gutter cleaning</li>
    <li>Minor repair coverage</li>
    <li>Priority emergency service</li>
    <li>10% discount on major repairs</li>
  </ul>
  <p class="bg-white p-3 rounded"><strong>Price:</strong> $299/year<br/>
  <strong>Value:</strong> $500+ in services<br/>
  <strong>Close Rate:</strong> 65% of new roof customers</p>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 15
      }
    ]).returning();
    
    // Customer Experience Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-customer-service',
        title: 'Creating Raving Fans',
        content: `<h2>Beyond Satisfaction: Creating Advocates</h2>
<p class="text-lg mb-6">Satisfied customers buy once. Raving fans bring you their entire neighborhood.</p>

<h3 class="text-2xl font-bold mb-4">The Customer Journey</h3>
<div class="journey-map bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Every Touchpoint Matters</h4>
  <div class="space-y-3">
    <div class="bg-white p-3 rounded">
      <p class="font-bold">First Contact:</p>
      <p>Answer within 3 rings, smile in your voice</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Appointment Setting:</p>
      <p>Confirm twice, text reminder</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Arrival:</p>
      <p>On time, clean truck, professional appearance</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">During Service:</p>
      <p>Protect property, communicate progress</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Completion:</p>
      <p>Thorough cleanup, final walkthrough</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Follow-up:</p>
      <p>Thank you card, check-in calls</p>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 22
      },
      {
        moduleId: 'res-customer-service',
        title: 'Communication Excellence',
        content: `<h2>Master the Art of Customer Communication</h2>
<p class="text-lg mb-6">How you say something matters as much as what you say. Perfect your communication for better relationships.</p>

<h3 class="text-2xl font-bold mb-4">The CLEAR Communication Method</h3>
<div class="clear-method space-y-4">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">C - Clear Language</h5>
    <p>Avoid jargon, explain technical terms simply</p>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">L - Listen Actively</h5>
    <p>Hear their concerns, repeat back to confirm</p>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">E - Empathize First</h5>
    <p>Acknowledge their feelings before solving</p>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">A - Answer Completely</h5>
    <p>Address all concerns, don't leave doubts</p>
  </div>
  
  <div class="bg-yellow-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">R - Reinforce Next Steps</h5>
    <p>Clear expectations about what happens next</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-customer-service',
        title: 'Handling Difficult Situations',
        content: `<h2>Turning Challenges into Opportunities</h2>
<p class="text-lg mb-6">How you handle problems defines your character. Master these situations to build unshakeable trust.</p>

<h3 class="text-2xl font-bold mb-4">Common Difficult Situations</h3>
<div class="situations space-y-4">
  <div class="bg-red-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">The Angry Customer</h4>
    <p class="mb-3"><strong>Situation:</strong> "You damaged my garden!"</p>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <ol class="list-decimal pl-6">
        <li>Stay calm, lower your voice</li>
        <li>"I understand you're upset. Let me see what happened."</li>
        <li>Document the issue thoroughly</li>
        <li>Take responsibility: "This shouldn't have happened."</li>
        <li>Offer solution: "Here's how we'll make this right..."</li>
        <li>Follow through immediately</li>
      </ol>
    </div>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">The Skeptical Spouse</h4>
    <p class="mb-3"><strong>Situation:</strong> One spouse is sold, the other is resistant</p>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Approach:</p>
      <ul class="list-disc pl-6">
        <li>Acknowledge both perspectives</li>
        <li>Focus on the skeptical party</li>
        <li>Ask about their specific concerns</li>
        <li>Provide proof, not promises</li>
        <li>Suggest: "What would make you comfortable moving forward?"</li>
      </ul>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-customer-service',
        title: 'Building Long-term Relationships',
        content: `<h2>From Customer to Family Friend</h2>
<p class="text-lg mb-6">The goal isn't just a sale - it's a relationship that generates referrals for years.</p>

<h3 class="text-2xl font-bold mb-4">The Relationship Timeline</h3>
<div class="timeline bg-blue-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Year-Round Touch Points</h4>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Month 1:</strong> Thank you card with team photo</li>
    <li><strong>Month 3:</strong> "How's everything?" call</li>
    <li><strong>Month 6:</strong> Seasonal maintenance reminder</li>
    <li><strong>Month 12:</strong> Anniversary card</li>
    <li><strong>Ongoing:</strong> Birthday cards, holiday greetings</li>
    <li><strong>Storm events:</strong> Immediate check-in</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Production & Quality Module
    await db.insert(lessons).values([
      {
        moduleId: 'res-production',
        title: 'Job Site Management',
        content: `<h2>Running an Efficient Job Site</h2>
<p class="text-lg mb-6">A well-run job site is safer, faster, and more profitable. Master these systems for consistent success.</p>

<h3 class="text-2xl font-bold mb-4">Morning Setup Routine</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">First 30 Minutes on Site</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li>Team huddle - review scope and safety</li>
    <li>Set up safety barriers and signage</li>
    <li>Protect landscaping and property</li>
    <li>Stage materials efficiently</li>
    <li>Assign roles and zones</li>
    <li>Customer greeting and expectations</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Production Standards</h3>
<div class="standards grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Speed Benchmarks</h5>
    <ul class="list-disc pl-6">
      <li>Tear-off: 15 squares/day/crew</li>
      <li>Felt installation: 30 min/10 squares</li>
      <li>Shingle install: 10 squares/day/person</li>
      <li>Ridge cap: 100 LF/hour</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Quality Standards</h5>
    <ul class="list-disc pl-6">
      <li>6 nails per shingle</li>
      <li>Proper nail placement</li>
      <li>Straight lines (±1/4")</li>
      <li>No exposed nails</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 24
      },
      {
        moduleId: 'res-production',
        title: 'Quality Control Systems',
        content: `<h2>Ensuring Excellence on Every Roof</h2>
<p class="text-lg mb-6">Quality isn't an accident - it's a system. Implement these checks to guarantee perfection.</p>

<h3 class="text-2xl font-bold mb-4">The 5-Stage Quality System</h3>
<div class="quality-stages space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Stage 1: Pre-Installation</h4>
    <ul class="list-disc pl-6">
      <li>Verify materials match order</li>
      <li>Check color against sample</li>
      <li>Inspect for shipping damage</li>
      <li>Confirm all accessories present</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Stage 2: Deck Inspection</h4>
    <ul class="list-disc pl-6">
      <li>Foreman walks entire deck</li>
      <li>Mark all repair areas</li>
      <li>Photo documentation</li>
      <li>Customer approval if major</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Stage 3: In-Progress</h4>
    <ul class="list-disc pl-6">
      <li>Check first 3 rows thoroughly</li>
      <li>Verify pattern alignment</li>
      <li>Test nail depth</li>
      <li>Monitor weather conditions</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Stage 4: Final Inspection</h4>
    <ul class="list-disc pl-6">
      <li>Walk entire roof</li>
      <li>Check all flashings</li>
      <li>Verify ridge alignment</li>
      <li>Test all penetrations</li>
    </ul>
  </div>
  
  <div class="bg-yellow-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Stage 5: Customer Sign-off</h4>
    <ul class="list-disc pl-6">
      <li>Complete walkthrough</li>
      <li>Show completed work</li>
      <li>Get written approval</li>
      <li>Schedule follow-up</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 26
      },
      {
        moduleId: 'res-production',
        title: 'Crew Management',
        content: `<h2>Leading High-Performance Teams</h2>
<p class="text-lg mb-6">Great crews don't happen by accident. Learn to build, train, and motivate top performers.</p>

<h3 class="text-2xl font-bold mb-4">Building Team Culture</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The BRN Way</h4>
  <ul class="list-disc pl-6">
    <li><strong>Pride:</strong> "We're craftsmen, not laborers"</li>
    <li><strong>Accountability:</strong> "Your name is on this roof"</li>
    <li><strong>Growth:</strong> "Learn something new every day"</li>
    <li><strong>Recognition:</strong> "Celebrate excellence publicly"</li>
    <li><strong>Fun:</strong> "Enjoy the work and each other"</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Daily Motivation Tactics</h3>
<div class="motivation-tactics grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Morning Energy</h5>
    <ul class="list-disc pl-6">
      <li>Music during setup</li>
      <li>Breakfast provided on big jobs</li>
      <li>Daily goals with rewards</li>
      <li>Rotate leadership roles</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Recognition Systems</h5>
    <ul class="list-disc pl-6">
      <li>Quality badge system</li>
      <li>Speed bonuses</li>
      <li>Customer compliment board</li>
      <li>Monthly awards</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 22
      },
      {
        moduleId: 'res-production',
        title: 'Safety Excellence',
        content: `<h2>Creating a Culture of Safety</h2>
<p class="text-lg mb-6">Safety isn't just rules - it's caring about your team getting home to their families every night.</p>

<h3 class="text-2xl font-bold mb-4">The Fatal Four in Roofing</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Prevent These at All Costs</h4>
  <div class="space-y-3">
    <div class="bg-white p-3 rounded">
      <p class="font-bold">1. Falls (33% of deaths)</p>
      <p>Prevention: Proper equipment, 100% tie-off over 6 feet</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">2. Electrocution (8.5% of deaths)</p>
      <p>Prevention: Locate all wires, maintain 10-foot clearance</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">3. Struck by Object (8.2% of deaths)</p>
      <p>Prevention: Hard hats, secure all materials</p>
    </div>
    <div class="bg-white p-3 rounded">
      <p class="font-bold">4. Caught Between (1.4% of deaths)</p>
      <p>Prevention: Proper ladder placement, equipment guards</p>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-production',
        title: 'Efficiency and Profitability',
        content: `<h2>Maximizing Profit Through Efficiency</h2>
<p class="text-lg mb-6">Speed without quality is worthless. Quality without speed is unprofitable. Master both for success.</p>

<h3 class="text-2xl font-bold mb-4">Time Wasters to Eliminate</h3>
<div class="bg-yellow-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Profit Killers</h4>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Poor staging:</strong> Costs 30 min/day</li>
    <li><strong>Multiple trips:</strong> Costs 1 hour/occurrence</li>
    <li><strong>Redo work:</strong> Costs 2x original time</li>
    <li><strong>Weather delays:</strong> Check forecasts!</li>
    <li><strong>Wrong materials:</strong> Verify before leaving shop</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Efficiency Improvements</h3>
<div class="improvements grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Quick Wins</h5>
    <ul class="list-disc pl-6">
      <li>Pre-load nail guns</li>
      <li>Assembly line tear-off</li>
      <li>Zone assignments</li>
      <li>Tool belts for everyone</li>
    </ul>
  </div>
  
  <div class="bg-blue-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Game Changers</h5>
    <ul class="list-disc pl-6">
      <li>Conveyor systems</li>
      <li>Dump trailer positioning</li>
      <li>Power ladder hoists</li>
      <li>Team specialization</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 5,
        estimatedMinutes: 25
      }
    ]).returning();
    
    // Commercial Roofing Modules
    await db.insert(lessons).values([
      {
        moduleId: 'com-intro',
        title: 'Introduction to Commercial Roofing',
        content: `<h2>Welcome to Commercial Roofing</h2>
<p class="text-lg mb-6">Commercial roofing is a different world from residential - bigger projects, longer sales cycles, but much larger profits.</p>

<h3 class="text-2xl font-bold mb-4">Commercial vs. Residential</h3>
<div class="comparison grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Residential</h4>
    <ul class="list-disc pl-6">
      <li>Steep slopes (4/12+)</li>
      <li>Shingle systems</li>
      <li>1-3 day projects</li>
      <li>$10-30K average</li>
      <li>Homeowner decisions</li>
      <li>Emotion-driven sales</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Commercial</h4>
    <ul class="list-disc pl-6">
      <li>Low slopes (1/4:12-3:12)</li>
      <li>Membrane systems</li>
      <li>1-8 week projects</li>
      <li>$50K-1M+ average</li>
      <li>Committee decisions</li>
      <li>ROI-driven sales</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Market Opportunity</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Why Commercial?</h4>
  <ul class="list-disc pl-6 mb-4">
    <li>$8 billion annual market</li>
    <li>Less competition than residential</li>
    <li>Recurring maintenance contracts</li>
    <li>Larger profit margins (25-40%)</li>
    <li>Professional relationships</li>
    <li>Predictable workflow</li>
  </ul>
  <p class="bg-white p-3 rounded"><strong>Key Stat:</strong> One commercial project can equal 20-50 residential roofs in revenue.</p>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-intro',
        title: 'Commercial Building Types',
        content: `<h2>Understanding Commercial Properties</h2>
<p class="text-lg mb-6">Each building type has unique needs and decision makers. Know your target to win the project.</p>

<h3 class="text-2xl font-bold mb-4">Property Categories</h3>
<div class="property-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Office Buildings</h4>
    <ul class="list-disc pl-6 mb-3">
      <li><strong>Decision Maker:</strong> Property manager/owner</li>
      <li><strong>Key Concerns:</strong> Minimal disruption, appearance</li>
      <li><strong>Best Systems:</strong> TPO, PVC for energy efficiency</li>
      <li><strong>Sales Tip:</strong> Emphasize quiet installation, energy savings</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Retail Centers</h4>
    <ul class="list-disc pl-6 mb-3">
      <li><strong>Decision Maker:</strong> Property management company</li>
      <li><strong>Key Concerns:</strong> No business interruption</li>
      <li><strong>Best Systems:</strong> Modified bitumen, TPO</li>
      <li><strong>Sales Tip:</strong> Night/weekend work capabilities</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Industrial/Warehouse</h4>
    <ul class="list-disc pl-6 mb-3">
      <li><strong>Decision Maker:</strong> Facility manager</li>
      <li><strong>Key Concerns:</strong> Durability, maintenance</li>
      <li><strong>Best Systems:</strong> Metal, modified, built-up</li>
      <li><strong>Sales Tip:</strong> Focus on longevity and warranty</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Multi-Family</h4>
    <ul class="list-disc pl-6 mb-3">
      <li><strong>Decision Maker:</strong> HOA board/management</li>
      <li><strong>Key Concerns:</strong> Resident satisfaction, budget</li>
      <li><strong>Best Systems:</strong> Shingles, modified on low slopes</li>
      <li><strong>Sales Tip:</strong> Phasing options, resident communication</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'com-intro',
        title: 'Commercial Sales Process',
        content: `<h2>Navigating Complex Commercial Sales</h2>
<p class="text-lg mb-6">Commercial sales require patience, professionalism, and persistence. Master the long game.</p>

<h3 class="text-2xl font-bold mb-4">The Commercial Sales Cycle</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Typical Timeline: 3-12 Months</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Initial Contact:</strong> Cold call/referral/RFP</li>
    <li><strong>Qualification:</strong> Decision maker, budget, timeline</li>
    <li><strong>Site Survey:</strong> Detailed inspection and measurements</li>
    <li><strong>Proposal Development:</strong> Multiple options/phases</li>
    <li><strong>Presentation:</strong> Often to committee</li>
    <li><strong>Negotiation:</strong> Scope, terms, pricing</li>
    <li><strong>Contract:</strong> Legal review, insurance requirements</li>
    <li><strong>Project Execution:</strong> Ongoing communication</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Key Success Factors</h3>
<div class="success-factors grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Relationship Building</h5>
    <ul class="list-disc pl-6">
      <li>Multiple touchpoints</li>
      <li>Understand their business</li>
      <li>Solve problems, don't sell</li>
      <li>Long-term partnership focus</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Professional Presentation</h5>
    <ul class="list-disc pl-6">
      <li>Detailed written proposals</li>
      <li>Professional appearance</li>
      <li>Technical competence</li>
      <li>References ready</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 25
      },
      {
        moduleId: 'com-intro',
        title: 'Commercial Roofing Economics',
        content: `<h2>Understanding the Numbers</h2>
<p class="text-lg mb-6">Commercial roofing is about ROI, lifecycle costs, and financial planning. Speak their language.</p>

<h3 class="text-2xl font-bold mb-4">Lifecycle Cost Analysis</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">20-Year Cost Comparison</h4>
  <table class="w-full bg-white rounded">
    <thead>
      <tr class="border-b">
        <th class="p-2 text-left">System</th>
        <th class="p-2">Initial Cost</th>
        <th class="p-2">Maintenance</th>
        <th class="p-2">Energy</th>
        <th class="p-2">Total</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b">
        <td class="p-2">Built-Up</td>
        <td class="p-2 text-center">$5.50/ft²</td>
        <td class="p-2 text-center">$2.00/ft²</td>
        <td class="p-2 text-center">$3.00/ft²</td>
        <td class="p-2 text-center font-bold">$10.50/ft²</td>
      </tr>
      <tr class="border-b">
        <td class="p-2">TPO</td>
        <td class="p-2 text-center">$7.50/ft²</td>
        <td class="p-2 text-center">$1.00/ft²</td>
        <td class="p-2 text-center">$1.50/ft²</td>
        <td class="p-2 text-center font-bold">$10.00/ft²</td>
      </tr>
      <tr>
        <td class="p-2">Metal</td>
        <td class="p-2 text-center">$12.00/ft²</td>
        <td class="p-2 text-center">$0.50/ft²</td>
        <td class="p-2 text-center">$1.00/ft²</td>
        <td class="p-2 text-center font-bold">$13.50/ft²</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 class="text-2xl font-bold mb-4">Financial Benefits to Emphasize</h3>
<div class="benefits space-y-3">
  <div class="bg-green-50 p-4 rounded">
    <p class="font-bold">Tax Benefits</p>
    <p>Section 179 deduction for energy-efficient systems</p>
  </div>
  
  <div class="bg-blue-50 p-4 rounded">
    <p class="font-bold">Utility Rebates</p>
    <p>Many utilities offer rebates for cool roof installations</p>
  </div>
  
  <div class="bg-orange-50 p-4 rounded">
    <p class="font-bold">Insurance Savings</p>
    <p>Impact-resistant systems reduce premiums 15-25%</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Continue with more modules...
    console.log('All remaining lessons seeded successfully!');
    
    // Add quiz questions for the new modules
    await db.insert(quizQuestions).values([
      // Materials & Installation Quiz
      {
        moduleId: 'res-materials',
        question: 'What is the minimum number of nails required per shingle?',
        options: JSON.stringify(['4 nails', '5 nails', '6 nails', '8 nails']),
        correctAnswer: 2,
        explanation: 'BRN standard requires 6 nails per shingle for maximum wind resistance and warranty compliance.'
      },
      {
        moduleId: 'res-materials',
        question: 'Which CertainTeed product line offers lifetime warranty?',
        options: JSON.stringify(['Landmark', 'Landmark PRO', 'XT-25', 'All of them']),
        correctAnswer: 1,
        explanation: 'Landmark PRO offers lifetime warranty with enhanced features like Class 4 impact rating.'
      },
      
      // Sales Excellence Quiz
      {
        moduleId: 'res-sales-process',
        question: 'What does the "I" stand for in the INSPECT sales method?',
        options: JSON.stringify(['Inspection', 'Introduction & Rapport', 'Investment', 'Information']),
        correctAnswer: 1,
        explanation: 'The "I" in INSPECT stands for Introduction & Rapport - the crucial first step in building trust.'
      },
      {
        moduleId: 'res-sales-process',
        question: 'What is the most common objection in roofing sales?',
        options: JSON.stringify(['Need to think about it', 'Price is too high', 'Need other quotes', 'Bad timing']),
        correctAnswer: 1,
        explanation: '"The price is too high" usually means they don\'t see the value yet - focus on building value, not dropping price.'
      },
      
      // Commercial Roofing Quiz
      {
        moduleId: 'com-intro',
        question: 'What is the typical commercial sales cycle length?',
        options: JSON.stringify(['1-2 weeks', '1-2 months', '3-12 months', '12-24 months']),
        correctAnswer: 2,
        explanation: 'Commercial sales typically take 3-12 months due to committee decisions, budgeting cycles, and complex approval processes.'
      },
      {
        moduleId: 'com-intro',
        question: 'Which roofing system is best for energy efficiency in office buildings?',
        options: JSON.stringify(['Built-up roofing', 'TPO or PVC', 'Modified bitumen', 'EPDM']),
        correctAnswer: 1,
        explanation: 'TPO and PVC white membranes offer the best energy efficiency with their reflective properties, reducing cooling costs.'
      }
    ]).returning();
    
    console.log('Quiz questions added for new modules.');
    
  } catch (error) {
    console.error('Error seeding remaining lessons:', error);
    throw error;
  }
}

// Run the seed function
seedRemainingLessons().catch(console.error);