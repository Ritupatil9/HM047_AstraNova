# CreditUp Intelligent Chatbot

## Overview
The CreditUp Chatbot is an intelligent assistant integrated into the platform to help users understand and navigate credit-related concepts, financial terms, and platform features. It uses **keyword-based intent detection** with predefined responses and requires **no external APIs**.

## Features

### 1. **Credit Score Information**
- Explains credit score categories (300-850)
- Details credit score factors and their weightage
- Provides improvement tips
- **Keywords:** "credit score", "score category", "score range", "factors", "improve", "how to increase"

### 2. **EMI Calculator Guidance**
- Explains EMI formula and components
- Provides example calculations
- Details loan repayment concepts
- **Keywords:** "emi", "monthly payment", "loan payment", "calculate payment", "installment"

### 3. **Loan Eligibility Information**
- Lists eligibility criteria
- Explains debt-to-income ratios
- Discusses credit score importance
- **Keywords:** "eligible", "eligibility", "loan approval", "qualify for loan"

### 4. **Financial Terms Glossary**
- Defines 15+ financial terms in simple language
- Includes: Credit Score, EMI, CIBIL, Interest Rate, Principal, Tenure, DTI, Debt-to-income ratio, Credit Utilization, Default, Secured Loan, Unsecured Loan, Co-applicant
- **Keywords:** "what is", "define", "meaning of", "explain"

### 5. **Navigation Guidance**
- Guides users on where to find features
- Explains how to access specific tools
- **Keywords:** "where", "how to", "find", "go to", "access", "navigate"
- **Specific Guides:**
  - Check credit score
  - View credit tracking
  - Calculate EMI
  - Check loan eligibility
  - Update financial profile
  - Compare loans
  - View insights
  - Future features

### 6. **Platform Features Overview**
- Lists all available features
- Explains current capabilities
- Mentions coming soon features
- **Keywords:** "features", "what can i do", "what does creditup do", "capabilities"

### 7. **Future Roadmap**
- Lists 10 planned features
- Explains future enhancements
- **Keywords:** "future", "planned", "upcoming", "new features", "roadmap"
- **Planned Features:**
  1. What-If Credit Simulation
  2. AI-Driven Credit Coach
  3. Real Credit Bureau Integration
  4. Advanced ML Models
  5. Automated Financial Alerts
  6. Bank & NBFC API Integration
  7. Document Upload & Verification
  8. Blockchain Credit History
  9. Multi-Language Support
  10. Mobile App Version

### 8. **Intelligent Greeting**
- Friendly welcome messages
- Brief explanation of capabilities
- **Keywords:** "hello", "hi", "hey", "help", "assist", "support"

### 9. **Smart Fallback Response**
- Handles out-of-scope queries gracefully
- Guides users to relevant topics
- Suggests alternative questions
- Maintains conversation continuity

## Technology Stack

### Backend
- **Language:** Node.js/JavaScript
- **Framework:** Express.js
- **File:** `backend/src/services/chatbotService.js`
- **Routes:** `backend/src/routes/chatbot.js`
- **Integration:** Added to `backend/src/index.js`

### Frontend
- **Language:** TypeScript/React
- **Component:** `src/components/Chatbot.tsx`
- **Integration:** Global component in `src/App.tsx`
- **UI Framework:** Shadcn UI + Tailwind CSS

## API Endpoints

### 1. **POST /api/chatbot/message**
Send a user message and get a chatbot response.

**Request:**
```json
{
  "message": "What is a credit score?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "📊 **Credit Score Information**\n\nYour credit score (300-850) reflects your creditworthiness...",
  "timestamp": "2024-01-18T10:30:00.000Z"
}
```

### 2. **GET /api/chatbot/history**
Retrieve conversation history.

**Response:**
```json
{
  "success": true,
  "history": [
    { "user": "What is EMI?", "timestamp": 1705574400000 }
  ],
  "count": 1
}
```

### 3. **POST /api/chatbot/clear**
Clear conversation history.

