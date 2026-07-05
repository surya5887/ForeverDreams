'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ── Call to Action Banner ── */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2>Let&apos;s Design Something Beautiful Together!</h2>
            <p>Transform your space with our premium interior design services.</p>
          </div>
          <Link href="/about-us" className={styles.ctaBtn}>
            BOOK FREE CONSULTATION <FiArrowRight />
          </Link>
        </div>
      </div>

      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            
            {/* Column 1: Brand & Social */}
            <div className={styles.footerCol}>
              <Link href="/" className={styles.logoWrap}>
                <div className={styles.logoText}>
                  <span className={styles.logoMain}>FD</span>
                  <div className={styles.logoWords}>
                    <strong>FOREVER DREAMS</strong>
                    <span>HOME INTERIORS</span>
                  </div>
                </div>
              </Link>
              <p className={styles.brandDesc}>
                Crafting timeless interiors that reflect your personality and elevate your lifestyle. We turn your dream home into reality.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className={styles.socialIcon} aria-label="Pinterest"><FaPinterestP /></a>
                <a href="#" className={styles.socialIcon} aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.footerCol}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/design-gallery">Design Gallery</Link></li>
                <li><Link href="/recent-projects">Recent Projects</Link></li>
                <li><Link href="/about-us">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className={styles.footerCol}>
              <h3 className={styles.colTitle}>Our Services</h3>
              <ul className={styles.linkList}>
                <li><Link href="/design-gallery">Residential Interior</Link></li>
                <li><Link href="/design-gallery">Commercial Interior</Link></li>
                <li><Link href="/design-gallery">Modular Kitchen</Link></li>
                <li><Link href="/design-gallery">Furniture & Decor</Link></li>
                <li><Link href="/design-gallery">Turnkey Projects</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className={styles.footerCol}>
              <h3 className={styles.colTitle}>Contact Info</h3>
              <ul className={styles.contactList}>
                <li>
                  <FaPhone className={styles.contactIcon} />
                  <div>
                    <span>Phone / WhatsApp</span>
                    <a href="tel:+911234567890">+91 12345 67890</a>
                  </div>
                </li>
                <li>
                  <FaEnvelope className={styles.contactIcon} />
                  <div>
                    <span>Email</span>
                    <a href="mailto:info@foreverdreamshome.com">info@foreverdreamshome.com</a>
                  </div>
                </li>
                <li>
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <div>
                    <span>Address</span>
                    <p>123 Design Avenue, Meerut,<br />Uttar Pradesh, India</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomFlex}>
            <p>&copy; {new Date().getFullYear()} Forever Dreams Home. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="#">Privacy Policy</Link>
              <span>|</span>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
