'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={frameRef}
        className="relative aspect-square w-full overflow-hidden rounded-lg border border-line bg-gray-50 cursor-zoom-in"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-contain p-6 transition-transform duration-200"
          style={
            zooming
              ? {
                  transform: 'scale(1.9)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
            className={`relative shrink-0 h-16 w-16 rounded-md border-2 overflow-hidden bg-gray-50 transition-colors ${
              active === i ? 'border-marigold' : 'border-line hover:border-ink/30'
            }`}
          >
            <Image src={img} alt="" fill sizes="64px" className="object-contain p-1.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
