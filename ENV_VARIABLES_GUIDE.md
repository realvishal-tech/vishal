# 🔑 ENVIRONMENT VARIABLES GUIDE

Complete guide to setting up environment variables for local and production deployment.

---

## 📍 LOCAL DEVELOPMENT

### .env File (Local Only)

**Location:** `/workspaces/VISHAL/.env`

**Content:**
```env
# Local Development Environment Variables
# Get your key from: https://platform.openai.com/api-keys

REACT_APP_OPENAI_API_KEY=sk-your-local-key-here
```

**How to use:**
1. Create `.env` file in project root
2. Add your OpenAI API key
3. Run `npm run dev`
4. React automatically loads variables
5. Netlify Functions also access it

**⚠️ Important:**
- Never commit `.env` to Git
- `.gitignore` already protects it
- Create fresh `.env` on each machine

### Example .env Files

**Local Development:**
```env
REACT_APP_OPENAI_API_KEY=sk-proj-abc123def456ghi789...
```

**Testing:**
```env
REACT_APP_OPENAI_API_KEY=sk-test-key-for-testing
```

**Staging:**
```env
REACT_APP_OPENAI_API_KEY=sk-staging-key-for-testing
```

---

## 🌐 PRODUCTION (NETLIFY)

### Setting Environment Variables on Netlify

**Dashboard Method (Easiest):**

1. Go to **https://app.netlify.com**
2. Select your site
3. **Site settings**
4. **Build & deploy**
5. **Environment**
6. **Add environment variable** button
7. Enter:
   ```
   Key:   OPENAI_API_KEY
   Value: sk-prod-key-from-openai
   ```
8. **Save**
9. **Trigger deploy** to activate

**CLI Method:**
```bash
netlify env:set OPENAI_API_KEY "sk-prod-key"
netlify deploy --prod
```

### Verify Variables Are Set

**Via Dashboard:**
- Netlify dashboard → Environment section
- Should list your variables

**Via CLI:**
```bash
netlify env:list
# Shows all environment variables
```

**Via Build Log:**
- Netlify dashboard → Deployments
- Click latest deploy
- Check "Deploy log"
- Should show environment loaded

---

## 🔄 VARIABLE FLOW

### Local Development
```
.env file
    ↓
npm run dev
    ↓
React loads REACT_APP_* variables
    ↓
App.js can access: process.env.REACT_APP_OPENAI_API_KEY
```

### Production (Netlify)
```
Netlify environment variables
    ↓
Build process (npm run build)
    ↓
OPENAI_API_KEY available to functions
    ↓
netlify/functions/chat.js can access: process.env.OPENAI_API_KEY
```

---

## 📋 AVAILABLE VARIABLES

### Frontend Variables (Use REACT_APP_ prefix)

```env
# React variables (accessible in browser)
REACT_APP_OPENAI_API_KEY=sk-xxx

# React application configs
REACT_APP_API_URL=https://api.example.com
REACT_APP_VERSION=1.0.0
```

### Backend Variables (No prefix)

```env
# Function variables (server-side only)
OPENAI_API_KEY=sk-xxx
DATABASE_URL=postgres://...
STRIPE_KEY=sk_...
```

### System Variables

```env
# Managed by Netlify automatically
NODE_VERSION=18.x
BRANCH=main
COMMIT_REF=abc123...
```

---

## 🔐 SECURITY

### Best Practices

✅ **DO:**
- Store secrets in environment variables only
- Use different keys for dev/prod
- Rotate keys periodically
- Use environment variables in Netlify

❌ **DON'T:**
- Hardcode API keys in code
- Commit `.env` to Git
- Share API keys via chat/email
- Use same key for multiple purposes

### Protecting Secrets

**Frontend (.env):**
```env
# Uses REACT_APP_ prefix
# Only these are visible to browser
REACT_APP_PUBLIC_KEY=public-data
REACT_APP_OPENAI_API_KEY=sk-key  # Only test key!
```

**Backend (Netlify env vars):**
```env
# No prefix = server-side only
# Never exposed to frontend
OPENAI_API_KEY=sk-prod-key  # Production key
DATABASE_PASSWORD=secret123
STRIPE_SECRET_KEY=sk_...
```

### Hidden from Browser

Variables without `REACT_APP_` prefix:
```javascript
// In browser, this is undefined
console.log(process.env.OPENAI_API_KEY)  // undefined
// ✅ Safe! Not exposed in frontend

// But available in Netlify Functions
// netlify/functions/chat.js
const apiKey = process.env.OPENAI_API_KEY  // Works!
```

