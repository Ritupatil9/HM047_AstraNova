/**
 * Validate financial profile data
 */
export const validateFinancialProfileData = (data) => {
  const errors = [];

  // Age validation
  if (data.age !== undefined) {
    if (!Number.isInteger(data.age) || data.age < 18 || data.age > 100) {
      errors.push('Age must be an integer between 18 and 100');
    }
  }

  // Monthly income validation
  if (data.monthly_income !== undefined) {
    if (typeof data.monthly_income !== 'number' || data.monthly_income < 0) {
      errors.push('Monthly income must be a non-negative number');
    }
  }

  // Monthly expenses validation
  if (data.monthly_expenses !== undefined) {
    if (typeof data.monthly_expenses !== 'number' || data.monthly_expenses < 0) {
      errors.push('Monthly expenses must be a non-negative number');
    }
  }

  // Employment type validation
  if (data.employment_type !== undefined) {
    const validTypes = ['Salaried', 'Self-Employed', 'Freelancer', 'Business Owner', 'Retired', 'Student'];
    if (!validTypes.includes(data.employment_type)) {
      errors.push(`Employment type must be one of: ${validTypes.join(', ')}`);
    }
  }

  // Existing loan amount validation
  if (data.existing_loan_amount !== undefined) {
    if (typeof data.existing_loan_amount !== 'number' || data.existing_loan_amount < 0) {
      errors.push('Existing loan amount must be a non-negative number');
    }
  }

  // Credit utilization percentage validation
  if (data.credit_utilization_percentage !== undefined) {
    if (typeof data.credit_utilization_percentage !== 'number' || data.credit_utilization_percentage < 0 || data.credit_utilization_percentage > 100) {
      errors.push('Credit utilization percentage must be a number between 0 and 100');
    }
  }

  // Payment history status validation
  if (data.payment_history_status !== undefined) {
    const validStatuses = ['Excellent', 'Good', 'Fair', 'Poor', 'No History'];
    if (!validStatuses.includes(data.payment_history_status)) {
      errors.push(`Payment history status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  return errors;
};

/**
 * Validate required fields for profile creation
 */
export const validateRequiredFields = (data) => {
  const requiredFields = [
    'age',
    'monthly_income',
    'monthly_expenses',
    'employment_type',
    'existing_loan_amount',
    'credit_utilization_percentage',
    'payment_history_status',
  ];

  const missingFields = requiredFields.filter(field => data[field] === undefined || data[field] === null);

  return missingFields;
};
