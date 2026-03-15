// pages/Dashboard.jsx - Main Dashboard View
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';

export default function Dashboard() {
  const chartData = [
    { label: 'Jan', value: 24 },
    { label: 'Feb', value: 19 },
    { label: 'Mar', value: 28 },
    { label: 'Apr', value: 22 },
    { label: 'May', value: 32 },
    { label: 'Jun', value: 26 },
  ];

  const recentActivities = [
    { id: 1, action: 'Stock Updated', product: 'Organic Coffee Beans', timestamp: '2 hours ago' },
    { id: 2, action: 'New Product Added', product: 'Premium Tea Collection', timestamp: '5 hours ago' },
    { id: 3, action: 'Low Stock Alert', product: 'Honey Jar 500ml', timestamp: '1 day ago' },
    { id: 4, action: 'Stock Replenished', product: 'Almond Flour', timestamp: '2 days ago' },
  ];

  return (
    <div style={{ marginLeft: '250px', padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
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
          value="12"
          change="2.5%"
          trend="down"
          icon="!"
        />
        <StatCard
          title="Overstocked"
          value="8"
          change="1.2%"
          trend="up"
          icon="+"
        />
        <StatCard
          title="Out of Stock"
          value="3"
          change="0.8%"
          trend="down"
          icon="✕"
        />
      </div>

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
