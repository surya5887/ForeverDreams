'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaHome } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowRight, FiPhone, FiMail } from 'react-icons/fi';
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
            <li><FiPhone color="#b98e46" /> {siteSettings?.phone || '+91 9540005981'}</li>
            <li><FiMail color="#b98e46" /> Saifikhusmuddin77@gmail.com</li>
            <li><FaHome color="#b98e46" /> {siteSettings?.address || 'Greater Noida, Uttar Pradesh'}</li>
          </ul>

          {siteSettings?.mapLat && siteSettings?.mapLng && (
            <div style={{ marginTop: '1.2rem', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(185, 142, 70, 0.4)', width: '100%', height: '140px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
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
          )}
          
          <h4 className={styles.footerTitle} style={{marginTop: '2rem'}}>Newsletter</h4>
          <p className={styles.newsDesc}>Subscribe to get latest updates and interior design tips.</p>
          <form className={styles.newsForm}>
            <input type="email" placeholder="Enter your email" className={styles.newsInput} required />
            <button type="submit" className={styles.newsBtn}><FiArrowRight/></button>
          </form>
        </div>
      </div>

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
