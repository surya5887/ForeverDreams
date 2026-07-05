'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiPhone, FiMail, FiArrowLeft } from 'react-icons/fi';
import { 
  FaWhatsapp, FaHome, FaCity, FaUtensils, FaCouch, FaKey, FaCubes,
  FaLightbulb, FaAward, FaClock, FaHeart, FaStar, FaQuoteLeft,
  FaUsers, FaClipboardList, FaPencilRuler, FaHardHat, FaCheckCircle,
  FaFacebookF, FaInstagram, FaPinterestP, FaYoutube
} from 'react-icons/fa';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      
      {/* ── HERO SECTION ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabelWrap}>
              <span className={styles.heroLabelLine}></span>
              <span className={styles.heroLabelText}>DESIGNING SPACES THAT <span className={styles.goldText}>INSPIRE LIFE</span></span>
            </div>
            
            <h1 className={styles.heroTitle}>
              Where Home<br/>
              Breathes <span className={styles.heroTitleScript}>Beauty</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              From concept to creation, we craft stunning interiors<br/>
              that reflect your personality and elevate everyday living.
            </p>
            
            <div className={styles.heroActions}>
              <Link href="/design-gallery" className={styles.primaryBtn}>
                EXPLORE OUR WORK <FiArrowRight />
              </Link>
              <button className={styles.videoBtn}>
                <span className={styles.playIcon}><FiPlay fill="#fff" /></span> WATCH VIDEO
              </button>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statEmoji}>😊</span>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>500+</span>
                <span className={styles.statText}>Happy Clients</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statEmoji}>🏢</span>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>650+</span>
                <span className={styles.statText}>Projects Completed</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statEmoji}>🏅</span>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statText}>Years Experience</span>
              </div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statEmoji}>👨‍🎨</span>
              <div className={styles.statInfo}>
                <span className={styles.statNum}>25+</span>
                <span className={styles.statText}>Expert Designers</span>
              </div>
            </div>
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
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionLabelColored}>OUR SERVICES</span>
            <h2 className={styles.sectionTitleDark}>Designing Spaces You'll Love</h2>
          </div>
          
          <div className={styles.servicesGrid}>
            {[
              { icon: <FaCouch style={{color:'#e91e63'}}/>, title: 'Residential Interior', desc: 'Comfortable, stylish and personalized home interiors.', color: '#e91e63', img: 'https://picsum.photos/seed/res/400/250' },
              { icon: <FaCity style={{color:'#00bcd4'}}/>, title: 'Commercial Interior', desc: 'Functional and productive spaces for your business.', color: '#00bcd4', img: 'https://picsum.photos/seed/com/400/250' },
              { icon: <FaUtensils style={{color:'#ff9800'}}/>, title: 'Modular Kitchen', desc: 'Smart, stylish & space-saving kitchen designs.', color: '#ff9800', img: 'https://picsum.photos/seed/kit/400/250' },
              { icon: <FaLightbulb style={{color:'#8b5cf6'}}/>, title: 'Furniture & Decor', desc: 'Handpicked furniture & decor to complete your space.', color: '#8b5cf6', img: 'https://picsum.photos/seed/fur/400/250' },
              { icon: <FaKey style={{color:'#3b82f6'}}/>, title: 'Turnkey Projects', desc: 'End-to-end solutions with hassle-free execution.', color: '#3b82f6', img: 'https://picsum.photos/seed/turn/400/250' },
              { icon: <FaCubes style={{color:'#4caf50'}}/>, title: '3D Design & Visual', desc: 'Realistic 3D renders to visualize your dream space.', color: '#4caf50', img: 'https://picsum.photos/seed/3d/400/250' }
            ].map((service, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <div className={styles.serviceImgWrap}>
                  <img src={service.img} alt={service.title} className={styles.serviceImg} />
                </div>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <Link href="#" className={styles.exploreLink} style={{ color: service.color }}>
                  DISCOVER MORE <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT WORK ── */}
      <section className={styles.recentWorkSection}>
        <div className={styles.container}>
          <div className={styles.recentHeader}>
            <div>
              <span className={styles.sectionLabelDark}>OUR RECENT WORK</span>
              <h2 className={styles.sectionTitleLight}>Spaces That Speak Style</h2>
            </div>
            <Link href="/design-gallery" className={styles.viewAllBtn}>
              VIEW ALL PROJECTS <FiArrowRight />
            </Link>
          </div>
          
          <div className={styles.recentCarouselWrap}>
            <button className={styles.navBtnLeft}><FiArrowLeft /></button>
            <div className={styles.recentCarousel}>
              {[
                { title: 'Modern Living Room', loc: 'Meerut', img: 'https://picsum.photos/seed/p1/400/500' },
                { title: 'Luxury Bedroom', loc: 'Noida', img: 'https://picsum.photos/seed/p2/400/500' },
                { title: 'Elegant Kitchen', loc: 'Delhi', img: 'https://picsum.photos/seed/p3/400/500' },
                { title: 'Contemporary Office', loc: 'Gurugram', img: 'https://picsum.photos/seed/p4/400/500' }
              ].map((proj, idx) => (
                <div key={idx} className={styles.recentCard}>
                  <img src={proj.img} alt={proj.title} className={styles.recentCardImg} />
                  <div className={styles.recentCardOverlay}>
                    <h4 className={styles.recentCardTitle}>{proj.title}</h4>
                    <p className={styles.recentCardLoc}>{proj.loc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.navBtnRight}><FiArrowRight /></button>
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processFlex}>
            <div className={styles.processLeft}>
              <span className={styles.sectionLabelColored}>OUR PROCESS</span>
              <h2 className={styles.sectionTitleDark}>From Concept To Creation</h2>
              
              <div className={styles.timeline}>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineSteps}>
                  {[
                    { num: '01', icon: <FaUsers/>, color: '#e91e63', title: 'Consultation', desc: 'We listen to your ideas and understand your requirements.' },
                    { num: '02', icon: <FaClipboardList/>, color: '#ff9800', title: 'Planning', desc: 'We plan the perfect design and layout for your space.' },
                    { num: '03', icon: <FaPencilRuler/>, color: '#00bcd4', title: 'Design & Develop', desc: 'Our experts design and develop your dream space.' },
                    { num: '04', icon: <FaHardHat/>, color: '#8b5cf6', title: 'Execution', desc: 'We execute the plan with precision and quality.' },
                    { num: '05', icon: <FaCheckCircle/>, color: '#4caf50', title: 'Handover', desc: 'On-time delivery with perfect finishing and satisfaction.' }
                  ].map((step, idx) => (
                    <div key={idx} className={styles.timelineStep}>
                      <div className={styles.timelineIconWrap} style={{ color: step.color, borderColor: step.color }}>
                        {step.icon}
                      </div>
                      <div className={styles.timelineNum} style={{ color: step.color }}>{step.num}</div>
                      <h4 className={styles.timelineTitle}>{step.title}</h4>
                      <p className={styles.timelineDesc}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={styles.processRight}>
              <img src="/chair-process.png" alt="Interior Design Chair" className={styles.processImage} />
            </div>
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
          
          <div className={styles.testGrid}>
            {[
              { name: 'Pooja Sharma', loc: 'Noida', img: 'https://picsum.photos/seed/user1/100/100', text: 'Forever Dreams Home transformed our house into a dream home. Their creativity and attention to detail is simply amazing!' },
              { name: 'Rahul Verma', loc: 'Delhi', img: 'https://picsum.photos/seed/user2/100/100', text: 'Professional team, on-time delivery and excellent execution. Highly recommended for interior design!' },
              { name: 'Anjali Mehta', loc: 'Meerut', img: 'https://picsum.photos/seed/user3/100/100', text: 'They understood our needs perfectly and designed a space that feels just right. Thank you FDH!' }
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
                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
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
          <div className={styles.testDots}>
             <span className={styles.dotActive}></span>
             <span className={styles.dot}></span>
             <span className={styles.dot}></span>
          </div>
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
              <Link href="/contact" className={styles.ctaBtnWhite}>
                BOOK FREE CONSULTATION <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerCol}>
            <div className={styles.footerLogo}>
              <div className={styles.fLogoIcon}>FD</div>
              <div className={styles.fLogoText}>
                <span className={styles.fLogoTop}>FOREVER</span>
                <span className={styles.fLogoMid}>Dreams Home</span>
                <span className={styles.fLogoBot}>INTERIOR DESIGN</span>
              </div>
            </div>
            <p className={styles.footerDesc}>
              Designing beautiful spaces that reflect your style and personality.
            </p>
            <div className={styles.socialLinks}>
              <a href="#"><FaFacebookF/></a>
              <a href="#"><FaInstagram/></a>
              <a href="#"><FaPinterestP/></a>
              <a href="#"><FaYoutube/></a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <ul className={styles.footerList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/design-gallery">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Our Services</h4>
            <ul className={styles.footerList}>
              <li><Link href="/services/residential">Residential Interior</Link></li>
              <li><Link href="/services/commercial">Commercial Interior</Link></li>
              <li><Link href="/services/kitchen">Modular Kitchen</Link></li>
              <li><Link href="/services/furniture">Furniture & Decor</Link></li>
              <li><Link href="/services/turnkey">Turnkey Projects</Link></li>
              <li><Link href="/services/3d-design">3D Design & Visual</Link></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <ul className={styles.footerContact}>
              <li><FiPhone color="#b98e46" /> +91 12345 67890</li>
              <li><FiMail color="#b98e46" /> info@foreverdreamshome.com</li>
              <li><FaHome color="#b98e46" /> Meerut, Uttar Pradesh, India</li>
            </ul>
            
            <h4 className={styles.footerTitle} style={{marginTop: '2rem'}}>Newsletter</h4>
            <p className={styles.newsDesc}>Subscribe to get latest updates and interior design tips.</p>
            <form className={styles.newsForm}>
              <input type="email" placeholder="Enter your email" className={styles.newsInput} required />
              <button type="submit" className={styles.newsBtn}><FiArrowRight/></button>
            </form>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 Forever Dreams Home Interior Design. All Rights Reserved.</p>
          <div className={styles.footerLegal}>
            <Link href="/privacy">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}