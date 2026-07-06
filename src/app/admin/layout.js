"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '../actions/authActions';
import { FiSettings, FiGrid, FiImage, FiStar, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminLayout}>
      <div 
        className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.sidebarOverlayOpen : ''}`} 
        onClick={closeSidebar}
      ></div>

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>Forever Dreams</h2>
              <p>Admin Dashboard</p>
            </div>
            {isSidebarOpen && (
              <button onClick={closeSidebar} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
                <FiX />
              </button>
            )}
          </div>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin/settings" className={`${styles.navLink} ${pathname === '/admin/settings' ? styles.active : ''}`} onClick={closeSidebar}>
            <FiSettings /> Settings
          </Link>
          <Link href="/admin/categories" className={`${styles.navLink} ${pathname === '/admin/categories' ? styles.active : ''}`} onClick={closeSidebar}>
            <FiGrid /> Categories
          </Link>
          <Link href="/admin/gallery" className={`${styles.navLink} ${pathname === '/admin/gallery' ? styles.active : ''}`} onClick={closeSidebar}>
            <FiImage /> Gallery Cards
          </Link>
          <Link href="/admin/recent" className={`${styles.navLink} ${pathname === '/admin/recent' ? styles.active : ''}`} onClick={closeSidebar}>
            <FiStar /> Recent Projects
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={() => logoutAdmin()} className={styles.logoutBtn}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} className="mobileHeader">
          <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
            <FiMenu />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
