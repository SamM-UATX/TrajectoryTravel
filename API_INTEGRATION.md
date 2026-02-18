# API Integration Guide for Trajectory Travel

This guide explains how to integrate real flight, hotel, and booking APIs to make Trajectory Travel production-ready.

## Current State

The app currently uses **simulated data** for:
- **Flights**: Mock flight options based on origin/destination (see `src/lib/flight-search.ts`)
- **Hotels**: Mock hotels with simulated ratings (see `src/lib/hotel-search.ts`)
- **Booking**: Simulated confirmation codes (see `src/app/api/book-trip/route.ts`)

## APIs You'll Need

### 1. Flight Search API

**Recommended: Amadeus API** (free tier available)
- Sign up: https://developers.amadeus.com/
- Free tier: 2,000 API calls/month
- Endpoints: Flight Offers Search, Flight Create Orders (for booking)

**Setup:**
```bash
# Add to .env.local
AMADEUS_API_KEY=your_api_key
AMADEUS_API_SECRET=your_api_secret
```

**Integration point:** `src/lib/flight-search.ts` – replace `generateFlightOptions()` with Amadeus API calls when env vars are set.

**Alternative APIs:**
- **Skyscanner** (RapidAPI): https://rapidapi.com/skyscanner/api/skyscanner-flight-search
- **Kiwi/Tequila**: https://tequila.kiwi.com/portal/docs/tequila_api/

---

### 2. Hotel Search API

**Options:**
- **Amadeus Hotel API**: Same Amadeus account, Hotel List, Hotel Booking
- **Booking.com API**: Requires partnership – https://developers.booking.com/
- **Hotels.com API**: Via Expedia Partner Solutions

**For hotel reviews/ratings:**
- **TripAdvisor API**: Content API for reviews (requires partnership)
- **Google Places API**: For ratings and reviews – https://developers.google.com/maps/documentation/places
- **Facebook Graph API**: Limited for business pages; not ideal for hotel reviews

**Integration point:** `src/lib/hotel-search.ts` – replace mock data with API calls.

---

### 3. Payment Processing

**Recommended: Stripe**
- https://stripe.com/docs/api
- Handles cards, Apple Pay, etc.
- Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` to `.env.local`

**Integration point:** `src/app/api/book-trip/route.ts` – add Stripe payment intent before confirming bookings.

---

### 4. Email Confirmation

**Options:**
- **Resend**: https://resend.com/
- **SendGrid**: https://sendgrid.com/
- **Postmark**: https://postmarkapp.com/

**Integration point:** After successful booking in `book-trip/route.ts`, send confirmation email to `itinerary.tripRequest.email`.

---

## Quick Start: Amadeus Flights

1. Create an Amadeus developer account
2. Create an application to get API key and secret
3. Add to `.env.local`:
   ```
   AMADEUS_API_KEY=xxx
   AMADEUS_API_SECRET=xxx
   ```
4. In `src/lib/flight-search.ts`, uncomment and implement the Amadeus API block
5. You'll need a token endpoint – Amadeus provides OAuth; use their Node SDK or fetch:
   ```typescript
   const tokenRes = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: `grant_type=client_credentials&client_id=${key}&client_secret=${secret}`,
   });
   const { access_token } = await tokenRes.json();
   ```

---

## Environment Variables Summary

```env
# Flights (Amadeus)
AMADEUS_API_KEY=
AMADEUS_API_SECRET=

# Hotels (when integrated)
# BOOKING_API_KEY=  or  AMADEUS_API_KEY (same as above)

# Payments (Stripe)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email (Resend example)
RESEND_API_KEY=
```

---

## Need Help?

- Amadeus docs: https://developers.amadeus.com/self-service
- Stripe docs: https://stripe.com/docs
- For production, ensure PCI compliance when handling payment data (use Stripe Elements or similar).
