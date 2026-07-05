'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiHome, FiSettings, FiGrid, FiImage, FiBriefcase,
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiX, FiCheck
} from 'react-icons/fi';
import styles from './page.module.css';

// Initial Sample Data
const initialCategories = [
  { id: 'cat-1', name: 'Modular Kitchen', itemsCount: 12 },
  { id: 'cat-2', name: 'Living Room', itemsCount: 8 },
  { id: 'cat-3', name: 'Bedroom', itemsCount: 15 },
];

const initialGalleryItems = [
  { id: 'item-1', title: 'Modern Sage Green Kitchen', category: 'Modular Kitchen', price: '₹3L - ₹5L' },
  { id: 'item-2', title: 'Luxury Master Bedroom', category: 'Bedroom', price: '₹2L - ₹4L' },
];

const initialProjects = [
  { id: 'proj-1', title: 'Villa Makeover', location: 'Meerut', category: 'Residential' },
  { id: 'proj-2', title: 'Corporate Office', location: 'Noida', category: 'Commercial' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [toast, setToast] = useState('');

  // Data State
  const [categories, setCategories] = useState(initialCategories);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [projects, setProjects] = useState(initialProjects);

  // Settings State
  const [settings, setSettings] = useState({
    name: 'Forever Dreams Home',
    email: 'info@foreverdreamshome.com',
    phone: '+91 12345 67890',
    whatsapp: '+91 12345 67890',
    address: '123 Design Avenue, Meerut, UP 250001',
    mapUrl: '',
    facebook: '#',
    instagram: '#',
    youtube: '#'
  });

  // Modals State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  useEffect(() => {
    // Check auth
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuth');
      if (auth !== 'true') {
        router.push('/admin');
      } else {
        setIsAuth(true);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSettingsSave = (e) => {
    e.preventDefault();
    showToast('Settings saved successfully!');
  };

  if (!isAuth) return null; // Or a loading spinner

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <button className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`} onClick={() => setActiveTab('dashboard')}>
            <FiHome /> <span>Dashboard</span>
          </button>
          <button className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`} onClick={() => setActiveTab('settings')}>
            <FiSettings /> <span>Settings</span>
          </button>
          <button className={`${styles.navItem} ${activeTab === 'categories' ? styles.active : ''}`} onClick={() => setActiveTab('categories')}>
            <FiGrid /> <span>Categories</span>
          </button>
          <button className={`${styles.navItem} ${activeTab === 'gallery' ? styles.active : ''}`} onClick={() => setActiveTab('gallery')}>
            <FiImage /> <span>Gallery Items</span>
          </button>
          <button className={`${styles.navItem} ${activeTab === 'projects' ? styles.active : ''}`} onClick={() => setActiveTab('projects')}>
            <FiBriefcase /> <span>Projects</span>
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <button className={styles.menuToggle} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FiGrid />
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.adminBadge}>Admin User</span>
          </div>
        </header>

        <div className={styles.contentArea}>
          {toast && <div className={styles.toast}><FiCheck /> {toast}</div>}

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className={styles.dashboardTab}>
              <h1 className={styles.pageTitle}>Dashboard Overview</h1>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>Total Categories</h3>
                  <div className={styles.statNumber}>{categories.length}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>Gallery Items</h3>
                  <div className={styles.statNumber}>{galleryItems.length}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>Projects</h3>
                  <div className={styles.statNumber}>{projects.length}</div>
                </div>
                <div className={styles.statCard}>
                  <h3>New Inquiries</h3>
                  <div className={styles.statNumber}>5</div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className={styles.settingsTab}>
              <h1 className={styles.pageTitle}>Website Settings</h1>
              <div className={styles.card}>
                <form onSubmit={handleSettingsSave} className={styles.form}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Website Name</label>
                      <input type="text" value={settings.name} onChange={(e) => setSettings({...settings, name: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Contact Email</label>
                      <input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>WhatsApp Number</label>
                      <input type="text" value={settings.whatsapp} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Office Address</label>
                    <textarea rows="3" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})}></textarea>
                  </div>
                  <h3 className={styles.subHeading}>Social Links</h3>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Facebook URL</label>
                      <input type="text" value={settings.facebook} onChange={(e) => setSettings({...settings, facebook: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Instagram URL</label>
                      <input type="text" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})} />
                    </div>
                  </div>
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.btnPrimary}>Save Settings</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className={styles.categoriesTab}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Manage Categories</h1>
                <button className={styles.btnPrimary} onClick={() => setIsCategoryModalOpen(true)}>
                  <FiPlus /> Add Category
                </button>
              </div>
              <div className={styles.card}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Items Count</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(cat => (
                      <tr key={cat.id}>
                        <td>{cat.name}</td>
                        <td>{cat.itemsCount}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.btnIcon} title="Edit"><FiEdit2 /></button>
                            <button className={styles.btnIconDanger} title="Delete" onClick={() => {
                              setCategories(categories.filter(c => c.id !== cat.id));
                              showToast('Category deleted');
                            }}><FiTrash2 /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className={styles.galleryTab}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Manage Gallery Items</h1>
                <button className={styles.btnPrimary} onClick={() => setIsGalleryModalOpen(true)}>
                  <FiPlus /> Add Item
                </button>
              </div>
              <div className={styles.card}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price Range</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.btnIcon} title="Edit"><FiEdit2 /></button>
                            <button className={styles.btnIconDanger} title="Delete" onClick={() => {
                              setGalleryItems(galleryItems.filter(i => i.id !== item.id));
                              showToast('Item deleted');
                            }}><FiTrash2 /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className={styles.projectsTab}>
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Manage Projects</h1>
                <button className={styles.btnPrimary} onClick={() => setIsProjectModalOpen(true)}>
                  <FiPlus /> Add Project
                </button>
              </div>
              <div className={styles.card}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(proj => (
                      <tr key={proj.id}>
                        <td>{proj.title}</td>
                        <td>{proj.location}</td>
                        <td>{proj.category}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button className={styles.btnIcon} title="Edit"><FiEdit2 /></button>
                            <button className={styles.btnIconDanger} title="Delete" onClick={() => {
                              setProjects(projects.filter(p => p.id !== proj.id));
                              showToast('Project deleted');
                            }}><FiTrash2 /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Basic Modals (Placeholders for UI completeness) */}
      {isCategoryModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add Category</h2>
              <button onClick={() => setIsCategoryModalOpen(false)}><FiX /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Category Name</label>
                <input type="text" placeholder="e.g. Modular Kitchen" />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsCategoryModalOpen(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={() => {
                setIsCategoryModalOpen(false);
                showToast('Category added');
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {isGalleryModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add Gallery Item</h2>
              <button onClick={() => setIsGalleryModalOpen(false)}><FiX /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input type="text" placeholder="Item title" />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select>
                  {categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Image Upload</label>
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsGalleryModalOpen(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={() => {
                setIsGalleryModalOpen(false);
                showToast('Item added');
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {isProjectModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add Project</h2>
              <button onClick={() => setIsProjectModalOpen(false)}><FiX /></button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Project Title</label>
                <input type="text" placeholder="Project title" />
              </div>
              <div className={styles.formGroup}>
                <label>Category</label>
                <select>
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnOutline} onClick={() => setIsProjectModalOpen(false)}>Cancel</button>
              <button className={styles.btnPrimary} onClick={() => {
                setIsProjectModalOpen(false);
                showToast('Project added');
              }}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
