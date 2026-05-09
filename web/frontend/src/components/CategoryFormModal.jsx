// components/CategoryFormModal.jsx - Category Form Modal Component
import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { categoryService } from '../api/services/categoryService';

const initialFormData = {
  name: '',
  description: '',
};

export default function CategoryFormModal({ open, onClose, onSuccess, category }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (category) {
      setFormData({
        name: category.name ?? '',
        description: category.description ?? '',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [open, category]);

  const isEditMode = !!category;

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

    const name = formData.name.trim();
    const description = formData.description.trim();

    // Required fields validation
    if (!name || !description) {
      setError('All fields are required.');
      return;
    }

    const payload = {
      name,
      description,
    };

    console.log('Submitting category payload:', payload);

    setSaving(true);

    try {
      if (isEditMode) {
        await categoryService.updateCategory(category.id, payload);
      } else {
        await categoryService.createCategory(payload);
      }

      setFormData(initialFormData);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Failed to save category:', err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to save category. Please try again.';

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
          {isEditMode ? 'Edit Category' : 'Add Category'}
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
            label="Category Name"
            placeholder="e.g., Beverages"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={saving}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
              Description
            </label>
            <textarea
              placeholder="Enter category description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={saving}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                minHeight: '100px',
                resize: 'vertical',
                transition: '0.2s ease-in-out',
                opacity: saving ? 0.6 : 1,
                cursor: saving ? 'not-allowed' : 'text',
              }}
            />
          </div>

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
              {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
