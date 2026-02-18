/**
 * Flight Search Service
 * 
 * In production, integrate with:
 * - Amadeus API: https://developers.amadeus.com/ (free tier: 2,000 calls/month)
 * - Skyscanner API: https://partners.skyscanner.net/
 * 
 * Set AMADEUS_API_KEY and AMADEUS_API_SECRET in .env.local for real flight data.
 */

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
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  budgetLevel: 'budget' | 'moderate' | 'luxury';
}

// City to IATA code mapping for realistic flight simulation
const CITY_CODES: Record<string, string> = {
  'new york': 'JFK', 'nyc': 'JFK', 'manhattan': 'JFK',
  'los angeles': 'LAX', 'la': 'LAX',
  'london': 'LHR', 'england': 'LHR', 'uk': 'LHR',
  'paris': 'CDG', 'france': 'CDG',
  'rome': 'FCO', 'italy': 'FCO',
  'barcelona': 'BCN', 'spain': 'BCN',
  'tokyo': 'NRT', 'japan': 'NRT',
  'sydney': 'SYD', 'australia': 'SYD',
  'dubai': 'DXB', 'uae': 'DXB',
  'chicago': 'ORD', 'miami': 'MIA', 'boston': 'BOS',
  'san francisco': 'SFO', 'sf': 'SFO',
  'seattle': 'SEA', 'denver': 'DEN', 'atlanta': 'ATL',
  'amsterdam': 'AMS', 'netherlands': 'AMS',
  'berlin': 'BER', 'germany': 'BER',
  'madrid': 'MAD', 'lisbon': 'LIS', 'dublin': 'DUB',
  'beijing': 'PEK', 'china': 'PEK', 'shanghai': 'PVG',
  'hong kong': 'HKG', 'singapore': 'SIN',
  'alaska': 'ANC', 'anchorage': 'ANC',
  'oxford': 'LHR', 'stonehenge': 'LHR', 'bath': 'BRS',
};

function getAirportCode(city: string): string {
  const normalized = city.toLowerCase().trim();
  return CITY_CODES[normalized] || 'XXX';
}

const AIRLINES = [
  { name: 'United Airlines', code: 'UA' },
  { name: 'Delta', code: 'DL' },
  { name: 'American Airlines', code: 'AA' },
  { name: 'British Airways', code: 'BA' },
  { name: 'Emirates', code: 'EK' },
  { name: 'Lufthansa', code: 'LH' },
  { name: 'Air France', code: 'AF' },
  { name: 'KLM', code: 'KL' },
  { name: 'Virgin Atlantic', code: 'VS' },
  { name: 'JetBlue', code: 'B6' },
];

function generateFlightOptions(params: FlightSearchParams): FlightOption[] {
  const originCode = getAirportCode(params.origin);
  const dest = typeof params.destination === 'string' ? params.destination : params.destination;
  const destCode = getAirportCode(dest);
  
  const basePrice = 300 + Math.floor(Math.random() * 400);
  const budgetMultiplier = params.budgetLevel === 'budget' ? 0.7 : params.budgetLevel === 'luxury' ? 2.5 : 1.2;
  const pricePerPerson = Math.round(basePrice * budgetMultiplier);
  const totalBase = pricePerPerson * params.travelers;

  const options: FlightOption[] = [];
  const times = ['06:30', '09:45', '12:15', '15:30', '18:00', '21:20'];
  const durations = ['6h 45m', '8h 15m', '7h 30m', '9h 00m', '5h 55m', '10h 20m'];

  for (let i = 0; i < 5; i++) {
    const airline = AIRLINES[i % AIRLINES.length];
    const priceVariation = 0.8 + (i * 0.15) + Math.random() * 0.2;
    const price = Math.round(totalBase * priceVariation);
    
    options.push({
      id: `flight-${i}-${Date.now()}`,
      airline: airline.name,
      flightNumber: `${airline.code}${100 + i}${Math.floor(Math.random() * 900)}`,
      departureTime: times[i],
      arrivalTime: times[(i + 2) % times.length],
      duration: durations[i % durations.length],
      price,
      class: params.budgetLevel === 'luxury' && i < 2 ? 'business' : params.budgetLevel === 'budget' ? 'economy' : 'premium',
      stops: i === 2 ? 1 : 0,
    });
  }

  return options.sort((a, b) => a.price - b.price);
}

export async function searchFlights(params: FlightSearchParams): Promise<FlightOption[]> {
  // In production: call Amadeus API
  // const apiKey = process.env.AMADEUS_API_KEY;
  // if (apiKey) {
  //   const response = await fetch(`https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destCode}&departureDate=${params.departureDate}&adults=${params.travelers}`, {
  //     headers: { Authorization: `Bearer ${await getAmadeusToken()}` }
  //   });
  //   return transformAmadeusResponse(await response.json());
  // }

  // Simulated delay to mimic API call
  await new Promise((r) => setTimeout(r, 800));
  return generateFlightOptions(params);
}
