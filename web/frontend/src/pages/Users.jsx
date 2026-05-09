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
    <div className="ml-64 min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Users Management
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage system users and their roles
            </p>
          </div>
          <Button
            variant="primary"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-green-100 transition-all"
            onClick={handleAddUser}
          >
            + Add User
          </Button>
        </div>

        {/* Top Header Bar */}
        <div className="border-b border-gray-100 mb-8"></div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="text-gray-500 mt-4">Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <Card className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-gray-300">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h7v-2a2 2 0 002 2v12a2 2 0 002-2h6a2 2 0 002-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.35v1.41l-1.41 1.41h2a2 2 0 002-2l4.59 4.59a2 2 0 002-2 4.59 4.59a2 2 0 002-2z" />
              </svg>
              <p className="text-gray-500 mt-4">No users found</p>
              <p className="text-gray-400 text-sm mt-2">Get started by adding your first user</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && users.length > 0 && (
          <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 overflow-hidden">
            <div className="w-full overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
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
                        className="border-b border-gray-100 hover:bg-green-50/50 transition-colors duration-150 last:border-0"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold mr-3">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>
                            <span className="font-medium text-gray-900">{user.firstName} {user.lastName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-block ${roleBadge.bg} ${roleBadge.color} px-3 py-1 rounded-full text-xs font-medium ${
                              role === 'ADMIN' ? 'bg-green-50 text-green-700 border border-green-200' :
                              role === 'STAFF' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-gray-50 text-gray-600 border border-gray-200'
                            }`}
                          >
                            {roleBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-green-600 hover:text-green-800 font-medium text-sm mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
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
          </Card>
        )}

        {/* User Form Modal */}
        {formModalOpen && (
          <UserFormModal
            open={formModalOpen}
            onClose={() => setFormModalOpen(false)}
            onSuccess={handleFormSuccess}
            user={selectedUser}
          />
        )}

        {/* Delete User Modal */}
        {deleteModalOpen && (
          <DeleteUserModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onSuccess={handleDeleteSuccess}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
}
