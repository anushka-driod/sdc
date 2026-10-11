# Anushka — Personal Portfolio Website (3-Tier Full-Stack Web Application)

> **College Skill Development Course (SDC) Lab Project**  
> **Student:** Anushka | **Program:** BTech Artificial Intelligence & Machine Learning (AIML)  
> **Architecture:** React.js (Vite) &rarr; Node.js Express API Gateway &rarr; Python Django REST Framework &rarr; SQLite3

---

## 1. Project Overview

This project is a decoupled 3-tier portfolio web application engineered for **Anushka, a BTech AIML student**. It showcases her profile, academic achievements, technical skill set, and five flagship projects while providing an interactive contact form and live system health diagnostics.

### Why 3 Decoupled Tiers?
1. **Frontend (Client Layer — React + Vite):** Fast Single Page Application (SPA) with reactive component state, smooth scrolling, and accessible UX.
2. **Backend 1 (Gateway Layer — Node.js + Express):** Reverse proxy & API Gateway handling CORS policies, request rate-checks, payload validation, and system routing.
3. **Backend 2 (Data & Business Logic Layer — Python Django + DRF):** High-reliability REST API with Django ORM models, serializers, and SQLite persistence.

```
+-------------------------------------------------------------+
|              React.js Frontend (Vite)                      |
|                  http://localhost:5173                      |
+------------------------------+------------------------------+
                               |
                               | HTTP GET / POST (JSON)
                               v
+-------------------------------------------------------------+
|    Node.js Express API Gateway & Web Server (SINGLE HOST)   |
|                  http://localhost:5000                      |
|  * Serves React Frontend  * Input Validation  * Proxying    |
+------------------------------+------------------------------+
                               |
                               | Internal Server-to-Server
                               v
+-------------------------------------------------------------+
|        Python Django 5.2 + Django REST Framework            |
|                  http://127.0.0.1:8000                      |
|  * ORM Domain Models  * Serializers  * SQLite Persistence   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                SQLite Database (db.sqlite3)                 |
|  * Profile  * Skills  * Projects  * Education  * Messages   |
+-------------------------------------------------------------+
```

### Quick Launch: Single Localhost (`http://localhost:5000`)
You can access the entire application from a **single localhost URL**:
> **`http://localhost:5000`**

To launch everything in one click:
- Double-click **`start.bat`** (or in PowerShell run **`.\start.ps1`**).
- It boots Django (8000), starts Node.js (5000) with the bundled React frontend, and opens `http://localhost:5000` directly in your browser!

---

## 2. Directory Structure

```
sdc/
├── frontend/                         # Tier 1: Client SPA
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Responsive navigation & 3-tier status pill
│   │   │   ├── Footer.jsx            # Footer with tech stack tags
│   │   │   └── ArchModal.jsx         # Live 3-tier architecture diagnostic modal
│   │   ├── sections/
│   │   │   ├── Hero.jsx              # Intro, initial 'A' card, role & CTAs
│   │   │   ├── About.jsx             # AIML background, values, & highlights
│   │   │   ├── Skills.jsx            # 9 organized skill cards with filter tabs
│   │   │   ├── Projects.jsx          # 5 project cards (NESTRA, TRISI, AnuDB, etc.)
│   │   │   ├── Education.jsx         # Milestones & learning journey timeline
│   │   │   ├── Achievements.jsx      # Verified certifications, hackathons & NCC
│   │   │   └── Contact.jsx           # Working form connected to API gateway
│   │   ├── App.jsx                   # Main orchestrator with state & retry
│   │   ├── App.css                   # Component styling & responsiveness
│   │   ├── index.css                 # Lavender design tokens & typography
│   │   └── main.jsx                  # React DOM mount point
│   ├── index.html                    # HTML shell with Google Fonts
│   ├── vite.config.js                # Vite build configuration
│   └── package.json                  # Frontend dependencies
│
├── node-backend/                     # Tier 2: API Gateway
│   ├── server.js                     # Express server & proxy routes
│   ├── test-integration.js           # Automated end-to-end integration test
│   ├── .env                          # Active gateway configuration
│   ├── .env.example                  # Example environment variables
│   └── package.json                  # Express & CORS dependencies
│
├── django-backend/                   # Tier 3: Core API & Database
│   ├── manage.py                     # Django management script
│   ├── requirements.txt              # Django, DRF, and CORS headers
│   ├── db.sqlite3                    # SQLite database file
│   └── portfolio_api/
│       ├── __init__.py
│       ├── settings.py               # Django configuration, CORS & DRF settings
│       ├── urls.py                   # /api/health/, /api/portfolio/, /api/contact/
│       ├── models.py                 # Profile, Skill, Project, Education, Contact
│       ├── serializers.py            # DRF ModelSerializers with validation
│       ├── views.py                  # API views for health, portfolio, & contact
│       ├── data.py                   # Initial baseline seed content
│       ├── tests.py                  # Django automated test suite
│       └── management/commands/
│           └── seed_data.py          # python manage.py seed_data command
│
└── README.md                         # Complete documentation & lab viva guide
```

