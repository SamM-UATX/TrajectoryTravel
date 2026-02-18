import { NextRequest, NextResponse } from 'next/server';

export interface RestaurantOption {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price?: string;
  url: string;
  address?: string;
  imageUrl?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || '';
  const limit = parseInt(searchParams.get('limit') || '5', 10);
  const sortBy = searchParams.get('sort') || 'rating';

  if (!location.trim()) {
    return NextResponse.json({ error: 'location required' }, { status: 400 });
  }

  try {
    if (!process.env.YELP_API_KEY) {
      const mock = [
        { id: '1', name: 'Local Bistro', rating: 4.5, reviewCount: 230, price: '$$', url: '#', address: '' },
        { id: '2', name: 'Traditional Kitchen', rating: 4.3, reviewCount: 156, price: '$', url: '#', address: '' },
        { id: '3', name: 'Rooftop Restaurant', rating: 4.7, reviewCount: 412, price: '$$$', url: '#', address: '' },
      ];
      return NextResponse.json({ restaurants: mock.slice(0, limit) });
    }

    const params = new URLSearchParams({
      location: location.trim(),
      term: 'restaurants',
      sort_by: sortBy,
      limit: Math.min(limit, 10).toString(),
    });
    const res = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.description || 'Yelp API error');

    const restaurants: RestaurantOption[] = (data.businesses || [])
      .filter((b: { is_closed?: boolean }) => !b.is_closed)
      .map((b: {
        id: string;
        name: string;
        rating: number;
        review_count: number;
        price?: string;
        url?: string;
        image_url?: string;
        location?: { display_address?: string[] };
      }) => ({
        id: b.id,
        name: b.name,
        rating: b.rating,
        reviewCount: b.review_count || 0,
        price: b.price,
        url: b.url || `https://www.yelp.com/biz/${b.id}`,
        address: b.location?.display_address?.join(', '),
        imageUrl: b.image_url,
      }));

    return NextResponse.json({ restaurants });
  } catch (err) {
    console.error('Restaurants API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Restaurant search failed' },
      { status: 500 }
    );
  }
}
