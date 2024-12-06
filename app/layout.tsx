import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PaletteGPT | Create Beautiful Color Combinations',
  description: 'Create stunning color palettes using artificial intelligence. Perfect for designers, developers, and creatives. Generate harmonious color combinations instantly.',
  keywords: [
    'color palette generator',
    'AI color tool',
    'color harmony',
    'design tools',
    'color schemes',
    'color combinations',
    'web design colors',
    'brand colors',
    'color picker',
    'color inspiration'
  ],
  authors: [{ name: 'PaletteGPT Team' }],
  openGraph: {
    title: 'PaletteGPT | Create Beautiful Color Combinations',
    description: 'Create stunning color palettes using artificial intelligence. Perfect for designers, developers, and creatives.',
    type: 'website',
    url: 'https://yourwebsite.com',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PaletteGPT'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaletteGPT',
    description: 'Create stunning color palettes using artificial intelligence',
    images: ['https://yourwebsite.com/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
};

// Add this JSON-LD script to the head
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PaletteGPT",
  "description": "Create stunning color palettes using artificial intelligence",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "PaletteGPT Team"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}