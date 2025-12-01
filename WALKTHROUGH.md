# 🎯 COMPLETE STEP-BY-STEP LAUNCH GUIDE

## Let's get your SalesCoach app running! Follow each step carefully.

---

## ✅ STEP 1: Copy the .env Template

Open your terminal in the SalesCoach directory and run:

```bash
cp .env.template .env
```

Or if you prefer, manually:
1. Copy the file `.env.template`
2. Rename the copy to `.env`

**Important**: The file must be named exactly `.env` (with the dot at the start, no extension)

---

## ✅ STEP 2: Generate Your JWT Secret

This is your authentication security key. **Never share this!**

### On Mac/Linux/Replit:
```bash
openssl rand -hex 32
```

### On Windows (PowerShell):
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

### Or use an online generator:
Visit: https://generate-secret.vercel.app/32

**Copy the generated value** - you'll need it in Step 4!

Example output: `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`

---

## ✅ STEP 3: Get Your Database URL

### Option A: Using Neon (Free PostgreSQL - Recommended)

1. **Go to**: https://neon.tech
2. **Sign up** for free account
3. **Create new project**:
   - Name: `salescoach`
   - Region: Choose closest to you
   - PostgreSQL version: 16 (default)
4. **Copy connection string**:
   - Click "Connection string"
   - Copy the string (looks like: `postgresql://user:pass@host.neon.tech/salescoach`)
   - **Important**: Make sure it includes `?sslmode=require` at the end

**Example**:
```
postgresql://myuser:abc123@ep-cool-project-123456.us-east-2.aws.neon.tech/salescoach?sslmode=require
```

### Option B: Using Replit PostgreSQL

If you're on Replit:
1. Go to "Tools" → "Database"
2. Create PostgreSQL database
3. Copy the connection string
4. In Replit, set as Secret (Tools → Secrets)
   - Key: `DATABASE_URL`
   - Value: (paste connection string)

---

## ✅ STEP 4: Get Your OpenAI API Key

OpenAI powers the AI chat and hint features.

1. **Go to**: https://platform.openai.com/signup
2. **Sign up** or log in
3. **Add payment method** (required, but free tier available):
   - Click your profile → Billing
   - Add credit card
   - Add $5-$10 to start (you get $5 free on new accounts)
4. **Create API key**:
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Name it: `SalesCoach`
   - Copy the key (starts with `sk-`)
   - **Save it now** - you can't see it again!

**Example**: `sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz`

**Cost**: About $0.002 per chat message (very cheap!)

---

## ✅ STEP 5: Get Your VAPI API Key

VAPI powers the voice training features.

1. **Go to**: https://vapi.ai
2. **Sign up** for account
3. **Verify email**
4. **Go to Dashboard**: https://vapi.ai/dashboard
5. **Copy API key**:
   - Look for "API Keys" section
   - Copy your key (or create new one)
6. **Free trial**: Includes free minutes to test

**Example**: `abcd1234-ef56-78gh-90ij-klmnopqrstuv`

**Cost**: $0.05-$0.10 per minute of voice calls (free trial available)

---

## ✅ STEP 6: Fill in Your .env File

Now open your `.env` file and fill in all the values:

### Open the file:
```bash
# Mac/Linux
nano .env

# Or use your code editor
code .env
# or
vim .env
```

### Edit these lines with your actual values:

```env
# Replace this line:
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:5432/salescoach

# With your actual Neon database URL:
DATABASE_URL=postgresql://myuser:abc123@ep-cool-project-123456.us-east-2.aws.neon.tech/salescoach?sslmode=require

# Replace this line:
JWT_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE

# With your generated secret from Step 2:
JWT_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# Replace this line:
OPENAI_API_KEY=sk-YOUR_OPENAI_API_KEY_HERE

# With your actual OpenAI key:
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz

# Replace this line:
VAPI_API_KEY=YOUR_VAPI_API_KEY_HERE

# With your actual VAPI key:
VAPI_API_KEY=abcd1234-ef56-78gh-90ij-klmnopqrstuv
```

### Save the file:
- Nano: Press `Ctrl+X`, then `Y`, then `Enter`
- Vim: Press `Esc`, type `:wq`, press `Enter`
- VS Code: Press `Ctrl+S` (or `Cmd+S` on Mac)

