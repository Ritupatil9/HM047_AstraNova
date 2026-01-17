# Credit Score API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All credit score endpoints require Firebase authentication.

**Header:**
```
Authorization: Bearer {firebase_id_token}
```

---

## Endpoints

### 1. Calculate Credit Score
**Endpoint:** `POST /credit-score/calculate`

**Description:** Calculate credit score using existing or custom financial profile

**Request Body:**
```json
{
  "useExisting": true,
  "customProfile": null
}
```

**OR** (for custom profile):
```json
{
  "useExisting": false,
  "customProfile": {
    "age": 30,
    "monthly_income": 75000,
    "monthly_expenses": 20000,
    "employment_type": "Salaried",
    "existing_loan_amount": 500000,
    "credit_utilization_percentage": 25,
    "payment_history_status": "Good"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Credit score calculated successfully",
  "data": {
    "score": 742,
    "category": "Good",
    "factors": [
      {
        "name": "Income Stability",
        "weight": 15,
        "impact": 30.5,
        "status": "positive",
        "description": "Monthly Income: ₹75,000. Excellent income level..."
      },
      {
        "name": "Debt-to-Income Ratio",
        "weight": 35,
        "impact": 90.75,
        "status": "positive",
        "description": "Your DTI of 26.7% is excellent!..."
      },
      {
        "name": "Existing Loan Management",
        "weight": 25,
        "impact": 74.375,
        "status": "positive",
        "description": "Loan-to-Income ratio of 5.56% is excellent..."
      },
      {
        "name": "Credit Utilization",
        "weight": 15,
        "impact": 47.25,
        "status": "positive",
        "description": "Credit utilization at 25% is ideal!..."
      },
      {
        "name": "Payment History",
        "weight": 10,
        "impact": 29.75,
        "status": "positive",
        "description": "Payment history is good. Maintain this record..."
      }
    ],
    "summary": "Your credit score of 742 (Good) is calculated based on your financial profile. Your strongest areas are: Income Stability, Debt-to-Income Ratio, Existing Loan Management, Credit Utilization, Payment History.",
    "improvements": [
      {
        "priority": "low",
        "title": "Maintain Your Financial Health",
        "description": "Continue your current good habits. Regular review and monitoring of your financial health will help maintain or improve your score.",
        "action": "Review your credit profile quarterly"
      }
    ],
    "calculatedAt": "2026-01-17T10:30:00.000Z",
    "profileUsed": "existing"
  }
}
```

**Possible Errors:**

404 Not Found (useExisting = true but no profile):
```json
{
  "success": false,
  "error": "Financial profile not found. Please create a profile first.",
  "code": "PROFILE_NOT_FOUND"
}
```

400 Bad Request:
```json
{
  "success": false,
  "error": "Either useExisting must be true or customProfile must be provided",
  "code": "INVALID_REQUEST"
}
```

---

### 2. Get Current Credit Score
**Endpoint:** `GET /credit-score`

**Description:** Retrieve credit score calculated from stored financial profile

**Request:**
```
GET /credit-score
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Credit score retrieved successfully",
  "data": {
    "score": 742,
    "category": "Good",
    "factors": [...],
    "summary": "...",
    "improvements": [...],
    "calculatedAt": "2026-01-17T10:30:00.000Z"
  }
}
```

**Possible Errors:**

404 Not Found:
```json
{
  "success": false,
  "error": "Financial profile not found. Please create a profile first.",
  "code": "PROFILE_NOT_FOUND"
}
```

---

### 3. What-If Scenario
**Endpoint:** `POST /credit-score/what-if`

**Description:** Calculate credit score with hypothetical financial profile (for simulations)

**Request Body:**
```json
{
  "profile": {
    "age": 30,
    "monthly_income": 100000,
    "monthly_expenses": 25000,
    "employment_type": "Self-Employed",
    "existing_loan_amount": 300000,
    "credit_utilization_percentage": 15,
    "payment_history_status": "Excellent"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "What-if credit score calculated successfully",
  "data": {
    "score": 785,
    "category": "Excellent",
    "factors": [...],
    "summary": "...",
    "improvements": [...],
    "calculatedAt": "2026-01-17T10:30:00.000Z",
    "scenario": "what-if"
  }
}
```

**Possible Errors:**

400 Bad Request (missing profile):
```json
{
  "success": false,
  "error": "Custom profile data is required",
  "code": "MISSING_PROFILE"
}
```

400 Bad Request (invalid data):
```json
{
  "success": false,
  "error": "Valid monthly income is required",
  "code": "CALCULATION_ERROR"
}
```

