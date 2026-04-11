// Sidebar.jsx - Navigation Sidebar Component
import { useAuth } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Folder, 
  Users, 
  Package, 
  Settings 
} from 'lucide-react';

export default function Sidebar({ currentPage, onNavigate }) {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    // Navigation back to login handled by App.jsx watching isAuthenticated
  };

  return (
    <div
      style={{
        width: '250px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#10B981',
            margin: 0,
          }}
        >
          InventoryPro
        </h2>
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: '100%',
              padding: '12px 20px',
              border: 'none',
              background: currentPage === item.id ? '#D1FAE5' : 'transparent',
              color: currentPage === item.id ? '#10B981' : '#6B7280',
              fontSize: '14px',
              fontWeight: currentPage === item.id ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              textAlign: 'left',
              borderLeft: currentPage === item.id ? '4px solid #10B981' : '4px solid transparent',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor =
                currentPage === item.id ? '#D1FAE5' : 'transparent';
            }}
          >
            <span style={{ marginRight: '12px' }}>
              {<item.icon size={16} />}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div
        style={{
          padding: '20px',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#DC2626';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#EF4444';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
