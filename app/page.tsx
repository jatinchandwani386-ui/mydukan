"use client";

import { useEffect, useState } from 'react';
import BannerSlider from '@/components/BannerSlider';
import PromoGrid from '@/components/PromoGrid';
import ProductCarousel from '@/components/ProductCarousel';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((resData) => {
        // Backend bhejta hai { success: true, data: [...] }
        const list = Array.isArray(resData) 
          ? resData 
          : (resData.data || resData.products || []);
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setLoading(false);
      });
  }, [API_URL]);

  // Tags ya Category ke according match karein
  const dealsOfTheDay = products.filter((p) => 
    p.tags?.includes('deal-of-the-day') || p.badge === 'deal-of-the-day'
  );
  
  const bestsellers = products.filter((p) => 
    p.tags?.includes('bestseller') || p.isFeatured || p.badge === 'bestseller'
  );
  
  const electronics = products.filter((p) => 
    p.category?.name?.toLowerCase() === 'electronics' || 
    p.category?.slug?.toLowerCase() === 'electronics' ||
    p.category === 'Electronics'
  );
  
  const home = products.filter((p) => 
    p.category?.name?.toLowerCase() === 'home' || 
    p.category?.slug?.toLowerCase() === 'home' ||
    p.category === 'Home'
  );

  if (loading) {
    return <div className="text-center py-20 text-xl font-medium">Products load ho rahe hain...</div>;
  }

  return (
    <div className="py-4 sm:py-6 space-y-8 sm:space-y-10">
      <div className="mx-auto max-w-7xl px-4">
        <BannerSlider />
      </div>

      <PromoGrid />

      {/* Agar dealsOfTheDay empty ho toh saare products show karein */}
      

<ProductCarousel 
        title="Deals of the Day" 
        products={dealsOfTheDay.length > 0 ? dealsOfTheDay : products} 
      />
      
      

<ProductCarousel 
        title="Best Sellers" 
        products={bestsellers.length > 0 ? bestsellers : products} 
      />
      
      

<ProductCarousel 
        title="Top Picks in Electronics" 
        products={electronics.length > 0 ? electronics : products} 
      />
      
      {home.length > 0 && (
        

<ProductCarousel title="For Your Home" products={home} />
      )}
    </div>
  );
}