/**
 * Amadeus API - Flights
 * Get API key at https://developers.amadeus.com/
 */

let tokenCache: { token: string; expiresAt: number } | null = null;

export async function getAmadeusToken(): Promise<string> {
  const key = process.env.AMADEUS_API_KEY;
  const secret = process.env.AMADEUS_API_SECRET;
  if (!key || !secret) throw new Error('AMADEUS_API_KEY and AMADEUS_API_SECRET required');

  if (tokenCache && tokenCache.expiresAt > Date.now() + 60000) {
    return tokenCache.token;
  }

  const res = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${encodeURIComponent(key)}&client_secret=${encodeURIComponent(secret)}`,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'Amadeus auth failed');

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in || 1799) * 1000,
  };
  return tokenCache.token;
}

export interface AmadeusFlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  class: string;
  stops: number;
}

export async function searchAmadeusFlights(
  originCode: string,
  destCode: string,
  departureDate: string,
  adults: number
): Promise<AmadeusFlightOption[]> {
  const token = await getAmadeusToken();
  const url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originCode}&destinationLocationCode=${destCode}&departureDate=${departureDate}&adults=${adults}&max=10`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.[0]?.detail || 'Flight search failed');

  const offers = data.data || [];
  return offers.map((o: Record<string, unknown>) => {
    const itineraries = (o.itineraries as { segments: unknown[] }[]) || [];
    const segments = itineraries[0]?.segments || [];
    const first = segments[0] as { departure?: { at?: string }; carrierCode?: string; number?: string };
    const last = segments[segments.length - 1] as { arrival?: { at?: string } };
    const price = (o.price as { total?: string })?.total || '0';
    const travelerPricings = (o.travelerPricings as { fareDetailsBySegment: { cabin?: string }[] }[]) || [];
    const cabin = travelerPricings[0]?.fareDetailsBySegment?.[0]?.cabin || 'ECONOMY';

    return {
      id: (o.id as string) || '',
      airline: first?.carrierCode || '',
      flightNumber: `${first?.carrierCode || ''}${first?.number || ''}`,
      departureTime: first?.departure?.at?.slice(11, 16) || '',
      arrivalTime: last?.arrival?.at?.slice(11, 16) || '',
      duration: (() => {
        const dur = (itineraries[0] as { duration?: string })?.duration || '';
        if (!dur) return '';
        const m = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
        if (!m) return dur;
        const h = parseInt(m[1] || '0', 10);
        const min = parseInt(m[2] || '0', 10);
        return h ? `${h}h ${min}m` : `${min}m`;
      })(),
      price: Math.round(parseFloat(price)),
      class: cabin,
      stops: Math.max(0, segments.length - 1),
    };
  });
}
