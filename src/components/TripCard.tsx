'use client';

import Link from 'next/link';
import { Trip } from '@/lib/trips-data';

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-slate-gray/20 shadow-sm hover:shadow-xl hover:border-sage/30 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span className="text-xs font-medium uppercase tracking-wider text-mint-light/90">
            {trip.duration} • From {trip.priceFrom}
          </span>
          <h3 className="font-bold text-lg mt-1">{trip.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-slate-gray">{trip.subtitle}</p>
      </div>
    </Link>
  );
}
