'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiX, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import styles from './page.module.css';

/* ── Categories ── */
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'modular-kitchen', name: 'Modular Kitchen' },
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kids-bedroom', name: 'Kids Bedroom' },
  { id: 'wardrobe', name: 'Wardrobe' },
  { id: 'dining-room', name: 'Dining Room' },
  { id: 'pooja-room', name: 'Pooja Room' },
  { id: 'space-saving', name: 'Space Saving' },
  { id: 'home-office', name: 'Home Office' },
  { id: 'bathroom', name: 'Bathroom' },
  { id: '1-bhk', name: '1 BHK Interior' },
  { id: '2-bhk', name: '2 BHK Interior' },
  { id: '3-bhk', name: '3 BHK Interior' },
];

/* ── Helper to generate sample items ── */
function generateItems(categoryId, categoryName) {
  const designs = {
    'modular-kitchen': [
      { title: 'A Striking Kitchen With A Foldable Breakfast Table', desc: 'This modular kitchen features a sleek foldable breakfast table, perfect for small spaces. The combination of warm wood tones and modern hardware creates a welcoming yet functional cooking area.' },
      { title: 'A Modern Parallel Kitchen In Sage Green', desc: 'A contemporary parallel kitchen design featuring sage green cabinets with gold hardware. Includes ample counter space and integrated appliances for a seamless cooking experience.' },
      { title: 'A Blue Modular Kitchen With A Tiled Backsplash', desc: 'Bold blue cabinets paired with artisanal tiled backsplash create a stunning visual impact. Features soft-close drawers and premium granite countertops.' },
      { title: 'L-Shaped Kitchen With Island Counter', desc: 'Spacious L-shaped layout with a central island for additional prep space. Includes built-in wine rack and modern pendant lighting.' },
      { title: 'Compact U-Shaped Kitchen Design', desc: 'Maximizes storage in a compact footprint. Features corner carousels, pull-out pantry, and under-cabinet LED lighting.' },
      { title: 'Luxury Italian Kitchen With Marble Finish', desc: 'Premium Italian-inspired design with marble countertops and backsplash. Gold-accented handles and imported fixtures add a touch of luxury.' },
    ],
    'living-room': [
      { title: 'Contemporary Living Room With TV Unit', desc: 'Modern living space featuring a wall-mounted TV unit with backlit panels and floating shelves.' },
      { title: 'Minimalist White Living Room', desc: 'Clean, airy design with white walls, natural wood accents, and carefully curated furniture pieces.' },
      { title: 'Luxury Living Room With False Ceiling', desc: 'Grand living area with an elaborate false ceiling design featuring cove lighting and crystal chandeliers.' },
      { title: 'Cozy Living Room With Fireplace', desc: 'Warm and inviting space centered around a modern electric fireplace with stone surround.' },
      { title: 'Open-Plan Living And Dining Area', desc: 'Seamlessly connected living and dining spaces with cohesive design language and smart zoning.' },
      { title: 'Traditional Indian Living Room', desc: 'Elegant blend of traditional Indian aesthetics with modern comfort, featuring jharokha-inspired wall art.' },
    ],
    'bedroom': [
      { title: 'Master Bedroom With Walk-In Closet', desc: 'Luxurious master suite with a dedicated walk-in closet featuring custom organizers and vanity area.' },
      { title: 'Serene Blue Bedroom Design', desc: 'Calming blue tones create a peaceful retreat. Features upholstered headboard and ambient lighting.' },
      { title: 'Modern Bedroom With Study Corner', desc: 'Efficiently designed bedroom incorporating a compact study area without compromising on style.' },
      { title: 'Luxury Bedroom With Panoramic View', desc: 'Floor-to-ceiling windows frame stunning views while plush furnishings ensure ultimate comfort.' },
      { title: 'Compact Guest Bedroom Design', desc: 'Smart design maximizes a small space with built-in storage, murphy bed option, and multi-functional furniture.' },
      { title: 'Romantic Bedroom With Canopy Bed', desc: 'Elegant canopy bed design with sheer drapes, warm lighting, and premium silk bedding.' },
    ],
  };

  // Default items for categories not explicitly defined
  const defaultItems = Array(6).fill(null).map((_, i) => ({
    title: `${categoryName} Design ${i + 1}`,
    desc: `A beautiful ${categoryName.toLowerCase()} design featuring modern aesthetics, premium materials, and thoughtful space planning. Perfect for contemporary homes seeking elegance and functionality.`,
  }));

  const items = designs[categoryId] || defaultItems;

  return items.map((item, i) => ({
    id: `${categoryId}-${i}`,
    categoryId,
    categoryName,
    title: item.title,
    description: item.desc,
    image: `https://picsum.photos/seed/${categoryId}-${i}/600/400`,
    features: ['Premium Materials', 'Custom Design', 'Space Optimization', 'Modern Aesthetics', 'Durable Finish'],
    dimensions: '10ft x 12ft (approx.)',
    priceRange: '₹2,50,000 - ₹5,00,000',
  }));
}

