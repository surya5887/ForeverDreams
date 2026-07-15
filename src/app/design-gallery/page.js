'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiX, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useQuoteContext } from '@/context/QuoteContext';
import styles from './page.module.css';

function GalleryContent() {
  const searchParams = useSearchParams();
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const { openQuote } = useQuoteContext();

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

        const filteredCats = fetchedCats.filter(cat => CATEGORY_ORDER.includes(cat.name));

        filteredCats.sort((a, b) => {
          return CATEGORY_ORDER.indexOf(a.name) - CATEGORY_ORDER.indexOf(b.name);
        });

        setCategories([{ slug: 'all', name: 'All' }, ...filteredCats]);
        
        const galSnap = await getDocs(collection(db, 'galleryItems'));
        const fetchedItems = [];
        galSnap.forEach(doc => {
          const data = doc.data();
          fetchedItems.push({ id: doc.id, ...data });
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



  const activeCatObj = categories.find(c => c.slug === activeCategorySlug);
  const activeCategoryId = activeCatObj ? activeCatObj.id : null;
  const activeCategoryName = activeCatObj ? activeCatObj.name : '';

  const currentItems = activeCategorySlug === 'all' ? galleryItems : galleryItems.filter(item => item.categoryId === activeCategoryId || item.category === activeCategoryName);

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
                          <button onClick={(e) => { e.preventDefault(); openQuote(item.title); }} className={styles.btnQuoteFull} style={{display: 'inline-block', textAlign: 'center', border: 'none', cursor: 'pointer', width: '100%', padding: '0.8rem', borderRadius: '4px', backgroundColor: '#b98e46', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem'}}>
                            Get a Quote
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
