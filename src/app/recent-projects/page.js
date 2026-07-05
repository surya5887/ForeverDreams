'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiChevronRight, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';
import styles from './page.module.css';

const FILTERS = ['All', 'Residential', 'Commercial'];

export default function RecentProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(db, 'recentProjects'));
        const fetched = [];
        snap.forEach(doc => {
          const data = doc.data();
          fetched.push({ id: doc.id, ...data, image: data.imageUrl || data.image });
        });
        
        // Use fallbacks only if DB is empty
        if (fetched.length === 0) {
          setProjects([
            { id: 1, title: 'Modern Villa Interior', location: 'Meerut', category: 'Residential', description: 'A complete interior makeover of a 4BHK villa with contemporary design elements, custom furniture, and smart home integration.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80' },
            { id: 2, title: 'Corporate Office Design', location: 'Noida', category: 'Commercial', description: 'Designed a 5000 sq ft office space with open workstations, conference rooms, and a stunning reception area.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
            { id: 3, title: 'Luxury Apartment', location: 'Delhi', category: 'Residential', description: 'Premium 3BHK apartment featuring Italian marble flooring, custom lighting, and bespoke furniture throughout.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80' },
            { id: 4, title: 'Restaurant Interior', location: 'Gurugram', category: 'Commercial', description: 'A fine-dining restaurant with ambient lighting, custom seating, and a sophisticated bar area design.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80' },
            { id: 5, title: '3 BHK Flat Makeover', location: 'Meerut', category: 'Residential', description: 'Complete renovation of a 3BHK flat with modular kitchen, false ceilings, and space-saving storage solutions.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80' },
            { id: 6, title: 'Boutique Hotel Lobby', location: 'Delhi', category: 'Commercial', description: 'Luxurious hotel lobby design featuring crystal chandeliers, premium seating, and a grand reception desk.', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80' },
            { id: 7, title: 'Farmhouse Renovation', location: 'Greater Noida', category: 'Residential', description: 'Rustic-modern farmhouse interior with exposed brick walls, wooden beams, and contemporary furnishings.', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=80' },
            { id: 8, title: 'Dental Clinic Interior', location: 'Meerut', category: 'Commercial', description: 'Calm and professional clinic design with soothing colors, ergonomic furniture, and patient-friendly layout.', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80' },
            { id: 9, title: 'Penthouse Design', location: 'Noida', category: 'Residential', description: 'Ultra-luxury penthouse with panoramic views, designer furniture, home theater, and private terrace garden.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80' }
          ]);
        } else {
          setProjects(fetched);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>OUR PORTFOLIO</span>
          <h1 className={styles.heroTitle}>Our Recent Projects</h1>
          <p className={styles.heroSubtitle}>Take a look at our latest completed interior design projects across residential and commercial spaces.</p>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <FiChevronRight />
            <span>Recent Projects</span>
          </nav>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterTabs}>
            {FILTERS.map(filter => (
              <button
                key={filter}
                className={`${styles.filterTab} ${activeFilter === filter ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          {isLoading ? (
            <p style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>Loading projects...</p>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, i) => (
                <div key={project.id} className={styles.projectCard} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={styles.projectImageWrap}>
                    <img src={project.image} alt={project.title} className={styles.projectImage} />
                    {project.category && (
                      <span className={styles.categoryBadge}>
                        <FaTag /> {project.category}
                      </span>
                    )}
                    <div className={styles.projectOverlay}>
                      <button className={styles.viewBtn}>View Details <FiArrowRight /></button>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectLocation}><FiMapPin /> {project.location}</p>
                    <p className={styles.projectDesc}>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
