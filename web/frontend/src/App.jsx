import { useState, useEffect } from 'react'
import './styles.css'
import './App.css'

// Hooks
import { useAuth } from './features/auth/useAuth'

// Pages
import Login from './features/auth/LoginPage'
import Signup from './features/auth/SignupPage'
import Dashboard from './features/dashboard/DashboardPage'
import Categories from './features/categories/CategoriesPage'
import Users from './features/users/UsersPage'
import Products from './features/products/ProductsPage'
import Settings from './features/settings/SettingsPage'

// Components
import Sidebar from './components/Sidebar'

function App() {
  const { isAuthenticated, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState('login')

  /**
   * Redirect to dashboard on successful login
   */
  useEffect(() => {
    if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('dashboard')
    }
  }, [isAuthenticated])

  /**
   * Redirect to login if user logs out via useAuth
   */
  useEffect(() => {
    if (!isAuthenticated && currentPage !== 'signup') {
      setCurrentPage('login')
    }
  }, [isAuthenticated, currentPage])

  /**
   * Show loading screen while auth state initializes
   */
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#F9FAFB',
        fontSize: '18px',
        color: '#6B7280'
      }}>
        Loading...
      </div>
    )
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  // Render login/signup pages if not authenticated
  if (!isAuthenticated) {
    if (currentPage === 'signup') {
      return (
        <Signup
          onBackToLogin={() => setCurrentPage('login')}
        />
      )
    }
    return <Login onNavigateToSignup={() => setCurrentPage('signup')} />
  }

  // Render main application with sidebar
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9FAFB' }}>
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'categories' && <Categories />}
      {currentPage === 'users' && <Users />}
      {currentPage === 'products' && <Products />}
      {currentPage === 'settings' && <Settings />}
    </div>
  )
}

export default App
