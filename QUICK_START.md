# ⚡ QUICK START - 5 Minutes to Launch

## 1️⃣ Copy Template (10 seconds)
```bash
cp .env.template .env
```

## 2️⃣ Generate JWT Secret (10 seconds)
```bash
openssl rand -hex 32
```
**Copy the output!**

## 3️⃣ Get API Keys (5 minutes)
- **Database**: https://neon.tech (free signup)
- **OpenAI**: https://platform.openai.com/api-keys ($5 free)
- **VAPI**: https://vapi.ai/dashboard (free trial)

## 4️⃣ Edit .env File (2 minutes)
```bash
nano .env
```
Paste your values:
- `DATABASE_URL` = (from Neon)
- `JWT_SECRET` = (from step 2)
- `OPENAI_API_KEY` = (from OpenAI)
- `VAPI_API_KEY` = (from VAPI)

Save: `Ctrl+X`, `Y`, `Enter`

## 5️⃣ Install & Setup (2 minutes)
```bash
npm install
npm run db:push
```

## 6️⃣ Launch! (immediate)
```bash
npm run dev
```

## 7️⃣ Open Browser
```
http://localhost:5000
```

## 🎉 Done!

**Default Login**:
- Email: `admin@salescoach.com`
- Password: `admin123`

---

## 🆘 Problems?

**Error: Missing environment variables**
- Check `.env` file exists
- Verify all 4 required values are set

**Error: Cannot connect to database**
- Check DATABASE_URL is correct
- Add `?sslmode=require` at the end

**Still stuck?**
- Read full guide: **WALKTHROUGH.md**
- Check: **LAUNCH_GUIDE.md**

---

## 📚 Files to Read

**For launching**:
1. ✅ **WALKTHROUGH.md** ← Detailed step-by-step
2. **QUICK_START.md** ← This file (super simple)
3. **.env.template** ← Environment variables

**For later**:
- **PWA_GUIDE.md** ← Make it installable on mobile
- **DEPLOYMENT.md** ← Deploy to production
- **SECURITY.md** ← Security features

---

## 🚀 Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push          # Update database schema
npm run db:studio        # Open database GUI

# Production
npm run build            # Build for production
npm start                # Start production server

# Checks
npm run check            # TypeScript check
npm audit                # Security check
```

---

**Need detailed walkthrough?** → Read **WALKTHROUGH.md**

**Ready in 5 minutes!** 🎯
