// Curated destination images - verified Unsplash photos of each landmark
// Format: https://images.unsplash.com/photo-{id}?w=1200&q=85

export interface DestinationSpot {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
  fallbackUrl: string;
}

export const DESTINATION_SPOTS: DestinationSpot[] = [
  { id: 'eiffel', name: 'Eiffel Tower', region: 'Paris, France', imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=85' },
  { id: 'great-wall', name: 'Great Wall of China', region: 'Beijing, China', imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=85' },
  { id: 'alaska', name: 'Glacier Bay', region: 'Alaska, USA', imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=85' },
  { id: 'santorini', name: 'Santorini', region: 'Greece', imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=85' },
  { id: 'tokyo', name: 'Shibuya Crossing', region: 'Tokyo, Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85' },
  { id: 'big-ben', name: 'Big Ben', region: 'London, UK', imageUrl: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1200&q=85' },
  { id: 'colosseum', name: 'Colosseum', region: 'Rome, Italy', imageUrl: 'https://images.unsplash.com/photo-1552832238-c57a7197761c?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1552832238-c57a7197761c?w=1200&q=85' },
  { id: 'sydney', name: 'Sydney Opera House', region: 'Sydney, Australia', imageUrl: 'https://images.unsplash.com/photo-1523482580671-f216146beb33?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1523482580671-f216146beb33?w=1200&q=85' },
  { id: 'machu', name: 'Machu Picchu', region: 'Peru', imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=85' },
  { id: 'pyramids', name: 'Pyramids of Giza', region: 'Egypt', imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&q=85', fallbackUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1200&q=85' },
];
