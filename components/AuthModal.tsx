'use client';

import { useState } from 'react';
import { X, Lock, Phone, User, CreditCard, ArrowRight, AlertCircle } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user: any) => void;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register`;
    const payload = isLogin
      ? { mobile: mobile.trim(), password }
      : { name: name.trim(), mobile: mobile.trim(), password, upiId: upiId.trim() };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');

      // Save token and user details to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      if (onAuthSuccess) onAuthSuccess(data.user);
      onClose();
      window.location.reload(); // Refresh to update user header state
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-gray-900 border border-gray-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="flex border-b border-gray-100 mb-5 pb-1">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${
              isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold border-b-2 transition-all ${
              !isLogin ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Create Account
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {isLogin ? 'Welcome Back!' : 'Join MyDukan'}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {isLogin
            ? 'Sign in with your mobile number to view claims.'
            : 'Register to earn 0.25% instant cashback on Amazon orders.'}
        </p>

        {error && (
          <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Field (Only on Sign Up) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          )}

          {/* Mobile Number Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
            <div className="relative flex items-center">
              <Phone size={16} className="absolute left-3 text-gray-400" />
              <input
                type="tel"
                required
                pattern="[6-9][0-9]{9}"
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-gray-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Mandatory UPI ID Field (Only on Sign Up) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                UPI ID (Cashback Payout ke liye) *
              </label>
              <div className="relative flex items-center">
                <CreditCard size={16} className="absolute left-3 text-emerald-600" />
                <input
                  type="text"
                  required
                  placeholder="e.g. 9876543210@paytm or rahul@okhdfc"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border border-emerald-300 bg-emerald-50/30 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-emerald-600 font-mono text-xs"
                />
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">
                Aapka cashback isi UPI ID par direct transfer kiya jayega.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-3 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}