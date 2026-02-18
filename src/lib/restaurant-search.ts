/**
 * Restaurant Search - uses Yelp API when key is set
 * Sorted by rating (highest first)
 */

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

export async function searchRestaurants(
  location: string,
  limit = 5
): Promise<RestaurantOption[]> {
  if (process.env.YELP_API_KEY) {
    try {
      const params = new URLSearchParams({
        location: location.trim(),
        term: 'restaurants',
        sort_by: 'rating',
        limit: Math.min(limit, 10).toString(),
      });
      const res = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
        headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
      });
      const data = await res.json();
      if (res.ok && data.businesses?.length) {
        return data.businesses
          .filter((b: { is_closed?: boolean }) => !b.is_closed)
          .map((b: { id: string; name: string; rating: number; review_count: number; price?: string; url?: string; image_url?: string; location?: { display_address?: string[] } }) => ({
            id: b.id,
            name: b.name,
            rating: b.rating,
            reviewCount: b.review_count || 0,
            price: b.price,
            url: b.url || `https://www.yelp.com/biz/${b.id}`,
            address: b.location?.display_address?.join(', '),
            imageUrl: b.image_url,
          }));
      }
    } catch (err) {
      console.error('Yelp restaurant search failed:', err);
    }
  }

  // Mock fallback - use Yelp search so links are functional
  const yelpSearchUrl = `https://www.yelp.com/search?find_desc=restaurants&find_loc=${encodeURIComponent(location)}`;
  const mock = [
    { id: '1', name: 'Local Bistro', rating: 4.5, reviewCount: 230, price: '$$', url: yelpSearchUrl, address: '', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
    { id: '2', name: 'Traditional Kitchen', rating: 4.3, reviewCount: 156, price: '$', url: yelpSearchUrl, address: '', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
    { id: '3', name: 'Rooftop Restaurant', rating: 4.7, reviewCount: 412, price: '$$$', url: yelpSearchUrl, address: '', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
  ];
  return mock.slice(0, limit);
}
