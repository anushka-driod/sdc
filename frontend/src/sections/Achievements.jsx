import React from 'react';

export default function Achievements({ achievements }) {
  const fallbackAchievements = [
    {
      id: 1,
      title: 'Skill Development Course — 3-Tier Lab Project',
      category: 'Academic',
      organization: 'Department of Artificial Intelligence & Machine Learning',
      year: '2026',
      description: 'Successfully conceptualized, architected, and deployed a 3-tier decoupled web system integrating React (Vite), Express API Gateway, and Django REST Framework.',
      order: 1
    },
    {
      id: 2,
      title: 'National Cadet Corps (NCC) Active Participation',
      category: 'NCC',
      organization: 'NCC Directorate',
      year: '2024 - 2025',
      description: 'Trained cadet participating in rigorous drill sessions, social service drives, team building, and leadership discipline camps.',
      order: 2
    },
    {
      id: 3,
      title: 'AI & Machine Learning Foundations Certification',
      category: 'Certification',
      organization: 'Certified Online Technical Learning Platform (Placeholder)',
      year: '2025',
      description: 'Completed coursework covering supervised learning, classification, regression, model performance evaluation, and Python data analysis libraries.',
      order: 3
    },
    {
      id: 4,
      title: 'College Tech Hackathon — Healthcare Innovation Finalist',
      category: 'Hackathon',
      organization: 'Inter-College Innovation Challenge',
      year: '2025',
      description: 'Presented the NESTRA maternal health monitoring prototype in team competition, earning recognition for social impact and system feasibility.',
      order: 4
    }
  ];

  const achList = achievements && achievements.length > 0 ? achievements : fallbackAchievements;

  return (
    <section className="section section-alt" id="achievements">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Recognitions &amp; Activities</span>
          <h2 className="section-title">Achievements &amp; Activities</h2>
          <p className="section-subtitle">
            Verified academic milestones, technical certifications, hackathon participation, and NCC involvement.
          </p>
        </div>

        <div className="achievements-grid">
          {achList.map((item, idx) => (
            <div className="achievement-card" key={item.id || idx}>
              <div className="achievement-top">
                <span className="achievement-category-tag">{item.category}</span>
                <span className="achievement-year">{item.year}</span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
              <div className="achievement-org">{item.organization}</div>
              <p className="achievement-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
