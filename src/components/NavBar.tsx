'use client';

import { useLayoutEffect, useState } from 'react';
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

  // Sync hash on mount and on hashchange; useLayoutEffect avoids flash of wrong active state
  useLayoutEffect(() => {
    setHash(typeof window !== 'undefined' ? window.location.hash.slice(1) : '');
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isActive = (item: (typeof navItems)[0]) => {
    // Hash links: compare pathname + hash separately (usePathname() omits hash)
    if (item.href.startsWith('/#')) return pathname === '/' && item.hash === hash;
    // Home link: only active when at top of home page (no hash or hash === 'home')
    if (item.href === '/' && pathname === '/') return !hash || hash === 'home';
    return pathname === item.href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-gray/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Arc thin→thick, blue & light gray globe with gold jet in center */}
        <Link href="/" className="flex items-center group">
          <svg viewBox="0 0 100 50" className="h-11 w-24">
            {/* Globe arc: thin at top-left, grows thicker clockwise; blue and light gray */}
            <path d="M 28 8 A 22 22 0 0 1 72 8" fill="none" stroke="#1E3A5F" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 72 8 A 22 22 0 0 1 85 25" fill="none" stroke="#1E3A5F" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 85 25 A 22 22 0 0 1 72 42" fill="none" stroke="#E8E4DE" strokeWidth="4" strokeLinecap="round" />
            <path d="M 72 42 A 22 22 0 0 1 28 42" fill="none" stroke="#E8E4DE" strokeWidth="5" strokeLinecap="round" />
            <path d="M 28 42 A 22 22 0 0 1 15 25" fill="none" stroke="#1E3A5F" strokeWidth="3" strokeLinecap="round" />
            <path d="M 15 25 A 22 22 0 0 1 28 8" fill="none" stroke="#1E3A5F" strokeWidth="2" strokeLinecap="round" />
            {/* Gold jet - large, prominent centerpiece */}
            <g transform="translate(32, 6) scale(1.4)">
              <path d="M 0 18 L 30 18 L 35 13 L 40 18 L 35 23 L 30 18" fill="#C9A227" stroke="#A68520" strokeWidth="1.2" />
              <path d="M 12 18 L 16 6 L 20 18 Z" fill="#D4B030" stroke="#C9A227" strokeWidth="0.8" />
              <path d="M 26 18 L 22 28 L 30 28 Z" fill="#D4B030" stroke="#C9A227" strokeWidth="0.8" />
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
