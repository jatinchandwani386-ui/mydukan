'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    title: 'Electronics Fest',
    subtitle: 'Up to 60% off on headphones, bands & more',
    cta: 'Shop Electronics',
    href: '/category/electronics',
    bg: 'bg-indigo',
    accent: 'text-marigold',
  },
  {
    title: 'Home Refresh Sale',
    subtitle: 'Kitchen & living essentials starting \u20B9499',
    cta: 'Shop Home',
    href: '/category/home',
    bg: 'bg-leaf',
    accent: 'text-white',
  },
  {
    title: 'Fashion Weekend',
    subtitle: 'Top brands, flat 50% off storewide',
    cta: 'Shop Fashion',
    href: '/category/fashion',
    bg: 'bg-deal',
    accent: 'text-white',
  },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.title}
            className={`${slide.bg} shrink-0 w-full aspect-[16/7] sm:aspect-[16/4.5] flex items-center px-8 sm:px-16`}
          >
            <div>
              <p className={`font-display font-extrabold text-2xl sm:text-4xl ${slide.accent}`}>
                {slide.title}
              </p>
              <p className="text-white/90 text-sm sm:text-lg mt-2">{slide.subtitle}</p>
              <Link
                href={slide.href}
                className="inline-block mt-4 sm:mt-6 bg-white text-indigo-dark font-semibold text-sm sm:text-base px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white items-center justify-center shadow-card cursor-pointer z-10"
      >
        <ChevronLeft size={18} className="text-indigo-dark" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 hover:bg-white items-center justify-center shadow-card cursor-pointer z-10"
      >
        <ChevronRight size={18} className="text-indigo-dark" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}