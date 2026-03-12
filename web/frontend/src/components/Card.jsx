// Card.jsx - Reusable Card Component
export default function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`} style={{ backgroundColor: '#FFFFFF' }}>
      {children}
    </div>
  );
}
