/**
 * Product Service
 * Handles all product-related API calls
 * Uses API Client Factory - no boilerplate code
 */

import { apiClient } from '../apiClient';
import { apiConfig } from '../apiConfig';

export const productService = {
  /**
   * Fetch all products
   */
  async getProducts() {
    return apiClient.get(apiConfig.ENDPOINTS.PRODUCTS.LIST);
  },

  /**
   * Fetch single product
   */
  async getProduct(id) {
    const endpoint = apiConfig.ENDPOINTS.PRODUCTS.GET.replace(':id', id);
    return apiClient.get(endpoint);
  },

  /**
   * Create new product
   */
  async createProduct(productData) {
    return apiClient.post(apiConfig.ENDPOINTS.PRODUCTS.CREATE, productData);
  },

  /**
   * Update product
   */
  async updateProduct(id, productData) {
    const endpoint = apiConfig.ENDPOINTS.PRODUCTS.UPDATE.replace(':id', id);
    return apiClient.put(endpoint, productData);
  },

  /**
   * Delete product
   */
  async deleteProduct(id) {
    const endpoint = apiConfig.ENDPOINTS.PRODUCTS.DELETE.replace(':id', id);
    return apiClient.delete(endpoint);
  },
};
