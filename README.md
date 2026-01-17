# CreditUp

A comprehensive credit management and financial wellness platform built with React, TypeScript, and Firebase. Track your credit score, calculate loan EMIs, get AI-powered loan approval predictions, and manage your financial profile all in one place.

## 🌟 Features

### 📊 Dashboard
- **Credit Score Visualization**: Interactive gauge displaying your current credit score (300-900)
- **Financial Stats**: View credit limit, utilization, active loans, and score changes
- **Credit Trends Chart**: Historical credit score trends over time
- **Quick Actions**: Fast access to key features like credit checks, EMI calculator, and more

### 💰 EMI Calculator
- Calculate monthly EMI for different loan types (Personal, Home, Car, Education, Business)
- Real-time calculations with detailed breakdown:
  - Monthly EMI amount
  - Principal and interest breakdown
  - Total payment amount
  - Visual representation of payment distribution
- **Eligibility Assessment**: Check your loan eligibility based on EMI-to-income ratio
- Support for customizable loan parameters (amount, interest rate, tenure)

### 🤖 AI-Powered Loan Prediction
- Machine Learning-based loan approval predictions
- Comprehensive applicant profile analysis (20+ data points)
- Real-time approval probability calculation
- Risk level assessment (Low/Medium/High)
- Personalized improvement suggestions
- Powered by Random Forest Classifier (89.48% accuracy)

### 👤 Financial Profile Management
- Create and manage detailed financial profiles
- Track income, expenses, and employment details
- Secure data storage with Firebase
- Profile-based credit score calculations

### 🔐 Authentication
- Secure user authentication with Firebase Auth
- Email/password signup and login
- Protected routes for authenticated users
- User session management

### 🏦 Loan Comparison
- Compare loan options from multiple banks
- View interest rates, processing fees, and tenure
- Feature comparison (prepayment, balance transfer, etc.)
- Bank ratings and best match recommendations

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management
- **Shadcn UI** - Beautiful component library
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Firebase Admin SDK** - Backend authentication
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Request validation

### ML Service
- **Python 3** - Programming language
- **Flask** - Lightweight web framework
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

### Database & Auth
- **Firebase Authentication** - User management
- **Firebase Firestore** - NoSQL database

## 📁 Project Structure

```
credit-companion/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Shadcn UI components
│   │   ├── Header.tsx
│   │   ├── CreditScoreGauge.tsx
│   │   ├── QuickActions.tsx
│   │   └── ...
│   ├── pages/           # Route pages
│   │   ├── Index.tsx    # Dashboard
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── CreditScore.tsx
│   │   ├── Loans.tsx
│   │   └── FinancialProfile.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/            # Utility functions
│   │   ├── firebase.ts
│   │   └── utils.ts
│   └── services/       # API services
│       └── financialProfileApi.ts
├── backend/            # Express backend
│   └── src/
│       ├── index.js
│       ├── config/
│       ├── middleware/
│       ├── routes/
│       └── services/
├── ml-service/         # Python ML service
│   ├── app.py         # Flask API
│   ├── train_model.py # Model training
│   ├── requirements.txt
│   └── loan_dataset_20000.csv
└── public/            # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm)
- **Python 3.8+** - For ML service
- **npm** or **yarn** - Package manager
- **Firebase Account** - For authentication and database

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Ritupatil9/credit-companion.git
cd credit-companion
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Install ML service dependencies**
```bash
cd ml-service
pip install -r requirements.txt
cd ..
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Get your Firebase config and create `src/config/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

5. For backend, download service account key and create `backend/.env`:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

### ML Service Setup

1. **Navigate to ML service directory**
```bash
cd ml-service
```

2. **Train the model** (First time only)
```bash
python train_model.py
```

This will:
- Load the loan dataset (20,000 records)
- Train a Random Forest Classifier
- Save the model and encoders (`.pkl` files)
- Generate model info (`model_info.json`)

3. **Start the ML service**
```bash
python app.py
```

The service will run on `http://localhost:5000`



## 📱 Usage

1. **Sign Up / Login**
   - Create a new account or login with existing credentials
   - All routes except login/signup are protected

2. **Dashboard**
   - View your credit score and financial stats
   - Access quick actions for various features
   - Check credit trends over time

3. **Financial Profile**
   - Complete your financial profile with income, expenses, and employment details
   - This data is used for credit score calculations

4. **EMI Calculator**
   - Select loan type and enter loan parameters
   - Get instant EMI calculations
   - Check eligibility based on your income

5. **Loan Prediction**
   - Navigate to Loans page → AI Prediction tab
   - Fill in your details (age, income, credit score, etc.)
   - Get AI-powered loan approval prediction
   - View approval probability and risk assessment

6. **Credit Score**
   - Calculate credit score based on your financial profile
   - View detailed factor analysis
   - Get personalized improvement suggestions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🏗️ Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## 📊 ML Model Details

- **Algorithm**: Random Forest Classifier
- **Training Accuracy**: 93.97%
- **Testing Accuracy**: 89.48%
- **Features**: 20 data points including demographics, financial info, and credit history
- **Dataset**: 20,000 loan records



## 📝 License

This project is licensed under the MIT License.



