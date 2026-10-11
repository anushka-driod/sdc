import React, { useState } from 'react';

export default function Navbar({ onOpenArchModal, apiStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isHealthy = apiStatus?.status === 'healthy';

  return (
    <nav className="navbar" id="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <a href="#home" className="navbar-brand">
            <div className="brand-monogram">A</div>
            <div className="brand-text-wrap">
              <span className="brand-name">Anushka</span>
              <span className="brand-tag">BTech AIML Student</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="nav-status-pill"
                onClick={onOpenArchModal}
                title="View 3-Tier Architecture Details"
              >
                <span className={`status-dot ${isHealthy ? 'status-dot-green' : 'status-dot-orange'}`} />
                <span>3-Tier Architecture</span>
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="icon-svg" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-status-pill"
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenArchModal();
            }}
          >
            <span className={`status-dot ${isHealthy ? 'status-dot-green' : 'status-dot-orange'}`} />
            <span>3-Tier Architecture Lab Status</span>
          </button>
        </div>
      )}
    </nav>
  );
}
