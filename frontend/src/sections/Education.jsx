import React from 'react';

export default function Education({ education }) {
  const fallbackEducation = [
    {
      id: 1,
      title: 'BTech in Artificial Intelligence & Machine Learning',
      institution: 'Department of AI & ML, Engineering College / University (Placeholder)',
      period: '2023 - 2027 (Ongoing)',
      details: 'Specialized coursework in Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems, Computer Networks, and Object-Oriented Software Design.',
      score: 'Current CGPA: 8.8 / 10.0 (Sample Placeholder)',
      order: 1
    },
    {
      id: 2,
      title: 'Higher Secondary Education (Class XII - Science)',
      institution: 'Senior Secondary School / Junior College (Placeholder)',
      period: '2021 - 2023',
      details: 'Focused on Mathematics, Physics, Chemistry, and Computer Science fundamentals with practical lab experimentation.',
      score: 'Grade: 92% (Sample Placeholder)',
      order: 2
    },
    {
      id: 3,
      title: 'Secondary School Examination (Class X)',
      institution: 'High School (Placeholder)',
      period: '2020 - 2021',
      details: 'General secondary curriculum with distinction in Science, Mathematics, and Logical Reasoning.',
      score: 'Grade: 94% (Sample Placeholder)',
      order: 3
    }
  ];

  const eduList = education && education.length > 0 ? education : fallbackEducation;

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Academic Milestones</span>
          <h2 className="section-title">Education &amp; Learning Journey</h2>
          <p className="section-subtitle">
            Timeline of academic pursuits, institutional training, and foundational coursework in computing and AI.
          </p>
        </div>

        <div className="timeline-wrap">
          {eduList.map((item, idx) => (
            <div className="timeline-item" key={item.id || idx}>
              <div className="timeline-marker" />
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-title">{item.title}</h3>
                  <span className="timeline-period-badge">{item.period}</span>
                </div>

                <div className="timeline-institution">{item.institution}</div>
                <p className="timeline-details">{item.details}</p>

                {item.score && (
                  <div className="timeline-score">
                    {item.score}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
