'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Zap } from 'lucide-react';

export default function ProductCard({ product }: { product: any }) {
  if (!product) return null;

  // Safe field extractions (Backend API + Mock schema dono support karega)
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

  // Affiliate URL vs Product Page URL fallback:
  // Agar Amazon buyUrl nahi hai, toh yeh webpage ka product detail page open karega taaki click fail na ho!
  const rawBuyUrl =
    product.affiliate?.buyUrl || product.buyUrl || product.affiliateUrl;
  const hasValidExternalUrl =
    Boolean(rawBuyUrl && rawBuyUrl !== '#' && rawBuyUrl.startsWith('http'));
  const finalActionUrl = hasValidExternalUrl ? rawBuyUrl : productDetailUrl;

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

        {/* Action Button (View Deal) */}
        <a
          href={finalActionUrl}
          target={hasValidExternalUrl ? '_blank' : '_self'}
          rel={hasValidExternalUrl ? 'noopener noreferrer sponsored' : undefined}
          className="mt-auto pt-2 block text-center text-sm font-semibold rounded-md bg-marigold hover:bg-marigold-dark text-indigo-dark py-2 transition-colors shadow-sm cursor-pointer"
        >
          View Deal
        </a>
      </div>
    </div>
  );
}