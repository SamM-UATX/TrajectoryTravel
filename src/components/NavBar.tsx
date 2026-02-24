'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', hash: 'home' },
  { href: '/scenic', label: 'Scenic', hash: 'scenic' },
  { href: '/historic', label: 'Historic', hash: 'historic' },
  { href: '/exotic', label: 'Exotic', hash: 'exotic' },
  { href: '/#custom-trip', label: 'Custom Trip', hash: 'custom-trip' },
  { href: '/#contact', label: 'Contact', hash: 'contact', accent: true },
];

export default function NavBar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(typeof window !== 'undefined' ? window.location.hash.slice(1) : '');
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.href.startsWith('/#')) return pathname === '/' && item.hash === hash;
    return pathname === item.href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-gray/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Blue arc, light gray, gold plane, globe */}
        <Link href="/" className="flex items-center group">
          <svg viewBox="0 0 140 50" className="h-11 w-28">
            {/* Globe - light gray circle with latitude lines */}
            <circle cx="32" cy="25" r="18" fill="#E8E4DE" stroke="#D4CFC6" strokeWidth="1.5" />
            <ellipse cx="32" cy="25" rx="18" ry="4" fill="none" stroke="#D4CFC6" strokeWidth="1" opacity="0.6" />
            <ellipse cx="32" cy="25" rx="4" ry="18" fill="none" stroke="#D4CFC6" strokeWidth="1" opacity="0.6" />
            {/* Blue arc - sweeps from globe to plane */}
            <path
              d="M 50 38 Q 95 8 125 32"
              fill="none"
              stroke="#1E3A5F"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Gold plane at arc end */}
            <g transform="translate(115, 26) rotate(-15)">
              <path d="M 0 7 L 16 7 L 18 5 L 20 7 L 18 9 L 16 7" fill="#C9A227" stroke="#A68520" strokeWidth="0.5" />
              <path d="M 5 7 L 7 3 L 9 7 Z" fill="#C9A227" stroke="#A68520" strokeWidth="0.5" />
              <path d="M 11 7 L 9 11 L 13 11 Z" fill="#D4B030" stroke="#C9A227" strokeWidth="0.5" />
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
              } ${isActive(item) ? 'text-sage-dark' : ''}`}
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`text-xs hover:text-sage-dark ${item.accent ? 'font-serif italic text-ocean-breeze' : 'text-slate-gray'}`}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
