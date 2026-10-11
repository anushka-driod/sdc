/**
 * End-to-End System Verification Test Script
 * Verifies communication between:
 * React (Client) -> Node.js Express Gateway (5000) -> Django REST API (8000) -> SQLite
 */

const http = require('http');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: json });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, text: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log(' Starting End-to-End 3-Tier Integration Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] Test ${total}: ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] Test ${total}: ${message}`);
    }
  }

  // 1. Check Django directly
  console.log('[Step 1] Checking Django REST API directly (http://127.0.0.1:8000/api/health/)...');
  try {
    const djangoHealth = await request('http://127.0.0.1:8000/api/health/');
    assert(djangoHealth.status === 200, 'Django Health endpoint responded with 200 OK');
    assert(djangoHealth.data.service === 'django-portfolio-api', 'Django service identity is verified');
    assert(djangoHealth.data.database.status === 'connected', 'Django SQLite database is connected');
  } catch (err) {
    console.error('Failed to connect to Django:', err.message);
    assert(false, `Django connection failed: ${err.message}`);
  }

  // 2. Check Node Express Gateway Health
  console.log('\n[Step 2] Checking Node.js Express Gateway (http://127.0.0.1:5000/api/health)...');
  try {
    const nodeHealth = await request('http://127.0.0.1:5000/api/health');
    assert(nodeHealth.status === 200, 'Node.js Gateway responded with 200 OK');
    assert(nodeHealth.data.gateway.service === 'Node.js Express API Gateway', 'Node.js Gateway identity verified');
    assert(nodeHealth.data.upstream.status === 'healthy', 'Node.js successfully verified upstream Django health');
  } catch (err) {
    console.error('Failed to connect to Node.js Gateway:', err.message);
    assert(false, `Node.js connection failed: ${err.message}`);
  }

  // 3. Check Portfolio Data through Gateway
  console.log('\n[Step 3] Fetching Portfolio Data via Gateway (http://127.0.0.1:5000/api/portfolio)...');
  try {
    const portfolioRes = await request('http://127.0.0.1:5000/api/portfolio');
    assert(portfolioRes.status === 200, 'Portfolio endpoint returned 200 OK');
    assert(portfolioRes.data.success === true, 'Response marked success');
    
    const d = portfolioRes.data.data;
    assert(d.profile && d.profile.name === 'Anushka', 'Profile data received: Anushka');
    assert(Array.isArray(d.skills) && d.skills.length >= 9, `Skills count: ${d.skills.length} (expected >= 9)`);
    assert(Array.isArray(d.projects) && d.projects.length >= 5, `Projects count: ${d.projects.length} (expected 5)`);
    assert(Array.isArray(d.education) && d.education.length >= 3, `Education records count: ${d.education.length}`);
    assert(Array.isArray(d.achievements) && d.achievements.length >= 4, `Achievements count: ${d.achievements.length}`);
  } catch (err) {
    assert(false, `Portfolio fetch failed: ${err.message}`);
  }

  // 4. Test Contact Form Submission via Gateway
  console.log('\n[Step 4] Submitting Valid Contact Form through Gateway (POST /api/contact)...');
  try {
    const contactPayload = {
      name: 'Lab Evaluator',
      email: 'evaluator@college.edu',
      message: 'Testing 3-tier end-to-end data submission from Node gateway to Django SQLite.'
    };
    const contactRes = await request('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, contactPayload);

    assert(contactRes.status === 201, `Contact submission returned 201 Created (got ${contactRes.status})`);
    assert(contactRes.data.success === true, 'Contact submission marked success');
    assert(contactRes.data.data && contactRes.data.data.name === 'Lab Evaluator', 'Contact message saved with correct author');
  } catch (err) {
    assert(false, `Contact submission failed: ${err.message}`);
  }

  // 5. Test Contact Form Validation Rejection
  console.log('\n[Step 5] Testing Contact Form Validation Rejection (Invalid email & empty name)...');
  try {
    const invalidPayload = {
      name: 'A',
      email: 'invalid-email-address',
      message: 'Hi'
    };
    const invalidRes = await request('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, invalidPayload);

    assert(invalidRes.status === 400, `Validation rejection returned 400 Bad Request (got ${invalidRes.status})`);
    assert(invalidRes.data.success === false, 'Validation failure correctly flagged');
  } catch (err) {
    assert(false, `Validation test failed: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(` Test Results: ${passed} / ${total} tests PASSED (${Math.round((passed/total)*100)}%)`);
  console.log('====================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
