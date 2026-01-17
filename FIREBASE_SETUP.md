# Firebase Authentication Setup Guide

This project now includes Firebase Authentication with Login and Signup pages. Follow these steps to configure Firebase.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the prompts to create a new Firebase project
4. Wait for the project to be ready

## Step 2: Enable Authentication

1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Email/Password** and enable it
3. Save the changes

## Step 3: Get Your Firebase Credentials

1. In the Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to find your project's config
3. Copy the following values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory of the project (copy from `.env.example`)
2. Replace the placeholder values with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 5: Install Dependencies

Dependencies are already installed, but if needed run:

```bash
npm install firebase
```

## Features Implemented

### Authentication System
- **Firebase Authentication**: Secure user authentication with email/password
- **AuthContext**: Global authentication state management
- **Protected Routes**: Dashboard is protected and requires login

### Pages
- **Login Page** (`/login`): Sign in with email and password
- **Signup Page** (`/signup`): Create new account with email, password, and name
- **Dashboard** (`/`): Main app (protected route)

### Components
- **ProtectedRoute**: Component to protect routes that require authentication
- **Header**: Updated with user profile dropdown and logout functionality
- **AuthContext**: Context provider for managing authentication state

## How It Works

1. **User Registration**: Navigate to `/signup` to create a new account
   - Enter full name, email, and password
   - Account is created in Firebase
   - User is automatically logged in and redirected to dashboard

2. **User Login**: Navigate to `/login` to sign in
   - Enter email and password
   - Upon successful login, user is redirected to dashboard

3. **Protected Dashboard**: The main dashboard (`/`) is protected
   - Unauthenticated users are redirected to `/login`
   - Authenticated users can access the dashboard
   - User profile info is displayed in the header

4. **Logout**: Click on the user avatar in the header
   - Select "Sign out" to logout
   - User is redirected to the login page

## Error Handling

The auth system includes proper error handling for:
- Invalid email format
- Weak passwords
- User not found
- Wrong password
- Email already in use
- And more...

## File Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── contexts/
│   └── AuthContext.tsx      # Authentication context and hooks
├── components/
│   ├── ProtectedRoute.tsx   # Route protection component
│   └── Header.tsx           # Updated with auth features
├── pages/
│   ├── Login.tsx            # Login page
│   ├── Signup.tsx           # Signup page
│   ├── Index.tsx            # Dashboard (protected)
│   └── NotFound.tsx         # 404 page
└── App.tsx                  # Updated with auth routes
```

## Using the useAuth Hook

In any component, you can access authentication state:

```tsx
import { useAuth } from "@/contexts/AuthContext";

export default function MyComponent() {
  const { user, loading, login, signup, logout } = useAuth();

  // user: Current user object (null if not authenticated)
  // loading: Boolean indicating if auth state is being loaded
  // login(email, password): Sign in
  // signup(email, password, displayName): Register new user
  // logout(): Sign out
}
```

## Security Notes

- **Environment Variables**: Never commit `.env.local` to version control
- **HTTPS**: Always use HTTPS in production (Firebase requires it)
- **Firestore Rules**: Set up proper security rules in Firebase Console
- **API Keys**: Keep your Firebase API key safe (it's okay to expose in web apps with security rules)

## Troubleshooting

### "Firebase Config Error"
- Check that all environment variables are correctly set in `.env.local`
- Verify values match your Firebase project

### "CORS Error"
- Make sure your Firebase project allows your domain
- Check Firebase Console > Authentication > Authorized Domains

### "User Not Found / Wrong Password"
- These are expected error messages for security
- They help prevent account enumeration attacks

## Next Steps

1. Test the login/signup flow
2. Customize the auth UI to match your branding
3. Add more authentication methods (Google, GitHub, etc.)
4. Set up Firestore for user data storage
5. Implement profile management features
