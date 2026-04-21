# 🚀 BCA Assist - Complete Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Testing Locally](#testing-locally)
3. [Deploy to Netlify](#deploy-to-netlify)
4. [Troubleshooting](#troubleshooting)
5. [Performance Optimization](#performance-optimization)

---

## Local Development Setup

### Step 1: Install Node.js
Download and install from https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version  # v18.0.0+
npm --version   # 9.0.0+
```

### Step 2: Clone/Extract Project
```bash
cd /workspaces/VISHAL
```

### Step 3: Install Dependencies
```bash
npm install
```

This installs:
- React 18
- React Icons & Lucide Icons
- Axios for API calls
- Netlify CLI (if needed)
- And more...

### Step 4: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to OpenAI
3. Click "Create new secret key"
4. Copy the key (it's only shown once!)
5. Save it somewhere safe

### Step 5: Setup Environment Variables

Create `.env` file in project root:
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
REACT_APP_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANT**: Never commit `.env` to Git!

### Step 6: Verify Setup

```bash
# Check if files are correct
ls -la src/
ls -la netlify/functions/

# Check Node version
node --version

# Check npm version
npm --version
```

---

## Testing Locally

### Option A: React Dev Server Only
```bash
npm start
```
- Opens at http://localhost:3000
- **Note**: Chat won't work (no backend)
- Good for UI testing

### Option B: With Netlify Functions (Recommended)
```bash
npm run dev
```
- Frontend at http://localhost:3000
- Backend functions at http://localhost:8888
- Full functionality working
- **Best for testing AI chat**

### Test the App

1. **Login Page**
   - Click "Try Demo Account"
   - Or use Admin: `10717vishal@gmail.com` / `Vishal@@2004`

2. **Dashboard**
   - Should show welcome, stats, activity feed
   - Live updates every 8 seconds

3. **Chat Interface**
   - Type a question
   - Should get AI response
   - Try different modes

4. **Attendance**
   - Click calendar days to toggle
   - Data persists in localStorage

5. **Admin Panel** (if logged in as admin)
   - Try adding a study material
   - Edit/delete functionality

### Debug API Issues

If chat not working:

```bash
# Terminal: Check if function is running
npm run dev

# Browser DevTools (F12):
1. Go to Network tab
2. Send a chat message
3. Look for "chat" request
4. Check Response tab for error message

# Or test directly:
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is polymorphism?","mode":"concept"}'
```

---

## Deploy to Netlify

### Step 1: Create Netlify Account
1. Go to https://app.netlify.com
2. Sign up (free tier)
3. Verify email

### Step 2: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 3: Login to Netlify
```bash
netlify login
```
- Opens browser for authentication
- Authorize the CLI

### Step 4: Build the Project
```bash
npm run build
```

Output folder: `build/` folder created with optimized code

### Step 5: Deploy
```bash
netlify deploy --prod
```

Output:
```
✔ Site deployed successfully!
Unique Deploy URL: https://xxxx-xxxxx.netlify.app
Live URL: https://your-site-name.netlify.app
```

**Save the URL!**

### Step 6: Set Environment Variables on Netlify

#### Method A: Netlify Dashboard (GUI)
1. Go to https://app.netlify.com
2. Select your site
3. Site settings → Build & deploy → Environment
4. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-your-api-key-here` (paste your OpenAI API key)
5. Click Save

#### Method B: Netlify CLI
```bash
netlify env:set OPENAI_API_KEY "sk-your-api-key-here"
```

### Step 7: Trigger Redeploy
After setting env vars, redeploy:
```bash
netlify deploy --prod
```

### Step 8: Test Live Site
1. Go to your live URL
2. Try signing in and chatting
3. Verify all features work
4. Check browser console for errors

---

## Docker Deployment (Optional)

### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Step 2: Build and Run
```bash
docker build -t bca-assist .
docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... bca-assist
```

---

## Custom Domain Setup (Optional)

### Point Custom Domain to Netlify
1. Go to your domain registrar
2. Set DNS records:
   - CNAME: `www.yourdomain.com` → `your-site.netlify.app`
   - A record: `yourdomain.com` → Netlify's IP

3. Go to Netlify Site settings
4. Add your domain

### SSL Certificate
Netlify auto-generates free SSL certificate (Let's Encrypt)

---

## Troubleshooting

### Issue: "API key not configured"

**Solution:**
```bash
# Local:
1. Check .env file exists
2. Verify REACT_APP_OPENAI_API_KEY is there
3. Restart: npm run dev

# Netlify:
1. Go to Site settings → Environment
2. Verify OPENAI_API_KEY is set
3. Redeploy: netlify deploy --prod
```

### Issue: "Invalid API key format"

**Solution:**
```bash
# OpenAI keys start with sk-
# Should look like: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# Get a new one if uncertain:
1. Go to https://platform.openai.com/api-keys
2. Revoke old key if needed
3. Create new key
4. Copy and paste exactly
```

### Issue: "Quota exceeded" or "Rate limit"

**Solution:**
- Your API key has no remaining balance
- Or you're calling API too frequently
- Check usage: https://platform.openai.com/account/usage/overview
- Top up your account at https://platform.openai.com/account/billing/overview

### Issue: Chat works locally but not on Netlify

**Solution:**
```bash
# Most common: Missing env var
1. Verify OPENAI_API_KEY is in Netlify env
2. Check it's EXACTLY "OPENAI_API_KEY" (no REACT_APP_ prefix)
3. Redeploy after setting env var

# Check logs:
netlify log
```

### Issue: Build fails on Netlify

**Solution:**
```bash
# Build locally first to catch errors
npm run build

# If it fails locally, fix before pushing
# Common issues:
# 1. Missing npm install
# 2. Syntax errors in JavaScript
# 3. Missing dependencies in package.json

# After fixing, retry:
netlify deploy --prod
```

### Issue: Site loads but chat is very slow

**Solution:**
- OpenAI API is slow
- Check your rate limits
- Consider using faster model: `gpt-3.5-turbo` (already configured)
- Upgrade plan for more requests/second

---

## Performance Optimization

### 1. Image Optimization
```bash
# Optimize images before deploying
# Use tools like:
# - ImageOptim (Mac)
# - Squoosh (online)
# - TinyPNG (online)
```

### 2. Code Splitting
Already configured in Create React App

### 3. Caching
```bash
# Netlify automatically caches:
# - HTML (revalidated)
# - CSS/JS (long-term cache)
# - Images (long-term cache)
```

### 4. Monitor Performance
```bash
# Netlify Insights
# 1. Go to Site analytics
# 2. Check Core Web Vitals
# 3. Monitor API response times

# Google PageSpeed
# 1. Go to https://pagespeed.web.dev
# 2. Enter your URL
# 3. Check scores
```

### 5. Database (Future Enhancement)
Currently uses localStorage. To add database:
```bash
# Install Firebase
npm install firebase

# Or use Supabase:
npm install @supabase/supabase-js

# Replace localStorage calls with database calls
```

---

## Monitoring & Maintenance

### Setup Alerts
```bash
# Netlify alerts
1. Site settings → Deploy notifications
2. Add Slack/email notifications
3. Get alerts on failures
```

### Regular Checks
- [ ] API key balance
- [ ] Function logs for errors
- [ ] Performance metrics
- [ ] Security updates

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update safely
npm update

# Update specific package
npm install react@latest
```

---

## Scaling for More Students

### Current Limits
- Plan: Netlify free tier
- Functions: 125,000 requests/month
- Build minutes: 300/month
- OpenAI: Based on your plan

### Scale Up
1. **Upgrade Netlify** → Pro ($19/month)
2. **Upgrade OpenAI** → Pay-as-you-go
3. **Add Database** → Firebase or Supabase
4. **Add Cache** → Redis or Cloudflare
5. **Load Testing** → K6 or Apache JMeter

---

## Going Live - Checklist

- [ ] Changed admin credentials
- [ ] Set OPENAI_API_KEY on Netlify
- [ ] Tested all features locally
- [ ] Tested chat AI functionality
- [ ] Verified attendance tracker works
- [ ] Checked mobile responsiveness
- [ ] Deployed to Netlify
- [ ] Tested on live URL
- [ ] Added custom domain (optional)
- [ ] Set up monitoring/alerts
- [ ] Shared with students!

---

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **React Docs**: https://react.dev
- **OpenAI API**: https://platform.openai.com/docs
- **GitHub Issues**: Check project repo

---

**Deployed Successfully? 🎉 Time to help students learn!**

---

## Quick Reference Commands

```bash
# Development
npm start                   # React dev server only
npm run dev               # With Netlify Functions
npm run build             # Build for production

# Deployment
netlify login             # Authenticate
netlify deploy --prod     # Deploy to production
netlify env:set KEY VAL   # Set environment variable
netlify log              # View function logs

# Debugging
npm test                 # Run tests (if configured)
npm run eject            # Eject from create-react-app (not reversible!)

# Testing
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","mode":"concept"}'
```

---

**Happy Deploying! 🚀**
