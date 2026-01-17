/**
 * Credit Score Service
 * 
 * Implements credible credit score calculation based on financial profile
 * Score Range: 300-850 (industry standard)
 * 
 * Credit Score Factors:
 * - Income Stability (15%): Monthly income and employment type
 * - Debt-to-Income Ratio (35%): Monthly expenses vs income
 * - Existing Loan Burden (25%): Impact of existing loans
 * - Credit Utilization (15%): How much credit is being used
 * - Payment History (10%): Payment habits
 */

export const calculateCreditScore = (profile) => {
  if (!profile) {
    throw new Error('Financial profile is required for credit score calculation');
  }

  const {
    age,
    monthly_income,
    monthly_expenses,
    employment_type,
    existing_loan_amount,
    credit_utilization_percentage,
    payment_history_status,
  } = profile;

  // Validate inputs
  if (!monthly_income || monthly_income <= 0) {
    throw new Error('Valid monthly income is required');
  }

  if (monthly_expenses < 0 || monthly_expenses > monthly_income * 2) {
    throw new Error('Invalid monthly expenses');
  }

  if (age < 18 || age > 100) {
    throw new Error('Invalid age');
  }

  // Initialize base score
  let baseScore = 550;
  const factors = [];

  // 1. INCOME STABILITY (15% weight = 52.5 points)
  const incomeStabilityScore = calculateIncomeStability(monthly_income, age, employment_type);
  const incomeWeight = incomeStabilityScore * 0.525;
  baseScore += incomeWeight;
  factors.push({
    name: 'Income Stability',
    weight: 15,
    impact: incomeWeight,
    status: incomeWeight >= 30 ? 'positive' : 'negative',
    description: getIncomeDescription(monthly_income, age, employment_type)
  });

  // 2. DEBT-TO-INCOME RATIO (35% weight = 122.5 points)
  const dtiScore = calculateDebtToIncomeScore(monthly_income, monthly_expenses);
  const dtiWeight = dtiScore * 1.225;
  baseScore += dtiWeight;
  factors.push({
    name: 'Debt-to-Income Ratio',
    weight: 35,
    impact: dtiWeight,
    status: dtiWeight >= 70 ? 'positive' : 'negative',
    description: getDebtToIncomeDescription(monthly_income, monthly_expenses)
  });

  // 3. EXISTING LOAN BURDEN (25% weight = 87.5 points)
  const loanBurdenScore = calculateLoanBurdenScore(monthly_income, existing_loan_amount);
  const loanWeight = loanBurdenScore * 0.875;
  baseScore += loanWeight;
  factors.push({
    name: 'Existing Loan Management',
    weight: 25,
    impact: loanWeight,
    status: loanWeight >= 50 ? 'positive' : 'negative',
    description: getLoanBurdenDescription(monthly_income, existing_loan_amount)
  });

  // 4. CREDIT UTILIZATION (15% weight = 52.5 points)
  const creditUtilScore = calculateCreditUtilizationScore(credit_utilization_percentage);
  const creditWeight = creditUtilScore * 0.525;
  baseScore += creditWeight;
  factors.push({
    name: 'Credit Utilization',
    weight: 15,
    impact: creditWeight,
    status: creditWeight >= 30 ? 'positive' : 'negative',
    description: getCreditUtilizationDescription(credit_utilization_percentage)
  });

  // 5. PAYMENT HISTORY (10% weight = 35 points)
  const paymentHistoryScore = calculatePaymentHistoryScore(payment_history_status);
  const paymentWeight = paymentHistoryScore * 0.35;
  baseScore += paymentWeight;
  factors.push({
    name: 'Payment History',
    weight: 10,
    impact: paymentWeight,
    status: paymentWeight >= 20 ? 'positive' : 'negative',
    description: getPaymentHistoryDescription(payment_history_status)
  });

  // Clamp score between 300-850
  const finalScore = Math.max(300, Math.min(850, Math.round(baseScore)));

  // Determine category
  const category = getCreditCategory(finalScore);

  return {
    score: finalScore,
    category,
    factors,
    summary: generateCreditScoreSummary(finalScore, category, factors),
    improvements: generateImprovementSuggestions(profile, factors)
  };
};

/**
 * Calculate income stability score (0-100)
 * Based on monthly income and employment type
 */
function calculateIncomeStability(monthlyIncome, age, employmentType) {
  let score = 0;

  // Income level scoring
  if (monthlyIncome >= 150000) score += 40;
  else if (monthlyIncome >= 100000) score += 35;
  else if (monthlyIncome >= 50000) score += 30;
  else if (monthlyIncome >= 25000) score += 20;
  else score += 10;

  // Employment type scoring
  if (employmentType === 'Salaried') score += 30;
  else if (employmentType === 'Self-Employed') score += 20;
  else if (employmentType === 'Business Owner') score += 18;
  else if (employmentType === 'Freelancer') score += 12;
  else score += 8;

  // Age factor (younger is slightly less stable)
  if (age >= 35 && age <= 55) score += 15;
  else if (age >= 25 && age <= 65) score += 10;
  else score += 5;

  return Math.min(score, 100);
}