---

## 3. Prerequisites

Ensure you have installed:
- **Node.js**: v18.x or newer (Tested on v24.19.0)
- **Python**: v3.10 or newer (Tested on Python 3.13)
- **Windows PowerShell** or terminal of your choice

---

## 4. Step-by-Step Installation & Setup

Open **Windows PowerShell** (or VS Code Integrated Terminal) inside the workspace folder `sdc`.

### Step 4.1: Django Backend Setup (Terminal 1)
```powershell
cd django-backend

# 1. Create a Python virtual environment
python -m venv venv

# 2. Activate virtual environment
.\venv\Scripts\Activate.ps1

# If script execution is restricted in PowerShell, run:
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# or invoke Python directly: .\venv\Scripts\python.exe

# 3. Install required Python packages
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# 4. Run database migrations
.\venv\Scripts\python.exe manage.py makemigrations portfolio_api
.\venv\Scripts\python.exe manage.py migrate

# 5. Populate SQLite database with Anushka's portfolio data
.\venv\Scripts\python.exe manage.py seed_data

# 6. Run unit tests to verify
.\venv\Scripts\python.exe manage.py test

# 7. Start the Django development server
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```
> Django will be active at: `http://127.0.0.1:8000/api/health/` and `http://127.0.0.1:8000/api/portfolio/`

---

### Step 4.2: Node.js Express Gateway Setup (Terminal 2)
Open a **second terminal** window:
```powershell
cd node-backend

# 1. Install Node.js dependencies
npm.cmd install

# 2. (Optional) Run the 3-Tier Integration Test Suite
node test-integration.js

# 3. Start the Express API Gateway
node server.js
```
> The Gateway will be active at: `http://localhost:5000/api/health` and `http://localhost:5000/api/portfolio`

---

### Step 4.3: React Frontend Setup (Terminal 3)
Open a **third terminal** window:
```powershell
cd frontend

# 1. Install frontend dependencies
npm.cmd install

# 2. Start the Vite React development server
npm.cmd run dev
```
> Open your browser and navigate to: `http://localhost:5173/`

---

## 5. Live URLs & Endpoints

| Service | Technology | Local URL | Primary Function |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | React.js + Vite | `http://localhost:5173` | Responsive UI with soft lavender styling & sections |
| **Gateway Health** | Node.js Express | `http://localhost:5000/api/health` | Diagnostic status of Gateway + upstream Django |
| **Gateway Portfolio** | Node.js Express | `http://localhost:5000/api/portfolio` | Proxies & caches Django portfolio data to React |
| **Gateway Contact** | Node.js Express | `http://localhost:5000/api/contact` | Validates & forwards form submissions |
| **Django REST API** | Python Django | `http://127.0.0.1:8000/api/portfolio/` | Core data endpoint serving models via DRF |
| **Django Health** | Python Django | `http://127.0.0.1:8000/api/health/` | Verifies Django & SQLite connectivity |
| **Django Admin** | Python Django | `http://127.0.0.1:8000/admin/` | Standard Django admin interface |

---

## 6. How to Edit Portfolio Content

### Option A: Using the Data Module (Recommended)
Edit the file: `django-backend/portfolio_api/data.py`
1. Update `PROFILE_DATA`, `SKILLS_DATA`, `PROJECTS_DATA`, `EDUCATION_DATA`, or `ACHIEVEMENTS_DATA`.
2. Run in terminal:
   ```powershell
   cd django-backend
   .\venv\Scripts\python.exe manage.py seed_data
   ```
3. Refresh the React website (`http://localhost:5173`). All changes will instantly reflect!

### Option B: Using Django Admin
1. Create a superuser:
   ```powershell
   cd django-backend
   .\venv\Scripts\python.exe manage.py createsuperuser
   ```
2. Navigate to `http://127.0.0.1:8000/admin/` and log in to add or modify records via UI.

---

## 7. Automated Test Suites & Results

### 1. Django Backend Unit Tests
Command:
```powershell
cd django-backend
.\venv\Scripts\python.exe manage.py test
```
Result:
```
Creating test database for alias 'default'...
....
----------------------------------------------------------------------
Ran 4 tests in 0.220s

OK
Destroying test database for alias 'default'...
```
- `test_health_endpoint` &rarr; 200 OK + SQLite connection verified
- `test_portfolio_endpoint` &rarr; 200 OK + models payload verified
- `test_contact_endpoint_success` &rarr; 201 Created + SQLite insert confirmed
- `test_contact_endpoint_validation_failure` &rarr; 400 Bad Request on invalid fields

