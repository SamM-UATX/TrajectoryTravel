'use client';

import { useEffect, useState } from 'react';
import { DESTINATION_SPOTS } from '@/lib/destinations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DestinationHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % DESTINATION_SPOTS.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl ring-2 ring-navy/10">
      {DESTINATION_SPOTS.map((spot, i) => (
        <div
          key={spot.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (spot.fallbackUrl && target.src !== spot.fallbackUrl) {
                target.src = spot.fallbackUrl;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <p className="text-cream/90 text-sm font-medium uppercase tracking-wider">
              {spot.region}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1">{spot.name}</h2>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 right-6 flex gap-2 z-20">
        {DESTINATION_SPOTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`View ${DESTINATION_SPOTS[i].name}`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrent((c) => (c - 1 + DESTINATION_SPOTS.length) % DESTINATION_SPOTS.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-navy transition-colors backdrop-blur-sm"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrent((c) => (c + 1) % DESTINATION_SPOTS.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-navy transition-colors backdrop-blur-sm"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
