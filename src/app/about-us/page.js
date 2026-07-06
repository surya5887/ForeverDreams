'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FiChevronRight, FiSend } from 'react-icons/fi';
import {
  FaBullseye, FaEye, FaLightbulb, FaGem, FaHandshake, FaHeart,
  FaMapMarkerAlt, FaPhone, FaWhatsapp, FaEnvelope, FaClock,
  FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaTwitter,
  FaCheckCircle
} from 'react-icons/fa';
import styles from './page.module.css';

const values = [
  { icon: FaLightbulb, title: 'Innovation', desc: 'We push boundaries with creative design solutions', color: '#c9a96e' },
  { icon: FaGem, title: 'Quality', desc: 'Premium materials and flawless execution', color: '#1a7a6d' },
  { icon: FaHandshake, title: 'Integrity', desc: 'Transparent pricing and honest communication', color: '#e8733a' },
  { icon: FaHeart, title: 'Customer First', desc: 'Your satisfaction is our top priority', color: '#c9a96e' },
];

export default function AboutUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const [siteSettings, setSiteSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSiteSettings(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, email, phone, subject, message } = formData;
    const adminWhatsApp = siteSettings?.whatsapp ? siteSettings.whatsapp.replace(/[^0-9]/g, '') : '911234567890';
    
    const text = `Hello Forever Dreams Home, I have an inquiry:

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Subject:* ${subject || 'General Inquiry'}

*Message:*
${message}`;

    const waUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, label: 'Address', value: siteSettings?.address || '123 Design Avenue, Meerut, Uttar Pradesh, India 250001' },
    { icon: FaPhone, label: 'Phone', value: siteSettings?.phone || '+91 12345 67890', href: siteSettings?.phone ? `tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}` : 'tel:+911234567890' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: siteSettings?.whatsapp || '+91 12345 67890', href: siteSettings?.whatsapp ? `https://wa.me/${siteSettings.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/911234567890' },
    { icon: FaEnvelope, label: 'Email', value: siteSettings?.email || 'info@foreverdreamshome.com', href: siteSettings?.email ? `mailto:${siteSettings.email}` : 'mailto:info@foreverdreamshome.com' },
    { icon: FaClock, label: 'Working Hours', value: siteSettings?.workingHours || 'Mon - Sat: 10:00 AM - 7:00 PM' },
  ];

  // Default coordinates if not set in db
  const mapLat = siteSettings?.mapLat || 28.98;
  const mapLng = siteSettings?.mapLng || 77.68;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapLat},${mapLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={styles.page}>
      {/* ── Hero Banner ── */}
      <section className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>GET TO KNOW US</span>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>Discover who we are and what drives our passion for interior design</p>
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <FiChevronRight />
            <span>About Us</span>
          </nav>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.sectionLabel}>WHO WE ARE</span>
              <h2 className={styles.sectionTitle}>Crafting Dream Interiors Since 2014</h2>
              <p>
                Forever Dreams Home Interior Design is a premier interior design firm based in Meerut, Uttar Pradesh.
                Founded with a passion for creating beautiful living spaces, we have grown into a trusted name in
                residential and commercial interior design.
              </p>
              <p>
                Our team of <strong>25+ expert designers</strong> brings creativity, functionality, and elegance to every project.
                With over <strong>10 years of experience</strong> and <strong>650+ completed projects</strong>, we transform
                ordinary spaces into extraordinary experiences.
              </p>
              <p>
                From modular kitchens to complete home makeovers, from corporate offices to luxury apartments — we bring
                your vision to life with meticulous attention to detail and uncompromising quality.
              </p>
            </div>
            <div className={styles.aboutImageWrap}>
              <img src="https://res.cloudinary.com/waqkndtu/image/upload/v1783269986/forever_dreams/about/about_team_img.jpg" alt="Our Team" className={styles.aboutImage} />
              <div className={styles.aboutImageAccent}></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className={styles.mvSection}>
        <div className={styles.container}>
          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <div className={styles.mvIconWrap}>
                <FaBullseye />
              </div>
              <h3>Our Mission</h3>
              <p>
                To create inspiring interior spaces that perfectly blend aesthetics with functionality,
                making every home a reflection of its owner&apos;s dreams and personality.
              </p>
            </div>
            <div className={styles.mvCard}>
              <div className={styles.mvIconWrap}>
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and innovative interior design company in North India,
                setting new standards of excellence in every project we undertake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <span className={styles.sectionLabelCenter}>OUR VALUES</span>
          <h2 className={styles.sectionTitleCenter}>What We Stand For</h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIconWrap} style={{ background: `${v.color}15` }}>
                  <v.icon style={{ color: v.color }} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Info + Map ── */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <span className={styles.sectionLabelCenter}>CONTACT US</span>
          <h2 className={styles.sectionTitleCenter}>Get In Touch</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactCards}>
              {contactInfo.map((info, i) => (
                <div key={i} className={styles.contactCard}>
                  <div className={styles.contactIcon}>
                    <info.icon />
                  </div>
                  <div>
                    <span className={styles.contactLabel}>{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className={styles.contactValue}>{info.value}</a>
                    ) : (
                      <p className={styles.contactValue}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.mapWrap}>
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px', minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Forever Dreams Home Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section id="contact-form" className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <span className={styles.sectionLabel}>SEND A MESSAGE</span>
              <h2 className={styles.sectionTitle}>Let&apos;s Start a Conversation</h2>
              <p>Have a question or want to discuss your project? Fill out the form and our team will get back to you within 24 hours.</p>
              <img src="https://res.cloudinary.com/waqkndtu/image/upload/v1783269987/forever_dreams/about/contact_decor_img.jpg" alt="Interior Design" className={styles.formDecorImage} />
            </div>
            <div className={styles.formWrap}>
              {submitted && (
                <div className={styles.successMsg}>
                  <FaCheckCircle />
                  <span>Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Your Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Subject</label>
                    <select name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Select a subject...</option>
                      <option value="Residential">Residential Interior</option>
                      <option value="Commercial">Commercial Interior</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Your Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  Send Message <FiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Media ── */}
      <section className={styles.socialSection}>
        <div className={styles.container}>
          <div className={styles.socialGrid}>
            <a href={siteSettings?.facebook || "#"} className={styles.socialCard} style={{ '--social-color': '#1877F2' }} target="_blank" rel="noreferrer">
              <div className={styles.socialIcon}><FaFacebookF /></div>
              <span>Facebook</span>
            </a>
            <a href={siteSettings?.instagram || "#"} className={styles.socialCard} style={{ '--social-color': '#E4405F' }} target="_blank" rel="noreferrer">
              <div className={styles.socialIcon}><FaInstagram /></div>
              <span>Instagram</span>
            </a>
            <a href={siteSettings?.pinterest || "#"} className={styles.socialCard} style={{ '--social-color': '#BD081C' }} target="_blank" rel="noreferrer">
              <div className={styles.socialIcon}><FaPinterestP /></div>
              <span>Pinterest</span>
            </a>
            <a href={siteSettings?.youtube || "#"} className={styles.socialCard} style={{ '--social-color': '#FF0000' }} target="_blank" rel="noreferrer">
              <div className={styles.socialIcon}><FaYoutube /></div>
              <span>YouTube</span>
            </a>
            <a href={siteSettings?.twitter || "#"} className={styles.socialCard} style={{ '--social-color': '#1DA1F2' }} target="_blank" rel="noreferrer">
              <div className={styles.socialIcon}><FaTwitter /></div>
              <span>Twitter / X</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
