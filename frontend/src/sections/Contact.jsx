import React, { useState } from 'react';

export default function Contact({ profile, apiBaseUrl }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  const email = profile?.email || 'anushka.aiml.dev@gmail.com';
  const githubUrl = profile?.github_url || 'https://github.com/anushka-aiml';
  const linkedinUrl = profile?.linkedin_url || 'https://linkedin.com/in/anushka-aiml';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Frontend validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatusMessage({ type: 'error', text: 'Please provide a valid name (at least 2 characters).' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatusMessage({ type: 'error', text: 'Please include a message with at least 5 characters.' });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Thank you! Your message has been saved in the database via the 3-tier gateway.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorDetail = data.messages ? data.messages.join(' ') : data.error || 'Submission failed.';
        setStatusMessage({
          type: 'error',
          text: `Error: ${errorDetail}`
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: `Network Error: Unable to contact the API gateway (${err.message}). Please ensure the Node.js and Django servers are running.`
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h2 className="section-title">Contact &amp; Connect</h2>
          <p className="section-subtitle">
            Feel free to reach out regarding academic collaborations, project feedback, or software engineering inquiries.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="contact-info-card">
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Connect Directly
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                You can reach out through email or explore my open-source code and professional profile.
              </p>
            </div>

            <div className="contact-channels-list">
              {/* Email */}
              <a href={`mailto:${email}`} className="contact-channel-item">
                <div className="contact-channel-icon">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="contact-channel-label">Email Address</div>
                  <div className="contact-channel-value">{email}</div>
                </div>
              </a>

              {/* GitHub */}
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                <div className="contact-channel-icon">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div>
                  <div className="contact-channel-label">GitHub Profile</div>
                  <div className="contact-channel-value">github.com/anushka-aiml</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                <div className="contact-channel-icon">
                  <svg className="icon-svg" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <div className="contact-channel-label">LinkedIn Profile</div>
                  <div className="contact-channel-value">linkedin.com/in/anushka-aiml</div>
                </div>
              </a>
            </div>

            <div style={{ padding: '1rem', background: 'var(--lavender-50)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--lavender-200)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--lavender-700)', marginBottom: '0.25rem' }}>
                Lab Evaluation Notice
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Messages submitted through the form are routed to the Express Gateway (port 5000) and persisted in SQLite by Django REST Framework (port 8000).
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrap">
            <h3 className="contact-form-title">Send a Message</h3>
            <p className="contact-form-subtitle">
              Fill in your details to test the live end-to-end data submission flow.
            </p>

            {statusMessage && (
              <div className={`form-alert ${statusMessage.type === 'success' ? 'form-alert-success' : 'form-alert-error'}`}>
                <span>{statusMessage.type === 'success' ? '\u2713' : '!'}</span>
                <div>{statusMessage.text}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Professor Sharma / Fellow Developer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Share feedback on the portfolio, question about NESTRA or project queries..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                    <span>Transmitting to Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Message</span>
                    <svg className="icon-svg" viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }}>
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
