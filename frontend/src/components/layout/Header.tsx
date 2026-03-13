import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setOpenDropdown(null);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (e: React.MouseEvent, menu: string) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      setOpenDropdown(openDropdown === menu ? null : menu);
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-datetime">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="datetime-separator">|</span>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="top-bar-socials">
            <a href="https://www.facebook.com/profile.php?id=61575642449662" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/dronemanofindia_rahul/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://x.com/rahulsingh78267" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/rahul-singh-647b513b2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://www.youtube.com/channel/UChYvmo46wt1q_Xzxn90RAWg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29.01 29.01 0 001 11.75a29.01 29.01 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29.01 29.01 0 00.46-5.33 29.01 29.01 0 00-.46-5.33zM9.75 15.02v-6.54l6.23 3.27-6.23 3.27z"></path></svg>
            </a>
          </div>
        </div>
      </div>
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

            <div className={`nav-item-dropdown ${openDropdown === 'about' ? 'open' : ''}`}>
              <Link to="/about" onClick={(e) => toggleDropdown(e, 'about')}>About Us ▾</Link>
              <div className="dropdown-panel">
                <Link to="/about" onClick={closeMenu}>Overview</Link>
                <a href="/about#mission" onClick={closeMenu}>Our Mission</a>
                <a href="/about#team" onClick={closeMenu}>The Team</a>
                <a href="/about#impact" onClick={closeMenu}>Our Impact</a>
              </div>
            </div>

            <div className={`nav-item-dropdown ${openDropdown === 'events' ? 'open' : ''}`}>
              <Link to="/events" onClick={(e) => toggleDropdown(e, 'events')}>Events & Programs ▾</Link>
              <div className="dropdown-panel">
                <Link to="/events" onClick={closeMenu}>All Events</Link>
                <Link to="/events?type=Conference" onClick={closeMenu}>Conference</Link>
                <Link to="/events?type=Meetup" onClick={closeMenu}>Meetup</Link>
                <Link to="/events?type=Workshop" onClick={closeMenu}>Workshops</Link>
                <Link to="/events?type=Competition" onClick={closeMenu}>Competitions</Link>
              </div>
            </div>

            <div className={`nav-item-dropdown ${openDropdown === 'knowledge' ? 'open' : ''}`}>
              <Link to="/knowledge-centre" onClick={(e) => toggleDropdown(e, 'knowledge')}>Knowledge Centre ▾</Link>
              <div className="dropdown-panel">
                <Link to="/knowledge-centre" onClick={closeMenu}>All Knowledge</Link>
                <Link to="/knowledge-centre?type=Mentor" onClick={closeMenu}>Mentor</Link>
                <Link to="/knowledge-centre?type=Guidance" onClick={closeMenu}>Guidance</Link>
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
    </>
  );
}