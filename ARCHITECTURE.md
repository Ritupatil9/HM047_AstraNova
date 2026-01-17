# Authentication Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    React App                         │  │
│  │                   (App.tsx)                          │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │         AuthProvider                           │ │  │
│  │  │  (AuthContext.tsx)                             │ │  │
│  │  │                                                 │ │  │
│  │  │  ┌──────────────┐      ┌──────────────────┐   │ │  │
│  │  │  │ Routes       │      │ Auth State       │   │ │  │
│  │  │  ├──────────────┤      ├──────────────────┤   │ │  │
│  │  │  │ /login       │      │ user             │   │ │  │
│  │  │  │ /signup      │      │ loading          │   │ │  │
│  │  │  │ / (protected)│      │ Methods:         │   │ │  │
│  │  │  │              │      │ - login()        │   │ │  │
│  │  │  │              │      │ - signup()       │   │ │  │
│  │  │  │              │      │ - logout()       │   │ │  │
│  │  │  └──────────────┘      └──────────────────┘   │ │  │
│  │  │                                                 │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │    Components                                   │ │  │
│  │  ├────────────────────────────────────────────────┤ │  │
│  │  │ • Header (with user profile)                   │ │  │
│  │  │ • Login Page                                   │ │  │
│  │  │ • Signup Page                                  │ │  │
│  │  │ • Dashboard (Index) - Protected               │ │  │
│  │  │ • ProtectedRoute Component                     │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Firebase Config                                │ │
│  │      (src/config/firebase.ts)                          │ │
│  │                                                         │ │
│  │  • auth - Firebase Authentication                      │ │
│  │  • db - Firestore Database (optional)                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────┬──────────────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │   Firebase Backend          │
                    ├─────────────────────────────┤
                    │ • Authentication Service    │
                    │ • User Management           │
                    │ • Email/Password Auth       │
                    │ • Session Management        │
                    └─────────────────────────────┘
```

## Component Interaction Flow

### Signup Flow
```
User → Signup Page → AuthContext.signup()
  ↓
Firebase (createUserWithEmailAndPassword)
  ↓
Update Profile (displayName)
  ↓
Auto-login → Navigate to Dashboard
```

### Login Flow
```
User → Login Page → AuthContext.login()
  ↓
Firebase (signInWithEmailAndPassword)
  ↓
Auth State Updated
  ↓
Navigate to Dashboard / Index Page
```

### Dashboard Access Flow
```
User → ProtectedRoute Check
  ↓
User Authenticated? ─ YES → Dashboard (Index) ✓
  ↓
  NO → Redirect to /login
```

### Logout Flow
```
User → Click Profile → Logout
  ↓
AuthContext.logout()
  ↓
Firebase (signOut)
  ↓
Auth State Cleared
  ↓
Navigate to /login
```

## State Management

```
AuthContext (Global State)
├── user: User | null
│   ├── uid: string
│   ├── email: string
│   ├── displayName: string | null
│   └── ...other Firebase User properties
│
├── loading: boolean
│   └── Indicates if auth state is being loaded
│
└── Methods:
    ├── signup(email, password, displayName)
    ├── login(email, password)
    └── logout()
```

## Security Flow

```
1. Environment Variables (.env.local)
   └─→ Firebase credentials stored securely
   
2. Protected Routes (ProtectedRoute.tsx)
   └─→ Only authenticated users can access
   
3. Auth State Listener (onAuthStateChanged)
   └─→ Monitors session in real-time
   
4. Error Handling
   └─→ User-friendly error messages without exposing internals
   
5. Session Management
   └─→ Firebase automatically manages session tokens
```

## File Structure
```
src/
├── config/
│   └── firebase.ts                 # Firebase initialization
├── contexts/
│   └── AuthContext.tsx             # Auth state & methods
├── components/
│   ├── ProtectedRoute.tsx          # Route protection
│   ├── Header.tsx                  # User profile & logout
│   └── ... (existing components)
├── pages/
│   ├── Login.tsx                   # Login page
│   ├── Signup.tsx                  # Signup page
│   ├── Index.tsx                   # Dashboard (protected)
│   └── ... (other pages)
├── App.tsx                         # Routes & AuthProvider
└── main.tsx                        # Entry point

root/
├── .env.example                    # Template for env vars
├── .env.local                      # ⚠️ LOCAL ONLY - Firebase credentials
├── FIREBASE_SETUP.md               # Setup instructions
├── IMPLEMENTATION_SUMMARY.md       # Implementation details
└── setup-firebase.sh               # Helper script
```

## Key Technologies

- **Firebase Authentication**: User management & authentication
- **React Context API**: Global state management
- **React Router**: Navigation & route protection
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **shadcn/ui**: UI components

## Error Handling Strategy

```
Auth Error → Error Code Check
├── auth/user-not-found → "No account found with this email"
├── auth/wrong-password → "Incorrect password"
├── auth/email-already-in-use → "This email is already registered"
├── auth/weak-password → "Password is too weak"
├── auth/invalid-email → "Invalid email address"
└── Other → Generic error message
```

## Deployment Considerations

1. **Environment Variables**
   - Use `.env.local` for development
   - Set environment variables in hosting platform for production
   - Never commit `.env.local`

2. **Firebase Security Rules**
   - Configure proper Firestore rules in Firebase Console
   - Restrict data access based on user authentication
   - Test rules before deployment

3. **HTTPS Requirement**
   - Firebase requires HTTPS in production
   - Set authorized domains in Firebase Console

4. **Performance**
   - Auth state is cached by Firebase
   - Minimal API calls for subsequent visits
   - Protected routes check cached state first
