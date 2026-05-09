// pages/Products.jsx - Products Management Page
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProductFormModal from '../components/ProductFormModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { productService } from '../api/services/productService';
import { categoryService } from '../api/services/categoryService';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Products fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Categories fetch error:', err);
      }
    };

    fetchCategories();
  }, []);

  const refreshProducts = async () => {
    try {
      const data = await productService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh products');
      console.error('Products refresh error:', err);
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return { bg: 'bg-green-50', color: 'text-green-700', label: 'In Stock' };
      case 'low-stock':
        return { bg: 'bg-amber-50', color: 'text-amber-700', label: 'Low Stock' };
      case 'out-of-stock':
        return { bg: 'bg-red-50', color: 'text-red-700', label: 'Out of Stock' };
      default:
        return { bg: 'bg-gray-50', color: 'text-gray-500', label: 'Unknown' };
    }
  };

  const getProductStatus = (product) => {
    if (product.currentStock === 0) {
      return 'out-of-stock';
    } else if (product.currentStock <= product.minStockThreshold) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  };

  const formatCurrency = (price) => {
    const numericPrice = parseFloat(price || 0);
    if (isNaN(numericPrice)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numericPrice);
  };

  return (
    <div className="ml-64 min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Products
          </h1>
          <p className="text-gray-500 text-base">
            Manage your product inventory and pricing
          </p>
        </div>
        <Button
          variant="primary"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
          onClick={() => {
            setSelectedProduct(null);
            setFormModalOpen(true);
          }}
        >
          + Add Product
        </Button>
      </div>

      {/* Products Table Card */}
      <Card>
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
            <p className="text-gray-500 mt-4">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4M6 7l8 4 8-4m0 0l8 4-8-4m-8 4v6a2 2 0 002 2h14a2 2 0 002-2v-6" />
              </svg>
              <p className="text-gray-500 mt-4">No products found</p>
              <p className="text-gray-400 text-sm mt-2">Get started by adding your first product</p>
            </div>
          </div>
        )}

        {/* Category Filter */}
        {!loading && products.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-8">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-600">
                Filter by Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && products.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Stock Level
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const status = getProductStatus(product);
                  const statusColor = getStatusColor(status);
                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-50 hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mr-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4M6 7l8 4 8-4m0 0l8 4-8-4m-8 4v6a2 2 0 002 2h14a2 2 0 002-2v-6" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{product.name}</span>
                            <div className="text-xs text-gray-400 mt-1">{product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                          {product.category || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {formatCurrency(product.unitPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {product.currentStock} units
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block ${statusColor.bg} ${statusColor.color} px-3 py-1 rounded-full text-xs font-medium`}
                        >
                          {statusColor.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setFormModalOpen(true);
                          }}
                          className="text-green-600 hover:text-green-800 font-medium text-sm mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Product Form Modal */}
      <ProductFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={refreshProducts}
        product={selectedProduct}
      />

      {/* Delete Product Modal */}
      <DeleteProductModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={refreshProducts}
        product={selectedProduct}
      />
    </div>
  );
}
