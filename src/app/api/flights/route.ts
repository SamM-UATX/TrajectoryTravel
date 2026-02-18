import { NextRequest, NextResponse } from 'next/server';
import { searchAmadeusFlights } from '@/lib/amadeus';

const CITY_TO_IATA: Record<string, string> = {
  'new york': 'JFK', nyc: 'JFK', manhattan: 'JFK',
  'los angeles': 'LAX', la: 'LAX',
  london: 'LHR', england: 'LHR', uk: 'LHR',
  paris: 'CDG', france: 'CDG',
  rome: 'FCO', italy: 'FCO', florence: 'FLR', venice: 'VCE',
  barcelona: 'BCN', spain: 'BCN', madrid: 'MAD',
  tokyo: 'NRT', japan: 'NRT', kyoto: 'KIX', osaka: 'KIX',
  sydney: 'SYD', australia: 'SYD',
  dubai: 'DXB', uae: 'DXB',
  chicago: 'ORD', miami: 'MIA', boston: 'BOS',
  'san francisco': 'SFO', sf: 'SFO',
  seattle: 'SEA', denver: 'DEN', atlanta: 'ATL',
  amsterdam: 'AMS', netherlands: 'AMS',
  berlin: 'BER', germany: 'BER',
  lisbon: 'LIS', dublin: 'DUB',
  beijing: 'PEK', china: 'PEK', shanghai: 'PVG',
  'hong kong': 'HKG', singapore: 'SIN',
  alaska: 'ANC', anchorage: 'ANC',
  athens: 'ATH', greece: 'ATH', santorini: 'JTR',
  cairo: 'CAI', egypt: 'CAI',
  lima: 'LIM', peru: 'LIM', cusco: 'CUZ',
};

function getIata(city: string): string {
  const n = city.toLowerCase().trim();
  return CITY_TO_IATA[n] || Object.entries(CITY_TO_IATA).find(([k]) => n.includes(k))?.[1] || 'LON';
}

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
    const originCode = getIata(origin);
    const destCode = getIata(destination);
    const flights = await searchAmadeusFlights(originCode, destCode, date, adults);
    return NextResponse.json({ flights });
  } catch (err) {
    console.error('Flights API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Flight search failed' },
      { status: 500 }
    );
  }
}
