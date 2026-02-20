'use client';

import { Trip } from '@/lib/trips-data';
import TripCard from './TripCard';

interface TripSectionProps {
  id: string;
  title: string;
  subtitle: string;
  trips: Trip[];
}

export default function TripSection({ id, title, subtitle, trips }: TripSectionProps) {
  return (
    <section id={id} className="py-16 md:py-24 bg-gradient-to-b from-cream to-mint-light/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sage-dark">{title}</h2>
          <p className="text-slate-gray mt-2 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
