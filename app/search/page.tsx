'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

// Smart Keywords mapping (Synonyms)
const FASHION_WORDS = ['shoe', 'shoes', 'sneaker', 'sneakers', 't-shirt', 'shirt', 'men', 'women', 'fashion', 'clothing', 'footwear', 'bag', 'sunglasses'];
const ELECTRONIC_WORDS = ['headphone', 'headphones', 'earbud', 'earbuds', 'earphone', 'speaker', 'smartwatch', 'laptop', 'electronics', 'audio'];
const HOME_WORDS = ['kitchen', 'home', 'mug', 'bottle', 'lamp', 'diffuser', 'decor', 'appliances'];

function isFashionProduct(p: any): boolean {
  const text = `${p.title} ${p.description || ''} ${p.tags?.join(' ') || ''}`.toLowerCase();
  const cat = typeof p.category === 'string' ? p.category.toLowerCase() : (p.category?.name?.toLowerCase() || '');
  return cat.includes('fashion') || FASHION_WORDS.some((w) => text.includes(w));
}

function isElectronicsProduct(p: any): boolean {
  const text = `${p.title} ${p.description || ''} ${p.tags?.join(' ') || ''}`.toLowerCase();
  const cat = typeof p.category === 'string' ? p.category.toLowerCase() : (p.category?.name?.toLowerCase() || '');
  // Agar sneakers/shoes hai toh electronics nahi ho sakta
  if (FASHION_WORDS.some((w) => text.includes(w))) return false;
  return cat.includes('electronics') || ELECTRONIC_WORDS.some((w) => text.includes(w));
}

function isHomeProduct(p: any): boolean {
  const text = `${p.title} ${p.description || ''} ${p.tags?.join(' ') || ''}`.toLowerCase();
  const cat = typeof p.category === 'string' ? p.category.toLowerCase() : (p.category?.name?.toLowerCase() || '');
  return cat.includes('home') || HOME_WORDS.some((w) => text.includes(w));
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const tagParam = searchParams.get('tag') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((resData) => {
        const list = Array.isArray(resData)
          ? resData
          : resData.data || resData.products || [];

        const filtered = list.filter((p: any) => {
          const currentPrice = Number(p.price?.current ?? p.price ?? 0);

          // 1. Under 499 Filter
          if (query === '499' || maxPriceParam === '499') {
            return currentPrice > 0 && currentPrice <= 499;
          }

          // 2. Smart Category Matching
          let matchCategory = true;
          if (categoryParam) {
            const cat = categoryParam.toLowerCase().trim();
            if (cat === 'fashion') {
              matchCategory = isFashionProduct(p);
            } else if (cat === 'electronics') {
              matchCategory = isElectronicsProduct(p);
            } else if (cat === 'home') {
              matchCategory = isHomeProduct(p);
            }
          }

          // 3. Smart Query Matching (Shoes -> Sneakers, Earbuds -> Headphones)
          let matchQuery = true;
          if (query && query !== '499') {
            const q = query.toLowerCase().trim();
            const text = `${p.title} ${p.description || ''} ${p.tags?.join(' ') || ''}`.toLowerCase();

            if (q === 'shoes' || q === 'footwear') {
              matchQuery = text.includes('shoe') || text.includes('sneaker') || text.includes('footwear');
            } else if (q === 'headphones' || q === 'audio') {
              matchQuery = text.includes('headphone') || text.includes('earbud') || text.includes('earphone');
            } else {
              matchQuery = text.includes(q);
            }
          }

          // 4. Tag Filter
          let matchTag = true;
          if (tagParam) {
            matchTag =
              p.tags?.includes(tagParam) ||
              (tagParam === 'deal-of-the-day' && p.tags?.some((t: string) => t.includes('deal')));
          }

          return matchCategory && matchQuery && matchTag;
        });

        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Search fetch error:', err);
        setLoading(false);
      });
  }, [query, categoryParam, tagParam, maxPriceParam, API_URL]);

  let pageTitle = `Search results for "${query}"`;
  if (query === '499' || maxPriceParam === '499') {
    pageTitle = 'Deals Under ₹499';
  } else if (tagParam === 'deal-of-the-day' || query === 'deal') {
    pageTitle = 'Deals of the Day';
  } else if (categoryParam) {
    pageTitle = `${categoryParam.toUpperCase()} Products`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} /> Home
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Products load ho rahe hain...
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <SearchX size={56} className="text-gray-400 mb-3" />
          <h2 className="text-lg font-semibold text-gray-800">Koi product nahi mila!</h2>
          <p className="text-sm text-gray-500 mt-1 max-w-md">
            Is category ya search ke matching koi product database mein nahi mila.
          </p>
          <Link
            href="/"
            className="mt-5 px-5 py-2.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Wapas Homepage Jao
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4">{products.length} product(s) mile:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p, index) => (
              <div key={p.id || p._id || index}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}