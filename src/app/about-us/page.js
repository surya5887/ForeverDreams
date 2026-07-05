'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const contactInfo = [
  { icon: FaMapMarkerAlt, label: 'Address', value: '123 Design Avenue, Meerut, Uttar Pradesh, India 250001' },
  { icon: FaPhone, label: 'Phone', value: '+91 12345 67890', href: 'tel:+911234567890' },
  { icon: FaWhatsapp, label: 'WhatsApp', value: '+91 12345 67890', href: 'https://wa.me/911234567890' },
  { icon: FaEnvelope, label: 'Email', value: 'info@foreverdreamshome.com', href: 'mailto:info@foreverdreamshome.com' },
  { icon: FaClock, label: 'Working Hours', value: 'Mon - Sat: 10:00 AM - 7:00 PM' },
];

const socials = [
  { icon: FaFacebookF, name: 'Facebook', color: '#1877F2', href: '#' },
  { icon: FaInstagram, name: 'Instagram', color: '#E4405F', href: '#' },
  { icon: FaPinterestP, name: 'Pinterest', color: '#BD081C', href: '#' },
  { icon: FaYoutube, name: 'YouTube', color: '#FF0000', href: '#' },
  { icon: FaTwitter, name: 'Twitter', color: '#1DA1F2', href: '#' },
];

export default function AboutUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

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
              <img src="https://picsum.photos/seed/about-team/600/450" alt="Our Team" className={styles.aboutImage} />
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111510.00!2d77.68!3d28.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c6546e01ef4fb%3A0x45d90e41bcb3eae4!2sMeerut%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
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
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formInfo}>
              <span className={styles.sectionLabel}>SEND A MESSAGE</span>
              <h2 className={styles.sectionTitle}>Let&apos;s Start a Conversation</h2>
              <p>Have a question or want to discuss your project? Fill out the form and our team will get back to you within 24 hours.</p>
              <img src="https://picsum.photos/seed/contact-decor/500/350" alt="Interior Design" className={styles.formDecorImage} />
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
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="consultation">Design Consultation</option>
                      <option value="quote">Get a Quote</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={5} required></textarea>
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
          <span className={styles.sectionLabelCenter}>CONNECT WITH US</span>
          <h2 className={styles.sectionTitleCenter}>Follow Us On Social Media</h2>
          <div className={styles.socialGrid}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} className={styles.socialCard} style={{ '--social-color': s.color }} target="_blank" rel="noopener noreferrer">
                <div className={styles.socialIcon}>
                  <s.icon />
                </div>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
