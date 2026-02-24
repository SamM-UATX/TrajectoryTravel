import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTripBySlug } from '@/lib/trips-data';
import NavBar from '@/components/NavBar';
import TripHeroCarousel from '@/components/TripHeroCarousel';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const { TRIPS } = await import('@/lib/trips-data');
  return TRIPS.map((trip) => ({ slug: trip.slug }));
}

export default async function TripPage({ params }: { params: { slug: string } }) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  const heroImages = trip.coverImages?.length ? trip.coverImages : [trip.coverImage];

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />

      {/* Hero with sliding photo carousel */}
      <TripHeroCarousel images={heroImages} title={trip.title} alt={trip.title} />

      <div className="relative -mt-24 z-20 px-6">
        <div className="max-w-4xl">
          <Link
            href={`/${trip.category}`}
            className="inline-flex items-center gap-2 text-sm text-white hover:text-white/90 mb-4 drop-shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {trip.category} trips
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{trip.title}</h1>
          <p className="text-white/95 mt-1 drop-shadow-md">{trip.subtitle}</p>
          <div className="flex gap-4 mt-3 text-sm text-white/90">
            <span>{trip.duration}</span>
            <span>•</span>
            <span>From {trip.priceFrom}</span>
          </div>
        </div>
      </div>

      {/* Day-by-day itinerary */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-sage-dark mb-8">Your Itinerary</h2>
        <div className="space-y-6">
          {trip.days.map((day) => (
            <div
              key={day.day}
              className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-gray/20 shadow-sm"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-sage/20 flex items-center justify-center">
                <span className="font-bold text-sage-dark">Day {day.day}</span>
              </div>
              <div>
                <h3 className="font-semibold text-ink">{day.title}</h3>
                <p className="text-slate-gray mt-1 text-sm">{day.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#custom-trip"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sage text-white font-medium rounded-xl hover:bg-sage-dark transition-colors"
          >
            Customize this trip
          </Link>
        </div>
      </div>
    </div>
  );
}
