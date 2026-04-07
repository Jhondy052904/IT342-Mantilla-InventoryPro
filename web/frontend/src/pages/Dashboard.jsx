// pages/Dashboard.jsx - Main Dashboard View
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import { useState, useEffect } from 'react';
import { dashboardService } from '../api/services/dashboardService';
import { HttpError, ApiError } from '../api/apiClient';

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
    <div style={{ marginLeft: '250px', padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Error Display */}
      {error && (
        <div
          style={{
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #FECACA',
          }}
        >
          {error}
        </div>
      )}

      {/* Loading Display */}
      {loading && (
        <div
          style={{
            backgroundColor: '#E0E7FF',
            color: '#4F46E5',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #C7D2FE',
          }}
        >
          Loading dashboard data...
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Welcome back
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Summary Cards */}
      {stats && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <StatCard
            title="Low Stock"
            value={stats.lowStockCount || '12'}
            change={stats.lowStockTrend || '2.5%'}
            trend="down"
            icon="!"
          />
          <StatCard
            title="Overstocked"
            value={stats.overstockedCount || '8'}
            change={stats.overstockedTrend || '1.2%'}
            trend="up"
            icon="+"
          />
          <StatCard
            title="Out of Stock"
            value={stats.outOfStockCount || '3'}
            change={stats.outOfStockTrend || '0.8%'}
            trend="down"
            icon="✕"
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Inventory Value Trends */}
        <Card>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
            Inventory Value Trends
          </h2>
          <BarChart data={chartData} />
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {recentActivities.map((activity, index) => (
              <div
                key={activity.id}
                style={{
                  padding: '16px 0',
                  borderBottom: index < recentActivities.length - 1 ? '1px solid #E5E7EB' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#1F2937',
                        marginBottom: '4px',
                      }}
                    >
                      {activity.action}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>
                      {activity.product}
                    </p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#10B981',
                fontWeight: '500',
                textDecoration: 'none',
              }}
            >
              View all activity →
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
