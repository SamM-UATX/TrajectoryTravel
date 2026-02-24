import Link from 'next/link';
import NavBar from '@/components/NavBar';
import TripCard from '@/components/TripCard';
import { getTripsByCategory } from '@/lib/trips-data';
import { ArrowLeft } from 'lucide-react';

export default function HistoricPage() {
  const trips = getTripsByCategory('historic');

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/#historic" className="inline-flex items-center gap-2 text-sage-dark hover:text-sage mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1 className="text-4xl font-bold text-sage-dark mb-2">Historic</h1>
          <p className="text-slate-gray text-lg mb-12 max-w-2xl">
            Walk in the footsteps of civilizations. Ancient ruins and the stories that shaped our world.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