---

## ✅ STEP 7: Install Dependencies

Make sure you have Node.js installed (version 20+):

```bash
# Check Node version
node --version
# Should show: v20.x.x or higher

# Install all dependencies
npm install
```

This will take 1-2 minutes.

---

## ✅ STEP 8: Setup Database

Now we'll create all the database tables:

```bash
npm run db:push
```

You should see:
```
✅ Schema pushed to database successfully!
```

If you see errors, check:
- Is your DATABASE_URL correct?
- Can you connect to your database?
- Did you include `?sslmode=require` for Neon?

---

## ✅ STEP 9: Launch the App!

### Start development server:
```bash
npm run dev
```

You should see:
```
✅ Environment variables validated successfully
   - Environment: development
   - Database: Configured
   - JWT Secret: Set

serving on port 5000
```

---

## ✅ STEP 10: Open in Browser

Open your browser and go to:

```
http://localhost:5000
```

You should see the **SalesCoach login page**! 🎉

---

## 🔐 Default Login

The database initialization creates a default super admin user.

Check the terminal output or use these default credentials:

**Email**: `admin@salescoach.com`
**Password**: `admin123`

**⚠️ IMPORTANT**: Change this password immediately after first login!

---

## ✅ Success Checklist

You should now have:

- [ ] `.env` file created and filled in
- [ ] All dependencies installed (`npm install`)
- [ ] Database tables created (`npm run db:push`)
- [ ] App running (`npm run dev`)
- [ ] Login page visible at http://localhost:5000
- [ ] Can log in with default credentials

---

## 🎉 You're Live!

Your SalesCoach app is now running! Here's what you can do next:

### Immediate Next Steps:
1. **Log in** with default credentials
2. **Change admin password** in Profile settings
3. **Create your company profile**
4. **Add your first user**
5. **Test the voice training** (VAPI integration)
6. **Try the AI chat** (OpenAI integration)

### For Production Deployment:
1. **Generate PWA icons** (see ICONS_SETUP.md)
2. **Set NODE_ENV=production** in .env
3. **Enable HTTPS**
4. **Follow DEPLOYMENT.md** for full deployment guide

---

## 🆘 Troubleshooting

### "Missing required environment variables"
**Fix**:
- Check `.env` file exists in project root
- Verify `DATABASE_URL` and `JWT_SECRET` are set
- No spaces around the `=` sign
- No quotes around values (unless they contain spaces)

### "Cannot connect to database"
**Fix**:
- Check DATABASE_URL is correct
- Test connection: `psql $DATABASE_URL`
- For Neon: Make sure `?sslmode=require` is at the end
- Check database server is running

### "VAPI features not working"
**Fix**:
- Verify `VAPI_API_KEY` is set in .env
- Check you have free minutes at https://vapi.ai/dashboard
- Restart server after adding key

### "AI chat not responding"
**Fix**:
- Verify `OPENAI_API_KEY` is set in .env
- Check you have credits at https://platform.openai.com/usage
- Restart server after adding key

### Port 5000 already in use
**Fix**:
```bash
# Change PORT in .env
PORT=3000

# Or kill the process using port 5000
# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### App won't start
**Fix**:
1. Check terminal for errors
2. Verify Node.js version: `node --version` (needs 20+)
3. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
4. Check all environment variables are set

---

## 📞 Need More Help?

### Check Documentation:
- **LAUNCH_GUIDE.md** - This guide in detail
- **PWA_GUIDE.md** - PWA features
- **DEPLOYMENT.md** - Production deployment
- **SECURITY.md** - Security features
- **.env.example** - All environment variables

### Common Commands:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check TypeScript errors
npm run check

# Update database schema
npm run db:push

# Open database GUI
npm run db:studio
```

---

## 🎯 Quick Reference

**Database**: Neon.tech (free) or Replit PostgreSQL
**AI Chat**: OpenAI (~$0.002/message)
**Voice Training**: VAPI (~$0.05-0.10/minute)
**Port**: 5000 (or set in .env)
**Default Login**: admin@salescoach.com / admin123

---

## ✨ You're All Set!

Your SalesCoach training platform is now running locally. Test all features, then follow DEPLOYMENT.md to go live!

Happy coaching! 🚀
