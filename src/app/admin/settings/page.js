"use client";

import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from '../admin.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    mapLink: '',
    facebook: '',
    instagram: '',
    youtube: '',
    pinterest: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings({ ...settings, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      setMessage('Settings saved successfully!');
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className={styles.mainContent}>Loading settings...</div>;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>General Settings</h1>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            
            <div className={styles.formGroup}>
              <label>Site Name</label>
              <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} placeholder="Forever Dreams Home" />
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={settings.email} onChange={handleChange} placeholder="info@foreverdreamshome.com" />
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="text" name="phone" value={settings.phone} onChange={handleChange} placeholder="+91 12345 67890" />
            </div>

            <div className={styles.formGroup}>
              <label>WhatsApp Number</label>
              <input type="text" name="whatsapp" value={settings.whatsapp} onChange={handleChange} placeholder="919876543210" />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
              <label>Physical Address</label>
              <input type="text" name="address" value={settings.address} onChange={handleChange} placeholder="Meerut, Uttar Pradesh, India" />
            </div>

            <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
              <label>Google Map Embed Link (src only)</label>
              <input type="text" name="mapLink" value={settings.mapLink} onChange={handleChange} placeholder="https://www.google.com/maps/embed?..." />
            </div>

            <div className={styles.formGroup}>
              <label>Facebook URL</label>
              <input type="url" name="facebook" value={settings.facebook} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>

            <div className={styles.formGroup}>
              <label>Instagram URL</label>
              <input type="url" name="instagram" value={settings.instagram} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>

            <div className={styles.formGroup}>
              <label>YouTube URL</label>
              <input type="url" name="youtube" value={settings.youtube} onChange={handleChange} placeholder="https://youtube.com/..." />
            </div>

            <div className={styles.formGroup}>
              <label>Pinterest URL</label>
              <input type="url" name="pinterest" value={settings.pinterest} onChange={handleChange} placeholder="https://pinterest.com/..." />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button type="submit" className={styles.btnPrimary} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
            {message && <span style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
