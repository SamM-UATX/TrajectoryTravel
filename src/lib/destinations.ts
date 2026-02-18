// Curated destination images (Unsplash - direct URLs, no API key needed)
// Attribution: photos from Unsplash photographers

export interface DestinationSpot {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
  photographer?: string;
}

export const DESTINATION_SPOTS: DestinationSpot[] = [
  { id: 'eiffel', name: 'Eiffel Tower', region: 'Paris, France', imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80' },
  { id: 'great-wall', name: 'Great Wall of China', region: 'Beijing, China', imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80' },
  { id: 'alaska', name: 'Glacier Bay', region: 'Alaska, USA', imageUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80' },
  { id: 'santorini', name: 'Santorini', region: 'Greece', imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80' },
  { id: 'tokyo', name: 'Shibuya Crossing', region: 'Tokyo, Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
  { id: 'big-ben', name: 'Big Ben', region: 'London, UK', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac291?w=800&q=80' },
  { id: 'colosseum', name: 'Colosseum', region: 'Rome, Italy', imageUrl: 'https://images.unsplash.com/photo-1552832238-c57a7197761c?w=800&q=80' },
  { id: 'sydney', name: 'Sydney Opera House', region: 'Sydney, Australia', imageUrl: 'https://images.unsplash.com/photo-1523482580671-f216146beb33?w=800&q=80' },
  { id: 'machu', name: 'Machu Picchu', region: 'Peru', imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80' },
  { id: 'pyramids', name: 'Pyramids of Giza', region: 'Egypt', imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80' },
];
