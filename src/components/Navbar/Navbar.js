'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import styles from './Navbar.module.css';

const CATEGORIES = [
  'Modular Kitchen', 'Living Room', 'Bedroom', 'Wardrobe', 
  'Kids Bedroom', 'Bathroom', 'Home Office', 'Dining Room', 
  'Pooja Room', '1 BHK Interior', '2 BHK Interior', '3 BHK Interior'
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          
          {/* Logo Area */}
          <Link href="/" className={styles.logoWrap}>
            <img src="/logo.jpeg" alt="FD Logo" className={styles.logoIconImage} />
            <div className={styles.logoText}>
              <div className={styles.logoTop}>FOREVER</div>
              <div className={styles.logoMiddle}>Dreams Home</div>
              <div className={styles.logoBottom}>
                <span className={styles.line}></span>
                INTERIOR DESIGN
                <span className={styles.line}></span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
              HOME
            </Link>
            
            <div 
              className={styles.dropdownWrap}
              onMouseEnter={() => setIsGalleryHovered(true)}
              onMouseLeave={() => setIsGalleryHovered(false)}
            >
              <Link href="/design-gallery" className={`${styles.navLink} ${isActive('/design-gallery') ? styles.active : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  DESIGN GALLERY <FiChevronDown className={`${styles.chevron} ${isGalleryHovered ? styles.chevronUp : ''}`} />
                </span>
              </Link>
              
              <div className={`${styles.dropdownMenu} ${isGalleryHovered ? styles.dropdownOpen : ''}`}>
                <div className={styles.dropdownGrid}>
                  {CATEGORIES.map((cat) => (
                    <Link 
                      key={cat} 
                      href={`/design-gallery?category=${cat.toLowerCase().replace(/ /g, '-')}`}
                      className={styles.dropdownItem}
                      onClick={() => setIsGalleryHovered(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/recent-projects" className={`${styles.navLink} ${isActive('/recent-projects') ? styles.active : ''}`}>
              RECENT PROJECTS
            </Link>
            
            <Link href="/about-us" className={`${styles.navLink} ${isActive('/about-us') ? styles.active : ''}`}>
              ABOUT US
            </Link>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className={styles.rightActions}>
            <Link href="/about-us#contact-form" className={styles.ctaBtn}>
              GET A FREE QUOTE <FiArrowRight />
            </Link>
            
            <button 
              className={styles.mobileToggle} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerContent}>
          <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
          <Link href="/design-gallery" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>DESIGN GALLERY</Link>
          <Link href="/recent-projects" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>RECENT PROJECTS</Link>
          <Link href="/about-us" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
        </div>
      </div>
    </>
  );
}
