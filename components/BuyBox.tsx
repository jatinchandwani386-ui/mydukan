import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product, discountPct } from '@/data/products';

export default function BuyBox({ product }: { product: Product }) {
  const pct = discountPct(product.price, product.mrp);

  return (
    <aside className="lg:sticky lg:top-24 h-fit rounded-lg border border-line bg-white p-5 shadow-card">
      <div className="flex items-baseline gap-2">
        <span className="font-display font-extrabold text-2xl text-ink">
          ₹{product.price.toLocaleString('en-IN')}
        </span>
        <span className="text-sm text-ink/40 line-through">
          ₹{product.mrp.toLocaleString('en-IN')}
        </span>
      </div>
      <p className="text-sm text-deal font-semibold mt-0.5">
        You save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({pct}%)
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-leaf' : 'bg-deal'}`}
        />
        <span
          className={`text-sm font-semibold ${
            product.inStock ? 'text-leaf' : 'text-deal'
          }`}
        >
          {product.inStock ? 'In Stock' : 'Currently Unavailable'}
        </span>
      </div>

      {product.fastDelivery && (
        <div className="mt-3 flex items-center gap-2 text-sm text-ink/70">
          <Truck size={16} className="text-indigo shrink-0" />
          Free delivery by tomorrow
        </div>
      )}
      <div className="mt-2 flex items-center gap-2 text-sm text-ink/70">
        <RotateCcw size={16} className="text-indigo shrink-0" />
        10-day replacement policy
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-ink/70">
        <ShieldCheck size={16} className="text-indigo shrink-0" />
        Secure checkout on retailer site
      </div>

      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-disabled={!product.inStock}
        className={`mt-5 block text-center font-semibold text-base rounded-md py-3 transition-colors ${
          product.inStock
            ? 'bg-marigold hover:bg-marigold-dark text-indigo-dark'
            : 'bg-gray-200 text-ink/40 pointer-events-none'
        }`}
      >
        Buy on Amazon
      </a>

      <p className="mt-4 text-[11px] leading-relaxed text-ink/50 border-t border-line pt-3">
        As an Amazon Associate, My Dukan earns from qualifying purchases.
      </p>
    </aside>
  );
}
