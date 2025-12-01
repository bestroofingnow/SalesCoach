# 🚀 Quick Launch Guide - SalesCoach

## Yes, You Need a .env File!

The application **will not start** without a properly configured `.env` file. Here's how to set it up:

---

## Step 1: Create Your .env File (2 minutes)

```bash
# Copy the example file
cp .env.example .env
```

## Step 2: Get Your API Keys

### Required API Keys:

1. **DATABASE_URL** (PostgreSQL Database)
   - If using Replit: Use Replit's PostgreSQL database
   - If external: Get from Neon, Supabase, or your hosting provider
   - Format: `postgresql://username:password@host:port/database`

2. **JWT_SECRET** (Authentication)
   ```bash
   # Generate a secure secret (32+ characters)
   openssl rand -hex 32
   ```
   Copy the output and use it as your JWT_SECRET

3. **OPENAI_API_KEY** (AI Chat Features)
   - Get from: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Format: `sk-...`

4. **VAPI_API_KEY** (Voice Training)
   - Get from: https://vapi.ai/dashboard
   - Sign up if you don't have an account
   - Copy your API key

### Optional (but recommended for full features):

5. **Google Cloud Storage** (File uploads)
   - `PUBLIC_OBJECT_SEARCH_PATHS` - For public files
   - `PRIVATE_OBJECT_DIR` - For private uploads
   - Can skip initially and add later

---

## Step 3: Configure Your .env File

Open `.env` and fill in your values:

```env
# NODE ENVIRONMENT
NODE_ENV=development
PORT=5000

# DATABASE (Required)
DATABASE_URL=postgresql://your-username:your-password@your-host:5432/salescoach

# SECURITY (Required)
JWT_SECRET=your-generated-32-character-secret-from-openssl

# AI SERVICES (Required for features)
OPENAI_API_KEY=sk-your-openai-api-key-here
VAPI_API_KEY=your-vapi-api-key-here

# OBJECT STORAGE (Optional - can add later)
# PUBLIC_OBJECT_SEARCH_PATHS=gs://your-bucket-name/public
# PRIVATE_OBJECT_DIR=gs://your-bucket-name/private

# CORS (Only for production)
# ALLOWED_ORIGINS=https://yourdomain.com
```

---

## Step 4: Setup Database (1 minute)

```bash
# Install dependencies if you haven't
npm install

# Push database schema
npm run db:push
```

You should see: ✅ Tables created successfully

---

## Step 5: Launch the Application

### Development Mode (with hot reload):
```bash
npm run dev
```

Your app will start at: **http://localhost:5000**

### Production Mode:
```bash
# Build first
npm run build

# Then start
npm start
```

---

## Step 6: Access the Application

1. Open browser to: **http://localhost:5000**
2. You should see the login page
3. First-time setup:
   - The database initialization will create a default super admin
   - Check your terminal for default credentials
   - Or check `server/init-db.ts` for initial user setup

---

## 🆘 Troubleshooting

### "Missing required environment variables"
- **Fix**: Make sure `.env` file exists and has all required values
- Check: `DATABASE_URL`, `JWT_SECRET` are set

### "Cannot connect to database"
- **Fix**: Verify `DATABASE_URL` is correct
- Test connection string format
- Check database is running

### "VAPI features not working"
- **Fix**: Set `VAPI_API_KEY` in `.env`
- Verify API key is valid at https://vapi.ai/dashboard

### "AI chat not responding"
- **Fix**: Set `OPENAI_API_KEY` in `.env`
- Check you have credits at https://platform.openai.com/usage

### Port 5000 already in use
```bash
# Change PORT in .env
PORT=3000

# Then restart
npm run dev
```

---

## 📱 PWA Installation (Coming Soon)

Once I finish the PWA setup, you'll be able to:
- Install on mobile devices (iOS/Android)
- Install on desktop (Chrome, Edge, etc.)
- Use offline
- Get app icon on home screen

---

## 🔑 Where to Get API Keys - Quick Links

| Service | Get Key From | Cost |
|---------|--------------|------|
| PostgreSQL | [Neon.tech](https://neon.tech) (Free tier) | Free |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | Pay as you go (~$0.002/request) |
| VAPI | [vapi.ai/dashboard](https://vapi.ai/dashboard) | Free trial, then paid |

---

## 🎯 Minimum Setup to Start

**Just want to test?** Minimum requirements:

1. **Database**: `DATABASE_URL`
2. **Security**: `JWT_SECRET`
3. **Optional**: Skip OPENAI and VAPI initially (features won't work but app will run)

```bash
# Minimal .env
DATABASE_URL=postgresql://...
JWT_SECRET=<generate-with-openssl>
NODE_ENV=development
PORT=5000
```

Then: `npm run db:push && npm run dev`

---

## ✅ You're Ready When...

- [ ] `.env` file created with values
- [ ] Database connected (`npm run db:push` works)
- [ ] App starts without errors (`npm run dev`)
- [ ] Can access http://localhost:5000
- [ ] Can see login page

---

## 🚀 Next Steps After Launch

1. Test login with default credentials
2. Create your company profile
3. Add users
4. Configure VAPI agent for voice training
5. Upload training content
6. Customize company branding

---

## 💡 Pro Tips

**Using Replit?**
- Database URL is automatically set
- Just add API keys as Secrets
- Click "Run" button

**Local Development?**
- Use [Neon.tech](https://neon.tech) for free PostgreSQL
- Get OpenAI credits ($5 free trial)
- VAPI has free trial minutes

**Production?**
- Set `NODE_ENV=production`
- Use strong JWT_SECRET (32+ chars)
- Enable SSL on database
- Set ALLOWED_ORIGINS for CORS

---

Need help? Check:
- `DEPLOYMENT.md` - Full deployment guide
- `SECURITY.md` - Security setup
- `.env.example` - All variables explained

Let's get you launched! 🎉
