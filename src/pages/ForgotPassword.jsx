import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../utils/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [devResetLink, setDevResetLink] = useState('');
  const [emailConfigured, setEmailConfigured] = useState(null); // null = unknown, true/false
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch('/api/users/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      // try parse JSON response safely
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Request failed');
      }

      setSuccess(data.message || 'If an account exists, a password reset email has been sent.');
      // In development the backend may return a token/reset link for testing
      // backend may return: resetLink, token OR devLink, devToken
      if (data.resetLink) setDevResetLink(data.resetLink);
      else if (data.devLink) setDevResetLink(data.devLink);
      else if (data.token) {
        const FRONT = (import.meta && import.meta.env && import.meta.env.VITE_FRONTEND_URL) || window.location.origin;
        setDevResetLink(`${FRONT}/reset-password?token=${data.token}`);
      } else if (data.devToken) {
        const FRONT = (import.meta && import.meta.env && import.meta.env.VITE_FRONTEND_URL) || window.location.origin;
        setDevResetLink(`${FRONT}/reset-password?token=${data.devToken}`);
      }

      // Determine whether the backend actually attempted to send email.
      // If backend returned a dev link/token, it did not send a real email.
      const hasDevLink = !!(data.resetLink || data.token || data.devLink || data.devToken);
      setEmailConfigured(!hasDevLink);
      // optionally navigate back to login after short delay
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.message || 'Unable to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 dark-gradient-bg particle-bg">
      <div className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Forgot Password</h2>
            <p className="text-white/70">Enter your email and we'll send reset instructions.</p>
          </div>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}
          {emailConfigured === false && (
            <div className="text-yellow-300 text-sm text-center">Email service not configured on server — a temporary reset link is shown below.</div>
          )}
          {emailConfigured === true && (
            <div className="text-green-200 text-sm text-center">Email sent — check your inbox and spam folder.</div>
          )}
          {devResetLink && (
            <div className="mt-3 text-sm text-white/80 text-center">
              <p className="mb-1">Dev reset link (use if email not received):</p>
              <a href={devResetLink} className="text-purple-300 underline">{devResetLink}</a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset instructions'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
