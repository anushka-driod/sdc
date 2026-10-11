# ==============================================================================
# Anushka Portfolio - Unified 3-Tier PowerShell Launcher
# ==============================================================================

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "          ANUSHKA - PERSONAL PORTFOLIO WEBSITE (3-TIER APPLICATION)            " -ForegroundColor White
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Tier 3: Python Django REST Framework (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$workspace\django-backend'; .\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000 --noreload"

Start-Sleep -Seconds 2

Write-Host "Starting Tier 2 & 1: Node.js Express Gateway & Web Server (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$workspace\node-backend'; node server.js"

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "==============================================================================" -ForegroundColor Green
Write-Host " ALL SERVICES STARTED! YOUR SINGLE LOCALHOST URL:" -ForegroundColor Green
Write-Host " ---> http://localhost:5000 <---" -ForegroundColor White
Write-Host "==============================================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Opening http://localhost:5000 in your browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5000"
