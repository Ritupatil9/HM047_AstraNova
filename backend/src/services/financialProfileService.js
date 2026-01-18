import { db } from '../config/firebase.js';
import { validateFinancialProfileData, validateRequiredFields } from '../middleware/validation.js';

const PROFILES_COLLECTION = 'financial_profiles';

/**
 * Create a new financial profile for a user
 * @param {string} userId - Firebase user ID
 * @param {object} profileData - Financial profile data
 * @returns {Promise<object>} Created profile with ID
 */
export const createFinancialProfile = async (userId, profileData) => {
  try {
    // Check if profile already exists
    const existingProfile = await getFinancialProfileByUserId(userId);
    if (existingProfile) {
      throw {
        status: 409,
        code: 'PROFILE_EXISTS',
        message: 'Financial profile already exists for this user. Use update endpoint to modify.',
      };
    }

    // Validate required fields
    const missingFields = validateRequiredFields(profileData);
    if (missingFields.length > 0) {
      throw {
        status: 400,
        code: 'MISSING_FIELDS',
        message: `Missing required fields: ${missingFields.join(', ')}`,
      };
    }

    // Validate data
    const validationErrors = validateFinancialProfileData(profileData);
    if (validationErrors.length > 0) {
      throw {
        status: 400,
        code: 'VALIDATION_ERROR',
        message: validationErrors.join('; '),
      };
    }

    // Create profile
    const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
    const profileWithMetadata = {
      ...profileData,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await profileRef.set(profileWithMetadata);

    return {
      id: userId,
      ...profileWithMetadata,
    };
  } catch (error) {
    console.error(`Error creating financial profile for user ${userId}:`, error.message);
    
    // If it's our custom error object, re-throw it
    if (error.status) {
      throw error;
    }
    
    // Otherwise, wrap in server error
    throw {
      status: 500,
      code: 'DATABASE_ERROR',
      message: 'Failed to create financial profile',
      originalError: error.message,
    };
  }
};

/**
 * Get financial profile for a specific user
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object|null>} Financial profile or null if not found
 */
export const getFinancialProfileByUserId = async (userId) => {
  try {
    const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
    const doc = await profileRef.get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error(`Error fetching financial profile for user ${userId}:`, error.message);
    throw {
      status: 500,
      code: 'DATABASE_ERROR',
      message: 'Failed to retrieve financial profile',
      originalError: error.message,
    };
  }
};

/**
 * Update financial profile for a user
 * @param {string} userId - Firebase user ID
 * @param {object} updateData - Partial profile data to update
 * @returns {Promise<object>} Updated profile
 */
export const updateFinancialProfile = async (userId, updateData) => {
  try {
    // Check if profile exists
    const existingProfile = await getFinancialProfileByUserId(userId);
    if (!existingProfile) {
      throw {
        status: 404,
        code: 'PROFILE_NOT_FOUND',
        message: 'Financial profile not found for this user. Create a profile first.',
      };
    }

    // Validate data (only validate fields that are being updated)
    const validationErrors = validateFinancialProfileData(updateData);
    if (validationErrors.length > 0) {
      throw {
        status: 400,
        code: 'VALIDATION_ERROR',
        message: validationErrors.join('; '),
      };
    }

    // Update profile
    const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
    const updatedData = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    await profileRef.update(updatedData);

    // Return updated profile
    return getFinancialProfileByUserId(userId);
  } catch (error) {
    console.error(`Error updating financial profile for user ${userId}:`, error.message);
    
    // If it's our custom error object, re-throw it
    if (error.status) {
      throw error;
    }
    
    // Otherwise, wrap in server error
    throw {
      status: 500,
      code: 'DATABASE_ERROR',
      message: 'Failed to update financial profile',
      originalError: error.message,
    };
  }
};

/**
 * Check if user has a financial profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<boolean>}
 */
export const userHasProfile = async (userId) => {
  try {
    const profile = await getFinancialProfileByUserId(userId);
    return profile !== null;
  } catch (error) {
    console.error(`Error checking if user ${userId} has profile:`, error.message);
    // If there's a database error (500), re-throw it
    if (error.status === 500) {
      throw error;
    }
    return false;
  }
};
