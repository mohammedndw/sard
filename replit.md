# Sard Cultural Center Website

## Overview
A modern React website with Firebase backend for Sard Cultural Center (مركز سرد الثقافي), the first private cultural center in Saudi Arabia. The website is in Arabic with RTL (right-to-left) layout.

## Project Structure
```
/frontend           - React + Vite frontend application
  /src
    /components     - Reusable components (Header, Footer, Layout)
    /pages          - Page components (Home, About, Services, Courses, Contact, etc.)
    /styles         - CSS stylesheets
    firebase.js     - Firebase configuration and initialization
  /public/assets    - Image assets

/functions          - Firebase Cloud Functions (Node.js) - for future use
```

## Running the Project

### Frontend (port 5000):
```bash
cd frontend && npm run dev
```

## Firebase Integration
- **Firestore Database**: Contact form submissions are stored in the `contacts` collection
- **Configuration**: Firebase config is in `frontend/src/firebase.js`
- **API Key**: Stored securely as `VITE_FIREBASE_API_KEY` environment variable

## Firestore Collections
- `contacts` - Contact form submissions
  - `name`: string
  - `email`: string
  - `address`: string (optional)
  - `phone`: string (optional)
  - `message`: string
  - `createdAt`: timestamp

## Tech Stack
- Frontend: React 18, Vite, React Router v6
- Backend: Firebase (Firestore)
- Styling: Custom CSS with Arabic RTL support

## Environment Variables
- `VITE_FIREBASE_API_KEY` - Firebase API key (stored as secret)
