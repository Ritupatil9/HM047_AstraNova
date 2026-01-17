# CreditUp

A comprehensive AI-powered credit management and financial wellness platform built with React, TypeScript, Node.js, and Firebase. Track your credit score, calculate loan EMIs, get AI-powered loan approval predictions, manage your financial profile, and access intelligent financial guidance—all in one place.

## 🌟 Core Features

### 📊 Dashboard
- **Feature Cards**: Access all platform features from a beautiful, organized dashboard
- **Credit Score Card**: Quick access to credit score calculator
- **EMI Calculator Card**: Fast route to EMI calculations
- **Loan Eligibility Card**: Check loan eligibility with "Try Now" button
- **Credit Tracking Card**: Monitor credit score history and trends
- **Financial Guidance Card**: Get personalized financial recommendations
- **What-If Simulation**: Plan future financial scenarios (Coming Soon)

### ✅ Credit Score Management
- **AI-Powered Credit Score Calculation** (300-850 range)
- **Score Categories**: Poor, Fair, Good, Very Good, Excellent
- **Factor Analysis**: 5 key factors affecting your score:
  - Payment History (35%)
  - Credit Utilization (30%)
  - Credit History Length (15%)
  - Credit Mix (10%)
  - New Inquiries (10%)
- **Personalized Recommendations**: Get tips to improve your score
- **Instant Feedback**: See real-time score changes

### 📈 Credit Tracking
- **Historical Score Tracking**: Monitor monthly credit score progression
- **Interactive Area Chart**: Visualize credit score trends over 6+ months
- **Statistics Cards**: Latest, Average, Highest, Lowest, and Trend indicators
- **Detailed History Table**: Month-by-month breakdown with color-coded status
- **Auto-Save**: Scores automatically saved when calculated
- **Insights Section**: Visual indicators for score health

### 💰 EMI Calculator
- **Multiple Loan Types**: Personal, Home, Car, Education, Business
- **Real-Time Calculations**: Instant EMI computation as you type
- **Detailed Breakdown**:
  - Monthly EMI amount
  - Total Interest payable
  - Total Repayment amount
  - Principal vs Interest pie chart
- **Amortization Schedule**: View month-by-month payment breakdown (360+ months)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Quick EMI Option**: Fast calculation without detailed schedule

### 🏦 Loan Management
- **Loan Eligibility Assessment**: Check eligibility for various loan products
- **Multiple Loan Types**: Personal, Home, Car, Education, Business loans
- **Eligibility Factors**:
  - Credit Score evaluation
  - Monthly Income analysis
  - EMI-to-Income ratio (40-50% threshold)
  - Employment stability
  - Payment history
- **Maximum Eligible Amount**: See your loan borrowing capacity
- **Try Now Button**: Easy access to loans section for detailed calculations

### 🤖 AI-Powered Loan Prediction
- **Machine Learning-Based Predictions**: Random Forest Classifier (89.48% accuracy)
- **Comprehensive Analysis**: 20+ data points including:
  - Demographics (Age, Gender, Marital Status, Education)
  - Financial Profile (Annual Income, Employment Status)
  - Credit History (Credit Score, Payment Record)
  - Credit Account Details (Open accounts, Credit limits, Balances)
- **Approval Probability**: Get instant approval likelihood percentage
- **Risk Assessment**: Low, Medium, or High-risk evaluation
- **Personalized Suggestions**: Get recommendations to improve chances

### 👤 Financial Profile Management
- **Comprehensive Profile Creation**: Store all financial information
- **Income & Expense Tracking**: Record income sources and expenses
- **Employment Details**: Job information and stability
- **Credit Information**: Existing credit accounts and history
- **Profile-Based Calculations**: Credit score adjusted by your profile
- **Secure Storage**: All data encrypted and stored in Firebase

### 🔐 Authentication & Security
- **Firebase Authentication**: Secure email/password authentication
- **Protected Routes**: All features require login
- **Session Management**: Automatic session handling
- **User Data Privacy**: Encrypted data storage in Firestore

### 💬 Intelligent Chatbot Assistant
- **Floating Chat Button**: Easy access from any page (bottom-right corner)
- **Quick Responses**: Instant answers to common questions
- **Conversational AI**: Natural language understanding
- **Local Fallback**: Works without backend running
- **Helpful Topics**:
  - Credit score categories and factors
  - EMI calculation formulas
  - Loan eligibility criteria
  - Navigation guidance
  - Financial terms explanation
  - Future features overview
  - Platform capabilities

### 🗺️ Navigation
- **Responsive Navbar**: Easy access to all sections
  - Dashboard
  - Financial Profile
  - Loans (EMI Calculator, Loan Predictor)
  - Insights
  - Future Scope
