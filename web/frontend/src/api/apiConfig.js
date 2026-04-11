/**
 * API Configuration
 * Single source of truth for API settings
 */

export const apiConfig = {
  // Base URL - centralized, environment-dependent
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',

  // Token storage key
  TOKEN_KEY: 'token',
  USER_KEY: 'user',

  // API endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
    },

    // Dashboard
    DASHBOARD: {
      STATS: '/dashboard/stats',
      ACTIVITIES: '/dashboard/activities',
      TRENDS: '/dashboard/trends',
    },

    // Products
    PRODUCTS: {
      LIST: '/products',
      GET: '/products/:id',
      CREATE: '/products',
      UPDATE: '/products/:id',
      DELETE: '/products/:id',
    },

    // Categories
    CATEGORIES: {
      LIST: '/categories',
      ALL: '/categories/all',
      CREATE: '/categories',
      UPDATE: '/categories/:id',
      DELETE: '/categories/:id',
    },

    // Users
    USERS: {
      LIST: '/users',
      CREATE: '/users',
      UPDATE: '/users/:id',
      DELETE: '/users/:id',
    },
  },
};
