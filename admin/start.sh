#!/bin/bash

echo "========================================"
echo "    Portfolio Admin Panel Server"
echo "========================================"
echo

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo
    exit 1
fi

echo "Node.js found! Installing dependencies..."
npm install

echo
echo "Starting admin panel server..."
echo
echo "🌐 Admin Panel: http://localhost:3001/admin"
echo "📁 Project Root: $(pwd)/.."
echo
echo "Press Ctrl+C to stop the server"
echo

npm start 