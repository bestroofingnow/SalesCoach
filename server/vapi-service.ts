import { storage } from './storage';
import { Company, VapiAgent } from '@shared/schema';

// Default VAPI script from the user's attachment
const DEFAULT_VAPI_SCRIPT = `Character Profile
You are Coach Betty, [COMPANY]'s experienced Sales Training Manager with 15+ years in door-to-door sales. You create REALISTIC training scenarios that mirror actual door-to-door interactions appointment setters will face. Your expertise comes from the company knowledge base provided, which contains all specific details about your company, products, services, and sales approach.

DIFFICULTY LEVEL SYSTEM
LISTEN FOR DIFFICULTY LEVEL AT START: The caller will specify "Easy," "Hard," or "Pro" at the beginning.

EASY MODE (1 Rebuttal Required)
- Give one realistic objection
- If they provide a GOOD rebuttal, allow the appointment
- Still be naturally resistant but more receptive to a solid response
- Examples: "We're not interested" → Good rebuttal → Book appointment

HARD MODE (3 Rebuttals Required)
- Give three realistic objections in sequence
- Each must be overcome with a GOOD rebuttal before moving to the next
- Progressively get slightly easier to convince after each good rebuttal
- Only book appointment after 3rd successful rebuttal

PRO MODE (7 Rebuttals Required)
- Give seven realistic objections in sequence
- Each must be overcome with a GOOD rebuttal before moving to the next
- Start extremely hostile and gradually become more receptive with each successful rebuttal
- Only book appointment after 7th successful rebuttal
- This should feel like the most difficult door imaginable

WHAT COUNTS AS A "GOOD REBUTTAL":
- Addresses the specific objection directly
- Shows confidence and preparation
- Provides value or differentiation
- Doesn't sound scripted or pushy
- Moves the conversation forward positively

CRITICAL RULES FOR ROLE-PLAY
1. IMMEDIATE START - NO INTRODUCTION
Jump straight into character as if they just knocked on your door. NO mention of Coach Betty until after the role-play ends.

2. REALISTIC BEHAVIOR RULES
- Ask only 1-2 questions at a time maximum (not rapid-fire questions)
- Never ask for their name or company - listen for them to provide it
- Be skeptical and guarded like real homeowners at their door
- Make them work for EACH rebuttal based on difficulty level
- Use natural pauses - just be quiet, don't announce it
- Sound annoyed or busy - nobody likes door knockers
- Adjust resistance level based on Easy/Hard/Pro mode

3. REALISTIC DOOR OPENINGS (Randomly Selected)
- "Yes?" (cautious, door barely open)
- "What do you want?" (annoyed)
- "We're not interested" (before they even speak)
- "Can I help you?" (polite but guarded)
- "Yeah?" (impatient)
- "I'm busy" (about to close door)
- "No soliciting!" (aggressive)
- "What is it?" (through the door/screen)
- "Not interested" (already closing door)

IMPORTANT: NEVER NARRATE ACTIONS
- Never say what you're doing (no "pause", "silence for X seconds", "sigh", "skeptical" etc.)
- Just BE silent when thinking
- Don't announce hesitations - just hesitate
- React naturally without describing your reactions
- If you need to pause, just stop talking

COACHING: Make sure to start the coaching as soon as you agree to the inspection or appointment. Once you hear the last good rebuttal immediately go into coaching mode.

THE GOLDEN RULE
Make it feel like a REAL door knock with appropriate difficulty scaling. Easy should still challenge them once, Hard should test their persistence, and Pro should feel like the door from hell. Act naturally without ever describing or narrating what you're doing.

KNOWLEDGE BASE INTEGRATION
- Use the provided company knowledge base to understand specific products, services, and sales methodologies
- Adapt objection sequences to be relevant to the company's target market
- Reference company-specific rebuttal techniques in coaching
- Incorporate company values and differentiators into realistic homeowner responses
- Scale objection difficulty while keeping them industry-appropriate

ABSOLUTE RULE
Never narrate or announce what you're doing. No stage directions. No describing pauses or silence. Just BE the homeowner at their door naturally - if you need to pause, just stop talking. If you're thinking, just be quiet. Act it, don't describe it! Count their successful rebuttals silently and progress through your difficulty sequence accordingly.`;

interface VapiConfig {
  apiKey?: string;
  phoneNumber?: string;
  assistantName?: string;
  voiceId?: string;
  model?: string;
}

// VAPI Door to Door Training Assistant ID (provided by user)
const DOOR_TO_DOOR_ASSISTANT_ID = 'd2794e4d-af9a-4fe3-8f56-2ebd781d2c6a';

export class VapiService {
  private baseUrl = 'https://api.vapi.ai/v1';
  
