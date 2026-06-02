@echo off
echo ==========================================
echo VERCEL PRODUCTION REDEPLOY TOOL
echo ==========================================
echo.

echo Step 1: Installing dependencies...
if exist pnpm-lock.yaml (
    echo Detected pnpm. Running pnpm install...
    pnpm install
) else (
    echo Detected npm. Running npm install...
    npm install
)

echo.
echo Step 2: Deploying to Vercel (Production Mode)...
npx vercel --prod --confirm

echo.
echo ==========================================
echo Process complete! You can close this window.
pause