- **Mobile Friendly**: Dropdown menu for mobile devices
- **User Dropdown**: Profile management and logout

### 🚀 Future Roadmap (Future Scope Page)
1. **What-If Credit Simulation** - Simulate financial decisions
2. **AI-Driven Credit Coach** - Continuous guidance assistant
3. **Real Credit Bureau Integration** - Real CIBIL/Experian scores
4. **Advanced ML Models** - Enhanced prediction accuracy
5. **Automated Financial Alerts** - EMI and credit notifications
6. **Bank & NBFC API Integration** - Live loan offers
7. **Document Upload & Verification** - Instant verification
8. **Blockchain Credit History** - Secure record keeping
9. **Multi-Language Support** - Regional language access
10. **Mobile App Version** - On-the-go access

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing
- **TanStack Query** - Server state management
- **Shadcn UI** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Recharts** - Professional data visualization
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Efficient form management

### Backend
- **Node.js** - JavaScript runtime (v18+)
- **Express.js** - Lightweight web framework
- **Firebase Admin SDK** - Backend authentication
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **ES Modules** - Modern JavaScript modules

### ML Service
- **Python 3.8+** - Programming language
- **Flask** - Lightweight web framework
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

### Database & Auth
- **Firebase Authentication** - Secure user management
- **Firebase Firestore** - NoSQL database
- **Cloud Firestore** - Real-time database

## 📁 Project Structure

```
credit-companion/
├── src/                          # Frontend source
│   ├── components/
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── Header.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Chatbot.tsx          # AI Chatbot component
│   │   ├── CreditScoreGauge.tsx # Score visualization
│   │   ├── CreditTrendsChart.tsx # Chart component
│   │   ├── CreditTips.tsx       # Tips component
│   │   ├── EMICalculator.tsx    # EMI calculator UI
│   │   ├── LoanEligibilityCard.tsx
│   │   ├── LoanComparisonCard.tsx
│   │   ├── StatCard.tsx         # Statistics card
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx            # Landing page
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── Login.tsx            # Authentication
│   │   ├── Signup.tsx           # Registration
│   │   ├── CreditScore.tsx      # Credit score page
│   │   ├── CreditTracking.tsx   # Score tracking page
│   │   ├── EMICalculator.tsx    # EMI calculator page
│   │   ├── FinancialProfile.tsx # Profile management
│   │   ├── Loans.tsx            # Loans section
│   │   ├── Insights.tsx         # Financial insights
│   │   ├── FutureScope.tsx      # Planned features
│   │   ├── AIPrediction.tsx     # Loan prediction
│   │   └── NotFound.tsx         # 404 page
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   └── use-toast.ts         # Toast notifications
│   ├── lib/
│   │   ├── firebase.ts          # Firebase config
│   │   └── utils.ts             # Utility functions
│   ├── services/
│   │   └── financialProfileApi.ts
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── backend/                     # Express backend
│   └── src/
│       ├── index.js             # Server entry
│       ├── config/
│       │   └── firebase.js
│       ├── middleware/
│       │   ├── auth.js
│       │   └── validation.js
│       ├── routes/
│       │   ├── creditScore.js   # Credit score routes
│       │   ├── financialProfile.js
│       │   ├── emi.js           # EMI calculation routes
│       │   ├── chatbot.js       # Chatbot routes
│       │   └── ...
│       └── services/
│           ├── creditScoreService.js
│           ├── creditScoreHistoryService.js
│           ├── emiService.js    # EMI calculations
│           ├── chatbotService.js # Chatbot logic
│           └── ...
├── ml-service/                  # Python ML service
│   ├── app.py                   # Flask API
│   ├── train_model.py          # Model training script
│   ├── loan_dataset_20000.csv  # Training data
│   ├── requirements.txt         # Python dependencies
│   └── models/
│       ├── loan_model.pkl      # Trained model
│       ├── label_encoders.pkl  # Data encoders
│       └── model_info.json     # Model metadata
├── public/                      # Static assets
├── package.json                 # Frontend dependencies
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind config
├── postcss.config.js           # PostCSS config
├── vitest.config.ts            # Test configuration
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ ([nvm](https://github.com/nvm-sh/nvm) recommended)
- **Python** 3.8+ (for ML service)
- **npm** or **yarn** (package manager)
- **Firebase Account** - [Create one here](https://console.firebase.google.com/)
- **Git** (for cloning repository)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/credit-companion.git
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

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)

2. **Frontend Configuration** - Create `src/config/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

3. **Backend Configuration** - Create `backend/.env`:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### Environment Variables

