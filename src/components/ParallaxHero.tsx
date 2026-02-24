'use client';

import { useEffect, useState } from 'react';

const HAWAII_IMAGE = 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1920';

export default function ParallaxHero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax: image moves slower than scroll (stays somewhat still)
  const parallaxY = offset * 0.4;

  return (
    <section id="home" className="relative h-[85vh] min-h-[500px] overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 -top-20"
        style={{ transform: `translateY(${parallaxY * 0.5}px)` }}
      >
        <img
          src={HAWAII_IMAGE}
          alt="Hawaii - green cliffs and spectacular ocean views"
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-6">
        <p className="text-mint-light/90 text-sm font-medium uppercase tracking-[0.3em] mb-2">
          Discover Your Journey
        </p>
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg max-w-3xl">
          Where Green Meets the Sea
        </h1>
        <p className="text-lg md:text-xl text-white/90 mt-4 max-w-xl">
          Spectacular views, lush valleys, and endless adventure await.
        </p>
      </div>
    </section>
  );
}
