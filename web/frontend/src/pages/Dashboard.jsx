// pages/Dashboard.jsx - Main Dashboard View
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import { useState, useEffect } from 'react';
import { dashboardService } from '../api/services/dashboardService';
import { HttpError, ApiError } from '../api/apiClient';
import { Package, AlertTriangle, XCircle, DollarSign } from 'lucide-react';

export default function Dashboard() {
  // State for API data
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');

      try {
        // Fetch all data in parallel using factory services
        const [statsData, activitiesData, trendsData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getActivities(),
          dashboardService.getTrends(),
        ]);

        setStats(statsData);
        setActivities(activitiesData);
        setTrends(trendsData);
      } catch (err) {
        // Centralized error handling
        if (err instanceof HttpError) {
          if (err.status === 401) {
            setError('Session expired. Please login again.');
          } else {
            setError(`Error: ${err.message}`);
          }
        } else if (err instanceof ApiError) {
          setError('Failed to connect to API');
        } else {
          setError('An unexpected error occurred');
        }
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fallback hardcoded data if API fails (for development)
  const defaultChartData = [
    { label: 'Jan', value: 24 },
    { label: 'Feb', value: 19 },
    { label: 'Mar', value: 28 },
    { label: 'Apr', value: 22 },
    { label: 'May', value: 32 },
    { label: 'Jun', value: 26 },
  ];

  const defaultRecentActivities = [
    { id: 1, action: 'Stock Updated', product: 'Organic Coffee Beans', timestamp: '2 hours ago' },
    { id: 2, action: 'New Product Added', product: 'Premium Tea Collection', timestamp: '5 hours ago' },
    { id: 3, action: 'Low Stock Alert', product: 'Honey Jar 500ml', timestamp: '1 day ago' },
    { id: 4, action: 'Stock Replenished', product: 'Almond Flour', timestamp: '2 days ago' },
  ];

  const chartData = trends.length > 0 ? trends : defaultChartData;
  const recentActivities = activities.length > 0 ? activities : defaultRecentActivities;

  return (
    <div className="ml-64 min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-5 border border-red-200">
            {error}
          </div>
        )}

        {/* Loading Display */}
        {loading && (
          <div className="bg-blue-50 text-blue-600 p-4 rounded-lg mb-5 border border-blue-200">
            Loading dashboard data...
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Here's what's happening with your inventory today.
          </p>
        </div>

        {/* Top Header Bar */}
        <div className="border-b border-gray-100 mb-8"></div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              change={stats.totalProductsTrend}
              trend="up"
              icon={<Package className="text-green-500" />}
            />
            <StatCard
              title="Low Stock"
              value={stats.lowStockCount}
              change={stats.lowStockTrend}
              trend="down"
              icon={<AlertTriangle className="text-amber-500" />}
            />
            <StatCard
              title="Out of Stock"
              value={stats.outOfStockCount}
              change={stats.outOfStockTrend}
              trend="down"
              icon={<XCircle className="text-red-500" />}
            />
            <StatCard
              title="Total Value"
              value={stats.totalValue}
              change={stats.totalValueTrend}
              trend="up"
              icon={<DollarSign className="text-green-500" />}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {recentActivities.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No recent activity to display
                  </div>
                ) : (
                  <div className="space-y-0">
                    {recentActivities.map((activity, index) => (
                      <div key={activity.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-b-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Package className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {activity.action}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.product}
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 ml-auto">
                          {activity.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div>
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Stats
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Products</span>
                    <span className="text-2xl font-bold text-green-600">
                      {stats?.totalProducts || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Low Stock Items</span>
                    <span className="text-2xl font-bold text-amber-600">
                      {stats?.lowStockCount || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Out of Stock</span>
                    <span className="text-2xl font-bold text-red-600">
                      {stats?.outOfStockCount || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
