import express from 'express';
import { calculateEMIDetails, calculateEMIQuick } from '../services/emiService.js';

const router = express.Router();

/**
 * @route POST /api/emi/calculate
 * @desc Calculate EMI with complete amortization schedule
 * @access Public (no authentication required)
 * @body {
 *   principal: number (required) - Loan amount
 *   annualRate: number (required) - Annual interest rate (0-50%)
 *   tenure: number (required) - Loan tenure
 *   tenureUnit: string (optional) - 'months' or 'years' (default: 'months')
 * }
 * @returns {calculation, breakup, amortizationSchedule}
 */
router.post('/calculate', (req, res) => {
  try {
    const { principal, annualRate, tenure, tenureUnit = 'months' } = req.body;

    // Validate required fields
    if (principal === undefined || principal === null) {
      return res.status(400).json({
        success: false,
        error: 'Principal amount is required',
        code: 'MISSING_PRINCIPAL',
      });
    }

    if (annualRate === undefined || annualRate === null) {
      return res.status(400).json({
        success: false,
        error: 'Annual interest rate is required',
        code: 'MISSING_RATE',
      });
    }

    if (tenure === undefined || tenure === null) {
      return res.status(400).json({
        success: false,
        error: 'Tenure is required',
        code: 'MISSING_TENURE',
      });
    }

    // Validate tenure unit
    if (!['months', 'years'].includes(tenureUnit)) {
      return res.status(400).json({
        success: false,
        error: "Tenure unit must be 'months' or 'years'",
        code: 'INVALID_TENURE_UNIT',
      });
    }

    // Calculate EMI
    const result = calculateEMIDetails(
      parseFloat(principal),
      parseFloat(annualRate),
      parseFloat(tenure),
      tenureUnit
    );

    return res.status(200).json({
      success: true,
      message: 'EMI calculated successfully',
      data: result,
      calculatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error calculating EMI:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to calculate EMI',
      code: 'CALCULATION_ERROR',
    });
  }
});

/**
 * @route POST /api/emi/quick
 * @desc Calculate EMI quickly without amortization schedule
 * @access Public (no authentication required)
 * @body {
 *   principal: number (required) - Loan amount
 *   annualRate: number (required) - Annual interest rate
 *   tenure: number (required) - Loan tenure in months
 * }
 * @returns {principal, monthlyEMI, totalInterest, totalRepayment}
 */
router.post('/quick', (req, res) => {
  try {
    const { principal, annualRate, tenure } = req.body;

    // Validate required fields
    if (principal === undefined || principal === null) {
      return res.status(400).json({
        success: false,
        error: 'Principal amount is required',
        code: 'MISSING_PRINCIPAL',
      });
    }

    if (annualRate === undefined || annualRate === null) {
      return res.status(400).json({
        success: false,
        error: 'Annual interest rate is required',
        code: 'MISSING_RATE',
      });
    }

    if (tenure === undefined || tenure === null) {
      return res.status(400).json({
        success: false,
        error: 'Tenure is required',
        code: 'MISSING_TENURE',
      });
    }

    // Calculate EMI quickly
    const result = calculateEMIQuick(
      parseFloat(principal),
      parseFloat(annualRate),
      parseFloat(tenure)
    );

    return res.status(200).json({
      success: true,
      message: 'EMI calculated successfully',
      data: result,
      calculatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error calculating quick EMI:', error);

    return res.status(400).json({
      success: false,
      error: error.message || 'Failed to calculate EMI',
      code: 'CALCULATION_ERROR',
    });
  }
});

export default router;
