import { TripRequest, Itinerary, DayPlan, ItineraryItem } from '@/types/trip';
import { addDays, format, parseISO } from 'date-fns';

const FLIGHT_PROVIDERS = ['United', 'Delta', 'American', 'Emirates', 'British Airways', 'Lufthansa'];
const HOTEL_CHAINS = ['Marriott', 'Hilton', 'Hyatt', 'Four Seasons', 'Ritz-Carlton', 'W Hotels'];
const TRAIN_OPERATORS = ['Eurostar', 'TGV', 'ICE', 'Shinkansen', 'Amtrak', 'Virgin Trains'];
const ACTIVITIES = [
  'City walking tour',
  'Museum visit',
  'Local market exploration',
  'Cooking class',
  'Wine tasting',
  'Sunset cruise',
  'Historical site tour',
  'Food tour',
];

const RESTAURANTS = [
  'Le Petit Bistro',
  'The Local Table',
  'Rooftop Garden',
  'Seaside Grill',
  'Traditional Taverna',
  'Michelin-starred experience',
];

function randomId(): string {
  return Math.random().toString(36).slice(2, 11);
}

function getMultiplier(budgetLevel: TripRequest['budgetLevel']): number {
  switch (budgetLevel) {
    case 'budget': return 0.6;
    case 'moderate': return 1;
    case 'luxury': return 2.5;
    default: return 1;
  }
}

export function generateItinerary(tripRequest: TripRequest): Itinerary {
  const multiplier = getMultiplier(tripRequest.budgetLevel);
  const startDate = parseISO(tripRequest.departureDate);
  const endDate = parseISO(tripRequest.returnDate);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const primaryDestination = tripRequest.destinations[0] || 'Your Destination';

  const days: DayPlan[] = [];
  let totalPrice = 0;

  // Day 0: Outbound flight
  const outboundFlightPrice = Math.round((400 + Math.random() * 600) * multiplier * tripRequest.travelers);
  totalPrice += outboundFlightPrice;
  const flightProvider = FLIGHT_PROVIDERS[Math.floor(Math.random() * FLIGHT_PROVIDERS.length)];

  const day0Items: ItineraryItem[] = [
    {
      id: randomId(),
      type: 'flight',
      title: `Outbound Flight to ${primaryDestination}`,
      description: `${flightProvider} - Economy ${tripRequest.budgetLevel === 'luxury' ? 'Business' : 'Class'}`,
      date: tripRequest.departureDate,
      time: '08:30',
      location: 'Departure Airport',
      price: outboundFlightPrice,
      currency: 'USD',
      duration: '8h 45m',
      provider: flightProvider,
      editable: true,
    },
    {
      id: randomId(),
      type: 'transfer',
      title: 'Airport Transfer',
      description: 'Private car to hotel',
      date: tripRequest.departureDate,
      time: '18:00',
      location: primaryDestination,
      price: Math.round(45 * multiplier),
      currency: 'USD',
      duration: '45m',
      editable: true,
    },
    {
      id: randomId(),
      type: 'hotel',
      title: `${HOTEL_CHAINS[Math.floor(Math.random() * HOTEL_CHAINS.length)]} ${primaryDestination}`,
      description: `${tripRequest.budgetLevel === 'luxury' ? 'Suite' : 'Deluxe Room'} - ${totalDays} nights`,
      date: tripRequest.departureDate,
      time: '19:00',
      location: primaryDestination,
      price: Math.round(180 * totalDays * multiplier),
      currency: 'USD',
      duration: `${totalDays} nights`,
      editable: true,
    },
  ];
  totalPrice += day0Items[1].price + day0Items[2].price;

  days.push({
    date: tripRequest.departureDate,
    dayNumber: 1,
    location: primaryDestination,
    items: day0Items,
  });

  // Middle days
  for (let i = 1; i < totalDays - 1; i++) {
    const date = addDays(startDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayItems: ItineraryItem[] = [];

    // Breakfast
    const breakfastPrice = Math.round((15 + Math.random() * 25) * multiplier);
    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Breakfast',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '08:00',
      location: 'Hotel',
      price: breakfastPrice,
      currency: 'USD',
      editable: true,
    });
    totalPrice += breakfastPrice;

    // Morning activity
    const activityPrice = Math.round((40 + Math.random() * 80) * multiplier);
    dayItems.push({
      id: randomId(),
      type: 'activity',
      title: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
      description: 'Guided experience',
      date: dateStr,
      time: '10:00',
      location: primaryDestination,
      price: activityPrice,
      currency: 'USD',
      duration: '3h',
      editable: true,
    });
    totalPrice += activityPrice;

    // Lunch
    const lunchPrice = Math.round((25 + Math.random() * 40) * multiplier);
    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Lunch',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '13:30',
      location: primaryDestination,
      price: lunchPrice,
      currency: 'USD',
      editable: true,
    });
    totalPrice += lunchPrice;

    // Afternoon - maybe train if multiple destinations
    if (tripRequest.destinations.length > 1 && i === Math.floor(totalDays / 2)) {
      const trainPrice = Math.round((60 + Math.random() * 120) * multiplier * tripRequest.travelers);
      const nextDest = tripRequest.destinations[1];
      dayItems.push({
        id: randomId(),
        type: 'train',
        title: `Train to ${nextDest}`,
        description: `${TRAIN_OPERATORS[Math.floor(Math.random() * TRAIN_OPERATORS.length)]} - First Class`,
        date: dateStr,
        time: '15:00',
        location: primaryDestination,
        price: trainPrice,
        currency: 'USD',
        duration: '2h 30m',
        editable: true,
      });
      totalPrice += trainPrice;
    }

    // Dinner
    const dinnerPrice = Math.round((50 + Math.random() * 100) * multiplier);
    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Dinner',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '19:30',
      location: primaryDestination,
      price: dinnerPrice,
      currency: 'USD',
      editable: true,
    });
    totalPrice += dinnerPrice;

    dayItems.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    days.push({
      date: dateStr,
      dayNumber: i + 1,
      location: primaryDestination,
      items: dayItems,
    });
  }

  // Last day: return flight
  const returnFlightPrice = Math.round((400 + Math.random() * 600) * multiplier * tripRequest.travelers);
  totalPrice += returnFlightPrice;

  const lastDate = format(addDays(startDate, totalDays - 1), 'yyyy-MM-dd');
  const lastDay = days[days.length - 1];
  if (lastDay) {
    lastDay.items.push({
      id: randomId(),
      type: 'flight',
      title: `Return Flight`,
      description: `${flightProvider} - ${tripRequest.budgetLevel === 'luxury' ? 'Business' : 'Economy'} Class`,
      date: tripRequest.returnDate,
      time: '14:00',
      location: primaryDestination,
      price: returnFlightPrice,
      currency: 'USD',
      duration: '9h 15m',
      provider: flightProvider,
      editable: true,
    });
  }

  // Add recommendations to last day
  const recs: ItineraryItem[] = [
    {
      id: randomId(),
      type: 'recommendation',
      title: 'Travel Insurance',
      description: 'Comprehensive coverage recommended',
      date: '',
      price: Math.round(75 * tripRequest.travelers),
      currency: 'USD',
      editable: true,
    },
    {
      id: randomId(),
      type: 'recommendation',
      title: 'Local SIM / eSIM',
      description: 'Stay connected abroad',
      date: '',
      price: 35,
      currency: 'USD',
      editable: true,
    },
  ];
  totalPrice += recs[0].price + recs[1].price;
  if (lastDay) lastDay.items.push(...recs);

  return {
    id: randomId(),
    tripRequest,
    days,
    totalPrice,
    currency: 'USD',
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
}
