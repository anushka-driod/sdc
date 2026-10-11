import React from 'react';

export default function Footer({ onOpenArchModal }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="navbar-brand">
            <div className="brand-monogram">A</div>
            <div className="brand-text-wrap" style={{ textAlign: 'left' }}>
              <span className="brand-name">Anushka</span>
              <span className="brand-tag">BTech AIML Student Portfolio</span>
            </div>
          </div>

          <ul className="footer-nav">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#achievements">Achievements</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="footer-stack-badges">
            <span className="tag" onClick={onOpenArchModal} style={{ cursor: 'pointer' }}>
              Frontend: React.js (Vite)
            </span>
            <span className="tag" onClick={onOpenArchModal} style={{ cursor: 'pointer' }}>
              Gateway: Node.js (Express)
            </span>
            <span className="tag" onClick={onOpenArchModal} style={{ cursor: 'pointer' }}>
              API: Python Django REST
            </span>
            <span className="tag" onClick={onOpenArchModal} style={{ cursor: 'pointer' }}>
              Database: SQLite3
            </span>
          </div>

          <p className="footer-copy">
            &copy; {currentYear} Anushka — Skill Development Course Lab Project. Designed with clean light aesthetics &amp; soft lavender accents.
          </p>
        </div>
      </div>
    </footer>
  );
}
