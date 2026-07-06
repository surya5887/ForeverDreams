import styles from '../legal.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Forever Dreams Home',
  description: 'Privacy Policy of Forever Dreams Home Interior Design.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        
        <div className={styles.content}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Forever Dreams Home. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights and how the law protects you.
          </p>
          <p>
            By using our services or accessing our website, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>2. Data We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and title.</li>
            <li><strong>Contact Data:</strong> includes billing address, site/property address, email address, and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Project Data:</strong> details about your home, floor plans, design preferences, budget estimates, and other information you share with us during the consultation phase.</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>To provide interior design consultation, quotes, and services.</li>
            <li>To manage our relationship with you, including notifying you about changes to our terms or privacy policy.</li>
            <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance).</li>
            <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data 
            to those employees, agents, contractors, and other third parties who have a business need to know. 
            They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
          </p>

          <h2>5. Sharing of Your Information</h2>
          <p>
            We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties unless 
            we provide users with advance notice. This does not include website hosting partners and other parties who assist us 
            in operating our website, conducting our business, serving our users, or providing interior design materials and labor, 
            so long as those parties agree to keep this information confidential.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            Occasionally, at our discretion, we may include or offer third-party products or services on our website. 
            These third-party sites have separate and independent privacy policies. We therefore have no responsibility 
            or liability for the content and activities of these linked sites.
          </p>

          <h2>7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us:</p>
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
