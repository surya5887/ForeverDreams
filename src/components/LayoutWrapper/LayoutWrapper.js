'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget/WhatsAppWidget';
import QuotePopup from '@/components/QuotePopup/QuotePopup';
import { QuoteProvider } from '@/context/QuoteContext';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <QuoteProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
      <QuotePopup />
    </QuoteProvider>
  );
}
