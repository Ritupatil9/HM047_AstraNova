import { auth } from '../config/firebase.js';

/**
 * Middleware to verify Firebase auth token and attach user to request
 * The token should be in the Authorization header as: Bearer <token>
 */
export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: No authentication token provided',
      code: 'NO_TOKEN',
    });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || null,
    };
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    let errorCode = 'INVALID_TOKEN';
    let statusCode = 401;
    let message = 'Unauthorized: Invalid or expired token';

    if (error.code === 'auth/argument-error') {
      errorCode = 'MALFORMED_TOKEN';
      message = 'Unauthorized: Malformed authentication token';
    } else if (error.code === 'auth/id-token-expired') {
      errorCode = 'EXPIRED_TOKEN';
      message = 'Unauthorized: Token has expired';
    }

    return res.status(statusCode).json({
      success: false,
      error: message,
      code: errorCode,
    });
  }
};

/**
 * Middleware to check if user is authenticated (no token needed, just checks if req.user exists)
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: User not authenticated',
      code: 'NOT_AUTHENTICATED',
    });
  }
  next();
};
