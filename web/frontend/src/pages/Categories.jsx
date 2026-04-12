// pages/Categories.jsx - Categories Management Page
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import CategoryFormModal from '../components/CategoryFormModal';
import DeleteCategoryModal from '../components/DeleteCategoryModal';
import { categoryService } from '../api/services/categoryService';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
        console.error('Categories fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const refreshCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh categories');
      console.error('Categories refresh error:', err);
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setFormModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setFormModalOpen(true);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div style={{ marginLeft: '250px', padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            Categories
          </h1>
          <p style={{ color: '#6B7280', fontSize: '16px' }}>
            Manage your product categories
          </p>
        </div>
        <Button
          variant="primary"
          style={{ padding: '12px 24px' }}
          onClick={handleAddCategory}
        >
          + Add Category
        </Button>
      </div>

      {/* Categories Table Card */}
      <Card>
        {/* Error Banner */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              marginBottom: '16px',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              borderRadius: '6px',
              fontSize: '14px',
              border: '1px solid #FECACA',
            }}
          >
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '48px 16px',
              color: '#6B7280',
              fontSize: '16px',
            }}
          >
            Loading categories...
          </div>
        )}

        {/* Empty State */}
        {!loading && categories.length === 0 && !error && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '48px 16px',
              color: '#6B7280',
              fontSize: '16px',
            }}
          >
            No categories found
          </div>
        )}

        {/* Table */}
        {!loading && categories.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Created At
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    style={{
                      borderBottom: '1px solid #E5E7EB',
                      transition: 'background-color 0.2s ease-in-out',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#F9FAFB';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    <td style={{ padding: '16px 12px', color: '#1F2937', fontWeight: '500' }}>
                      {category.name}
                    </td>
                    <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                      {category.description}
                    </td>
                    <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                      {formatDateTime(category.createdAt)}
                    </td>
                    <td
                      style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                      }}
                    >
                      <button
                        onClick={() => handleEditCategory(category)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#10B981',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginRight: '12px',
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#059669';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#10B981';
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#EF4444',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease-in-out',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#DC2626';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#EF4444';
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Category Form Modal */}
      <CategoryFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={refreshCategories}
        category={selectedCategory}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={refreshCategories}
        category={selectedCategory}
      />
    </div>
  );
}
