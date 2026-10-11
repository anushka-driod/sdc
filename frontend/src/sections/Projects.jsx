import React from 'react';

export default function Projects({ projects }) {
  const fallbackProjects = [
    {
      id: 1,
      title: 'NESTRA — Smart Maternal Health Monitoring System',
      short_description: 'An intelligent healthcare monitoring platform designed to track vital maternal health metrics, detect anomalies through predictive risk assessment, and send automated alerts to healthcare professionals for timely clinical intervention.',
      technologies: 'Python, AI/ML, IoT Telemetry, React, Django REST, SQLite',
      tech_list: ['Python', 'AI/ML', 'IoT Telemetry', 'React', 'Django REST', 'SQLite'],
      github_url: 'https://github.com/anushka-aiml/nestra-maternal-health',
      demo_url: '',
      order: 1
    },
    {
      id: 2,
      title: 'TRISI — AI-Driven Market Linkage & Smart Cataloging for Artisans',
      short_description: 'An AI-powered digital commerce solution providing automated image recognition and smart tagging for rural artisans handcrafted goods, calculating fair pricing benchmarks, and connecting artisans directly with buyers.',
      technologies: 'Computer Vision, Python, React.js, Express Gateway, PostgreSQL',
      tech_list: ['Computer Vision', 'Python', 'React.js', 'Express Gateway', 'PostgreSQL'],
      github_url: 'https://github.com/anushka-aiml/trisi-artisan-market',
      demo_url: '',
      order: 2
    },
    {
      id: 3,
      title: 'AnuDB — Cloud Database Project',
      short_description: 'A lightweight cloud database prototype implementing structured schema definition, indexed key-value storage, JSON query parsing, and an administrative REST interface for rapid prototyping.',
      technologies: 'Node.js, Express.js, Cloud Storage, REST API, JSON DB',
      tech_list: ['Node.js', 'Express.js', 'Cloud Storage', 'REST API', 'JSON DB'],
      github_url: 'https://github.com/anushka-aiml/anudb-cloud-engine',
      demo_url: '',
      order: 3
    },
    {
      id: 4,
      title: 'VidhiSetu — Legal Assistance Application',
      short_description: 'A citizen-friendly legal aid portal enabling intuitive access to constitutional rights, simplified legal documentation workflows, and multilingual legal advisory information for underserved communities.',
      technologies: 'NLP, Python, Django REST, React.js, SQLite',
      tech_list: ['NLP', 'Python', 'Django REST', 'React.js', 'SQLite'],
      github_url: 'https://github.com/anushka-aiml/vidhisetu-legal-aid',
      demo_url: '',
      order: 4
    },
    {
      id: 5,
      title: 'Personal Portfolio Website',
      short_description: 'A complete, responsive 3-tier portfolio web application demonstrating end-to-end communication across a React.js Vite frontend, Node.js Express API gateway, and Django REST Framework backend with SQLite database persistence.',
      technologies: 'React.js, Node.js, Express, Django REST, SQLite, Vite',
      tech_list: ['React.js', 'Node.js', 'Express', 'Django REST', 'SQLite', 'Vite'],
      github_url: 'https://github.com/anushka-aiml/personal-portfolio',
      demo_url: 'http://localhost:5173',
      order: 5
    }
  ];

  const projectList = projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Academic &amp; Lab Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Hands-on software systems integrating artificial intelligence, full-stack architectures, and practical problem-solving.
          </p>
        </div>

        <div className="projects-grid">
          {projectList.map((project, idx) => {
            const techItems = project.tech_list && project.tech_list.length > 0
              ? project.tech_list
              : project.technologies?.split(',').map((t) => t.trim()) || [];

            return (
              <div className="project-card" key={project.id || idx}>
                <div className="project-card-header">
                  <span className="project-num-badge">0{idx + 1}</span>
                  <span className="tag">Lab Project</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.short_description}</p>

                <div className="project-tags-wrap">
                  {techItems.map((tech, tIdx) => (
                    <span className="tag" key={tIdx}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-card-action"
                    >
                      <svg className="icon-svg" viewBox="0 0 24 24" style={{ width: '0.95rem', height: '0.95rem' }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>Repository</span>
                    </a>
                  )}

                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-card-action"
                    >
                      <span>Live App</span>
                      <svg className="icon-svg" viewBox="0 0 24 24" style={{ width: '0.95rem', height: '0.95rem' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    <span className="btn btn-outline btn-card-action" style={{ opacity: 0.75, cursor: 'default' }}>
                      Academic Lab Demo
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
