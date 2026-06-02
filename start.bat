@echo off
echo ========================================== > server_log.txt
echo LOCAL HOST STARTUP LOG >> server_log.txt
echo Date/Time: %date% %time% >> server_log.txt
echo ========================================== >> server_log.txt

echo Checking Node version... >> server_log.txt
node -v >> server_log.txt 2>&1
echo Checking npm version... >> server_log.txt
npm -v >> server_log.txt 2>&1

echo Checking package manager and starting... >> server_log.txt
where pnpm >nul 2>nul
if %errorlevel% equ 0 (
    echo Detected pnpm is installed. Starting with pnpm dev... >> server_log.txt
    pnpm dev >> server_log.txt 2>&1
) else (
    echo pnpm is not installed. Falling back to npm run dev... >> server_log.txt
    
    echo Running npm install just in case... >> server_log.txt
    call npm install >> server_log.txt 2>&1
    
    echo Starting server with npm run dev... >> server_log.txt
    npm run dev >> server_log.txt 2>&1
)
