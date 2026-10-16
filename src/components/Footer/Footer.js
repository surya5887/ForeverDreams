'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaHome, FaWhatsapp, FaShieldAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiPhone, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
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
        console.error("Error fetching settings: ", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>
            <div className={styles.fLogoCircle}><img src="/logo.png" alt="Glossix Design - Top Rated Interior Designer" className={styles.fLogoIconImage} /></div>
            <div className={styles.brandNameTextFooter}>
              {siteSettings?.siteName || 'Glossix Design'}
            </div>
          </div>
          <p className={styles.footerDesc}>
            Designing beautiful spaces that reflect your style and personality.
          </p>
          <div className={styles.socialLinks}>
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noreferrer"><FaFacebookF/></a>
            <a href="https://www.instagram.com/glossixdesignpvtltd" target="_blank" rel="noreferrer"><FaInstagram/></a>
            <a href="https://pin.it/150kBVljT" target="_blank" rel="noreferrer"><FaPinterestP/></a>
            <a href="https://youtube.com/@happypradhan2996" target="_blank" rel="noreferrer"><FaYoutube/></a>
            <a href={siteSettings?.twitter || "#"} target="_blank" rel="noreferrer"><FaXTwitter/></a>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Quick Links</h4>
          <ul className={styles.footerList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/design-gallery">Portfolio</Link></li>
            <li><Link href="/about-us#contact-form">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Our Services</h4>
          <ul className={styles.footerList}>
            <li><Link href="/recent-projects?category=Residential">Residential Interior</Link></li>
            <li><Link href="/recent-projects?category=Commercial">Commercial Interior</Link></li>
            <li><Link href="/design-gallery?category=modular-kitchen">Modular Kitchen</Link></li>
            <li><Link href="/#curated-gallery">Furniture & Decor</Link></li>
            <li><Link href="/#recent-work">Turnkey Projects</Link></li>
            <li><Link href="/#shop-the-look">3D Design & Visual</Link></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Contact Us</h4>
          <ul className={styles.footerContact}>
            <li><FiPhone color="#b98e46" /> <a href="tel:+919540005981" style={{ color: '#a0aec0', textDecoration: 'none' }}>+91 9540005981</a></li>
            <li><FiMail color="#b98e46" /> <a href="mailto:Glossixdesign981@gmail.com" style={{ color: '#a0aec0', textDecoration: 'none' }}>Glossixdesign981@gmail.com</a></li>
            <li><FaHome color="#b98e46" /> Village-Jalpura, Greater Noida, UP</li>
          </ul>

          <div style={{ marginTop: '1.5rem' }}>
            <a 
              href="https://wa.me/919540005981" 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                padding: '9px 18px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
              }}
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Full Width Registered Business & Official Details Box Above Map */}
      <div className={styles.officialInfoCard}>
        <div className={styles.officialInfoBox}>
          <div className={styles.officialInfoHeader}>
            <div className={styles.officialInfoTitle}>
              <FaShieldAlt color="#b98e46" /> Registered Office & Official Details
            </div>
            <div className={styles.officialBadge}>
              ✓ Govt. Registered & GST Compliant
            </div>
          </div>
          <div className={styles.officialGrid}>
            <div className={styles.officialItem}>
              <div className={styles.officialItemHeader}>
                <FaMapMarkerAlt color="#b98e46" /> Registered Address
              </div>
              <div className={styles.officialItemValue}>
                Village-Jalpura, Greater Noida, Nearby SD International School, Gautam Budh Nagar, Uttar Pradesh - 201318
              </div>
            </div>

            <div className={styles.officialItem}>
              <div className={styles.officialItemHeader}>
                <FiPhone color="#b98e46" /> Phone No.
              </div>
              <div className={styles.officialItemValue}>
                <a href="tel:+919540005981" style={{ fontWeight: '600', color: '#fff' }}>+91 9540005981</a>
                <div style={{ fontSize: '0.78rem', color: '#a0aec0', marginTop: '2px' }}>Call & WhatsApp Consultation</div>
              </div>
            </div>

            <div className={styles.officialItem}>
              <div className={styles.officialItemHeader}>
                <FiMail color="#b98e46" /> Official Email
              </div>
              <div className={styles.officialItemValue}>
                <a href="mailto:Glossixdesign981@gmail.com" style={{ color: '#fff' }}>Glossixdesign981@gmail.com</a>
                <div style={{ fontSize: '0.78rem', color: '#a0aec0', marginTop: '2px' }}>Direct Client & Project Inquiries</div>
              </div>
            </div>

            <div className={styles.officialItem}>
              <div className={styles.officialItemHeader}>
                <FaShieldAlt color="#b98e46" /> GSTIN & State
              </div>
              <div className={styles.officialItemValue}>
                <strong style={{ color: '#fff', letterSpacing: '0.5px' }}>09CCAPA4733J2ZR</strong>
                <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '2px' }}>State: 09 – Uttar Pradesh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {siteSettings?.mapLat && siteSettings?.mapLng && (
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem 3rem 2rem', width: '100%' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(185, 142, 70, 0.4)', width: '100%', height: '300px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://maps.google.com/maps?q=${siteSettings.mapLat},${siteSettings.mapLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              style={{ filter: 'contrast(1.1) opacity(0.9) grayscale(0.2)' }}
            ></iframe>
          </div>
        </div>
      )}

      <div className={styles.footerBottom} style={{ flexWrap: 'wrap' }}>
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '1.5rem', marginTop: '1rem', padding: '15px 0', borderTop: '1px solid rgba(185, 142, 70, 0.2)', borderBottom: '1px solid rgba(185, 142, 70, 0.2)' }}>
          <p style={{ color: '#b98e46', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Top Rated Interior Designer Serving</p>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto' }}>
            Noida <span style={{color:'#b98e46'}}>|</span> Greater Noida <span style={{color:'#b98e46'}}>|</span> Noida Extension <span style={{color:'#b98e46'}}>|</span> Delhi NCR <span style={{color:'#b98e46'}}>|</span> New Delhi <span style={{color:'#b98e46'}}>|</span> Gurugram <span style={{color:'#b98e46'}}>|</span> Ghaziabad <span style={{color:'#b98e46'}}>|</span> Faridabad <span style={{color:'#b98e46'}}>|</span> Meerut <span style={{color:'#b98e46'}}>|</span> Hapur <span style={{color:'#b98e46'}}>|</span> Bulandshahr <span style={{color:'#b98e46'}}>|</span> Aligarh <span style={{color:'#b98e46'}}>|</span> Mathura <span style={{color:'#b98e46'}}>|</span> Agra <span style={{color:'#b98e46'}}>|</span> Muzaffarnagar <span style={{color:'#b98e46'}}>|</span> Saharanpur <span style={{color:'#b98e46'}}>|</span> Roorkee <span style={{color:'#b98e46'}}>|</span> Dehradun <span style={{color:'#b98e46'}}>|</span> Western UP
          </p>
        </div>
        <p>&copy; {new Date().getFullYear()} {siteSettings?.siteName || 'Glossix Design'}. All Rights Reserved.</p>
        <div className={styles.footerLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