### 2. End-to-End 3-Tier Integration Test Suite
Command:
```powershell
cd node-backend
node test-integration.js
```
Result:
```
====================================================
 Starting End-to-End 3-Tier Integration Test Suite
====================================================

[Step 1] Checking Django REST API directly (http://127.0.0.1:8000/api/health/)...
[PASS] Test 1: Django Health endpoint responded with 200 OK
[PASS] Test 2: Django service identity is verified
[PASS] Test 3: Django SQLite database is connected

[Step 2] Checking Node.js Express Gateway (http://127.0.0.1:5000/api/health)...
[PASS] Test 4: Node.js Gateway responded with 200 OK
[PASS] Test 5: Node.js Gateway identity verified
[PASS] Test 6: Node.js successfully verified upstream Django health

[Step 3] Fetching Portfolio Data via Gateway (http://127.0.0.1:5000/api/portfolio)...
[PASS] Test 7: Portfolio endpoint returned 200 OK
[PASS] Test 8: Response marked success
[PASS] Test 9: Profile data received: Anushka
[PASS] Test 10: Skills count: 9 (expected >= 9)
[PASS] Test 11: Projects count: 5 (expected 5)
[PASS] Test 12: Education records count: 3
[PASS] Test 13: Achievements count: 4

[Step 4] Submitting Valid Contact Form through Gateway (POST /api/contact)...
[PASS] Test 14: Contact submission returned 201 Created (got 201)
[PASS] Test 15: Contact submission marked success
[PASS] Test 16: Contact message saved with correct author

[Step 5] Testing Contact Form Validation Rejection (Invalid email & empty name)...
[PASS] Test 17: Validation rejection returned 400 Bad Request (got 400)
[PASS] Test 18: Validation failure correctly flagged

====================================================
 Test Results: 18 / 18 tests PASSED (100%)
====================================================
```

### 3. Frontend Production Build
Command:
```powershell
cd frontend
npm.cmd run build
```
Result:
```
✓ 27 modules transformed.
dist/index.html                   1.41 kB │ gzip:  0.78 kB
dist/assets/index.css            22.60 kB │ gzip:  4.52 kB
dist/assets/index.js            261.52 kB │ gzip: 79.40 kB
✓ built in 380ms
```

---

## 8. Troubleshooting Common Errors

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **`npm : File ... cannot be loaded because running scripts is disabled`** | Windows PowerShell ExecutionPolicy restriction | Use `npm.cmd` instead of `npm`, or run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| **`API Gateway Unreachable` banner on website** | Node.js Gateway server not running | Start the Gateway via `cd node-backend; node server.js` |
| **`Upstream Portfolio Service Unavailable`** | Django backend not running | Start Django via `cd django-backend; .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000` |
| **Port 5000 or 8000 already in use** | An existing background process holds the port | In PowerShell, run `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess \| Stop-Process -Force` |

---

## 9. College Lab Viva & Evaluation Guide

### Q1: What is the architecture of this project?
> **Answer:** It is a decoupled **3-tier web architecture**.
> - **Tier 1 (Presentation):** React.js with Vite creates a responsive, dynamic Single Page Application (SPA).
> - **Tier 2 (Gateway/Middleware):** Node.js Express acts as an API gateway managing security, sanitization, input validation, and proxying.
> - **Tier 3 (Data & Business Logic):** Python Django REST Framework executes domain logic, serializes model data, and stores records in an SQLite relational database.

### Q2: Why use Node.js Express as an API gateway in front of Django instead of calling Django directly?
> **Answer:** In modern microservice and enterprise architectures, an API Gateway pattern shields backend services from client complexities. Node.js handles asynchronous, high-concurrency request routing, sanitizes inputs, enforces CORS boundaries, and allows future additions (e.g. rate-limiting, caching, authentication) without altering Django business logic.

### Q3: How does the Contact form work from end-to-end?
> **Answer:**
> 1. The user inputs their Name, Email, and Message into the React form.
> 2. React validates the field format and sends an HTTP `POST` request to `http://localhost:5000/api/contact`.
> 3. Express validates data types and emails. If valid, it sends an internal server-to-server HTTP `POST` to Django at `http://127.0.0.1:8000/api/contact/`.
> 4. Django REST Framework deserializes the payload, validates constraints, and executes an `INSERT` into the `portfolio_api_contactmessage` table in `db.sqlite3`.
> 5. Django returns HTTP `201 Created` back to Node, which forwards the success response to React to render the green confirmation alert.

### Q4: How is data seeded into the database?
> **Answer:** A custom Django management command `python manage.py seed_data` reads data from `portfolio_api/data.py` and populates the SQLite models (`Profile`, `Skill`, `Project`, `Education`, and `Achievement`).

### Q5: What projects are showcased for Anushka?
> **Answer:**
> 1. **NESTRA** — Smart Maternal Health Monitoring System (AI/IoT vitals tracking & risk alerts)
> 2. **TRISI** — AI-Driven Market Linkage & Smart Cataloging for Artisans (Computer vision & pricing)
> 3. **AnuDB** — Cloud Database Project (Lightweight key-value storage engine)
> 4. **VidhiSetu** — Legal Assistance Application (Citizen legal aid & vernacular interface)
> 5. **Personal Portfolio Website** — 3-Tier Full-Stack Application (React + Express + Django + SQLite)
