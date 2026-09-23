'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Zap, Loader2, AlertCircle } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);

  if (!product) return null;

  // Safe field extractions
  const productId = product.slug || product._id || product.id || '';
  const productDetailUrl = productId ? `/product/${productId}` : '#';
  const title = product.title || 'Untitled Product';

  // Image handling
  const imageSrc =
    product.images?.primary ||
    product.image ||
    (Array.isArray(product.images?.gallery) && product.images.gallery[0]) ||
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

  // Price handling
  const currentPrice = Number(product.price?.current ?? product.price ?? 0);
  const mrp = Number(product.price?.mrp ?? product.mrp ?? currentPrice);

  // Discount percentage calculation
  const discountPercent =
    product.price?.discountPercent ??
    (mrp > currentPrice ? Math.round(((mrp - currentPrice) / mrp) * 100) : 0);

  // Ratings
  const rating = Number(product.rating ?? 4.2);
  const reviewCount = Number(product.reviewCount ?? 15);

  // Badge / Tag handling
  const isDeal =
    product.badge === 'deal-of-the-day' ||
    product.tags?.includes('deal-of-the-day');
  const isBestseller =
    product.badge === 'bestseller' ||
    product.tags?.includes('bestseller') ||
    product.isFeatured;
  const badgeLabel = isDeal
    ? 'Deal of the Day'
    : isBestseller
    ? 'Bestseller'
    : null;

  // Amazon Affiliate URL
  const rawBuyUrl =
    product.affiliate?.buyUrl ||
    product.buyUrl ||
    product.affiliateUrl ||
    `https://www.amazon.in/dp/${product.affiliate?.asin || ''}`;

  // ⚡ AUTOMATIC 1-CLICK CASHBACK & REDIRECT HANDLER
  const handle1ClickBuy = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    // 1. Agar User Login Nahi Hai -> English me "Please login" show karo
    if (!token || !storedUser) {
      setLoginAlert(true);
      setTimeout(() => setLoginAlert(false), 3500);
      window.dispatchEvent(new CustomEvent('open-auth-modal'));
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(storedUser);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      // 2. Admin Panel mein Auto-Save intent (User, UPI, Product, 0.25% Cashback)
      await fetch(`${apiUrl}/cashback/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          productName: title,
          purchaseAmount: currentPrice,
        }),
      });

      // 3. User Tracking SubID ke sath Amazon URL generate karo
      const separator = rawBuyUrl.includes('?') ? '&' : '?';
      const targetUrlWithSubtag = `${rawBuyUrl}${separator}ascsubtag=${user.id || user._id}`;

      // 4. Open Amazon in new tab
      window.open(targetUrlWithSubtag, '_blank');
    } catch (err) {
      console.error('1-Click intent error:', err);
      window.open(rawBuyUrl, '_blank');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative flex flex-col w-full h-full bg-white rounded-lg border border-line shadow-card hover:shadow-popover transition-shadow duration-200 overflow-hidden">
      {/* Badge */}
      {badgeLabel && (
        <span
          className={`absolute top-2 left-2 z-10 text-[11px] font-semibold px-2 py-1 rounded shadow ${
            isDeal ? 'bg-deal text-white' : 'bg-leaf text-white'
          }`}
        >
          {badgeLabel}
        </span>
      )}

      {/* Thumbnail with Click to Product Details */}
      <Link
        href={productDetailUrl}
        className="relative block aspect-square overflow-hidden rounded-t-lg bg-gray-50 cursor-pointer"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-3 gap-1.5">
        {/* Title with Click */}
        <Link href={productDetailUrl} className="cursor-pointer">
          <h3 className="text-sm text-ink font-medium leading-snug line-clamp-2 hover:text-marigold-dark transition-colors">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 bg-leaf text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {rating.toFixed(1)} <Star size={11} fill="currentColor" />
          </span>
          <span className="text-xs text-ink/50">
            ({reviewCount.toLocaleString('en-IN')})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-display font-bold text-lg text-ink">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          {mrp > currentPrice && (
            <span className="text-xs text-ink/40 line-through">
              ₹{mrp.toLocaleString('en-IN')}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-xs font-semibold text-deal">
              {discountPercent}% off
            </span>
          )}
        </div>

        {product.fastDelivery && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo w-fit">
            <Zap size={12} fill="currentColor" />
            Fast Delivery
          </span>
        )}

        {/* ⚠️ English "Please login" Warning Alert */}
        {loginAlert && (
          <div className="mt-1 p-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded flex items-center justify-center gap-1 animate-bounce shadow-sm">
            <AlertCircle size={14} className="shrink-0" />
            <span>Please login</span>
          </div>
        )}

        {/* ⚡ AUTOMATIC 1-CLICK BUTTON */}
        <button
          onClick={handle1ClickBuy}
          disabled={loading}
          className="mt-auto pt-2 w-full block text-center text-xs sm:text-sm font-bold rounded-md bg-marigold hover:bg-marigold-dark text-indigo-dark py-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-1.5">
              <Loader2 size={15} className="animate-spin" /> Redirecting...
            </span>
          ) : (
            'Claim 0.25% & Buy on Amazon'
          )}
        </button>
      </div>
    </div>
  );
}