import React from 'react';

export default function About({ profile }) {
  const aboutText = profile?.about_text || "I am an enthusiastic BTech Artificial Intelligence and Machine Learning student with a strong foundation in programming, algorithms, and full-stack web engineering. Driven by curiosity and practical problem-solving, I enjoy taking concepts from theory to working applications, bridging clean architecture with intuitive user experiences.";

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Background &amp; Mindset</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            An aspiring engineer bridging artificial intelligence models with reliable web engineering.
          </p>
        </div>

        <div className="about-grid">
          {/* Narrative Column */}
          <div className="about-narrative">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Curious Learner, Analytical Thinker, and Builder
            </h3>
            <p className="about-intro-lead">
              {aboutText}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              My coursework in Artificial Intelligence &amp; Machine Learning gives me a strong footing in predictive modeling, data processing, and algorithmic reasoning. Simultaneously, my hands-on web development practice enables me to build decoupled client-server systems that make intelligent tools accessible to real users.
            </p>

            <div className="about-points-list">
              <div className="about-point-item">
                <span className="about-point-icon">&check;</span>
                <div>
                  <strong>Academic Orientation:</strong> Focused on foundational AI/ML algorithms, mathematical rigor, and software quality.
                </div>
              </div>
              <div className="about-point-item">
                <span className="about-point-icon">&check;</span>
                <div>
                  <strong>Engineering Philosophy:</strong> Clean code, modular micro-components, and verifiable end-to-end data pipelines.
                </div>
              </div>
              <div className="about-point-item">
                <span className="about-point-icon">&check;</span>
                <div>
                  <strong>Practical Problem-Solving:</strong> Building applications that serve maternal health, artisan empowerment, and legal accessibility.
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights Column */}
          <div className="about-cards-col">
            <div className="about-feature-card">
              <div className="about-feature-icon">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h4 className="about-feature-title">AI &amp; Machine Learning</h4>
                <p className="about-feature-desc">
                  Exploring machine learning workflows, data preprocessing, classification algorithms, and model evaluation metrics for real-world datasets.
                </p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <div>
                <h4 className="about-feature-title">Full-Stack Web Development</h4>
                <p className="about-feature-desc">
                  Architecting multi-tier web applications using React.js for reactive user interfaces, Express.js for routing gateways, and Django for robust RESTful APIs.
                </p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-feature-icon">
                <svg className="icon-svg" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="about-feature-title">Discipline &amp; Leadership</h4>
                <p className="about-feature-desc">
                  Active participation in the National Cadet Corps (NCC) and collaborative hackathons fostering resilience, discipline, and effective team dynamics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