---

## Data Types & Validation

### Employment Type (enum)
- `"Salaried"` - Best for credit (most stable)
- `"Self-Employed"`
- `"Business Owner"`
- `"Freelancer"` - Least stable

### Payment History Status (enum)
- `"Excellent"` - Always on-time
- `"Good"` - Mostly on-time
- `"Fair"` - Some late payments
- `"Poor"` - Multiple late payments
- `"No History"` - New to credit

### Numeric Constraints
```
age: 18-100
monthly_income: > 0
monthly_expenses: >= 0 and <= monthly_income * 2
existing_loan_amount: >= 0
credit_utilization_percentage: 0-100
```

---

## Score Factor Details

### 1. Income Stability (15% weight)
**Calculation:**
- Income level (0-40 points)
  - ≥ ₹150,000: 40 pts
  - ≥ ₹100,000: 35 pts
  - ≥ ₹50,000: 30 pts
  - ≥ ₹25,000: 20 pts
  - < ₹25,000: 10 pts

- Employment type (0-30 points)
  - Salaried: 30 pts
  - Self-Employed: 20 pts
  - Business Owner: 18 pts
  - Freelancer: 12 pts

- Age factor (0-15 points)
  - 35-55 years: 15 pts
  - 25-65 years: 10 pts
  - Other: 5 pts

**Score = min(Sum, 100)**

### 2. Debt-to-Income Ratio (35% weight)
**Calculation:**
```
DTI = (monthly_expenses / monthly_income) * 100

0-20%: 100 pts (Excellent)
21-30%: 90 pts (Good)
31-40%: 75 pts (Acceptable)
41-50%: 50 pts (Concerning)
51-70%: 30 pts (High)
> 70%: 10 pts (Critical)
```

### 3. Loan Burden (25% weight)
**Calculation:**
```
Loan-to-Income = existing_loan_amount / (monthly_income * 12)

≤ 2x: 95 pts (Excellent)
≤ 3x: 85 pts (Good)
≤ 4x: 70 pts (Acceptable)
≤ 5x: 50 pts (Moderate)
≤ 7x: 30 pts (High)
> 7x: 15 pts (Very High)

No loans: 100 pts
```

### 4. Credit Utilization (15% weight)
**Calculation:**
```
0-10%: 100 pts (Excellent)
11-20%: 95 pts (Excellent)
21-30%: 90 pts (Good)
31-50%: 70 pts (Acceptable)
51-70%: 50 pts (Moderate)
71-90%: 25 pts (High)
> 90%: 10 pts (Critical)
```

### 5. Payment History (10% weight)
**Calculation:**
```
Excellent: 100 pts
Good: 85 pts
Fair: 60 pts
Poor: 30 pts
No History: 40 pts
```

---

## Final Score Calculation

```
Base Score = 550 (minimum foundation)

Final Score = Base Score + (Income Stability × 0.525) 
                          + (DTI Score × 1.225)
                          + (Loan Burden × 0.875)
                          + (Credit Utilization × 0.525)
                          + (Payment History × 0.35)

Score Range: 300-850 (clamped)
```

---

## Score Categories

| Range | Category | Meaning |
|-------|----------|---------|
| 750-850 | Excellent | Best lending rates, high approval odds |
| 670-749 | Good | Good lending rates, should be approved |
| 580-669 | Fair | Higher interest rates, may need guarantor |
| 300-579 | Poor | May face rejection, needs improvement |

---

## Example Usage (JavaScript)

```javascript
// Using existing profile
const response = await fetch('http://localhost:5000/api/credit-score/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    useExisting: true
  })
});

const data = await response.json();
console.log(data.data.score); // 742
console.log(data.data.category); // "Good"
```

```javascript
// Using custom profile (what-if)
const response = await fetch('http://localhost:5000/api/credit-score/what-if', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    profile: {
      age: 30,
      monthly_income: 100000,
      monthly_expenses: 25000,
      employment_type: 'Salaried',
      existing_loan_amount: 200000,
      credit_utilization_percentage: 20,
      payment_history_status: 'Good'
    }
  })
});

const data = await response.json();
console.log(data.data.score); // Hypothetical score
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Score calculated |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Profile doesn't exist |
| 500 | Server Error - Internal issue |

---

## Rate Limiting
Currently: No rate limiting (can implement later)

## Response Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:8080
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. All currency values are in INR (₹)
3. Percentages are 0-100 (not 0-1)
4. Scores are recalculated on each request (not cached)
5. Historical scores can be added later with persistence

---

**API Version:** 1.0
**Last Updated:** January 17, 2026
