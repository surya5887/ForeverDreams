'use client';

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styles from '../../app/legal.module.css';

export default function LegalContactInfo() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSiteSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className={styles.contactInfo}>
      <p>Forever Dreams Home Interior Design</p>
      <p>{siteSettings?.address || 'Meerut, Uttar Pradesh, India 250001'}</p>
      <p>Email: <a href={`mailto:${siteSettings?.email || 'info@foreverdreamshome.com'}`} style={{color: 'var(--color-accent)'}}>{siteSettings?.email || 'info@foreverdreamshome.com'}</a></p>
      <p>Phone: {siteSettings?.phone || '+91 12345 67890'}</p>
    </div>
  );
}
