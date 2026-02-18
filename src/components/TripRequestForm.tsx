'use client';

import { useState } from 'react';
import { Plane, MapPin, Calendar, Wallet, Users, Home, Sparkles } from 'lucide-react';

interface TripRequestFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading?: boolean;
}

export interface TripFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  hometown: string;
  departureDate: string;
  returnDate: string;
  destinations: string;
  activities: string;
  budgetLevel: 'budget' | 'moderate' | 'luxury';
  travelers: number;
  notes: string;
}

export default function TripRequestForm({ onSubmit, isLoading }: TripRequestFormProps) {
  const [formData, setFormData] = useState<TripFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    hometown: '',
    departureDate: '',
    returnDate: '',
    destinations: '',
    activities: '',
    budgetLevel: 'moderate',
    travelers: 1,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">First Name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Last Name *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
          <Home className="w-4 h-4 text-navy" /> Departing From (Your Hometown) *</label>
        <input
          type="text"
          required
          value={formData.hometown}
          onChange={e => setFormData({ ...formData, hometown: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
          placeholder="e.g. New York, Los Angeles, London"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-navy" /> Departure Date *</label>
          <input
            type="date"
            required
            value={formData.departureDate}
            onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink focus:ring-2 focus:ring-navy/30 focus:border-navy"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-navy" /> Return Date *</label>
          <input
            type="date"
            required
            value={formData.returnDate}
            onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink focus:ring-2 focus:ring-navy/30 focus:border-navy"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-navy" /> Destinations *</label>
        <input
          type="text"
          required
          value={formData.destinations}
          onChange={e => setFormData({ ...formData, destinations: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
          placeholder="Paris, Rome, Barcelona (comma-separated)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-navy" /> What do you want to do?</label>
        <input
          type="text"
          value={formData.activities}
          onChange={e => setFormData({ ...formData, activities: e.target.value })}
          className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy"
          placeholder="e.g. sightseeing, food tours, hiking, museums, nightlife"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-navy" /> Experience Level *</label>
          <div className="flex gap-3">
            {(['budget', 'moderate', 'luxury'] as const).map(level => (
              <button
                key={level}
                type="button"
                onClick={() => setFormData({ ...formData, budgetLevel: level })}
                className={`flex-1 py-3 px-4 rounded-xl font-medium capitalize transition-all ${
                  formData.budgetLevel === level
                    ? 'bg-navy text-cream'
                    : 'bg-white border border-cloud-gray-dark text-ink hover:border-navy'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-navy" /> Travelers</label>
          <input
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            value={formData.travelers}
            onChange={e => {
              const v = e.target.value;
              if (v === '') return setFormData({ ...formData, travelers: 1 });
              const n = parseInt(v, 10);
              if (!isNaN(n) && n >= 1 && n <= 20) setFormData({ ...formData, travelers: n });
            }}
            className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink focus:ring-2 focus:ring-navy/30 focus:border-navy [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-2">Additional Notes</label>
        <textarea
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-white border border-cloud-gray-dark rounded-xl text-ink placeholder-ink/40 focus:ring-2 focus:ring-navy/30 focus:border-navy resize-none"
          placeholder="Dietary restrictions, accessibility needs, special requests..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 bg-navy text-cream font-bold rounded-xl hover:bg-navy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="animate-spin">⏳</span> Creating Your Itinerary...
          </>
        ) : (
          <>
            <Plane className="w-5 h-5" /> Plan My Trip
          </>
        )}
      </button>
    </form>
  );
}
