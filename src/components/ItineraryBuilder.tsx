'use client';

import { useState } from 'react';
import { Gauge, Compass, Plane, Hotel, Check } from 'lucide-react';

export type VelocityLevel = 'slow' | 'moderate' | 'high';
export type FocusType = 'exotic' | 'historic' | 'scenic';

export interface ItineraryBuilderState {
  velocity: VelocityLevel;
  focus: FocusType;
  requestFlightBooking: boolean;
  requestHotelBooking: boolean;
}

const VELOCITY_OPTIONS: { value: VelocityLevel; label: string; desc: string }[] = [
  { value: 'slow', label: 'Slow & Relaxing', desc: 'Leisurely pace, ample rest' },
  { value: 'moderate', label: 'Moderate', desc: 'Balanced exploration' },
  { value: 'high', label: 'High & Adventurous', desc: 'Packed days, maximum discovery' },
];

const FOCUS_OPTIONS: { value: FocusType; label: string }[] = [
  { value: 'exotic', label: 'Exotic' },
  { value: 'historic', label: 'Historic' },
  { value: 'scenic', label: 'Scenic' },
];

interface ItineraryBuilderProps {
  onSubmit: (data: ItineraryBuilderState) => void;
  isLoading?: boolean;
}

export default function ItineraryBuilder({ onSubmit, isLoading = false }: ItineraryBuilderProps) {
  const [velocity, setVelocity] = useState<VelocityLevel>('moderate');
  const [focus, setFocus] = useState<FocusType>('scenic');
  const [requestFlightBooking, setRequestFlightBooking] = useState(false);
  const [requestHotelBooking, setRequestHotelBooking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      velocity,
      focus,
      requestFlightBooking,
      requestHotelBooking,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Velocity - Vibe Slider */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <Gauge className="w-5 h-5 text-sage" /> Velocity
        </label>
        <p className="text-slate-gray text-sm mb-4">Pace of travel: from Slow & Relaxing to High & Adventurous</p>
        <div className="flex gap-3">
          {VELOCITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setVelocity(opt.value)}
              className={`flex-1 py-4 px-4 rounded-xl border-2 transition-all text-left ${
                velocity === opt.value
                  ? 'border-sage bg-sage/10 text-sage-dark'
                  : 'border-slate-gray/30 text-slate-gray hover:border-sage/50'
              }`}
            >
              <span className="font-medium block">{opt.label}</span>
              <span className="text-xs mt-0.5 opacity-80">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Focus */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">
          <Compass className="w-5 h-5 text-sage" /> Focus
        </label>
        <div className="flex gap-3">
          {FOCUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFocus(opt.value)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium capitalize transition-all ${
                focus === opt.value ? 'bg-navy text-cream' : 'bg-white border-2 border-slate-gray/30 text-slate-gray hover:border-navy/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink mb-4">Add-ons</label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-gray/20 hover:border-sage/40 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={requestFlightBooking}
              onChange={(e) => setRequestFlightBooking(e.target.checked)}
              className="w-5 h-5 rounded border-slate-gray text-sage focus:ring-sage"
            />
            <Plane className="w-5 h-5 text-sage" />
            <span className="font-medium text-ink">Request Flight Booking</span>
          </label>
          <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-gray/20 hover:border-sage/40 cursor-pointer transition-all">
            <input
              type="checkbox"
              checked={requestHotelBooking}
              onChange={(e) => setRequestHotelBooking(e.target.checked)}
              className="w-5 h-5 rounded border-slate-gray text-sage focus:ring-sage"
            />
            <Hotel className="w-5 h-5 text-sage" />
            <span className="font-medium text-ink">Request Hotel Booking</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 bg-navy text-cream font-bold rounded-xl hover:bg-navy-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-navy/20"
      >
        {isLoading ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          <>
            <Check className="w-5 h-5" /> Submit Trajectory
          </>
        )}
      </button>
    </form>
  );
}
