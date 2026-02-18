import { NextRequest, NextResponse } from 'next/server';
import { getAmadeusToken } from '@/lib/amadeus';

export interface HotelOption {
  id: string;
  name: string;
  rating?: number;
  reviewCount?: number;
  pricePerNight?: number;
  address?: string;
  url?: string;
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  if (!location.trim()) {
    return NextResponse.json({ error: 'location required' }, { status: 400 });
  }

  try {
    if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
      const base = 150;
      const mockHotels = [
        { id: '1', name: 'Central Hotel', rating: 4.6, reviewCount: 1200, pricePerNight: base, url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}` },
        { id: '2', name: 'Riverside Inn', rating: 4.4, reviewCount: 890, pricePerNight: Math.round(base * 0.9), url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}` },
        { id: '3', name: 'Heritage Suites', rating: 4.8, reviewCount: 2100, pricePerNight: Math.round(base * 1.3), url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}` },
      ];
      return NextResponse.json({ hotels: mockHotels });
    }

    const cityCode = getCityCode(location);
    const token = await getAmadeusToken();

    // Amadeus Hotel List - get hotels by city
    const listRes = await fetch(
      `https://api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const listData = await listRes.json();
    if (!listRes.ok) throw new Error(listData.errors?.[0]?.detail || 'Hotel list failed');

    const hotelList = (listData.data || []).slice(0, 15);
    const hotelIds = hotelList.map((h: { hotelId?: string }) => h.hotelId).filter(Boolean).slice(0, 10);

    // Fetch ratings for these hotels (Amadeus Hotel Ratings API)
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
        // Ratings optional
      }
    }

    const hotels = hotelList.slice(0, 10).map((h: { hotelId?: string; name?: string; address?: { lines?: string[] } }) => {
      const r = ratingsMap[h.hotelId || ''] || {};
      return {
        id: h.hotelId || '',
        name: h.name || 'Hotel',
        address: h.address?.lines?.join(', '),
        rating: r.rating || undefined,
        reviewCount: r.reviewCount || undefined,
        url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(h.name || '')}+${encodeURIComponent(location)}`,
      };
    });

    // Sort by rating (highest first) when available
    hotels.sort((a: HotelOption, b: HotelOption) => (b.rating || 0) - (a.rating || 0));

    // If we have check-in/out and hotel IDs, try Hotel Search for prices
    if (checkIn && checkOut && hotelIds.length) {
      try {
        const searchRes = await fetch(
          `https://api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelIds.slice(0, 5).join(',')}&adults=1&checkInDate=${checkIn}&roomQuantity=1`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const searchData = await searchRes.json();
        if (searchRes.ok && searchData.data?.length) {
          const priceMap: Record<string, number> = {};
          for (const o of searchData.data as { hotel?: { hotelId?: string }; offers?: { price?: { total?: string } }[] }[]) {
            const total = o.offers?.[0]?.price?.total;
            if (total && o.hotel?.hotelId) {
              const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000) || 1;
              priceMap[o.hotel.hotelId] = Math.round(parseFloat(total) / nights);
            }
          }
          for (const h of hotels) {
            if (h.id && priceMap[h.id]) h.pricePerNight = priceMap[h.id];
          }
        }
      } catch {
        // Prices optional
      }
    }

    return NextResponse.json({ hotels });
  } catch (err) {
    console.error('Hotels API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Hotel search failed' },
      { status: 500 }
    );
  }
}
