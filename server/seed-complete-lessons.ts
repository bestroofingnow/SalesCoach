import { db } from './db';
import { lessons, quizQuestions } from '@shared/schema';

async function seedCompleteLessons() {
  console.log('Starting to seed complete lessons including cold calling content...');
  
  try {
    // First, add lessons for Commercial Systems module
    await db.insert(lessons).values([
      {
        moduleId: 'com-systems',
        title: 'TPO Roofing Systems',
        content: `<h2>Thermoplastic Polyolefin (TPO) Mastery</h2>
<p class="text-lg mb-6">TPO is the fastest-growing commercial roofing system. Master its installation and benefits to dominate the market.</p>

<h3 class="text-2xl font-bold mb-4">What is TPO?</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Technical Overview</h4>
  <ul class="list-disc pl-6">
    <li>Single-ply thermoplastic membrane</li>
    <li>White, tan, or gray colors</li>
    <li>Heat-welded seams</li>
    <li>45-80 mil thickness options</li>
    <li>Energy Star rated</li>
    <li>15-30 year warranties</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">TPO Benefits</h3>
<div class="benefits grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Performance Benefits</h5>
    <ul class="list-disc pl-6">
      <li>Superior energy efficiency</li>
      <li>Chemical resistance</li>
      <li>Puncture resistance</li>
      <li>UV resistance</li>
      <li>Flexible in cold weather</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Installation Benefits</h5>
    <ul class="list-disc pl-6">
      <li>Lightweight system</li>
      <li>Wide sheet sizes</li>
      <li>Fast installation</li>
      <li>Hot-air welded seams</li>
      <li>No toxic fumes</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-systems',
        title: 'EPDM Rubber Roofing',
        content: `<h2>EPDM: The Proven Performer</h2>
<p class="text-lg mb-6">EPDM has protected buildings for over 60 years. Learn why it's still a top choice for many applications.</p>

<h3 class="text-2xl font-bold mb-4">Understanding EPDM</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">System Characteristics</h4>
  <ul class="list-disc pl-6">
    <li>Ethylene Propylene Diene Monomer</li>
    <li>Black or white membrane</li>
    <li>45, 60, or 90 mil thickness</li>
    <li>Fully adhered, mechanically attached, or ballasted</li>
    <li>Seams sealed with tape or adhesive</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">When to Recommend EPDM</h3>
<div class="bg-blue-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Ideal Applications</h4>
  <ul class="list-disc pl-6">
    <li>Budget-conscious projects</li>
    <li>Buildings with many penetrations</li>
    <li>Irregular roof shapes</li>
    <li>Restoration over existing roofs</li>
    <li>Cold climate installations</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 18
      },
      {
        moduleId: 'com-systems',
        title: 'Modified Bitumen Systems',
        content: `<h2>Modified Bitumen: The Versatile Solution</h2>
<p class="text-lg mb-6">Modified bitumen combines the best of built-up roofing with modern polymer technology.</p>

<h3 class="text-2xl font-bold mb-4">System Types</h3>
<div class="types space-y-4">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">SBS Modified</h4>
    <ul class="list-disc pl-6">
      <li>Styrene-Butadiene-Styrene</li>
      <li>Rubber-like flexibility</li>
      <li>Cold weather performance</li>
      <li>Self-adhered or torch applied</li>
      <li>Excellent elongation</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">APP Modified</h4>
    <ul class="list-disc pl-6">
      <li>Atactic Polypropylene</li>
      <li>Plastic-like durability</li>
      <li>High temperature resistance</li>
      <li>Torch applied only</li>
      <li>UV stability</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 22
      },
      {
        moduleId: 'com-systems',
        title: 'Metal Roofing Systems',
        content: `<h2>Commercial Metal Roofing Excellence</h2>
<p class="text-lg mb-6">Metal roofing offers unmatched longevity and versatility for commercial applications.</p>

<h3 class="text-2xl font-bold mb-4">Types of Metal Systems</h3>
<div class="metal-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Standing Seam</h4>
    <ul class="list-disc pl-6">
      <li>Concealed fastener system</li>
      <li>Vertical seams above water line</li>
      <li>Allows thermal movement</li>
      <li>50+ year life expectancy</li>
      <li>Ideal for slopes 3:12 and up</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">R-Panel/Exposed Fastener</h4>
    <ul class="list-disc pl-6">
      <li>Economical option</li>
      <li>Through-fastened system</li>
      <li>Good for steep slopes</li>
      <li>25-40 year life</li>
      <li>Agricultural and industrial use</li>
    </ul>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Metal Roof Coatings</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-xl font-bold mb-3">Restoration Options</h4>
  <ul class="list-disc pl-6">
    <li>Silicone coatings for ponding water</li>
    <li>Acrylic for UV protection</li>
    <li>Aluminum coatings for rust prevention</li>
    <li>10-20 year renewable warranties</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Flat Roof Fundamentals Module
    await db.insert(lessons).values([
      {
        moduleId: 'com-flat-roofs',
        title: 'Understanding Flat Roof Design',
        content: `<h2>The Science of Flat Roofs</h2>
<p class="text-lg mb-6">Flat roofs aren't actually flat - understanding proper design is critical for success.</p>

<h3 class="text-2xl font-bold mb-4">Flat Roof Basics</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Key Design Principles</h4>
  <ul class="list-disc pl-6">
    <li>Minimum slope: 1/4" per foot</li>
    <li>Positive drainage within 48 hours</li>
    <li>Account for structural deflection</li>
    <li>Multiple drain redundancy</li>
    <li>Overflow scuppers required</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Common Flat Roof Problems</h3>
<div class="problems grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-red-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Ponding Water</h5>
    <ul class="list-disc pl-6">
      <li>Accelerates membrane aging</li>
      <li>Causes structural stress</li>
      <li>Voids most warranties</li>
      <li>Creates leak potential</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Poor Drainage</h5>
    <ul class="list-disc pl-6">
      <li>Clogged drains</li>
      <li>Insufficient slope</li>
      <li>Structural settling</li>
      <li>Inadequate scuppers</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-flat-roofs',
        title: 'Drainage Systems',
        content: `<h2>Mastering Flat Roof Drainage</h2>
<p class="text-lg mb-6">Proper drainage is the difference between a 10-year roof and a 30-year roof.</p>

<h3 class="text-2xl font-bold mb-4">Types of Drainage Systems</h3>
<div class="drainage-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Internal Drains</h4>
    <ul class="list-disc pl-6">
      <li>Most common on large roofs</li>
      <li>Requires tapered insulation</li>
      <li>4" minimum drain size</li>
      <li>One drain per 10,000 sq ft</li>
      <li>Strainer baskets essential</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Scuppers</h4>
    <ul class="list-disc pl-6">
      <li>Through-wall openings</li>
      <li>Primary or overflow use</li>
      <li>6" x 8" minimum size</li>
      <li>Bottom at water line</li>
      <li>Conductor heads recommended</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Gutters</h4>
    <ul class="list-disc pl-6">
      <li>Edge drainage system</li>
      <li>Good for smaller roofs</li>
      <li>Requires regular maintenance</li>
      <li>Box or half-round styles</li>
      <li>Size based on rainfall</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'com-flat-roofs',
        title: 'Insulation and Energy Efficiency',
        content: `<h2>Maximizing Energy Performance</h2>
<p class="text-lg mb-6">Proper insulation design saves energy, prevents condensation, and extends roof life.</p>

<h3 class="text-2xl font-bold mb-4">Insulation Types</h3>
<div class="insulation-types grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Polyisocyanurate (ISO)</h5>
    <ul class="list-disc pl-6">
      <li>Highest R-value per inch</li>
      <li>R-5.6 to R-6 per inch</li>
      <li>Lightweight</li>
      <li>Fire resistant</li>
      <li>Most popular choice</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">XPS/EPS</h5>
    <ul class="list-disc pl-6">
      <li>Moisture resistant</li>
      <li>R-4 to R-5 per inch</li>
      <li>Good for wet areas</li>
      <li>Tapered systems available</li>
      <li>Recyclable</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Commercial Inspections Module
    await db.insert(lessons).values([
      {
        moduleId: 'com-inspection',
        title: 'Commercial Roof Assessment',
        content: `<h2>Professional Commercial Inspections</h2>
<p class="text-lg mb-6">Commercial inspections require different skills and tools than residential. Master the process.</p>

<h3 class="text-2xl font-bold mb-4">Pre-Inspection Planning</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Essential Information to Gather</h4>
  <ul class="list-disc pl-6">
    <li>Building use and occupancy</li>
    <li>Roof access points</li>
    <li>Safety requirements</li>
    <li>Current roof system type</li>
    <li>Previous repair history</li>
    <li>Warranty status</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Commercial Inspection Tools</h3>
<div class="tools grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Essential Equipment</h5>
    <ul class="list-disc pl-6">
      <li>Infrared camera</li>
      <li>Moisture meter</li>
      <li>Core cutter</li>
      <li>Seam probe</li>
      <li>Measuring wheel</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Documentation Tools</h5>
    <ul class="list-disc pl-6">
      <li>Tablet with roof app</li>
      <li>HD camera</li>
      <li>Drone for large roofs</li>
      <li>CAD software</li>
      <li>Report templates</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 24
      },
      {
        moduleId: 'com-inspection',
        title: 'Moisture Detection Techniques',
        content: `<h2>Finding Hidden Moisture</h2>
<p class="text-lg mb-6">Moisture is the enemy of flat roofs. Learn advanced detection techniques to find problems early.</p>

<h3 class="text-2xl font-bold mb-4">Moisture Detection Methods</h3>
<div class="methods space-y-4">
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Infrared Thermography</h4>
    <ul class="list-disc pl-6">
      <li>Best performed at night</li>
      <li>Shows temperature differentials</li>
      <li>Wet insulation retains heat</li>
      <li>Non-destructive testing</li>
      <li>Large area coverage</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Pro Tip:</strong> Perform IR scans 2-4 hours after sunset for best results.</p>
  </div>
  
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Electronic Field Vector Mapping</h4>
    <ul class="list-disc pl-6">
      <li>Pinpoints breach locations</li>
      <li>Works on wet roofs</li>
      <li>Extremely accurate</li>
      <li>Best for new construction</li>
      <li>Creates electrical field</li>
    </ul>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Nuclear Moisture Testing</h4>
    <ul class="list-disc pl-6">
      <li>Measures hydrogen atoms</li>
      <li>Quantifies moisture content</li>
      <li>Works through membranes</li>
      <li>Grid pattern testing</li>
      <li>Industry standard</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 26
      },
      {
        moduleId: 'com-inspection',
        title: 'Creating Professional Reports',
        content: `<h2>Commercial Inspection Reporting</h2>
<p class="text-lg mb-6">Your report sells the job. Make it professional, comprehensive, and compelling.</p>

<h3 class="text-2xl font-bold mb-4">Report Components</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Essential Sections</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Executive Summary</strong> - One-page overview for decision makers</li>
    <li><strong>Roof Overview</strong> - System type, age, size, general condition</li>
    <li><strong>Findings</strong> - Detailed issues with photos and locations</li>
    <li><strong>Moisture Survey</strong> - Results with thermal images</li>
    <li><strong>Recommendations</strong> - Prioritized repair/replacement options</li>
    <li><strong>Cost Analysis</strong> - Budget estimates with alternatives</li>
    <li><strong>Appendices</strong> - Technical data, warranties, specs</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 22
      }
    ]).returning();
    
    // Commercial Services Module
    await db.insert(lessons).values([
      {
        moduleId: 'com-services',
        title: 'Preventive Maintenance Programs',
        content: `<h2>Building Recurring Revenue</h2>
<p class="text-lg mb-6">Maintenance programs provide steady income while extending roof life. Win-win for everyone.</p>

<h3 class="text-2xl font-bold mb-4">Maintenance Program Structure</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Typical Service Levels</h4>
  <div class="space-y-3">
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Basic (2 visits/year)</p>
      <ul class="list-disc pl-6">
        <li>Spring and fall inspections</li>
        <li>Drain cleaning</li>
        <li>Minor repair coverage ($500)</li>
        <li>Detailed reports</li>
      </ul>
    </div>
    
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Standard (4 visits/year)</p>
      <ul class="list-disc pl-6">
        <li>Quarterly inspections</li>
        <li>All basic services</li>
        <li>Repair coverage ($1,500)</li>
        <li>Priority emergency response</li>
      </ul>
    </div>
    
    <div class="bg-white p-3 rounded">
      <p class="font-bold">Premium (6+ visits/year)</p>
      <ul class="list-disc pl-6">
        <li>Monthly or bi-monthly visits</li>
        <li>Unlimited minor repairs</li>
        <li>Infrared scans included</li>
        <li>Dedicated account manager</li>
      </ul>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-services',
        title: 'Emergency Response Services',
        content: `<h2>24/7 Emergency Response Excellence</h2>
<p class="text-lg mb-6">Emergency services build loyalty and generate high-margin revenue. Be the hero they need.</p>

<h3 class="text-2xl font-bold mb-4">Emergency Response Protocol</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Response Timeline</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>0-15 min:</strong> Answer call, assess severity</li>
    <li><strong>15-30 min:</strong> Dispatch team if critical</li>
    <li><strong>30-120 min:</strong> Arrive on site</li>
    <li><strong>2-4 hours:</strong> Temporary protection in place</li>
    <li><strong>24-48 hours:</strong> Permanent repair plan</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Emergency Equipment</h3>
<div class="equipment grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Temporary Repairs</h5>
    <ul class="list-disc pl-6">
      <li>Tarps (various sizes)</li>
      <li>Sandbags</li>
      <li>Mastic and mesh</li>
      <li>Caulking/sealants</li>
      <li>Plywood sheets</li>
    </ul>
  </div>
  
  <div class="bg-yellow-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Water Mitigation</h5>
    <ul class="list-disc pl-6">
      <li>Wet/dry vacuums</li>
      <li>Squeegees</li>
      <li>Pumps</li>
      <li>Fans/dehumidifiers</li>
      <li>Plastic sheeting</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'com-services',
        title: 'Roof Restoration Services',
        content: `<h2>Restoration: The Profitable Alternative</h2>
<p class="text-lg mb-6">Roof restoration can extend life 10-20 years at 50% the cost of replacement. Master this lucrative service.</p>

<h3 class="text-2xl font-bold mb-4">Restoration vs. Replacement</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">When to Restore</h4>
  <ul class="list-disc pl-6">
    <li>Roof is structurally sound</li>
    <li>Less than 25% moisture saturation</li>
    <li>Good drainage exists</li>
    <li>Seams are intact</li>
    <li>10+ years of life potential</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Coating Systems</h3>
<div class="coatings space-y-4">
  <div class="bg-blue-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Silicone Coatings</h5>
    <ul class="list-disc pl-6">
      <li>Best for ponding water</li>
      <li>50-70 mils thickness</li>
      <li>Excellent UV resistance</li>
      <li>10-20 year warranties</li>
    </ul>
  </div>
  
  <div class="bg-purple-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Acrylic Coatings</h5>
    <ul class="list-disc pl-6">
      <li>Most economical option</li>
      <li>Good reflectivity</li>
      <li>Easy to apply</li>
      <li>5-10 year warranties</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Commercial Project Management Module
    await db.insert(lessons).values([
      {
        moduleId: 'com-project-mgmt',
        title: 'Project Planning and Scheduling',
        content: `<h2>Commercial Project Management Excellence</h2>
<p class="text-lg mb-6">Large commercial projects require military-level planning and execution. Master the process.</p>

<h3 class="text-2xl font-bold mb-4">Pre-Project Planning</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Critical Planning Steps</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Site Survey:</strong> Access, staging, safety concerns</li>
    <li><strong>Material Planning:</strong> Lead times, delivery schedule</li>
    <li><strong>Labor Planning:</strong> Crew size, specialty trades</li>
    <li><strong>Equipment Needs:</strong> Cranes, hoists, safety gear</li>
    <li><strong>Permit Requirements:</strong> Building, street closure</li>
    <li><strong>Tenant Coordination:</strong> Minimize disruption</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Project Timeline Development</h3>
<div class="timeline bg-green-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Typical 50,000 sq ft Retrofit</h4>
  <ul class="list-disc pl-6">
    <li><strong>Week 1-2:</strong> Mobilization and tear-off</li>
    <li><strong>Week 3-4:</strong> Deck repairs and insulation</li>
    <li><strong>Week 5-6:</strong> Membrane installation</li>
    <li><strong>Week 7:</strong> Flashings and details</li>
    <li><strong>Week 8:</strong> Cleanup and punch list</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 26
      },
      {
        moduleId: 'com-project-mgmt',
        title: 'Safety Management',
        content: `<h2>Commercial Job Site Safety</h2>
<p class="text-lg mb-6">Commercial projects have unique safety challenges. Zero accidents is the only acceptable goal.</p>

<h3 class="text-2xl font-bold mb-4">Commercial Safety Requirements</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">OSHA Compliance</h4>
  <ul class="list-disc pl-6">
    <li>Written safety program required</li>
    <li>Daily safety briefings documented</li>
    <li>Fall protection plan mandatory</li>
    <li>Competent person on site</li>
    <li>Regular safety audits</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Site-Specific Safety Plans</h3>
<div class="safety-plans grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">High-Rise Safety</h5>
    <ul class="list-disc pl-6">
      <li>Perimeter protection</li>
      <li>Wind monitoring</li>
      <li>Material hoisting plan</li>
      <li>Emergency evacuation</li>
    </ul>
  </div>
  
  <div class="bg-yellow-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Occupied Building Safety</h5>
    <ul class="list-disc pl-6">
      <li>Public protection</li>
      <li>Debris containment</li>
      <li>Noise control</li>
      <li>Air quality management</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 24
      },
      {
        moduleId: 'com-project-mgmt',
        title: 'Quality Control Systems',
        content: `<h2>Ensuring Commercial Quality</h2>
<p class="text-lg mb-6">Quality control on commercial projects requires systematic inspection and documentation.</p>

<h3 class="text-2xl font-bold mb-4">Multi-Stage Inspection Process</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Critical Inspection Points</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Deck Inspection:</strong> Before any new materials</li>
    <li><strong>Vapor Barrier:</strong> Verify installation and sealing</li>
    <li><strong>Insulation:</strong> Check fastening patterns</li>
    <li><strong>Membrane:</strong> Seam strength testing</li>
    <li><strong>Flashings:</strong> Detail work verification</li>
    <li><strong>Final:</strong> Water testing and punch list</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-project-mgmt',
        title: 'Documentation and Closeout',
        content: `<h2>Professional Project Closeout</h2>
<p class="text-lg mb-6">The project isn't complete until the paperwork is done. Master the closeout process.</p>

<h3 class="text-2xl font-bold mb-4">Closeout Documentation</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Required Documents</h4>
  <ul class="list-disc pl-6">
    <li>As-built drawings</li>
    <li>Warranty documentation</li>
    <li>Material data sheets</li>
    <li>Test results and inspections</li>
    <li>Maintenance manual</li>
    <li>Project photos</li>
    <li>Lien waivers</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 4,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Commercial Technology Module
    await db.insert(lessons).values([
      {
        moduleId: 'com-technology',
        title: 'Drone Technology for Commercial Roofs',
        content: `<h2>Advanced Drone Applications</h2>
<p class="text-lg mb-6">Drones revolutionize commercial roof inspections and project management.</p>

<h3 class="text-2xl font-bold mb-4">Commercial Drone Benefits</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Why Drones Excel for Commercial</h4>
  <ul class="list-disc pl-6">
    <li>Access dangerous or difficult areas safely</li>
    <li>Complete roof overview in minutes</li>
    <li>Thermal imaging capabilities</li>
    <li>Progress documentation</li>
    <li>Marketing and sales tools</li>
    <li>Accurate measurements</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Drone Inspection Process</h3>
<div class="process space-y-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Pre-Flight</h5>
    <ul class="list-disc pl-6">
      <li>Check airspace restrictions</li>
      <li>Notify building occupants</li>
      <li>Plan flight pattern</li>
      <li>Set ground control points</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Flight Operations</h5>
    <ul class="list-disc pl-6">
      <li>Systematic grid pattern</li>
      <li>Multiple altitudes</li>
      <li>Overlap for mapping</li>
      <li>Detail shots of issues</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 22
      },
      {
        moduleId: 'com-technology',
        title: 'Roofing Software Solutions',
        content: `<h2>Digital Tools for Commercial Success</h2>
<p class="text-lg mb-6">The right software multiplies your efficiency and professionalism.</p>

<h3 class="text-2xl font-bold mb-4">Essential Software Categories</h3>
<div class="software-types space-y-4">
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Estimation Software</h4>
    <ul class="list-disc pl-6">
      <li><strong>AccuLynx:</strong> Complete business management</li>
      <li><strong>Edge Estimator:</strong> Detailed commercial estimates</li>
      <li><strong>RoofSnap:</strong> Aerial measurement tool</li>
      <li><strong>Xactimate:</strong> Insurance claim pricing</li>
    </ul>
  </div>
  
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Project Management</h4>
    <ul class="list-disc pl-6">
      <li><strong>Procore:</strong> Large project management</li>
      <li><strong>BuilderTREND:</strong> Scheduling and communication</li>
      <li><strong>CoConstruct:</strong> Client portal and selections</li>
      <li><strong>Monday.com:</strong> Team collaboration</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'com-technology',
        title: 'Building Information Modeling (BIM)',
        content: `<h2>The Future of Commercial Roofing</h2>
<p class="text-lg mb-6">BIM technology transforms how we design, build, and maintain commercial roofs.</p>

<h3 class="text-2xl font-bold mb-4">Understanding BIM</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">BIM Benefits</h4>
  <ul class="list-disc pl-6">
    <li>3D visualization of projects</li>
    <li>Clash detection before installation</li>
    <li>Accurate material takeoffs</li>
    <li>Lifecycle management</li>
    <li>Energy modeling</li>
    <li>Maintenance planning</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Now add the Insurance modules
    await db.insert(lessons).values([
      {
        moduleId: 'ins-intro',
        title: 'Introduction to Insurance Restoration',
        content: `<h2>The Insurance Restoration Opportunity</h2>
<p class="text-lg mb-6">Insurance restoration is the most profitable segment of roofing. Master it to transform your income.</p>

<h3 class="text-2xl font-bold mb-4">Why Insurance Restoration?</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Numbers Don't Lie</h4>
  <ul class="list-disc pl-6">
    <li>Average ticket: $15,000-25,000 vs. $8,000 retail</li>
    <li>Close rate: 70% vs. 30% retail</li>
    <li>Sales cycle: 7-14 days vs. months</li>
    <li>Competition: Less price shopping</li>
    <li>Customer satisfaction: Higher (insurance pays)</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">The Insurance Process Overview</h3>
<div class="process-overview space-y-4">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Your Role as Advocate</h4>
    <p class="mb-3">You're not just a roofer - you're the homeowner's advocate against the insurance company.</p>
    <ul class="list-disc pl-6">
      <li>Document damage thoroughly</li>
      <li>Speak the insurance language</li>
      <li>Fight for fair settlements</li>
      <li>Handle the paperwork</li>
      <li>Deliver quality results</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-intro',
        title: 'Understanding Insurance Policies',
        content: `<h2>Decoding Insurance Coverage</h2>
<p class="text-lg mb-6">Know what's covered and what's not to set proper expectations and maximize claims.</p>

<h3 class="text-2xl font-bold mb-4">Types of Homeowners Policies</h3>
<div class="policy-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">RCV - Replacement Cost Value</h4>
    <ul class="list-disc pl-6">
      <li>Pays full replacement cost</li>
      <li>No depreciation penalty</li>
      <li>Two-check process common</li>
      <li>Must complete work for full payment</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Best Case:</strong> Homeowner only pays deductible</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">ACV - Actual Cash Value</h4>
    <ul class="list-disc pl-6">
      <li>Pays depreciated value</li>
      <li>Age of roof matters</li>
      <li>Homeowner pays difference</li>
      <li>Common on older roofs</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Challenge:</strong> May need to educate on upgrade benefits</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'ins-intro',
        title: 'Storm Response Strategy',
        content: `<h2>Capitalizing on Storm Opportunities</h2>
<p class="text-lg mb-6">Storms create urgency and demand. Be ready to respond professionally and ethically.</p>

<h3 class="text-2xl font-bold mb-4">Storm Response Timeline</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">First 72 Hours Are Critical</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>0-24 hours:</strong> Assess storm path and severity</li>
    <li><strong>24-48 hours:</strong> Deploy canvassing teams</li>
    <li><strong>48-72 hours:</strong> Begin inspections</li>
    <li><strong>Week 1:</strong> Heavy appointment setting</li>
    <li><strong>Week 2-4:</strong> Adjuster meetings</li>
    <li><strong>Month 2-6:</strong> Production phase</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Insurance Fundamentals Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-basics',
        title: 'Insurance Terminology Mastery',
        content: `<h2>Speaking the Insurance Language</h2>
<p class="text-lg mb-6">Master insurance terminology to communicate effectively with adjusters and homeowners.</p>

<h3 class="text-2xl font-bold mb-4">Essential Insurance Terms</h3>
<div class="terms-grid space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Coverage Terms</h4>
    <dl class="space-y-2">
      <dt class="font-bold">Deductible:</dt>
      <dd class="pl-4">Amount homeowner pays before insurance kicks in</dd>
      
      <dt class="font-bold">Premium:</dt>
      <dd class="pl-4">Monthly/annual payment for coverage</dd>
      
      <dt class="font-bold">Peril:</dt>
      <dd class="pl-4">Covered cause of loss (wind, hail, etc.)</dd>
      
      <dt class="font-bold">Exclusion:</dt>
      <dd class="pl-4">Damage types not covered</dd>
    </dl>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Claims Terms</h4>
    <dl class="space-y-2">
      <dt class="font-bold">FNOL:</dt>
      <dd class="pl-4">First Notice of Loss - initial claim report</dd>
      
      <dt class="font-bold">Supplement:</dt>
      <dd class="pl-4">Additional payment request for missed items</dd>
      
      <dt class="font-bold">Depreciation:</dt>
      <dd class="pl-4">Reduction in value due to age</dd>
      
      <dt class="font-bold">Overhead & Profit:</dt>
      <dd class="pl-4">10% + 10% for complex projects</dd>
    </dl>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 18
      },
      {
        moduleId: 'ins-basics',
        title: 'Types of Storm Damage',
        content: `<h2>Identifying Insurable Damage</h2>
<p class="text-lg mb-6">Not all damage is covered. Learn to identify and document insurable storm damage.</p>

<h3 class="text-2xl font-bold mb-4">Wind Damage Indicators</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">What to Look For</h4>
  <ul class="list-disc pl-6">
    <li>Missing shingles (complete or partial)</li>
    <li>Lifted or creased shingles</li>
    <li>Exposed nails from wind lift</li>
    <li>Damaged ridge caps</li>
    <li>Compromised flashings</li>
    <li>Gutter damage from wind</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Hail Damage Identification</h3>
<div class="hail-damage grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">On Shingles</h5>
    <ul class="list-disc pl-6">
      <li>Impact marks with granule loss</li>
      <li>Exposed mat</li>
      <li>Circular crack patterns</li>
      <li>Soft spots (bruising)</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Collateral Indicators</h5>
    <ul class="list-disc pl-6">
      <li>Dented gutters/downspouts</li>
      <li>AC unit fin damage</li>
      <li>Mailbox dents</li>
      <li>Siding impacts</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'ins-basics',
        title: 'Insurance Company Relations',
        content: `<h2>Working with Insurance Companies</h2>
<p class="text-lg mb-6">Insurance companies are not the enemy - they're partners when you understand their perspective.</p>

<h3 class="text-2xl font-bold mb-4">Major Insurance Players</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Know Their Tendencies</h4>
  <ul class="list-disc pl-6">
    <li><strong>State Farm:</strong> Largest, often tough on claims</li>
    <li><strong>Allstate:</strong> Quick to settle, fair pricing</li>
    <li><strong>USAA:</strong> Military, very fair, quality focused</li>
    <li><strong>Farmers:</strong> Good on supplements</li>
    <li><strong>Liberty Mutual:</strong> By the book approach</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 20
      }
    ]).returning();
    
    // Storm Damage Assessment Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-damage',
        title: 'Comprehensive Damage Assessment',
        content: `<h2>Professional Storm Damage Inspection</h2>
<p class="text-lg mb-6">Thorough inspection and documentation is the foundation of successful insurance claims.</p>

<h3 class="text-2xl font-bold mb-4">The BRN Inspection Process</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Systematic Approach</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Safety First:</strong> Assess conditions before climbing</li>
    <li><strong>Ground Level:</strong> Document collateral damage</li>
    <li><strong>Test Squares:</strong> 10'x10' detailed inspection</li>
    <li><strong>Full Roof:</strong> Systematic grid pattern</li>
    <li><strong>Documentation:</strong> Photos with markers</li>
    <li><strong>Report Generation:</strong> Professional presentation</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Hail Size and Damage Correlation</h3>
<div class="bg-green-50 p-6 rounded-lg">
  <table class="w-full bg-white rounded">
    <thead>
      <tr class="border-b">
        <th class="p-2 text-left">Hail Size</th>
        <th class="p-2">Diameter</th>
        <th class="p-2">Typical Damage</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b">
        <td class="p-2">Pea</td>
        <td class="p-2 text-center">1/4"</td>
        <td class="p-2">Minimal</td>
      </tr>
      <tr class="border-b">
        <td class="p-2">Dime</td>
        <td class="p-2 text-center">3/4"</td>
        <td class="p-2">Possible damage</td>
      </tr>
      <tr class="border-b">
        <td class="p-2">Quarter</td>
        <td class="p-2 text-center">1"</td>
        <td class="p-2">Likely damage</td>
      </tr>
      <tr>
        <td class="p-2">Golf Ball</td>
        <td class="p-2 text-center">1.75"</td>
        <td class="p-2">Significant damage</td>
      </tr>
    </tbody>
  </table>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 25
      },
      {
        moduleId: 'ins-damage',
        title: 'Documentation Best Practices',
        content: `<h2>Creating Undeniable Documentation</h2>
<p class="text-lg mb-6">Great documentation is the difference between claim approval and denial.</p>

<h3 class="text-2xl font-bold mb-4">Photo Documentation Standards</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Perfect Damage Photo</h4>
  <ul class="list-disc pl-6">
    <li>Use chalk circles to mark damage</li>
    <li>Include measuring tape for scale</li>
    <li>Take photos at consistent angles</li>
    <li>Capture in good lighting</li>
    <li>Multiple angles of same damage</li>
    <li>Wide shots for context</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-damage',
        title: 'Testing and Verification Methods',
        content: `<h2>Scientific Damage Assessment</h2>
<p class="text-lg mb-6">Use these methods to prove damage beyond any doubt.</p>

<h3 class="text-2xl font-bold mb-4">The Brittleness Test</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Testing Shingle Integrity</h4>
  <ol class="list-decimal pl-6">
    <li>Lift shingle tab gently</li>
    <li>Bend to 45-degree angle</li>
    <li>If it cracks = brittle = replace</li>
    <li>Document with photos</li>
    <li>Test multiple locations</li>
  </ol>
  <p class="bg-white p-3 rounded mt-3"><strong>Note:</strong> Brittleness alone may not warrant full replacement but combined with other damage does.</p>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Claims Process Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-process',
        title: 'The Complete Claims Process',
        content: `<h2>Navigating Insurance Claims Start to Finish</h2>
<p class="text-lg mb-6">Master each step of the claims process to ensure smooth, profitable projects.</p>

<h3 class="text-2xl font-bold mb-4">The Claims Timeline</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">From FNOL to Final Payment</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Day 1:</strong> Homeowner files claim (FNOL)</li>
    <li><strong>Day 2-7:</strong> Insurance assigns adjuster</li>
    <li><strong>Day 7-14:</strong> Adjuster inspection</li>
    <li><strong>Day 14-21:</strong> Initial settlement</li>
    <li><strong>Day 21-30:</strong> Supplement if needed</li>
    <li><strong>Day 30-45:</strong> Work completion</li>
    <li><strong>Day 45-60:</strong> Final payment</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Your Role at Each Stage</h3>
<div class="stages space-y-4">
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Before Adjuster Visit</h4>
    <ul class="list-disc pl-6">
      <li>Complete thorough inspection</li>
      <li>Mark all damage clearly</li>
      <li>Prepare documentation package</li>
      <li>Coach homeowner on process</li>
      <li>Be present for inspection</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 26
      },
      {
        moduleId: 'ins-process',
        title: 'Meeting with Adjusters',
        content: `<h2>Adjuster Meeting Success</h2>
<p class="text-lg mb-6">The adjuster meeting determines your project scope and profit. Prepare to win.</p>

<h3 class="text-2xl font-bold mb-4">Pre-Meeting Preparation</h3>
<div class="bg-orange-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Your Success Kit</h4>
  <ul class="list-disc pl-6">
    <li>Ladder for adjuster (be helpful!)</li>
    <li>Chalk and markers</li>
    <li>Measuring tape</li>
    <li>Your inspection report</li>
    <li>Test square damage counts</li>
    <li>Local code requirements</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">During the Meeting</h3>
<div class="bg-purple-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Best Practices</h4>
  <ul class="list-disc pl-6">
    <li>Be professional and friendly</li>
    <li>Let adjuster lead initially</li>
    <li>Point out missed damage respectfully</li>
    <li>Document their findings</li>
    <li>Get agreement before they leave</li>
    <li>Take photos together</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 24
      },
      {
        moduleId: 'ins-process',
        title: 'Supplements and Negotiations',
        content: `<h2>Maximizing Claim Value</h2>
<p class="text-lg mb-6">Initial settlements rarely include everything. Master supplements to ensure fair payment.</p>

<h3 class="text-2xl font-bold mb-4">Common Supplement Items</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Often Missed by Adjusters</h4>
  <ul class="list-disc pl-6">
    <li>Detach and reset (satellites, solar)</li>
    <li>Additional layers tear-off</li>
    <li>Wood decking replacement</li>
    <li>Code upgrades (ice shield, drip edge)</li>
    <li>Steep slope charges</li>
    <li>High roof charges</li>
    <li>Permit and dumpster fees</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 22
      }
    ]).returning();
    
    // Xactimate & Estimating Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-xactimate',
        title: 'Xactimate Fundamentals',
        content: `<h2>Master the Insurance Industry Standard</h2>
<p class="text-lg mb-6">Xactimate is the language of insurance claims. Fluency equals profitability.</p>

<h3 class="text-2xl font-bold mb-4">Understanding Xactimate</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Why Xactimate Matters</h4>
  <ul class="list-disc pl-6">
    <li>Used by 90% of insurance companies</li>
    <li>Standardized pricing database</li>
    <li>Updated monthly for accuracy</li>
    <li>Creates professional estimates</li>
    <li>Speeds claim approval</li>
    <li>Maximizes settlements</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Key Line Items</h3>
<div class="line-items grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-green-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Roofing Items</h5>
    <ul class="list-disc pl-6">
      <li>RFG 240 - Remove comp shingles</li>
      <li>RFG 280 - Install 30yr shingles</li>
      <li>RFG 14 - Ridge cap</li>
      <li>RFG 46 - Drip edge</li>
      <li>RFG 44 - Ice & water shield</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Don't Forget</h5>
    <ul class="list-disc pl-6">
      <li>O&P (Overhead & Profit)</li>
      <li>Steep charges >8/12</li>
      <li>High charges >2 story</li>
      <li>Permit fees</li>
      <li>Dumpster costs</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 28
      },
      {
        moduleId: 'ins-xactimate',
        title: 'Creating Winning Estimates',
        content: `<h2>Building Comprehensive Xactimate Estimates</h2>
<p class="text-lg mb-6">Learn to create estimates that get approved the first time.</p>

<h3 class="text-2xl font-bold mb-4">Estimate Structure</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Professional Organization</h4>
  <ol class="list-decimal pl-6">
    <li><strong>Tear-off:</strong> All removal items</li>
    <li><strong>Dry-in:</strong> Felt, ice shield, underlayment</li>
    <li><strong>Shingles:</strong> Field and accessories</li>
    <li><strong>Flashings:</strong> All metal work</li>
    <li><strong>Ventilation:</strong> Ridge vent, vents</li>
    <li><strong>Cleanup:</strong> Magnetic sweep, disposal</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 24
      },
      {
        moduleId: 'ins-xactimate',
        title: 'Advanced Xactimate Techniques',
        content: `<h2>Pro-Level Xactimate Skills</h2>
<p class="text-lg mb-6">Advanced techniques that separate amateurs from professionals.</p>

<h3 class="text-2xl font-bold mb-4">Sketch Tips</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Accurate Sketching</h4>
  <ul class="list-disc pl-6">
    <li>Use aerial measurements when possible</li>
    <li>Include all roof facets</li>
    <li>Mark all penetrations</li>
    <li>Calculate waste factors correctly</li>
    <li>Use proper slope designations</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 26
      }
    ]).returning();
    
    // Working with Adjusters Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-adjusters',
        title: 'Types of Insurance Adjusters',
        content: `<h2>Know Your Adjuster Types</h2>
<p class="text-lg mb-6">Different adjusters have different motivations. Adapt your approach for success.</p>

<h3 class="text-2xl font-bold mb-4">Adjuster Categories</h3>
<div class="adjuster-types space-y-4">
  <div class="bg-blue-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Staff Adjusters</h4>
    <ul class="list-disc pl-6">
      <li>Direct insurance company employees</li>
      <li>Salary + benefits, not commission</li>
      <li>Often most conservative</li>
      <li>Follow company guidelines strictly</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Approach:</strong> Be very thorough with documentation, know their guidelines</p>
  </div>
  
  <div class="bg-green-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Independent Adjusters</h4>
    <ul class="list-disc pl-6">
      <li>Contract with multiple carriers</li>
      <li>Paid per claim closed</li>
      <li>Want to close claims quickly</li>
      <li>More flexible on scope</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Approach:</strong> Help them close fast with complete scope</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">Public Adjusters</h4>
    <ul class="list-disc pl-6">
      <li>Work for homeowner, not insurance</li>
      <li>Take 10-20% of claim</li>
      <li>Can be allies or obstacles</li>
      <li>Know the system well</li>
    </ul>
    <p class="bg-white p-3 rounded mt-3"><strong>Approach:</strong> Partner when possible, establish boundaries</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 22
      },
      {
        moduleId: 'ins-adjusters',
        title: 'Building Adjuster Relationships',
        content: `<h2>Creating Win-Win Partnerships</h2>
<p class="text-lg mb-6">The best contractors have great relationships with adjusters. Here's how to build them.</p>

<h3 class="text-2xl font-bold mb-4">Relationship Building Strategies</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Be the Contractor They Trust</h4>
  <ul class="list-disc pl-6">
    <li>Always be on time and prepared</li>
    <li>Provide accurate measurements</li>
    <li>Don't inflate damage</li>
    <li>Help them do their job</li>
    <li>Follow up professionally</li>
    <li>Be consistent and reliable</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-adjusters',
        title: 'Negotiation Strategies',
        content: `<h2>Ethical Negotiation Tactics</h2>
<p class="text-lg mb-6">Stand firm for fair settlements without burning bridges.</p>

<h3 class="text-2xl font-bold mb-4">Negotiation Framework</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The WIN Method</h4>
  <ul class="list-disc pl-6">
    <li><strong>W</strong>alk the roof together</li>
    <li><strong>I</strong>dentify all damage collaboratively</li>
    <li><strong>N</strong>egotiate with facts, not emotion</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 24
      }
    ]).returning();
    
    // Documentation & Photos Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-documentation',
        title: 'Professional Photo Documentation',
        content: `<h2>Photos That Win Claims</h2>
<p class="text-lg mb-6">A picture is worth a thousand words - and thousands of dollars in approved claims.</p>

<h3 class="text-2xl font-bold mb-4">Photo Documentation System</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Complete Photo Package</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Overview shots:</strong> All four sides of house</li>
    <li><strong>Roof overview:</strong> Each slope from ground</li>
    <li><strong>Test squares:</strong> 10x10 marked areas</li>
    <li><strong>Close-ups:</strong> Individual damage points</li>
    <li><strong>Collateral:</strong> Gutters, vents, AC units</li>
    <li><strong>Interior:</strong> Any water damage</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-documentation',
        title: 'Creating Compelling Reports',
        content: `<h2>Reports That Get Approved</h2>
<p class="text-lg mb-6">Professional reports build trust and get claims approved faster.</p>

<h3 class="text-2xl font-bold mb-4">Report Structure</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Professional Report Sections</h4>
  <ol class="list-decimal pl-6">
    <li>Cover page with property info</li>
    <li>Damage summary overview</li>
    <li>Detailed findings by area</li>
    <li>Photo documentation</li>
    <li>Repair recommendations</li>
    <li>Cost estimate</li>
  </ol>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 22
      },
      {
        moduleId: 'ins-documentation',
        title: 'Digital Tools and Apps',
        content: `<h2>Technology for Documentation</h2>
<p class="text-lg mb-6">Use technology to create professional documentation efficiently.</p>

<h3 class="text-2xl font-bold mb-4">Essential Apps</h3>
<div class="apps grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="bg-purple-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Documentation Apps</h5>
    <ul class="list-disc pl-6">
      <li>CompanyCam - Photo organization</li>
      <li>Hover - 3D measurements</li>
      <li>Pitch Gauge - Slope measurement</li>
      <li>IMGING - Before/after photos</li>
    </ul>
  </div>
  
  <div class="bg-orange-50 p-4 rounded-lg">
    <h5 class="font-bold mb-2">Reporting Apps</h5>
    <ul class="list-disc pl-6">
      <li>Xactimate mobile</li>
      <li>AccuLynx</li>
      <li>JobNimbus</li>
      <li>Roofr</li>
    </ul>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 18
      }
    ]).returning();
    
    // Homeowner Education Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-homeowner',
        title: 'Educating Homeowners on Insurance',
        content: `<h2>Empowering Homeowners Through Education</h2>
<p class="text-lg mb-6">Educated homeowners make better decisions and become your advocates.</p>

<h3 class="text-2xl font-bold mb-4">Key Education Points</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">What Every Homeowner Should Know</h4>
  <ul class="list-disc pl-6">
    <li>They have the right to choose their contractor</li>
    <li>Insurance covers replacement to pre-storm condition</li>
    <li>Depreciation is recoverable with RCV policies</li>
    <li>Supplements are normal and expected</li>
    <li>Code upgrades are typically covered</li>
    <li>They should never sign over insurance checks</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-homeowner',
        title: 'Managing Homeowner Expectations',
        content: `<h2>Setting Realistic Expectations</h2>
<p class="text-lg mb-6">Clear expectations prevent problems and create happy customers.</p>

<h3 class="text-2xl font-bold mb-4">Timeline Expectations</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Realistic Timeline Communication</h4>
  <ul class="list-disc pl-6">
    <li>Claims process: 2-8 weeks typically</li>
    <li>Material ordering: 1-2 weeks</li>
    <li>Installation: 1-3 days weather permitting</li>
    <li>Final payment: 2-4 weeks after completion</li>
  </ul>
  <p class="bg-white p-3 rounded mt-3"><strong>Key Message:</strong> "We work on insurance timeline, not contractor timeline."</p>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 18
      },
      {
        moduleId: 'ins-homeowner',
        title: 'Common Homeowner Concerns',
        content: `<h2>Addressing Fears and Concerns</h2>
<p class="text-lg mb-6">Anticipate and address common concerns to build trust.</p>

<h3 class="text-2xl font-bold mb-4">Top Homeowner Worries</h3>
<div class="concerns space-y-4">
  <div class="bg-red-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">"Will my rates go up?"</h4>
    <p class="mb-3"><strong>Your Response:</strong></p>
    <p>"Act of God claims like storm damage typically don't raise individual rates. Rates might go up area-wide after major storms, but that happens whether you file a claim or not. Using your insurance for legitimate claims is why you pay for coverage."</p>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">"What if insurance doesn't pay enough?"</h4>
    <p class="mb-3"><strong>Your Response:</strong></p>
    <p>"That's why you work with experienced contractors like us. We know how to properly document damage and submit supplements for any items the adjuster misses. We won't start work until we're confident the insurance settlement will cover the full scope."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 22
      }
    ]).returning();
    
    // Ethics & Compliance Module
    await db.insert(lessons).values([
      {
        moduleId: 'ins-ethics',
        title: 'Ethical Insurance Practices',
        content: `<h2>Building a Reputation of Integrity</h2>
<p class="text-lg mb-6">Ethics aren't just right - they're profitable. Build a business that lasts.</p>

<h3 class="text-2xl font-bold mb-4">BRN Ethical Standards</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Our Non-Negotiables</h4>
  <ul class="list-disc pl-6">
    <li>Never create or exaggerate damage</li>
    <li>Never offer kickbacks or rebates</li>
    <li>Never waive deductibles illegally</li>
    <li>Always document honestly</li>
    <li>Always deliver quality work</li>
    <li>Always honor our warranties</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Why Ethics Matter</h3>
<div class="bg-green-50 p-6 rounded-lg">
  <ul class="list-disc pl-6">
    <li>Builds long-term adjuster relationships</li>
    <li>Generates referrals and repeat business</li>
    <li>Avoids legal problems and fines</li>
    <li>Creates sustainable business growth</li>
    <li>Allows you to sleep at night</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 1,
        estimatedMinutes: 18
      },
      {
        moduleId: 'ins-ethics',
        title: 'Legal Compliance',
        content: `<h2>Staying Legal in Insurance Restoration</h2>
<p class="text-lg mb-6">Know the laws to protect your business and your customers.</p>

<h3 class="text-2xl font-bold mb-4">Key Legal Requirements</h3>
<div class="bg-red-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Never Do These</h4>
  <ul class="list-disc pl-6">
    <li>Waive deductibles without disclosure</li>
    <li>Pay referral fees to adjusters</li>
    <li>Misrepresent damage or scope</li>
    <li>Practice law (interpret policies)</li>
    <li>Forge or alter documents</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 2,
        estimatedMinutes: 20
      },
      {
        moduleId: 'ins-ethics',
        title: 'Best Practices for Long-term Success',
        content: `<h2>Building a Legacy Business</h2>
<p class="text-lg mb-6">Create a business that thrives for generations through ethical practices.</p>

<h3 class="text-2xl font-bold mb-4">Success Through Integrity</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The BRN Way</h4>
  <ul class="list-disc pl-6">
    <li>Treat every home like your mother's</li>
    <li>Document everything thoroughly</li>
    <li>Communicate transparently</li>
    <li>Deliver more than promised</li>
    <li>Build relationships, not just roofs</li>
    <li>Think long-term, not quick profit</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 3,
        estimatedMinutes: 16
      }
    ]).returning();
    
    // Now add the cold calling content as a new module
    await db.insert(lessons).values([
      {
        moduleId: 'res-sales-process',
        title: 'Cold Calling Mastery',
        content: `<h2>Cold Calling: Your Path to Unlimited Leads</h2>
<p class="text-lg mb-6">Cold calling is the most direct path to new business. Master it to never run out of opportunities.</p>

<h3 class="text-2xl font-bold mb-4">Why Cold Calling Works</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">The Power of Proactive Outreach</h4>
  <ul class="list-disc pl-6">
    <li>Homeowners don't know they need inspections</li>
    <li>Many qualify for insurance coverage unknowingly</li>
    <li>Most don't know how to choose quality contractors</li>
    <li>Roofing is infrequent - they need education</li>
    <li>You control your lead flow, not the market</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Cold Calling Ethics at BRN</h3>
<div class="bg-green-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Our Approach</h4>
  <ul class="list-disc pl-6">
    <li>Never use high-pressure tactics</li>
    <li>Focus on education and value</li>
    <li>Only recommend needed services</li>
    <li>Respect time and privacy</li>
    <li>Follow all regulations</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 7,
        estimatedMinutes: 20
      },
      {
        moduleId: 'res-sales-process',
        title: 'Cold Calling Scripts and Techniques',
        content: `<h2>Proven Scripts That Convert</h2>
<p class="text-lg mb-6">Use these tested scripts to start conversations and book appointments.</p>

<h3 class="text-2xl font-bold mb-4">The General Introduction Script</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Your Opening That Works</h4>
  <div class="bg-white p-4 rounded">
    <p class="mb-2">"Hello, may I speak with [Homeowner Name]?"</p>
    <p class="mb-2">"Hi [Name], this is [Your Name] with Best Roofing Now. How are you today?"</p>
    <p class="mb-2 italic">[Pause for response]</p>
    <p class="mb-2">"Great! The reason I'm calling is that our inspection team has been in your neighborhood recently, and we've noticed several homes that may need roofing attention due to [recent storm/age/seasonal wear]."</p>
    <p class="mb-2">"We're offering complimentary roof inspections to homeowners in your area this week. Our inspections use advanced drone technology to provide a detailed assessment of your roof's condition without any obligation."</p>
    <p class="mb-2">"Would you be interested in having one of our certified inspectors take a look at your roof? It takes about 30-45 minutes, and you'll receive a comprehensive report about your roof's condition."</p>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Post-Storm Script</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Strike While the Iron is Hot</h4>
  <div class="bg-white p-4 rounded">
    <p class="mb-2">"Hi [Name], this is [Your Name] with Best Roofing Now. I hope you and your family are doing well after the recent [storm type] we had in Charlotte."</p>
    <p class="mb-2">"The reason I'm calling is that these types of storms can cause roof damage that isn't always visible from the ground but can lead to serious problems down the road. We're currently helping many homeowners in your neighborhood document storm damage for insurance claims."</p>
    <p class="mb-2">"We're offering free storm damage assessments this week. Our certified inspectors use drone technology to thoroughly document any damage, and if we find issues, we can help you navigate the insurance claims process at no cost to you."</p>
    <p class="mb-2">"Would you be interested in having us check your roof for storm damage? Most homeowners are surprised to learn their insurance will often cover the cost of storm-related repairs or replacement."</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 8,
        estimatedMinutes: 25
      },
      {
        moduleId: 'res-sales-process',
        title: 'Handling Cold Call Objections',
        content: `<h2>Turning No Into Yes</h2>
<p class="text-lg mb-6">Objections are just requests for more information. Master these responses.</p>

<h3 class="text-2xl font-bold mb-4">Common Cold Call Objections</h3>
<div class="objections space-y-4">
  <div class="bg-red-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">"I'm Not Interested"</h4>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"I completely understand. Many of our current customers initially felt the same way. May I ask if you've had your roof inspected recently? The reason I ask is that most roof damage isn't visible from the ground, and catching issues early can save thousands in repairs later."</p>
      <p class="mt-3 italic">Alternative:</p>
      <p>"I respect that. Before I let you go, would it be helpful if I sent you some information about how to spot potential roof issues yourself? That way, you'll know when it might be time to call a professional."</p>
    </div>
  </div>
  
  <div class="bg-orange-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">"How Did You Get My Number?"</h4>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"Great question! We use public records and directories to reach homeowners in areas where we're currently working. We've been helping your neighbors with roofing needs and wanted to extend the same service opportunity to you."</p>
      <p class="mt-2">"I understand unexpected calls can be inconvenient. Would you prefer I send you information by email instead?"</p>
    </div>
  </div>
  
  <div class="bg-purple-50 p-6 rounded-lg">
    <h4 class="text-lg font-bold mb-3">"I Can't Afford a New Roof"</h4>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Your Response:</p>
      <p class="mb-2">"I completely understand budget concerns. That's actually why many homeowners appreciate our free inspection service. We can identify if there are any issues that might be covered by your insurance, especially if you've had storm damage. Many of our customers end up only paying their deductible for a complete roof replacement."</p>
      <p class="mt-3 italic">Alternative:</p>
      <p>"We're not calling to sell you a new roof today. Our inspection is free and helps you understand the current condition of your roof. If repairs are needed, we offer financing options with payments as low as $150/month. And if the inspection shows your roof is in good shape, you'll have peace of mind at no cost."</p>
    </div>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 9,
        estimatedMinutes: 28
      },
      {
        moduleId: 'res-sales-process',
        title: 'Cold Calling Best Practices',
        content: `<h2>Professional Cold Calling Excellence</h2>
<p class="text-lg mb-6">Follow these practices to maximize your success and maintain professionalism.</p>

<h3 class="text-2xl font-bold mb-4">Pre-Call Preparation</h3>
<div class="bg-green-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Daily Preparation Checklist</h4>
  <ul class="list-disc pl-6 space-y-2">
    <li>Review current promotions and specials</li>
    <li>Check recent weather events in target areas</li>
    <li>Prepare contact list by neighborhood</li>
    <li>Review objection handling techniques</li>
    <li>Have calendar ready for appointments</li>
    <li>Ensure CRM access for documentation</li>
    <li>Prepare notepad for call notes</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Optimal Calling Times</h3>
<div class="bg-blue-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">When to Call for Best Results</h4>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Best Times:</p>
      <ul class="list-disc pl-6">
        <li>9-11 AM weekdays</li>
        <li>4-7 PM weekdays</li>
        <li>10 AM-12 PM Saturdays</li>
      </ul>
    </div>
    <div class="bg-white p-4 rounded">
      <p class="font-bold mb-2">Avoid:</p>
      <ul class="list-disc pl-6">
        <li>Dinner time (6-7 PM)</li>
        <li>Sunday calls</li>
        <li>Major holidays</li>
      </ul>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold mb-4">Creating Urgency Ethically</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Legitimate Urgency Factors</h4>
  <ul class="list-disc pl-6">
    <li>"We're in your neighborhood this week only" (when true)</li>
    <li>"We have just a few inspection slots remaining"</li>
    <li>"Storm damage can worsen over time if not addressed"</li>
    <li>"Insurance claims have time limitations after storms"</li>
    <li>"Material prices are increasing next month"</li>
  </ul>
</div>`,
        videoUrl: null,
        orderIndex: 10,
        estimatedMinutes: 24
      },
      {
        moduleId: 'res-sales-process',
        title: 'Cold Call Follow-Up Systems',
        content: `<h2>The Fortune is in the Follow-Up</h2>
<p class="text-lg mb-6">Most sales happen after the 5th contact. Build a system that captures every opportunity.</p>

<h3 class="text-2xl font-bold mb-4">Follow-Up Schedule</h3>
<div class="bg-purple-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Systematic Follow-Up Timeline</h4>
  <ol class="list-decimal pl-6 space-y-2">
    <li><strong>Same Day:</strong> Email with relevant information</li>
    <li><strong>Day 3-5:</strong> Second call attempt</li>
    <li><strong>Week 2:</strong> Third call with new angle</li>
    <li><strong>Month 1:</strong> Check-in call</li>
    <li><strong>After Weather Event:</strong> Immediate follow-up</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Email Templates</h3>
<div class="bg-green-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">After "Not Now" Response</h4>
  <div class="bg-white p-4 rounded">
    <p class="font-bold">Subject: Roof Maintenance Information from Best Roofing Now</p>
    <p class="mt-2">Hi [Name],</p>
    <p class="mt-2">Thank you for taking the time to speak with me today about your roofing needs. As promised, I'm sending along some helpful information about how to identify potential roof issues before they become serious problems.</p>
    <p class="mt-2">Attached you'll find our "Homeowner's Guide to Roof Maintenance" which includes:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>How to spot warning signs of roof damage</li>
      <li>Seasonal maintenance tips</li>
      <li>Understanding how weather affects your roof</li>
      <li>When to call a professional</li>
    </ul>
    <p class="mt-2">Remember, we offer free roof inspections with no obligation. Many homeowners are surprised to learn about issues that aren't visible from the ground.</p>
    <p class="mt-2">I'll check back with you in a few weeks, but please don't hesitate to reach out if you have any questions or concerns in the meantime.</p>
    <p class="mt-2">Best regards,<br/>[Your Name]<br/>Best Roofing Now<br/>[Your Phone]</p>
  </div>
</div>`,
        videoUrl: null,
        orderIndex: 11,
        estimatedMinutes: 22
      },
      {
        moduleId: 'res-sales-process',
        title: 'Tracking and Improving Cold Call Performance',
        content: `<h2>Measure, Analyze, Improve</h2>
<p class="text-lg mb-6">What gets measured gets improved. Track your performance to maximize results.</p>

<h3 class="text-2xl font-bold mb-4">Key Performance Metrics</h3>
<div class="bg-blue-50 p-6 rounded-lg mb-6">
  <h4 class="text-xl font-bold mb-3">Track These Daily</h4>
  <ul class="list-disc pl-6">
    <li><strong>Call Volume:</strong> Target 50-100 calls/day</li>
    <li><strong>Contact Rate:</strong> % reaching decision maker (aim for 20%+)</li>
    <li><strong>Appointment Rate:</strong> % of contacts who schedule (aim for 15%+)</li>
    <li><strong>Show Rate:</strong> % of appointments who are home (aim for 80%+)</li>
    <li><strong>Close Rate:</strong> % of appointments that buy (aim for 30%+)</li>
  </ul>
</div>

<h3 class="text-2xl font-bold mb-4">Continuous Improvement</h3>
<div class="bg-orange-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Weekly Review Process</h4>
  <ol class="list-decimal pl-6">
    <li>Review call recordings (if available)</li>
    <li>Identify successful phrases and approaches</li>
    <li>Note common objections and test responses</li>
    <li>Share wins with team</li>
    <li>Set goals for next week</li>
    <li>Refine scripts based on results</li>
  </ol>
</div>

<h3 class="text-2xl font-bold mb-4">Role-Playing Exercises</h3>
<div class="bg-purple-50 p-6 rounded-lg">
  <h4 class="text-lg font-bold mb-3">Practice Makes Perfect</h4>
  <ul class="list-disc pl-6">
    <li><strong>Basic Introduction:</strong> Practice opening until natural</li>
    <li><strong>Objection Handling:</strong> Master all common objections</li>
    <li><strong>Appointment Setting:</strong> Practice urgency and options</li>
    <li><strong>Full Call Simulation:</strong> Complete calls start to finish</li>
  </ul>
  <p class="bg-white p-3 rounded mt-4"><strong>Tip:</strong> Record yourself and listen back. You'll be amazed what you learn!</p>
</div>`,
        videoUrl: null,
        orderIndex: 12,
        estimatedMinutes: 26
      }
    ]).returning();
    
    console.log('All lessons seeded successfully!');
    
    // Add quiz questions for the new modules
    await db.insert(quizQuestions).values([
      // Commercial Systems Quiz
      {
        moduleId: 'com-systems',
        question: 'Which commercial roofing system offers the best energy efficiency?',
        options: JSON.stringify(['EPDM', 'TPO or PVC', 'Modified Bitumen', 'Built-up Roofing']),
        correctAnswer: 1,
        explanation: 'TPO and PVC white membranes offer superior energy efficiency with their highly reflective properties.'
      },
      
      // Flat Roof Quiz
      {
        moduleId: 'com-flat-roofs',
        question: 'What is the minimum recommended slope for a flat roof?',
        options: JSON.stringify(['1/8" per foot', '1/4" per foot', '1/2" per foot', '1" per foot']),
        correctAnswer: 1,
        explanation: 'The minimum slope for proper drainage on a flat roof is 1/4" per foot to ensure water drains within 48 hours.'
      },
      
      // Commercial Inspection Quiz
      {
        moduleId: 'com-inspection',
        question: 'When is the best time to perform infrared moisture scans?',
        options: JSON.stringify(['During rain', 'Midday sun', '2-4 hours after sunset', 'Early morning']),
        correctAnswer: 2,
        explanation: 'IR scans work best 2-4 hours after sunset when wet insulation retains heat while dry areas have cooled.'
      },
      
      // Insurance Intro Quiz
      {
        moduleId: 'ins-intro',
        question: 'What is the average close rate for insurance restoration vs retail?',
        options: JSON.stringify(['30% vs 70%', '50% vs 50%', '70% vs 30%', '90% vs 10%']),
        correctAnswer: 2,
        explanation: 'Insurance restoration typically has a 70% close rate compared to only 30% for retail roofing sales.'
      },
      
      // Cold Calling Quiz
      {
        moduleId: 'res-sales-process',
        question: 'What are the best hours for cold calling homeowners?',
        options: JSON.stringify(['7-9 AM', '9-11 AM and 4-7 PM', '12-2 PM', '8-10 PM']),
        correctAnswer: 1,
        explanation: 'The best times are 9-11 AM and 4-7 PM weekdays when homeowners are available but not eating meals.'
      }
    ]).returning();
    
    console.log('Quiz questions added for new content.');
    
  } catch (error) {
    console.error('Error seeding complete lessons:', error);
    throw error;
  }
}

// Run the seed function
seedCompleteLessons().catch(console.error);