// components/DeleteCategoryModal.jsx - Delete Category Modal Component
import { useState, useEffect } from 'react';
import Button from './Button';
import { categoryService } from '../api/services/categoryService';

export default function DeleteCategoryModal({ open, onClose, onSuccess, category }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setDeleting(false);
      setError(null);
    }
  }, [open]);

  if (!open || !category) return null;

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setError(null);

    try {
      await categoryService.deleteCategory(category.id);
      // Success - call callbacks
      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete category. Please try again.';
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
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <h2
          style={{
            margin: '0 0 24px 0',
            fontSize: '20px',
            fontWeight: '700',
            color: '#1F2937',
          }}
        >
          Delete Category
        </h2>

        {error && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '16px',
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

        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '16px', color: '#374151', marginBottom: '8px' }}>
            Are you sure you want to delete <strong>{category.name}</strong>?
          </p>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px' }}>
            Products using this category will still be available in reports.
          </p>
          <p style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>
            This category will be hidden but kept for historical reporting purposes.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={deleting}
            style={{ padding: '10px 20px' }}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleConfirmDelete}
            disabled={deleting}
            style={{ padding: '10px 20px' }}
          >
            {deleting ? 'Deleting...' : 'Delete Category'}
          </Button>
        </div>
      </div>
    </div>
  );
}
