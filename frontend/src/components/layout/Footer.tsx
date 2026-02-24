import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">Drone Man of India</Link>
          <p className="footer-description">
            Pioneering the future of aerial robotics, indigenous manufacturing, and forward-looking aviation policy in India.
          </p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-nav">
          <h4>Ecosystem</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events & Summits</Link></li>
            <li><Link to="/knowledge-centre">Knowledge Centre</Link></li>
            <li><Link to="/contact">Contact & Membership</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="footer-nav">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/knowledge-centre">Research Papers</Link></li>
            <li><Link to="/knowledge-centre">Case Studies</Link></li>
            <li><Link to="/knowledge-centre">Technical Handbooks</Link></li>
            <li><Link to="/knowledge-centre">Policy Tracker</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-contact">
          <h4>Headquarters</h4>
          <p>T-Hub, Knowledge City Rd,</p>
          <p>Hyderabad, Telangana</p>
          <p className="contact-email">hello@dronemanofindia.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Drone Man of India. All Rights Reserved.</p>
        <div className="footer-legal">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}