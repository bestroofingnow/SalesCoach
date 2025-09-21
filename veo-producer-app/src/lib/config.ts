import { z } from 'zod';
import path from 'path';

const EnvSchema = z.object({
  PORT: z.string().default('3000'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  GOOGLE_CLOUD_PROJECT: z.string().min(1, 'GOOGLE_CLOUD_PROJECT is required'),
  GOOGLE_CLOUD_LOCATION: z.string().default('us-central1'),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().min(1, 'GOOGLE_APPLICATION_CREDENTIALS is required'),
  VEO_MODEL: z.string().default('veo-3.0'),
  OUTPUT_DIR: z.string().default('./outputs'),
});

export type AppConfig = {
  port: number;
  openaiApiKey: string;
  gcpProject: string;
  gcpLocation: string;
  gcpCredentialsPath: string;
  veoModel: string;
  outputDir: string;
};

let cached: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (cached) return cached;
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new Error(`Invalid environment: ${issues}`);
  }
  const env = parsed.data;
  cached = {
    port: Number(env.PORT),
    openaiApiKey: env.OPENAI_API_KEY,
    gcpProject: env.GOOGLE_CLOUD_PROJECT,
    gcpLocation: env.GOOGLE_CLOUD_LOCATION,
    gcpCredentialsPath: path.resolve(env.GOOGLE_APPLICATION_CREDENTIALS),
    veoModel: env.VEO_MODEL,
    outputDir: path.resolve(env.OUTPUT_DIR),
  };
  return cached;
}

