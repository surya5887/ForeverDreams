'use client';

import React, { useState, useEffect } from 'react';
import { useQuoteContext } from '../../context/QuoteContext';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FiX, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { countryCodes } from '../../utils/countryCodes';
import styles from './QuotePopup.module.css';

const residentialTypes = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa'];
const commercialTypes = ['Office Space', 'Retail Shop', 'Restaurant/Cafe', 'Clinic', 'Others'];
const locations = [
  'Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Navi Mumbai', 'Thane', 'Pune',
  'New Delhi', 'Gurugram', 'Noida', 'Ghaziabad', 'Faridabad', 'Vizag', 'Kolkata',
  'Howrah', 'Ahmedabad', 'Gandhinagar', 'Kalol', 'Dehgam', 'Mansa', 'GIFT City',
  'Surat', 'Bhubaneswar', 'Cuttack', 'Others'
];

export default function QuotePopup() {
  const { isQuoteOpen, closeQuote, prefilledProject } = useQuoteContext();
  
  const [formData, setFormData] = useState({
    propertyCategory: 'Residential',
    propertyType: '',
    location: '',
    name: '',
    mobile: ''
  });
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  const [selectedCountry, setSelectedCountry] = useState(countryCodes.find(c => c.code === 'IN'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    if (e.target.name === 'mobile') {
      const value = e.target.value.replace(/\D/g, '');
      setFormData({ ...formData, mobile: value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const filteredCountries = countryCodes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dial_code.includes(searchQuery)
  );

  const handlePropertyType = (type) => {
    setFormData({ ...formData, propertyType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.propertyType || !formData.location || !formData.name || !formData.mobile) {
      alert("Please fill all the details.");
      return;
    }

    const text = `Hello! I would like to book a free consultation.%0A%0A*Details:*%0AProperty: ${formData.propertyCategory} - ${formData.propertyType}%0ALocation: ${formData.location}%0AProject: ${prefilledProject || 'General Enquiry'}%0A%0A*Contact Info:*%0AName: ${formData.name}%0AMobile: ${selectedCountry.dial_code} ${formData.mobile}`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
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
              <label>Property Category</label>
              <div className={styles.buttonGroup}>
                {['Residential', 'Commercial'].map((category) => (
                  <button 
                    type="button" 
                    key={category}
                    className={`${styles.typeBtn} ${formData.propertyCategory === category ? styles.activeType : ''}`}
                    onClick={() => setFormData({ ...formData, propertyCategory: category, propertyType: '' })}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>{formData.propertyCategory === 'Residential' ? 'Configuration' : 'Office Type'}</label>
              <div className={styles.buttonGroup}>
                {(formData.propertyCategory === 'Residential' ? residentialTypes : commercialTypes).map((type) => (
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
                <div className={styles.countryDropdown}>
                  <div 
                    className={styles.countryToggle} 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {selectedCountry.dial_code} <FiChevronDown />
                  </div>
                  {isDropdownOpen && (
                    <div className={styles.dropdownMenu}>
                      <input 
                        type="text" 
                        className={styles.searchInput}
                        placeholder="Search country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                      {filteredCountries.map(c => (
                        <div 
                          key={c.code} 
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSelectedCountry(c);
                            setIsDropdownOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <span>{c.name}</span>
                          <span style={{ color: '#888' }}>{c.dial_code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
