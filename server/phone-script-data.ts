import type { InsertScriptLibrary } from "@shared/schema";

export const PHONE_TRAINING_SCRIPTS: InsertScriptLibrary[] = [
  // OPENING SCRIPTS (8 scripts)
  {
    title: "Master Storm Lead Opener",
    category: "opening",
    leadType: "storm_lead",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name] here in [City]. How are you doing today?

Great! The reason I'm calling is we've been helping homeowners in your neighborhood who had roof damage from that hail storm two weeks ago. A lot of folks don't realize they have insurance-covered damage until it's too late to file a claim.

Did you notice any damage to your roof after the storm?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "No damage that I saw" → "That's actually pretty common - most hail damage isn't visible from the ground. Insurance adjusters use ladders and know exactly what to look for. Would it be worth having someone take a quick look just to be safe?"

• "I already had someone look" → "That's smart of you! Just curious - was that person a licensed public adjuster or insurance specialist? Because there's a big difference between a quick glance and a thorough damage assessment."

• "My insurance won't cover it" → "I understand your concern. Actually, most homeowners are surprised to learn what their insurance covers. We work directly with all major insurance companies and know exactly what they look for. Would it be worth finding out for sure?"`,
    tags: ["storm", "hail", "opening", "insurance"],
    difficulty: "beginner",
    successRate: 85,
    isActive: true
  },
  {
    title: "Warm Referral Opening",
    category: "opening",
    leadType: "referral",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm calling because [Referrer Name] suggested I reach out to you. How are you doing today?

[Referrer Name] mentioned that you might be interested in having your roof inspected - they were really impressed with the work we did for them last month.

Is now a good time to talk for just a minute?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "I'm not interested" → "I totally understand - that's exactly what [Referrer Name] said initially! But after we found $12,000 worth of storm damage that their insurance covered, they were glad we called. What if I could get you the same peace of mind?"

• "We're not planning any roof work" → "That's perfect! Neither was [Referrer Name]. This isn't about selling you anything - it's about making sure you're not missing out on legitimate insurance claims. Most damage we find is completely covered."

• "How did you get my number?" → "[Referrer Name] specifically asked us to call you. They were so happy with our service that they wanted their neighbors to have the same opportunity. I hope that's okay?"`,
    tags: ["referral", "opening", "warm_lead"],
    difficulty: "beginner",
    successRate: 92,
    isActive: true
  },
  {
    title: "Cold Call Door-to-Door Opening",
    category: "opening",
    leadType: "cold_lead",
    scriptContent: `Hi there! I'm [Your Name] from [Company Name], and we're working in your neighborhood today doing some roof inspections for storm damage.

I couldn't help but notice your roof from the street - you've got a beautiful home, by the way. We're offering free inspections to see if there's any damage from the recent weather that insurance might cover.

Would you be interested in having us take a quick look?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "We're not interested" → "I completely understand - nobody likes unexpected visitors. But I'd hate for you to miss out if there's legitimate damage. It takes just 10 minutes and could save you thousands. What do you have to lose?"

• "We already had it checked" → "That's great! Just out of curiosity, when was that done? Because we've found damage that other inspectors missed, especially the subtle hail damage that shows up weeks later."

• "We don't have storm damage" → "You might be right! But insurance companies are paying claims for damage that homeowners never even noticed. Since the inspection is free, wouldn't you rather know for sure?"`,
    tags: ["cold_call", "door_to_door", "opening"],
    difficulty: "intermediate",
    successRate: 68,
    isActive: true
  },
  {
    title: "Aged Roof Concern Opening",
    category: "opening",
    leadType: "aged_roof",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm calling homeowners in your area about a new program that helps with older roofs.

I noticed from our records that your home was built around [Year] - is that correct?

Great! The reason I'm calling is that roofs from that era are now qualifying for some significant insurance benefits that most people don't know about.

Would you be interested in learning more about this?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "My roof is fine" → "I'm sure it looks fine from the ground! But roofs that age often have wear patterns that qualify for insurance replacement, even without storm damage. Wouldn't it be worth finding out if you're eligible?"

• "I'm not interested in roof work" → "I totally understand - this isn't about selling you anything. This is about potentially getting a new roof paid for by your insurance company. Even if you're not planning to do anything, wouldn't you want to know if you qualify?"

• "How did you get my information?" → "We use public property records to identify homes that might qualify for these programs. It's all public information, and we're just trying to help homeowners take advantage of benefits they're entitled to."`,
    tags: ["aged_roof", "insurance", "opening"],
    difficulty: "intermediate",
    successRate: 74,
    isActive: true
  },
  {
    title: "Urgency-Based Opening",
    category: "opening",
    leadType: "storm_lead",
    scriptContent: `Hi [Name], this is [Your Name] with [Company Name]. I'm calling with some time-sensitive information about your roof.

We've been working in your neighborhood this week documenting storm damage, and I wanted to reach out before the insurance deadline passes.

Do you have just a minute? This could be pretty important for you.

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "What deadline?" → "Insurance companies typically have a one-year window for storm damage claims, but they prefer claims within 30-60 days of the storm. After that, it gets much harder to prove the damage was from that specific event."

• "We don't have storm damage" → "That's what most people think! But we've found qualifying damage on 8 out of 10 homes in your area. The damage we find is often invisible from ground level but definitely impacts your roof's performance."

• "This sounds like a scam" → "I completely understand your caution - there are a lot of bad actors out there. We're locally licensed and bonded, and we don't ask for any money upfront. Everything we do is through your insurance company. Can I give you our license number to verify?"`,
    tags: ["urgency", "storm", "deadline", "opening"],
    difficulty: "advanced",
    successRate: 79,
    isActive: true
  },
  {
    title: "Neighbor Reference Opening",
    category: "opening",
    leadType: "storm_lead",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. We're working on your neighbor's roof at [Address] this week and wanted to reach out to you.

While we were up there, we couldn't help but notice that your roof might have similar damage from the same storm.

Would you be interested in having us take a look while we're in the area?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "Which neighbor?" → "The [description - blue house, corner lot, etc.] at [Address]. We found significant hail damage that their insurance is covering completely. Since you're so close, there's a good chance you have similar damage."

• "I haven't seen any damage" → "Neither did they! That's the tricky thing about hail damage - it's often not visible from the ground. But once we get up there with the right tools, it becomes obvious. Their insurance adjuster confirmed it immediately."

• "We're not ready for roof work" → "I understand, and that's totally fine. This isn't about being ready for work - it's about not missing out on legitimate insurance coverage. Even if you don't do anything now, you'll know what your options are."`,
    tags: ["neighbor", "social_proof", "storm", "opening"],
    difficulty: "beginner",
    successRate: 88,
    isActive: true
  },
  {
    title: "Educational Approach Opening",
    category: "opening",
    leadType: "aged_roof",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm reaching out to homeowners in your area with some important information about roof maintenance and insurance.

Most people don't realize that regular roof inspections can actually help prevent major problems and keep your insurance valid.

Are you familiar with your insurance company's requirements for roof maintenance?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "No, I'm not familiar" → "Most people aren't! Many insurance companies require regular inspections, and some will deny claims if they can prove neglect. We help homeowners stay compliant and catch issues early. Would that be valuable to you?"

• "My insurance doesn't require that" → "You might be right for your specific policy. But even without requirements, regular inspections can save you thousands by catching small problems before they become big ones. Plus, it strengthens any future insurance claims you might need to make."

• "We don't need an inspection" → "You may be absolutely right. But most homeowners are surprised by what we find - even on roofs that look perfect. Since it's free and could save you money, what would you have to lose by having us take a look?"`,
    tags: ["educational", "maintenance", "insurance", "opening"],
    difficulty: "intermediate",
    successRate: 72,
    isActive: true
  },
  {
    title: "Value Proposition Opening",
    category: "opening",
    leadType: "all_leads",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm calling homeowners in your area with an opportunity that could save you thousands of dollars.

We specialize in helping homeowners get legitimate roof repairs and replacements covered by their insurance companies - at no cost to them.

Would you be interested in learning how this works?

[PAUSE FOR RESPONSE]

Common Rebuttals:
• "How is it no cost?" → "Great question! When we find qualifying damage, your insurance company pays for the repairs directly. We work with them to make sure everything is properly documented and approved. You just pay your deductible, like any insurance claim."

• "Sounds too good to be true" → "I understand your skepticism! It's actually pretty straightforward - we're just experts at documenting damage that qualifies for insurance coverage. Most homeowners miss this because they don't know what to look for or how to present it to insurance companies."

• "What's the catch?" → "No catch! We only get paid if your insurance approves a claim. If we don't find qualifying damage, you don't owe us anything. We only succeed when you do, which is why we're very good at what we do."`,
    tags: ["value_proposition", "insurance", "no_cost", "opening"],
    difficulty: "advanced",
    successRate: 81,
    isActive: true
  },

  // OBJECTION HANDLING SCRIPTS (6 scripts)
  {
    title: "Not Interested - Reframe Value",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `I totally understand - most folks aren't interested in roof work until they have a problem. That's exactly why I'm calling - to help you catch any issues before they become expensive emergencies.

The inspection is completely free, so there's no risk. What if we found a small problem that could save you thousands down the road?

I have an inspector in your area tomorrow - would morning or afternoon work better for you?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "I'm really not interested" → "I hear you, and I respect that. Let me ask you this - if someone told you there might be $10,000 of damage on your roof that insurance would cover, wouldn't you at least want to know if that was true?"

• "We're not doing any work right now" → "Perfect! This isn't about doing work right now. It's about knowing what condition your roof is in. Most people are surprised to learn they have damage they never knew about. Knowledge is power, right?"

• "Call me back later" → "I appreciate that, but here's the thing - I'm scheduling inspections for this week while we have a crew in your area. After this week, it could be months before we're back. Would it be easier to just get it done while we're here?"`,
    tags: ["not_interested", "reframe", "value"],
    difficulty: "intermediate",
    successRate: 78,
    isActive: true
  },
  {
    title: "No Money - Insurance Focus",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `I completely understand - and that's exactly why this program is so valuable! Most of our customers don't pay anything out of pocket except their insurance deductible.

If we find qualifying damage, your insurance company pays for everything. If we don't find anything, you don't pay us a penny.

You literally have nothing to lose by having us take a look. Does that make sense?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "We still can't afford the deductible" → "I get it - deductibles can be significant. Here's what most people don't know: if you have legitimate damage, you can often work with your insurance company on deductible payment plans. Plus, the alternative could be much worse - ignoring damage that gets worse over time."

• "What if you do find damage?" → "Then you'll know the truth about your roof's condition. You can decide what to do with that information. But at least you'll make an informed decision instead of hoping everything is okay."

• "I don't trust insurance companies" → "That's actually smart! Insurance companies try to pay as little as possible. That's exactly why you need someone who knows how to properly document and present damage. We speak their language and know what they're looking for."`,
    tags: ["no_money", "insurance", "deductible"],
    difficulty: "intermediate",
    successRate: 71,
    isActive: true
  },
  {
    title: "Already Have Someone - Differentiate",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `That's great that you have someone! I'm always happy to hear when homeowners are being proactive about their roof maintenance.

Just out of curiosity - do they specialize in insurance claims and storm damage documentation? Because that's a very specific skill set that most roofers don't have.

Would it be worth having a specialist take a look, especially since it's free?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "Yes, they handle insurance claims" → "Perfect! Then you know how important proper documentation is. Different specialists sometimes catch things others miss. Since we don't charge for inspections, wouldn't it be worth getting a second opinion?"

• "We trust our current roofer" → "That's valuable - trust is everything in this business! I'm not trying to replace anyone. I'm just suggesting that when it comes to insurance claims, having multiple perspectives can be really valuable. Insurance companies respect thorough documentation."

• "Why would I need someone else?" → "You might not! But here's what we see: general roofers focus on repairs, while insurance specialists focus on maximizing legitimate claims. It's like having a family doctor vs. a specialist - both have their place."`,
    tags: ["have_someone", "differentiate", "specialist"],
    difficulty: "advanced",
    successRate: 65,
    isActive: true
  },
  {
    title: "Too Busy - Time Efficiency",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `I completely understand - everyone's busy these days! That's exactly why we make this as convenient as possible for you.

The inspection takes about 15 minutes, and you don't even need to be home if you'd prefer. We can work around your schedule completely.

What if I could have someone out there during lunch on a weekday when you're at work?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "I work from home" → "Even better! You can watch the whole process and ask questions. Most people find it really interesting to see what's actually happening on their roof. Plus, you'll know exactly what we found in real-time."

• "I don't want strangers at my house" → "I totally understand that concern. We're fully licensed and bonded, and I can provide references from your neighbors. We also send you a photo of your inspector beforehand so you know who's coming."

• "What if you find problems?" → "Then you'll know the truth about your roof's condition, which is valuable information. But the inspection itself is quick and non-intrusive. We're not going to create more work for your busy schedule."`,
    tags: ["too_busy", "convenience", "scheduling"],
    difficulty: "beginner",
    successRate: 83,
    isActive: true
  },
  {
    title: "Scam Concerns - Credibility Building",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `I appreciate your caution - there are definitely some bad actors out there, and you should be suspicious of anyone asking for money upfront.

Here's how we're different: We're locally licensed and bonded, we work directly with insurance companies, and we don't ask for any money until your insurance approves a claim.

Would you like our license number so you can verify our credentials?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "How do I know you're legitimate?" → "Great question! You can verify our license with the state, check our Better Business Bureau rating, and we can provide references from your neighbors. We've been doing this for [X] years and have worked with every major insurance company."

• "Storm chasers are all scams" → "You're right to be wary - many are! That's why we only work locally and have a permanent office here. We're not going anywhere after the storm. Our reputation in this community is everything to us."

• "I don't give information to strangers" → "Smart policy! I'm not asking for any personal information right now. All we need is permission to inspect your roof. If we find something, then we can talk about next steps. You're in control the whole time."`,
    tags: ["scam_concerns", "credibility", "trust"],
    difficulty: "advanced",
    successRate: 69,
    isActive: true
  },
  {
    title: "Spouse Decision - Navigation Strategy",
    category: "objection_response",
    leadType: "all_leads",
    scriptContent: `That makes perfect sense - big decisions like this should definitely be made together. I respect that completely.

Here's what I'd suggest: why don't we schedule the free inspection when you're both available? That way, you can both see what we find and make an informed decision together.

Would evenings or weekends work better for both of you?

[PAUSE FOR RESPONSE]

Advanced Rebuttals:
• "I need to talk to them first" → "Absolutely! Why don't I give you our information and you can discuss it. I'll call back tomorrow afternoon to see what you decided. Or would you prefer to call me when you've had a chance to talk?"

• "They handle all the house decisions" → "That's fine! Would it be helpful if I called back when they're available? Or would you prefer to have them call me directly? Either way works for me."

• "We're not ready to decide anything" → "Perfect! The inspection doesn't commit you to anything. It just gives you information to make whatever decision is right for your family. Think of it as gathering facts, not making a commitment."`,
    tags: ["spouse_decision", "decision_maker", "family"],
    difficulty: "intermediate",
    successRate: 76,
    isActive: true
  },

  // CLOSING SCRIPTS (5 scripts)
  {
    title: "Assumptive Appointment Close",
    category: "closing",
    leadType: "all_leads",
    scriptContent: `Based on what you're telling me, it sounds like you could really benefit from this inspection. Let me get someone out there to take a look.

I have two options for you: I can have our senior inspector out there tomorrow to do a comprehensive assessment, or if you prefer, I can schedule our regular inspector for next week.

Which would work better for you?

[PAUSE FOR RESPONSE]

Follow-up Techniques:
• If they hesitate: "I understand this is a decision. Let me ask you this - what do you have to lose by having us take a look? It's free, and you'll have valuable information about your roof's condition."

• If they want to think about it: "I appreciate that you're being thoughtful. While you're thinking about it, would it make sense to at least get on the schedule? We can always adjust or cancel if needed."

• If they ask about timing: "The sooner we can get out there, the better. If there is damage, time is important for insurance claims. Plus, small problems can become big problems quickly if they're not addressed."`,
    tags: ["assumptive", "appointment", "closing"],
    difficulty: "advanced",
    successRate: 82,
    isActive: true
  },
  {
    title: "Alternative Choice Close",
    category: "closing",
    leadType: "all_leads",
    scriptContent: `Great! So it sounds like we should definitely get someone out there to take a look. I have a couple of options for you.

We can schedule you for a standard inspection, which covers all the basics, or we can do our comprehensive assessment that includes moisture detection and thermal imaging.

Both are free, but the comprehensive takes a bit longer. Which sounds better to you?

[PAUSE FOR RESPONSE]

Follow-up Techniques:
• If they choose standard: "Perfect! The standard inspection will give you everything you need to know. Would morning or afternoon work better for you this week?"

• If they choose comprehensive: "Excellent choice! The comprehensive assessment is really thorough. We find things that other inspectors miss. What day works best for you?"

• If they can't decide: "You know what? Let's go with the comprehensive. Since we're only out there once, we might as well be thorough. Does that sound good?"`,
    tags: ["alternative_choice", "options", "closing"],
    difficulty: "intermediate",
    successRate: 79,
    isActive: true
  },
  {
    title: "Urgency-Based Close",
    category: "closing",
    leadType: "storm_lead",
    scriptContent: `I'm really glad we connected today! Here's the thing - we have a crew working in your neighborhood this week, which is perfect timing for you.

After this week, our next opening in your area isn't for another month. Plus, if there is storm damage, time is critical for insurance claims.

I can get you on the schedule for this week. Would Thursday or Friday work better?

[PAUSE FOR RESPONSE]

Follow-up Techniques:
• If they want to wait: "I understand the hesitation. But here's the reality - if we find damage and you wait a month to file the claim, the insurance company might question whether it's really from this storm. Fresh claims always go smoother."

• If they need more time: "How about this - let me hold a spot for you for Thursday. You can always cancel if you change your mind, but at least you won't lose the opportunity."

• If they're concerned about pressure: "There's no pressure here. We're just trying to be efficient with our scheduling. The inspection is free regardless of when we do it."`,
    tags: ["urgency", "scarcity", "storm", "closing"],
    difficulty: "advanced",
    successRate: 84,
    isActive: true
  },
  {
    title: "Social Proof Close",
    category: "closing",
    leadType: "all_leads",
    scriptContent: `You know, you remind me of the Johnson family down on Oak Street. They had the exact same concerns you do, and they were so glad they went ahead with the inspection.

We found $15,000 worth of damage that their insurance covered completely. Mrs. Johnson actually said it was the best phone call she ever received!

I'd hate for you to miss out on the same opportunity. Shall we get you scheduled?

[PAUSE FOR RESPONSE]

Follow-up Techniques:
• If they want more details: "The Johnsons are actually one of our best references now. They had damage they never knew about - hail impacts that were weakening their roof. The insurance company approved everything once they saw our documentation."

• If they're still hesitant: "Look, I can't promise we'll find the same thing on your roof, but I can promise you'll know the truth about its condition. Isn't that peace of mind worth a free 15-minute inspection?"

• If they ask about other customers: "We've worked with about 30 families in your neighborhood this year. About 80% had some qualifying damage. The ones who didn't were still happy to know their roof was in good shape."`,
    tags: ["social_proof", "testimonial", "closing"],
    difficulty: "intermediate",
    successRate: 87,
    isActive: true
  },
  {
    title: "Summary and Benefit Close",
    category: "closing",
    leadType: "all_leads",
    scriptContent: `Let me summarize what we've talked about: You get a free, professional roof inspection by a certified specialist. If we find qualifying damage, your insurance could cover repairs or replacement. If we don't find anything, you have peace of mind knowing your roof is in good shape.

Either way, you win. And it doesn't cost you anything to find out.

The only question is: would you prefer morning or afternoon?

[PAUSE FOR RESPONSE]

Follow-up Techniques:
• If they're still thinking: "What questions do you have that would help you make this decision? I want to make sure you have all the information you need."

• If they mention risk: "The only risk I see is not knowing if you have damage that could get worse over time. This eliminates that risk completely."

• If they want guarantees: "Here's our guarantee: if we don't find anything that qualifies for insurance coverage, you don't pay us anything. We only succeed if we help you succeed."`,
    tags: ["summary", "benefits", "no_risk", "closing"],
    difficulty: "beginner",
    successRate: 81,
    isActive: true
  },

  // STORM LEAD SPECIFIC SCRIPTS (3 scripts)
  {
    title: "Hail Damage Specialist Approach",
    category: "storm_specific",
    leadType: "storm_lead",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm a certified hail damage specialist, and we've been working in your neighborhood documenting damage from the storm on [Date].

We've found qualifying hail damage on 9 out of 10 roofs in your area. Most of it isn't visible from the ground, but it definitely affects your roof's performance and insurance coverage.

Have you had your roof inspected for hail damage yet?

[PAUSE FOR RESPONSE]

Storm-Specific Rebuttals:
• "I didn't see any damage" → "That's completely normal! Hail damage often looks like normal wear to untrained eyes. But insurance adjusters know exactly what to look for, and so do we. That's why we find damage that homeowners miss."

• "The storm wasn't that bad here" → "You might be surprised! Even moderate hail can cause significant damage, especially if your roof has any age to it. We're finding damage even where people thought the storm was mild."

• "My insurance already inspected" → "Did they actually get on the roof, or did they just look from the ground? Many insurance companies do 'drive-by' inspections first. If they found no damage without getting on the roof, they probably missed a lot."`,
    tags: ["hail", "storm", "specialist", "certification"],
    difficulty: "advanced",
    successRate: 89,
    isActive: true
  },
  {
    title: "Wind Damage Documentation",
    category: "storm_specific", 
    leadType: "storm_lead",
    scriptContent: `Hi [Name], this is [Your Name] with [Company Name]. We're documenting wind damage in your area from the storm last week.

Wind damage is tricky because it's often not immediately obvious, but it can compromise your roof's integrity and definitely affects your insurance coverage.

We use specialized equipment to detect wind damage that most people miss. Would you be interested in having us check your roof?

[PAUSE FOR RESPONSE]

Wind Damage Rebuttals:
• "We don't have wind damage" → "Wind damage is actually the hardest to spot without the right training. It might be loose shingles, compromised seals, or structural issues that aren't visible from the ground. The only way to know for sure is to have it properly inspected."

• "Our roof looks fine" → "That's what most people think! But wind damage often happens on the back side of the roof or in areas you can't see. Plus, insurance companies are very specific about what qualifies as wind damage."

• "How much wind does it take?" → "You'd be surprised - winds over 45 mph can cause qualifying damage, especially on older roofs. The storm last week had gusts over 60 mph, which definitely falls into the damage category."`,
    tags: ["wind", "storm", "documentation", "equipment"],
    difficulty: "intermediate",
    successRate: 73,
    isActive: true
  },
  {
    title: "Multi-Storm Accumulation",
    category: "storm_specific",
    leadType: "storm_lead", 
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm calling about something important regarding the multiple storms we've had this season.

A lot of people don't realize that storm damage can accumulate over time. Even if individual storms didn't seem severe, the combined impact can create significant damage that qualifies for insurance coverage.

Have you had your roof inspected since the beginning of storm season?

[PAUSE FOR RESPONSE]

Multi-Storm Rebuttals:
• "None of the storms were that bad" → "That's exactly my point! Each storm might have been manageable individually, but the cumulative effect is what causes problems. Insurance companies understand this and will cover accumulated damage."

• "We've been through storms before" → "That's actually part of the issue. Each storm adds a little more wear, and eventually, it reaches a tipping point. The good news is that insurance covers this type of gradual storm damage."

• "How can you prove it's storm damage?" → "Great question! We document everything with photos and use weather reports to correlate damage with specific storm events. Insurance companies accept this type of documentation all the time."`,
    tags: ["multiple_storms", "accumulation", "seasonal", "documentation"],
    difficulty: "advanced",
    successRate: 77,
    isActive: true
  },

  // AGED ROOF SCRIPTS (3 scripts) 
  {
    title: "Roof Age Insurance Requirements",
    category: "aged_roof",
    leadType: "aged_roof",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I'm reaching out to homeowners with older roofs about some important insurance changes.

Many insurance companies are now requiring inspections on roofs over 15 years old. Some are even dropping coverage or raising rates significantly for older roofs.

Is your roof over 15 years old?

[PAUSE FOR RESPONSE]

Age-Related Rebuttals:
• "My insurance hasn't said anything" → "That's common - they usually don't mention it until renewal time or when you file a claim. By then it's too late to address any issues proactively. It's better to know where you stand now."

• "My roof is in good shape" → "I'm sure it looks good! But insurance companies have very specific criteria for what they consider 'good shape.' A professional assessment ensures you meet their standards and can actually strengthen your coverage."

• "This sounds like a scare tactic" → "I understand your concern, but this is actually happening industry-wide. I can show you documentation from major insurance companies about these new requirements. It's better to be proactive than reactive."`,
    tags: ["aged_roof", "insurance_requirements", "policy_changes"],
    difficulty: "intermediate",
    successRate: 71,
    isActive: true
  },
  {
    title: "Preventive Maintenance Value",
    category: "aged_roof", 
    leadType: "aged_roof",
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I work with homeowners who want to maximize their roof's lifespan and avoid expensive surprises.

Most roofs over 10 years old have small issues that, if caught early, can be fixed inexpensively. But if they're ignored, they turn into major problems that cost thousands.

When was the last time you had a professional look at your roof?

[PAUSE FOR RESPONSE]

Maintenance-Focused Rebuttals:
• "We don't have any problems" → "That's exactly the best time to have it inspected! It's like regular health checkups - the goal is to catch things before they become problems. Small repairs now can save you major expenses later."

• "We can't afford roof work" → "I completely understand, and that's exactly why this makes sense. Preventive maintenance costs hundreds, while emergency repairs cost thousands. Plus, many small issues are covered by insurance if properly documented."

• "Our roof is too old to worry about" → "Actually, that's when it's most important! Older roofs need more attention, but they can often be maintained much longer than people think. It's about knowing what to watch for and addressing issues promptly."`,
    tags: ["preventive", "maintenance", "aged_roof", "cost_savings"],
    difficulty: "beginner", 
    successRate: 68,
    isActive: true
  },
  {
    title: "Roof Replacement Timing Strategy",
    category: "aged_roof",
    leadType: "aged_roof", 
    scriptContent: `Hi [Name], this is [Your Name] from [Company Name]. I specialize in helping homeowners with older roofs make smart decisions about replacement timing.

Most people wait until they have problems to replace their roof, but that's actually the most expensive approach. There's a sweet spot where replacement makes financial sense.

How old is your current roof?

[PAUSE FOR RESPONSE]

Timing-Focused Rebuttals:
• "It's not leaking yet" → "That's actually perfect timing! Once a roof starts leaking, you're in emergency mode and paying premium prices. Plus, you might have water damage to deal with. Proactive replacement gives you more options and better pricing."

• "We're not ready to spend that money" → "I totally understand. That's exactly why timing matters so much. If we can find insurance-covered damage or get you on a planned replacement schedule, it's much more affordable than an emergency replacement."

• "How do we know when it's time?" → "Great question! It's not just about age - it's about condition, efficiency, and insurance requirements. A professional assessment can tell you if you have 2 years or 10 years left, so you can plan accordingly."`,
    tags: ["replacement", "timing", "aged_roof", "strategy"],
    difficulty: "advanced",
    successRate: 74,
    isActive: true
  }
];

// Categorize scripts for easy access
export const SCRIPT_CATEGORIES = {
  opening: PHONE_TRAINING_SCRIPTS.filter(s => s.category === 'opening'),
  objection_response: PHONE_TRAINING_SCRIPTS.filter(s => s.category === 'objection_response'),
  closing: PHONE_TRAINING_SCRIPTS.filter(s => s.category === 'closing'),
  storm_specific: PHONE_TRAINING_SCRIPTS.filter(s => s.category === 'storm_specific'),
  aged_roof: PHONE_TRAINING_SCRIPTS.filter(s => s.category === 'aged_roof')
};

export const TOTAL_SCRIPTS = PHONE_TRAINING_SCRIPTS.length; // Should be 24+