  async getOrCreateVapiAgent(companyId: string): Promise<VapiAgent | null> {
    try {
      // Check if agent already exists
      let agent = await storage.getVapiAgent(companyId);
      
      if (!agent) {
        // Get company information
        const company = await storage.getCompany(companyId);
        if (!company) {
          console.error('Company not found:', companyId);
          return null;
        }
        
        // Create new agent with default configuration
        // Note: Using pre-configured VAPI assistant ID: d2794e4d-af9a-4fe3-8f56-2ebd781d2c6a
        agent = await storage.createVapiAgent({
          companyId,
          agentName: 'Coach Betty (Door to Door Training)',
          vapiAssistantId: DOOR_TO_DOOR_ASSISTANT_ID, // Store the assistant ID
          voiceId: '6aDn1KB0hjpdcocrUkmq', // 11labs voice ID from user
          model: 'gpt-4o-mini', // OpenAI model from user
          systemPrompt: this.buildSystemPrompt(company),
          companyKnowledge: this.buildCompanyKnowledge(company),
          scriptContent: DEFAULT_VAPI_SCRIPT,
          isActive: true
        });
      }
      
      return agent;
    } catch (error) {
      console.error('Error getting/creating VAPI agent:', error);
      return null;
    }
  }
  
  buildSystemPrompt(company: Company): string {
    const companyName = company.name || 'Your Company';
    const script = DEFAULT_VAPI_SCRIPT.replace(/\[COMPANY\]/g, companyName);
    
    return `${script}

COMPANY SPECIFIC INFORMATION:
Company Name: ${company.name}
Location: ${company.location || 'Your Location'}
Services: ${(company.services as string[])?.join(', ') || 'Roofing Services'}
Core Values: ${(company.values as string[])?.join(', ') || 'Quality, Integrity, Service'}
Training Areas: ${(company.trainingAreas as string[])?.join(', ') || 'Sales, Technical, Customer Service'}`;
  }
  
  buildCompanyKnowledge(company: Company): string {
    return `Company: ${company.name}
Industry: ${company.industry || 'Roofing Services'}
Location: ${company.location || 'Your Location'}

Services Offered:
${(company.services as string[])?.map(s => `- ${s}`).join('\n') || '- Roofing Services'}

Company Values:
${(company.values as string[])?.map(v => `- ${v}`).join('\n') || '- Quality\n- Integrity\n- Service'}

Training Focus Areas:
${(company.trainingAreas as string[])?.map(t => `- ${t}`).join('\n') || '- Sales Excellence\n- Technical Skills\n- Customer Service'}`;
  }
  
  async createVapiAssistant(agent: VapiAgent): Promise<any> {
    if (!agent.vapiApiKey) {
      console.error('VAPI API key not configured for agent');
      return null;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/assistants`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${agent.vapiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: agent.agentName,
          transcriber: {
            provider: 'deepgram',
            model: 'nova-2',
            language: 'en-US'
          },
          model: {
            provider: 'openai',
            model: agent.model || 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: agent.systemPrompt
              }
            ],
            temperature: 0.7
          },
          voice: {
            provider: '11labs',
            voiceId: agent.voiceId || '6aDn1KB0hjpdcocrUkmq',
            model: 'eleven_turbo_v2',
            stability: 0.5,
            similarityBoost: 0.75
          },
          firstMessage: "What?", // Start with a realistic door opening
          endCallFunctionEnabled: true,
          endCallMessage: "Great work on that training session!",
          silenceTimeoutSeconds: 30,
          responseDelaySeconds: 0.4,
          llmRequestDelaySeconds: 0.1,
          numWordsToInterruptAssistant: 2
        })
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Failed to create VAPI assistant:', error);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating VAPI assistant:', error);
      return null;
    }
  }
  
  async startPhoneCall(agent: VapiAgent, phoneNumber: string): Promise<any> {
    if (!agent.vapiApiKey) {
      console.error('VAPI API key not configured');
      return null;
    }
    
    try {
      // Use the existing Door to Door Training Assistant ID
      console.log('Starting VAPI call with assistant ID:', DOOR_TO_DOOR_ASSISTANT_ID);
      
      // Start the phone call with the pre-configured assistant
      const response = await fetch(`${this.baseUrl}/calls`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${agent.vapiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assistantId: DOOR_TO_DOOR_ASSISTANT_ID, // Use the hardcoded assistant ID for Door to Door Training
          customer: {
            number: phoneNumber
          },
          phoneNumberId: agent.vapiPhoneNumber // This would need to be configured in VAPI
        })
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Failed to start phone call:', error);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error starting phone call:', error);
      return null;
    }
  }
  
  async updateAgentConfiguration(
    agentId: string, 
    config: Partial<VapiAgent>
  ): Promise<VapiAgent | undefined> {
    return await storage.updateVapiAgent(agentId, config);
  }
}

export const vapiService = new VapiService();