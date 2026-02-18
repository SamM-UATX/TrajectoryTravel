'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TripRequestForm, { TripFormData } from '@/components/TripRequestForm';
import GlobeWithPlane from '@/components/GlobeWithPlane';
import { Plane, MapPin, Shield, Sparkles } from 'lucide-react';
import DestinationHero from '@/components/DestinationHero';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          hometown: data.hometown,
          activities: data.activities,
          destinations: data.destinations.split(',').map(d => d.trim()).filter(Boolean),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to generate itinerary');
      sessionStorage.setItem('itinerary', JSON.stringify(result));
      router.push('/itinerary');
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Decorative gradient background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-cream via-cream-dark to-navy/5 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] -z-10 bg-accent-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] -z-10 bg-accent-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Hero with plane + globe */}
      <div className="relative overflow-hidden pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                <Plane className="w-5 h-5 text-cream" />
              </div>
              <span className="font-bold text-xl text-navy">Trajectory</span>
            </div>
            <nav className="hidden md:flex gap-6 text-navy">
              <a href="#how-it-works" className="hover:text-navy-dark transition-colors">How it works</a>
              <a href="#destinations" className="hover:text-navy-dark transition-colors">Destinations</a>
            </nav>
          </header>

          {/* Destination hero carousel - enlarged */}
          <div className="mb-8">
            <DestinationHero />
          </div>

          {/* Static logo: plane on globe */}
          <div className="mb-6 scale-75 md:scale-90">
            <GlobeWithPlane />
          </div>

          {/* Trajectory Travel - underneath */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy text-center mt-4 tracking-tight">
            Trajectory Travel
          </h1>
          <p className="text-lg text-ink/80 text-center max-w-2xl mx-auto mt-4">
            Your perfect trip, planned for you. Tell us your dates and destinations—we&apos;ll handle flights, hotels, trains, meals, and everything in between.
          </p>

          {/* Quick destination chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Paris', 'London', 'Tokyo', 'Rome', 'Santorini', 'Alaska'].map((dest) => (
              <span
                key={dest}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/80 text-navy border border-navy/10 shadow-sm hover:bg-navy/5 transition-colors"
              >
                {dest}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Plane, label: 'Flights', color: 'bg-navy/10 text-navy border border-navy/20' },
              { icon: MapPin, label: 'Hotels', color: 'bg-accent-teal/15 text-accent-teal border border-accent-teal/30' },
              { icon: Sparkles, label: 'Activities', color: 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30' },
              { icon: Shield, label: 'All booked', color: 'bg-navy/10 text-navy border border-navy/20' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border font-medium shadow-sm ${color}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-white border-2 border-navy/10 p-6 md:p-8 shadow-xl shadow-navy/10 ring-1 ring-navy/5">
          <h2 className="text-2xl font-bold text-ink mb-2">Plan your trip</h2>
          <p className="text-ink/70 mb-6">We&apos;ll create a full itinerary for you to review and customize.</p>
          <TripRequestForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      <footer className="border-t-2 border-navy/10 py-10 text-center text-ink/70 text-sm bg-gradient-to-b from-cream-dark to-navy/5">
        <p className="font-medium text-navy">Trajectory Travel</p>
        <p className="mt-1">Plan, edit, approve, and we book it all</p>
      </footer>
    </div>
  );
}
