@echo off
chcp 65001 >nul
echo ========================================
echo    Quick Start - Admin Panel
echo ========================================
echo.

echo 🚀 Quick starting admin panel...
echo.

echo 📦 Checking dependencies...
if exist "node_modules" (
    echo ✅ Dependencies found, skipping installation
) else (
    echo 📥 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        echo    Please run start.bat for full setup
        pause
        exit /b 1
    )
)

echo.
echo 🔄 Starting server...
echo.
echo 🌐 Admin Panel: http://localhost:3001/admin
echo.
echo Press Ctrl+C to stop
echo.

npm start 