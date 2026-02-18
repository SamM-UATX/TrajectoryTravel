/**
 * Regional tours - when visiting a country/region, include day trips to nearby highlights
 * e.g. England: London + Oxford, Stonehenge, Bath
 */

export interface RegionalStop {
  name: string;
  description: string;
  suggestedDuration: string;
  popularActivities: string[];
}

export const REGIONAL_TOURS: Record<string, RegionalStop[]> = {
  england: [
    { name: 'London', description: 'Capital city with world-class museums, royal palaces, and vibrant neighborhoods', suggestedDuration: '2-3 days', popularActivities: ['British Museum', 'Tower of London', 'West End shows', 'Borough Market'] },
    { name: 'Oxford', description: 'Historic university city with stunning college architecture', suggestedDuration: '1 day', popularActivities: ['Christ Church College', 'Bodleian Library', 'Punting on the Cherwell'] },
    { name: 'Stonehenge', description: 'Prehistoric stone circle and UNESCO World Heritage Site', suggestedDuration: 'Half day', popularActivities: ['Stone circle visit', 'Visitor centre exhibition'] },
    { name: 'Bath', description: 'Roman baths and Georgian architecture', suggestedDuration: '1 day', popularActivities: ['Roman Baths', 'Bath Abbey', 'Royal Crescent', 'Thermae Spa'] },
  ],
  france: [
    { name: 'Paris', description: 'City of light with iconic landmarks and world-class cuisine', suggestedDuration: '3-4 days', popularActivities: ['Eiffel Tower', 'Louvre', 'Notre-Dame', 'Montmartre'] },
    { name: 'Versailles', description: 'Opulent royal palace and gardens', suggestedDuration: '1 day', popularActivities: ['Palace tour', 'Hall of Mirrors', 'Gardens'] },
    { name: 'Loire Valley', description: 'Castles and wine country', suggestedDuration: '1-2 days', popularActivities: ['Château de Chambord', 'Wine tasting'] },
  ],
  italy: [
    { name: 'Rome', description: 'Eternal city with ancient ruins and Renaissance art', suggestedDuration: '3 days', popularActivities: ['Colosseum', 'Vatican', 'Trevi Fountain', 'Trastevere'] },
    { name: 'Florence', description: 'Renaissance capital and art hub', suggestedDuration: '2 days', popularActivities: ['Uffizi Gallery', 'Duomo', 'Piazzale Michelangelo'] },
    { name: 'Venice', description: 'Canal city with unique charm', suggestedDuration: '2 days', popularActivities: ['St. Mark\'s Square', 'Gondola ride', 'Murano glass'] },
  ],
  japan: [
    { name: 'Tokyo', description: 'Modern metropolis with traditional neighborhoods', suggestedDuration: '3 days', popularActivities: ['Shibuya', 'Senso-ji Temple', 'Tsukiji Market'] },
    { name: 'Kyoto', description: 'Ancient capital with temples and gardens', suggestedDuration: '2-3 days', popularActivities: ['Fushimi Inari', 'Arashiyama', 'Gion district'] },
    { name: 'Osaka', description: 'Food capital and vibrant nightlife', suggestedDuration: '1-2 days', popularActivities: ['Dotonbori', 'Osaka Castle', 'Street food'] },
  ],
  usa: [
    { name: 'New York', description: 'The city that never sleeps', suggestedDuration: '3-4 days', popularActivities: ['Central Park', 'Broadway', 'Museums', 'Brooklyn'] },
    { name: 'California Coast', description: 'Pacific coastline and national parks', suggestedDuration: '5-7 days', popularActivities: ['Big Sur', 'Yosemite', 'San Francisco'] },
  ],
  alaska: [
    { name: 'Anchorage', description: 'Gateway to wilderness', suggestedDuration: '1-2 days', popularActivities: ['Alaska Native Heritage Center', 'Tony Knowles Trail'] },
    { name: 'Glacier Bay', description: 'Stunning glaciers and wildlife', suggestedDuration: '1 day', popularActivities: ['Glacier cruise', 'Whale watching'] },
    { name: 'Denali', description: 'National park and North America\'s tallest peak', suggestedDuration: '2 days', popularActivities: ['Park bus tour', 'Wildlife viewing'] },
  ],
  china: [
    { name: 'Beijing', description: 'Capital with imperial history', suggestedDuration: '3 days', popularActivities: ['Forbidden City', 'Temple of Heaven'] },
    { name: 'Great Wall', description: 'Ancient wonder of the world', suggestedDuration: '1 day', popularActivities: ['Mutianyu section', 'Hiking'] },
  ],
  greece: [
    { name: 'Athens', description: 'Ancient capital with Acropolis', suggestedDuration: '2 days', popularActivities: ['Acropolis', 'Plaka', 'Acropolis Museum'] },
    { name: 'Santorini', description: 'Stunning sunsets and white-washed villages', suggestedDuration: '2-3 days', popularActivities: ['Oia sunset', 'Wine tasting', 'Red Beach'] },
  ],
};

const CITY_TO_REGION: Record<string, string> = {
  london: 'england', oxford: 'england', stonehenge: 'england', bath: 'england',
  paris: 'france', versailles: 'france',
  rome: 'italy', florence: 'italy', venice: 'italy',
  tokyo: 'japan', kyoto: 'japan', osaka: 'japan',
  'new york': 'usa', 'los angeles': 'usa', california: 'usa',
  anchorage: 'alaska', alaska: 'alaska', denali: 'alaska',
  beijing: 'china', 'great wall': 'china',
  athens: 'greece', santorini: 'greece',
};

function normalizeKey(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function getRegionalStops(destination: string): RegionalStop[] {
  const key = normalizeKey(destination);
  const region = CITY_TO_REGION[key] || Object.keys(REGIONAL_TOURS).find(r => key.includes(r));
  if (region && REGIONAL_TOURS[region]) return REGIONAL_TOURS[region];
  for (const [r, stops] of Object.entries(REGIONAL_TOURS)) {
    if (key.includes(r)) return stops;
  }
  return [{ name: destination, description: 'Explore the highlights', suggestedDuration: '1+ days', popularActivities: ['Sightseeing', 'Local cuisine', 'Cultural sites'] }];
}