**Response:**
```json
{
  "success": true,
  "message": "Conversation history cleared"
}
```

## Frontend UI

### Chatbot Button
- **Location:** Bottom-right corner of the screen (fixed position)
- **Appearance:** 
  - Closed: Blue-purple gradient, animated bounce
  - Open: Red close button
  - Z-index: 40
- **Icon:** `MessageCircle` when closed, `X` when open

### Chat Window
- **Position:** Fixed bottom-right, above the button
- **Dimensions:** 96 width × 600px height (responsive)
- **Features:**
  - Header with online status indicator
  - Scrollable message area
  - Input field with send button
  - Timestamp for each message
  - Loading state with spinner
  - Keyboard support (Enter to send)

### Message Display
- **User Messages:** Blue background, right-aligned
- **Bot Messages:** Gray background, left-aligned with border
- **Loading:** Shows "Thinking..." with spinner
- **Timestamps:** 12-hour format (HH:MM)

## Intent Detection Flow

```
User Message
    ↓
Keyword Matching
    ↓
Intent Classification
    ├── Credit Score → handleCreditScoreQuery()
    ├── EMI/Loans → handleEMIQuery()
    ├── Eligibility → handleLoanEligibilityQuery()
    ├── Navigation → handleNavigationQuery()
    ├── Financial Terms → handleFinancialTerms()
    ├── Future Features → handleFutureFeatures()
    ├── Platform Features → handlePlatformFeatures()
    ├── Greeting → handleGreeting()
    └── Unknown → handleFallback()
    ↓
Response Generation
    ↓
Return to Frontend
```

## Example Queries

### Credit Score
- "What is a credit score?"
- "What are credit score categories?"
- "How can I improve my credit score?"
- "What factors affect credit score?"

### EMI
- "How is EMI calculated?"
- "What does EMI mean?"
- "Can you explain loan installments?"

### Loans
- "Am I eligible for a loan?"
- "What determines loan eligibility?"
- "How is eligibility decided?"

### Navigation
- "Where can I check my credit score?"
- "How do I use the EMI calculator?"
- "Where is the loan comparison tool?"

### Financial Terms
- "What is CIBIL?"
- "Define debt-to-income ratio"
- "Explain credit utilization"

### Future
- "What features are coming?"
- "What's in the roadmap?"
- "What will be added next?"

## How It Works

1. **User clicks the chatbot button** in the bottom-right corner
2. **Chat window opens** with welcome message
3. **User types a query** and presses Enter or clicks Send
4. **Frontend sends request** to `/api/chatbot/message`
5. **Backend processes** the message using ChatbotService
6. **Intent detection** matches keywords and classifies the query
7. **Appropriate handler** generates a contextual response
8. **Response returned** to frontend with proper formatting
9. **Message displayed** in chat window with timestamp
10. **Conversation continues** until user closes the chat

## Key Features

✅ **No External Dependencies** - Works without APIs or ML models  
✅ **Keyword-Based Intelligence** - Fast, reliable intent detection  
✅ **Comprehensive Knowledge Base** - 100+ predefined responses  
✅ **User-Friendly** - Friendly tone, emoji support, clear formatting  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Accessibility** - Screen reader friendly, keyboard navigation  
✅ **Error Handling** - Graceful fallback for unknown queries  
✅ **Conversation History** - Stores session history (can be cleared)  

## Deployment Notes

### Backend
- Ensure `chatbotRoutes` is imported in `backend/src/index.js`
- Route should be registered as: `app.use('/api/chatbot', chatbotRoutes);`
- No additional dependencies required (uses built-in Node.js)

### Frontend
- Chatbot component is global and appears on all protected routes
- API calls use relative paths (adjust if backend is on different domain)
- Requires Tailwind CSS and Shadcn UI components

## Future Enhancements

- Multi-language support
- Sentiment analysis
- User feedback system
- AI-powered ML upgrade
- Chat export feature
- Conversation analytics
- Integration with help desk system
