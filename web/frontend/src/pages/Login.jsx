// pages/Login.jsx - Login Page with Split Design
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { authService } from '../api/services/authService';
import { HttpError, ApiError } from '../api/apiClient';

export default function Login({ onLogin, onNavigateToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await authService.login({ email, password });

      if (response.success) {
        onLogin();
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      // Centralized error handling with new error classes
      if (err instanceof HttpError) {
        if (err.status === 401) {
          setError('Invalid email or password');
        } else {
          setError(err.message);
        }
      } else if (err instanceof ApiError) {
        setError('Failed to connect to server');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Left Side - Login Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          backgroundColor: '#F9FAFB',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
              InventoryPro
            </h1>
            <p style={{ fontSize: '16px', color: '#6B7280' }}>
              Login to your account
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                color: '#991B1B',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                border: '1px solid #FECACA',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} disabled={loading} />
              Remember me
            </label>

            <Button
              variant="primary"
              style={{ width: '100%', padding: '12px' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onNavigateToSignup}
                disabled={loading}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#10B981',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  padding: 0,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Brand Message */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#10B981',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '400px' }}>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '24px',
            }}
          >
            PRO
          </h2>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.3',
            }}
          >
            Stop Guessing. <br /> Start Scaling.
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.6' }}>
            Manage your inventory with confidence. Real-time insights, smart alerts, and seamless
            control.
          </p>
        </div>
      </div>
    </div>
  );
}
