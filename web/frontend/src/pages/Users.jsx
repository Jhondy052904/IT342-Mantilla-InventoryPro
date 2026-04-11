// pages/Users.jsx - Users Management Page
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import UserFormModal from '../components/UserFormModal';
import DeleteUserModal from '../components/DeleteUserModal';
import { userService } from '../api/services/userService';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
        console.error('Users fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const refreshUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh users');
      console.error('Users refresh error:', err);
    }
  };

  const getRoleBadge = (role) => {
  switch (role?.toUpperCase()) {
    case 'ADMIN':
      return { label: 'Admin', bg: '#DCFCE7', color: '#166534' };
    case 'STAFF':
      return { label: 'Staff', bg: '#DBEAFE', color: '#1E40AF' };
    default:
      return { label: role || 'Unknown', bg: '#E5E7EB', color: '#374151' };
  }
};

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleFormSuccess = () => {
    refreshUsers();
    handleCloseFormModal();
  };

  const handleDeleteSuccess = () => {
    refreshUsers();
    handleCloseDeleteModal();
  };

  return (
    <div style={{ marginLeft: '250px', padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
            Users Management
          </h1>
          <Button
            variant="primary"
            onClick={handleAddUser}
            style={{ padding: '10px 20px' }}
          >
            + Add User
          </Button>
        </div>

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
            Loading users...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <Card style={{ marginBottom: '24px', backgroundColor: '#FEE2E2', borderColor: '#FECACA' }}>
            <div style={{ color: '#991B1B', fontSize: '14px' }}>
              Error: {error}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
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
            No users found
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && users.length > 0 && (
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
                    Email
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Role
                  </th>
                  <th
                    style={{
                      padding: '16px 12px',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    Joined Date
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
                {users.map((user) => {
                  const role = user.userRole || user.user_role || '';
                  const roleBadge = getRoleBadge(role);
                  return (
                    <tr
                      key={user.id}
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
                        {user.firstName} {user.lastName}
                      </td>
                      <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                        {user.email}
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            backgroundColor: roleBadge.bg,
                            color: roleBadge.color,
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500',
                          }}
                        >
                          {roleBadge.label}
                        </span>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#1F2937' }}>
                        {formatDate(user.createdAt)}
                      </td>
                      <td
                        style={{
                          padding: '16px 12px',
                          textAlign: 'center',
                        }}
                      >
                        <button
                          onClick={() => handleEditUser(user)}
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
                          onClick={() => handleDeleteUser(user)}
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

        {/* Modals */}
        {formModalOpen && (
          <UserFormModal
            open={formModalOpen}
            onClose={handleCloseFormModal}
            onSuccess={handleFormSuccess}
            user={selectedUser}
          />
        )}

        {deleteModalOpen && (
          <DeleteUserModal
            open={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            onSuccess={handleDeleteSuccess}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
}
