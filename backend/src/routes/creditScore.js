import express from 'express';
import { verifyFirebaseToken } from '../middleware/auth.js';
import { getFinancialProfileByUserId } from '../services/financialProfileService.js';
import { calculateCreditScore } from '../services/creditScoreService.js';

const router = express.Router();

/**
 * @route POST /api/credit-score/calculate
 * @desc Calculate credit score based on user's financial profile
 * @access Private (requires auth token)
 * @body {profileData?: Object} - Optional custom profile data for what-if scenarios
 * @returns {creditScore, category, factors, summary, improvements}
 */
router.post('/calculate', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { useExisting = true, customProfile = null } = req.body;

    let profileToUse;

    if (useExisting) {
      // Fetch the user's actual financial profile from database
      profileToUse = await getFinancialProfileByUserId(userId);

      if (!profileToUse) {
        return res.status(404).json({
          success: false,
          error: 'Financial profile not found. Please create a profile first.',
          code: 'PROFILE_NOT_FOUND',
        });
      }
    } else if (customProfile) {
      // Use custom profile data (for what-if scenarios)
      profileToUse = customProfile;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Either useExisting must be true or customProfile must be provided',
        code: 'INVALID_REQUEST',
      });
    }

    // Calculate credit score
    const creditScoreResult = calculateCreditScore(profileToUse);

    return res.status(200).json({
      success: true,
      message: 'Credit score calculated successfully',
      data: {
        ...creditScoreResult,
        calculatedAt: new Date().toISOString(),
        profileUsed: useExisting ? 'existing' : 'custom',
      },
    });
  } catch (error) {
    console.error('Error calculating credit score:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to calculate credit score',
      code: 'CALCULATION_ERROR',
    });
  }
});

/**
 * @route GET /api/credit-score
 * @desc Get the most recent credit score for the user
 * @access Private (requires auth token)
 */
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const profile = await getFinancialProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Financial profile not found. Please create a profile first.',
        code: 'PROFILE_NOT_FOUND',
      });
    }

    const creditScoreResult = calculateCreditScore(profile);

    return res.status(200).json({
      success: true,
      message: 'Credit score retrieved successfully',
      data: {
        ...creditScoreResult,
        calculatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error retrieving credit score:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to retrieve credit score',
      code: 'RETRIEVAL_ERROR',
    });
  }
});

/**
 * @route POST /api/credit-score/what-if
 * @desc Calculate credit score with hypothetical financial profile (what-if scenario)
 * @access Private (requires auth token)
 * @body {profile: Object} - Custom financial profile data
 */
router.post('/what-if', verifyFirebaseToken, async (req, res) => {
  try {
    const { profile: customProfile } = req.body;

    if (!customProfile) {
      return res.status(400).json({
        success: false,
        error: 'Custom profile data is required',
        code: 'MISSING_PROFILE',
      });
    }

    const creditScoreResult = calculateCreditScore(customProfile);

    return res.status(200).json({
      success: true,
      message: 'What-if credit score calculated successfully',
      data: {
        ...creditScoreResult,
        calculatedAt: new Date().toISOString(),
        scenario: 'what-if',
      },
    });
  } catch (error) {
    console.error('Error calculating what-if credit score:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to calculate what-if credit score',
      code: 'CALCULATION_ERROR',
    });
  }
});

export default router;
