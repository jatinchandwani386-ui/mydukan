'use client';

import { useState } from 'react';
import { X, CheckCircle, Calculator, AlertCircle } from 'lucide-react';

export default function ClaimCashbackModal({ 
  isOpen, 
  onClose,
  onOpenAuth 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onOpenAuth?: () => void;
}) {
  const [orderId, setOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 0.25% Live Auto Calculation:
  const calculatedCashback = amount ? (parseFloat(amount) * 0.0025).toFixed(2) : '0.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setError('Please login first to claim your cashback!');
      setLoading(false);
      if (onOpenAuth) onOpenAuth();
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/cashback/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amazonOrderId: orderId,
          productName,
          purchaseAmount: parseFloat(amount),
          purchaseDate: date,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit claim');

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setOrderId('');
        setProductName('');
        setAmount('');
        setDate('');
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-gray-900 border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle size={56} className="text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-gray-900">Claim Submitted! 🎉</h3>
            <p className="text-sm text-gray-600">
              Aapka <span className="font-bold text-emerald-600">₹{calculatedCashback}</span> ka cashback review ke liye submit ho gaya hai. Return window close hote hi aapke UPI account par send ho jayega.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🎁</span>
              <h3 className="text-lg font-bold text-gray-900">Claim 0.25% Cashback</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Amazon se order receive karne ke baad details enter karein aur direct UPI cashback paayein.
            </p>

            {error && (
              <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boat Rockerz 450 Headphone"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Amazon Order ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 402-1234567-8901234"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Order Amount (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 1499"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Purchase Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-gray-600"
                  />
                </div>
              </div>

              {/* 0.25% LIVE CASHBACK ESTIMATE BOX */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                  <Calculator size={16} className="text-amber-700" /> Instant 0.25% Cashback:
                </span>
                <span className="font-extrabold text-lg text-amber-900">
                  ₹{calculatedCashback}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 shadow cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting Claim...' : 'Submit Cashback Claim'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}