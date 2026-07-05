'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from './WhatsAppWidget.module.css';

export default function WhatsAppWidget() {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.whatsapp) {
            setWhatsappNumber(data.whatsapp.replace(/[^0-9]/g, ''));
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Default fallback if not set in DB
  const waNumber = whatsappNumber || '911234567890';
  const defaultMessage = 'Hello Forever Dreams Home, I am interested in your interior design services.';

  return (
    <a
      href={`https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.waButton}
      aria-label="Chat on WhatsApp"
    >
      <div className={styles.waTooltip}>Chat with us!</div>
      <FaWhatsapp className={styles.waIcon} />
    </a>
  );
}
