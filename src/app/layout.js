import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

export const metadata = {
  metadataBase: new URL('https://www.foreverdreams.in'),
  title: 'Glossix Design | Premium Interior Design & Architecture',
  description:
    'Transform your living spaces with Glossix Design. Expert interior design services, modular kitchens, living rooms, bedrooms, 2BHK/3BHK complete home makeovers, luxury home decor, and architectural planning in Noida, Delhi NCR, and across India.',
  keywords: [
    // Direct interior design keywords
    'interior design', 'interior designer near me', 'best interior designer in Noida', 'modular kitchen design',
    'living room interior', 'bedroom interior', 'home decor', 'Glossix Design', 'luxury interior design',
    'modern interior design', 'home renovation', 'office interior design', 'commercial interior design',
    'turnkey interior contractors', 'space planning', 'custom furniture design', 'wardrobe design',
    
    // Property & Real estate keywords (to capture home buyers searching for interiors)
    'new house design', '2 BHK flat interior', '3 BHK interior design', 'villa interior design',
    'real estate India', 'buy flat in Delhi NCR', 'home loans', 'Vastu shastra for home', 'Vastu compliant homes',
    'property investment', 'luxury apartments', 'smart home automation', 'home improvement', 'house architecture',
    
    // Lifestyle & general high-volume keywords
    'lifestyle', 'luxury living', 'modern home appliances', 'wall painting ideas', 'false ceiling design',
    'wooden flooring', 'home styling tips', 'budget interior design', 'aesthetic room decor', 'trending home designs 2024'
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
    title: 'Glossix Design | Premium Interior Design & Luxury Makeovers',
    description:
      'Crafting timeless interiors that reflect your personality and elevate your lifestyle. Discover bespoke design solutions for your dream home.',
    url: 'https://www.foreverdreams.in',
    siteName: 'Glossix Design',
    images: [
      {
        url: '/logo.png', // The logo
        width: 800,
        height: 600,
        alt: 'Glossix Design',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossix Design | Premium Interior Design',
    description: 'Expert interior design, modular kitchens, and luxury home decor services.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Glossix Design",
    "url": "https://www.foreverdreams.in",
    "description": "Premium Interior Design & Architecture",
    "publisher": {
      "@type": "Organization",
      "name": "Glossix Design"
    },
    "author": {
      "@type": "Organization",
      "name": "Glossix Design"
    },
    "maintainer": {
      "@type": "Person",
      "name": "Anees Chaudhary"
    }
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
