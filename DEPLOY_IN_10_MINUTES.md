# ⚡ DEPLOY IN 10 MINUTES - ONE PAGE GUIDE

**Everything you need to go live. Fast.**

---

## 🎯 OVERVIEW

```
Get API Key (1 min)
     ↓
Push to GitHub (2 min)
     ↓
Connect Netlify (2 min)
     ↓
Set Environment Variable (2 min)
     ↓
Verify Works (3 min)
     ↓
🎉 LIVE!
```

**Total: ~10 minutes**

---

## 1️⃣ GET OPENAI API KEY (1 min)

1. Go to: **https://platform.openai.com/api-keys**
2. Sign in to OpenAI account
3. Click **"Create new secret key"**
4. Copy key (starts with `sk-`)
5. Save it somewhere safe

**Format:** `sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx...`

---

## 2️⃣ PUSH TO GITHUB (2 min)

```bash
git add -A
git commit -m "BCA Assist - Ready for deployment"
git push origin main
```

---

## 3️⃣ CONNECT NETLIFY (2 min)

1. Go to: **https://app.netlify.com**
2. Click **"New site from Git"**
3. Pick **"GitHub"**
4. Authorize Netlify
5. Select your repository
6. Build settings auto-fill (leave as-is)
7. Click **"Deploy site"**

**Wait 2-3 minutes for build...**

---

## 4️⃣ SET ENVIRONMENT VARIABLE (2 min)

In Netlify dashboard:

1. **Site settings** tab
2. **Build & deploy** → **Environment**
3. **Add environment variable**
4. Key: `OPENAI_API_KEY`
5. Value: `sk-your-key-from-step-1`
6. **Save**

---

## 5️⃣ REDEPLOY (1 min)

1. Go to **Deployments** tab
2. **Trigger deploy** → **Deploy site**

**Wait ~1-2 minutes...**

---

## 6️⃣ VERIFY WORKS (3 min)

1. Get your URL from Netlify
2. Open in browser
3. Login: Click "Try Demo Account"
4. Go to "AI Assistant" tab
5. Ask: "What is polymorphism?"
6. Should get response in 2-5 seconds ✅

---

## 🎉 DONE!

Your site is **LIVE** and **WORKING**!

Share URL with students:
```
https://your-site-name.netlify.app
```

---

## 📝 QUICK REFERENCE

| Step | Action | Time |
|------|--------|------|
| 1 | Get OpenAI key | 1 min |
| 2 | Push to GitHub | 2 min |
| 3 | Connect to Netlify | 2 min |
| 4 | Add env variable | 2 min |
| 5 | Redeploy | 1 min |
| 6 | Test | 2 min |
| **Total** | | **10 min** |

---

## 🔗 ONE-CLICK COMMANDS

Copy-paste these:

**Push to GitHub:**
```bash
git add -A && git commit -m "Deploy to Netlify" && git push origin main
```

**Set Netlify env var (CLI):**
```bash
netlify env:set OPENAI_API_KEY "sk-your-key-here"
```

**Redeploy (CLI):**
```bash
netlify deploy --prod
```

---

## ✅ VERIFICATION CHECKLIST

After deployment:

- [ ] Get URL from Netlify
- [ ] Open URL in browser
- [ ] Login works
- [ ] Chat works
- [ ] Gets AI response
- [ ] No errors in console (F12)
- [ ] Mobile view works

All ✓? You're done! 🎓

---

## 📦 WHAT DEPLOYS

```
✅ React app (src/)
✅ Styling (App.css)
✅ Backend function (netlify/functions/chat.js)
✅ All dependencies
✅ Production build

= COMPLETE PLATFORM LIVE
```

---

## 🚀 FUTURE UPDATES

Just do:
```bash
git add -A
git commit -m "Update features"
git push origin main
# Netlify auto-deploys! ✅
```

---

## ❓ STUCK?

See full guides:
- **DEPLOYMENT_HUB.md** - Detailed steps
- **ENV_VARIABLES_GUIDE.md** - Env var help
- **NETLIFY_COMPLETE_SETUP.md** - Full setup

---

**You got this! 🚀**

*Developed by Vishal Kumar*
