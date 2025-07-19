@echo off
chcp 65001 >nul
echo ========================================
echo    Portfolio Admin Panel Server
echo ========================================
echo.

echo 🔍 Checking system requirements...
echo.

echo 📦 Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo 📥 Please install Node.js from: https://nodejs.org/
    echo    Choose the LTS version for best compatibility
    echo.
    echo 🔧 After installation:
    echo    1. Close this window
    echo    2. Open a new command prompt
    echo    3. Run this batch file again
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

echo.
echo 📦 Checking if npm is available...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm is not available!
    echo.
    echo 🔧 Please ensure Node.js is properly installed
    echo    and restart your command prompt
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm found: %NPM_VERSION%

echo.
echo 📁 Checking current directory...
if not exist "package.json" (
    echo ❌ ERROR: package.json not found!
    echo.
    echo 🔧 Please ensure you're running this batch file
    echo    from the admin folder of your portfolio project
    echo.
    echo 📂 Expected location: portfolio-1\admin\start.bat
    echo.
    pause
    exit /b 1
)
echo ✅ Running from correct directory

echo.
echo 📦 Installing dependencies...
echo    This may take a few moments...
npm install
if %errorlevel% neq 0 (
    echo ❌ ERROR: Failed to install dependencies!
    echo.
    echo 🔧 Troubleshooting steps:
    echo    1. Check your internet connection
    echo    2. Try running: npm cache clean --force
    echo    3. Delete node_modules folder and try again
    echo.
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully

echo.
echo 🚀 Starting admin panel server...
echo.
echo ========================================
echo    🌐 Admin Panel: http://localhost:3001/admin
echo    📁 Project Root: %CD%\..
echo    ⏰ Started at: %date% %time%
echo ========================================
echo.
echo 💡 Tips:
echo    • Keep this window open while using the admin panel
echo    • Press Ctrl+C to stop the server
echo    • If the page doesn't load, wait a few seconds and refresh
echo.
echo 🔄 Starting server...
echo.

npm start

if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Server failed to start!
    echo.
    echo 🔧 Troubleshooting steps:
    echo    1. Check if port 3001 is already in use
    echo    2. Try closing other applications that might use port 3001
    echo    3. Restart your computer and try again
    echo.
    echo 📞 If the problem persists, check the error messages above
    echo.
    pause
    exit /b 1
) 