import 'dotenv/config';
import express from 'express';
import pino from 'pino';
import { router as apiRouter } from './routes/api.js';
import { getConfig } from './lib/config.js';

const logger = pino({ name: 'veo-producer-app', level: process.env.LOG_LEVEL || 'info' });

async function main() {
  const app = express();
  const config = getConfig();

  app.use(express.json({ limit: '2mb' }));
  app.use('/api', apiRouter);

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(config.port, () => {
    logger.info({ port: config.port }, 'Server listening');
  });
}

main().catch((err) => {
  logger.error({ err }, 'Fatal error');
  process.exit(1);
});

