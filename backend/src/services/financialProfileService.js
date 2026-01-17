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
};

/**
 * Get financial profile for a specific user
 * @param {string} userId - Firebase user ID
 * @returns {Promise<object|null>} Financial profile or null if not found
 */
export const getFinancialProfileByUserId = async (userId) => {
  const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
  const doc = await profileRef.get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

/**
 * Update financial profile for a user
 * @param {string} userId - Firebase user ID
 * @param {object} updateData - Partial profile data to update
 * @returns {Promise<object>} Updated profile
 */
export const updateFinancialProfile = async (userId, updateData) => {
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
};

/**
 * Delete financial profile (admin only - not exposed in routes)
 * @param {string} userId - Firebase user ID
 */
export const deleteFinancialProfile = async (userId) => {
  const profileRef = db.collection(PROFILES_COLLECTION).doc(userId);
  await profileRef.delete();
};

/**
 * Check if user has a financial profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<boolean>}
 */
export const userHasProfile = async (userId) => {
  const profile = await getFinancialProfileByUserId(userId);
  return profile !== null;
};
