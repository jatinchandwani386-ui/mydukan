function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-lg border border-line overflow-hidden">
      <Shimmer className="aspect-square w-full" />
      <div className="p-3 space-y-2.5">
        <Shimmer className="h-3.5 w-full rounded" />
        <Shimmer className="h-3.5 w-2/3 rounded" />
        <Shimmer className="h-4 w-1/3 rounded" />
        <Shimmer className="h-5 w-1/2 rounded" />
        <Shimmer className="h-8 w-full rounded-md mt-2" />
      </div>
    </div>
  );
}

export function CarouselSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-44 sm:w-52 shrink-0">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function PDPSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[420px_1fr_320px] gap-8">
      <div className="space-y-3">
        <Shimmer className="aspect-square w-full rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Shimmer key={i} className="h-16 w-16 rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Shimmer className="h-4 w-1/4 rounded" />
        <Shimmer className="h-7 w-3/4 rounded" />
        <Shimmer className="h-4 w-1/3 rounded" />
        <Shimmer className="h-24 w-full rounded" />
        <Shimmer className="h-40 w-full rounded" />
      </div>
      <Shimmer className="h-72 w-full rounded-lg" />
    </div>
  );
}

export function BannerSkeleton() {
  return <Shimmer className="w-full aspect-[16/6] sm:aspect-[16/4] rounded-lg" />;
}
