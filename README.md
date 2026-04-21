# 🎓 BCA Assist - LND College Smart AI Portal

A production-level AI-powered student platform built with React, OpenAI API, and Netlify Functions. Designed specifically for BCA students at LND College to help with coding, notes, assignments, and exam preparation.

## 🌟 Features

### ✨ Ultra-Modern UI
- **Glassmorphism Design** - Modern glass effects with backdrop blur
- **Neon Glow Effects** - Vivid gradients (blue, purple, cyan)
- **Smooth Animations** - Fade, slide, and hover effects
- **Responsive Layout** - Works seamlessly on all devices

### 🎯 Core Features
- **Dashboard** - Welcome screen with attendance %, study progress, daily streak
- **AI Chat Assistant** - ChatGPT integration with 4 study modes
  - 📝 Exam Mode - Short, concise answers
  - 🧠 Concept Mode - Easy-to-understand explanations
  - 🎯 Practice Mode - AI generates practice problems
  - 📋 Assignment Mode - Structured solutions
- **Live Activity Feed** - Real-time updates showing student activities
- **Attendance Tracker** - Visual calendar, weekly breakdown, percentage tracking
- **Admin Panel** - Manage study materials, notes, and resources
- **Subject Management** - Organize by semester and subject

### 🔐 Security
- API keys stored in environment variables (never exposed)
- Secure backend using Netlify Functions
- Protected admin panel with credentials

## 🛠️ Tech Stack

- **Frontend**: React 18, CSS3 (Glassmorphism), Framer Motion
- **Backend**: Netlify Functions (Serverless)
- **AI**: OpenAI GPT-3.5 API
- **Storage**: LocalStorage (browser)
- **Icons**: Lucide React, React Icons
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- OpenAI API key (get from https://platform.openai.com/api-keys)
- Netlify account (free tier works)
- Git

## 🚀 Quick Start

### 1. Local Setup

```bash
cd /workspaces/VISHAL
npm install

# Create .env file
cp .env.example .env
# Edit .env and add: REACT_APP_OPENAI_API_KEY=sk-...
```

### 2. Run Locally

```bash
# With Netlify Functions (recommended)
npm run dev

# Or React dev server only
npm start
```

### 3. Login Credentials

**Admin:**
- Email: `10717vishal@gmail.com`
- Password: `Vishal@@2004`

**Student:** Any email/password, or click "Try Demo Account"

### 4. Deploy to Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 🔑 Environment Variables

### Local Development
Create `.env`:
```env
REACT_APP_OPENAI_API_KEY=sk-your-api-key
```

### Netlify Deployment
Set in Netlify Dashboard → Site Settings → Environment:
```
OPENAI_API_KEY=sk-your-api-key
```

## 📁 Project Structure

```
/workspaces/VISHAL/
├── public/index.html
├── src/
│   ├── App.js
│   ├── App.css (glassmorphism + animations)
│   ├── index.js
│   ├── components/
│   │   ├── Header.js
│   │   └── Sidebar.js
│   └── pages/
│       ├── AuthPage.js
│       ├── Dashboard.js
│       ├── ChatInterface.js
│       ├── AttendanceTracker.js
│       └── AdminPanel.js
├── netlify/functions/chat.js (OpenAI backend)
├── package.json
├── netlify.toml
└── .env.example
```

## 🤖 How It Works

1. **Chat Message** → User types question in chat
2. **Frontend** → Sends to `/.netlify/functions/chat`
3. **Backend** → Adds system prompt + calls OpenAI API
4. **AI Response** → Returns answer with code highlighting
5. **Display** → Shows with animations and action buttons

### Study Modes
- **Exam Mode**: Short, syllabus-focused answers
- **Concept Mode**: Beginner-friendly explanations (default)
- **Practice Mode**: AI generates questions
- **Assignment Mode**: Structured step-by-step solutions

## 🎨 Customization

### Change Colors
Edit `src/App.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --accent: #06b6d4;
}
```

### Add/Edit Subjects
Edit `src/components/Sidebar.js` - modify `subjects` array

### Change Admin Credentials
Edit `src/App.js` - modify `adminEmail` and `adminPassword`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not configured" | Add `OPENAI_API_KEY` to .env or Netlify env vars |
| Chat not responding | Verify API key is valid, check remaining balance |
| Admin login fails | Use exact credentials, clear localStorage |
| Animations not working | Clear browser cache, verify App.css loaded |

## 💡 Features in Detail

### Dashboard
- Attendance percentage with circular progress
- Study progress bar (animated)
- Daily streak counter with emoji celebration
- Live activity feed (simulated updates)
- Quick access buttons to resources
- AI-generated study suggestions

### Chat Interface
- Mode selector (4 study modes)
- Typing animation while waiting
- Code syntax highlighting
- Copy code button
- Regenerate response option
- "Explain simply" button
- Quick suggestion buttons

### Attendance
- Interactive calendar (click to toggle)
- Present/Absent/Unmarked status
- Weekly breakdown with percentages
- Progress to 75% requirement
- LocalStorage persistence

### Admin Panel
- Add/edit/delete study materials
- Organize by subject and type
- Quick statistics dashboard
- Material count by category

## 📱 Responsive Design

Works perfectly on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

## 🔐 Security Features

- ✅ API keys never exposed in frontend
- ✅ Sensitive data only in environment variables
- ✅ Backend processes all API calls
- ✅ Protected admin credentials
- ✅ Input validation
- ✅ CORS properly configured

## 📚 Supported Subjects & Semesters

### Subjects
Java, C++, Python, C, DBMS, OS, Computer Networks, Web Dev

### Semesters
Semester 3, Semester 5, Semester 7

## 👨‍💼 Developer

**Developed by Vishal Kumar**

---

**Ready to transform student learning with AI! 🚀**