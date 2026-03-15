// pages/Products.jsx - Products Management Page
import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Coffee Beans',
      price: '$15.99',
      stock: '245',
      status: 'in-stock',
    },
    {
      id: 2,
      name: 'Premium Tea Collection',
      price: '$24.99',
      stock: '18',
      status: 'low-stock',
    },
    {
      id: 3,
      name: 'Honey Jar 500ml',
      price: '$8.99',
      stock: '0',
      status: 'out-of-stock',
    },
    {
      id: 4,
      name: 'Almond Flour 1kg',
      price: '$12.50',
      stock: '156',
      status: 'in-stock',
    },
    {
      id: 5,
      name: 'Dark Chocolate Bar',
      price: '$5.99',
      stock: '542',
      status: 'in-stock',
    },
    {
      id: 6,
      name: 'Herbal Tea Mix',
      price: '$7.50',
      stock: '5',
      status: 'low-stock',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return { bg: '#DCFCE7', color: '#166534', dot: '●' };
      case 'low-stock':
        return { bg: '#FEF3C7', color: '#B45309', dot: '●' };
      case 'out-of-stock':
        return { bg: '#FEE2E2', color: '#991B1B', dot: '●' };
      default:
        return { bg: '#E5E7EB', color: '#374151', dot: '●' };
    }
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
        <Button variant="primary" style={{ padding: '12px 24px' }}>
          + Add Product
        </Button>
      </div>

      {/* Products Table Card */}
      <Card>
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
                const statusColor = getStatusColor(product.status);
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
                      {product.price}
                    </td>
                    <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                      {product.stock} units
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
                        {statusColor.dot}{' '}
                        {product.status === 'in-stock'
                          ? 'In Stock'
                          : product.status === 'low-stock'
                          ? 'Low Stock'
                          : 'Out of Stock'}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '16px 12px',
                        textAlign: 'center',
                      }}
                    >
                      <button
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
      </Card>
    </div>
  );
}
