'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter, FaHome } from 'react-icons/fa';
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
            <div className={styles.fLogoCircle}>
              <img src="/main_logo.jpeg" alt="FD Logo" className={styles.fLogoIconImage} />
            </div>
            <img src="/name_img.png" alt="Forever Dreams Home" className={styles.nameImgFooter} style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', transform: 'scale(4.5)', transformOrigin: 'left center', marginLeft: '15px' }} />
          </div>
          <p className={styles.footerDesc}>
            Designing beautiful spaces that reflect your style and personality.
          </p>
          <div className={styles.socialLinks}>
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noreferrer"><FaFacebookF/></a>
            <a href={siteSettings?.instagram || "#"} target="_blank" rel="noreferrer"><FaInstagram/></a>
            <a href={siteSettings?.pinterest || "#"} target="_blank" rel="noreferrer"><FaPinterestP/></a>
            <a href={siteSettings?.youtube || "#"} target="_blank" rel="noreferrer"><FaYoutube/></a>
            <a href={siteSettings?.twitter || "#"} target="_blank" rel="noreferrer"><FaTwitter/></a>
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
            <li><FiPhone color="#b98e46" /> {siteSettings?.phone || '+91 12345 67890'}</li>
            <li><FiMail color="#b98e46" /> {siteSettings?.email || 'info@foreverdreamshome.com'}</li>
            <li><FaHome color="#b98e46" /> {siteSettings?.address || 'Meerut, Uttar Pradesh, India'}</li>
          </ul>
          
          <h4 className={styles.footerTitle} style={{marginTop: '2rem'}}>Newsletter</h4>
          <p className={styles.newsDesc}>Subscribe to get latest updates and interior design tips.</p>
          <form className={styles.newsForm}>
            <input type="email" placeholder="Enter your email" className={styles.newsInput} required />
            <button type="submit" className={styles.newsBtn}><FiArrowRight/></button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 Forever Dreams Home Interior Design. All Rights Reserved.</p>
        <div className={styles.footerLegal}>
          <Link href="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
