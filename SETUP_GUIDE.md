# Financial Profile Integration - Setup Guide

## 🎯 What You Need to Do

### 1. **Frontend Environment Setup** ✅ (Already Done)
The frontend is configured and ready. The app now has:
- Login/Signup pages (public routes)
- Financial Profile page (first step for new users)
- Home page (only accessible after profile completion)
- AuthContext for Firebase authentication
- ProfileGuard to enforce financial profile completion

### 2. **Backend API Setup** ⚠️ (YOU MUST DO THIS)

#### A. Firebase Service Account Setup
```bash
# 1. Go to Firebase Console
# 2. Project Settings > Service Accounts
# 3. Click "Generate New Private Key"
# 4. This downloads a JSON file

# 5. Copy the JSON content to: backend/.env
# Save this in your backend/.env file:
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-email@appspot.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-cert-url
```

#### B. Start the Backend Server
```bash
cd backend
npm run dev
# Server runs on: http://localhost:5000
```

#### C. Check Backend is Working
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"API is running"}
```

### 3. **Frontend Environment** ⚠️ (YOU MUST DO THIS)

Create or update `d:\CreditUp\credit-companion\.env.local`:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Backend API
VITE_API_BASE_URL=http://localhost:5000/api
```

Get these values from Firebase Console > Project Settings > Your Apps

### 4. **Run Everything**

**Terminal 1 - Backend:**
```bash
cd d:\CreditUp\credit-companion\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd d:\CreditUp\credit-companion
npm run dev
```

## 🔄 User Flow

```
1. User lands on /login or /signup
        ↓
2. User authenticates with Firebase
        ↓
3. Redirected to /financial-profile (ProfileGuard enforces this)
        ↓
4. User fills out financial profile and submits
        ↓
5. API call to backend: POST http://localhost:5000/api/financial-profile
        ↓
6. Backend validates, stores in Firestore, returns profile
        ↓
7. Frontend redirects to / (home page)
        ↓
8. Home page loads with user's financial data
```

## ❌ Common Issues & Fixes

### Issue: "Failed to fetch" error
**Cause:** Backend API is not running
**Fix:** Start backend with `npm run dev` in the backend folder

### Issue: "Cannot find module" errors
**Cause:** Missing dependencies
**Fix:** Run `npm install` in both frontend and backend

### Issue: Firebase authentication errors
**Cause:** Wrong/missing Firebase credentials in .env.local
**Fix:** Verify all VITE_FIREBASE_* variables are correct

### Issue: "Bearer token invalid"
**Cause:** Firebase service account not configured in backend
**Fix:** Add FIREBASE_* variables to backend/.env from service account JSON

## 📱 Testing the Complete Flow

1. Open browser to `http://localhost:8082` (or whatever port Vite shows)
2. Click "Sign Up"
3. Create account (email: test@example.com, password: Test@123)
4. Should automatically redirect to /financial-profile
5. Fill in all fields:
   - Age: 28
   - Monthly Income: 50000
   - Monthly Expenses: 25000
   - Employment Type: Salaried
   - Existing Loan Amount: 100000
   - Credit Utilization: 35
   - Payment History: Good
6. Click "Create Profile"
7. Should see success message
8. Should redirect to / (home page)

## 🔐 Security Notes

- **Never commit .env files** to Git
- **Frontend .env.local** has API keys (public, safe for frontend)
- **Backend .env** has Firebase service account (KEEP PRIVATE!)
- **Token validation** happens on backend (secure)

## 📊 Architecture Overview

```
Frontend (React + Firebase Auth)
    ↓ (Bearer Token in Authorization header)
Backend API (Express.js)
    ↓ (Verify token with Firebase Admin SDK)
Firebase Admin SDK (validates token)
    ↓
Firestore Database (stores profiles)
```

## ✅ Checklist Before Testing

- [ ] Backend .env configured with Firebase service account
- [ ] Frontend .env.local configured with Firebase API keys
- [ ] Backend running on port 5000
- [ ] Frontend running on port 8082 (or visible port)
- [ ] Firebase Firestore database created
- [ ] Firestore security rules allow authenticated users

## 📞 What Happens When Form Submits

1. Form validates locally (frontend)
2. Collects user input (age, income, expenses, etc.)
3. Creates Bearer token from Firebase authentication
4. Sends POST to `http://localhost:5000/api/financial-profile`
5. Backend receives request:
   - Extracts token from Authorization header
   - Verifies token with Firebase Admin SDK
   - Gets user_id from verified token
   - Validates all data
   - Stores in Firestore at `financial_profiles/{user_id}`
6. Backend returns profile with timestamps
7. Frontend displays success and redirects

---

**You are all set! Follow the setup steps above and everything will work.**
