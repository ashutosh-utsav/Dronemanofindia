import { useEffect } from 'react';
import './Legal.css';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="legal-container">
      <h1 className="gradient-text">Privacy Policy</h1>
      <p className="last-updated">Last Updated: March 2026</p>

      <p>
        Welcome to Drone Man of India (“we,” “our,” or “us”). Your privacy is important to us, and this Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways, including:</p>
      
      <h3>a. Personal Data</h3>
      <p>Personally identifiable information, such as your name, email address, phone number, or any other information you voluntarily provide.</p>
      
      <h3>b. Non-Personal Data</h3>
      <p>Information such as browser type, device type, IP address, and pages visited, collected automatically when you access the website.</p>
      
      <h3>c. Cookies and Tracking Technologies</h3>
      <p>We may use cookies and similar tracking technologies to enhance user experience and analyze website traffic.</p>

      <h2>2. How We Use Your Information</h2>
      <p>We may use the information we collect in the following ways:</p>
      <ul>
        <li>To operate and maintain our website</li>
        <li>To improve user experience</li>
        <li>To respond to inquiries and customer service requests</li>
        <li>To send updates, newsletters, or promotional materials (if opted in)</li>
        <li>To monitor and analyze usage trends</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>We do not sell, trade, or rent your personal information. However, we may share information:</p>
      <ul>
        <li>With service providers who help operate our website</li>
        <li>To comply with legal obligations</li>
        <li>To protect our rights and prevent fraud</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We use reasonable administrative and technical measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

      <h2>5. Third-Party Websites</h2>
      <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.</p>

      <h2>6. Your Rights</h2>
      <p>Depending on your location, you may have rights such as:</p>
      <ul>
        <li>Access to your personal data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent for data processing</li>
      </ul>
      <p>To exercise these rights, contact us using the details below.</p>

      <h2>7. Children's Information</h2>
      <p>We do not knowingly collect information from children under the age of 13. If we become aware of such data, we will take steps to delete it.</p>

      <h2>8. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, you can contact us at:</p>
      <ul>
        <li>Email: thedronemanofindia@gmail.com</li>
        <li>Website: Drone Man of India</li>
      </ul>

      <p style={{ marginTop: '2rem' }}>
        By using our website, you agree to the terms of this Privacy Policy.
      </p>
    </div>
  );
}
