import pino from 'pino';

export const logger = pino({
  name: 'veo-producer-app',
  level: process.env.LOG_LEVEL || 'info',
});

