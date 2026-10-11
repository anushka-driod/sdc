/**
 * Node.js Express API Gateway
 * Architecture: React Frontend (5173) -> Node.js Express Gateway (5000) -> Django REST API (8000)
 *
 * Responsibilities:
 * 1. Reverse proxy & API gateway for portfolio data from Django
 * 2. Contact form input validation, sanitation, and forwarding to Django
 * 3. CORS management between frontend and backend services
 * 4. Aggregated system health checking
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const DJANGO_API_URL = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());

// CORS Configuration - Allows local frontend and common dev ports
const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('CORS policy does not allow access from origin: ' + origin), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

/**
 * Health Check Endpoint
 * GET /api/health
 * Checks gateway status and upstream Django API status
 */
app.get('/api/health', async (req, res) => {
  let djangoStatus = 'unreachable';
  let djangoDetails = null;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${DJANGO_API_URL}/health/`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      djangoStatus = 'healthy';
      djangoDetails = await response.json();
    } else {
      djangoStatus = `error (${response.status})`;
    }
  } catch (err) {
    djangoStatus = `disconnected (${err.message})`;
  }

  const isHealthy = djangoStatus === 'healthy';

  res.status(isHealthy ? 200 : 207).json({
    status: isHealthy ? 'healthy' : 'degraded',
    gateway: {
      service: 'Node.js Express API Gateway',
      version: '1.0.0',
      port: PORT,
      timestamp: new Date().toISOString()
    },
    upstream: {
      service: 'Python Django REST Framework API',
      url: DJANGO_API_URL,
      status: djangoStatus,
      details: djangoDetails
    }
  });
});

/**
 * Portfolio Data Endpoint
 * GET /api/portfolio
 * Fetches profile, skills, projects, education, and achievements from Django REST API
 */
app.get('/api/portfolio', async (req, res) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const djangoRes = await fetch(`${DJANGO_API_URL}/portfolio/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!djangoRes.ok) {
      throw new Error(`Upstream Django returned status ${djangoRes.status}: ${djangoRes.statusText}`);
    }

    const data = await djangoRes.json();

    // Enrich response with gateway metadata
    res.json({
      success: true,
      data: data,
      metadata: {
        servedBy: 'Node.js Express API Gateway',
        upstream: 'Django REST API',
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Error fetching portfolio data from Django:', err.message);
    res.status(503).json({
      success: false,
      error: 'Upstream Portfolio Service Unavailable',
      message: 'Failed to communicate with Django REST API. Please ensure the Django backend is running.',
      details: err.message
    });
  }
});

/**
 * Contact Submission Endpoint
 * POST /api/contact
 * Validates form submission and forwards to Django API for database persistence
 */
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters long.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    errors.push('Message is required and must be at least 5 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors
    });
  }

  const payload = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim()
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const djangoRes = await fetch(`${DJANGO_API_URL}/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const responseData = await djangoRes.json();

    if (!djangoRes.ok) {
      return res.status(djangoRes.status).json({
        success: false,
        error: 'Django API Error',
        details: responseData
      });
    }

    res.status(201).json({
      success: true,
      message: responseData.message || 'Your message has been submitted and saved successfully!',
      data: responseData.data || responseData
    });
  } catch (err) {
    console.error('Error forwarding contact message to Django:', err.message);
    res.status(503).json({
      success: false,
      error: 'Upstream Service Unavailable',
      message: 'Could not forward message to Django backend. Please verify Django server is active.',
      details: err.message
    });
  }
});

// ============================================================================
// Single Localhost Mode: Serve Built React Frontend & SPA Fallback
// ============================================================================
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

// 404 Handler for unmatched API endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    requestedUrl: req.originalUrl
  });
});

// Single Page Application Fallback for Web Routes
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).json({
    name: "Anushka's Portfolio API Gateway",
    role: "Node.js Express Gateway",
    singleLocalhostUrl: `http://localhost:${PORT}`,
    routes: [
      "/api/health",
      "/api/portfolio",
      "/api/contact"
    ],
    upstream: DJANGO_API_URL,
    note: "Frontend build not detected. Run 'cd frontend && npm run build' to serve the React UI from this single localhost."
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Node.js Express Gateway running at: http://localhost:${PORT}`);
  console.log(` Upstream Django REST API target:   ${DJANGO_API_URL}`);
  console.log(` Allowed Frontend Origin:            ${FRONTEND_URL}`);
  console.log(`====================================================`);
});

module.exports = app;
