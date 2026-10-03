'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { FiArrowRight, FiPlay, FiPhone, FiMail, FiArrowLeft, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  FaWhatsapp, FaHome, FaCity, FaUtensils, FaCouch, FaKey, FaCubes,
  FaLightbulb, FaAward, FaClock, FaHeart, FaStar, FaQuoteLeft,
  FaUsers, FaClipboardList, FaPencilRuler, FaHardHat, FaCheckCircle,
} from 'react-icons/fa';
import { useQuoteContext } from '../context/QuoteContext';
import styles from './page.module.css';

export default function Home() {
  const { openQuote } = useQuoteContext();
  const [recentProjects, setRecentProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sitePhone, setSitePhone] = useState('+91 9540005981');

  const [heroImages, setHeroImages] = useState([
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750257/forever_dreams/sijrevxyb3vfuoivdefr.jpg", // Living Room
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750258/forever_dreams/ulnfnjhhoe1y29givcqe.jpg", // Modular Kitchen
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750259/forever_dreams/lkcjgrskfalpfxlasdza.jpg", // Bedroom
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750260/forever_dreams/acxkdjen0hjnd3cb6dkg.jpg", // Kids Bedroom
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750261/forever_dreams/uooub09ut76eeqvoe1iy.jpg", // Wardrobe
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750262/forever_dreams/aabv1jnbwy0n8k3dtacu.jpg", // Dining Room
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750263/forever_dreams/aftvkqpzur1hvmnzmrrz.jpg", // Pooja Room
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750264/forever_dreams/dvizjbmofrotnqyylulf.jpg", // Space Saving
    "https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750265/forever_dreams/owkdkcxncs0w1smf6esm.jpg", // Home Office
    "https://res.cloudinary.com/waqkndtu/image/upload/v1784013580/forever_dreams/sod6iuec4rttivd74z44.jpg"  // Bathroom
  ]);

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const docRef = doc(db, 'settings', 'heroImages');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().images && docSnap.data().images.length > 0) {
          setHeroImages(docSnap.data().images);
        }
        // Also fetch general settings for phone number
        const generalRef = doc(db, 'settings', 'general');
        const generalSnap = await getDoc(generalRef);
        if (generalSnap.exists() && generalSnap.data().phone) {
          setSitePhone(generalSnap.data().phone);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3500); // 3.5s total: 2s hold + 1.5s crossfade
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const hasTriggered = sessionStorage.getItem('homePopupTriggered');

    if (!hasTriggered) {
      const timer = setTimeout(() => {
        openQuote();
        sessionStorage.setItem('homePopupTriggered', 'true');
      }, 3000);

      const handleUnload = () => {
        sessionStorage.removeItem('homePopupTriggered');
      };
      window.addEventListener('beforeunload', handleUnload);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, [openQuote]);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const q = query(collection(db, 'recentProjects'), limit(8));
        const snap = await getDocs(q);
        const projects = [];
        snap.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));

        // If empty, use fallbacks temporarily until seeded
        if (projects.length === 0) {
          setRecentProjects([
            { id: 1, title: 'Design & Execution: AWHO 4BHK Apartment | Client – Col. Jabar Chaudhary', category: 'Residential', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80'] },
            { id: 2, title: 'Design & Execution: Purvanchal Height, ETA-2 – 4BHK Apartment | Client – Anil Chaudhary', category: 'Residential', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'] },
            { id: 3, title: 'Design Consultant: Rise Resort Residences – Sports Villa | Client – Adv. Rahul Singh', category: 'Residential', images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=80', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80'] },
            { id: 4, title: 'Design Consultant: Windsor Society, Sector-50 | Client – Mr. Rajeev Chadha', category: 'Residential', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=1200&q=80'] }
          ]);
        } else {
          setRecentProjects(projects.map(p => ({
            ...p,
            images: p.images && p.images.length > 0 ? p.images : (p.imageUrl ? [p.imageUrl] : [])
          })));
        }
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchRecentProjects();
  }, []);

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

  return (
    <div className={styles.page}>

      <section className={styles.hero}>
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`${styles.heroImageSlide} ${index === currentImageIndex ? styles.activeSlide : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <div className={styles.heroTitle}>
            Where Home<br />
            Breathes <span className={styles.heroTitleScript}>Beauty</span>
          </div>
          
          <h1 className={styles.heroSubtitle}>
            Top Rated Interior Designer in Noida, Greater Noida, Delhi NCR, Gurugram, Ghaziabad, Faridabad, Meerut, Agra, Mathura, Aligarh, Muzaffarnagar & Western UP. We specialize in luxury residential interiors, turnkey commercial spaces, modular kitchens, and bespoke home decor.
          </h1>

          <div className={styles.heroActions} style={{ flexDirection: 'column', gap: '1rem' }}>
            <Link href="/design-gallery" className={styles.primaryBtn}>
              EXPLORE OUR WORK <FiArrowRight style={{ color: '#e60000' }} />
            </Link>
            <a href={`tel:${sitePhone.replace(/\\D/g, '')}`} className={styles.callBtnAnimated}>
              <FiPhone style={{ marginRight: '0.5rem' }} /> CALL {sitePhone}
            </a>
          </div>
        </div>
      </section>

      {/* ── TOP FEATURES BAR ── */}
      <section className={styles.featuresBar}>
        <div className={styles.container}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap} style={{ background: '#ff3366' }}>
                <FaLightbulb color="#fff" />
              </div>
              <div className={styles.featureTextWrap}>
                <h4 className={styles.featureTitle}>Creative Designs</h4>
                <p className={styles.featureDesc}>Unique ideas that bring your vision to life</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap} style={{ background: '#f59e0b' }}>
                <FaAward color="#fff" />
              </div>
              <div className={styles.featureTextWrap}>
                <h4 className={styles.featureTitle}>Premium Quality</h4>
                <p className={styles.featureDesc}>Top quality materials with perfect finish</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap} style={{ background: '#0ea5e9' }}>
                <FaClock color="#fff" />
              </div>
              <div className={styles.featureTextWrap}>
                <h4 className={styles.featureTitle}>On-Time Delivery</h4>
                <p className={styles.featureDesc}>Timely execution is our promise</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap} style={{ background: '#8b5cf6' }}>
                <FaHeart color="#fff" />
              </div>
              <div className={styles.featureTextWrap}>
                <h4 className={styles.featureTitle}>Customer Satisfaction</h4>
                <p className={styles.featureDesc}>Your happiness is our success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionLabelColored}>OUR SERVICES</span>
            <h2 className={styles.sectionTitleDark}>Designing Spaces You'll Love</h2>
          </div>

          <div className={styles.servicesGrid}>
            {[
              { icon: <FaCouch style={{ color: '#e91e63' }} />, title: 'Residential Interior', desc: 'Comfortable, stylish and personalized home interiors.', color: '#e91e63', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750267/forever_dreams/qtfg2zckye75uggwnwf1.jpg' },
              { icon: <FaCity style={{ color: '#00bcd4' }} />, title: 'Commercial Interior', desc: 'Functional and productive spaces for your business.', color: '#00bcd4', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750269/forever_dreams/dkllkmcgbttozt5zfrcj.jpg' },
              { icon: <FaUtensils style={{ color: '#ff9800' }} />, title: 'Modular Kitchen', desc: 'Smart, stylish & space-saving kitchen designs.', color: '#ff9800', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750269/forever_dreams/ocrmulfb3m4pv1aythgx.jpg' },
              { icon: <FaLightbulb style={{ color: '#8b5cf6' }} />, title: 'Furniture & Decor', desc: 'Handpicked furniture & decor to complete your space.', color: '#8b5cf6', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750271/forever_dreams/zeghr4goophlzwuzm8cv.jpg' },
              { icon: <FaKey style={{ color: '#3b82f6' }} />, title: 'Turnkey Projects', desc: 'End-to-end solutions with hassle-free execution.', color: '#3b82f6', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750271/forever_dreams/ostzzbdzni37s4eaidlj.jpg' },
              { icon: <FaCubes style={{ color: '#4caf50' }} />, title: '3D Design & Visual', desc: 'Realistic 3D renders to visualize your dream space.', color: '#4caf50', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750272/forever_dreams/aftbvlqyl0oj4amvbce4.jpg' }
            ].map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceImgWrap}>
                  <img src={service.img} alt={service.title} className={styles.serviceImg} />
                  <div className={styles.serviceIconFloating}>
                    {service.icon}
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.desc}</p>
                  <Link href="/design-gallery" className={styles.exploreLink} style={{ color: service.color }}>
                    DISCOVER MORE <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT WORK ── */}
      <section id="recent-work" className={styles.recentWorkSection}>
        <div className={styles.container}>
          <div className={styles.recentHeader}>
            <div>
              <span className={styles.sectionLabelDark}>OUR RECENT WORK</span>
              <h2 className={styles.sectionTitleDark}>Spaces That Speak Style</h2>
            </div>
            <Link href="/design-gallery" className={styles.viewAllBtn}>
              VIEW ALL PROJECTS <FiArrowRight />
            </Link>
          </div>

          <div className={styles.recentCarouselWrap}>
            <button className={styles.navBtnLeft}><FiArrowLeft /></button>
            <div className={styles.recentCarousel}>
              {recentProjects.map((proj, idx) => (
                <div key={proj.id || idx} className={styles.recentCard}>
                  <img src={proj.images && proj.images[0] ? proj.images[0] : (proj.imageUrl || proj.img)} alt={proj.title} className={styles.recentCardImg} />
                  <div className={styles.recentCardOverlay}>
                    <h4 className={styles.recentCardTitle}>{proj.title}</h4>
                    <p className={styles.recentCardLoc}>{proj.location || proj.loc}</p>
                    <button onClick={(e) => { e.preventDefault(); setSelectedProject(proj); setSliderIndex(0); }} style={{display: 'inline-block', marginTop: '10px', textAlign: 'center', border: 'none', cursor: 'pointer', padding: '0.6rem 1rem', borderRadius: '4px', backgroundColor: '#b98e46', color: '#fff', fontWeight: 'bold', fontSize: '0.85rem'}}>
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.navBtnRight}><FiArrowRight /></button>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE SPACES (BENTO BOX GALLERY) ── */}
      <section id="curated-gallery" className={styles.bentoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionLabelColored}>SIGNATURE SPACES</span>
            <h2 className={styles.sectionTitleDark}>A Curated Gallery</h2>
          </div>

          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoItem} ${styles.bentoLarge}`}>
              <img src="https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750273/forever_dreams/k1eppouctxyfzn50dhch.jpg" alt="Luxury Living" className={styles.bentoImg} />
              <div className={styles.bentoOverlay}>
                <h4>The Minimalist Villa</h4>
                <p>Living Room</p>
              </div>
            </div>
            <div className={styles.bentoItem}>
              <img src="https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750274/forever_dreams/grvrxfyoi88nbrzr3cb3.jpg" alt="Modern Kitchen" className={styles.bentoImg} />
              <div className={styles.bentoOverlay}>
                <h4>Urban Loft</h4>
                <p>Kitchen</p>
              </div>
            </div>
            <div className={styles.bentoItem}>
              <img src="https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750275/forever_dreams/y1va7tzuvlx6wmo6gbmx.jpg" alt="Elegant Bedroom" className={styles.bentoImg} />
              <div className={styles.bentoOverlay}>
                <h4>Serene Suite</h4>
                <p>Bedroom</p>
              </div>
            </div>
            <div className={`${styles.bentoItem} ${styles.bentoWide}`}>
              <img src="https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750276/forever_dreams/j4xjiqm6q77hmtcg3oso.jpg" alt="Cozy Dining" className={styles.bentoImg} />
              <div className={styles.bentoOverlay}>
                <h4>The Grand Estate</h4>
                <p>Dining Area</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN PHILOSOPHY (SPLIT LAYOUT) ── */}
      <section className={styles.philosophySection}>
        <div className={styles.philosophyLeft}>
          <img src="https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750278/forever_dreams/pjd34a1khyk6vmrccwlk.jpg" alt="Design Philosophy" className={styles.philosophyImg} />
        </div>
        <div className={styles.philosophyRight}>
          <span className={styles.sectionLabelColored}>OUR PHILOSOPHY</span>
          <h2 className={styles.philosophyTitle}>Art in Every Detail, Soul in Every Space.</h2>
          <p className={styles.philosophyText}>
            We believe that a well-designed space is a reflection of its inhabitants. Our approach blends timeless elegance with modern functionality, creating environments that don't just look beautiful, but feel intimately yours.
          </p>
          <div className={styles.philosophySignature}>
            Elena Rostova <br /> <span>Lead Designer</span>
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionLabelColored}>OUR PROCESS</span>
            <h2 className={styles.sectionTitleDark}>From Concept To Creation</h2>
          </div>
        </div>

        <div className={styles.processWrap}>
          {/* Full width base image */}
          <img src="/process-bg.png" alt="Our Process" className={styles.processBaseImage} />

          {/* Overlay content positioned cleanly on the left empty space of the image */}
          <div className={styles.processContentOverlay}>
            <div className={styles.timelineDottedLine}></div>
            {[
              { num: '01', icon: <FaUsers />, color: '#e91e63', title: 'Consultation', desc: 'We listen to your ideas and understand your requirements.' },
              { num: '02', icon: <FaClipboardList />, color: '#ff9800', title: 'Planning', desc: 'We plan the perfect design and layout for your space.' },
              { num: '03', icon: <FaPencilRuler />, color: '#00bcd4', title: 'Design & Develop', desc: 'Our experts design and develop your dream space.' },
              { num: '04', icon: <FaHardHat />, color: '#8b5cf6', title: 'Execution', desc: 'We execute the plan with precision and quality.' },
              { num: '05', icon: <FaCheckCircle />, color: '#4caf50', title: 'Handover', desc: 'On-time delivery with perfect finishing and satisfaction.' }
            ].map((step, idx) => (
              <div key={idx} className={styles.processStepOverlay}>
                <div className={styles.processIconWrapOverlay} style={{ color: step.color }}>
                  {step.icon}
                </div>
                <div className={styles.processTextWrapOverlay}>
                  <div className={styles.timelineNum} style={{ color: step.color }}>{step.num}</div>
                  <h4 className={styles.timelineTitle}>{step.title}</h4>
                  <p className={styles.timelineDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionLabelColored}>TESTIMONIALS</span>
            <div className={styles.testimonialTitleWrap}>
              <span className={styles.testLine}></span>
              <h2 className={styles.sectionTitleDark}>What Our Clients Say</h2>
              <span className={styles.testLine}></span>
            </div>
          </div>

          <div className={styles.testGridWrapper}>
            <div className={styles.testGridTrack}>
              {[
                { name: 'Pooja Sharma', loc: 'Noida', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750280/forever_dreams/r1cyx1d0v4l0truhwxy5.jpg', text: 'Glossix Design transformed our house into a dream home. Their creativity and attention to detail is simply amazing!' },
                { name: 'Rahul Verma', loc: 'Delhi', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750281/forever_dreams/ejiuhe9ubhjfutap3fqo.png', text: 'Professional team, on-time delivery and excellent execution. Highly recommended for interior design!' },
                { name: 'Anjali Mehta', loc: 'Meerut', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750282/forever_dreams/lcfnjoclfpzb6cydrqr6.jpg', text: 'They understood our needs perfectly and designed a space that feels just right. Thank you Glossix!' },
                { name: 'Sameer Desai', loc: 'Mumbai', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750283/forever_dreams/v1vxolsyl51huvvkcce2.jpg', text: 'The 3D visualizations were spot on. What we saw is exactly what we got. Brilliant work!' },
                { name: 'Kavita Singh', loc: 'Gurugram', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750284/forever_dreams/nzhpn6xfmrollx8cvube.jpg', text: 'Our modular kitchen is not only beautiful but incredibly functional. Glossix truly knows their craft.' },
                { name: 'Rohan Kapoor', loc: 'Pune', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750285/forever_dreams/iof9kib7kemgfxrazk73.jpg', text: 'From concept to execution, the process was seamless. The turnkey solution saved us so much time.' },
                { name: 'Neha Gupta', loc: 'Bangalore', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750286/forever_dreams/dix8mby4h2qlmc0s0wys.jpg', text: 'I loved the furniture selection! They curated pieces that perfectly matched our vibrant personality.' },
                { name: 'Vikram Sing', loc: 'Hyderabad', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750286/forever_dreams/hb1012jb15lfv0rdg2am.jpg', text: 'Amazing commercial interior design for our new office. It completely transformed our workspace vibe.' },
                { name: 'Sneha Reddy', loc: 'Chennai', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750287/forever_dreams/tcyzkmfof3wcemstj02c.avif', text: 'Exceptional service and extremely polite staff. They listened to every small detail we asked for.' },
                // Duplicate for infinite scroll
                { name: 'Pooja Sharma', loc: 'Noida', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750280/forever_dreams/r1cyx1d0v4l0truhwxy5.jpg', text: 'Glossix Design transformed our house into a dream home. Their creativity and attention to detail is simply amazing!' },
                { name: 'Rahul Verma', loc: 'Delhi', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750281/forever_dreams/ejiuhe9ubhjfutap3fqo.png', text: 'Professional team, on-time delivery and excellent execution. Highly recommended for interior design!' },
                { name: 'Anjali Mehta', loc: 'Meerut', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750282/forever_dreams/lcfnjoclfpzb6cydrqr6.jpg', text: 'They understood our needs perfectly and designed a space that feels just right. Thank you Glossix!' },
                { name: 'Sameer Desai', loc: 'Mumbai', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750283/forever_dreams/v1vxolsyl51huvvkcce2.jpg', text: 'The 3D visualizations were spot on. What we saw is exactly what we got. Brilliant work!' },
                { name: 'Kavita Singh', loc: 'Gurugram', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750284/forever_dreams/nzhpn6xfmrollx8cvube.jpg', text: 'Our modular kitchen is not only beautiful but incredibly functional. Glossix truly knows their craft.' },
                { name: 'Rohan Kapoor', loc: 'Pune', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750285/forever_dreams/iof9kib7kemgfxrazk73.jpg', text: 'From concept to execution, the process was seamless. The turnkey solution saved us so much time.' },
                { name: 'Neha Gupta', loc: 'Bangalore', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750286/forever_dreams/dix8mby4h2qlmc0s0wys.jpg', text: 'I loved the furniture selection! They curated pieces that perfectly matched our vibrant personality.' },
                { name: 'Vikram Rathore', loc: 'Hyderabad', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750286/forever_dreams/hb1012jb15lfv0rdg2am.jpg', text: 'Amazing commercial interior design for our new office. It completely transformed our workspace vibe.' },
                { name: 'Sneha Reddy', loc: 'Chennai', img: 'https://res.cloudinary.com/fnrtbqfx/image/upload/v1790750287/forever_dreams/tcyzkmfof3wcemstj02c.avif', text: 'Exceptional service and extremely polite staff. They listened to every small detail we asked for.' }
              ].map((test, idx) => (
                <div key={idx} className={styles.testCard}>
                  <div className={styles.testCardContent}>
                    <div className={styles.testCardTop}>
                      <FaQuoteLeft className={styles.quoteIcon} />
                      <div className={styles.testUser}>
                        <img src={test.img} alt={test.name} className={styles.testUserImg} />
                      </div>
                    </div>
                    <div className={styles.stars}>
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <p className={styles.testText}>{test.text}</p>
                    <div className={styles.testUserInfo}>
                      <h5 className={styles.testUserName}>{test.name}</h5>
                      <span className={styles.testUserLoc}>- {test.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ROOM (HOTSPOTS) ── */}
      <section id="shop-the-look" className={styles.interactiveRoomSection}>
        <div className={styles.interactiveRoomHeader}>
          <span className={styles.sectionLabelColored}>EXPLORE THE DETAILS</span>
          <h2 className={styles.sectionTitleDark}>Shop The Look</h2>
        </div>
        <div className={styles.interactiveImageWrap}>
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Interactive Room" className={styles.interactiveImg} />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaChairIcon}>🪑</div>
            </div>
            <div className={styles.ctaCenter}>
              <h2 className={styles.ctaTitle}>Let's Create Something Beautiful Together!</h2>
              <p className={styles.ctaDesc}>Book a free consultation with our design experts.</p>
            </div>
            <div className={styles.ctaRight}>
              <Link href="/about-us#contact-form" className={styles.ctaBtnWhite}>
                BOOK FREE CONSULTATION <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}