/**
 * Calculate debt-to-income ratio score (0-100)
 * Lower DTI is better (target: < 40%)
 */
function calculateDebtToIncomeScore(monthlyIncome, monthlyExpenses) {
  const dtiRatio = (monthlyExpenses / monthlyIncome) * 100;

  if (dtiRatio <= 20) return 100;
  else if (dtiRatio <= 30) return 90;
  else if (dtiRatio <= 40) return 75;
  else if (dtiRatio <= 50) return 50;
  else if (dtiRatio <= 70) return 30;
  else return 10;
}

/**
 * Calculate loan burden score (0-100)
 * Based on loan-to-income ratio
 */
function calculateLoanBurdenScore(monthlyIncome, existingLoanAmount) {
  if (existingLoanAmount <= 0) return 100; // No loans is perfect

  const loanToIncomeRatio = existingLoanAmount / (monthlyIncome * 12);

  if (loanToIncomeRatio <= 2) return 95;
  else if (loanToIncomeRatio <= 3) return 85;
  else if (loanToIncomeRatio <= 4) return 70;
  else if (loanToIncomeRatio <= 5) return 50;
  else if (loanToIncomeRatio <= 7) return 30;
  else return 15;
}

/**
 * Calculate credit utilization score (0-100)
 * Target: 30% or less is ideal
 */
function calculateCreditUtilizationScore(creditUtilizationPercentage) {
  if (creditUtilizationPercentage <= 10) return 100;
  else if (creditUtilizationPercentage <= 20) return 95;
  else if (creditUtilizationPercentage <= 30) return 90;
  else if (creditUtilizationPercentage <= 50) return 70;
  else if (creditUtilizationPercentage <= 70) return 50;
  else if (creditUtilizationPercentage <= 90) return 25;
  else return 10;
}

/**
 * Calculate payment history score (0-100)
 */
function calculatePaymentHistoryScore(paymentHistoryStatus) {
  switch (paymentHistoryStatus?.toLowerCase()) {
    case 'excellent': return 100;
    case 'good': return 85;
    case 'fair': return 60;
    case 'poor': return 30;
    case 'no history': return 40;
    default: return 40;
  }
}

/**
 * Get credit score category
 */
function getCreditCategory(score) {
  if (score >= 750) return 'Excellent';
  else if (score >= 670) return 'Good';
  else if (score >= 580) return 'Fair';
  else return 'Poor';
}

/**
 * Generate descriptions for each factor
 */
function getIncomeDescription(monthlyIncome, age, employmentType) {
  let description = `Monthly Income: ₹${monthlyIncome.toLocaleString('en-IN')}. `;
  
  if (monthlyIncome >= 150000) {
    description += 'Excellent income level - strong credit factor. ';
  } else if (monthlyIncome >= 50000) {
    description += 'Good income level for most lending criteria. ';
  } else {
    description += 'Income is lower - may limit borrowing capacity. ';
  }

  description += `Employment: ${employmentType} (${employmentType === 'Salaried' ? 'Stable' : 'Variable'} income).`;
  
  return description;
}

function getDebtToIncomeDescription(monthlyIncome, monthlyExpenses) {
  const dtiRatio = ((monthlyExpenses / monthlyIncome) * 100).toFixed(1);
  
  if (dtiRatio <= 30) {
    return `Your DTI of ${dtiRatio}% is excellent! You have good disposable income remaining (₹${(monthlyIncome - monthlyExpenses).toLocaleString('en-IN')}/month).`;
  } else if (dtiRatio <= 40) {
    return `Your DTI of ${dtiRatio}% is acceptable. You have adequate savings capacity.`;
  } else if (dtiRatio <= 50) {
    return `Your DTI of ${dtiRatio}% is concerning. Consider reducing expenses to improve credit score.`;
  } else {
    return `Your DTI of ${dtiRatio}% is high. Monthly expenses exceed 50% of income - immediate cost reduction needed.`;
  }
}

function getLoanBurdenDescription(monthlyIncome, existingLoanAmount) {
  if (existingLoanAmount <= 0) {
    return 'No existing loans - excellent for credit score! You have full borrowing capacity available.';
  }

  const monthlyLoanPayment = existingLoanAmount / 60; // Assume 5-year loan
  const loanToIncomeRatio = ((existingLoanAmount / (monthlyIncome * 12)) * 100).toFixed(1);

  if (loanToIncomeRatio <= 2) {
    return `Loan-to-Income ratio of ${loanToIncomeRatio}% is excellent. Your loan burden is minimal.`;
  } else if (loanToIncomeRatio <= 3) {
    return `Loan-to-Income ratio of ${loanToIncomeRatio}% is good. Manageable loan obligations.`;
  } else if (loanToIncomeRatio <= 5) {
    return `Loan-to-Income ratio of ${loanToIncomeRatio}% is moderate. Consider paying down loans if possible.`;
  } else {
    return `Loan-to-Income ratio of ${loanToIncomeRatio}% is high. High existing debt obligations.`;
  }
}

