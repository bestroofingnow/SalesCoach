# SalesCoach - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Configuration

- [ ] Copy `.env.example` to `.env`
- [ ] Set all required environment variables:
  - [ ] `DATABASE_URL` - PostgreSQL connection string
  - [ ] `JWT_SECRET` - Generate with: `openssl rand -hex 32`
  - [ ] `OPENAI_API_KEY` - OpenAI API key for AI features
  - [ ] `VAPI_API_KEY` - VAPI.ai key for voice training
  - [ ] `PUBLIC_OBJECT_SEARCH_PATHS` - Google Cloud Storage paths
  - [ ] `PRIVATE_OBJECT_DIR` - Private storage directory
  - [ ] `NODE_ENV` - Set to `production`
  - [ ] `ALLOWED_ORIGINS` - Comma-separated list of allowed domains
  - [ ] `PORT` - (Optional) Default is 5000

### 2. Database Setup

```bash
# Push database schema
npm run db:push

# Or use migrations (recommended for production)
npm run db:generate
npm run db:migrate
```

### 3. Security Review

- [ ] JWT_SECRET is at least 32 characters long
- [ ] DATABASE_URL uses SSL connection (`?sslmode=require`)
- [ ] `.env` file is in `.gitignore`
- [ ] No sensitive data in code or committed files
- [ ] CORS `ALLOWED_ORIGINS` is properly configured for production
- [ ] Rate limiting is enabled (configured in `server/index.ts`)

### 4. Dependencies & Build

```bash
# Install dependencies
npm install

# Run type checking
npm run check

# Build for production
npm run build
```

### 5. Testing

- [ ] Test database connection
- [ ] Test authentication flow (login/logout)
- [ ] Test API endpoints
- [ ] Test file upload functionality
- [ ] Test VAPI voice training integration
- [ ] Test OpenAI chat functionality
- [ ] Verify rate limiting works
- [ ] Check error handling

## Deployment Steps

### Option 1: Replit Deployment (Recommended for this setup)

1. **Configure Secrets in Replit**
   - Go to Tools → Secrets
   - Add all environment variables from `.env.example`

2. **Configure Deployment**
   - The `.replit` file is already configured
   - Click "Deploy" button in Replit

3. **Database Setup**
   ```bash
   npm run db:push
   ```

4. **Verify Deployment**
   - Check logs for successful startup
   - Test authentication
   - Verify database connection

### Option 2: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t salescoach .
docker run -p 5000:5000 --env-file .env salescoach
```

### Option 3: Cloud Platform (AWS, GCP, Azure, Heroku)

1. **Set Environment Variables**
   - Use platform's environment variable management
   - Never commit `.env` to repository

2. **Database**
   - Use managed PostgreSQL service (RDS, Cloud SQL, etc.)
   - Enable SSL connections

3. **Build Command**: `npm run build`
4. **Start Command**: `npm start`
5. **Port**: 5000 (or use PORT env var)

## Post-Deployment

### 1. Health Checks

Create health check endpoint (already available):
- `GET /api/health` - Should return 200 OK

### 2. Monitoring

Monitor these metrics:
- Response times
- Error rates (check logs for `[ERROR]` entries)
- Database connection pool
- Memory usage
- API rate limit violations

### 3. Backup Strategy

- [ ] Regular database backups (hourly recommended)
- [ ] Object storage backups
- [ ] Environment variable backups (secure location)

### 4. Security Hardening

- [ ] Enable database audit logging
- [ ] Set up firewall rules
- [ ] Enable HTTPS/SSL (Let's Encrypt recommended)
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and alerting
- [ ] Regular security audits (`npm audit`)

### 5. Performance Optimization

- [ ] Enable database connection pooling (already configured)
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression (Helmet does this)
- [ ] Optimize images and videos
- [ ] Set up database indices (review `shared/schema.ts`)

## Scaling Considerations

### Horizontal Scaling

The application is stateless and can be horizontally scaled:
- Use load balancer (nginx, AWS ALB, etc.)
- Ensure DATABASE_URL points to same database
- Share object storage across instances

### Database Scaling

- Use connection pooling (already implemented)
- Consider read replicas for heavy read loads
- Use database indices for frequently queried fields

### Caching Strategy

Consider adding Redis for:
- Session storage
- API response caching
- Rate limiting (distributed)

## Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Check `.env` file exists
   - Verify all required variables are set
   - Check for typos in variable names

2. **Database connection failed**
   - Verify DATABASE_URL format
   - Check database server is running
   - Verify SSL mode if required
   - Check firewall rules

3. **JWT token errors**
   - Ensure JWT_SECRET is consistent across instances
   - Check token expiration (7 days default)
   - Verify client is sending token in Authorization header

4. **Rate limit errors**
   - Check client IP
   - Adjust rate limits in `server/index.ts` if needed
   - Consider implementing IP whitelist

5. **CORS errors**
   - Verify ALLOWED_ORIGINS in production
   - Check request origin matches allowed list
   - Ensure credentials are properly configured

## Rollback Plan

1. Keep previous version deployed
2. Tag releases in git: `git tag v1.0.0`
3. Quick rollback:
   ```bash
   git checkout v1.0.0
   npm install
   npm run build
   npm start
   ```

## Support Contacts

- Technical Lead: [Your Contact]
- DevOps Team: [Team Contact]
- Database Admin: [DBA Contact]

## Additional Resources

- Application Documentation: `/replit.md`
- API Documentation: Check routes in `server/routes.ts`
- Database Schema: `shared/schema.ts`
- Environment Variables: `.env.example`

---

## Quick Deploy Commands

```bash
# Complete deployment from scratch
git pull
npm install
npm run check
npm run build
npm run db:push
npm start

# Update existing deployment
git pull
npm install
npm run build
pm2 restart salescoach  # or your process manager
```

## Emergency Contacts

- On-call Engineer: [Phone/Email]
- Platform Status: [Status Page URL]
- Incident Response: [Runbook URL]
