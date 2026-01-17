import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import json
import os

# Load the dataset
dataset_path = 'loan_dataset_20000.csv'
if not os.path.exists(dataset_path):
    print(f"Error: Dataset not found at {dataset_path}")
    print("Please ensure loan_dataset_20000.csv is in the ml-service directory")
    exit(1)

df = pd.read_csv(dataset_path)

# Preprocessing
# Encode categorical variables
le_gender = LabelEncoder()
le_marital = LabelEncoder()
le_education = LabelEncoder()
le_employment = LabelEncoder()
le_purpose = LabelEncoder()

df['gender_encoded'] = le_gender.fit_transform(df['gender'])
df['marital_status_encoded'] = le_marital.fit_transform(df['marital_status'])
df['education_level_encoded'] = le_education.fit_transform(df['education_level'])
df['employment_status_encoded'] = le_employment.fit_transform(df['employment_status'])
df['loan_purpose_encoded'] = le_purpose.fit_transform(df['loan_purpose'])

# Select features for the model
features = [
    'age', 'gender_encoded', 'marital_status_encoded', 
    'education_level_encoded', 'annual_income', 'monthly_income',
    'employment_status_encoded', 'debt_to_income_ratio', 'credit_score',
    'loan_amount', 'loan_purpose_encoded', 'interest_rate', 'loan_term',
    'installment', 'num_of_open_accounts', 'total_credit_limit',
    'current_balance', 'delinquency_history', 'public_records',
    'num_of_delinquencies'
]

X = df[features]
y = df['loan_paid_back']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
print("Training Random Forest model...")
model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=15)
model.fit(X_train, y_train)

# Evaluate
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
print(f"Training Accuracy: {train_score:.4f}")
print(f"Testing Accuracy: {test_score:.4f}")

# Get feature importance
feature_importance = dict(zip(features, model.feature_importances_))
sorted_features = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
print("\nTop 10 Most Important Features:")
for feature, importance in sorted_features[:10]:
    print(f"{feature}: {importance:.4f}")

# Save the model and encoders
joblib.dump(model, 'loan_model.pkl')
joblib.dump(le_gender, 'le_gender.pkl')
joblib.dump(le_marital, 'le_marital.pkl')
joblib.dump(le_education, 'le_education.pkl')
joblib.dump(le_employment, 'le_employment.pkl')
joblib.dump(le_purpose, 'le_purpose.pkl')

# Save feature names and model info
model_info = {
    'features': features,
    'train_accuracy': float(train_score),
    'test_accuracy': float(test_score),
    'feature_importance': {k: float(v) for k, v in sorted_features[:10]}
}

with open('model_info.json', 'w') as f:
    json.dump(model_info, f, indent=2)

print("\nModel and encoders saved successfully!")
print("Files created: loan_model.pkl, le_*.pkl, model_info.json")
