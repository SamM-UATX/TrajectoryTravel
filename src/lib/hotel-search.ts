/**
 * Hotel Search Service
 * 
 * Simulates hotel search with ratings from customer reviews.
 * In production, integrate with:
 * - Booking.com API (requires partnership)
 * - Hotels.com API
 * - Amadeus Hotel API
 * - Aggregate reviews from TripAdvisor, Google, Facebook (via their APIs)
 */

export interface HotelOption {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  location: string;
  imageUrl?: string;
}

export interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  travelers: number;
  budgetLevel: 'budget' | 'moderate' | 'luxury';
}

// Simulated hotel data with realistic ratings (as would come from TripAdvisor, Google, Facebook aggregates)
const HOTEL_TEMPLATES: Record<string, Omit<HotelOption, 'id' | 'pricePerNight'>[]> = {
  default: [
    { name: 'The Grand Plaza', rating: 4.8, reviewCount: 2341, amenities: ['Pool', 'Spa', 'Free WiFi'], location: 'City Center' },
    { name: 'Riverside Inn', rating: 4.5, reviewCount: 892, amenities: ['Breakfast', 'Parking'], location: 'Waterfront' },
    { name: 'Heritage Hotel', rating: 4.7, reviewCount: 1567, amenities: ['Restaurant', 'Gym', 'Bar'], location: 'Historic District' },
    { name: 'Urban Loft Suites', rating: 4.3, reviewCount: 445, amenities: ['Kitchen', 'Workspace'], location: 'Downtown' },
    { name: 'Garden View Resort', rating: 4.6, reviewCount: 2103, amenities: ['Garden', 'Pool', 'Spa'], location: 'Outskirts' },
  ],
  london: [
    { name: 'The Savoy', rating: 4.9, reviewCount: 4521, amenities: ['Spa', 'Michelin Restaurant', 'River View'], location: 'Strand' },
    { name: 'Claridge\'s', rating: 4.8, reviewCount: 3201, amenities: ['Afternoon Tea', 'Spa', 'Bar'], location: 'Mayfair' },
    { name: 'The Z Hotel', rating: 4.4, reviewCount: 1892, amenities: ['Free WiFi', 'Complimentary Wine'], location: 'Soho' },
    { name: 'CitizenM Bankside', rating: 4.5, reviewCount: 2341, amenities: ['Rooftop Bar', '24/7 Food'], location: 'Southwark' },
  ],
  paris: [
    { name: 'Le Bristol Paris', rating: 4.9, reviewCount: 2890, amenities: ['Spa', '3 Michelin Stars', 'Garden'], location: 'Faubourg Saint-Honoré' },
    { name: 'Hôtel du Louvre', rating: 4.6, reviewCount: 3421, amenities: ['Museum Views', 'Restaurant'], location: '1st Arrondissement' },
    { name: 'Le Marais Boutique', rating: 4.5, reviewCount: 1567, amenities: ['Historic Building', 'Courtyard'], location: 'Le Marais' },
  ],
};

function getHotelsForLocation(location: string): Omit<HotelOption, 'id' | 'pricePerNight'>[] {
  const normalized = location.toLowerCase();
  if (normalized.includes('london') || normalized.includes('england') || normalized.includes('uk')) {
    return HOTEL_TEMPLATES.london;
  }
  if (normalized.includes('paris') || normalized.includes('france')) {
    return HOTEL_TEMPLATES.paris;
  }
  return HOTEL_TEMPLATES.default;
}

export async function searchHotels(params: HotelSearchParams): Promise<HotelOption[]> {
  const hotels = getHotelsForLocation(params.location);
  const nights = Math.ceil((new Date(params.checkOut).getTime() - new Date(params.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  
  const basePrice = params.budgetLevel === 'budget' ? 80 : params.budgetLevel === 'luxury' ? 350 : 180;
  
  return hotels.map((h, i) => ({
    ...h,
    id: `hotel-${i}-${Date.now()}`,
    pricePerNight: Math.round(basePrice * (1 + (h.rating - 4) * 0.3) * (1 + i * 0.1)),
  }));
}
