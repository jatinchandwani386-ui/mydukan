import { Star, StarHalf } from 'lucide-react';

export default function RatingStars({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-marigold" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={size} fill="currentColor" />;
        if (i === full && hasHalf) return <StarHalf key={i} size={size} fill="currentColor" />;
        return <Star key={i} size={size} className="text-ink/20" />;
      })}
    </div>
  );
}
