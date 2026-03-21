// services/authService.js - Authentication API Service

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { firstName, lastName, email, password }
   * @returns {Promise<Object>} Response with user data
   */
  register: async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} Response with user data
   */
  login: async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data in localStorage
      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  /**
   * Logout user (clear localStorage)
   */
  logout: () => {
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User data or null
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is logged in
   */
  isAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  },
};
