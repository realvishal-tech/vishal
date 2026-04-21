# ⚡ YOUR DEPLOYMENT - 5 STEP GUIDE

**Your API key is configured. Just follow these 5 steps. ~10 minutes.**

---

## 1️⃣ TEST LOCALLY (2 min)

```bash
npm run dev
```

- Open http://localhost:3000
- Click "Try Demo Account"
- Go to "AI Assistant" → Ask a question
- Should work! ✅

---

## 2️⃣ PUSH TO GITHUB (2 min)

```bash
git add -A
git commit -m "Deploy to Netlify with API key"
git push origin main
```

---

## 3️⃣ CONNECT NETLIFY (2 min)

1. Go to: **https://app.netlify.com**
2. Click **"New site from Git"** 
3. Choose **"GitHub"**
4. Authorize → Select repo → Deploy

**Wait 2-3 minutes for build...**

---

## 4️⃣ ADD ENVIRONMENT VARIABLE (2 min)

In Netlify dashboard:

1. **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variable"**
3. Key: `OPENAI_API_KEY`
4. Value: **Your OpenAI API key** (use the one you created)
   - It starts with: `sk-proj-...`
5. **Save**

⚠️ Keep your API key safe - don't share it!

---

## 5️⃣ REDEPLOY & TEST (2 min)

1. Go to **Deployments**
2. Click **"Trigger deploy"**
3. Wait for build (~1-2 min)
4. Get your URL
5. Test in browser - chat should work! ✅

---

## 🎉 DONE! LIVE!

Your site URL: `https://[your-site].netlify.app`

**Share with students!** 🎓

---

## ✅ CHECKLIST

- [ ] Tested locally (npm run dev)
- [ ] Pushed to GitHub (git push)
- [ ] Connected Netlify (New site from Git)
- [ ] Added OPENAI_API_KEY env var on Netlify
- [ ] Redeployed (Trigger deploy)
- [ ] Tested live URL (Chat works)

All done? **YOU'RE LIVE!** 🚀

---

## 🆘 QUICK FIXES

**Chat not working?**
- Verify OPENAI_API_KEY is on Netlify environment
- Redeploy site
- Wait 2 minutes
- Try again

**Build failed?**
- Check Netlify logs
- Make sure build passes locally first

**Very slow?**
- Normal - OpenAI takes 2-5 seconds!

---

*See YOUR_DEPLOYMENT_READY.md for more details.*

*Developed by Vishal Kumar*
