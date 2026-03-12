// pages/Settings.jsx - Settings Page
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Settings() {
  return (
    <div style={{ marginLeft: '250px', padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Settings
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>
          Manage your account and application settings
        </p>
      </div>

      {/* Account Settings */}
      <Card style={{ marginBottom: '24px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
          Account Settings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email Address" type="email" placeholder="john@example.com" />
          <Input label="Company" placeholder="Your Company Name" />
          <div style={{ marginTop: '20px' }}>
            <Button variant="primary" style={{ width: '100%', padding: '12px' }}>
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card style={{ marginBottom: '24px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>
          Security
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Change Password
            </p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
              Update your password to keep your account secure
            </p>
            <Button variant="secondary" style={{ width: '100%', padding: '10px' }}>
              Change Password
            </Button>
          </div>
          <div style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Two-Factor Authentication
            </p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
              Add an extra layer of security to your account
            </p>
            <Button variant="secondary" style={{ width: '100%', padding: '10px' }}>
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card style={{ maxWidth: '600px', border: '1px solid #FEE2E2', backgroundColor: '#FEF2F2' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#7F1D1D' }}>
          Danger Zone
        </h2>
        <p style={{ fontSize: '14px', color: '#991B1B', marginBottom: '20px' }}>
          Irreversible actions for your account
        </p>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Delete Account
          </p>
          <p style={{ fontSize: '13px', color: '#991B1B', marginBottom: '12px' }}>
            Permanently delete your account and all associated data
          </p>
          <Button
            variant="secondary"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              border: '1px solid #FECACA',
            }}
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
