import { Router } from 'express';
import { z } from 'zod';
import { OpenAIPlannerService } from '../services/openaiPlanner.js';
import { Veo3Client } from '../services/veo3Client.js';
import { logger } from '../lib/logger.js';
import { JobStore } from '../lib/jobs.js';
import path from 'path';
import { getConfig } from '../lib/config.js';
import { stitchSegmentsToMp4 } from '../services/stitcher.js';

export const router = Router();

const planner = new OpenAIPlannerService();
const veo = new Veo3Client();

const PlanBody = z.object({
  idea: z.string().min(1),
  totalDurationSeconds: z.number().int().positive(),
  segmentDurationSeconds: z.number().int().positive().default(7),
  style: z.string().optional(),
});

router.post('/plan', async (req, res) => {
  try {
    const body = PlanBody.parse(req.body);
    const plan = await planner.createPlan(body);
    res.json(plan);
  } catch (err: any) {
    logger.error({ err }, 'Plan error');
    res.status(400).json({ error: err.message || 'Failed to create plan' });
  }
});

const ProduceBody = z.object({
  plan: z.object({
    title: z.string(),
    synopsis: z.string(),
    segmentDurationSeconds: z.number().int().positive(),
    segments: z.array(
      z.object({
        index: z.number().int(),
        startSeconds: z.number().int(),
        endSeconds: z.number().int(),
        prompt: z.string(),
        script: z.string(),
      })
    ),
  }),
});

router.post('/produce', async (req, res) => {
  try {
    const { plan } = ProduceBody.parse(req.body);
    const job = JobStore.create(plan.title);
    res.json({ jobId: job.id });

    // Fire-and-forget background production
    (async () => {
      JobStore.update(job.id, (j) => (j.status = 'running'));
      try {
        const outputs: { index: number; videoPath: string; jobId: string }[] = [];
        for (const segment of plan.segments) {
          const r = await veo.renderVideoSegment({ prompt: segment.prompt, durationSeconds: plan.segmentDurationSeconds });
          outputs.push({ index: segment.index, videoPath: r.videoPath, jobId: r.jobId });
          JobStore.update(job.id, (j) => {
            j.outputs = [...outputs];
          });
        }

        // Optional stitching if ffmpeg is available
        try {
          const cfg = getConfig();
          const ordered = outputs.sort((a, b) => a.index - b.index).map((o) => o.videoPath);
          const stitched = path.join(cfg.outputDir, job.id, 'final.mp4');
          await stitchSegmentsToMp4(ordered, stitched);
          JobStore.update(job.id, (j) => {
            j.status = 'completed';
            j.stitchedVideoPath = stitched;
          });
        } catch (stitchErr: any) {
          logger.warn({ err: stitchErr }, 'Stitching failed; marking completed without stitched output');
          JobStore.update(job.id, (j) => {
            j.status = 'completed';
          });
        }
      } catch (err: any) {
        logger.error({ err }, 'Background production failed');
        JobStore.update(job.id, (j) => {
          j.status = 'failed';
          j.error = err.message || 'Unknown error';
        });
      }
    })();
  } catch (err: any) {
    logger.error({ err }, 'Produce error');
    res.status(400).json({ error: err.message || 'Failed to produce video' });
  }
});

router.get('/jobs/:id', (req, res) => {
  const job = JobStore.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

export default router;

