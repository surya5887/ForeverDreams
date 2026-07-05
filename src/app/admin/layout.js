"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '../actions/authActions';
import { FiSettings, FiGrid, FiImage, FiStar, FiLogOut } from 'react-icons/fi';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Forever Dreams</h2>
          <p>Admin Dashboard</p>
        </div>
        
        <nav className={styles.sidebarNav}>
          <Link href="/admin/settings" className={`${styles.navLink} ${pathname === '/admin/settings' ? styles.active : ''}`}>
            <FiSettings /> Settings
          </Link>
          <Link href="/admin/categories" className={`${styles.navLink} ${pathname === '/admin/categories' ? styles.active : ''}`}>
            <FiGrid /> Categories
          </Link>
          <Link href="/admin/gallery" className={`${styles.navLink} ${pathname === '/admin/gallery' ? styles.active : ''}`}>
            <FiImage /> Gallery Cards
          </Link>
          <Link href="/admin/recent" className={`${styles.navLink} ${pathname === '/admin/recent' ? styles.active : ''}`}>
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
        {children}
      </main>
    </div>
  );
}
