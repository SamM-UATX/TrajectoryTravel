'use client';

import { useState } from 'react';
import { Itinerary, DayPlan, ItineraryItem } from '@/types/trip';
import { format, parseISO } from 'date-fns';
import ItineraryItemCard from './ItineraryItemCard';
import { ChevronDown, ChevronUp, Edit2, Check } from 'lucide-react';

interface ItineraryViewProps {
  itinerary: Itinerary;
  onItineraryChange?: (itinerary: Itinerary) => void;
  onApprove?: () => void;
  isBooked?: boolean;
}

export default function ItineraryView({ itinerary, onItineraryChange, onApprove, isBooked }: ItineraryViewProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(dayNum)) next.delete(dayNum);
      else next.add(dayNum);
      return next;
    });
  };

  const updateItem = (day: DayPlan, itemId: string, updates: Partial<ItineraryItem>) => {
    if (!onItineraryChange) return;
    const newDays = itinerary.days.map(d => {
      if (d.date !== day.date) return d;
      return {
        ...d,
        items: d.items.map(i => (i.id === itemId ? { ...i, ...updates } : i)),
      };
    });
    const newTotal = newDays.flatMap(d => d.items).reduce((sum, i) => sum + i.price, 0);
    onItineraryChange({ ...itinerary, days: newDays, totalPrice: newTotal });
    setEditingItem(null);
  };

  const removeItem = (day: DayPlan, itemId: string) => {
    if (!onItineraryChange) return;
    const newDays = itinerary.days.map(d => {
      if (d.date !== day.date) return d;
      return {
        ...d,
        items: d.items.filter(i => i.id !== itemId),
      };
    });
    const newTotal = newDays.flatMap(d => d.items).reduce((sum, i) => sum + i.price, 0);
    onItineraryChange({ ...itinerary, days: newDays, totalPrice: newTotal });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-ink">
            {itinerary.tripRequest.destinations.join(' → ')}
          </h2>
          <p className="text-ink/70 mt-1">
            {format(parseISO(itinerary.tripRequest.departureDate), 'MMM d, yyyy')} –{' '}
            {format(parseISO(itinerary.tripRequest.returnDate), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-ink/70">Total</p>
            <p className="text-2xl font-bold text-sky-blue">
              ${itinerary.totalPrice.toLocaleString()} {itinerary.currency}
            </p>
          </div>
          {!isBooked && onItineraryChange && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                isEditing ? 'bg-sky-blue text-white' : 'bg-cloud-gray text-ink hover:bg-cloud-gray-dark border border-cloud-gray-dark'
              }`}
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Done Editing' : 'Edit'}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {itinerary.days.map(day => {
          const isExpanded = expandedDays.has(day.dayNumber);
          return (
            <div
              key={day.date}
              className="rounded-2xl bg-cloud-gray border border-cloud-gray-dark overflow-hidden"
            >
              <button
                onClick={() => toggleDay(day.dayNumber)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-cloud-gray-dark/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-blue/20 text-sky-blue font-bold flex items-center justify-center">
                    {day.dayNumber}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">
                      {format(parseISO(day.date), 'EEEE, MMMM d')}
                    </h3>
                    <p className="text-sm text-ink/70">{day.location}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-sky-blue" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-sky-blue" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {day.items.map(item => (
                    <ItineraryItemCard
                      key={item.id}
                      item={item}
                      isEditing={isEditing}
                      onEdit={item.editable ? () => setEditingItem(item) : undefined}
                      onRemove={item.editable ? () => removeItem(day, item.id) : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isBooked && onApprove && (
        <div className="pt-6 border-t border-cloud-gray">
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full py-4 px-6 bg-sky-blue text-white font-bold rounded-xl hover:bg-sky-blue-dark transition-all"
          >
            Approve & Book Everything
          </button>
          <p className="text-center text-sm text-ink/60 mt-3">
            We&apos;ll book flights, hotels, and more using your email and payment info
          </p>
        </div>
      )}

      {showPaymentModal && (
        <PaymentModal
          total={itinerary.totalPrice}
          email={itinerary.tripRequest.email}
          onConfirm={() => {
            setShowPaymentModal(false);
            onApprove?.();
          }}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={updates => {
            const day = itinerary.days.find(d => d.items.some(i => i.id === editingItem.id));
            if (day) updateItem(day, editingItem.id, updates);
          }}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

function PaymentModal({
  total,
  email,
  onConfirm,
  onCancel,
}: {
  total: number;
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
    return v.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) return v.slice(0, 2) + '/' + v.slice(2);
    return v;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-cloud-gray rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold text-ink mb-2">Payment & Booking</h3>
        <p className="text-ink/70 text-sm mb-4">
          Confirmation will be sent to <span className="text-sky-blue font-semibold">{email}</span>
        </p>
        <p className="text-2xl font-bold text-sky-blue mb-6">${total.toLocaleString()}</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1">Card number</label>
            <input
              value={cardNumber}
              onChange={e => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink placeholder-ink/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-ink mb-1">Expiry</label>
              <input
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/YY"
                className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink placeholder-ink/40"
              />
            </div>
            <div>
              <label className="block text-sm text-ink mb-1">CVC</label>
              <input
                value={cvc}
                onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink placeholder-ink/40"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-ink mb-1">Name on card</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink placeholder-ink/40"
            />
          </div>
        </div>
        <p className="text-xs text-ink/50 mt-4">
          Demo: Any card details work. No real charges.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 py-2 rounded-xl bg-cloud-gray text-ink hover:bg-cloud-gray-dark border border-cloud-gray-dark">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-sky-blue text-white font-semibold hover:bg-sky-blue-dark"
          >
            Confirm & Book
          </button>
        </div>
      </div>
    </div>
  );
}

function EditItemModal({
  item,
  onSave,
  onClose,
}: {
  item: ItineraryItem;
  onSave: (updates: Partial<ItineraryItem>) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [time, setTime] = useState(item.time || '');
  const [price, setPrice] = useState(item.price.toString());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white border border-cloud-gray rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-xl font-bold text-ink mb-4">Edit Item</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-ink mb-1">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink"
            />
          </div>
          <div>
            <label className="block text-sm text-ink mb-1">Description</label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink"
            />
          </div>
          {item.time !== undefined && (
            <div>
              <label className="block text-sm text-ink mb-1">Time</label>
              <input
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink"
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-ink mb-1">Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-4 py-2 bg-cloud-gray border border-cloud-gray-dark rounded-lg text-ink"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl bg-cloud-gray text-ink hover:bg-cloud-gray-dark border border-cloud-gray-dark"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                title,
                description,
                time: time || undefined,
                price: parseInt(price, 10) || 0,
              })
            }
            className="flex-1 py-2 rounded-xl bg-sky-blue text-white font-semibold hover:bg-sky-blue-dark"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
