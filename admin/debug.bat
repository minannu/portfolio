@echo off
echo ========================================
echo    Portfolio Admin Panel Debug Mode
echo ========================================
echo.

echo Current directory: %CD%
echo.

echo Checking if Node.js is installed...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo.
echo Node.js found! Installing dependencies...
npm install

echo.
echo Dependencies installed. Starting server...
echo.
echo 🌐 Admin Panel will be available at: http://localhost:3001/admin
echo 📁 Project Root: %CD%\..
echo.
echo Press Ctrl+C to stop the server
echo.

node server.js 