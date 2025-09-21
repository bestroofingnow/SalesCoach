import { v4 as uuidv4 } from 'uuid';

export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export type SegmentOutput = { index: number; videoPath: string; jobId: string };

export type JobRecord = {
  id: string;
  status: JobStatus;
  error?: string;
  planTitle?: string;
  outputs: SegmentOutput[];
  stitchedVideoPath?: string;
  createdAt: number;
  updatedAt: number;
};

class InMemoryJobStore {
  private jobs = new Map<string, JobRecord>();

  create(planTitle?: string): JobRecord {
    const id = uuidv4();
    const now = Date.now();
    const recordBase: Omit<JobRecord, 'planTitle'> = { id, status: 'pending', outputs: [], createdAt: now, updatedAt: now };
    const record: JobRecord = planTitle ? { ...recordBase, planTitle } : recordBase;
    this.jobs.set(id, record);
    return record;
  }

  get(id: string): JobRecord | undefined {
    return this.jobs.get(id);
  }

  update(id: string, updater: (j: JobRecord) => void): JobRecord | undefined {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    updater(job);
    job.updatedAt = Date.now();
    this.jobs.set(id, job);
    return job;
  }
}

export const JobStore = new InMemoryJobStore();

