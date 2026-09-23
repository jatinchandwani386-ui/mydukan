import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { getProductById, products, relatedProducts } from '@/data/products';
import ImageGallery from '@/components/ImageGallery';
import BuyBox from '@/components/BuyBox';
import RatingStars from '@/components/RatingStars';
import ProductCarousel from '@/components/ProductCarousel';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = relatedProducts(product);

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center gap-1.5 text-xs text-ink/50">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-ink/80 truncate max-w-[200px]">{product.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 grid grid-cols-1 lg:grid-cols-[420px_1fr_320px] gap-8">
        {/* Left: gallery */}
        <ImageGallery images={product.gallery} title={product.title} />

        {/* Middle: details */}
        <div>
          <p className="text-sm text-marigold-dark font-semibold">{product.brand}</p>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-ink mt-1 leading-snug">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-ink/60">
              {product.rating.toFixed(1)} &middot;{' '}
              {product.reviewCount.toLocaleString('en-IN')} ratings
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display font-extrabold text-2xl text-ink">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-sm text-ink/40 line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            <span className="text-sm font-semibold text-leaf">Inclusive of all taxes</span>
          </div>

          <div className="mt-6">
            <p className="font-display font-bold text-base text-ink mb-2">Highlights</p>
            <ul className="space-y-2">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink/75">
                  <CheckCircle2 size={16} className="text-leaf mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-display font-bold text-base text-ink mb-2">About this item</p>
            <p className="text-sm text-ink/70 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Right: sticky buy box */}
        <BuyBox product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <ProductCarousel title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
