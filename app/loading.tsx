import { BannerSkeleton, CarouselSkeleton } from '@/components/Skeletons';

export default function HomeLoading() {
  return (
    <div className="py-4 sm:py-6 space-y-10">
      <div className="mx-auto max-w-7xl px-4">
        <BannerSkeleton />
      </div>
      <div className="mx-auto max-w-7xl px-4 space-y-8">
        <CarouselSkeleton />
        <CarouselSkeleton />
      </div>
    </div>
  );
}
