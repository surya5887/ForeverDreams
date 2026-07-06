'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiChevronRight, FiMapPin, FiArrowRight, FiX } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';
import styles from './page.module.css';

const FILTERS = ['All', 'Residential', 'Commercial'];

export default function RecentProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const category = searchParams.get('category');
      if (category && FILTERS.includes(category)) {
        setActiveFilter(category);
      }
    }
  }, []);

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
            { id: 1, title: 'Modern Villa Interior', location: 'Meerut', category: 'Residential', description: 'A complete interior makeover of a 4BHK villa with contemporary design elements, custom furniture, and smart home integration.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', clientName: 'Mr. & Mrs. Sharma', projectArea: '4500 sq ft', duration: '6 Months', year: '2023' },
            { id: 2, title: 'Corporate Office Design', location: 'Noida', category: 'Commercial', description: 'Designed a 5000 sq ft office space with open workstations, conference rooms, and a stunning reception area.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', clientName: 'TechCorp Pvt Ltd', projectArea: '5000 sq ft', duration: '3 Months', year: '2024' },
            { id: 3, title: 'Luxury Apartment', location: 'Delhi', category: 'Residential', description: 'Premium 3BHK apartment featuring Italian marble flooring, custom lighting, and bespoke furniture throughout.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', clientName: 'Gupta Family', projectArea: '2200 sq ft', duration: '4 Months', year: '2023' },
            { id: 4, title: 'Restaurant Interior', location: 'Gurugram', category: 'Commercial', description: 'A fine-dining restaurant with ambient lighting, custom seating, and a sophisticated bar area design.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', clientName: 'The Culinary Cloud', projectArea: '3000 sq ft', duration: '5 Months', year: '2024' },
            { id: 5, title: '3 BHK Flat Makeover', location: 'Meerut', category: 'Residential', description: 'Complete renovation of a 3BHK flat with modular kitchen, false ceilings, and space-saving storage solutions.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', clientName: 'Mr. Singh', projectArea: '1800 sq ft', duration: '2 Months', year: '2023' },
            { id: 6, title: 'Boutique Hotel Lobby', location: 'Delhi', category: 'Commercial', description: 'Luxurious hotel lobby design featuring crystal chandeliers, premium seating, and a grand reception desk.', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80', clientName: 'Grand Stay Hotels', projectArea: '2500 sq ft', duration: '4 Months', year: '2024' },
            { id: 7, title: 'Farmhouse Renovation', location: 'Greater Noida', category: 'Residential', description: 'Rustic-modern farmhouse interior with exposed brick walls, wooden beams, and contemporary furnishings.', image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=80', clientName: 'Dr. Arora', projectArea: '6000 sq ft', duration: '8 Months', year: '2022' },
            { id: 8, title: 'Dental Clinic Interior', location: 'Meerut', category: 'Commercial', description: 'Calm and professional clinic design with soothing colors, ergonomic furniture, and patient-friendly layout.', image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80', clientName: 'Smile Care Clinic', projectArea: '1200 sq ft', duration: '2 Months', year: '2023' },
            { id: 9, title: 'Penthouse Design', location: 'Noida', category: 'Residential', description: 'Ultra-luxury penthouse with panoramic views, designer furniture, home theater, and private terrace garden.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', clientName: 'Confidential', projectArea: '5500 sq ft', duration: '10 Months', year: '2024' }
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

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setSidebarOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300); // Wait for transition
    document.body.style.overflow = 'auto';
  };

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
                      <button className={styles.viewBtn} onClick={() => handleViewDetails(project)}>View Details <FiArrowRight /></button>
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

      {/* ── Project Details Sidebar ── */}
      <div className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.sidebarOverlayOpen : ''}`} onClick={closeSidebar}>
        <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Project Details</h2>
            <button className={styles.closeBtn} onClick={closeSidebar}>
              <FiX />
            </button>
          </div>
          
          {selectedProject && (
            <div className={styles.sidebarContent}>
              <img src={selectedProject.image} alt={selectedProject.title} className={styles.sidebarImage} />
              
              <div className={styles.sidebarDetails}>
                <h3 className={styles.projectTitle} style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{selectedProject.title}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '1rem 0', background: '#fcfaf8', padding: '1.5rem', borderRadius: '12px' }}>
                  {selectedProject.location && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Location</span>
                      <span className={styles.detailValue}>{selectedProject.location}</span>
                    </div>
                  )}
                  {selectedProject.category && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Category</span>
                      <span className={styles.detailValue}>{selectedProject.category}</span>
                    </div>
                  )}
                  {selectedProject.clientName && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Client</span>
                      <span className={styles.detailValue}>{selectedProject.clientName}</span>
                    </div>
                  )}
                  {selectedProject.projectArea && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Area</span>
                      <span className={styles.detailValue}>{selectedProject.projectArea}</span>
                    </div>
                  )}
                  {selectedProject.duration && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Duration</span>
                      <span className={styles.detailValue}>{selectedProject.duration}</span>
                    </div>
                  )}
                  {selectedProject.year && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Year</span>
                      <span className={styles.detailValue}>{selectedProject.year}</span>
                    </div>
                  )}
                </div>

                <div className={styles.detailRow} style={{ marginTop: '0.5rem' }}>
                  <span className={styles.detailLabel}>Description</span>
                  <p className={styles.detailValue} style={{ lineHeight: '1.7', color: '#555', fontSize: '1rem' }}>
                    {selectedProject.description || 'No description available for this project.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
