# Sard Cultural Center Website

## Overview
A modern React website with Firebase Cloud Functions backend for Sard Cultural Center (مركز سرد الثقافي), the first private cultural center in Saudi Arabia. The website is in Arabic with RTL (right-to-left) layout.

## Project Structure
```
/frontend           - React + Vite frontend application
  /src
    /components     - Reusable components (Header, Footer, Layout)
    /pages          - Page components (Home, About, Services, Courses, Contact, etc.)
    /styles         - CSS stylesheets
  /public/assets    - Image assets

/functions          - Firebase Cloud Functions (Node.js + Express API)
  index.js          - API endpoints (/api/health, /api/contact)
```

## Running the Project

### Frontend (port 5000):
```bash
cd frontend && npm run dev
```

### Backend API (port 3001):
```bash
cd functions && npm run serve
```

## API Endpoints
- GET /api/health - Health check
- POST /api/contact - Submit contact form (name, email, message)

## Tech Stack
- Frontend: React 18, Vite, React Router v6
- Backend: Node.js, Express
- Styling: Custom CSS with Arabic RTL support
