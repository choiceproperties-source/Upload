#!/bin/bash

# Choice Properties Backend Startup Script

echo "🚀 Starting Choice Properties Backend..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "📋 Creating .env from template..."
    cp .env.example .env
    echo "✅ .env created. Please fill in your credentials:"
    echo "   - MONGODB_URL"
    echo "   - JWT_SECRET"
    echo "   - SMTP_USER and SMTP_PASS"
    echo ""
    echo "Then run: npm run dev"
    exit 1
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start development server
echo "✅ Starting server..."
npm run dev
