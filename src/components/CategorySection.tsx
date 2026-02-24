'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  href: string;
  bgClass?: string;
}

export default function CategorySection({ id, title, description, images, href, bgClass = 'bg-mint-light/20' }: CategorySectionProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentImage((c) => (c + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section id={id} className={`py-16 md:py-24 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-sage-dark">{title}</h2>
            <p className="text-slate-gray mt-4 text-lg leading-relaxed">{description}</p>
            <Link
              href={href}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-sage text-white font-medium rounded-xl hover:bg-sage-dark transition-colors"
            >
              Explore {title} trips <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/50'}`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
