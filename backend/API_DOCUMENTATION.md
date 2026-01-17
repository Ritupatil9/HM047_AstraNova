# Financial Profile API Documentation

## Overview

The Financial Profile API provides endpoints for authenticated users to manage their financial profiles. Each user has exactly one financial profile that serves as the base for all AI, EMI, loan eligibility, and guidance features.

## Authentication

All endpoints require a Firebase ID token in the `Authorization` header:

```
Authorization: Bearer <firebase_id_token>
```

Get the token from the frontend using:
```javascript
import { useAuth } from "@/contexts/AuthContext";

const { user } = useAuth();
const token = await user.getIdToken();
```

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Create Financial Profile

Create a new financial profile for the authenticated user. Each user can only have one profile.

**Request:**
```
POST /financial-profile
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 28,
  "monthly_income": 75000,
  "monthly_expenses": 40000,
  "employment_type": "Salaried",
  "existing_loan_amount": 500000,
  "credit_utilization_percentage": 45,
  "payment_history_status": "Excellent"
}
```

**Required Fields:**
- `age` (number): Between 18-100
- `monthly_income` (number): Non-negative
- `monthly_expenses` (number): Non-negative
- `employment_type` (string): One of: Salaried, Self-Employed, Freelancer, Business Owner, Retired, Student
- `existing_loan_amount` (number): Non-negative
- `credit_utilization_percentage` (number): 0-100
- `payment_history_status` (string): One of: Excellent, Good, Fair, Poor, No History

**Success Response (201):**
```json
{
  "success": true,
  "message": "Financial profile created successfully",
  "data": {
    "id": "user_uid_123",
    "age": 28,
    "monthly_income": 75000,
    "monthly_expenses": 40000,
    "employment_type": "Salaried",
    "existing_loan_amount": 500000,
    "credit_utilization_percentage": 45,
    "payment_history_status": "Excellent",
    "user_id": "user_uid_123",
    "created_at": "2026-01-17T10:30:00Z",
    "updated_at": "2026-01-17T10:30:00Z"
  }
}
```

**Error Responses:**

Profile Already Exists (409):
```json
{
  "success": false,
  "error": "Financial profile already exists for this user. Use update endpoint to modify.",
  "code": "PROFILE_EXISTS"
}
```

Missing Fields (400):
```json
{
  "success": false,
  "error": "Missing required fields: age, monthly_income",
  "code": "MISSING_FIELDS"
}
```

Validation Error (400):
```json
{
  "success": false,
  "error": "Age must be an integer between 18 and 100; Monthly income must be a non-negative number",
  "code": "VALIDATION_ERROR"
}
```

---

### 2. Get Financial Profile

Retrieve the financial profile of the authenticated user.

**Request:**
```
GET /financial-profile
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Financial profile retrieved successfully",
  "data": {
    "id": "user_uid_123",
    "age": 28,
    "monthly_income": 75000,
    "monthly_expenses": 40000,
    "employment_type": "Salaried",
    "existing_loan_amount": 500000,
    "credit_utilization_percentage": 45,
    "payment_history_status": "Excellent",
    "user_id": "user_uid_123",
    "created_at": "2026-01-17T10:30:00Z",
    "updated_at": "2026-01-17T10:30:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Financial profile not found. Create a profile first.",
  "code": "PROFILE_NOT_FOUND"
}
```

---

### 3. Update Financial Profile

Update the financial profile of the authenticated user. Supports partial updates.

**Request:**
```
PUT /financial-profile
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body (Partial Update - all fields optional):**
```json
{
  "monthly_income": 85000,
  "monthly_expenses": 45000,
  "credit_utilization_percentage": 50
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Financial profile updated successfully",
  "data": {
    "id": "user_uid_123",
    "age": 28,
    "monthly_income": 85000,
    "monthly_expenses": 45000,
    "employment_type": "Salaried",
    "existing_loan_amount": 500000,
    "credit_utilization_percentage": 50,
    "payment_history_status": "Excellent",
    "user_id": "user_uid_123",
    "created_at": "2026-01-17T10:30:00Z",
    "updated_at": "2026-01-17T11:00:00Z"
  }
}
```

**Error Responses:**

Profile Not Found (404):
```json
{
  "success": false,
  "error": "Financial profile not found for this user. Create a profile first.",
  "code": "PROFILE_NOT_FOUND"
}
```

Validation Error (400):
```json
{
  "success": false,
  "error": "Monthly income must be a non-negative number",
  "code": "VALIDATION_ERROR"
}
```

Empty Update (400):
```json
{
  "success": false,
  "error": "No data provided for update",
  "code": "EMPTY_UPDATE"
}
```

---

### 4. Partial Update (PATCH)

PATCH is an alias for PUT. Both support partial updates.

**Request:**
```
PATCH /financial-profile
Authorization: Bearer <token>
Content-Type: application/json
```

Same as PUT request and response.

---

### 5. Check Profile Existence

Check if the authenticated user has a financial profile without retrieving full data.

**Request:**
```
GET /financial-profile/exists
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "has_profile": true
  }
}
```

---

## Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `NO_TOKEN` | 401 | No authentication token provided |
| `INVALID_TOKEN` | 401 | Invalid or expired token |
| `MALFORMED_TOKEN` | 401 | Malformed authentication token |
| `EXPIRED_TOKEN` | 401 | Token has expired |
| `NOT_AUTHENTICATED` | 401 | User not authenticated |
| `MISSING_FIELDS` | 400 | Required fields missing from request |
| `VALIDATION_ERROR` | 400 | Data validation failed |
| `EMPTY_UPDATE` | 400 | Empty update data provided |
| `PROFILE_EXISTS` | 409 | Profile already exists for user |
| `PROFILE_NOT_FOUND` | 404 | Profile not found for user |
| `SERVER_ERROR` | 500 | Internal server error |

---

## Usage Examples

### JavaScript/Fetch

```javascript
import { useAuth } from "@/contexts/AuthContext";

const { user } = useAuth();

// Get token
const token = await user.getIdToken();

// Create profile
const createResponse = await fetch('http://localhost:5000/api/financial-profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({
    age: 28,
    monthly_income: 75000,
    monthly_expenses: 40000,
    employment_type: 'Salaried',
    existing_loan_amount: 500000,
    credit_utilization_percentage: 45,
    payment_history_status: 'Excellent',
  }),
});

const data = await createResponse.json();
console.log(data);
```

### React Hook

```javascript
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export function useFinancialProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5000/api/financial-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch('http://localhost:5000/api/financial-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return { profile, loading, error, createProfile, fetchProfile };
}
```

---

## Security

- **Authentication**: All endpoints require valid Firebase ID tokens
- **Authorization**: Users can only access/modify their own profiles
- **Data Validation**: All inputs validated on server
- **Error Messages**: No sensitive information exposed in errors
- **HTTPS**: Always use HTTPS in production

---

## Rate Limiting

Currently no rate limiting. Will be added in future versions.

---

## Database Structure (Firestore)

```
financial_profiles (collection)
├── {user_id} (document - key is Firebase user ID)
│   ├── age: number
│   ├── monthly_income: number
│   ├── monthly_expenses: number
│   ├── employment_type: string
│   ├── existing_loan_amount: number
│   ├── credit_utilization_percentage: number
│   ├── payment_history_status: string
│   ├── user_id: string
│   ├── created_at: timestamp (ISO string)
│   └── updated_at: timestamp (ISO string)
```

---

## Support

For issues or questions:
1. Check error codes section above
2. Review usage examples
3. Check server logs for detailed errors
4. Ensure Firebase is properly configured
