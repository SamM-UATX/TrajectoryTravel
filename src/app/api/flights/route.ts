import { NextRequest, NextResponse } from 'next/server';
import { searchFlights } from '@/lib/flight-search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin') || 'New York';
  const destination = searchParams.get('destination') || 'London';
  const date = searchParams.get('date') || '';
  const adults = parseInt(searchParams.get('adults') || '1', 10);

  if (!date) {
    return NextResponse.json({ error: 'date required' }, { status: 400 });
  }

  try {
    const flights = await searchFlights({
      origin,
      destination,
      departureDate: date,
      travelers: adults,
      budgetLevel: 'moderate',
    });
    return NextResponse.json({ flights });
  } catch (err) {
    console.error('Flights API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Flight search failed' },
      { status: 500 }
    );
  }
}
