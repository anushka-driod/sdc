@echo off
title Anushka Portfolio - Unified 3-Tier Launcher
color 0B
echo ==============================================================================
echo           ANUSHKA - PERSONAL PORTFOLIO WEBSITE (3-TIER APPLICATION)
echo ==============================================================================
echo.
echo Starting Tier 3: Django REST Framework API (Port 8000)...
start "Django REST API (Port 8000)" cmd /k "cd /d %~dp0django-backend && .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000 --noreload"

timeout /t 2 /nobreak > nul

echo Starting Tier 2 ^& 1: Node.js Express Gateway ^& Unified Website (Port 5000)...
start "Node.js Unified Server (Port 5000)" cmd /k "cd /d %~dp0node-backend && node server.js"

timeout /t 2 /nobreak > nul

echo.
echo ==============================================================================
echo  ALL SERVICES STARTED SUCCESSFULLY!
echo  Your Single Localhost URL:
echo  ---> http://localhost:5000 <---
echo ==============================================================================
echo.
echo Opening portfolio in your default web browser...
start http://localhost:5000
echo.
pause
