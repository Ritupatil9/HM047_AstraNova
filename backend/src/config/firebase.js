import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = (() => {
  try {
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}';
    let parsed = JSON.parse(json);
    
    // Fix escaped newlines in private_key (multiple strategies to handle different encodings)
    if (parsed.private_key && typeof parsed.private_key === 'string') {
      // Strategy 1: Replace escaped newlines
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      
      // Strategy 2: Ensure it starts and ends correctly
      if (!parsed.private_key.includes('-----BEGIN PRIVATE KEY-----')) {
        console.warn('⚠️  Private key format might be incorrect');
      }
      
      console.log('✅ Private key processed - starts with:', parsed.private_key.substring(0, 30));
    }
    
    if (!parsed.project_id) {
      console.error('❌ Firebase service account JSON is invalid or missing project_id');
    } else {
      console.log('✅ Service account parsed - Project:', parsed.project_id);
      console.log('✅ Service account email:', parsed.client_email);
    }
    return parsed;
  } catch (error) {
    console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', error.message);
    return {};
  }
})();

// Log the private key issue if exists
if (!serviceAccount.private_key) {
  console.error('❌ CRITICAL: No private_key found in service account!');
}

try {
  // Check if Firebase is already initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log('✅ Firebase Admin SDK initialized with service account');
  } else {
    console.log('ℹ️  Firebase already initialized');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.error('❌ Error details:', error);
  process.exit(1);
}

// Get Firestore and Auth instances
const db = admin.firestore();
const auth = admin.auth();

// Set Firestore settings
db.settings({ ignoreUndefinedProperties: true });

console.log('✅ Firestore instance obtained and configured');
console.log('✅ Auth instance obtained');

export { db, auth };
export default admin;
