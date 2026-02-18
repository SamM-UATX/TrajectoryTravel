import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/itinerary-generator';
import { TripRequest } from '@/types/trip';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tripRequest: TripRequest = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      hometown: body.hometown || 'New York',
      departureDate: body.departureDate,
      returnDate: body.returnDate,
      destinations: Array.isArray(body.destinations) 
        ? body.destinations 
        : (body.destinations || '').split(',').map((d: string) => d.trim()).filter(Boolean),
      activities: body.activities,
      budgetLevel: body.budgetLevel || 'moderate',
      travelers: parseInt(body.travelers, 10) || 1,
      notes: body.notes,
    };

    if (!tripRequest.email || !tripRequest.departureDate || !tripRequest.returnDate) {
      return NextResponse.json(
        { error: 'Email, departure date, and return date are required' },
        { status: 400 }
      );
    }

    if (!tripRequest.hometown?.trim()) {
      return NextResponse.json(
        { error: 'Hometown (departing from) is required for flight search' },
        { status: 400 }
      );
    }

    if (tripRequest.destinations.length === 0) {
      return NextResponse.json(
        { error: 'At least one destination is required' },
        { status: 400 }
      );
    }

    const itinerary = await generateItinerary(tripRequest);
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('Itinerary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary' },
      { status: 500 }
    );
  }
}
