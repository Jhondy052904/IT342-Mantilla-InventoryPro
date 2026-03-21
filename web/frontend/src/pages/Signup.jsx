// pages/Signup.jsx - Signup Page
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { authService } from '../services/authService';

export default function Signup({ onSignupSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('All fields are required');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }

      // Call API with firstName and lastName
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        // Auto-login user after successful registration
        const loginResponse = await authService.login({
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.success) {
          onSignupSuccess();
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
      {/* Left Side - Signup Form */}
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
              Create your account
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

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
                style={{ flex: 1 }}
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
                style={{ flex: 1 }}
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              placeholder="your@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} required disabled={loading} />
              I agree to the Terms of Service
            </label>

            <Button
              variant="primary"
              style={{ width: '100%', padding: '12px' }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={onBackToLogin}
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
                Login
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
            Join InventoryPro
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.6' }}>
            Start managing your inventory smarter today. Get real-time insights and scale your business with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
