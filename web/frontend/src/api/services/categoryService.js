/**
 * Category Service
 * Handles all category-related API calls
 * Uses API Client Factory - no boilerplate code
 */

import { apiClient } from '../apiClient';
import { apiConfig } from '../apiConfig';

export const categoryService = {
  /**
   * Get all active categories (non-deleted)
   */
  async getCategories() {
    return apiClient.get(apiConfig.ENDPOINTS.CATEGORIES.LIST);
  },

  /**
   * Get all categories including soft-deleted (for reports)
   */
  async getAllCategories() {
    return apiClient.get(apiConfig.ENDPOINTS.CATEGORIES.ALL);
  },

  /**
   * Create new category
   */
  async createCategory(data) {
    return apiClient.post(apiConfig.ENDPOINTS.CATEGORIES.CREATE, data);
  },

  /**
   * Update category
   */
  async updateCategory(id, data) {
    const endpoint = apiConfig.ENDPOINTS.CATEGORIES.UPDATE.replace(':id', id);
    return apiClient.put(endpoint, data);
  },

  /**
   * Delete category (soft delete)
   */
  async deleteCategory(id) {
    const endpoint = apiConfig.ENDPOINTS.CATEGORIES.DELETE.replace(':id', id);
    return apiClient.delete(endpoint);
  },
};
