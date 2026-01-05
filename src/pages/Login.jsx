import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../utils/api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiFetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: formData.email.toLowerCase().trim(), password: formData.password })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      onLogin(data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setErrors(prev => ({ ...prev, submit: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 dark-gradient-bg particle-bg relative overflow-hidden">
      <div className="max-w-md w-full relative z-10">
        <div className="glass-card rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in-up">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl mb-2 transform hover:scale-110 hover:rotate-6 transition-all duration-500 shadow-lg animate-scale-in">
              <span className="text-white text-4xl font-bold">🎾</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Welcome Back
            </h1>
            <p className="text-white/70 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Sign in to continue to Padel Finder
            </p>
          </div>
          {errors.submit && (
            <div className="text-red-400 text-sm text-center">{errors.submit}</div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 border-2 border-white/30 rounded focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 group-hover:border-purple-500"
                />
                <span className="ml-2 text-sm text-white/70 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-all duration-300 relative group"
              >
                Forgot password?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            <div className="animate-fade-in-up pt-2" style={{ animationDelay: '0.6s' }}>
              <Button
                type="submit"
                className="w-full text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  '🚀 Sign In'
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-white/70 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-purple-400 hover:text-purple-300 font-bold transition-all duration-300 relative group"
            >
              Create one
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
