#!/bin/bash

# BCA ASSIST - ONE-CLICK NETLIFY DEPLOYMENT SCRIPT
# This script automates the deployment process

set -e  # Exit on any error

echo "╔════════════════════════════════════════════════════════╗"
echo "║  BCA ASSIST - NETLIFY DEPLOYMENT SETUP                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found!${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi
echo -e "${GREEN}✅ Node.js installed${NC} ($(node --version))"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm installed${NC} ($(npm --version))"

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git not found!${NC}"
    echo "Please install Git from https://git-scm.com"
    exit 1
fi
echo -e "${GREEN}✅ Git installed${NC}"

echo ""
echo "🔨 Building project..."

# Clean build
rm -rf build/

# Build
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    echo "Run 'npm run build' for details"
    exit 1
fi

echo ""
echo "🔑 Checking for API key configuration..."

# Check if .env has API key
if [ -f .env ]; then
    if grep -q "REACT_APP_OPENAI_API_KEY=sk-" .env; then
        echo -e "${GREEN}✅ OpenAI API key found in .env${NC}"
        API_KEY_LOCAL=1
    else
        echo -e "${YELLOW}⚠️  No API key in .env${NC}"
        echo "   You'll need to add it on Netlify after deployment"
        API_KEY_LOCAL=0
    fi
else
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "   Creating .env with template..."
    cat > .env << 'EOF'
# Get your key from https://platform.openai.com/api-keys
REACT_APP_OPENAI_API_KEY=sk-your-key-here
EOF
    echo -e "${GREEN}✅ .env created${NC}"
    API_KEY_LOCAL=0
fi

echo ""
echo "📦 Checking Netlify CLI..."

if command -v netlify &> /dev/null; then
    echo -e "${GREEN}✅ Netlify CLI installed${NC}"
else
    echo -e "${YELLOW}⚠️  Netlify CLI not found${NC}"
    echo "   Installing Netlify CLI..."
    npm install -g netlify-cli
    echo -e "${GREEN}✅ Netlify CLI installed${NC}"
fi

echo ""
echo "🔗 Git status..."

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a git repository!${NC}"
    echo "   Please initialize: git init"
    exit 1
fi

# Check for uncommitted changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ All changes committed${NC}"
else
    echo -e "${YELLOW}⚠️  Uncommitted changes found${NC}"
    echo "   Commit before deployment:"
    echo "   git add -A"
    echo "   git commit -m 'Ready for deployment'"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "🚀 DEPLOYMENT OPTIONS"
echo "════════════════════════════════════════════════════════"
echo ""
echo "1️⃣  Deploy to Netlify (via CLI)"
echo "2️⃣  Prepare for GitHub auto-deployment"
echo "3️⃣  Show deployment instructions"
echo "4️⃣  Exit"
echo ""
read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔐 Logging in to Netlify..."
        netlify login || { echo -e "${RED}❌ Login failed${NC}"; exit 1; }

        echo ""
        echo "📤 Deploying to Netlify..."
        netlify deploy --prod

        echo ""
        echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
        echo ""
        echo "📊 Next steps:"
        echo "1. Go to your Netlify site dashboard"
        echo "2. Settings → Build & deploy → Environment"
        echo "3. Add environment variable:"
        echo "   Key: OPENAI_API_KEY"
        echo "   Value: sk-your-actual-key"
        echo "4. Trigger redeploy"
        echo ""
        ;;

    2)
        echo ""
        echo "📋 GitHub Auto-Deployment Checklist:"
        echo ""
        echo "1. Push to GitHub:"
        echo "   git add -A"
        echo "   git commit -m 'Ready for Netlify deployment'"
        echo "   git push origin main"
        echo ""
        echo "2. Go to https://app.netlify.com"
        echo "3. Click 'New site from Git'"
        echo "4. Connect GitHub & select repository"
        echo "5. Build settings (should auto-fill):"
        echo "   - Build command: npm run build"
        echo "   - Publish directory: build"
        echo "6. Click 'Deploy site'"
        echo ""
        echo "7. Add environment variable:"
        echo "   - Site settings → Environment"
        echo "   - Key: OPENAI_API_KEY"
        echo "   - Value: sk-your-key"
        echo ""
        echo "8. Redeploy to activate"
        echo ""
        ;;

    3)
        echo ""
        echo "📖 Detailed Instructions"
        echo "========================"
        echo ""
        echo "See NETLIFY_COMPLETE_SETUP.md for comprehensive guide"
        echo ""
        cat NETLIFY_COMPLETE_SETUP.md | head -50
        echo ""
        echo "... (see full file for complete instructions)"
        echo ""
        ;;

    4)
        echo "Exiting..."
        exit 0
        ;;

    *)
        echo -e "${RED}❌ Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo "✨ Thank you for using BCA Assist!"
echo "Developed by Vishal Kumar"
echo ""
