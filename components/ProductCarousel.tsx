'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductCarousel({
  title,
  products = [],
  viewAllHref = '#',
}: {
  title: string;
  products: Product[];
  viewAllHref?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-lg sm:text-xl text-ink">{title}</h2>
        <div className="flex items-center gap-2">
          <Link
            href={viewAllHref}
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-marigold-dark hover:gap-2 transition-all"
          >
            View all <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => scrollBy(-1)}
            aria-label={`Scroll ${title} left`}
            className="h-8 w-8 rounded-full border border-line flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={`Scroll ${title} right`}
            className="h-8 w-8 rounded-full border border-line flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-1"
      >
        {products?.map((p, index) => {
          const uniqueKey = p?.id || (p as any)?._id || `product-${index}`;
          return (
            <div key={uniqueKey} className="w-44 sm:w-52 shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          );
        })}
      </div>
    </section>
  );
}