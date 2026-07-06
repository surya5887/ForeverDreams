'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiX, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from './page.module.css';

function GalleryContent() {
  const searchParams = useSearchParams();
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [categories, setCategories] = useState([{ slug: 'all', name: 'All' }]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const catSnap = await getDocs(collection(db, 'categories'));
        const fetchedCats = [];
        const seenSlugs = new Set();
        catSnap.forEach(doc => {
          const data = doc.data();
          if (!seenSlugs.has(data.slug)) {
            seenSlugs.add(data.slug);
            fetchedCats.push({ id: doc.id, ...data });
          }
        });
        const CATEGORY_ORDER = [
          'Modular Kitchen', 'Living Room', 'Bedroom', 'Wardrobe', 
          'Kids Bedroom', 'Bathroom', 'Home Office', 'Dining Room', 
          'Pooja Room', '1 BHK Interior', '2 BHK Interior', '3 BHK Interior'
        ];

        fetchedCats.sort((a, b) => {
          const indexA = CATEGORY_ORDER.indexOf(a.name);
          const indexB = CATEGORY_ORDER.indexOf(b.name);
          const weightA = indexA === -1 ? 999 : indexA;
          const weightB = indexB === -1 ? 999 : indexB;
          return weightA - weightB;
        });

        setCategories([{ slug: 'all', name: 'All' }, ...fetchedCats]);
        
        const galSnap = await getDocs(collection(db, 'galleryItems'));
        const fetchedItems = [];
        const seenTitles = new Set();
        galSnap.forEach(doc => {
          const data = doc.data();
          if (!seenTitles.has(data.title)) {
            seenTitles.add(data.title);
            fetchedItems.push({ id: doc.id, ...data });
          }
        });
        setGalleryItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 1) {
      const cat = searchParams.get('category');
      if (cat && categories.find(c => c.slug === cat)) {
        setActiveCategorySlug(cat);
      }
    }
  }, [searchParams, categories]);

  const handleCategoryClick = (catSlug) => {
    setActiveCategorySlug(catSlug);
    window.history.pushState(null, '', catSlug === 'all' ? '/design-gallery' : `/design-gallery?category=${catSlug}`);
  };

  const openSidebar = (item) => {
    setSelectedItem(item);
    setSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedItem(null), 300);
  };

  const activeCatObj = categories.find(c => c.slug === activeCategorySlug);
  const activeCategoryId = activeCatObj ? activeCatObj.id : null;
  const activeCategoryName = activeCatObj ? activeCatObj.name : '';

  const currentItems = activeCategorySlug === 'all' ? galleryItems : galleryItems.filter(item => item.categoryId === activeCategoryId);

  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Home Interior Designs</h1>
          <p className={styles.pageSubtitle}>
            Explore the latest interior designs for kitchens, bedrooms, living rooms, wardrobes, and more.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <FiChevronRight />
          <Link href="/design-gallery">Design Gallery</Link>
          {activeCategorySlug !== 'all' && (
            <>
              <FiChevronRight />
              <span>{activeCategoryName}</span>
            </>
          )}
        </nav>
      </div>

      <div className={styles.container}>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat.slug}
                className={`${styles.tab} ${activeCategorySlug === cat.slug ? styles.tabActive : ''}`}
                onClick={() => handleCategoryClick(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>Loading designs...</div>
        ) : (
          <div className={styles.designsSection}>
            <h2 className={styles.designsTitle}>{activeCategorySlug === 'all' ? 'All Designs' : `${activeCategoryName} Designs`}</h2>
            {currentItems.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>No designs found in this category.</p>
            ) : (
              <div className={styles.designsGrid}>
                {currentItems.map((item, i) => {
                  const coverImg = (item.images && item.images.length > 0) ? item.images[0] : 'https://picsum.photos/600/400';
                  return (
                    <div key={item.id} className={styles.designCard} style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className={styles.designImageWrap}>
                        <img src={coverImg} alt={item.title} className={styles.designImage} />
                      </div>
                      <div className={styles.designCardBody}>
                        <h3 className={styles.designCardTitle}>{item.title}</h3>
                        <div className={styles.designCardActions}>
                          <a href={`https://wa.me/911234567890?text=Hello%20ForeverDreams,%20I'm%20interested%20in%20your%20interior%20design%20services.%20Can%20I%20get%20a%20quote%20for%20the%20${encodeURIComponent(item.title)}%20project?`} target="_blank" rel="noopener noreferrer" className={styles.btnQuote} style={{textDecoration: 'none', display: 'inline-block', textAlign: 'center'}}>
                            Get a Quote
                          </a>
                          <button className={styles.btnExplore} onClick={() => openSidebar(item)}>
                            Explore more <FiChevronRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {sidebarOpen && <div className={styles.backdrop} onClick={closeSidebar}></div>}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <button className={styles.sidebarClose} onClick={closeSidebar}><FiX /></button>
        {selectedItem && (
          <div className={styles.sidebarContent}>
            <img 
              src={(selectedItem.images && selectedItem.images.length > 0) ? selectedItem.images[0] : 'https://picsum.photos/600/400'} 
              alt={selectedItem.title} 
              className={styles.sidebarImage} 
            />
            <h2 className={styles.sidebarTitle}>{selectedItem.title}</h2>
            <p className={styles.sidebarCategory}>{categories.find(c => c.id === selectedItem.categoryId)?.name}</p>
            <p className={styles.sidebarDesc}>{selectedItem.description}</p>

            <div className={styles.sidebarSection}>
              <h4>Details</h4>
              <p><strong>Client:</strong> {selectedItem.clientName || 'N/A'}</p>
              <p><strong>Location:</strong> {selectedItem.location || 'N/A'}</p>
              <p><strong>Year:</strong> {selectedItem.year || 'N/A'}</p>
            </div>

            <div className={styles.sidebarActions}>
              <a href={`https://wa.me/911234567890?text=Hello%20ForeverDreams,%20I'm%20interested%20in%20your%20interior%20design%20services.%20Can%20I%20get%20a%20quote%20for%20the%20${encodeURIComponent(selectedItem.title)}%20project?`} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary} style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                Get a Quote <FiArrowRight />
              </a>
              <a href="https://wa.me/911234567890?text=Hello%20ForeverDreams,%20I'd%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className={styles.btnOutline} style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
                Book Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DesignGalleryPage() {
  return (
    <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
