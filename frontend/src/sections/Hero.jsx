import React from 'react';

export default function Hero({ profile, onOpenArchModal }) {
  const greeting = profile?.greeting || "Hi, I'm Anushka.";
  const role = profile?.role || "BTech AIML Student | Developer | Builder";
  const shortIntro = profile?.short_intro || "BTech Artificial Intelligence and Machine Learning student passionate about building practical software, intelligent systems, and modern web applications that solve real-world problems.";
  const initial = profile?.initial || "A";
  const degree = profile?.degree || "BTech in Artificial Intelligence & Machine Learning";
  const college = profile?.college || "Department of AI & ML, Engineering College (Placeholder)";

  return (
    <section className="section hero-section" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Greeting, Role, Intro, Actions */}
          <div className="hero-content">
            <div className="hero-role-badge">
              <span className="status-dot status-dot-green" />
              <span>{role}</span>
            </div>

            <h1 className="hero-title">
              {greeting} <br />
              <span className="text-accent">Welcome to my portfolio.</span>
            </h1>

            <p className="hero-description">
              {shortIntro}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>Explore My Projects</span>
                <svg className="icon-svg" viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>Contact Me</span>
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={onOpenArchModal}
                title="Explore 3-Tier Architecture Flow"
              >
                <span>3-Tier Architecture</span>
              </button>
            </div>

            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-num">5</span>
                <span className="hero-stat-label">Featured Projects</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-num">9+</span>
                <span className="hero-stat-label">Core Competencies</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-num">3-Tier</span>
                <span className="hero-stat-label">Decoupled Stack</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Profile Card with Initial A */}
          <div className="profile-card-wrap">
            <div className="profile-card">
              <div className="profile-avatar-outer">
                <div className="profile-avatar-ring">
                  <div className="profile-avatar-inner">
                    {initial}
                  </div>
                </div>
                <div className="profile-status-badge">
                  <span className="status-dot status-dot-green" style={{ width: '6px', height: '6px' }} />
                  <span>Student</span>
                </div>
              </div>

              <h2 className="profile-name">Anushka</h2>
              <p className="profile-role-title">AIML Undergrad &amp; Software Developer</p>

              <div className="profile-badges-wrap">
                <span className="tag">BTech AIML</span>
                <span className="tag">Full-Stack Lab</span>
                <span className="tag">Python &amp; React</span>
              </div>

              <div className="profile-card-footer">
                <div className="profile-detail-row">
                  <span>Specialization:</span>
                  <span>AI &amp; Machine Learning</span>
                </div>
                <div className="profile-detail-row">
                  <span>Program:</span>
                  <span>{degree.split('in ')[1] || degree}</span>
                </div>
                <div className="profile-detail-row">
                  <span>Institution:</span>
                  <span title={college} style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {college}
                  </span>
                </div>
                <div className="profile-detail-row">
                  <span>Focus:</span>
                  <span>Clean Code &amp; AI Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
