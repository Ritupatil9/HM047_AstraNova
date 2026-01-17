# ML Service for Loan Prediction

This service uses a Random Forest Classifier trained on loan data to predict loan approval probability.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Copy the loan dataset:
```bash
# The dataset should be at: ../src/pages/loan_dataset_20000.csv
```

3. Train the model:
```bash
python train_model.py
```

4. Start the Flask server:
```bash
python app.py
```

The service will run on `http://localhost:5000`

## API Endpoints

### POST /predict
Predicts loan approval based on applicant data.

**Request Body:**
```json
{
  "age": 35,
  "gender": "Male",
  "marital_status": "Married",
  "education_level": "Bachelor's",
  "annual_income": 50000,
  "monthly_income": 4166.67,
  "employment_status": "Employed",
  "debt_to_income_ratio": 0.3,
  "credit_score": 720,
  "loan_amount": 20000,
  "loan_purpose": "Home",
  "interest_rate": 10.5,
  "loan_term": 36,
  "installment": 650,
  "num_of_open_accounts": 5,
  "total_credit_limit": 50000,
  "current_balance": 15000,
  "delinquency_history": 0,
  "public_records": 0,
  "num_of_delinquencies": 0
}
```

**Response:**
```json
{
  "approved": true,
  "approval_probability": 85.5,
  "risk_level": "Low",
  "recommendation": "Excellent! You have a high chance of loan approval.",
  "suggestions": [],
  "model_accuracy": 0.95
}
```

### GET /health
Check if the service is running.

### GET /model-info
Get information about the trained model.
