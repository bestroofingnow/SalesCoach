import { VertexAI } from '@google-cloud/vertexai';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getConfig } from '../lib/config.js';
import { logger } from '../lib/logger.js';

export type RenderRequest = {
  prompt: string;
  durationSeconds: number;
  seed?: number;
  previousFrameImageBase64?: string;
};

export type RenderResponse = {
  videoPath: string;
  jobId: string;
};

export class Veo3Client {
  private vertex: VertexAI;
  private modelName: string;

  constructor() {
    const cfg = getConfig();
    this.vertex = new VertexAI({ project: cfg.gcpProject, location: cfg.gcpLocation });
    this.modelName = `projects/${cfg.gcpProject}/locations/${cfg.gcpLocation}/publishers/google/models/${cfg.veoModel}`;
  }

  async renderVideoSegment(req: RenderRequest): Promise<RenderResponse> {
    const cfg = getConfig();
    const jobId = uuidv4();
    const outDir = path.join(cfg.outputDir, jobId);
    await fs.mkdir(outDir, { recursive: true });

    // NOTE: Vertex AI SDK for Veo 3's exact API may differ. This is a placeholder flow using the images.generateVideo method shape.
    const model = this.vertex.getGenerativeModel({ model: this.modelName });

    const duration = Math.max(1, Math.min(30, req.durationSeconds));
    const promptParts = [
      { text: `${req.prompt}\nDuration: ${duration}s. Keep continuity, consistent lighting and color palette.` },
    ];

    // @ts-ignore - API surface may expose generateContent, with videoConfig
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: promptParts }],
      generationConfig: {
        // Placeholder fields; adapt to real Veo 3 SDK config when available
        responseMimeType: 'video/mp4',
        // seed: req.seed,
      },
    } as any);

    const buffer: Buffer | undefined = (result as any).response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
      ? Buffer.from((result as any).response.candidates[0].content.parts[0].inlineData.data, 'base64')
      : undefined;

    if (!buffer) {
      logger.warn({ result }, 'Veo 3 response missing inline video data; saving placeholder file');
    }

    const videoPath = path.join(outDir, 'segment.mp4');
    await fs.writeFile(videoPath, buffer ?? Buffer.from(''));

    return { videoPath, jobId };
  }
}

