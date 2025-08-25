import OpenAI from 'openai';

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPEN_AI_BRN_ASST;
    if (!apiKey) {
      throw new Error('OPEN_AI_BRN_ASST environment variable is required for AI features');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

export interface HintContext {
  moduleTitle: string;
  lessonTitle: string;
  lessonContent: string;
  userQuestion?: string;
  previousHints?: string[];
}

export async function generateContextualHint(context: HintContext): Promise<string> {
  try {
    const previousHintsText = context.previousHints?.length 
      ? `Previous hints given: ${context.previousHints.join(', ')}` 
      : '';

    const prompt = `You are a helpful roofing industry training assistant for Best Roofing Now. 
You are helping a trainee understand the lesson "${context.lessonTitle}" from the module "${context.moduleTitle}".

${context.userQuestion ? `The trainee has asked: "${context.userQuestion}"` : 'The trainee needs a helpful hint about this lesson.'}

${previousHintsText}

Lesson content excerpt:
${context.lessonContent.substring(0, 500)}...

Please provide a helpful, encouraging hint that:
1. Is specific to roofing/construction context
2. Uses simple, everyday language (the trainee may be new to the industry)
3. Is brief (2-3 sentences maximum)
4. Guides them toward understanding without giving away complete answers
5. Relates to real-world roofing scenarios when possible

Respond with just the hint text, no additional formatting.`;

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: "You are a supportive roofing training assistant who provides helpful hints." },
        { role: "user", content: prompt }
      ],
      // temperature: 1.0, // Using default temperature for GPT-5
      max_completion_tokens: 150
    });

    return response.choices[0].message.content || "Think about what you've learned so far and how it applies to real roofing situations.";
  } catch (error) {
    console.error('Error generating hint:', error);
    return "Consider reviewing the key points of this lesson and think about how they apply in practice.";
  }
}

export async function generateQuizHint(question: string, options: string[], moduleContext: string): Promise<string> {
  try {
    const prompt = `You are helping a trainee with a roofing quiz question. 

Module context: ${moduleContext}
Question: ${question}
Options: ${options.join(', ')}

Provide a helpful hint that:
1. Doesn't give away the answer directly
2. Helps them think through the options
3. Uses simple language
4. Is encouraging and supportive
5. Is very brief (1-2 sentences)

Just provide the hint text.`;

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: "You are a supportive quiz assistant." },
        { role: "user", content: prompt }
      ],
      // temperature: 1.0, // Using default temperature for GPT-5
      max_completion_tokens: 100
    });

    return response.choices[0].message.content || "Think carefully about each option and what you've learned.";
  } catch (error) {
    console.error('Error generating quiz hint:', error);
    return "Review the lesson material and think about which option makes the most sense.";
  }
}

export async function explainConcept(concept: string, moduleContext: string): Promise<string> {
  try {
    const prompt = `Explain the roofing/construction concept "${concept}" in simple terms.

Module context: ${moduleContext}

Provide an explanation that:
1. Uses everyday language
2. Includes a practical example from roofing work
3. Is brief but clear (3-4 sentences)
4. Helps a beginner understand

Just provide the explanation.`;

    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: "You are a roofing education expert who explains concepts simply." },
        { role: "user", content: prompt }
      ],
      // temperature: 1.0, // Using default temperature for GPT-5
      max_completion_tokens: 200
    });

    return response.choices[0].message.content || "This concept relates to important roofing practices. Let me know what specific part you'd like to understand better.";
  } catch (error) {
    console.error('Error explaining concept:', error);
    return "This is an important roofing concept. Try breaking it down into smaller parts to understand it better.";
  }
}