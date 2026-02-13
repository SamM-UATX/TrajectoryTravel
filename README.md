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
