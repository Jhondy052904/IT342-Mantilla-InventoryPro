/**
 * Dashboard Service
 * Handles dashboard-related API calls
 * Uses API Client Factory - clean, simple, reusable
 */

import { apiClient } from '../apiClient';
import { apiConfig } from '../apiConfig';

export const dashboardService = {
  /**
   * Fetch dashboard statistics
   */
  async getStats() {
    return apiClient.get(apiConfig.ENDPOINTS.DASHBOARD.STATS);
  },

  /**
   * Fetch recent activities
   */
  async getActivities() {
    return apiClient.get(apiConfig.ENDPOINTS.DASHBOARD.ACTIVITIES);
  },

  /**
   * Fetch inventory trends
   */
  async getTrends() {
    return apiClient.get(apiConfig.ENDPOINTS.DASHBOARD.TRENDS);
  },
};
