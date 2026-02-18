import { TripRequest, Itinerary, DayPlan, ItineraryItem } from '@/types/trip';
import { addDays, format, parseISO } from 'date-fns';
import { searchFlights } from './flight-search';
import { searchHotels } from './hotel-search';
import { getRegionalStops } from './regional-tours';

const TRAIN_OPERATORS = ['Eurostar', 'TGV', 'ICE', 'Shinkansen', 'Amtrak', 'Virgin Trains', 'Great Western Railway'];

const ACTIVITY_BY_INTEREST: Record<string, string[]> = {
  sightseeing: ['City walking tour', 'Historical site tour', 'Landmark visit', 'Architecture tour'],
  food: ['Food tour', 'Cooking class', 'Wine tasting', 'Market visit'],
  hiking: ['Nature hike', 'Scenic walk', 'Mountain tour', 'Coastal trail'],
  museums: ['Museum visit', 'Art gallery tour', 'Cultural center'],
  nightlife: ['Evening bar crawl', 'Live music venue', 'Rooftop experience'],
  default: ['City walking tour', 'Museum visit', 'Local market exploration', 'Historical site tour'],
};

const RESTAURANTS = [
  'Le Petit Bistro', 'The Local Table', 'Rooftop Garden', 'Seaside Grill',
  'Traditional Taverna', 'Michelin-starred experience', 'Farm-to-table dining',
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

function getActivitiesForInterests(activitiesStr?: string): string[] {
  if (!activitiesStr?.trim()) return ACTIVITY_BY_INTEREST.default;
  const interests = activitiesStr.toLowerCase().split(/[,&]+/).map(s => s.trim());
  const result: string[] = [];
  for (const i of interests) {
    const match = Object.entries(ACTIVITY_BY_INTEREST).find(([k]) => i.includes(k) || k.includes(i));
    if (match) result.push(...match[1]);
  }
  return result.length ? Array.from(new Set(result)) : ACTIVITY_BY_INTEREST.default;
}

export async function generateItinerary(tripRequest: TripRequest): Promise<Itinerary> {
  const multiplier = getMultiplier(tripRequest.budgetLevel);
  const startDate = parseISO(tripRequest.departureDate);
  const endDate = parseISO(tripRequest.returnDate);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const primaryDestination = tripRequest.destinations[0] || 'Your Destination';

  // Fetch real flight options from hometown to destination
  const flights = await searchFlights({
    origin: tripRequest.hometown || 'New York',
    destination: primaryDestination,
    departureDate: tripRequest.departureDate,
    returnDate: tripRequest.returnDate,
    travelers: tripRequest.travelers,
    budgetLevel: tripRequest.budgetLevel,
  });
  const selectedFlight = flights[0];

  // Fetch hotels with ratings (simulated from reviews)
  const hotels = await searchHotels({
    location: primaryDestination,
    checkIn: tripRequest.departureDate,
    checkOut: tripRequest.returnDate,
    travelers: tripRequest.travelers,
    budgetLevel: tripRequest.budgetLevel,
  });
  const selectedHotel = hotels[0];

  const regionalStops = getRegionalStops(primaryDestination);
  const activities = getActivitiesForInterests(tripRequest.activities);

  const days: DayPlan[] = [];
  let totalPrice = 0;

  // Day 1: Outbound flight
  const outboundFlightPrice = selectedFlight?.price ?? Math.round((400 + Math.random() * 600) * multiplier * tripRequest.travelers);
  totalPrice += outboundFlightPrice;

  const day0Items: ItineraryItem[] = [
    {
      id: randomId(),
      type: 'flight',
      title: `Outbound: ${tripRequest.hometown || 'Home'} → ${primaryDestination}`,
      description: selectedFlight
        ? `${selectedFlight.airline} ${selectedFlight.flightNumber} • ${selectedFlight.class} • Dep ${selectedFlight.departureTime}`
        : 'Flight to destination',
      date: tripRequest.departureDate,
      time: selectedFlight?.departureTime ?? '08:30',
      location: tripRequest.hometown || 'Departure',
      price: outboundFlightPrice,
      currency: 'USD',
      duration: selectedFlight?.duration ?? '8h 45m',
      provider: selectedFlight?.airline,
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
      title: selectedHotel?.name ?? `Hotel in ${primaryDestination}`,
      description: selectedHotel
        ? `${selectedHotel.rating}★ (${selectedHotel.reviewCount.toLocaleString()} reviews) • ${selectedHotel.amenities.slice(0, 2).join(', ')}`
        : `${totalDays} nights`,
      date: tripRequest.departureDate,
      time: '19:00',
      location: selectedHotel?.location ?? primaryDestination,
      price: Math.round((selectedHotel?.pricePerNight ?? 180) * totalDays),
      currency: 'USD',
      duration: `${totalDays} nights`,
      editable: true,
      metadata: selectedHotel ? { rating: selectedHotel.rating, reviewCount: selectedHotel.reviewCount } : undefined,
    },
  ];
  totalPrice += day0Items[1].price + day0Items[2].price;

  days.push({
    date: tripRequest.departureDate,
    dayNumber: 1,
    location: primaryDestination,
    items: day0Items,
  });

  // Distribute regional stops across middle days
  const stopIndices = regionalStops.length > 1
    ? regionalStops.slice(1).map((_, i) => Math.floor(((i + 1) / regionalStops.length) * (totalDays - 2)) + 1)
    : [];

  for (let i = 1; i < totalDays - 1; i++) {
    const date = addDays(startDate, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const stopIndex = stopIndices.indexOf(i);
    const dayLocation = stopIndex >= 0 ? regionalStops[stopIndex + 1].name : primaryDestination;
    const dayStop = stopIndex >= 0 ? regionalStops[stopIndex + 1] : regionalStops[0];
    const dayActivities = dayStop.popularActivities || activities;

    const dayItems: ItineraryItem[] = [];

    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Breakfast',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '08:00',
      location: 'Hotel',
      price: Math.round((15 + Math.random() * 25) * multiplier),
      currency: 'USD',
      editable: true,
    });

    const activityTitle = dayActivities[Math.floor(Math.random() * Math.min(dayActivities.length, 4))] || activities[0];
    const needsTransfer = stopIndex >= 0 && dayLocation !== primaryDestination;
    if (needsTransfer) {
      const trainPrice = Math.round((40 + Math.random() * 80) * multiplier * tripRequest.travelers);
      dayItems.push({
        id: randomId(),
        type: 'train',
        title: `Day trip to ${dayLocation}`,
        description: `${TRAIN_OPERATORS[Math.floor(Math.random() * TRAIN_OPERATORS.length)]} • Round trip`,
        date: dateStr,
        time: '09:00',
        location: primaryDestination,
        price: trainPrice,
        currency: 'USD',
        duration: '1-2h each way',
        editable: true,
      });
      totalPrice += trainPrice;
    }

    dayItems.push({
      id: randomId(),
      type: 'activity',
      title: activityTitle,
      description: dayStop?.description || 'Guided experience',
      date: dateStr,
      time: needsTransfer ? '11:00' : '10:00',
      location: dayLocation,
      price: Math.round((40 + Math.random() * 80) * multiplier),
      currency: 'USD',
      duration: '3h',
      editable: true,
    });

    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Lunch',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '13:30',
      location: dayLocation,
      price: Math.round((25 + Math.random() * 40) * multiplier),
      currency: 'USD',
      editable: true,
    });

    dayItems.push({
      id: randomId(),
      type: 'meal',
      title: 'Dinner',
      description: RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)],
      date: dateStr,
      time: '19:30',
      location: dayLocation,
      price: Math.round((50 + Math.random() * 100) * multiplier),
      currency: 'USD',
      editable: true,
    });

    dayItems.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const dayTotal = dayItems.reduce((s, it) => s + it.price, 0);
    totalPrice += dayTotal;

    days.push({
      date: dateStr,
      dayNumber: i + 1,
      location: dayLocation,
      items: dayItems,
    });
  }

  // Return flight
  const returnFlightPrice = Math.round((400 + Math.random() * 600) * multiplier * tripRequest.travelers);
  totalPrice += returnFlightPrice;
  const lastDay = days[days.length - 1];
  if (lastDay) {
    lastDay.items.push({
      id: randomId(),
      type: 'flight',
      title: `Return: ${primaryDestination} → ${tripRequest.hometown || 'Home'}`,
      description: selectedFlight ? `${selectedFlight.airline} • ${tripRequest.budgetLevel === 'luxury' ? 'Business' : 'Economy'}` : 'Return flight',
      date: tripRequest.returnDate,
      time: '14:00',
      location: primaryDestination,
      price: returnFlightPrice,
      currency: 'USD',
      duration: '9h 15m',
      provider: selectedFlight?.airline,
      editable: true,
    });
  }

  // Popular recommendations for the region
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
    ...regionalStops.slice(0, 2).map((stop, i) => ({
      id: randomId(),
      type: 'recommendation' as const,
      title: `Don't miss: ${stop.popularActivities[0] || stop.name}`,
      description: stop.description,
      date: '',
      price: 0,
      currency: 'USD' as const,
      editable: false,
    })),
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
