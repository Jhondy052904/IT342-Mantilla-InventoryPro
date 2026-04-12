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
    <div className="ml-64 min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Categories
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage your product categories
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-green-100 transition-all"
            onClick={handleAddCategory}
          >
            + Add Category
          </Button>
        </div>

        {/* Top Header Bar */}
        <div className="border-b border-gray-100 mb-8"></div>

        {/* Categories Table Card */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="text-gray-500 mt-4">Loading categories...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && categories.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-gray-300">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 002 2v12a2 2 0 002-2h6a2 2 0 002-2v-4a2 2 0 002-2z" />
                </svg>
                <p className="text-gray-500 mt-4">No categories found</p>
                <p className="text-gray-400 text-sm mt-2">Get started by adding your first category</p>
              </div>
            </div>
          )}

          {/* Table */}
          {!loading && categories.length > 0 && (
            <div className="w-full overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-150 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {category.description || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(category.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        {category.deletedAt ? (
                          <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                            Deleted
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-green-600 hover:text-green-800 font-medium text-sm mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
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
    </div>
  );
}
