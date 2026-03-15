import { useState } from 'react'
import './styles.css'
import './App.css'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Settings from './pages/Settings'

// Components
import Sidebar from './components/Sidebar'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  const handleSignupSuccess = () => {
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }

  const handleNavigate = (page) => {
    if (page === 'login') {
      setIsLoggedIn(false)
    }
    setCurrentPage(page)
  }

  // Render login page if not logged in
  if (!isLoggedIn) {
    if (currentPage === 'signup') {
      return (
        <Signup
          onSignupSuccess={handleSignupSuccess}
          onBackToLogin={() => setCurrentPage('login')}
        />
      )
    }
    return <Login onLogin={handleLogin} onNavigateToSignup={() => setCurrentPage('signup')} />
  }

  // Render main application with sidebar
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9FAFB' }}>
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'products' && <Products />}
      {currentPage === 'settings' && <Settings />}
    </div>
  )
}

export default App
