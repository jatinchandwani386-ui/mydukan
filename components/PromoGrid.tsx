import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TILES = [
  {
    title: 'Up to 60% off',
    subtitle: 'Top Brands in Electronics',
    cta: 'Explore now',
    bg: 'bg-white',
    imageEmoji: '\uD83C\uDFA7',
  },
  {
    title: 'Best Sellers',
    subtitle: 'Most-loved picks this week',
    cta: 'See the list',
    bg: 'bg-white',
    imageEmoji: '\u2B50',
  },
  {
    title: 'Deals Under \u20B9499',
    subtitle: 'Budget finds, big value',
    cta: 'Grab deals',
    bg: 'bg-white',
    imageEmoji: '\uD83C\uDFF7\uFE0F',
  },
];

export default function PromoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TILES.map((tile) => (
        <Link
          key={tile.title}
          href="#"
          className={`${tile.bg} rounded-lg border border-line p-5 flex items-center justify-between hover:shadow-popover transition-shadow group`}
        >
          <div>
            <p className="font-display font-bold text-lg text-ink">{tile.title}</p>
            <p className="text-sm text-ink/60 mt-0.5">{tile.subtitle}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-marigold-dark mt-3 group-hover:gap-2 transition-all">
              {tile.cta} <ArrowRight size={14} />
            </span>
          </div>
          <span className="text-4xl" aria-hidden>
            {tile.imageEmoji}
          </span>
        </Link>
      ))}
    </section>
  );
}
