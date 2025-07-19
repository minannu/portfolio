@echo off
chcp 65001 >nul
echo ========================================
echo    Admin Panel Troubleshooting
echo ========================================
echo.

echo 🔍 Running diagnostics...
echo.

echo 📦 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js: %%i
) else (
    echo ❌ Node.js not found
)

echo.
echo 📦 Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm: %%i
) else (
    echo ❌ npm not found
)

echo.
echo 📁 Checking directory structure...
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
)

if exist "server.js" (
    echo ✅ server.js found
) else (
    echo ❌ server.js not found
)

if exist "index.html" (
    echo ✅ index.html found
) else (
    echo ❌ index.html not found
)

echo.
echo 🔌 Checking if port 3001 is available...
netstat -an | findstr ":3001" >nul
if %errorlevel% equ 0 (
    echo ⚠️  Port 3001 is already in use
    echo    This might prevent the server from starting
) else (
    echo ✅ Port 3001 is available
)

echo.
echo 📦 Checking dependencies...
if exist "node_modules" (
    echo ✅ node_modules folder exists
) else (
    echo ❌ node_modules folder missing
    echo    Run: npm install
)

echo.
echo 🌐 Checking internet connectivity...
ping -n 1 google.com >nul
if %errorlevel% equ 0 (
    echo ✅ Internet connection available
) else (
    echo ❌ No internet connection
    echo    This might affect npm install
)

echo.
echo ========================================
echo    Common Solutions
echo ========================================
echo.
echo 🔧 If Node.js is missing:
echo    Download from: https://nodejs.org/
echo.
echo 🔧 If dependencies are missing:
echo    Run: npm install
echo.
echo 🔧 If port 3001 is in use:
echo    1. Close other applications
echo    2. Or change port in server.js
echo.
echo 🔧 If npm install fails:
echo    1. Run: npm cache clean --force
echo    2. Delete node_modules folder
echo    3. Run: npm install
echo.
echo 🔧 If server won't start:
echo    1. Check error messages above
echo    2. Ensure you're in the admin folder
echo    3. Try restarting your computer
echo.
echo ========================================
echo    Quick Fix Commands
echo ========================================
echo.
echo To clean and reinstall:
echo    npm cache clean --force
echo    rmdir /s /q node_modules
echo    npm install
echo.
echo To check what's using port 3001:
echo    netstat -ano | findstr :3001
echo.
echo To kill a process using port 3001:
echo    taskkill /PID [PID_NUMBER] /F
echo.
pause 