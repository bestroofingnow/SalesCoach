import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { logger } from '../lib/logger.js';

export async function stitchSegmentsToMp4(videoPaths: string[], outputPath: string): Promise<string> {
  // Create a concat list file as required by ffmpeg concat demuxer
  const listContent = videoPaths.map((p) => `file '${p.replace(/'/g, "'\\''")}'`).join('\n');
  const listPath = path.join(path.dirname(outputPath), 'concat.txt');
  await fs.writeFile(listPath, listContent, 'utf8');

  await new Promise<void>((resolve, reject) => {
    const args = ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c', 'copy', outputPath];
    const proc = spawn('ffmpeg', args, { stdio: 'inherit' });
    proc.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
    proc.on('error', (err) => reject(err));
  });

  logger.info({ outputPath }, 'Stitched video created');
  return outputPath;
}

