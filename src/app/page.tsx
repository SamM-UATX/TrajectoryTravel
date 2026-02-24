'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import ParallaxHero from '@/components/ParallaxHero';
import CategorySection from '@/components/CategorySection';
import TripCard from '@/components/TripCard';
import ItineraryBuilder, { ItineraryBuilderState } from '@/components/ItineraryBuilder';
import SuccessModal from '@/components/SuccessModal';
import { getRecommendedTrips } from '@/lib/trips-data';
import { SCENIC_CAROUSEL, HISTORIC_CAROUSEL, EXOTIC_CAROUSEL } from '@/lib/category-images';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<ItineraryBuilderState | null>(null);

  const recommendedTrips = getRecommendedTrips();

  const handleItinerarySubmit = (data: ItineraryBuilderState) => {
    setIsLoading(true);
    setLastSubmittedData(data);
    const payload = {
      velocity: data.velocity,
      focus: data.focus,
      requestFlightBooking: data.requestFlightBooking,
      requestHotelBooking: data.requestHotelBooking,
      submittedAt: new Date().toISOString(),
    };
    console.log('Trajectory submitted:', payload);
    setIsLoading(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      <NavBar />

      <ParallaxHero />

      {/* Recommended Trajectories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-sage-dark mb-2">Recommended Trajectories</h2>
          <p className="text-slate-gray text-lg mb-12 max-w-2xl">
            Hand-picked journeys across Exotic, Historic, and Scenic categories. Select a trajectory to view the full itinerary.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </section>

      {/* Scenic */}
      <CategorySection
        id="scenic"
        title="Scenic"
        description="Our Scenic collection features curated journeys through the world's most restorative landscapes. These itineraries are designed for travelers seeking respite—where dramatic coastlines, alpine vistas, and serene fjords provide a natural retreat from the everyday. Each trip emphasizes immersion in unspoiled environments, offering both active exploration and contemplative moments."
        images={SCENIC_CAROUSEL}
        href="/scenic"
        bgClass="bg-mint-light/20"
      />

      {/* Historic */}
      <CategorySection
        id="historic"
        title="Historic"
        description="The Historic collection presents journeys through the architectural and cultural monuments that define human civilization. From classical antiquity to imperial capitals, these itineraries offer expert-led access to UNESCO World Heritage sites, ancient ruins, and living museums. Ideal for travelers with a deep appreciation for the narratives that have shaped our global heritage."
        images={HISTORIC_CAROUSEL}
        href="/historic"
        bgClass="bg-cloud-gray/50"
      />

      {/* Exotic */}
      <CategorySection
        id="exotic"
        title="Exotic"
        description="Our Exotic collection caters to travelers seeking bold, immersive experiences beyond the familiar. These itineraries combine volcanic landscapes, vibrant local cultures, and distinctive ecosystems—from the Aegean to the Galápagos. Each trip is structured to deliver both adventure and authenticity, with opportunities for wildlife encounters, culinary discovery, and connection with communities off the conventional path."
        images={EXOTIC_CAROUSEL}
        href="/exotic"
        bgClass="bg-mint-light/30"
      />

      {/* Custom Flight Path - Itinerary Builder (Concierge) */}
      <section id="custom-trip" className="py-16 md:py-24 bg-slate-gray/10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-sage-dark mb-2">The Custom Flight Path</h2>
          <p className="text-slate-gray mb-8">
            Build your ideal trajectory. Select your pace, focus, and add-ons. Our concierge will finalize your booking.
          </p>
          <div className="rounded-2xl bg-white border border-slate-gray/20 p-6 md:p-8 shadow-xl shadow-navy/5">
            <ItineraryBuilder onSubmit={handleItinerarySubmit} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-mint-light/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-sage-dark text-center mb-2">
            <span className="font-serif italic text-ocean-breeze">Contact</span>
          </h2>
          <p className="text-slate-gray text-center mb-12">Ready to plan your next adventure? Get in touch.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20 shadow-sm">
              <Mail className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-ink">Email</h3>
              <a href="mailto:hello@trajectorytravel.com" className="text-ocean-breeze hover:underline mt-1 block">
                hello@trajectorytravel.com
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20 shadow-sm">
              <Phone className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-ink">Phone</h3>
              <a href="tel:+15551234567" className="text-ocean-breeze hover:underline mt-1 block">
                +1 (555) 123-4567
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20 shadow-sm">
              <MapPin className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-ink">Office</h3>
              <p className="text-slate-gray mt-1">123 Travel Lane, Honolulu, HI</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-gray/20 py-10 text-center text-slate-gray text-sm bg-white">
        <p className="font-semibold text-sage-dark">Trajectory Travel</p>
        <p className="mt-1">Plan, explore, and discover</p>
      </footer>

      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        trajectoryData={lastSubmittedData ? { ...lastSubmittedData } : undefined}
      />
    </div>
  );
}