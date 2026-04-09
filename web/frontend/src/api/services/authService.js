/**
 * Authentication Service
 * Uses API Client Factory for all HTTP requests
 * Pure business logic - no fetch boilerplate
 */

import { apiClient } from '../apiClient';
import { apiConfig } from '../apiConfig';

export const authService = {
  /**
   * Register a new user
   */
  async register(userData) {
    const response = await apiClient.post(
      apiConfig.ENDPOINTS.AUTH.REGISTER,
      userData
    );

    // Store token and user info from nested response structure
    if (response.data && response.data.accessToken) {
      localStorage.setItem(apiConfig.TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(apiConfig.USER_KEY, JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Login user
   */
  async login(credentials) {
    const response = await apiClient.post(
      apiConfig.ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store token and user info from nested response structure
    if (response.data && response.data.accessToken) {
      localStorage.setItem(apiConfig.TOKEN_KEY, response.data.accessToken);
      localStorage.setItem(apiConfig.USER_KEY, JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Logout user - clears stored tokens and user data
   */
  logout() {
    localStorage.removeItem(apiConfig.TOKEN_KEY);
    localStorage.removeItem(apiConfig.USER_KEY);
  },

  /**
   * Get current user from localStorage
   */
  getCurrentUser() {
    const user = localStorage.getItem(apiConfig.USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem(apiConfig.TOKEN_KEY);
  },
};
