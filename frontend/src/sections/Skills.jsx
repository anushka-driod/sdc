import React, { useState } from 'react';

// SVG Icon renderer based on skill icon tag
function SkillIcon({ icon }) {
  switch (icon) {
    case 'code':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'layout':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case 'react':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'server':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case 'django':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'database':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'brain':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
        </svg>
      );
    case 'smartphone':
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'git':
    default:
      return (
        <svg className="icon-svg" viewBox="0 0 24 24">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <path d="M9 18h3a3 3 0 0 0 3-3V9" />
        </svg>
      );
  }
}

export default function Skills({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Fallback sample skills if backend not loaded
  const fallbackSkills = [
    { name: 'C, Python, Java & JavaScript', category: 'Languages', proficiency: 'Core Proficiencies', icon: 'code', order: 1 },
    { name: 'HTML & CSS', category: 'Frontend', proficiency: 'Semantic & Modern Layouts', icon: 'layout', order: 2 },
    { name: 'React.js', category: 'Frontend', proficiency: 'Components, Hooks & SPAs', icon: 'react', order: 3 },
    { name: 'Node.js & Express.js', category: 'Backend', proficiency: 'API Gateways & REST Services', icon: 'server', order: 4 },
    { name: 'Django & REST APIs', category: 'Backend', proficiency: 'Models, Serializers & Architecture', icon: 'django', order: 5 },
    { name: 'SQL & Database Fundamentals', category: 'Databases', proficiency: 'Schema Design, Queries & SQLite', icon: 'database', order: 6 },
    { name: 'AI/ML Fundamentals', category: 'AI/ML', proficiency: 'Scikit-Learn, Predictive Models & Data Prep', icon: 'brain', order: 7 },
    { name: 'Flutter & Firebase', category: 'Mobile/Cloud', proficiency: 'Cross-Platform UI & Cloud Integration', icon: 'smartphone', order: 8 },
    { name: 'Git, GitHub & VS Code', category: 'Tools', proficiency: 'Version Control & Developer Workflows', icon: 'git', order: 9 },
  ];

  const skillList = skills && skills.length > 0 ? skills : fallbackSkills;

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Mobile/Cloud', 'Tools'];

  const filteredSkills = activeCategory === 'All'
    ? skillList
    : skillList.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Technical Competencies</span>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-subtitle">
            Core toolsets, programming languages, and frameworks explored through academic coursework and practical projects.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="skills-filter-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`skills-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div className="skill-card" key={skill.id || index}>
              <div className="skill-card-top">
                <div className="skill-icon-wrap">
                  <SkillIcon icon={skill.icon} />
                </div>
                <div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category-tag">{skill.category}</span>
                </div>
              </div>

              <div className="skill-meta">
                <span>Focus Level:</span>
                <span className="skill-proficiency-badge">{skill.proficiency || 'Academic Focus'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Editable Sample Skills Notice */}
        <div className="skills-note-banner">
          <strong>Academic Lab Note:</strong> These represent active undergraduate learning competencies and lab coursework technologies. Skill proficiency is continuously developing through hands-on lab experiments and projects.
        </div>
      </div>
    </section>
  );
}
