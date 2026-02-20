'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#scenic', label: 'Scenic' },
  { href: '/#historic', label: 'Historic' },
  { href: '/#exotic', label: 'Exotic' },
  { href: '/#custom-trip', label: 'Custom Trip' },
  { href: '/#contact', label: 'Contact', accent: true },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-gray/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Arc logo - thin sweeping line ending in solid plane, palm trees & island */}
        <Link href="/" className="flex items-center group">
          <svg viewBox="0 0 140 50" className="h-11 w-28 text-sage-dark">
            {/* Island silhouette (background) */}
            <path d="M 0 50 L 0 44 Q 20 38 45 44 Q 70 36 90 44 L 100 50 Z" fill="currentColor" opacity="0.2" />
            {/* Palm trees (subtle) */}
            <g opacity="0.5" stroke="currentColor" strokeWidth="1" fill="none">
              <path d="M 12 46 L 12 34 Q 12 26 18 24" strokeLinecap="round" />
              <ellipse cx="18" cy="22" rx="3" ry="1.5" fill="currentColor" />
              <path d="M 22 44 L 22 32 Q 22 24 28 22" strokeLinecap="round" />
              <ellipse cx="28" cy="20" rx="3" ry="1.5" fill="currentColor" />
            </g>
            {/* Arc: starts thin, sweeps up */}
            <path
              d="M 40 46 Q 85 12 125 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-sage"
            />
            {/* Solid plane at arc end */}
            <g transform="translate(115, 34) rotate(-12)">
              <path d="M 0 7 L 16 7 L 18 5 L 20 7 L 18 9 L 16 7" fill="currentColor" className="text-sage-dark" />
              <path d="M 5 7 L 7 3 L 9 7 Z" fill="currentColor" className="text-sage-dark" />
              <path d="M 11 7 L 9 11 L 13 11 Z" fill="currentColor" className="text-sage" opacity="0.9" />
            </g>
          </svg>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-sage-dark ${
                item.accent ? 'font-serif italic text-ocean-breeze' : 'text-slate-gray'
              } ${pathname === item.href ? 'text-sage-dark' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Trajectory Travel */}
        <Link href="/" className="font-bold text-lg text-sage-dark tracking-tight">
          Trajectory Travel
        </Link>
      </nav>

      {/* Mobile menu - simplified */}
      <div className="md:hidden px-6 pb-3 flex flex-wrap gap-3">
        {navItems.slice(0, 4).map((item) => (
          <Link key={item.href} href={item.href} className="text-xs text-slate-gray hover:text-sage-dark">
            {item.label}
          </Link>
        ))}
        <Link href="/#custom-trip" className="text-xs text-slate-gray hover:text-sage-dark">Custom Trip</Link>
        <Link href="/#contact" className="text-xs font-serif italic text-ocean-breeze">Contact</Link>
      </div>
    </header>
  );
}
