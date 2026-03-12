// BarChart.jsx - Simple Bar Chart Component
export default function BarChart({ data = [] }) {
  const maxValue = Math.max(...data.map(item => item.value), 1);

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '200px' }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <div
              style={{
                width: '100%',
                height: `${(item.value / maxValue) * 160}px`,
                backgroundColor: '#10B981',
                borderRadius: '8px 8px 0 0',
                transition: 'all 0.3s ease-in-out',
                hover: {
                  backgroundColor: '#059669',
                },
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#10B981';
              }}
            />
            <p
              style={{
                fontSize: '12px',
                color: '#6B7280',
                marginTop: '8px',
                fontWeight: '500',
              }}
            >
              {item.label}
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#1F2937',
                fontWeight: '600',
                marginTop: '2px',
              }}
            >
              ${item.value}k
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
