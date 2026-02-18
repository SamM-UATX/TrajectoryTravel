/**
 * Flight Search - uses Amadeus API when keys are set
 */

import { searchAmadeusFlights } from './amadeus';

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: 'economy' | 'premium' | 'business';
  stops: number;
  url?: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  budgetLevel: 'budget' | 'moderate' | 'luxury';
}

const CITY_CODES: Record<string, string> = {
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

const AIRLINE_NAMES: Record<string, string> = {
  UA: 'United Airlines', DL: 'Delta', AA: 'American Airlines',
  BA: 'British Airways', EK: 'Emirates', LH: 'Lufthansa',
  AF: 'Air France', KL: 'KLM', VS: 'Virgin Atlantic',
  B6: 'JetBlue', FR: 'Ryanair', U2: 'easyJet',
};

function getAirportCode(city: string): string {
  const n = city.toLowerCase().trim();
  return CITY_CODES[n] || Object.entries(CITY_CODES).find(([k]) => n.includes(k))?.[1] || 'LON';
}

function mockFlights(params: FlightSearchParams): FlightOption[] {
  const basePrice = 300 + Math.floor(Math.random() * 400);
  const mult = params.budgetLevel === 'budget' ? 0.7 : params.budgetLevel === 'luxury' ? 2.5 : 1.2;
  const total = Math.round(basePrice * mult * params.travelers);
  const times = ['06:30', '09:45', '12:15', '15:30', '18:00'];
  return times.slice(0, 5).map((t, i) => ({
    id: `mock-${i}`,
    airline: ['United Airlines', 'Delta', 'British Airways', 'Air France', 'Lufthansa'][i],
    flightNumber: ['UA', 'DL', 'BA', 'AF', 'LH'][i] + (100 + i) + (Math.floor(Math.random() * 900)),
    departureTime: t,
    arrivalTime: times[(i + 2) % 5],
    duration: '7h 30m',
    price: Math.round(total * (0.9 + i * 0.05)),
    class: params.budgetLevel === 'luxury' && i < 2 ? 'business' : 'economy',
    stops: i === 2 ? 1 : 0,
  }));
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightOption[]> {
  const originCode = getAirportCode(params.origin);
  const dest = typeof params.destination === 'string' ? params.destination : params.destination;
  const destCode = getAirportCode(dest);

  if (process.env.AMADEUS_API_KEY && process.env.AMADEUS_API_SECRET) {
    try {
      const results = await searchAmadeusFlights(
        originCode,
        destCode,
        params.departureDate,
        params.travelers
      );
      return results.map((r) => ({
        id: r.id,
        airline: AIRLINE_NAMES[r.airline] || r.airline,
        flightNumber: r.flightNumber,
        departureTime: r.departureTime,
        arrivalTime: r.arrivalTime,
        duration: r.duration,
        price: r.price,
        class: (r.class?.toLowerCase().includes('business') ? 'business' : r.class?.toLowerCase().includes('premium') ? 'premium' : 'economy') as 'economy' | 'premium' | 'business',
        stops: r.stops,
        url: `https://www.google.com/travel/flights?q=Flights%20to%20${encodeURIComponent(dest)}%20from%20${encodeURIComponent(params.origin)}`,
      }));
    } catch (err) {
      console.error('Amadeus flight search failed, using mock:', err);
    }
  }

  await new Promise((r) => setTimeout(r, 500));
  const mock = mockFlights(params);
  return mock.map((m) => ({
    ...m,
    url: `https://www.google.com/travel/flights?q=Flights%20to%20${encodeURIComponent(dest)}%20from%20${encodeURIComponent(params.origin)}`,
  }));
}
