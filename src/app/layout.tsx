import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trajectory Travel | Plan Your Perfect Trip',
  description: 'AI-powered trip planning. We handle flights, hotels, trains, meals & more. Just tell us your dates and destinations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-cream">
        {children}
      </body>
    </html>
  );
}
