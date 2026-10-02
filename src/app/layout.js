import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

export const metadata = {
  metadataBase: new URL('https://www.glossixdesign.in'),
  alternates: {
    canonical: '/',
  },
  title: 'Best Interior Designer in Noida, Delhi NCR, Gurugram & UP West | Glossix Design',
  description: 'Glossix Design is the best interior designer & decorator in Noida, Delhi NCR, Greater Noida, Gurugram, Ghaziabad, Faridabad, Meerut, Agra, Aligarh, Mathura & UP West. We offer luxury 2BHK/3BHK/4BHK home interiors, turnkey office designs, modular kitchens, and 3D architectural visualization. Book a free consultation today!',
  keywords: [
    'Glossix Design', 'Glossix Designs', 'Glossix Interior Design', 'Glossix Interior', 'Interior Designer Glossix',
    'Best interior designer in Noida', 'Top interior design company Delhi NCR', 'Luxury interior designer UP West',
    'Turnkey interior contractors Noida', 'Modular kitchen designers Delhi', '2BHK 3BHK interior cost Noida',
    'Office interior design Delhi NCR', 'Best architects in Noida', 'Home renovation services Delhi',
    'Affordable interior designers near me', 'Vastu compliant interior design',
    'Interior designers in Greater Noida', 'Interior designers in Ghaziabad', 'Interior designers in Meerut',
    'interior design UP West', 'best interior decorators Delhi NCR', 'top 10 interior designers Noida',
    'Interior designer in Gurgaon', 'Interior designer in Gurugram', 'Interior designer in Faridabad',
    'Interior designer in Hapur', 'Interior designer in Bulandshahr', 'Interior designer in Aligarh',
    'Interior designer in Mathura', 'Interior designer in Agra', 'Interior designer in Muzaffarnagar',
    'Interior designer in Saharanpur', 'Interior designer in Roorkee', 'Interior designer in Dehradun',
    'Best interior designer in Western UP', 'Commercial interior designer Delhi', 'Top interior decorators Noida Extension'
  ],
  authors: [{ name: 'Glossix Design' }],
  creator: 'Glossix Design',
  publisher: 'Glossix Design',
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
    title: 'Top Interior Designer in Delhi NCR, Noida & UP West | Glossix Design',
    description: 'Transform your home with Glossix Design. We specialize in bespoke residential and commercial interiors across Delhi, Noida, Gurgaon, Ghaziabad, Meerut, Agra, Aligarh & all of UP West.',
    url: 'https://www.glossixdesign.in',
    siteName: 'Glossix Design',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Glossix Design - Best Interior Decorator in NCR & UP West',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Interior Designer in Delhi NCR & UP West | Glossix Design',
    description: 'Luxury residential and commercial interior design in Noida, Delhi, Gurugram, Ghaziabad, Meerut & UP West.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeAndConstructionBusiness",
        "name": "Glossix Design",
        "image": "https://www.glossixdesign.in/logo.png",
        "@id": "https://www.glossixdesign.in",
        "url": "https://www.glossixdesign.in",
        "telephone": "+919540005981",
        "email": "info@glossixdesigns.in",
        "priceRange": "INR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Greater Noida",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201308",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.4744,
          "longitude": 77.5040
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        "areaServed": [
          { "@type": "City", "name": "Noida" },
          { "@type": "City", "name": "Greater Noida" },
          { "@type": "City", "name": "Noida Extension" },
          { "@type": "City", "name": "Delhi" },
          { "@type": "City", "name": "New Delhi" },
          { "@type": "City", "name": "Gurugram" },
          { "@type": "City", "name": "Gurgaon" },
          { "@type": "City", "name": "Ghaziabad" },
          { "@type": "City", "name": "Faridabad" },
          { "@type": "City", "name": "Meerut" },
          { "@type": "City", "name": "Hapur" },
          { "@type": "City", "name": "Bulandshahr" },
          { "@type": "City", "name": "Aligarh" },
          { "@type": "City", "name": "Mathura" },
          { "@type": "City", "name": "Agra" },
          { "@type": "City", "name": "Muzaffarnagar" },
          { "@type": "City", "name": "Saharanpur" },
          { "@type": "State", "name": "Uttar Pradesh West" },
          { "@type": "State", "name": "Delhi NCR" }
        ],
        "sameAs": [
          "https://www.instagram.com/glossixdesign",
          "https://www.facebook.com/glossixdesign",
          "https://www.youtube.com/@glossixdesign",
          "https://in.pinterest.com/glossixdesign/",
          "https://twitter.com/glossixdesign"
        ],
        "description": "Glossix Design is the top-rated interior design firm serving residential and commercial clients across Noida, Delhi NCR, and Western Uttar Pradesh."
      },
      {
        "@type": "WebSite",
        "name": "Glossix Design",
        "url": "https://www.glossixdesign.in",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.glossixdesign.in/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
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
