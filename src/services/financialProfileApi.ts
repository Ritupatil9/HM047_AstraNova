/**
 * API Service for Financial Profile
 * 
 * This service handles all communication with the backend API.
 * It encapsulates the API details and provides clean methods for the frontend.
 * 
 * The frontend should ONLY use these methods - never call the API directly.
 * Backend is responsible for: validation, authorization, persistence, business logic
 * Frontend is responsible for: form display, user input collection, API calls
 */

import { useAuth } from '@/contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface FinancialProfile {
  id: string;
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  employment_type: string;
  existing_loan_amount: number;
  credit_utilization_percentage: number;
  payment_history_status: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  data?: T;
}

/**
 * Get authentication token from current user
 * This is a helper to retrieve the Firebase ID token
 */
export const getAuthToken = async (user: any): Promise<string> => {
  if (!user) {
    throw new Error('User not authenticated');
  }
  return await user.getIdToken();
};

/**
 * Create a new financial profile
 * Backend validates all data and ensures one profile per user
 */
export const createFinancialProfile = async (
  user: any,
  profileData: Omit<FinancialProfile, 'id' | 'created_at' | 'updated_at'>
): Promise<FinancialProfile> => {
  const token = await getAuthToken(user);

  const response = await fetch(`${API_BASE_URL}/financial-profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data: ApiResponse<FinancialProfile> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to create financial profile');
  }

  if (!data.data) {
    throw new Error('No profile data returned from server');
  }

  return data.data;
};

/**
 * Fetch user's financial profile
 * Backend ensures user can only access their own profile
 */
export const fetchFinancialProfile = async (user: any): Promise<FinancialProfile | null> => {
  const token = await getAuthToken(user);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_BASE_URL}/financial-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data: ApiResponse<FinancialProfile> = await response.json();

    // Profile not found is not an error - it means user hasn't created one yet
    if (!data.success) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(data.error || 'Failed to fetch financial profile');
    }

    return data.data || null;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - backend may be unavailable');
    }
    throw error;
  }
};

/**
 * Update user's financial profile
 * Backend allows partial updates and validates all data
 */
export const updateFinancialProfile = async (
  user: any,
  updates: Partial<Omit<FinancialProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<FinancialProfile> => {
  const token = await getAuthToken(user);

  const response = await fetch(`${API_BASE_URL}/financial-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  const data: ApiResponse<FinancialProfile> = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to update financial profile');
  }

  if (!data.data) {
    throw new Error('No profile data returned from server');
  }

  return data.data;
};

/**
 * Check if user has a financial profile
 * Useful for conditional rendering
 */
export const checkProfileExists = async (user: any): Promise<boolean> => {
  if (!user) {
    return false;
  }
  
  try {
    const token = await getAuthToken(user);
    const response = await fetch(`${API_BASE_URL}/financial-profile/exists`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: ApiResponse<{ has_profile: boolean }> = await response.json();

    if (!data.success) {
      // Profile check failed, assume no profile
      return false;
    }

    return data.data?.has_profile || false;
  } catch (error) {
    console.error('Profile check error:', error);
    return false;
  }
};

/**
 * Custom hook for financial profile operations
 * Use this in components for easy access to profile functionality
 */
export const useFinancialProfile = () => {
  const { user } = useAuth();

  return {
    createProfile: (data: Omit<FinancialProfile, 'id' | 'created_at' | 'updated_at'>) =>
      createFinancialProfile(user, data),
    fetchProfile: () => fetchFinancialProfile(user),
    updateProfile: (updates: Partial<Omit<FinancialProfile, 'id' | 'created_at' | 'updated_at'>>) =>
      updateFinancialProfile(user, updates),
    checkExists: () => checkProfileExists(user),
  };
};
