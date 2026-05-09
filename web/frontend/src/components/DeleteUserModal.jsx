import { useState, useEffect } from 'react';
import Button from './Button';
import { userService } from '../api/services/userService';

export default function DeleteUserModal({ open, onClose, onSuccess, user }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setDeleting(false);
      setError(null);
    }
  }, [open]);

  if (!open || !user) return null;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      await userService.deleteUser(user.id);
      // Success - call callbacks
      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete user. Please try again.';
      setError(errorMessage);
      setDeleting(false);
    }
  };

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
          maxWidth: '450px',
          width: '90%',
        }}
      >
        {/* Modal Header */}
        <h2 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
          Delete User
        </h2>

        {/* Modal Message */}
        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
          Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong> ({user.email})? This action
          cannot be undone.
        </p>

        {/* Warning Message */}
        <div
          style={{
            padding: '12px 16px',
            marginBottom: '24px',
            backgroundColor: '#FEF3C7',
            color: '#B45309',
            borderRadius: '8px',
            fontSize: '14px',
            border: '1px solid #FDE68A',
            lineHeight: '1.5',
          }}
        >
          Deleting this user will revoke their access to the system immediately.
        </div>

        {/* Error Banner */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '24px',
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

        {/* Modal Actions */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={deleting}
            style={{ padding: '10px 20px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: deleting ? 'not-allowed' : 'pointer',
              transition: '0.2s ease-in-out',
              opacity: deleting ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!deleting) e.currentTarget.style.backgroundColor = '#DC2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#EF4444';
            }}
          >
            {deleting ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
