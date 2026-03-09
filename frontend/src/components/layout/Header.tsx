import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          Drone Man of India
        </Link>

        {/* Hamburger icon for mobile accessibility */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Menu">
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
            Home
          </Link>
          
          <div className="nav-item-dropdown">
            <Link to="/about" onClick={closeMenu}>About Us ▾</Link>
            <div className="dropdown-panel">
              <a href="/about#mission" onClick={closeMenu}>Our Mission</a>
              <a href="/about#team" onClick={closeMenu}>The Team</a>
              <a href="/about#impact" onClick={closeMenu}>Our Impact</a>
            </div>
          </div>

          <div className="nav-item-dropdown">
            <Link to="/events" onClick={closeMenu}>Events & Programs ▾</Link>
            <div className="dropdown-panel">
              <Link to="/events" onClick={closeMenu}>All Events</Link>
              <Link to="/events?type=Conference" onClick={closeMenu}>Conference</Link>
              <Link to="/events?type=Meetup" onClick={closeMenu}>Meetup</Link>
              <Link to="/events?type=Workshop" onClick={closeMenu}>Workshops</Link>
              <Link to="/events?type=Competition" onClick={closeMenu}>Competitions</Link>
            </div>
          </div>

          <div className="nav-item-dropdown">
            <Link to="/knowledge-centre" onClick={closeMenu}>Knowledge Centre ▾</Link>
            <div className="dropdown-panel">
              <Link to="/knowledge-centre?type=Mentor" onClick={closeMenu}>Mentor</Link>
              <Link to="/knowledge-centre?type=Case Study" onClick={closeMenu}>Case study</Link>
              <Link to="/knowledge-centre?type=Project" onClick={closeMenu}>Project</Link>
              
              {/* Coming Soon Items - Styled to look inactive */}
              <span style={{ padding: '0.6rem 1rem', color: '#555', fontSize: '0.9rem', cursor: 'not-allowed' }}>
                Technical Papers (Coming Soon)
              </span>
              <span style={{ padding: '0.6rem 1rem', color: '#555', fontSize: '0.9rem', cursor: 'not-allowed' }}>
                Research Papers (Coming Soon)
              </span>
              
              <Link to="/knowledge-centre?type=Gallery" onClick={closeMenu}>Gallery photos</Link>
            </div>
          </div>

          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}