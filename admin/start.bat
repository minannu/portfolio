@echo off
echo ========================================
echo    Portfolio Admin Panel Server
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found! Installing dependencies...
npm install

echo.
echo Starting admin panel server...
echo.
echo 🌐 Admin Panel: http://localhost:3001/admin
echo 📁 Project Root: %CD%\..
echo.
echo Press Ctrl+C to stop the server
echo.

npm start 