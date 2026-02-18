# Trajectory Travel

A full-stack trip planning website that creates complete itineraries—flights, hotels, trains, meals, activities—based on your dates, destinations, and budget preference. Review, edit, and approve; we handle the booking.

## Features

- **Trip request form**: Email, name, dates, destinations, budget level (budget / moderate / luxury), number of travelers
- **AI-generated itinerary**: Flights, hotels, train tickets, transfers, meals, activities, and recommendations
- **Editable itinerary**: View day-by-day, expand/collapse, edit or remove items
- **One-click booking**: Approve the itinerary to "book" everything (simulated—see below)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Booking

This demo uses **simulated** itinerary generation and booking. For real bookings you would integrate:

- **Flights**: Amadeus, Skyscanner, or similar API
- **Hotels**: Booking.com, Hotels.com, or direct provider APIs
- **Trains**: Rail Europe, national rail APIs
- **Payments**: Stripe or PayPal
- **Email**: SendGrid, Resend, or similar for confirmations

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

---

## Phil Notes

**For grading purposes—everything you should know about this project:**

### What Was Built
- **Full-stack travel agency site** ("Trajectory Travel") that plans trips to anywhere in the world
- User provides: where they want to go, what they want to do, when, hometown, budget level (budget/moderate/luxury)
- System generates a day-by-day itinerary with flights, hotels, meals, transport, and activities
- User can review, edit, approve, and "book" (simulated confirmation)
- **Real API integration** when keys are configured: Amadeus (flights + hotels), Yelp (restaurants)
- **Regional tours**: e.g., England → London + Oxford, Stonehenge, Bath (not just London)
- **Clickable items**: Flights, hotels, and restaurants link to Google Flights, Booking.com, or Yelp
- **Ratings-based recommendations**: Hotels and restaurants sorted by rating when real APIs are used

### API Keys (Optional but Recommended for Full Demo)
Create `.env.local` in the project root:
```
AMADEUS_API_KEY=your_key
AMADEUS_API_SECRET=your_secret
YELP_API_KEY=your_key
```
- **Amadeus**: Free tier at https://developers.amadeus.com/
- **Yelp**: Free at https://www.yelp.com/developers/v3/manage_app
- Without keys, the app uses mock data and still runs fully

### Known Limitations
- **Booking is simulated**: No real payment processing or actual reservations
- **Flight search**: Uses Amadeus when keys set; returns mock data otherwise
- **Hotels**: Amadeus Hotel List + Ratings API; mock fallback
- **Restaurants**: Yelp API when key set; mock fallback
- **Direct /itinerary access**: Page expects data from sessionStorage; visiting directly may redirect or show empty state

### Design Decisions
- **Colors**: Cream white (#FDFBF7), light navy (#1E3A5F), accent gold (#C9A227), accent teal (#2D6A6A)
- **Logo**: Plane flying across a globe (SVG, static)
- **Destination hero**: Carousel of destination images (Eiffel Tower, Great Wall, Alaska, etc.)
- **Form fields**: Hometown (for flight search), activities/interests, budget level

### Potential Issues / Troubleshooting
- **404 on localhost**: If you see 404, run `rm -rf .next && npm run dev` to clear cache
- **"Cannot find module './XXX.js'"**: Same fix—delete `.next` and rebuild
- **Itinerary page errors**: Ensure you navigate from home → fill form → submit; don’t jump directly to /itinerary

### Key Files
- `src/app/page.tsx` — Home page + trip request form
- `src/app/itinerary/page.tsx` — Itinerary view + booking flow
- `src/lib/itinerary-generator.ts` — Orchestrates flight/hotel/restaurant search and builds itinerary
- `src/lib/flight-search.ts` — Amadeus API + mock fallback
- `src/lib/hotel-search.ts` — Amadeus Hotel API + mock fallback
- `src/lib/restaurant-search.ts` — Yelp API + mock fallback
- `src/lib/regional-tours.ts` — Regional tour logic (England, France, Italy, etc.)
- `API_INTEGRATION.md` — Guide for production API setup

### Deployment
- **Vercel**: Connect GitHub repo, deploy. Next.js is auto-detected.
- If repo name collision: use a unique name (e.g., `trajectory-travel-app`)

### Grading Checklist
- [x] Frontend + backend (Next.js API routes)
- [x] Trip planning form with validation
- [x] Itinerary generation with multiple item types
- [x] Real API integration (Amadeus, Yelp) with fallbacks
- [x] Hotel/restaurant recommendations by rating
- [x] Regional tours (England, France, Italy, etc.)
- [x] Budget options (budget/moderate/luxury)
- [x] Clickable links to booking/review sites
- [x] Simulated booking flow with confirmation
