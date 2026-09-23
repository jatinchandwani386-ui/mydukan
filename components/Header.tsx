'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Search, Heart, ChevronDown, Menu, X, 
  User, Package, LogIn, LogOut, ArrowRight, Gift, CreditCard 
} from 'lucide-react';
import ClaimCashbackModal from './ClaimCashbackModal';
import AuthModal from './AuthModal';

const SEARCH_CATEGORIES = [
  'All Categories',
  'Electronics',
  'Fashion',
  'Home',
  'Deals of the Day',
];

export default function Header() {
  const router = useRouter();

  // Search & Categories States
  const [category, setCategory] = useState(SEARCH_CATEGORIES[0]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Live Suggestions States
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Deliver to Location State & Modal
  const [location, setLocation] = useState('Bhopal 462001');
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [tempPincode, setTempPincode] = useState('');

  // Account & Auth States
  const [accountOpen, setAccountOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // Check user authentication from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setCurrentUser(JSON.parse(storedUser));
        } catch (e) {}
      }
    }
  }, []);

  // ⚡ LISTEN FOR 'open-auth-modal' (Jab ProductCard se bina login click ho)
  useEffect(() => {
    const handleOpenAuth = () => setAuthModalOpen(true);
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  // Backend se products load karo suggestions ke liye
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((resData) => {
        const list = Array.isArray(resData)
          ? resData
          : resData.data || resData.products || [];
        setAllProducts(list);
      })
      .catch((err) => console.log('Suggestions fetch error:', err));
  }, [API_URL]);

  // Query change hone par filter karo (Live Suggestions)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allProducts.filter((p) => {
      const matchText =
        p.title?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some((t: string) => t.toLowerCase().includes(query.toLowerCase()));

      const matchCat =
        category === 'All Categories' ||
        p.category?.name?.toLowerCase() === category.toLowerCase() ||
        p.category?.slug?.toLowerCase() === category.toLowerCase();

      return matchText && matchCat;
    });

    setSuggestions(filtered.slice(0, 5));
    setShowSuggestions(true);
  }, [query, category, allProducts]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setCategoryOpen(false);
      }
      if (
        accountRef.current &&
        !accountRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    const catParam =
      category !== 'All Categories'
        ? `&category=${encodeURIComponent(category.toLowerCase())}`
        : '';
    router.push(`/search?q=${encodeURIComponent(query.trim())}${catParam}`);
  };

  const handleSelectSuggestion = (title: string) => {
    setQuery(title);
    setShowSuggestions(false);
    const catParam =
      category !== 'All Categories'
        ? `&category=${encodeURIComponent(category.toLowerCase())}`
        : '';
    router.push(`/search?q=${encodeURIComponent(title)}${catParam}`);
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim()) {
      setLocation(tempPincode.trim());
    }
    setLocationModalOpen(false);
    setTempPincode('');
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setCurrentUser(null);
    setAccountOpen(false);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center gap-3 sm:gap-4">
          
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 -ml-2 text-white/90 hover:text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity">
            <span className="font-display font-extrabold text-2xl tracking-tight text-white">
              My<span className="text-marigold">Dukan</span>
            </span>
          </Link>

          {/* Deliver To */}
          <div
            onClick={() => setLocationModalOpen(true)}
            className="hidden lg:flex items-start gap-1.5 text-sm hover:text-marigold transition-colors px-2 py-1 rounded cursor-pointer hover:bg-white/5"
            title="Click to change location"
          >
            <MapPin size={20} className="mt-0.5 shrink-0 text-marigold" />
            <span className="text-left leading-tight">
              <span className="block text-white/70 text-xs">Deliver to</span>
              <span className="block font-semibold">{location}</span>
            </span>
          </div>

          {/* Search bar with Autocomplete */}
          <div ref={searchContainerRef} className="relative hidden sm:flex flex-1 max-w-2xl mx-1 lg:mx-2">
            <form
              onSubmit={handleSearch}
              className="flex w-full h-11 rounded-md overflow-hidden ring-2 ring-transparent focus-within:ring-marigold bg-white"
            >
              {/* Category Dropdown */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setCategoryOpen((v) => !v)}
                  className="h-full flex items-center gap-1 px-3 bg-gray-100 text-gray-700 text-sm border-r border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  <span className="max-w-[100px] truncate">{category}</span>
                  <ChevronDown size={14} />
                </button>

                {categoryOpen && (
                  <ul className="absolute top-full left-0 mt-1 w-48 bg-white text-gray-800 rounded-md shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
                    {SEARCH_CATEGORIES.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setCategory(c);
                            setCategoryOpen(false);
                          }}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search Input */}
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query.trim() && setShowSuggestions(true)}
                placeholder="Search for products, brands and more"
                className="flex-1 px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />

              {/* Submit Button */}
              <button
                type="submit"
                aria-label="Search"
                className="px-4 bg-marigold hover:bg-marigold-dark transition-colors flex items-center justify-center cursor-pointer text-indigo-dark font-medium"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-gray-900 rounded-md shadow-2xl border border-gray-200 overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-gray-400 border-b border-gray-100">
                  SUGGESTIONS
                </div>
                {suggestions.map((item, idx) => (
                  <div
                    key={item._id || item.id || idx}
                    onClick={() => handleSelectSuggestion(item.title)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <Search size={15} className="text-gray-400 shrink-0" />
                    {item.images?.primary ? (
                      <img
                        src={item.images.primary}
                        alt={item.title}
                        className="w-8 h-8 object-cover rounded shrink-0 border"
                      />
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.category?.name || 'In Products'}
                      </div>
                    </div>
                    {item.price?.current && (
                      <div className="text-xs font-bold text-indigo-600">
                        ₹{item.price.current}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleSearch}
                  className="w-full text-center py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-1 border-t"
                >
                  See all results for &quot;{query}&quot; <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Right Side Buttons: Claim Cashback + Wishlist + Account */}
          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            
            {/* 🎁 CLAIM 0.25% CASHBACK BUTTON */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setAuthModalOpen(true);
                } else {
                  setClaimModalOpen(true);
                }
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 px-3 sm:px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
            >
              <Gift size={16} className="text-indigo-900" />
              <span>Claim Cashback</span>
              <span className="hidden md:inline bg-indigo-950 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ml-0.5">
                0.25%
              </span>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex flex-col items-center text-xs text-white/90 hover:text-marigold transition-colors"
              title="My Wishlist"
            >
              <Heart size={20} />
              <span className="mt-0.5 font-medium">Wishlist</span>
            </Link>

            {/* Account Dropdown */}
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="flex flex-col items-center text-xs text-white/90 hover:text-marigold transition-colors focus:outline-none"
                title="Account Menu"
              >
                <div className="h-6 w-6 rounded-full bg-marigold text-indigo-dark font-bold text-xs flex items-center justify-center shadow">
                  {currentUser ? currentUser.name?.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="mt-0.5 font-medium flex items-center gap-0.5 max-w-[70px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Account'} <ChevronDown size={12} />
                </span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.mobile}</p>
                        {currentUser.upiId && (
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                            <CreditCard size={11} /> UPI: {currentUser.upiId}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          setClaimModalOpen(true);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-indigo-600 font-semibold hover:bg-indigo-50"
                      >
                        <Gift size={16} /> Claim 0.25% Cashback
                      </button>

                      <div className="border-t border-gray-100 mt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-center">
                      <p className="text-xs text-gray-500 mb-3">
                        Sign in to claim cashback & track order rewards.
                      </p>
                      <button
                        onClick={() => {
                          setAccountOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center justify-center gap-1.5"
                      >
                        <LogIn size={16} /> Sign In / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Claim Cashback Modal */}
      <ClaimCashbackModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />

      {/* Deliver To Location Modal */}
      {locationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full text-gray-900 shadow-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base flex items-center gap-1.5">
                <MapPin size={18} className="text-indigo-600" /> Choose Location
              </h3>
              <button
                type="button"
                onClick={() => setLocationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveLocation} className="space-y-3">
              <input
                type="text"
                value={tempPincode}
                onChange={(e) => setTempPincode(e.target.value)}
                placeholder="e.g. Bhopal 462001"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded text-sm font-medium hover:bg-indigo-700"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(false)}
                  className="px-3 py-2 border rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}