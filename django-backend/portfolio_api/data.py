"""
Initial portfolio seed data for Anushka - BTech AIML Student
College Skill Development Course Lab Project
"""

PROFILE_DATA = {
    "name": "Anushka",
    "greeting": "Hi, I'm Anushka.",
    "role": "BTech AIML Student | Developer | Builder",
    "short_intro": "BTech Artificial Intelligence and Machine Learning student passionate about building practical software, intelligent systems, and modern web applications that solve real-world problems.",
    "about_text": "I am an enthusiastic BTech Artificial Intelligence and Machine Learning student with a strong foundation in programming, algorithms, and full-stack web engineering. Driven by curiosity and practical problem-solving, I enjoy taking concepts from theory to working applications, bridging clean architecture with intuitive user experiences.",
    "email": "anushka.aiml.dev@gmail.com",
    "github_url": "https://github.com/anushka-aiml",
    "linkedin_url": "https://linkedin.com/in/anushka-aiml",
    "initial": "A",
    "college": "Department of AI & ML, Engineering College (Placeholder)",
    "degree": "BTech in Artificial Intelligence & Machine Learning",
    "location": "India"
}

SKILLS_DATA = [
    {
        "name": "C, Python, Java & JavaScript",
        "category": "Languages",
        "proficiency": "Core Proficiencies",
        "icon": "code",
        "order": 1
    },
    {
        "name": "HTML & CSS",
        "category": "Frontend",
        "proficiency": "Semantic & Modern Layouts",
        "icon": "layout",
        "order": 2
    },
    {
        "name": "React.js",
        "category": "Frontend",
        "proficiency": "Components, Hooks & SPAs",
        "icon": "react",
        "order": 3
    },
    {
        "name": "Node.js & Express.js",
        "category": "Backend",
        "proficiency": "API Gateways & REST Services",
        "icon": "server",
        "order": 4
    },
    {
        "name": "Django & REST APIs",
        "category": "Backend",
        "proficiency": "Models, Serializers & Architecture",
        "icon": "django",
        "order": 5
    },
    {
        "name": "SQL & Database Fundamentals",
        "category": "Databases",
        "proficiency": "Schema Design, Queries & SQLite",
        "icon": "database",
        "order": 6
    },
    {
        "name": "AI/ML Fundamentals",
        "category": "AI/ML",
        "proficiency": "Scikit-Learn, Predictive Models & Data Prep",
        "icon": "brain",
        "order": 7
    },
    {
        "name": "Flutter & Firebase",
        "category": "Mobile/Cloud",
        "proficiency": "Cross-Platform UI & Cloud Integration",
        "icon": "smartphone",
        "order": 8
    },
    {
        "name": "Git, GitHub & VS Code",
        "category": "Tools",
        "proficiency": "Version Control & Developer Workflows",
        "icon": "git",
        "order": 9
    }
]

