import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { productService } from '../api/services/productService';

const initialFormData = {
  sku: '',
  name: '',
  category: '',
  description: '',
  unit_price: '',
  current_stock: '',
  min_stock_threshold: '',
};

export default function ProductFormModal({ open, onClose, onSuccess, product }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (product) {
      setFormData({
        sku: product.sku ?? '',
        name: product.name ?? '',
        category: product.category ?? '',
        description: product.description ?? '',
        unit_price: product.unitPrice ?? '',
        current_stock: product.currentStock ?? '',
        min_stock_threshold: product.minStockThreshold ?? '',
      });
    } else {
      setFormData(initialFormData);
    }

    setError('');
  }, [open, product]);

  const isEditMode = !!product;

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

    const sku = formData.sku.trim();
    const name = formData.name.trim();
    const category = formData.category.trim();
    const description = formData.description.trim();

    const unitPrice = Number(formData.unit_price);
    const currentStock = Number(formData.current_stock);
    const minStockThreshold = Number(formData.min_stock_threshold);

    // Required fields validation
    if (!sku || !name || !category || !description) {
      setError('All text fields are required.');
      return;
    }

    // Number validation
    if (
      formData.unit_price === '' ||
      formData.current_stock === '' ||
      formData.min_stock_threshold === ''
    ) {
      setError('All numeric fields are required.');
      return;
    }

    if (Number.isNaN(unitPrice) || unitPrice < 0) {
      setError('Unit price must be a valid number greater than or equal to 0.');
      return;
    }

    if (!Number.isInteger(currentStock) || currentStock < 0) {
      setError('Current stock must be a whole number greater than or equal to 0.');
      return;
    }

    if (!Number.isInteger(minStockThreshold) || minStockThreshold < 0) {
      setError('Minimum stock threshold must be a whole number greater than or equal to 0.');
      return;
    }

    const payload = {
      sku,
      name,
      category,
      description,
      unitPrice,
      currentStock,
      minStockThreshold,
    };

    console.log('Submitting product payload:', payload);

    setSaving(true);

    try {
      if (isEditMode) {
        await productService.updateProduct(product.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      setFormData(initialFormData);
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Failed to save product:', err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Failed to save product. Please try again.';

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
          {isEditMode ? 'Edit Product' : 'Add Product'}
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
            label="SKU"
            placeholder="e.g., SKU-001"
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            disabled={saving}
          />

          <Input
            label="Product Name"
            placeholder="e.g., Organic Coffee Beans"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={saving}
          />

          <Input
            label="Category"
            placeholder="e.g., Beverages"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={saving}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
              Description
            </label>
            <textarea
              placeholder="Enter product description"
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

          <Input
            label="Unit Price"
            placeholder="e.g., 15.99"
            type="number"
            step="0.01"
            min="0"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            disabled={saving}
          />

          <Input
            label="Current Stock"
            placeholder="e.g., 100"
            type="number"
            min="0"
            step="1"
            name="current_stock"
            value={formData.current_stock}
            onChange={handleChange}
            disabled={saving}
          />

          <Input
            label="Min Stock Threshold"
            placeholder="e.g., 10"
            type="number"
            min="0"
            step="1"
            name="min_stock_threshold"
            value={formData.min_stock_threshold}
            onChange={handleChange}
            disabled={saving}
          />

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
              {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}