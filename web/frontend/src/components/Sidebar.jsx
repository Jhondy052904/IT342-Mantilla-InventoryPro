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
    <div className="w-64 h-screen bg-white shadow-sm border-r border-gray-100 fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="text-green-600 font-bold text-xl">
          InventoryPro
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              currentPage === item.id 
                ? 'bg-green-600 text-white shadow-sm shadow-green-200' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
