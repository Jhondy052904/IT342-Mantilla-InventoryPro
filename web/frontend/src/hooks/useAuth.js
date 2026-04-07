/**
 * useAuth.js - Custom Hook for Auth Context
 * 
 * Pattern: Custom Hook Pattern
 * 
 * Purpose:
 * - Provide clean, convenient access to AuthContext
 * - Prevent useContext boilerplate in every component
 * - Provide error checking (hook used within provider)
 * 
 * Usage:
 *   const { user, login, logout, isAuthenticated } = useAuth();
 * 
 * Benefits:
 * ✓ Single import for all auth functionality
 * ✓ Better than useContext(AuthContext) in every file
 * ✓ Automatic error if used outside provider
 * ✓ Easy to add custom auth logic later
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
