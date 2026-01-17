import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';
import {
  createFinancialProfile,
  getFinancialProfileByUserId,
  updateFinancialProfile,
  userHasProfile,
} from '../services/financialProfileService.js';

const router = express.Router();

/**
 * @route GET /api/financial-profile/exists
 * @desc Check if authenticated user has a financial profile
 * @access Private (requires auth token)
 */
router.get('/exists', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const hasProfile = await userHasProfile(userId);

    return res.status(200).json({
      success: true,
      data: {
        has_profile: hasProfile,
      },
    });
  } catch (error) {
    console.error('Error checking profile existence:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error while checking profile',
      code: 'SERVER_ERROR',
    });
  }
});

/**
 * @route POST /api/financial-profile
 * @desc Create a new financial profile for authenticated user
 * @access Private (requires auth token)
 */
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const profileData = req.body;

    const createdProfile = await createFinancialProfile(userId, profileData);

    return res.status(201).json({
      success: true,
      message: 'Financial profile created successfully',
      data: createdProfile,
    });
  } catch (error) {
    console.error('Error creating financial profile:', error);

    if (error.status) {
      return res.status(error.status).json({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error while creating profile',
      code: 'SERVER_ERROR',
    });
  }
});

/**
 * @route GET /api/financial-profile
 * @desc Get financial profile for authenticated user
 * @access Private (requires auth token)
 */
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const profile = await getFinancialProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Financial profile not found. Create a profile first.',
        code: 'PROFILE_NOT_FOUND',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Financial profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    console.error('Error retrieving financial profile:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error while retrieving profile',
      code: 'SERVER_ERROR',
    });
  }
});

/**
 * @route PUT /api/financial-profile
 * @desc Update financial profile for authenticated user
 * @access Private (requires auth token)
 */
router.put('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const updateData = req.body;

    // Check if update data is empty
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No data provided for update',
        code: 'EMPTY_UPDATE',
      });
    }

    const updatedProfile = await updateFinancialProfile(userId, updateData);

    return res.status(200).json({
      success: true,
      message: 'Financial profile updated successfully',
      data: updatedProfile,
    });
  } catch (error) {
    console.error('Error updating financial profile:', error);

    if (error.status) {
      return res.status(error.status).json({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error while updating profile',
      code: 'SERVER_ERROR',
    });
  }
});

/**
 * @route PATCH /api/financial-profile
 * @desc Partial update of financial profile (alias for PUT)
 * @access Private (requires auth token)
 */
router.patch('/', verifyFirebaseToken, async (req, res) => {
  // Delegate to PUT handler
  req.method = 'PUT';
  return router.handle(req, res);
});

export default router;