PROJECTS_DATA = [
    {
        "title": "NESTRA — Smart Maternal Health Monitoring System",
        "short_description": "An intelligent healthcare monitoring platform designed to track vital maternal health metrics, detect anomalies through predictive risk assessment, and send automated alerts to healthcare professionals for timely clinical intervention.",
        "technologies": "Python, AI/ML, IoT Telemetry, React, Django REST, SQLite",
        "github_url": "https://github.com/anushka-aiml/nestra-maternal-health",
        "demo_url": "",
        "featured": True,
        "order": 1
    },
    {
        "title": "TRISI — AI-Driven Market Linkage & Smart Cataloging for Artisans",
        "short_description": "An AI-powered digital commerce solution providing automated image recognition and smart tagging for rural artisans' handcrafted goods, calculating fair pricing benchmarks, and connecting artisans directly with buyers.",
        "technologies": "Computer Vision, Python, React.js, Express Gateway, PostgreSQL",
        "github_url": "https://github.com/anushka-aiml/trisi-artisan-market",
        "demo_url": "",
        "featured": True,
        "order": 2
    },
    {
        "title": "AnuDB — Cloud Database Project",
        "short_description": "A lightweight cloud database prototype implementing structured schema definition, indexed key-value storage, JSON query parsing, and an administrative REST interface for rapid prototyping.",
        "technologies": "Node.js, Express.js, Cloud Storage, REST API, JSON DB",
        "github_url": "https://github.com/anushka-aiml/anudb-cloud-engine",
        "demo_url": "",
        "featured": True,
        "order": 3
    },
    {
        "title": "VidhiSetu — Legal Assistance Application",
        "short_description": "A citizen-friendly legal aid portal enabling intuitive access to constitutional rights, simplified legal documentation workflows, and multilingual legal advisory information for underserved communities.",
        "technologies": "NLP, Python, Django REST, React.js, SQLite",
        "github_url": "https://github.com/anushka-aiml/vidhisetu-legal-aid",
        "demo_url": "",
        "featured": True,
        "order": 4
    },
    {
        "title": "Personal Portfolio Website",
        "short_description": "A complete, responsive 3-tier portfolio web application demonstrating end-to-end communication across a React.js Vite frontend, Node.js Express API gateway, and Django REST Framework backend with SQLite database persistence.",
        "technologies": "React.js, Node.js, Express, Django REST, SQLite, Vite",
        "github_url": "https://github.com/anushka-aiml/personal-portfolio",
        "demo_url": "http://localhost:5173",
        "featured": True,
        "order": 5
    }
]

EDUCATION_DATA = [
    {
        "title": "BTech in Artificial Intelligence & Machine Learning",
        "institution": "Department of AI & ML, Engineering College / University (Placeholder)",
        "period": "2023 - 2027 (Ongoing)",
        "details": "Specialized coursework in Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems, Computer Networks, and Object-Oriented Software Design.",
        "score": "CGPA: 8.8 / 10.0 (Sample Placeholder)",
        "order": 1
    },
    {
        "title": "Higher Secondary Education (Class XII - Science)",
        "institution": "Senior Secondary School / Junior College (Placeholder)",
        "period": "2021 - 2023",
        "details": "Focused on Mathematics, Physics, Chemistry, and Computer Science fundamentals with practical lab experimentation.",
        "score": "Grade: 92% (Sample Placeholder)",
        "order": 2
    },
    {
        "title": "Secondary School Examination (Class X)",
        "institution": "High School (Placeholder)",
        "period": "2020 - 2021",
        "details": "General secondary curriculum with distinction in Science and Mathematics.",
        "score": "Grade: 94% (Sample Placeholder)",
        "order": 3
    }
]

ACHIEVEMENTS_DATA = [
    {
        "title": "Skill Development Course — 3-Tier Lab Project",
        "category": "Academic",
        "organization": "Department of Artificial Intelligence & Machine Learning",
        "year": "2026",
        "description": "Successfully conceptualized, architected, and deployed a 3-tier decoupled web system integrating React (Vite), Express API Gateway, and Django REST Framework.",
        "order": 1
    },
    {
        "title": "National Cadet Corps (NCC) Active Participation",
        "category": "NCC",
        "organization": "NCC Directorate",
        "year": "2024 - 2025",
        "description": "Trained cadet participating in rigorous drill sessions, social service drives, team building, and leadership discipline camps.",
        "order": 2
    },
    {
        "title": "AI & Machine Learning Foundations Certification",
        "category": "Certification",
        "organization": "Certified Online Technical Learning Platform (Placeholder)",
        "year": "2025",
        "description": "Completed coursework covering supervised learning, classification, regression, model performance evaluation, and Python data analysis libraries.",
        "order": 3
    },
    {
        "title": "College Tech Hackathon — Healthcare Innovation Finalist",
        "category": "Hackathon",
        "organization": "Inter-College Innovation Challenge",
        "year": "2025",
        "description": "Presented the NESTRA maternal health monitoring prototype in team competition, earning recognition for social impact and system feasibility.",
        "order": 4
    }
]
