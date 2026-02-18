'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItineraryView from '@/components/ItineraryView';
import { Itinerary } from '@/types/trip';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface BookingState {
  status: 'idle' | 'booking' | 'success' | 'error';
  result?: { itinerary: Itinerary; bookingReference: string };
}

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [bookingState, setBookingState] = useState<BookingState>({ status: 'idle' });

  useEffect(() => {
    const stored = sessionStorage.getItem('itinerary');
    if (stored) {
      try {
        setItinerary(JSON.parse(stored));
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const handleItineraryChange = (updated: Itinerary) => {
    setItinerary(updated);
    sessionStorage.setItem('itinerary', JSON.stringify(updated));
  };

  const handleApprove = async () => {
    if (!itinerary) return;
    setBookingState({ status: 'booking' });
    try {
      const res = await fetch('/api/book-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setBookingState({ status: 'success', result: data });
      setItinerary(data.itinerary);
      sessionStorage.setItem('itinerary', JSON.stringify(data.itinerary));
    } catch (err) {
      console.error(err);
      setBookingState({ status: 'error' });
    }
  };

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Loader2 className="w-12 h-12 text-sky-blue animate-spin" />
      </div>
    );
  }

  if (bookingState.status === 'success' && bookingState.result) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-sky-blue/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-sky-blue">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-ink mb-4">You&apos;re all set!</h1>
          <p className="text-ink/70 mb-6">
            Your trip has been booked. Confirmation sent to{' '}
            <span className="text-sky-blue font-semibold">{itinerary.tripRequest.email}</span>
          </p>
          <p className="text-ink/60 text-sm mb-8">
            Booking reference: <strong className="text-ink">{bookingState.result.bookingReference}</strong>
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl bg-sky-blue text-white font-semibold hover:bg-sky-blue-dark transition-colors"
          >
            Plan another trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-20 flex items-center gap-4 p-4 md:p-6 bg-cream/95 backdrop-blur-lg border-b border-cloud-gray">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sky-blue hover:text-sky-blue-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h1 className="text-lg font-semibold text-ink">Your Itinerary</h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {bookingState.status === 'booking' && (
          <div className="mb-6 p-4 rounded-xl bg-sky-blue/10 border border-sky-blue/30 flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-sky-blue animate-spin" />
            <span className="text-sky-blue-dark">Booking your flights, hotels, and more...</span>
          </div>
        )}
        {bookingState.status === 'error' && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600">
            Booking failed. Please try again.
          </div>
        )}
        <ItineraryView
          itinerary={itinerary}
          onItineraryChange={handleItineraryChange}
          onApprove={handleApprove}
          isBooked={bookingState.status === 'success'}
        />
      </main>
    </div>
  );
}
