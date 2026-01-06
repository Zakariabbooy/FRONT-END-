import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../utils/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid reset link. No token found.');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Invalid reset link');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch('/api/users/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setSuccess('Password has been reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 dark-gradient-bg particle-bg">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Reset Password</h2>
            <p className="text-white/70">Enter your new password below.</p>
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}

          {token && !error && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </form>
          )}

          {!token && error && (
            <div className="text-center">
              <p className="text-white/70 mb-4">Invalid reset link. Please request a new password reset.</p>
              <Button onClick={() => navigate('/forgot-password')} className="w-full">
                Request New Reset Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
