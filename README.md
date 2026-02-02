# Sard Cultural Center Website

A modern React frontend with Firebase Cloud Functions backend for Sard Cultural Center (مركز سرد الثقافي).

## Project Structure

```
/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer, Layout)
│   │   ├── pages/         # Page components (Home, About, Services, etc.)
│   │   ├── styles/        # CSS stylesheets
│   │   └── assets/        # Static assets
│   ├── public/
│   │   └── assets/        # Public images
│   └── package.json
│
├── functions/         # Firebase Cloud Functions (Node.js + Express)
│   ├── index.js          # API endpoints
│   └── package.json
│
└── README.md
```

## Installation

### Frontend
```bash
cd frontend
npm install
```

### Backend (Functions)
```bash
cd functions
npm install
```

## Running the Project

### Development Mode

**Frontend (React):**
```bash
cd frontend
npm run dev
```
The frontend runs on port 5000.

**Backend (API Server):**
```bash
cd functions
npm run serve
```
The backend API runs on port 3001.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check - returns `{ status: "ok" }` |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contacts` | List all contact messages (dev only) |

### POST /api/contact

Request body:
```json
{
  "name": "الاسم",
  "email": "email@example.com",
  "message": "رسالتك هنا"
}
```

Response:
```json
{
  "success": true,
  "message": "تم استلام رسالتك بنجاح",
  "id": 1234567890
}
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

In Replit, you can set environment variables in the Secrets tab.

## Tech Stack

- **Frontend:** React 18, Vite, React Router v6
- **Backend:** Node.js, Express
- **Styling:** Custom CSS (migrated from original HTML/CSS)

## Features

- RTL (Right-to-Left) Arabic layout
- Responsive design
- Contact form with backend integration
- Event calendar
- Course catalog
- Workshop booking
