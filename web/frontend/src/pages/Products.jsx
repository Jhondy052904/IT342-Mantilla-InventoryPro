// pages/Products.jsx - Products Management Page
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProductFormModal from '../components/ProductFormModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { productService } from '../api/services/productService';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return { bg: '#DCFCE7', color: '#166534', label: 'In Stock' };
      case 'low-stock':
        return { bg: '#FEF3C7', color: '#B45309', label: 'Low Stock' };
      case 'out-of-stock':
        return { bg: '#FEE2E2', color: '#991B1B', label: 'Out of Stock' };
      default:
        return { bg: '#E5E7EB', color: '#374151', label: 'Unknown' };
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
            Products
          </h1>
          <p style={{ color: '#6B7280', fontSize: '16px' }}>
            Manage your product inventory and pricing
          </p>
        </div>
        <Button
          variant="primary"
          style={{ padding: '12px 24px' }}
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
            Loading products...
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
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
            No products found
          </div>
        )}

        {/* Table */}
        {!loading && products.length > 0 && (
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
                    Product Name
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Stock Level
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Status
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
                {products.map((product) => {
                  const status = getProductStatus(product);
                  const statusColor = getStatusColor(status);
                  return (
                    <tr
                      key={product.id}
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
                        {product.name}
                      </td>
                      <td style={{ padding: '16px 12px', color: '#1F2937', fontWeight: '600' }}>
                        {formatCurrency(product.unitPrice)}
                      </td>
                      <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                        {product.currentStock} units
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: statusColor.bg,
                            color: statusColor.color,
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          {statusColor.label}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                        }}
                      >
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setFormModalOpen(true);
                          }}
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
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteModalOpen(true);
                          }}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modals */}
      <ProductFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSuccess={refreshProducts}
        product={selectedProduct}
      />

      <DeleteProductModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSuccess={refreshProducts}
        product={selectedProduct}
      />
    </div>
  );
}
