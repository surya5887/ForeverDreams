import styles from '../legal.module.css';

export const metadata = {
  title: 'Terms of Service | Forever Dreams Home',
  description: 'Terms and Conditions of Forever Dreams Home Interior Design.',
};

export default function TermsOfService() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Terms & Conditions</h1>
          <p className={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className={styles.content}>
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) 
            and Forever Dreams Home Interior Design (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of the website 
            as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>
          <p>
            You agree that by accessing the site and our services, you have read, understood, and agree to be bound by all of these Terms of Service. 
            If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </p>

          <h2>2. Services and Consultations</h2>
          <p>
            Forever Dreams Home provides professional interior design, consultation, and execution services. 
            All preliminary consultations, floor plans, and 3D designs provided before a formal contract is signed remain the intellectual property of Forever Dreams Home. 
            They may not be used, copied, or distributed without our explicit written consent.
          </p>
          <p>
            Project timelines, material costs, and labor charges discussed during consultations are estimates. Final costs and timelines will be documented in a formal written contract before the commencement of any physical work.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, 
            software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the 
            trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
          </p>

          <h2>4. User Representations</h2>
          <p>By using the Site, you represent and warrant that:</p>
          <ul>
            <li>All registration and contact information you submit will be true, accurate, current, and complete.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
            <li>Your use of the Site will not violate any applicable law or regulation.</li>
          </ul>

          <h2>5. Payment Terms</h2>
          <p>
            Payments for design services and physical executions follow a milestone-based structure detailed in individual client contracts. 
            Advances paid for blocking dates, procuring custom materials, or initial design fees are strictly non-refundable once work has commenced or materials have been ordered.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, 
            incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or our services, 
            even if we have been advised of the possibility of such damages.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of India. Forever Dreams Home and yourself irrevocably consent that the courts of 
            Meerut, Uttar Pradesh, India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>

          <h2>8. Contact Us</h2>
          <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
          <div className={styles.contactInfo}>
            <p>Forever Dreams Home Interior Design</p>
            <p>Meerut, Uttar Pradesh, India 250001</p>
            <p>Email: <a href="mailto:info@foreverdreamshome.com" style={{color: 'var(--color-accent)'}}>info@foreverdreamshome.com</a></p>
            <p>Phone: +91 12345 67890</p>
          </div>
        </div>
      </div>
    </div>
  );
}
