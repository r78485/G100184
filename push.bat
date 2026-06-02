@echo off
echo ==========================================
echo GITHUB AUTOMATIC PUSH TOOL
echo ==========================================
echo.

echo Step 1: Staging all code changes...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "Update admission letter, resolve layout issues, and update dev settings"

echo.
echo Step 3: Pulling latest changes from remote to prevent conflicts...
git pull origin main --rebase

echo.
echo Step 4: Pushing code to GitHub...
git push origin main

echo.
echo ==========================================
echo Process complete! You can close this window.
pause
