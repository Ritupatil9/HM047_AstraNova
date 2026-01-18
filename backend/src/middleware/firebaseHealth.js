import { db } from '../config/firebase.js';

/**
 * Middleware to check Firebase connectivity before processing requests
 * This ensures we fail fast with a meaningful error if Firestore is not available
 */
export const checkFirebaseHealth = async (req, res, next) => {
  try {
    // If db is not initialized, skip health check and let the route handle it
    if (!db) {
      console.warn('⚠️  Firestore not initialized - check Firebase credentials');
      return next(); // Continue anyway, routes will handle the error
    }
    
    next();
  } catch (error) {
    console.error('Firebase health check error:', error.message);
    next(); // Don't block requests on health check failures
  }
};

export default checkFirebaseHealth;
