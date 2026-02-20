/**
 * Curated trips for Scenic, Historic, and Exotic sections
 * Each trip has a cover photo and day-by-day itinerary
 */

export type TripCategory = 'scenic' | 'historic' | 'exotic';

export interface DayPlan {
  day: number;
  title: string;
  description: string;
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: TripCategory;
  coverImage: string;
  duration: string;
  priceFrom: string;
  days: DayPlan[];
}

export const TRIPS: Trip[] = [
  // SCENIC
  {
    id: 'scenic-1',
    slug: 'napali-coast-kauai',
    title: 'Napali Coast & Kauai',
    subtitle: 'Dramatic cliffs, emerald valleys, and hidden beaches',
    category: 'scenic',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85',
    duration: '5 days',
    priceFrom: '$1,299',
    days: [
      { day: 1, title: 'Arrival & Hanalei Bay', description: 'Land in Lihue, drive to the North Shore. Settle in and explore Hanalei Bay\'s golden sands and taro fields.' },
      { day: 2, title: 'Napali Coast Boat Tour', description: 'Cruise along the dramatic cliffs. Spot dolphins, sea caves, and waterfalls cascading into the ocean.' },
      { day: 3, title: 'Waimea Canyon', description: 'Hike the "Grand Canyon of the Pacific." Stunning views of red and green layered cliffs.' },
      { day: 4, title: 'Wailua River & Falls', description: 'Kayak or boat up the Wailua River. Visit Secret Falls and enjoy a picnic lunch.' },
      { day: 5, title: 'Poipu Beach & Departure', description: 'Morning at Poipu Beach. Relax on the sand before your flight home.' },
    ],
  },
  {
    id: 'scenic-2',
    slug: 'road-to-hana-maui',
    title: 'Road to Hana',
    subtitle: 'Winding waterfalls, bamboo forests, and black sand beaches',
    category: 'scenic',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85',
    duration: '4 days',
    priceFrom: '$899',
    days: [
      { day: 1, title: 'Kahului to Paia', description: 'Start the journey. Stop at Twin Falls for a quick swim and fresh fruit stands.' },
      { day: 2, title: 'Full Hana Drive', description: 'Navigate the 600 curves. Visit Wailua Falls, Keanae Peninsula, and black sand beaches.' },
      { day: 3, title: 'Oheo Gulch & Pipiwai', description: 'Hike the bamboo forest trail to Waimoku Falls. Swim in the Seven Sacred Pools.' },
      { day: 4, title: 'Haleakala Sunrise', description: 'Early wake-up for sunrise above the clouds. Drive back via Upcountry.' },
    ],
  },
  {
    id: 'scenic-3',
    slug: 'norwegian-fjords',
    title: 'Norwegian Fjords',
    subtitle: 'Glacier-carved valleys, waterfalls, and villages',
    category: 'scenic',
    coverImage: 'https://images.unsplash.com/photo-1502609908652-aeff09c6b31a?w=800&q=85',
    duration: '7 days',
    priceFrom: '$2,199',
    days: [
      { day: 1, title: 'Bergen', description: 'Arrive in Bergen. Explore Bryggen and the fish market.' },
      { day: 2, title: 'Flam Railway', description: 'Scenic train ride through mountains and valleys to Flåm.' },
      { day: 3, title: 'Sognefjord Cruise', description: 'Boat through the longest fjord. Stunning cliffs and waterfalls.' },
      { day: 4, title: 'Geiranger', description: 'Drive to Geiranger. Views of Seven Sisters waterfall.' },
      { day: 5, title: 'Trollstigen', description: 'Wind the mountain road. Visit Troll Wall and viewpoints.' },
      { day: 6, title: 'Ålesund', description: 'Art Nouveau architecture. Climb Aksla for panoramic views.' },
      { day: 7, title: 'Departure', description: 'Morning at leisure before your flight home.' },
    ],
  },
  {
    id: 'scenic-4',
    slug: 'swiss-alps',
    title: 'Swiss Alps',
    subtitle: 'Snow-capped peaks, alpine meadows, and crystal lakes',
    category: 'scenic',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
    duration: '6 days',
    priceFrom: '$1,899',
    days: [
      { day: 1, title: 'Zurich to Interlaken', description: 'Train through the heart of Switzerland. Settle in Interlaken.' },
      { day: 2, title: 'Jungfraujoch', description: 'Cogwheel train to Jungfraujoch. Views of Aletsch Glacier.' },
      { day: 3, title: 'Grindelwald First', description: 'Cliff walk and mountain views. Optional paragliding.' },
      { day: 4, title: 'Lauterbrunnen Valley', description: 'Walk among 72 waterfalls. Visit Trümmelbach Falls.' },
      { day: 5, title: 'Lake Geneva', description: 'Train to Montreux. Stroll the lakeside promenade.' },
      { day: 6, title: 'Departure', description: 'Morning at leisure before your flight home.' },
    ],
  },
  // HISTORIC
  {
    id: 'historic-1',
    slug: 'rome-ancient-wonders',
    title: 'Rome & Ancient Wonders',
    subtitle: 'Colosseum, Vatican, and the heart of the Roman Empire',
    category: 'historic',
    coverImage: 'https://images.unsplash.com/photo-1552832238-c57a7197761c?w=800&q=85',
    duration: '5 days',
    priceFrom: '$1,149',
    days: [
      { day: 1, title: 'Arrival & Trevi', description: 'Land in Rome. Evening stroll to Trevi Fountain and Spanish Steps.' },
      { day: 2, title: 'Colosseum & Forum', description: 'Skip-the-line Colosseum tour. Explore the Roman Forum.' },
      { day: 3, title: 'Vatican City', description: 'Sistine Chapel and St. Peter\'s Basilica. Vatican Museums.' },
      { day: 4, title: 'Pantheon & Trastevere', description: 'Ancient Pantheon. Lunch in Trastevere. Evening at Campo de\' Fiori.' },
      { day: 5, title: 'Departure', description: 'Morning at leisure. Optional Castel Sant\'Angelo visit.' },
    ],
  },
  {
    id: 'historic-2',
    slug: 'athens-acropolis',
    title: 'Athens & the Acropolis',
    subtitle: 'Birthplace of democracy, philosophy, and Western civilization',
    category: 'historic',
    coverImage: 'https://images.unsplash.com/photo-1523531294919-4fcd27459059?w=800&q=85',
    duration: '4 days',
    priceFrom: '$799',
    days: [
      { day: 1, title: 'Acropolis', description: 'Parthenon, Erechtheion, and Temple of Athena Nike. Acropolis Museum.' },
      { day: 2, title: 'Ancient Agora', description: 'Temple of Hephaestus. Stoa of Attalos. Plaka neighborhood.' },
      { day: 3, title: 'Temple of Olympian Zeus', description: 'Hadrian\'s Arch. National Archaeological Museum.' },
      { day: 4, title: 'Departure', description: 'Morning at the Ancient Cemetery or Lycabettus Hill.' },
    ],
  },
  {
    id: 'historic-3',
    slug: 'egypt-pyramids',
    title: 'Egypt & the Pyramids',
    subtitle: 'Giza, Sphinx, and 4,500 years of history',
    category: 'historic',
    coverImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=85',
    duration: '6 days',
    priceFrom: '$1,499',
    days: [
      { day: 1, title: 'Cairo Arrival', description: 'Land in Cairo. Evening at Khan el-Khalili bazaar.' },
      { day: 2, title: 'Giza Plateau', description: 'Great Pyramids and Sphinx. Camel ride at sunset.' },
      { day: 3, title: 'Egyptian Museum', description: 'Tutankhamun treasures. Mummy room. Tahrir Square.' },
      { day: 4, title: 'Saqqara & Memphis', description: 'Step Pyramid. Ancient capital of Memphis.' },
      { day: 5, title: 'Islamic Cairo', description: 'Citadel and Mohamed Ali Mosque. Al-Azhar.' },
      { day: 6, title: 'Departure', description: 'Morning at leisure before your flight home.' },
    ],
  },
  {
    id: 'historic-4',
    slug: 'kyoto-temples',
    title: 'Kyoto Temples',
    subtitle: 'Geisha districts, zen gardens, and golden pavilions',
    category: 'historic',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=85',
    duration: '5 days',
    priceFrom: '$1,399',
    days: [
      { day: 1, title: 'Arrival & Gion', description: 'Land in Osaka, train to Kyoto. Evening in Gion district.' },
      { day: 2, title: 'Fushimi Inari', description: 'Thousands of torii gates. Hike to the summit.' },
      { day: 3, title: 'Kinkaku-ji & Arashiyama', description: 'Golden Pavilion. Bamboo grove and Tenryu-ji.' },
      { day: 4, title: 'Kiyomizu-dera', description: 'Wooden temple on stilts. Ninenzaka and Sannenzaka streets.' },
      { day: 5, title: 'Departure', description: 'Morning at Ryoan-ji rock garden or Nishiki Market.' },
    ],
  },
  // EXOTIC
  {
    id: 'exotic-1',
    slug: 'santorini-sunset',
    title: 'Santorini Sunset',
    subtitle: 'White villages, blue domes, and volcanic beaches',
    category: 'exotic',
    coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=85',
    duration: '4 days',
    priceFrom: '$999',
    days: [
      { day: 1, title: 'Fira Arrival', description: 'Land in Santorini. Explore Fira and the caldera views.' },
      { day: 2, title: 'Oia & Sunset', description: 'White-washed Oia. Blue domes. Famous sunset from the castle.' },
      { day: 3, title: 'Red Beach & Akrotiri', description: 'Volcanic Red Beach. Ancient Minoan ruins at Akrotiri.' },
      { day: 4, title: 'Departure', description: 'Morning at Kamari or Perissa black sand beach.' },
    ],
  },
  {
    id: 'exotic-2',
    slug: 'machu-picchu',
    title: 'Machu Picchu',
    subtitle: 'Inca citadel in the clouds',
    category: 'exotic',
    coverImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=85',
    duration: '6 days',
    priceFrom: '$1,699',
    days: [
      { day: 1, title: 'Lima', description: 'Arrive in Lima. Barranco district and ceviche.' },
      { day: 2, title: 'Cusco', description: 'Fly to Cusco. Acclimatize. Sacsayhuamán and San Blas.' },
      { day: 3, title: 'Sacred Valley', description: 'Pisac market and ruins. Ollantaytambo fortress.' },
      { day: 4, title: 'Machu Picchu', description: 'Train to Aguas Calientes. Full day at the citadel.' },
      { day: 5, title: 'Return to Cusco', description: 'Morning at Machu Picchu or Huayna Picchu. Train back.' },
      { day: 6, title: 'Departure', description: 'Morning at leisure before your flight home.' },
    ],
  },
  {
    id: 'exotic-3',
    slug: 'bali-tropical',
    title: 'Bali Tropical',
    subtitle: 'Rice terraces, temples, and beach vibes',
    category: 'exotic',
    coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=85',
    duration: '6 days',
    priceFrom: '$1,299',
    days: [
      { day: 1, title: 'Ubud Arrival', description: 'Land in Denpasar. Drive to Ubud. Monkey Forest.' },
      { day: 2, title: 'Tegalalang Rice Terraces', description: 'Morning at the terraces. Coffee plantation tour.' },
      { day: 3, title: 'Temples', description: 'Tirta Empul water temple. Goa Gajah. Traditional dance.' },
      { day: 4, title: 'Nusa Dua', description: 'Transfer to the coast. Beach time and water sports.' },
      { day: 5, title: 'Uluwatu', description: 'Cliff temple and Kecak dance. Jimbaran seafood dinner.' },
      { day: 6, title: 'Departure', description: 'Morning at leisure before your flight home.' },
    ],
  },
  {
    id: 'exotic-4',
    slug: 'iceland-northern-lights',
    title: 'Iceland Northern Lights',
    subtitle: 'Glaciers, geysers, and the aurora borealis',
    category: 'exotic',
    coverImage: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=85',
    duration: '5 days',
    priceFrom: '$1,599',
    days: [
      { day: 1, title: 'Reykjavik', description: 'Arrive in Reykjavik. Explore the city. Evening aurora hunt.' },
      { day: 2, title: 'Golden Circle', description: 'Thingvellir, Geysir, Gullfoss. Geothermal wonders.' },
      { day: 3, title: 'South Coast', description: 'Seljalandsfoss and Skógafoss. Black sand beach at Vik.' },
      { day: 4, title: 'Glacier Lagoon', description: 'Jökulsárlón icebergs. Diamond Beach.' },
      { day: 5, title: 'Departure', description: 'Blue Lagoon before your flight home.' },
    ],
  },
];

export function getTripsByCategory(category: TripCategory): Trip[] {
  return TRIPS.filter((t) => t.category === category);
}

export function getTripBySlug(slug: string): Trip | undefined {
  return TRIPS.find((t) => t.slug === slug);
}
