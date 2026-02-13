import { NextRequest, NextResponse } from 'next/server';
import { Itinerary } from '@/types/trip';

// Simulated booking - in production, integrate with Amadeus, Booking.com, Stripe, etc.
function generateConfirmationCode(): string {
  return 'TRJ-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    const itinerary: Itinerary = await request.json();

    if (!itinerary.id || !itinerary.tripRequest?.email) {
      return NextResponse.json(
        { error: 'Invalid itinerary data' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate confirmation codes for bookable items
    const bookedItinerary = {
      ...itinerary,
      status: 'booked' as const,
      days: itinerary.days.map(day => ({
        ...day,
        items: day.items.map(item => ({
          ...item,
          confirmationCode: ['flight', 'hotel', 'train', 'car_rental', 'transfer'].includes(item.type)
            ? generateConfirmationCode()
            : item.confirmationCode,
        })),
      })),
    };

    // In production: send confirmation email to itinerary.tripRequest.email
    // In production: process payment via Stripe
    // In production: call Amadeus/Booking.com APIs for actual reservations

    return NextResponse.json({
      success: true,
      itinerary: bookedItinerary,
      bookingReference: generateConfirmationCode(),
      message: `Booking confirmed! Confirmation sent to ${itinerary.tripRequest.email}`,
    });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to complete booking' },
      { status: 500 }
    );
  }
}
