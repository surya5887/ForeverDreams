'use client';

import React, { useState, useEffect } from 'react';
import { useQuoteContext } from '../../context/QuoteContext';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FiX } from 'react-icons/fi';
import Link from 'next/link';
import styles from './QuotePopup.module.css';

const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK / Duplex'];
const locations = [
  'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Navi Mumbai', 'Thane', 'Pune',
  'New Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad', 'Vizag', 'Kolkata',
  'Howrah', 'Ahmedabad', 'Gandhinagar', 'Kalol', 'Dehgam', 'Mansa', 'GIFT City',
  'Surat', 'Bhubaneswar', 'Cuttack', 'Others'
];

export default function QuotePopup() {
  const { isQuoteOpen, closeQuote, prefilledProject } = useQuoteContext();
  const [whatsappNumber, setWhatsappNumber] = useState('911234567890');
  
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    name: '',
    mobile: ''
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePropertyType = (type) => {
    setFormData({ ...formData, propertyType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.propertyType || !formData.location || !formData.name || !formData.mobile) {
      alert("Please fill all the details.");
      return;
    }

    let text = `Hello Forever Dreams Home, I would like to get a free design consultation.\n\n`;
    text += `*Name:* ${formData.name}\n`;
    text += `*Mobile:* +91 ${formData.mobile}\n`;
    text += `*Property Type:* ${formData.propertyType}\n`;
    text += `*Location:* ${formData.location}\n`;
    
    if (prefilledProject) {
      text += `*Interested In:* ${prefilledProject}\n`;
    }

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    closeQuote();
  };

  if (!isQuoteOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeQuote}>
      <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeQuote} aria-label="Close">
          <FiX />
        </button>
        
        <div className={styles.leftSide}>
          <img src="/form_bg_img.jpeg" alt="Luxury Interior Design" className={styles.bgImage} />
        </div>

        <div className={styles.rightSide}>
          <h2 className={styles.formTitle}>Get a <span>free design consultation</span></h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Property type</label>
              <div className={styles.buttonGroup}>
                {propertyTypes.map((type) => (
                  <button 
                    type="button" 
                    key={type}
                    className={`${styles.typeBtn} ${formData.propertyType === type ? styles.activeType : ''}`}
                    onClick={() => handlePropertyType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <select 
                name="location" 
                value={formData.location} 
                onChange={handleChange}
                className={styles.selectInput}
                required
              >
                <option value="" disabled>Property Location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name" 
                className={styles.textInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.phoneInputWrap}>
                <span className={styles.countryCode}>+91</span>
                <input 
                  type="tel" 
                  name="mobile" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  placeholder="Mobile Number" 
                  className={styles.phoneInput}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Book a Free Consultation
            </button>
            
            <p className={styles.disclaimer}>
              By submitting, you consent to our <Link href="/privacy" className={styles.highlightLink} onClick={closeQuote}>privacy policy</Link> and <Link href="/terms" className={styles.highlightLink} onClick={closeQuote}>terms of use</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
