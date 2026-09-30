import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

export const metadata = {
  metadataBase: new URL('https://www.foreverdreams.in'),
  title: 'Best Interior Designer in Noida & Delhi NCR | Glossix Design',
  description: 'Looking for the best interior designer in Noida, Delhi NCR, or UP West? Glossix Design offers luxury 2BHK/3BHK home interiors, turnkey office designs, and modular kitchens. Book a free consultation!',
  keywords: [
    'Best interior designer in Noida', 'Top interior design company Delhi NCR', 'Luxury interior designer UP West',
    'Turnkey interior contractors Noida', 'Modular kitchen designers Delhi', '2BHK 3BHK interior cost Noida',
    'Office interior design Delhi NCR', 'Best architects in Noida', 'Home renovation services Delhi',
    'Glossix Design Noida', 'Affordable interior designers near me', 'Vastu compliant interior design',
    'Interior designers in Greater Noida', 'Interior designers in Ghaziabad', 'Interior designers in Meerut',
    'interior design UP West', 'best interior decorators Delhi NCR', 'top 10 interior designers Noida'
  ],
  authors: [{ name: 'Glossix Design' }],
  creator: 'Glossix Design',
  publisher: 'Glossix Design',
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
    google: 'iIZddNWnvrjEKW1OT1Xs3TjW8ATAlr9opXAjW191qGw',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Top Interior Designer in Delhi NCR & Noida | Glossix Design',
    description: 'Transform your home with Glossix Design. We specialize in bespoke residential and commercial interiors across Delhi, Noida, and UP West.',
    url: 'https://www.foreverdreams.in',
    siteName: 'Glossix Design',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Glossix Design - Best Interior Decorator in NCR',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Interior Designer in Delhi NCR | Glossix Design',
    description: 'Luxury residential and commercial interior design in Noida, Delhi, and UP West.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Glossix Design",
        "image": "https://www.foreverdreams.in/logo.png",
        "@id": "https://www.foreverdreams.in",
        "url": "https://www.foreverdreams.in",
        "telephone": "+919540005981",
        "priceRange": "???",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Noida, Delhi NCR",
          "addressLocality": "Noida",
          "addressRegion": "UP",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.5355,
          "longitude": 77.3910
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        "areaServed": ["Noida", "Greater Noida", "Delhi", "Gurugram", "Ghaziabad", "Meerut", "Uttar Pradesh West"],
        "sameAs": [
          "https://www.instagram.com/glossixdesign"
        ]
      },
      {
        "@type": "WebSite",
        "name": "Glossix Design",
        "url": "https://www.foreverdreams.in",
        "description": "Best Interior Designer in Noida, Delhi NCR & UP West. Premium 2BHK/3BHK Makeovers, Modular Kitchens, and Commercial Interiors."
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
