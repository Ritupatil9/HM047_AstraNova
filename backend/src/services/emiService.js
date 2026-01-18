/**
 * EMI Calculator Service
 * 
 * Implements EMI (Equated Monthly Installment) calculation
 * Formula: EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
 * Where:
 * - P = Principal (Loan Amount)
 * - r = Monthly interest rate (Annual rate / 12 / 100)
 * - n = Number of months
 */

/**
 * Validate EMI calculation inputs
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenure - Loan tenure (in months)
 * @throws {Error} If inputs are invalid
 */
const validateInputs = (principal, annualRate, tenure) => {
  if (!principal || isNaN(principal) || principal <= 0) {
    throw new Error('Principal amount must be a positive number');
  }

  if (annualRate < 0 || isNaN(annualRate)) {
    throw new Error('Annual interest rate must be a non-negative number');
  }

  if (!tenure || isNaN(tenure) || tenure <= 0) {
    throw new Error('Tenure must be a positive number');
  }

  if (principal > 10000000) {
    throw new Error('Principal amount cannot exceed ₹1 Crore');
  }

  if (annualRate > 50) {
    throw new Error('Annual interest rate cannot exceed 50%');
  }

  if (tenure > 600) {
    throw new Error('Tenure cannot exceed 600 months (50 years)');
  }
};

/**
 * Calculate monthly EMI
 * @param {number} principal - Loan amount (P)
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenureMonths - Loan tenure in months (n)
 * @returns {number} Monthly EMI
 */
const calculateEMI = (principal, annualRate, tenureMonths) => {
  if (annualRate === 0) {
    // If interest rate is 0, EMI is simply principal divided by tenure
    return principal / tenureMonths;
  }

  const monthlyRate = annualRate / 12 / 100; // r
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
  const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;

  return numerator / denominator;
};

/**
 * Generate amortization schedule
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenureMonths - Loan tenure in months
 * @param {number} monthlyEMI - Calculated monthly EMI
 * @returns {Array} Amortization schedule
 */
const generateAmortizationSchedule = (principal, annualRate, tenureMonths, monthlyEMI) => {
  const monthlyRate = annualRate / 12 / 100;
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayable = Math.round(balance * monthlyRate * 100) / 100;
    const principalPayable = Math.round((monthlyEMI - interestPayable) * 100) / 100;
    balance = Math.round((balance - principalPayable) * 100) / 100;

    // Ensure last payment balances out
    if (month === tenureMonths) {
      balance = 0;
    }

    schedule.push({
      month,
      emi: Math.round(monthlyEMI * 100) / 100,
      principal: principalPayable,
      interest: interestPayable,
      balance: Math.max(0, balance), // Ensure no negative balance
    });
  }

  return schedule;
};

/**
 * Calculate complete EMI details
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenure - Loan tenure
 * @param {string} tenureUnit - 'months' or 'years' (default: 'months')
 * @returns {Object} Complete EMI calculation details
 */
export const calculateEMIDetails = (principal, annualRate, tenure, tenureUnit = 'months') => {
  try {
    // Convert tenure to months if provided in years
    const tenureMonths = tenureUnit === 'years' ? tenure * 12 : tenure;

    // Validate inputs
    validateInputs(principal, annualRate, tenureMonths);

    // Calculate monthly EMI
    const monthlyEMI = calculateEMI(principal, annualRate, tenureMonths);

    // Calculate totals
    const totalRepayment = Math.round(monthlyEMI * tenureMonths * 100) / 100;
    const totalInterest = Math.round((totalRepayment - principal) * 100) / 100;

    // Generate amortization schedule
    const amortizationSchedule = generateAmortizationSchedule(
      principal,
      annualRate,
      tenureMonths,
      monthlyEMI
    );

    return {
      success: true,
      calculation: {
        principal: Math.round(principal * 100) / 100,
        annualInterestRate: annualRate,
        tenureMonths,
        tenureYears: Math.round((tenureMonths / 12) * 100) / 100,
        monthlyEMI: Math.round(monthlyEMI * 100) / 100,
        totalInterest,
        totalRepayment,
      },
      breakup: {
        principal: principal,
        interest: totalInterest,
        principalPercentage: Math.round((principal / totalRepayment) * 100 * 100) / 100,
        interestPercentage: Math.round((totalInterest / totalRepayment) * 100 * 100) / 100,
      },
      amortizationSchedule,
    };
  } catch (error) {
    throw new Error(`EMI Calculation Error: ${error.message}`);
  }
};

/**
 * Calculate EMI for quick preview (without amortization schedule)
 * Used for what-if scenarios and quick comparisons
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate
 * @param {number} tenure - Loan tenure in months
 * @returns {Object} Quick EMI summary
 */
export const calculateEMIQuick = (principal, annualRate, tenure) => {
  try {
    validateInputs(principal, annualRate, tenure);

    const monthlyEMI = calculateEMI(principal, annualRate, tenure);
    const totalRepayment = monthlyEMI * tenure;
    const totalInterest = totalRepayment - principal;

    return {
      success: true,
      principal: Math.round(principal * 100) / 100,
      monthlyEMI: Math.round(monthlyEMI * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
    };
  } catch (error) {
    throw new Error(`EMI Quick Calculation Error: ${error.message}`);
  }
};
