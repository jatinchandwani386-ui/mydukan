'use client';

import { useState } from 'react';
import Link from 'next/link';

type MegaCategory = {
  name: string;
  highlight?: boolean;
  columns: { heading: string; items: string[] }[];
};

const CATEGORIES: MegaCategory[] = [
  {
    name: 'Electronics',
    columns: [
      { heading: 'Audio', items: ['Headphones', 'Earbuds', 'Speakers', 'Soundbars'] },
      { heading: 'Wearables', items: ['Smartwatches', 'Fitness Bands', 'Smart Rings'] },
      { heading: 'Computing', items: ['Laptops', 'Mouse & Keyboards', 'Monitors', 'Storage'] },
    ],
  },
  {
    name: 'Fashion',
    columns: [
      { heading: 'Men', items: ['Shoes', 'T-Shirts', 'Backpacks', 'Watches'] },
      { heading: 'Women', items: ['Footwear', 'Handbags', 'Ethnic Wear', 'Jewellery'] },
      { heading: 'Accessories', items: ['Sunglasses', 'Belts', 'Wallets'] },
    ],
  },
  {
    name: 'Home',
    columns: [
      { heading: 'Kitchen', items: ['Air Fryers', 'Coffee Makers', 'Mixers'] },
      { heading: 'Living', items: ['Lighting', 'Decor', 'Storage'] },
      { heading: 'Appliances', items: ['Fans', 'Irons', 'Vacuum Cleaners'] },
    ],
  },
  { name: 'Deals of the Day', highlight: true, columns: [] },
  { name: 'Best Sellers', columns: [] },
  { name: 'New Arrivals', columns: [] },
  { name: 'Under \u20B9499', columns: [] },
];

// Category ke according search URL generate karne ke liye:
function getCategoryHref(name: string): string {
  if (name === 'Deals of the Day') return '/search?tag=deal-of-the-day';
  if (name === 'Best Sellers') return '/search?q=bestseller';
  if (name === 'New Arrivals') return '/search?q=new';
  if (name.includes('499')) return '/search?maxPrice=499';
  return `/search?category=${encodeURIComponent(name.toLowerCase())}`;
}

export default function CategoryNav() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <nav className="hidden md:block bg-indigo-light border-t border-white/10 relative z-40">
      <ul className="mx-auto max-w-7xl px-4 flex items-center gap-6 h-11 text-sm">
        {CATEGORIES.map((cat, idx) => (
          <li
            key={cat.name}
            className="h-full flex items-center"
            onMouseEnter={() => setOpenIdx(idx)}
            onMouseLeave={() => setOpenIdx(null)}
          >
            {/* Real Search Link for Category */}
            <Link
              href={getCategoryHref(cat.name)}
              onClick={() => setOpenIdx(null)}
              className={`h-full flex items-center border-b-2 transition-colors ${
                cat.highlight
                  ? 'text-marigold font-semibold border-transparent hover:border-marigold'
                  : 'text-white/85 border-transparent hover:text-white hover:border-marigold/70'
              }`}
            >
              {cat.name}
            </Link>

            {/* Mega Dropdown Menu for Sub-categories */}
            {cat.columns.length > 0 && openIdx === idx && (
              <div className="absolute left-0 top-full w-full bg-white text-ink shadow-popover border-t border-line">
                <div className="mx-auto max-w-7xl px-8 py-6 grid grid-cols-4 gap-8">
                  {cat.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="font-display font-bold text-sm mb-3 text-gray-900">{col.heading}</p>
                      <ul className="space-y-2">
                        {col.items.map((item) => (
                          <li key={item}>
                            {/* Real Search Link for Sub-item */}
                            <Link
                              href={`/search?q=${encodeURIComponent(item)}&category=${encodeURIComponent(cat.name.toLowerCase())}`}
                              onClick={() => setOpenIdx(null)}
                              className="text-sm text-gray-600 hover:text-indigo-600 hover:font-medium transition-colors block"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col justify-center px-5 py-4">
                    <p className="font-display font-bold text-emerald-800 text-sm mb-1">
                      Deals refresh daily
                    </p>
                    <p className="text-xs text-emerald-600">
                      Check back every morning for new price drops.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}