'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TripRequestForm, { TripFormData } from '@/components/TripRequestForm';
import GlobeWithPlane from '@/components/GlobeWithPlane';
import { Plane, MapPin, Shield, Sparkles } from 'lucide-react';

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
          destinations: data.destinations.split(',').map(d => d.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to generate');
      const itinerary = await res.json();
      sessionStorage.setItem('itinerary', JSON.stringify(itinerary));
      router.push('/itinerary');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with plane + globe */}
      <div className="relative overflow-hidden pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-sky-blue flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-ink">Trajectory</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sky-blue">
              <a href="#" className="hover:text-sky-blue-dark transition-colors">How it works</a>
              <a href="#" className="hover:text-sky-blue-dark transition-colors">Destinations</a>
            </nav>
          </header>

          {/* Plane flying across globe */}
          <GlobeWithPlane />

          {/* Trajectory Travel - underneath */}
          <h1 className="text-4xl md:text-5xl font-bold text-sky-blue text-center mt-4 tracking-tight">
            Trajectory Travel
          </h1>
          <p className="text-lg text-ink/80 text-center max-w-2xl mx-auto mt-4">
            Your perfect trip, planned for you. Tell us your dates and destinations—we&apos;ll handle flights, hotels, trains, meals, and everything in between.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Plane, label: 'Flights' },
              { icon: MapPin, label: 'Hotels' },
              { icon: Sparkles, label: 'Activities' },
              { icon: Shield, label: 'All booked' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cloud-gray border border-cloud-gray-dark"
              >
                <Icon className="w-4 h-4 text-sky-blue" />
                <span className="text-ink text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-cloud-gray border border-cloud-gray-dark p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-ink mb-2">Plan your trip</h2>
          <p className="text-ink/70 mb-6">We&apos;ll create a full itinerary for you to review and customize.</p>
          <TripRequestForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      <footer className="border-t border-cloud-gray py-8 text-center text-ink/60 text-sm">
        Trajectory Travel • Plan, edit, approve, and we book it all
      </footer>
    </div>
  );
}
