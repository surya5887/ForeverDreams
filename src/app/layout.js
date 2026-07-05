import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';

export const metadata = {
  title: 'Forever Dreams Home | Premium Interior Design',
  description:
    'Transform your living spaces with Forever Dreams Home. Expert interior design services including modular kitchens, living rooms, bedrooms, and complete home makeovers in Meerut, UP.',
  keywords:
    'interior design, modular kitchen, living room design, bedroom design, home decor, Meerut, Forever Dreams Home',
  openGraph: {
    title: 'Forever Dreams Home | Premium Interior Design',
    description:
      'Crafting timeless interiors that reflect your personality and elevate your lifestyle.',
    type: 'website',
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
