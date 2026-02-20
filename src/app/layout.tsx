import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trajectory Travel | Plan Your Perfect Trip',
  description: 'AI-powered trip planning. Spectacular scenic, historic, and exotic journeys. Custom trips tailored to you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-cream font-sans">
        {children}
      </body>
    </html>
  );
}
