'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import ParallaxHero from '@/components/ParallaxHero';
import CategorySection from '@/components/CategorySection';
import TripRequestForm, { TripFormData } from '@/components/TripRequestForm';
import { SCENIC_CAROUSEL, HISTORIC_CAROUSEL, EXOTIC_CAROUSEL } from '@/lib/category-images';
import { Mail, MapPin, Phone } from 'lucide-react';

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
          destinations: data.destinations.split(',').map((d) => d.trim()).filter(Boolean),
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
      <NavBar />

      {/* Parallax Hawaii hero */}
      <ParallaxHero />

      {/* Scenic - relaxing, soul-healing */}
      <CategorySection
        id="scenic"
        title="Scenic"
        description="Relaxing, soul-healing journeys through breathtaking landscapes. Let nature restore you—dramatic coastlines, serene mountains, crystal lakes, and peaceful valleys. Perfect for unwinding and reconnecting with the world."
        images={SCENIC_CAROUSEL}
        href="/scenic"
        bgClass="bg-mint-light/20"
      />

      {/* Historic */}
      <CategorySection
        id="historic"
        title="Historic"
        description="Walk in the footsteps of civilizations. Ancient ruins, timeless architecture, and the stories that shaped our world. From the Colosseum to the Pyramids, discover the legacy of human achievement."
        images={HISTORIC_CAROUSEL}
        href="/historic"
        bgClass="bg-cloud-gray/50"
      />

      {/* Exotic - adventurous, exciting, spicy */}
      <CategorySection
        id="exotic"
        title="Exotic"
        description="Adventurous, exciting, and spicy. Volcanic islands, vibrant cultures, and unforgettable thrills. From Bali to the Galápagos, experience the world at its most dynamic and alive."
        images={EXOTIC_CAROUSEL}
        href="/exotic"
        bgClass="bg-mint-light/30"
      />

      {/* Custom Trip CTA */}
      <section id="custom-trip" className="py-16 md:py-24 bg-slate-gray/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sage-dark">Custom Trip</h2>
          <p className="text-slate-gray mt-2">
            Tell us your dates and dreams—we&apos;ll create a personalized itinerary with flights, hotels, and activities.
          </p>
          <div className="mt-8 rounded-2xl bg-white border border-slate-gray/20 p-6 md:p-8 shadow-lg">
            <TripRequestForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="py-16 md:py-24 bg-mint-light/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-sage-dark text-center mb-2">
            <span className="font-serif italic text-ocean-breeze">Contact</span>
          </h2>
          <p className="text-slate-gray text-center mb-12">
            Ready to plan your next adventure? Get in touch.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20">
              <Mail className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-ink">Email</h3>
              <a href="mailto:hello@trajectorytravel.com" className="text-ocean-breeze hover:underline mt-1 block">
                hello@trajectorytravel.com
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20">
              <Phone className="w-8 h-8 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-ink">Phone</h3>
              <a href="tel:+15551234567" className="text-ocean-breeze hover:underline mt-1 block">
                +1 (555) 123-4567
              </a>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white border border-slate-gray/20">
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
    </div>
  );
}
