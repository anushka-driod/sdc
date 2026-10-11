import React, { useState, useEffect } from 'react';

export default function ArchModal({ isOpen, onClose, apiBaseUrl }) {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/api/health`);
      const data = await res.json();
      setHealthData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nodeStatus = healthData?.gateway ? 'Healthy (Port 5000)' : error ? 'Offline' : 'Checking...';
  const djangoStatus = healthData?.upstream?.status === 'healthy' ? 'Healthy (Port 8000)' : healthData?.upstream?.status || 'Offline';

  return (
    <div className="arch-modal-overlay" onClick={onClose}>
      <div className="arch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="arch-modal-header">
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>3-Tier System Architecture</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Skill Development Course Lab: Decoupled Full-Stack Architecture
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
          >
            Close
          </button>
        </div>

        <div className="arch-flow-diagram">
          {/* Tier 1 */}
          <div className="arch-node">
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Tier 1: Frontend (Client Layer)</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                React.js 19 + Vite + Vanilla CSS (Port 5173)
              </span>
            </div>
            <span className="tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              Client SPA
            </span>
          </div>

          <div className="arch-arrow">
            &darr; HTTP / JSON REST Requests (Cross-Origin CORS)
          </div>

          {/* Tier 2 */}
          <div className="arch-node">
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Tier 2: API Gateway (Middleware Layer)</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Node.js + Express.js (Port 5000)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className={`status-dot ${healthData?.gateway ? 'status-dot-green' : 'status-dot-orange'}`} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{nodeStatus}</span>
            </div>
          </div>

          <div className="arch-arrow">
            &darr; Server-to-Server Internal Forwarding &amp; Input Validation
          </div>

          {/* Tier 3 */}
          <div className="arch-node">
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Tier 3: Core API &amp; Database Layer</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Python 3.13 + Django 5.2 + Django REST Framework (Port 8000) &amp; SQLite3
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className={`status-dot ${healthData?.upstream?.status === 'healthy' ? 'status-dot-green' : 'status-dot-orange'}`} />
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{djangoStatus}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Architecture Responsibilities</h4>
          <p>
            <strong>1. React Frontend:</strong> Manages stateful user interactions, dynamic component rendering, data fetching with loading/retry states, and responsive styling.
          </p>
          <p>
            <strong>2. Node.js Express Gateway:</strong> Acts as the single entry point. Sanitizes and validates client payloads, handles CORS, and shields backend services.
          </p>
          <p>
            <strong>3. Django REST API:</strong> Manages domain models (Profile, Skill, Project, Education, Achievement, ContactMessage), serializers, and persistent storage via SQLite.
          </p>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={checkHealth}
            disabled={loading}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            {loading ? 'Pinging Services...' : 'Re-check Service Health'}
          </button>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Node: 5000 | Django: 8000
          </span>
        </div>
      </div>
    </div>
  );
}
