from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import json

app = Flask(__name__)
CORS(app)

# Load the trained model and encoders
model = joblib.load('loan_model.pkl')
le_gender = joblib.load('le_gender.pkl')
le_marital = joblib.load('le_marital.pkl')
le_education = joblib.load('le_education.pkl')
le_employment = joblib.load('le_employment.pkl')
le_purpose = joblib.load('le_purpose.pkl')

with open('model_info.json', 'r') as f:
    model_info = json.load(f)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': True})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Encode categorical variables
        gender_encoded = le_gender.transform([data['gender']])[0]
        marital_encoded = le_marital.transform([data['marital_status']])[0]
        education_encoded = le_education.transform([data['education_level']])[0]
        employment_encoded = le_employment.transform([data['employment_status']])[0]
        purpose_encoded = le_purpose.transform([data['loan_purpose']])[0]
        
        # Prepare features in the same order as training
        features = np.array([[
            data['age'],
            gender_encoded,
            marital_encoded,
            education_encoded,
            data['annual_income'],
            data['monthly_income'],
            employment_encoded,
            data['debt_to_income_ratio'],
            data['credit_score'],
            data['loan_amount'],
            purpose_encoded,
            data['interest_rate'],
            data['loan_term'],
            data['installment'],
            data['num_of_open_accounts'],
            data['total_credit_limit'],
            data['current_balance'],
            data['delinquency_history'],
            data['public_records'],
            data['num_of_delinquencies']
        ]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        
        # Get approval probability
        approval_probability = float(probability[1]) * 100
        
        # Determine risk level
        if approval_probability >= 80:
            risk_level = 'Low'
            recommendation = 'Excellent! You have a high chance of loan approval.'
        elif approval_probability >= 60:
            risk_level = 'Medium'
            recommendation = 'Good chances of approval. Consider improving your credit profile.'
        elif approval_probability >= 40:
            risk_level = 'Medium-High'
            recommendation = 'Moderate chances. We recommend improving your financial metrics.'
        else:
            risk_level = 'High'
            recommendation = 'Low approval chances. Please work on improving your credit score and reducing debt.'
        
        # Generate improvement suggestions
        suggestions = []
        if data['credit_score'] < 700:
            suggestions.append('Improve your credit score to above 700')
        if data['debt_to_income_ratio'] > 0.4:
            suggestions.append('Reduce your debt-to-income ratio below 40%')
        if data['delinquency_history'] > 0:
            suggestions.append('Clear any existing delinquencies')
        if data['num_of_delinquencies'] > 2:
            suggestions.append('Work on reducing the number of delinquencies')
        
        return jsonify({
            'approved': bool(prediction),
            'approval_probability': round(approval_probability, 2),
            'risk_level': risk_level,
            'recommendation': recommendation,
            'suggestions': suggestions,
            'model_accuracy': model_info['test_accuracy']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/model-info', methods=['GET'])
def get_model_info():
    return jsonify(model_info)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