**Frontend** - Create `.env` in root:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## ▶️ Running the Application

### Option 1: Frontend Only (Quick Start)
```bash
npm run dev
# Open http://localhost:5173
```

### Option 2: Full Stack with Backend & ML

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
# Backend runs on http://localhost:5000
```

**Terminal 3 - ML Service:**
```bash
cd ml-service
python app.py
# ML service runs on http://localhost:5000 (or check output)
```

## 📊 ML Model Setup

### First-Time Setup
```bash
cd ml-service
python train_model.py
```

This will:
- Load 20,000 loan records from `loan_dataset_20000.csv`
- Train Random Forest Classifier
- Save model files (`loan_model.pkl`, `label_encoders.pkl`)
- Generate model info (`model_info.json`)
- Create performance report

### Model Details
- **Algorithm**: Random Forest Classifier (100 trees)
- **Training Accuracy**: 93.97%
- **Testing Accuracy**: 89.48%
- **Features**: 20 data points
- **Classes**: Approved/Rejected

## 📖 Usage Guide

### 1. Sign Up / Login
- Create account with email and password
- Verify email if required
- All subsequent access requires authentication

### 2. Financial Profile
- Navigate to "Financial Profile"
- Enter income, expenses, employment details
- Save profile (required for credit score calculation)
- Profile data used for personalized features

### 3. Credit Score
- Go to Dashboard → "Check Credit Score"
- View AI-calculated score (300-850)
- See factor breakdown
- Get improvement recommendations
- Score auto-saved for tracking

### 4. Credit Tracking
- View historical credit scores
- Monitor 6+ months of data
- See trends and patterns
- Get insights on score health

### 5. EMI Calculator
- Go to Dashboard → "EMI Calculator" or "Loans" tab
- Select loan type
- Enter loan amount, interest rate, tenure
- View instant EMI calculations
- Check loan eligibility
- See detailed amortization schedule

### 6. Loan Prediction
- Navigate to "Loans" → "AI Prediction" tab
- Enter personal details (age, income, credit score, etc.)
- Click "Predict Approval"
- View approval probability
- See risk assessment and suggestions

### 7. AI Chatbot
- Click floating chat icon (bottom-right)
- Ask questions about:
  - Credit scores & factors
  - EMI calculations
  - Loan eligibility
  - Platform navigation
  - Financial terms
  - Future features
- Get instant intelligent responses

### 8. Insights
- Navigate to "Insights"
- Get personalized financial recommendations
- View improvement strategies
- Learn best practices

### 9. Future Scope
- Navigate to "Future Scope"
- See 10 planned features
- Learn about upcoming enhancements

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test src/components/CreditScoreGauge.test.ts

# Generate coverage report
npm run test:coverage
```

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
# Output: dist/ folder (ready for deployment)
```

### Preview Production Build
```bash
npm run preview
```

### Backend Build
```bash
cd backend
npm run build
```

### Deploy Frontend
- Build: `npm run build`
- Deploy `dist/` folder to:
  - Vercel
  - Netlify
  - GitHub Pages
  - Azure Static Web Apps
  - AWS S3 + CloudFront

### Deploy Backend
- Deploy `backend/` to:
  - Heroku
  - Railway
  - Fly.io
  - AWS Lambda
  - Google Cloud Run

### Deploy ML Service
- Deploy `ml-service/` to:
  - Heroku
  - AWS EC2
  - Google Cloud Run

## 📚 API Documentation

### Chatbot API
```
POST /api/chatbot/message
Body: { message: "string" }
Response: { success: boolean, response: string, timestamp: string }
```

### EMI API
```
POST /api/emi/calculate
POST /api/emi/quick
```

### Credit Score API
```
POST /api/credit-score/calculate
GET /api/credit-score/history
```

### Financial Profile API
```
POST /api/financial-profile
GET /api/financial-profile
PUT /api/financial-profile
```

## 📝 Documentation

- [Setup Guide](./SETUP_GUIDE.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Credit Tracking Implementation](./CREDIT_TRACKING_IMPLEMENTATION.md)
- [EMI Calculator Implementation](./EMI_CALCULATOR_IMPLEMENTATION.md)
- [EMI Calculator Quick Start](./EMI_CALCULATOR_QUICK_START.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Project**: CreditUp - Intelligent Credit Management Platform
- **Version**: 1.0.0
- **Last Updated**: January 18, 2026

## 🔗 Links

- [Firebase Console](https://console.firebase.google.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Express.js](https://expressjs.com/)
- [scikit-learn](https://scikit-learn.org/)

## 📞 Support

For support, email support@creditup.com or create an issue in the repository.

---

**Made with ❤️ for better financial wellness**

