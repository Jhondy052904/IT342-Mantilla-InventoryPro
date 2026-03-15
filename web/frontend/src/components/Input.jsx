// Input.jsx - Reusable Input Component
export default function Input({
  label,
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: 'inherit',
          transition: '0.2s ease-in-out',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        {...props}
      />
    </div>
  );
}
