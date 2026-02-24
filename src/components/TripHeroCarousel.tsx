'use client';

import { useEffect, useState } from 'react';

interface TripHeroCarouselProps {
  images: string[];
  title: string;
  alt: string;
}

export default function TripHeroCarousel({ images, title, alt }: TripHeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative h-[45vh] min-h-[320px] pt-24 overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-black/20 to-transparent z-10" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
