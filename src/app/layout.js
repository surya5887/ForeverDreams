import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

export const metadata = {
  title: 'Forever Dreams Home | Premium Interior Design & Architecture',
  description:
    'Transform your living spaces with Forever Dreams Home. Expert interior design services, modular kitchens, living rooms, bedrooms, 2BHK/3BHK complete home makeovers, luxury home decor, and architectural planning in Noida, Delhi NCR, and across India.',
  keywords: [
    // Direct interior design keywords
    'interior design', 'interior designer near me', 'best interior designer in Noida', 'modular kitchen design',
    'living room interior', 'bedroom interior', 'home decor', 'Forever Dreams Home', 'luxury interior design',
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
  authors: [{ name: 'Forever Dreams Home' }],
  creator: 'Forever Dreams Home',
  publisher: 'Forever Dreams Home',
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
  openGraph: {
    title: 'Forever Dreams Home | Premium Interior Design & Luxury Makeovers',
    description:
      'Crafting timeless interiors that reflect your personality and elevate your lifestyle. Discover bespoke design solutions for your dream home.',
    url: 'https://foreverdreams.in',
    siteName: 'Forever Dreams Home',
    images: [
      {
        url: 'https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783333182/forever_dreams/home/iicu6f0ktc53dkqjzftz.jpg', // The logo
        width: 800,
        height: 600,
        alt: 'Forever Dreams Home Interior Design',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Dreams Home | Premium Interior Design',
    description: 'Expert interior design, modular kitchens, and luxury home decor services.',
    images: ['https://res.cloudinary.com/waqkndtu/image/upload/f_auto,q_auto/v1783333182/forever_dreams/home/iicu6f0ktc53dkqjzftz.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
