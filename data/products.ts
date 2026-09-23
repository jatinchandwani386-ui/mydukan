export type Product = {
  id: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  gallery: string[];
  price: number;
  mrp: number;
  rating: number;
  reviewCount: number;
  badge?: 'deal-of-the-day' | 'bestseller' | 'none';
  fastDelivery: boolean;
  inStock: boolean;
  affiliateUrl: string;
  bullets: string[];
  description: string;
};

export const discountPct = (price: number, mrp: number) =>
  Math.round(((mrp - price) / mrp) * 100);

export const products: Product[] = [
  {
    id: 'wireless-anc-headphones',
    title: 'SonicWave Pro Wireless ANC Headphones, 40Hr Battery, Fast Charge',
    brand: 'SonicWave',
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1200&q=80',
    ],
    price: 2799,
    mrp: 5999,
    rating: 4.3,
    reviewCount: 18420,
    badge: 'deal-of-the-day',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE1?tag=mydukan-21',
    bullets: [
      'Active noise cancellation with 3 adjustable levels',
      '40 hours playback, 10-min quick charge for 5 hours',
      'Bluetooth 5.3 with multipoint pairing for 2 devices',
      'Plush memory-foam ear cushions for all-day comfort',
    ],
    description:
      'SonicWave Pro brings studio-grade sound to a travel-ready headphone. Tri-mic call clarity, adaptive ANC, and a foldable frame make this the daily-driver pick for commuters and remote workers alike.',
  },
  {
    id: 'smart-fitness-band',
    title: 'PulseFit Band X2 with AMOLED Display, SpO2 & Heart Rate Tracking',
    brand: 'PulseFit',
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1575311373937-c9f5a0a35e6f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575311373937-c9f5a0a35e6f?w=1200&q=80',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1200&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=80',
    ],
    price: 1499,
    mrp: 3499,
    rating: 4.1,
    reviewCount: 9231,
    badge: 'bestseller',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE2?tag=mydukan-21',
    bullets: [
      '1.69" AMOLED display with always-on option',
      'SpO2, heart rate & sleep tracking, 100+ sport modes',
      'Up to 10 days battery life on a single charge',
      '5 ATM water resistance',
    ],
    description:
      'Track every step, swim and sleep cycle with PulseFit Band X2. A crisp AMOLED display and a featherweight strap make it easy to wear around the clock.',
  },
  {
    id: 'air-fryer-5l',
    title: 'HomeChef Digital Air Fryer 5L, 8 Presets, Nonstick Basket',
    brand: 'HomeChef',
    category: 'Home',
    image:
      'https://images.unsplash.com/photo-1648131064391-0b12b19cb148?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1648131064391-0b12b19cb148?w=1200&q=80',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=1200&q=80',
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1200&q=80',
    ],
    price: 3999,
    mrp: 7499,
    rating: 4.4,
    reviewCount: 12870,
    badge: 'deal-of-the-day',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE3?tag=mydukan-21',
    bullets: [
      '5-litre nonstick basket, cooks for a family of 4-5',
      '8 one-touch presets from fries to cake',
      'Rapid air technology uses up to 85% less oil',
      'Dishwasher-safe parts, easy cleanup',
    ],
    description:
      'Less oil, same crunch. The HomeChef Air Fryer swaps out deep frying without losing the crisp, with presets tuned for everyday Indian and continental dishes.',
  },
  {
    id: 'mens-running-shoes',
    title: 'StrideMax Men\u2019s Running Shoes, Breathable Mesh, Cushioned Sole',
    brand: 'StrideMax',
    category: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1200&q=80',
    ],
    price: 1299,
    mrp: 2999,
    rating: 4.0,
    reviewCount: 5410,
    badge: 'none',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE4?tag=mydukan-21',
    bullets: [
      'Breathable engineered mesh upper',
      'Dual-density EVA sole for shock absorption',
      'Lightweight at just 240g per shoe (UK 8)',
      'Reflective details for low-light visibility',
    ],
    description:
      'Built for daily 5Ks and everyday wear, StrideMax pairs a soft-landing sole with a mesh upper that breathes through Indian summers.',
  },
  {
    id: 'led-desk-lamp',
    title: 'GlowDesk LED Study Lamp with USB Charging Port, 5 Modes',
    brand: 'GlowDesk',
    category: 'Home',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80',
      'https://images.unsplash.com/photo-1544207240-6c9c4f0b0e0a?w=1200&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=1200&q=80',
    ],
    price: 899,
    mrp: 1799,
    rating: 4.2,
    reviewCount: 3387,
    badge: 'bestseller',
    fastDelivery: false,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE5?tag=mydukan-21',
    bullets: [
      '5 brightness modes, 3 colour temperatures',
      'Built-in USB port to charge your phone',
      'Flexible arm folds flat for storage',
      'Touch-sensitive controls with memory function',
    ],
    description:
      'A study lamp that does double duty as a charging dock. GlowDesk\u2019s flicker-free LEDs are tuned to reduce eye strain through long work sessions.',
  },
  {
    id: 'backpack-laptop',
    title: 'UrbanPack 15.6" Laptop Backpack, Water Resistant, USB Port',
    brand: 'UrbanPack',
    category: 'Fashion',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=1200&q=80',
    ],
    price: 999,
    mrp: 2499,
    rating: 4.3,
    reviewCount: 15602,
    badge: 'deal-of-the-day',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE6?tag=mydukan-21',
    bullets: [
      'Fits laptops up to 15.6 inches, padded compartment',
      'Water-resistant fabric with rain cover',
      'External USB charging port',
      'Ergonomic straps with breathable back panel',
    ],
    description:
      'From commute to weekend travel, UrbanPack keeps your gear dry and organised with a dedicated laptop sleeve and a quick-access front pocket.',
  },
  {
    id: 'coffee-maker',
    title: 'BrewCraft Drip Coffee Maker 1.2L with Keep-Warm Plate',
    brand: 'BrewCraft',
    category: 'Home',
    image:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80',
    ],
    price: 1799,
    mrp: 3299,
    rating: 4.0,
    reviewCount: 2140,
    badge: 'none',
    fastDelivery: true,
    inStock: false,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE7?tag=mydukan-21',
    bullets: [
      '1.2 litre carafe, brews up to 8 cups',
      'Keep-warm plate holds temperature for 30 minutes',
      'Reusable mesh filter, no paper filters needed',
      'Auto shut-off for safety',
    ],
    description:
      'Wake up to a fresh pot without the fuss. BrewCraft\u2019s reusable filter and keep-warm plate make it a low-maintenance everyday brewer.',
  },
  {
    id: 'gaming-mouse',
    title: 'ClickForge RGB Gaming Mouse, 16000 DPI, 7 Programmable Buttons',
    brand: 'ClickForge',
    category: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1200&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e8?w=1200&q=80',
    ],
    price: 1199,
    mrp: 2299,
    rating: 4.5,
    reviewCount: 7623,
    badge: 'bestseller',
    fastDelivery: true,
    inStock: true,
    affiliateUrl: 'https://www.amazon.in/dp/EXAMPLE8?tag=mydukan-21',
    bullets: [
      '16000 DPI optical sensor, adjustable on the fly',
      '7 programmable buttons with onboard memory',
      'Customisable RGB lighting, 16.8M colours',
      'Braided cable rated for 10 million clicks',
    ],
    description:
      'Precision tuned for competitive play, ClickForge pairs a high-accuracy sensor with a shape that stays comfortable through marathon sessions.',
  },
];

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);

export const relatedProducts = (product: Product, count = 6) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
