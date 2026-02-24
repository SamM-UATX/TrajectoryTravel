import { NextRequest, NextResponse } from 'next/server';
import { generateItinerary } from '@/lib/itinerary-generator';
import { TripRequest } from '@/types/trip';

/**
 * Generate 3 itinerary options: budget, moderate, luxury
 * User can compare and choose before confirming
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.departureDate || !body.returnDate) {
      return NextResponse.json(
        { error: 'Email, departure date, and return date are required' },
        { status: 400 }
      );
    }

    if (!body.hometown?.trim()) {
      return NextResponse.json(
        { error: 'Hometown (departing from) is required for flight search' },
        { status: 400 }
      );
    }

    const baseRequest: Omit<TripRequest, 'budgetLevel'> = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      hometown: body.hometown.trim(),
      departureDate: body.departureDate,
      returnDate: body.returnDate,
      destinations: Array.isArray(body.destinations)
        ? body.destinations
        : (body.destinations || '').split(',').map((d: string) => d.trim()).filter(Boolean),
      activities: body.activities,
      travelers: parseInt(body.travelers, 10) || 1,
      notes: body.notes,
    };

    if (baseRequest.destinations.length === 0) {
      return NextResponse.json(
        { error: 'At least one destination is required' },
        { status: 400 }
      );
    }

    const [budget, moderate, luxury] = await Promise.all([
      generateItinerary({ ...baseRequest, budgetLevel: 'budget' }),
      generateItinerary({ ...baseRequest, budgetLevel: 'moderate' }),
      generateItinerary({ ...baseRequest, budgetLevel: 'luxury' }),
    ]);

    return NextResponse.json({
      options: [
        { level: 'budget' as const, itinerary: budget, label: 'Budget', description: 'Great value, comfortable stays' },
        { level: 'moderate' as const, itinerary: moderate, label: 'Moderate', description: 'Balance of comfort and value' },
        { level: 'luxury' as const, itinerary: luxury, label: 'Luxury', description: 'Premium experiences' },
      ],
    });
  } catch (error) {
    console.error('Itinerary options error:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary options' },
      { status: 500 }
    );
  }
}
