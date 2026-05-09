import { useState, useEffect } from 'react'
import './styles.css'
import './App.css'

// Hooks
import { useAuth } from './hooks/useAuth'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Users from './pages/Users'
import Products from './pages/Products'
import Settings from './pages/Settings'

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
