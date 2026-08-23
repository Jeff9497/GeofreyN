import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Geofrey Njoroge Kamau | Computer Scientist & AI Researcher',
  description:
    'CS graduate from Nairobi, Kenya. Building mechanistic interpretability tools, AI agents with long-term memory, and algorithmic trading systems.',
  keywords: [
    'mechanistic interpretability',
    'AI research',
    'Next.js',
    'Python',
    'Nairobi',
    'Kenya',
    'TransformerLens',
    'algorithmic trading',
    'MQL5',
  ],
  authors: [{ name: 'Geofrey Njoroge Kamau', url: 'https://geofreynjoroge.com' }],
  openGraph: {
    title: 'Geofrey Njoroge Kamau — Computer Scientist & AI Researcher',
    description:
      'I study what AI systems actually know versus what they claim to know, and build systems that behave honestly under uncertainty.',
    url: 'https://geofreynjoroge.com',
    siteName: 'Geofrey Njoroge Kamau',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geofrey Njoroge Kamau',
    description: 'Computer Scientist & AI Researcher — Nairobi, Kenya',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
