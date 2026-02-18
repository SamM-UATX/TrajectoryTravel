export type BudgetLevel = 'budget' | 'moderate' | 'luxury';

export interface TripRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  hometown: string;  // Origin city for flight search
  departureDate: string;
  returnDate: string;
  destinations: string[];
  activities?: string;  // What they want to do (e.g. "sightseeing, food tours")
  budgetLevel: BudgetLevel;
  travelers: number;
  notes?: string;
}

export type ItineraryItemType = 
  | 'flight' 
  | 'hotel' 
  | 'train' 
  | 'car_rental' 
  | 'activity' 
  | 'meal' 
  | 'transfer'
  | 'recommendation';

export interface ItineraryItem {
  id: string;
  type: ItineraryItemType;
  title: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  price: number;
  currency: string;
  duration?: string;
  provider?: string;
  confirmationCode?: string;
  editable: boolean;
  metadata?: Record<string, unknown>;
  url?: string;  // Clickable link to booking/review page
}

export interface DayPlan {
  date: string;
  dayNumber: number;
  location: string;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  tripRequest: TripRequest;
  days: DayPlan[];
  totalPrice: number;
  currency: string;
  status: 'draft' | 'approved' | 'booked';
  createdAt: string;
}
