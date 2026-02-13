'use client';

import { ItineraryItem } from '@/types/trip';
import { Plane, Hotel, Train, Car, Utensils, MapPin, Bus, Sparkles } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  flight: Plane,
  hotel: Hotel,
  train: Train,
  car_rental: Car,
  meal: Utensils,
  activity: MapPin,
  transfer: Bus,
  recommendation: Sparkles,
};

const typeColors: Record<string, string> = {
  flight: 'bg-white border-sky-blue/40',
  hotel: 'bg-white border-sky-blue/30',
  train: 'bg-white border-sky-blue/30',
  car_rental: 'bg-white border-sky-blue/30',
  meal: 'bg-white border-sky-blue/30',
  activity: 'bg-white border-sky-blue/30',
  transfer: 'bg-white border-cloud-gray-dark',
  recommendation: 'bg-white border-sky-blue/30',
};

interface ItineraryItemCardProps {
  item: ItineraryItem;
  onEdit?: (item: ItineraryItem) => void;
  onRemove?: (item: ItineraryItem) => void;
  isEditing?: boolean;
}

export default function ItineraryItemCard({ item, onEdit, onRemove, isEditing }: ItineraryItemCardProps) {
  const Icon = typeIcons[item.type] || MapPin;
  const colorClass = typeColors[item.type] || 'bg-white border-cloud-gray-dark';

  return (
    <div
      className={`group relative p-4 rounded-xl ${colorClass} border shadow-sm transition-all hover:shadow-md hover:scale-[1.01]`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-blue/15 flex items-center justify-center">
          <Icon className="w-5 h-5 text-sky-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-ink">{item.title}</h4>
              <p className="text-sm text-ink/70 mt-0.5">{item.description}</p>
              {(item.time || item.duration) && (
                <div className="flex gap-3 mt-2 text-xs text-ink/60">
                  {item.time && <span>{item.time}</span>}
                  {item.duration && <span>• {item.duration}</span>}
                  {item.location && <span>• {item.location}</span>}
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-bold text-sky-blue">
                ${item.price.toLocaleString()}
              </span>
              {item.confirmationCode && (
                <p className="text-xs text-emerald-600 mt-1">#{item.confirmationCode}</p>
              )}
            </div>
          </div>
        </div>
        {isEditing && item.editable && (onEdit || onRemove) && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-2 rounded-lg bg-sky-blue/20 hover:bg-sky-blue/30 text-sky-blue text-sm"
              >
                Edit
              </button>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(item)}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
