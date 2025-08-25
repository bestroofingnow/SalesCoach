import OpenAI from "openai";
import { storage } from "./storage";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPEN_AI_BRN_ASST;
  console.log('OpenAI API Key status:', apiKey ? `Available (starts with: ${apiKey.substring(0, 15)}...)` : 'Not found');
  
  if (!apiKey) {
    throw new Error('OPEN_AI_BRN_ASST environment variable is required for chat features');
  }
  
  // Always create a fresh client to ensure we get the latest API key
  return new OpenAI({ apiKey });
}

interface ChatContext {
  userId: string;
  userRole?: string;
  companyContext?: string;
}

interface CompanyInfo {
  name: string;
  industry: string;
  location: string;
  services: string[];
  values: string[];
  trainingAreas: string[];
}

const COMPANY_INFO: CompanyInfo = {
  name: "Best Roofing Now",
  industry: "Roofing Services",
  location: "Charlotte, North Carolina",
  services: [
    "Residential Roofing",
    "Commercial Roofing", 
    "Restoration Services",
    "Emergency Roof Repairs",
    "Roof Inspections",
    "Insurance Claims Assistance"
  ],
  values: [
    "Quality craftsmanship",
    "Customer satisfaction",
    "Professional integrity",
    "Safety first",
    "Continuous learning and improvement"
  ],
  trainingAreas: [
    "Residential roofing techniques and materials",
    "Commercial roofing systems and installation",
    "Restoration and insurance claim processes",
    "Safety protocols and procedures",
    "Customer service excellence",
    "Sales and communication skills"
  ]
};

async function getRelevantTrainingContent(query: string): Promise<string> {
  try {
    // Get all training content
    const tracks = await storage.getTrainingTracks();
    let relevantContent = "";
    
    for (const track of tracks) {
      const modules = await storage.getTrainingModules(track.id);
      for (const module of modules) {
        const lessons = await storage.getLessons(module.id);
        for (const lesson of lessons) {
          // Simple keyword matching - could be enhanced with semantic search
          const content = `${lesson.title} ${lesson.content}`.toLowerCase();
          const searchTerms = query.toLowerCase().split(' ');
          
          if (searchTerms.some(term => content.includes(term) && term.length > 2)) {
            relevantContent += `\n\n[From ${track.name} - ${module.title} - ${lesson.title}]:\n${lesson.content.substring(0, 500)}...`;
          }
        }
      }
    }
    
    return relevantContent || "No specific training content found for this query.";
  } catch (error) {
    console.error('Error fetching training content:', error);
    return "Unable to access training content at this time.";
  }
}

function buildSystemPrompt(context: ChatContext): string {
  const { name, industry, location, services, values, trainingAreas } = COMPANY_INFO;
  
  return `You are an AI assistant for ${name}, a ${industry} company based in ${location}. 

COMPANY INFORMATION:
- Services: ${services.join(', ')}
- Core Values: ${values.join(', ')}
- Training Areas: ${trainingAreas.join(', ')}

YOUR ROLE:
You help employees, trainees, and staff with:
1. Answering questions about roofing techniques, materials, and best practices
2. Providing guidance on company procedures and policies
3. Drafting professional communications (emails, letters, reports) that reflect our company's values and standards
4. Explaining training content and helping with learning objectives
5. Assisting with customer service scenarios and sales situations

COMMUNICATION STYLE:
- Professional but friendly and conversational
- Clear, helpful, and easy to understand
- Use simple language that anyone can understand
- Avoid jargon unless necessary, and explain technical terms
- Always prioritize safety and quality
- Be encouraging and supportive in your responses
- When drafting communications, ensure they sound professional but approachable

IMPORTANT GUIDELINES:
- Always reference relevant training content when available
- If asked to draft communications, make them specific to our roofing business
- Emphasize safety protocols when discussing roofing work
- Be supportive of learning and professional development
- If you don't know something specific about our procedures, acknowledge this and suggest they consult with a supervisor or check official documentation

You have access to our complete training database covering residential roofing, commercial roofing, and restoration services.`;
}

export async function generateChatResponse(
  message: string,
  context: ChatContext,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const client = getOpenAIClient();
    
    // Get relevant training content
    const trainingContent = await getRelevantTrainingContent(message);
    
    // Build the enhanced prompt with context
    const enhancedMessage = trainingContent !== "No specific training content found for this query." 
      ? `${message}\n\n[RELEVANT TRAINING CONTENT]:\n${trainingContent}`
      : message;

    // Prepare messages for OpenAI
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: buildSystemPrompt(context) }
    ];

    // Add conversation history (limit to last 10 exchanges to avoid token limits)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: msg.content
      });
    }

    // Add current message
    messages.push({ role: "user", content: enhancedMessage });

    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages,
      max_completion_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I apologize, but I'm unable to generate a response at this time. Please try again.";
  } catch (error) {
    console.error('Error generating chat response:', error);
    return "I'm experiencing technical difficulties right now. Please try again in a moment, or contact your supervisor if this continues.";
  }
}

export async function generateCommunicationDraft(
  type: string, // 'email', 'letter', 'report', 'estimate'
  purpose: string,
  recipient: string,
  details: string,
  context: ChatContext
): Promise<string> {
  try {
    const client = getOpenAIClient();
    
    const communicationPrompt = `You are drafting a professional ${type} for ${COMPANY_INFO.name}, a roofing company in ${COMPANY_INFO.location}.

TYPE: ${type}
PURPOSE: ${purpose}
RECIPIENT: ${recipient}
DETAILS: ${details}

Please draft a professional ${type} that:
- Reflects our company's values: ${COMPANY_INFO.values.join(', ')}
- Uses appropriate tone for ${recipient}
- Includes relevant company information when appropriate
- Is well-structured and professional
- Uses proper business format for ${type}
- Emphasizes quality, safety, and customer satisfaction

Make it specific to the roofing industry and our services: ${COMPANY_INFO.services.join(', ')}.

Include our company name "${COMPANY_INFO.name}" and location "${COMPANY_INFO.location}" where appropriate.`;

    const response = await client.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: buildSystemPrompt(context) },
        { role: "user", content: communicationPrompt }
      ],
      max_completion_tokens: 800,
      temperature: 0.5, // Lower temperature for more consistent professional communications
    });

    return response.choices[0].message.content || "Unable to generate communication draft at this time.";
  } catch (error) {
    console.error('Error generating communication draft:', error);
    return "Unable to generate communication draft. Please try again later.";
  }
}