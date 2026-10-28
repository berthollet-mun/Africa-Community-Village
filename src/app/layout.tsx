import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Africa Community Village',
    template: '%s | Africa Community Village'
  },
  description:
    'Africa Community Village accompagne les communautés de l’Est de la République démocratique du Congo.',
  icons: {
    icon: '/assets/brand/acv-logo.jpeg',
    apple: '/assets/brand/acv-logo.jpeg'
  },
  openGraph: {
    title: 'Africa Community Village',
    description: 'Une initiative communautaire portée par la jeunesse dans l’Est de la RDC.',
    images: [{ url: '/assets/brand/acv-logo.jpeg', width: 1254, height: 1254, alt: 'Logo officiel ACV' }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
