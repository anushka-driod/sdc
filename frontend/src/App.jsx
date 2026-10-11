import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArchModal from './components/ArchModal';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

// Configuration: API Gateway Target
// When running in unified mode on port 5000, relative URLs ('') are used automatically
const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL || 
  (typeof window !== 'undefined' && window.location.port === '5000' ? '' : 'http://localhost:5000');

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  // Fetch portfolio data from Node.js Express API Gateway
  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Fetch Portfolio Data
      const res = await fetch(`${API_BASE_URL}/api/portfolio`);
      if (!res.ok) {
        throw new Error(`API Gateway returned HTTP ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      if (json.success && json.data) {
        setPortfolioData(json.data);
      } else {
        throw new Error(json.message || 'Unexpected response format from gateway.');
      }

      // 2. Fetch System Health Status
      try {
        const healthRes = await fetch(`${API_BASE_URL}/api/health`);
        const healthJson = await healthRes.json();
        setApiStatus(healthJson);
      } catch (healthErr) {
        console.warn('Health check warning:', healthErr.message);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <div className="portfolio-app">
      {/* Navigation Bar */}
      <Navbar
        onOpenArchModal={() => setIsArchModalOpen(true)}
        apiStatus={apiStatus}
      />

      {/* Main Content Area */}
      <main>
        {/* Offline / Error Warning Banner with Retry */}
        {error && (
          <div className="container" style={{ paddingTop: '1.5rem' }}>
            <div className="error-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--status-error-text)' }}>
                <span>&bull;</span>
                <span>API Gateway Unreachable ({API_BASE_URL})</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '640px' }}>
                {error}. Displaying default local content so you can explore the design. To enable live database synchronization, ensure both Django (port 8000) and Node.js (port 5000) servers are running.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  onClick={fetchPortfolioData}
                >
                  Retry API Gateway Connection
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  onClick={() => setIsArchModalOpen(true)}
                >
                  View Architecture Guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State Spinner */}
        {loading && !portfolioData ? (
          <div className="loading-container">
            <div className="spinner" />
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
              Loading portfolio data from Node.js Gateway &amp; Django REST API...
            </p>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Targeting: {API_BASE_URL}/api/portfolio
            </span>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              profile={portfolioData?.profile}
              onOpenArchModal={() => setIsArchModalOpen(true)}
            />

            {/* About Me Section */}
            <About profile={portfolioData?.profile} />

            {/* Skills Section */}
            <Skills skills={portfolioData?.skills} />

            {/* Projects Section */}
            <Projects projects={portfolioData?.projects} />

            {/* Education and Journey Section */}
            <Education education={portfolioData?.education} />

            {/* Achievements Section */}
            <Achievements achievements={portfolioData?.achievements} />

            {/* Contact Section */}
            <Contact
              profile={portfolioData?.profile}
              apiBaseUrl={API_BASE_URL}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onOpenArchModal={() => setIsArchModalOpen(true)} />

      {/* Architecture Lab Information Modal */}
      <ArchModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
        apiBaseUrl={API_BASE_URL}
      />
    </div>
  );
}