function getCreditUtilizationDescription(creditUtilizationPercentage) {
  if (creditUtilizationPercentage <= 30) {
    return `Credit utilization at ${creditUtilizationPercentage}% is ideal! You're using credit responsibly.`;
  } else if (creditUtilizationPercentage <= 50) {
    return `Credit utilization at ${creditUtilizationPercentage}% is moderate. Try to keep it below 30%.`;
  } else if (creditUtilizationPercentage <= 70) {
    return `Credit utilization at ${creditUtilizationPercentage}% is high. This negatively impacts your score.`;
  } else {
    return `Credit utilization at ${creditUtilizationPercentage}% is very high! Significantly paying down credit will improve your score.`;
  }
}

function getPaymentHistoryDescription(paymentHistoryStatus) {
  switch (paymentHistoryStatus?.toLowerCase()) {
    case 'excellent':
      return 'Payment history is excellent! Consistent on-time payments are reflected in your credit score.';
    case 'good':
      return 'Payment history is good. Maintain this record to keep your score strong.';
    case 'fair':
      return 'Payment history is fair. A few missed or late payments are impacting your score.';
    case 'poor':
      return 'Payment history is poor. Past delinquencies are significantly lowering your score.';
    case 'no history':
      return 'No payment history available. Building a track record of on-time payments will improve your score.';
    default:
      return 'Payment history not specified. Consistent on-time payments are important for credit health.';
  }
}

/**
 * Generate a comprehensive credit score summary
 */
function generateCreditScoreSummary(score, category, factors) {
  let summary = `Your credit score of ${score} (${category}) is calculated based on your financial profile. `;

  const positiveFactors = factors.filter(f => f.status === 'positive');
  const negativeFactors = factors.filter(f => f.status === 'negative');

  if (positiveFactors.length > 0) {
    summary += `Your strongest areas are: ${positiveFactors.map(f => f.name).join(', ')}. `;
  }

  if (negativeFactors.length > 0) {
    summary += `Areas to improve: ${negativeFactors.map(f => f.name).join(', ')}.`;
  }

  return summary;
}

/**
 * Generate improvement suggestions
 */
function generateImprovementSuggestions(profile, factors) {
  const suggestions = [];

  // Check each factor and provide specific suggestions
  factors.forEach(factor => {
    if (factor.status === 'negative') {
      switch (factor.name) {
        case 'Income Stability':
          suggestions.push({
            priority: 'high',
            title: 'Increase Income',
            description: 'Seek a higher paying position or additional income sources. Each 10% income increase can improve your score by 10-15 points.',
            action: 'Look for career advancement or side income opportunities'
          });
          break;

        case 'Debt-to-Income Ratio':
          const dtiRatio = ((profile.monthly_expenses / profile.monthly_income) * 100).toFixed(1);
          suggestions.push({
            priority: 'high',
            title: 'Reduce Monthly Expenses',
            description: `Your DTI is ${dtiRatio}%. Aim to reduce it below 40%. Every 5% reduction can add 20-25 points to your score.`,
            action: `You need to reduce expenses by ₹${Math.round(profile.monthly_expenses - (profile.monthly_income * 0.4))} to reach 40% DTI`
          });
          break;

        case 'Existing Loan Management':
          suggestions.push({
            priority: 'medium',
            title: 'Pay Down Existing Loans',
            description: `Your existing loans are ₹${profile.existing_loan_amount.toLocaleString('en-IN')}. Reducing this by 20-30% can improve your score by 15-20 points.`,
            action: `Try to reduce loan amount to ₹${Math.round(profile.existing_loan_amount * 0.7).toLocaleString('en-IN')}`
          });
          break;

        case 'Credit Utilization':
          suggestions.push({
            priority: 'high',
            title: 'Lower Credit Card Usage',
            description: `Your credit utilization is ${profile.credit_utilization_percentage}%. Keep it below 30% for optimal results.`,
            action: `Reduce credit usage from ${profile.credit_utilization_percentage}% to below 30%`
          });
          break;

        case 'Payment History':
          suggestions.push({
            priority: 'critical',
            title: 'Improve Payment History',
            description: 'Make all payments on time, every time. Even one late payment can reduce your score by 50+ points.',
            action: 'Set up automatic payments and payment reminders'
          });
          break;
      }
    }
  });

  // Add general positive suggestions
  if (suggestions.length === 0 || factors.some(f => f.status === 'positive')) {
    suggestions.push({
      priority: 'low',
      title: 'Maintain Your Financial Health',
      description: 'Continue your current good habits. Regular review and monitoring of your financial health will help maintain or improve your score.',
      action: 'Review your credit profile quarterly'
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export default {
  calculateCreditScore,
};
