import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {

  // THE FIX: This forces a scroll up even if React Router ignores the link click
  const handleFooterClick = () => {
    // Check if the current page has the filter tabs (Events or Knowledge Centre)
    const filterTarget = document.getElementById('filter-target');

    if (filterTarget) {
      // If the tabs exist, scroll smoothly to them, accounting for the sticky header
      const headerOffset = 120;
      const elementPosition = filterTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      // If it's a normal page like About or Home, scroll smoothly to the very top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-content-wrapper">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" onClick={handleFooterClick}>Drone Man of India</Link>
            <span className="footer-tagline-badge">Aerial Innovation · Make in India</span>
            <p className="footer-description">
              Pioneering the future of aerial robotics, indigenous manufacturing, and forward-looking aviation policy in India.
            </p>
            <div className="social-links">
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61575642449662" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/dronemanofindia_rahul/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              {/* X (Twitter) */}
              <a href="https://x.com/rahulsingh78267" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/rahul-singh-647b513b2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>

              {/* YouTube */}
              <a href="https://www.youtube.com/channel/UChYvmo46wt1q_Xzxn90RAWg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.01 29.01 0 001 11.75a29.01 29.01 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29.01 29.01 0 00.46-5.33 29.01 29.01 0 00-.46-5.33zM9.75 15.02v-6.54l6.23 3.27-6.23 3.27z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-nav">
            <h4>Ecosystem</h4>
            <ul>
              <li><Link to="/about" onClick={handleFooterClick}>About Us</Link></li>
              <li><Link to="/events" onClick={handleFooterClick}>Events & Summits</Link></li>
              <li><Link to="/knowledge-centre" onClick={handleFooterClick}>Knowledge Centre</Link></li>
              <li><Link to="/contact" onClick={handleFooterClick}>Contact & Membership</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-nav">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/knowledge-centre?type=Mentor" onClick={handleFooterClick}>Mentor</Link></li>
              <li><Link to="/knowledge-centre?type=Guidance" onClick={handleFooterClick}>Guidance</Link></li>
              <li><Link to="/knowledge-centre?type=Gallery" onClick={handleFooterClick}>Gallery Photos</Link></li>
              <li>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', cursor: 'not-allowed' }}>
                  Technical Papers (Soon)
                </span>
              </li>
              <li>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', cursor: 'not-allowed' }}>
                  Research Papers (Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-contact">
            <h4>Headquarters</h4>
            <p>T-Hub, Knowledge City Rd,</p>
            <p>Hyderabad, Telangana</p>
            <p className="contact-email">rahulsingh120704@gmail.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Drone Man of India. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link to="#" onClick={handleFooterClick}>Privacy Policy</Link>
            <Link to="#" onClick={handleFooterClick}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}