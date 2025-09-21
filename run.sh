#!/bin/bash

# AI Video Creator - Startup Script

echo "🎬 Starting AI Video Creator..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy .env.example to .env and add your API keys."
    exit 1
fi

# Check if Python dependencies are installed
if ! python -c "import fastapi" &> /dev/null; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Start backend server in background
echo "🚀 Starting backend server..."
python main.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Start frontend server
echo "🎨 Starting frontend server..."
cd frontend
npm start &
FRONTEND_PID=$!

echo "✅ AI Video Creator is running!"
echo "📊 Backend: http://localhost:8000"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers..."

# Wait for user interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait