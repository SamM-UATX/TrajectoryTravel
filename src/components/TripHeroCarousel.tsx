'use client';

import { useEffect, useState } from 'react';

const FALLBACK_IMAGE = 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920';

interface TripHeroCarouselProps {
  images: string[];
  title: string;
  alt: string;
}

export default function TripHeroCarousel({ images, title, alt }: TripHeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>(images);

  useEffect(() => {
    setLoadedImages(images);
  }, [images]);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % loadedImages.length), 4000);
    return () => clearInterval(t);
  }, [loadedImages.length]);

  const handleError = (index: number) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[index] = FALLBACK_IMAGE;
      return next;
    });
  };

  return (
    <div className="relative h-[70vh] min-h-[480px] pt-20 overflow-hidden">
      {loadedImages.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt={alt}
          onError={() => handleError(i)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10 pointer-events-none" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {loadedImages.map((_, i) => (
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
