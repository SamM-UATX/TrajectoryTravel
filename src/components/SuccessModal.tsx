'use client';

import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  trajectoryData?: Record<string, unknown>;
}

export default function SuccessModal({ isOpen, onClose, trajectoryData }: SuccessModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-gray/20 overflow-hidden animate-[slideUp_0.3s_ease-out]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-gray hover:bg-slate-gray/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-sage" />
          </div>
          <h2 id="success-title" className="text-2xl font-bold text-ink mb-2">
            Trajectory Submitted
          </h2>
          <p className="text-slate-gray leading-relaxed mb-6">
            Thank you for your submission. A concierge will review your preferences and finalize your booking shortly. You will receive a confirmation email within 24 hours.
          </p>
          <p className="text-sm text-slate-gray/80">
            Reference: <span className="font-mono font-medium text-ink">TRJ-{Date.now().toString(36).toUpperCase()}</span>
          </p>
        </div>

        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-navy text-cream font-semibold rounded-xl hover:bg-navy-dark transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
