# 📚 BCA Assist - Quick Setup Guide

## First Time Setup (5 minutes)

### Step 1: Get OpenAI API Key
```
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with sk-)
```

### Step 2: Add API Key to .env
```bash
# Edit .env file in project root
REACT_APP_OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 3: Install & Run
```bash
npm install
npm run dev
```

Visit: http://localhost:3000

---

## 🔑 Login Credentials

### Admin Login
```
Email:    10717vishal@gmail.com
Password: Vishal@@2004
```

### Demo Student
```
Click: "Try Demo Account" button
```

---

## 🚀 Deploy to Netlify

### One-Time Setup
```bash
npm install -g netlify-cli
netlify login
```

### Deploy
```bash
npm run build
netlify deploy --prod
```

### Add API Key to Netlify
```
Netlify Dashboard → Site Settings → Environment
Add: OPENAI_API_KEY = sk-your-key
```

Then redeploy:
```bash
netlify deploy --prod
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Your API keys (NEVER commit) |
| `src/App.js` | Main app logic |
| `src/App.css` | All styling (glassmorphism) |
| `netlify/functions/chat.js` | AI backend |
| `src/pages/ChatInterface.js` | Chat UI |
| `package.json` | Dependencies |

---

## 🆘 Common Issues

### Chat Not Working?
1. Check `.env` has API key
2. Restart with `npm run dev`
3. Check browser console (F12) for errors
4. Verify API key on OpenAI website

### Admin Login Failed?
```bash
# Clear browser data and try again
localStorage.clear()
# Then refresh page
```

### Deployment Failed?
```bash
# Build locally first
npm run build

# If build fails, fix errors before deploying
# Then try again:
netlify deploy --prod
```

---

## 📞 Need Help?

1. **Netlify Docs**: https://docs.netlify.com
2. **OpenAI API Issues**: Check https://status.openai.com
3. **React Questions**: https://react.dev
4. **Check logs locally**: `npm run dev` in terminal

---

## ✨ Features at a Glance

✅ AI Chat with 4 study modes
✅ Dashboard with stats
✅ Attendance tracker
✅ Live activity feed
✅ Admin panel
✅ Beautiful glassmorphism UI
✅ Fully responsive

---

## 🎯 Next Steps

1. Add your OpenAI API key to `.env`
2. Run `npm run dev`
3. Log in with demo account
4. Test chat with AI
5. Deploy to Netlify when ready!

---

**Ready to launch? Let's go! 🚀**
