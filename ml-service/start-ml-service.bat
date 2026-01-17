@echo off
echo ================================
echo Loan Prediction ML Service Setup
echo ================================
echo.

cd ml-service

echo Step 1: Installing Python dependencies...
pip install -r requirements.txt
echo.

echo Step 2: Training the machine learning model...
python train_model.py
echo.

echo Step 3: Starting the Flask API server...
echo The ML service will run on http://localhost:5000
echo.
python app.py
