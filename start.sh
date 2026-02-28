#!/bin/bash

# DevisPro Startup Script
# This script starts both the backend server and the OpenClaw automation engine

echo "╔══════════════════════════════════════════════════════════╗"
echo "║              Starting DevisPro Platform                  ║"
echo "║      Quebec Construction Marketplace System              ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if PowerShell is installed
if ! command -v pwsh &> /dev/null; then
    echo "⚠️  PowerShell is not installed. OpenClaw automation will not be available."
    echo "   Install PowerShell 7+ from: https://github.com/PowerShell/PowerShell"
    PS_AVAILABLE=false
else
    PS_AVAILABLE=true
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create data directory if it doesn't exist
mkdir -p src/data

# Start backend server in background
echo "🚀 Starting backend server..."
node src/backend/server.js &
SERVER_PID=$!
echo "   Backend PID: $SERVER_PID"

# Wait for server to start
sleep 3

# Start OpenClaw automation engine if PowerShell is available
if [ "$PS_AVAILABLE" = true ]; then
    echo "🤖 Starting OpenClaw automation engine..."
    pwsh src/automation/openclaw-engine.ps1 &
    AUTOMATION_PID=$!
    echo "   Automation PID: $AUTOMATION_PID"
fi

echo ""
echo "✅ DevisPro is now running!"
echo ""
echo "📍 Access points:"
echo "   - Homepage: http://localhost:3000"
echo "   - Contractor Registration: http://localhost:3000/register"
echo "   - Submit Lead: http://localhost:3000/submit-lead"
echo "   - API Health: http://localhost:3000/api/health"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Trap Ctrl+C and cleanup
cleanup() {
    echo ""
    echo "🛑 Stopping DevisPro..."
    kill $SERVER_PID 2>/dev/null
    if [ "$PS_AVAILABLE" = true ]; then
        kill $AUTOMATION_PID 2>/dev/null
    fi
    echo "✅ All services stopped"
    exit 0
}

trap cleanup INT TERM

# Wait for processes
wait
