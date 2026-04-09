/**
 * AuthContext.jsx - Global Authentication Context
 * 
 * Pattern: Context API + Provider Pattern (Structural)
 * 
 * Purpose:
 * - Centralize authentication state (user, token, isAuthenticated)
 * - Eliminate prop drilling across component hierarchy
 * - Manage auth operations (login, register, logout) globally
 * - Persist authentication state to localStorage
 * 
 * Before: isLoggedIn state in App.jsx, token scattered in localStorage calls
 * After: Single AuthContext provides all auth info to any component via useAuth hook
 * 
 * Benefits:
 * ✓ No more prop drilling (auth state through 5+ levels)
 * ✓ Centralized localStorage management
 * ✓ Automatic token restoration on page refresh
 * ✓ Easy to implement protected routes later
 * ✓ Single source of truth for user data
 */

import { createContext, useState, useEffect } from 'react';
import { authService } from '../api/services/authService';
import { apiConfig } from '../api/apiConfig';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize auth state from localStorage on mount
   * Restores user session if token exists
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem(apiConfig.TOKEN_KEY);
        const storedUser = localStorage.getItem(apiConfig.USER_KEY);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Failed to restore auth state:', err);
        // Clear invalid data
        localStorage.removeItem(apiConfig.TOKEN_KEY);
        localStorage.removeItem(apiConfig.USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with email and password
   * Stores token and user data in both state and localStorage
   */
  const login = async (credentials) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      // Extract data from nested response structure
      if (response.data && response.data.accessToken) {
        setToken(response.data.accessToken);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   * Auto-logs in after successful registration
   */
  const register = async (userData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authService.register(userData);

      // Extract data from nested response structure
      if (response.data && response.data.accessToken) {
        setToken(response.data.accessToken);
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   * Clears all auth state and localStorage
   */
  const logout = () => {
    setError(null);
    authService.logout();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Get current user from state
   */
  const getCurrentUser = () => {
    return user;
  };

  const value = {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
