import OpenAI from 'openai';
import { z } from 'zod';
import { getConfig } from '../lib/config.js';

export type Segment = {
  index: number;
  startSeconds: number;
  endSeconds: number;
  prompt: string;
  script: string;
};

export type Plan = {
  title: string;
  synopsis: string;
  segmentDurationSeconds: number;
  segments: Segment[];
};

const PlanInputSchema = z.object({
  idea: z.string().min(1),
  totalDurationSeconds: z.number().int().positive(),
  segmentDurationSeconds: z.number().int().positive().default(7),
  style: z.string().optional(),
});

export type PlanInput = z.infer<typeof PlanInputSchema>;

export class OpenAIPlannerService {
  private client: OpenAI;

  constructor() {
    const config = getConfig();
    this.client = new OpenAI({ apiKey: config.openaiApiKey });
  }

  async createPlan(input: PlanInput): Promise<Plan> {
    const { idea, totalDurationSeconds, segmentDurationSeconds, style } = PlanInputSchema.parse(input);
    const numSegments = Math.ceil(totalDurationSeconds / segmentDurationSeconds);

    const system = [
      'You are a veteran video producer. Create a cohesive short video plan.',
      'Break the video into fixed-length segments. For each segment provide:',
      '- concise visual prompt for a video gen model',
      '- 1-2 sentence voiceover script',
      'Maintain continuity of subjects, lighting, color palette, and camera language.',
      'Return strict JSON matching the provided schema.',
    ].join('\n');

    const user = {
      idea,
      style: style ?? 'cinematic, cohesive, modern',
      segmentDurationSeconds,
      numSegments,
    };

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini-2024-07-18',
      temperature: 0.8,
      messages: [
        { role: 'system', content: system },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: [
                'Create a video plan JSON with the following schema:',
                '{',
                '  "title": string,',
                '  "synopsis": string,',
                '  "segmentDurationSeconds": number,',
                '  "segments": [',
                '    { "index": number, "startSeconds": number, "endSeconds": number, "prompt": string, "script": string }',
                '  ]',
                '}',
                '',
                `Input: ${JSON.stringify(user)}`,
              ].join('\n'),
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('No content from OpenAI');
    const parsed = JSON.parse(content);

    const SegmentSchema = z.object({
      index: z.number().int().nonnegative(),
      startSeconds: z.number().int().nonnegative(),
      endSeconds: z.number().int().positive(),
      prompt: z.string().min(1),
      script: z.string().min(1),
    });

    const PlanSchema = z.object({
      title: z.string().min(1),
      synopsis: z.string().min(1),
      segmentDurationSeconds: z.number().int().positive(),
      segments: z.array(SegmentSchema).min(1),
    });

    const validated = PlanSchema.parse(parsed);
    return validated as Plan;
  }
}