/* ── Generate all items ── */
const ALL_ITEMS = {};
CATEGORIES.filter(c => c.id !== 'all').forEach(cat => {
  ALL_ITEMS[cat.id] = generateItems(cat.id, cat.name);
});

/* ── Category Card for "All" view ── */
const CATEGORY_IMAGES = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
  ...cat,
  image: `https://picsum.photos/seed/cat-${cat.id}/600/400`,
}));

import { Suspense } from 'react';

function GalleryContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sync with URL search params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && CATEGORIES.find(c => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    window.history.pushState(null, '', catId === 'all' ? '/design-gallery' : `/design-gallery?category=${catId}`);
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

  const currentItems = activeCategory === 'all' ? [] : (ALL_ITEMS[activeCategory] || []);
  const activeCategoryName = CATEGORIES.find(c => c.id === activeCategory)?.name || '';

  return (
    <div className={styles.page}>
      {/* ── Page Header ── */}
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Home Interior Designs</h1>
          <p className={styles.pageSubtitle}>
            Explore the latest interior designs for kitchens, bedrooms, living rooms, wardrobes, and more.
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <FiChevronRight />
          <Link href="/design-gallery">Design Gallery</Link>
          {activeCategory !== 'all' && (
            <>
              <FiChevronRight />
              <span>{activeCategoryName}</span>
            </>
          )}
        </nav>
      </div>

      {/* ── Category Tabs ── */}
      <div className={styles.container}>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className={styles.container}>
        {activeCategory === 'all' ? (
          /* ── Top Categories Grid ── */
          <div className={styles.categoriesSection}>
            <h2 className={styles.categoriesTitle}>Top Categories</h2>
            <div className={styles.categoriesGrid}>
              {CATEGORY_IMAGES.map((cat, i) => (
                <div
                  key={cat.id}
                  className={styles.categoryCard}
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <img src={cat.image} alt={cat.name} className={styles.categoryImage} />
                  <div className={styles.categoryOverlay}>
                    <h3>{cat.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Design Cards Grid ── */
          <div className={styles.designsSection}>
            <h2 className={styles.designsTitle}>{activeCategoryName} Designs</h2>
            <div className={styles.designsGrid}>
              {currentItems.map((item, i) => (
                <div key={item.id} className={styles.designCard} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={styles.designImageWrap}>
                    <img src={item.image} alt={item.title} className={styles.designImage} />
                  </div>
                  <div className={styles.designCardBody}>
                    <h3 className={styles.designCardTitle}>{item.title}</h3>
                    <div className={styles.designCardActions}>
                      <button className={styles.btnQuote}>Get a Quote</button>
                      <button className={styles.btnExplore} onClick={() => openSidebar(item)}>
                        Explore more <FiChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sidebar Drawer ── */}
      {sidebarOpen && <div className={styles.backdrop} onClick={closeSidebar}></div>}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <button className={styles.sidebarClose} onClick={closeSidebar}><FiX /></button>
        {selectedItem && (
          <div className={styles.sidebarContent}>
            <img src={selectedItem.image} alt={selectedItem.title} className={styles.sidebarImage} />
            <h2 className={styles.sidebarTitle}>{selectedItem.title}</h2>
            <p className={styles.sidebarCategory}>{selectedItem.categoryName}</p>
            <p className={styles.sidebarDesc}>{selectedItem.description}</p>

            <div className={styles.sidebarSection}>
              <h4>Key Features</h4>
              <ul className={styles.featuresList}>
                {selectedItem.features.map((f, i) => (
                  <li key={i}><FiChevronRight className={styles.featureIcon} /> {f}</li>
                ))}
              </ul>
            </div>

            <div className={styles.sidebarSection}>
              <h4>Dimensions</h4>
              <p>{selectedItem.dimensions}</p>
            </div>

            <div className={styles.sidebarSection}>
              <h4>Price Range</h4>
              <p className={styles.priceRange}>{selectedItem.priceRange}</p>
            </div>

            <div className={styles.sidebarActions}>
              <button className={styles.btnPrimary}>Get a Quote <FiArrowRight /></button>
              <button className={styles.btnOutline}>Book Consultation</button>
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
