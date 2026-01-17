#!/bin/bash
# Quick Firebase Setup Script
# This script helps you set up Firebase environment variables

echo "==================================="
echo "Firebase Configuration Setup"
echo "==================================="
echo ""
echo "This script will help you create the .env.local file"
echo "You'll need your Firebase credentials from: https://console.firebase.google.com"
echo ""

# Create .env.local file
cat > .env.local << EOF
# Firebase Configuration
# Get these values from Firebase Console > Project Settings

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
EOF

echo "✅ .env.local file created!"
echo ""
echo "📝 Next steps:"
echo "1. Open .env.local in your editor"
echo "2. Go to Firebase Console: https://console.firebase.google.com"
echo "3. Select your project > Project Settings (gear icon)"
echo "4. Copy your config values into .env.local"
echo "5. Save the file"
echo ""
echo "🚀 Then run:"
echo "   npm run dev"
echo ""
