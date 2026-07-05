"use client";

import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>
      
      <div className={styles.card}>
        <h2>Welcome to Forever Dreams Admin Panel</h2>
        <p style={{ color: '#666', marginTop: '1rem', lineHeight: '1.6' }}>
          From this dashboard, you can manage all the dynamic content on your website without touching a single line of code.
          Use the sidebar on the left to navigate through different sections:
        </p>
        
        <ul style={{ marginTop: '1rem', marginLeft: '1.5rem', color: '#444', lineHeight: '1.8' }}>
          <li><strong>Settings:</strong> Update your contact details, social media links, and WhatsApp number.</li>
          <li><strong>Categories:</strong> Add or remove categories for your Design Gallery.</li>
          <li><strong>Gallery Cards:</strong> Upload new design projects with multiple images and detailed text.</li>
          <li><strong>Recent Projects:</strong> Manage the 4 highlight projects on your homepage.</li>
        </ul>
      </div>
    </div>
  );
}