---

## 📝 SETUP CHECKLIST

### Local Development Setup

- [ ] Created `.env` file
- [ ] Added `REACT_APP_OPENAI_API_KEY`
- [ ] Restarted dev server: `npm run dev`
- [ ] Verified chat works
- [ ] `.gitignore` includes `.env`

### Production Setup

- [ ] Committed code to Git
- [ ] Created Netlify site
- [ ] Added `OPENAI_API_KEY` env var on Netlify
- [ ] Redeployed after setting variable
- [ ] Verified chat works on live site
- [ ] Checked Netlify environment section

---

## 🔄 UPDATING VARIABLES

### Change Local Variable

```bash
# Edit .env file
nano .env
# Change: REACT_APP_OPENAI_API_KEY=sk-new-key

# Restart dev server
npm run dev
```

### Change Production Variable

**Option 1: Dashboard**
1. Netlify → Site settings → Environment
2. Find the variable
3. Click to edit
4. Update value
5. Save
6. Trigger redeploy

**Option 2: CLI**
```bash
netlify env:set OPENAI_API_KEY "sk-new-key"
netlify deploy --prod
```

---

## ❌ TROUBLESHOOTING

### "API key not configured"

**Check:**
```bash
# Local development
cat .env
# Should show REACT_APP_OPENAI_API_KEY=sk-...

# Production
# Netlify→Environment
# Should show OPENAI_API_KEY=sk-...
```

**Fix:**
```bash
# Local
echo "REACT_APP_OPENAI_API_KEY=sk-your-key" > .env
npm run dev

# Production
netlify env:set OPENAI_API_KEY "sk-your-key"
netlify deploy --prod
```

### "Invalid API key"

**Check:**
1. Key starts with `sk-`
2. Key hasn't been revoked
3. No extra spaces/characters
4. Check on OpenAI account page

**Fix:**
- Create new key on OpenAI
- Set new value
- Redeploy

### "Environment variable not loading"

**Local:**
```bash
# Make sure to restart after editing .env
npm run dev  # Kill (Ctrl+C) and restart

# Check it's loaded
curl http://localhost:8888/.netlify/functions/chat \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message":"test","mode":"concept"}'
```

**Production:**
```bash
# Redeploy to activate
netlify deploy --prod

# Check build log
# Should show environment being loaded
```

---

## 📚 EXAMPLES

### Example 1: Local Development

**Step 1: Create .env**
```bash
echo "REACT_APP_OPENAI_API_KEY=sk-proj-xyz123" > .env
```

**Step 2: Run**
```bash
npm run dev
```

**Step 3: Access in code**
```javascript
// src/App.js
const apiKey = process.env.REACT_APP_OPENAI_API_KEY
// = "sk-proj-xyz123"
```

### Example 2: Production Deploy

**Step 1: Set on Netlify**
```bash
netlify env:set OPENAI_API_KEY "sk-prod-key-123"
```

**Step 2: Redeploy**
```bash
netlify deploy --prod
```

**Step 3: Function accesses it**
```javascript
// netlify/functions/chat.js
const apiKey = process.env.OPENAI_API_KEY
// = "sk-prod-key-123"
```

---

## 🎯 QUICK REFERENCE

| Task | Command/Location |
|------|------------------|
| Set local key | Edit `.env` file |
| Set prod key | Netlify dashboard → Environment |
| List all vars | `netlify env:list` |
| Update prod var | `netlify env:set KEY "VALUE"` |
| View in code | `process.env.VARIABLE_NAME` |
| Check is loaded | Log to console: `console.log(process.env)` |
| Redeploy | `netlify deploy --prod` |

---

## 🔗 RELATED DOCS

- **NETLIFY_COMPLETE_SETUP.md** - Full Netlify setup
- **DEPLOYMENT_HUB.md** - Deployment methods
- **.env.example** - Template file
- **netlify/functions/chat.js** - Uses OPENAI_API_KEY

---

## 📞 SUPPORT

**OpenAI:**
- Get key: https://platform.openai.com/api-keys
- Check usage: https://platform.openai.com/account/usage
- Documentation: https://platform.openai.com/docs

**Netlify:**
- Dashboard: https://app.netlify.com
- Environment docs: https://docs.netlify.com/environment-variables
- Build logs: In dashboard under Deployments

---

*Environment variables properly configured! ✅*
*Your deployment is secure!*

*Developed by Vishal Kumar*
