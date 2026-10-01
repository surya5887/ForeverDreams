'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FiChevronRight, FiMapPin, FiArrowRight, FiX, FiChevronLeft } from 'react-icons/fi';
import { FaTag, FaPlayCircle } from 'react-icons/fa';
import { useQuoteContext } from '@/context/QuoteContext';
import styles from './page.module.css';
import glossixMedia from './glossix_media.json';

const FILTERS = ['All', 'Residential', 'Commercial', 'Glossix Gallery'];

export default function RecentProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  
  // For Glossix Gallery specifically
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);

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
        
        if (fetched.length === 0) {
          setProjects([]);
        } else {
          setProjects(fetched.map(p => ({
            ...p,
            images: p.images && p.images.length > 0 ? p.images : (p.image ? [p.image] : [])
          })));
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

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images) {
      setSliderIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject && selectedProject.images) {
      setSliderIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
    }
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    setMediaIndex((prev) => (prev === glossixMedia.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    setMediaIndex((prev) => (prev === 0 ? glossixMedia.length - 1 : prev - 1));
  };

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
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

      {/* Filter Tabs */}
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

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className={styles.container}>
          {activeFilter === 'Glossix Gallery' ? (
             <div className={styles.glossixMediaGrid}>
                {glossixMedia.map((media, i) => (
                  <div key={i} className={styles.glossixMediaItem} onClick={() => { setMediaIndex(i); setSelectedMedia(media); }}>
                    {media.type === 'video' ? (
                      <>
                        <video src={media.url.replace('/upload/', '/upload/ac_none/')} className={styles.glossixThumb} muted playsInline />
                        <div className={styles.glossixPlayBtn}><FaPlayCircle /></div>
                      </>
                    ) : (
                      <img src={media.url} alt="Glossix Gallery" className={styles.glossixThumb} />
                    )}
                  </div>
                ))}
             </div>
          ) : (
            isLoading ? (
              <p style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>Loading projects...</p>
            ) : (
              <div className={styles.projectsGrid}>
                {filteredProjects.map((project, i) => (
                  <div key={project.id} className={styles.projectCard} style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className={styles.projectImageWrap}>
                      <img src={project.images && project.images[0] ? project.images[0] : project.image} alt={project.title} className={styles.projectImage} />
                      {project.category && (
                        <span className={styles.categoryBadge}>
                          <FaTag /> {project.category}
                        </span>
                      )}
                    </div>
                    <div className={styles.projectInfo}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <div style={{ marginTop: '1rem' }}>
                        <button onClick={(e) => { e.preventDefault(); setSelectedProject(project); setSliderIndex(0); }} style={{display: 'inline-block', textAlign: 'center', border: 'none', cursor: 'pointer', width: '100%', padding: '0.8rem', borderRadius: '4px', backgroundColor: '#b98e46', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem'}}>
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* Modal for Normal Project Images Slider */}
      {selectedProject && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setSelectedProject(null)}
        >
          <button 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10000 }}
            onClick={() => setSelectedProject(null)}
          >
            <FiX size={40} />
          </button>
          
          <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
            {selectedProject.images && selectedProject.images.length > 1 && (
              <button 
                onClick={prevImage} 
                style={{ position: 'absolute', left: '10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white', padding: '15px', cursor: 'pointer', zIndex: 10 }}
              >
                <FiChevronLeft size={30} />
              </button>
            )}

            <img 
              src={selectedProject.images ? selectedProject.images[sliderIndex] : selectedProject.image} 
              alt="Project Image" 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', borderRadius: '8px' }} 
            />

            {selectedProject.images && selectedProject.images.length > 1 && (
              <button 
                onClick={nextImage} 
                style={{ position: 'absolute', right: '10px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white', padding: '15px', cursor: 'pointer', zIndex: 10 }}
              >
                <FiChevronRight size={30} />
              </button>
            )}
          </div>
          
          <div style={{ color: '#fff', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {selectedProject.title}
          </div>
        </div>
      )}

      {/* Modal for Glossix Gallery (Images + Videos) */}
      {selectedMedia && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setSelectedMedia(null)}
        >
          <button 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10000 }}
            onClick={() => setSelectedMedia(null)}
          >
            <FiX size={40} />
          </button>
          
          <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={(e) => { e.stopPropagation(); prevMedia(); setSelectedMedia(glossixMedia[mediaIndex === 0 ? glossixMedia.length - 1 : mediaIndex - 1]); }} 
              style={{ position: 'absolute', left: '0px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white', padding: '15px', cursor: 'pointer', zIndex: 10 }}
            >
              <FiChevronLeft size={30} />
            </button>

            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.url.replace('/upload/', '/upload/ac_none/')} 
                controls 
                autoPlay 
                muted
                style={{ maxHeight: '100%', maxWidth: '100%', outline: 'none', borderRadius: '8px', boxShadow: '0 10px 40px rgba(185, 142, 70, 0.3)' }} 
              />
            ) : (
              <img 
                src={selectedMedia.url} 
                alt="Glossix Fullscreen" 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 10px 40px rgba(185, 142, 70, 0.3)' }} 
              />
            )}

            <button 
              onClick={(e) => { e.stopPropagation(); nextMedia(); setSelectedMedia(glossixMedia[mediaIndex === glossixMedia.length - 1 ? 0 : mediaIndex + 1]); }} 
              style={{ position: 'absolute', right: '0px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white', padding: '15px', cursor: 'pointer', zIndex: 10 }}
            >
              <FiChevronRight size={30} />
            </button>
          </div>
          
          <div style={{ color: '#b98e46', marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
             Glossix Gallery - {mediaIndex + 1} / {glossixMedia.length}
          </div>
        </div>
      )}

    </div>
  );
}
