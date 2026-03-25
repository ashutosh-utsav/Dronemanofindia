import { useEffect } from 'react';
import './Legal.css';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="legal-container">
      <h1 className="gradient-text">Terms of Service</h1>
      <p className="last-updated">Last Updated: March 2026</p>

      <p>
        Welcome to Drone Man of India. These Terms of Service (“Terms”) govern your use of our website. By accessing or using our website, you agree to comply with and be bound by these Terms.
      </p>

      <h2>1. Use of the Website</h2>
      <p>By using this website, you agree to:</p>
      <ul>
        <li>Use the website only for lawful purposes</li>
        <li>Not engage in any activity that disrupts or interferes with the website</li>
        <li>Not attempt to gain unauthorized access to any part of the website</li>
      </ul>
      <p>We reserve the right to suspend or terminate access if these Terms are violated.</p>

      <h2>2. Intellectual Property Rights</h2>
      <p>
        All content on this website, including text, images, logos, graphics, and design, is the property of DROne MAn of INdia unless otherwise stated.
      </p>
      <p>You may not:</p>
      <ul>
        <li>Copy, reproduce, or distribute content without permission</li>
        <li>Use our content for commercial purposes without authorization</li>
      </ul>

      <h2>3. User Content</h2>
      <p>If you submit or post any content on the website:</p>
      <ul>
        <li>You grant us a non-exclusive, royalty-free license to use, display, and distribute it</li>
        <li>You are responsible for ensuring your content does not violate any laws or rights</li>
      </ul>
      <p>We reserve the right to remove any user content at our discretion.</p>

      <h2>4. Disclaimer of Warranties</h2>
      <p>The website is provided on an “as-is” and “as-available” basis. We do not guarantee:</p>
      <ul>
        <li>The website will always be available or error-free</li>
        <li>The accuracy or reliability of any content</li>
      </ul>
      <p>Your use of the website is at your own risk.</p>

      <h2>5. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, DROne MAn of INdia will not be liable for any:</p>
      <ul>
        <li>Direct, indirect, incidental, or consequential damages</li>
        <li>Loss of data, revenue, or profits</li>
      </ul>
      <p>arising from your use of the website.</p>

      <h2>6. Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. We are not responsible for their content, policies, or practices.</p>

      <h2>7. Termination</h2>
      <p>We reserve the right to terminate or suspend your access to the website at any time, without prior notice, for conduct that we believe violates these Terms.</p>

      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed and interpreted in accordance with the laws of India.</p>

      <h2>9. Changes to These Terms</h2>
      <p>We may update these Terms from time to time. Continued use of the website after changes means you accept the updated Terms.</p>

      <h2>10. Contact Information</h2>
      <p>If you have any questions about these Terms, please contact us:</p>
      <ul>
        <li>Email: thedronemanofindia@gmail.com</li>
        <li>Website: Drone Man of India</li>
      </ul>

      <p style={{ marginTop: '2rem' }}>
        By using this website, you acknowledge that you have read, understood, and agree to these Terms of Service.
      </p>
    </div>
  );
}
