/**
 * Hotel Search - uses Amadeus API when keys are set
 * Sorted by rating (highest first)
 */

import { getAmadeusToken } from './amadeus';

export interface HotelOption {
  id: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  pricePerNight?: number;
  amenities?: string[];
  location?: string;
  url?: string;
  imageUrl?: string;
}

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budgetLevel: 'budget' | 'moderate' | 'luxury';
}

const CITY_TO_IATA: Record<string, string> = {
  london: 'LON', england: 'LON', uk: 'LON',
  paris: 'PAR', france: 'PAR',
  rome: 'ROM', italy: 'ROM', florence: 'FLR', venice: 'VCE',
  barcelona: 'BCN', madrid: 'MAD', spain: 'BCN',
  tokyo: 'TYO', japan: 'TYO', kyoto: 'KYO', osaka: 'OSA',
  'new york': 'NYC', nyc: 'NYC',
  amsterdam: 'AMS', berlin: 'BER',
  athens: 'ATH', greece: 'ATH', santorini: 'JTR',
  cairo: 'CAI', egypt: 'CAI',
  lima: 'LIM', peru: 'LIM', cusco: 'CUZ',
  sydney: 'SYD', australia: 'SYD',
  dubai: 'DXB', singapore: 'SIN',
};

function getCityCode(city: string): string {
  const n = city.toLowerCase().trim();
  return CITY_TO_IATA[n] || Object.entries(CITY_TO_IATA).find(([k]) => n.includes(k))?.[1] || 'LON';
}

const HOTEL_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80';

function mockHotels(params: HotelSearchParams): HotelOption[] {
  const base = params.budgetLevel === 'budget' ? 80 : params.budgetLevel === 'luxury' ? 350 : 180;
  const nights = Math.ceil((new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / 86400000) || 1;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(params.location)}`;
  return [
    { id: '1', name: 'Central Hotel', rating: 4.6, reviewCount: 1200, pricePerNight: Math.round(base * 1.2), url: bookingUrl, imageUrl: HOTEL_IMAGE },
    { id: '2', name: 'Riverside Inn', rating: 4.4, reviewCount: 890, pricePerNight: Math.round(base), url: bookingUrl, imageUrl: HOTEL_IMAGE },
    { id: '3', name: 'Heritage Suites', rating: 4.8, reviewCount: 2100, pricePerNight: Math.round(base * 1.5), url: bookingUrl, imageUrl: HOTEL_IMAGE },
  ];
}

export async function searchHotels(params: HotelSearchParams): Promise<HotelOption[]> {
  if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
    await new Promise((r) => setTimeout(r, 400));
    return mockHotels(params);
  }

  try {
    const cityCode = getCityCode(params.location);
    const token = await getAmadeusToken();

    const listRes = await fetch(
      `https://api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const listData = await listRes.json();
    if (!listRes.ok) throw new Error(listData.errors?.[0]?.detail || 'Hotel list failed');

    const hotelList = (listData.data || []).slice(0, 15);
    const hotelIds = hotelList.map((h: { hotelId?: string }) => h.hotelId).filter(Boolean).slice(0, 10);

    let ratingsMap: Record<string, { rating: number; reviewCount: number }> = {};
    if (hotelIds.length) {
      try {
        const ratingsRes = await fetch(
          `https://api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelIds.join(',')}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const ratingsData = await ratingsRes.json();
        if (ratingsRes.ok && ratingsData.data) {
          ratingsMap = Object.fromEntries(
            (ratingsData.data as { hotelId?: string; overallRating?: number; numberOfReviews?: number }[]).map(
              (r) => [r.hotelId || '', { rating: (r.overallRating || 0) / 20, reviewCount: r.numberOfReviews || 0 }]
            )
          );
        }
      } catch {
        /* ratings optional */
      }
    }

    const hotelImg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80';
    let hotels: HotelOption[] = hotelList.slice(0, 10).map((h: { hotelId?: string; name?: string }) => {
      const r = ratingsMap[h.hotelId || ''] || {};
      return {
        id: h.hotelId || '',
        name: h.name || 'Hotel',
        rating: r.rating || undefined,
        reviewCount: r.reviewCount || undefined,
        url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(h.name || '')}+${encodeURIComponent(params.location)}`,
        imageUrl: hotelImg,
      };
    });

    hotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    if (params.checkIn && params.checkOut && hotelIds.length) {
      try {
        const searchRes = await fetch(
          `https://api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds.slice(0, 5).join(',')}&adults=1&checkInDate=${params.checkIn}&roomQuantity=1`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const searchData = await searchRes.json();
        if (searchRes.ok && searchData.data?.length) {
          const nights = Math.ceil((new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / 86400000) || 1;
          for (const o of searchData.data as { hotel?: { hotelId?: string }; offers?: { price?: { total?: string } }[] }[]) {
            const total = o.offers?.[0]?.price?.total;
            if (total && o.hotel?.hotelId) {
              const h = hotels.find((x) => x.id === o.hotel?.hotelId);
              if (h) h.pricePerNight = Math.round(parseFloat(total) / nights);
            }
          }
        }
      } catch {
        /* prices optional */
      }
    }

    return hotels;
  } catch (err) {
    console.error('Amadeus hotel search failed, using mock:', err);
    return mockHotels(params);
  }
}
