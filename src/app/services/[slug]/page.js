import Link from 'next/link';
import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import styles from './page.module.css';

const servicesData = {
  residential: {
    title: 'Residential Interior',
    desc: 'Transform your home into a personalized sanctuary with our residential interior design services. From living rooms and bedrooms to complete home makeovers, our expert designers blend comfort, style, and functionality to create spaces you will love to live in.',
  },
  commercial: {
    title: 'Commercial Interior',
    desc: 'Elevate your business environment with our commercial interior design solutions. We create functional, inspiring, and productive spaces for corporate offices, retail stores, restaurants, and hospitality venues that reflect your brand identity and impress your clients.',
  },
  kitchen: {
    title: 'Modular Kitchen',
    desc: 'Discover the perfect blend of aesthetics and utility with our modular kitchen designs. We offer smart, space-saving, and highly functional kitchens tailored to your cooking style and storage needs, using premium materials for lasting durability.',
  },
  furniture: {
    title: 'Furniture & Decor',
    desc: 'Complete your space with our curated selection of furniture and decor. Whether you need custom-built pieces or handpicked accessories, we help you choose elements that harmonize with your interior theme and add a unique touch of elegance.',
  },
  turnkey: {
    title: 'Turnkey Projects',
    desc: 'Experience a hassle-free design journey with our end-to-end turnkey solutions. From conceptualization and layout planning to execution and final handover, our dedicated team manages every aspect of your project, ensuring timely delivery and impeccable quality.',
  },
  '3d-design': {
    title: '3D Design & Visual',
    desc: 'Visualize your dream space before it is built with our realistic 3D design and rendering services. We provide detailed 3D walkthroughs and high-quality renders, allowing you to make informed decisions about colors, textures, and spatial arrangements.',
  }
};

export default function ServicePage({ params }) {
  const { slug } = params;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Service not found</h2>
          <Link href="/about-us#contact-form" style={{ color: 'var(--accent-color)' }}>Contact Us</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <FiChevronRight />
            <span>Services</span>
            <FiChevronRight />
            <span>{service.title}</span>
          </nav>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Expert {service.title} Services</h2>
          <p className={styles.serviceDesc}>{service.desc}</p>
          <Link href="/about-us#contact-form" className={styles.ctaBtn}>
            BOOK A CONSULTATION <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
