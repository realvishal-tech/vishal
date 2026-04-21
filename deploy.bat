@echo off
REM BCA ASSIST - ONE-CLICK NETLIFY DEPLOYMENT SCRIPT (Windows)
REM This script automates the deployment process for Windows users

setlocal enabledelayedexpansion

cls
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  BCA ASSIST - NETLIFY DEPLOYMENT SETUP (Windows)       ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check for Node.js
where node >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install from https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js installed

REM Check for npm
where npm >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] npm not found!
    pause
    exit /b 1
)
echo [OK] npm installed

REM Check for Git
where git >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] Git not found!
    echo Please install from https://git-scm.com
    pause
    exit /b 1
)
echo [OK] Git installed

echo.
echo Building project...

REM Clean and build
if exist build\ rmdir /s /q build\
call npm run build >nul 2>&1

if !errorlevel! equ 0 (
    echo [OK] Build successful!
) else (
    echo [ERROR] Build failed!
    echo Run 'npm run build' for details
    pause
    exit /b 1
)

echo.
echo Checking for API key configuration...

if exist .env (
    findstr /m "REACT_APP_OPENAI_API_KEY=sk-" .env >nul
    if !errorlevel! equ 0 (
        echo [OK] OpenAI API key found in .env
    ) else (
        echo [WARNING] No API key in .env
        echo You'll need to add it on Netlify after deployment
    )
) else (
    echo [WARNING] .env file not found
    echo Creating .env with template...
    (
        echo # Get your key from https://platform.openai.com/api-keys
        echo REACT_APP_OPENAI_API_KEY=sk-your-key-here
    ) > .env
    echo [OK] .env created
)

echo.
echo Checking Netlify CLI...

where netlify >nul 2>nul
if !errorlevel! neq 0 (
    echo [WARNING] Netlify CLI not found
    echo Installing Netlify CLI...
    call npm install -g netlify-cli
    echo [OK] Netlify CLI installed
) else (
    echo [OK] Netlify CLI installed
)

echo.
echo ════════════════════════════════════════════════════════
echo DEPLOYMENT OPTIONS
echo ════════════════════════════════════════════════════════
echo.
echo 1 - Deploy to Netlify (via CLI^)
echo 2 - Prepare for GitHub auto-deployment
echo 3 - Show deployment instructions
echo 4 - Exit
echo.

set /p choice="Choose option (1-4): "

if "%choice%"=="1" (
    echo.
    echo Logging in to Netlify...
    call netlify login
    if !errorlevel! neq 0 (
        echo [ERROR] Login failed
        pause
        exit /b 1
    )

    echo.
    echo Deploying to Netlify...
    call netlify deploy --prod

    echo.
    echo ════════════════════════════════════════════════════════
    echo DEPLOYMENT COMPLETE!
    echo ════════════════════════════════════════════════════════
    echo.
    echo Next steps:
    echo 1. Go to your Netlify site dashboard
    echo 2. Settings ^> Build ^& deploy ^> Environment
    echo 3. Add environment variable:
    echo    Key: OPENAI_API_KEY
    echo    Value: sk-your-actual-key
    echo 4. Trigger redeploy
    echo.

) else if "%choice%"=="2" (
    echo.
    echo GitHub Auto-Deployment Checklist:
    echo.
    echo 1. Push to GitHub:
    echo    git add -A
    echo    git commit -m "Ready for Netlify deployment"
    echo    git push origin main
    echo.
    echo 2. Go to https://app.netlify.com
    echo 3. Click 'New site from Git'
    echo 4. Connect GitHub ^& select repository
    echo 5. Build settings:
    echo    - Build command: npm run build
    echo    - Publish directory: build
    echo 6. Click 'Deploy site'
    echo.
    echo 7. Add environment variable:
    echo    - Site settings ^> Environment
    echo    - Key: OPENAI_API_KEY
    echo    - Value: sk-your-key
    echo.
    echo 8. Redeploy to activate
    echo.

) else if "%choice%"=="3" (
    echo.
    echo See NETLIFY_COMPLETE_SETUP.md for comprehensive guide
    echo Opening file...
    start NETLIFY_COMPLETE_SETUP.md

) else if "%choice%"=="4" (
    echo Exiting...
    exit /b 0

) else (
    echo [ERROR] Invalid option
    pause
    exit /b 1
)

echo.
echo Thank you for using BCA Assist!
echo Developed by Vishal Kumar
echo.
pause
