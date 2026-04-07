/**
 * API Client Factory
 * 
 * Centralizes fetch logic for all API services
 * Handles: base URL, token injection, headers, error handling
 */

import { apiConfig } from './apiConfig';

/**
 * Custom HTTP Error class
 */
export class HttpError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'ApiError';
    this.originalError = originalError;
  }
}

/**
 * API Client class
 * Provides generic HTTP methods (GET, POST, PUT, DELETE)
 */
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get authorization headers with JWT token
   * Automatically retrieves token from localStorage
   */
  getAuthHeaders() {
    const token = localStorage.getItem(apiConfig.TOKEN_KEY);
    if (token) {
      return {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
    return this.headers;
  }

  /**
   * Generic GET request
   */
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }

  /**
   * Generic POST request
   */
  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  }

  /**
   * Generic PUT request
   */
  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }

  /**
   * Core request method - handles all HTTP methods
   * Centralizes: URL construction, headers, error handling, response parsing
   */
  async request(method, endpoint, data, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getAuthHeaders();

    const config = {
      method,
      headers,
      ...options,
    };

    // Add request body for POST/PUT
    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);

      // Parse response
      const responseData = await response.json();

      // Handle HTTP errors
      if (!response.ok) {
        throw new HttpError(
          responseData.message || response.statusText,
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      // Re-throw or wrap errors
      if (error instanceof HttpError) {
        throw error;
      }
      throw new ApiError('API request failed', error);
    }
  }
}

/**
 * Factory: Create API client instances
 */
export const createApiClient = (baseURL = apiConfig.BASE_URL) => {
  return new ApiClient(baseURL);
};

/**
 * Export default API client
 */
export const apiClient = createApiClient();
