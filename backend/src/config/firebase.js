import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}');

// Check if running locally (development) or in production
const useEmulator = process.env.NODE_ENV === 'development' && process.env.FIREBASE_USE_EMULATOR === 'true';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
} catch (error) {
  console.error('Firebase initialization error:', error.message);
}

// Connect to Firestore
export const db = admin.firestore();
export const auth = admin.auth();

// For local development with emulator (optional)
if (useEmulator) {
  process.env.FIREBASE_DATABASE_EMULATOR_HOST = 'localhost:9000';
}

export default admin;
