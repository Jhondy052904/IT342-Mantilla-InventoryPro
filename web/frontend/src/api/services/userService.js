/**
 * User Service
 * Handles all user-related API calls
 * Uses API Client Factory - no boilerplate code
 */

import { apiClient } from '../apiClient';
import { apiConfig } from '../apiConfig';

export const userService = {
  /**
   * Fetch all users
   */
  async getUsers() {
    return apiClient.get(apiConfig.ENDPOINTS.USERS.LIST);
  },

  /**
   * Create new user
   */
  async createUser(userData) {
    return apiClient.post(apiConfig.ENDPOINTS.USERS.CREATE, userData);
  },

  /**
   * Update user
   */
  async updateUser(id, userData) {
    const endpoint = apiConfig.ENDPOINTS.USERS.UPDATE.replace(':id', id);
    return apiClient.put(endpoint, userData);
  },

  /**
   * Delete user
   */
  async deleteUser(id) {
    const endpoint = apiConfig.ENDPOINTS.USERS.DELETE.replace(':id', id);
    return apiClient.delete(endpoint);
  },
};
