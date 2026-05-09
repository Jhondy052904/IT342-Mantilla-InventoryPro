import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { userService } from '../api/services/userService';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userRole: 'USER',
};

export default function UserFormModal({ open, onClose, onSuccess, user }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (user) {
      setFormData({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        password: '',
        userRole: user.userRole ?? 'USER',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [open, user]);

  const isEditMode = !!user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (saving) return;
    setError('');
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const userRole = formData.userRole;

    // Required fields validation
    if (!firstName || !lastName || !email || !userRole) {
      setError('All fields are required.');
      return;
    }

    // Password required in Add mode
    if (!isEditMode && !password) {
      setError('Password is required.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      userRole,
    };

    // Only include password in Add mode
    if (!isEditMode) {
      payload.password = password;
    }

    console.log('Submitting user payload:', payload);

    setSaving(true);

    try {
      if (isEditMode) {
        await userService.updateUser(user.id, payload);
      } else {
        await userService.createUser(payload);
      }

      setFormData(initialFormData);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Failed to save user:', err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to save user. Please try again.';

      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2
          style={{
            margin: '0 0 24px 0',
            fontSize: '24px',
            fontWeight: '700',
            color: '#1F2937',
          }}
        >
          {isEditMode ? 'Edit User' : 'Add User'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#FEE2E2',
                color: '#991B1B',
                borderRadius: '8px',
                fontSize: '14px',
                border: '1px solid #FECACA',
              }}
            >
              {error}
            </div>
          )}

          <Input
            label="First Name"
            placeholder="e.g., John"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={saving}
            required
          />

          <Input
            label="Last Name"
            placeholder="e.g., Doe"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={saving}
            required
          />

          <Input
            label="Email"
            placeholder="e.g., john.doe@example.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={saving || isEditMode}
            required
          />

          {!isEditMode && (
            <Input
              label="Password"
              placeholder="Enter password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={saving}
              required
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
              Role
            </label>
            <select
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              disabled={saving}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                transition: '0.2s ease-in-out',
                opacity: saving ? 0.6 : 1,
                cursor: saving ? 'not-allowed' : 'text',
              }}
            >
              <option value="USER">USER</option>
              <option value="MANAGER">MANAGER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {isEditMode && (
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#FEF3C7',
                color: '#B45309',
                borderRadius: '8px',
                fontSize: '14px',
                border: '1px solid #FDE68A',
              }}
            >
              Note: Email and password cannot be changed here.
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              marginTop: '24px',
            }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={saving}
              style={{ padding: '10px 20px' }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              style={{ padding: '10px 20px' }}
            >
              {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
