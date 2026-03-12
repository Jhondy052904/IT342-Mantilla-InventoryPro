// StatCard.jsx - Dashboard Summary Card Component
export default function StatCard({ title, value, change, icon, trend = 'up' }) {
  const trendColor = trend === 'up' ? '#10B981' : '#EF4444';
  const changeSymbol = trend === 'up' ? '↑' : '↓';

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        border: '1px solid #E5E7EB',
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            {title}
          </p>
          <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937' }}>
            {value}
          </h3>
          {change && (
            <p style={{ fontSize: '12px', color: trendColor, marginTop: '8px' }}>
              <span style={{ marginRight: '4px' }}>{changeSymbol}</span>
              {change} from last month
            </p>
          )}
        </div>
        {icon && (
          <div
            style={{
              fontSize: '20px',
              color: trendColor,
              fontWeight: '700',
              opacity: 0.8,
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
