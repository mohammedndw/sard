# Sard Cultural Center - Event Management System

A full-featured web system for Sard Cultural Center (مركز سرد الثقافي) that manages events, ticket sales, and venue rentals.

## Tech Stack

- **Frontend**: React 18 + Vite + React Router v6
- **Backend**: Firebase (Auth + Firestore + Storage + Cloud Functions)
- **Styling**: Custom CSS with Arabic RTL support

## Project Structure

```
/frontend               - React application
  /src
    /admin             - Admin dashboard components
    /components        - Reusable components (Header, Footer, Layout)
    /contexts          - React contexts (AuthContext)
    /pages             - Public pages (Home, Events, Login, etc.)
    /styles            - CSS stylesheets
    firebase.js        - Firebase configuration

/functions             - Cloud Functions (Express API)
  index.js             - API endpoints

firebase.json          - Firebase configuration
firestore.rules        - Firestore security rules
storage.rules          - Storage security rules
```

## Features

### Public Website
- Landing page with cultural center information
- Events listing with filters (free/paid)
- Event details with ticket selection
- User registration and login
- Free event registration
- Paid ticket purchase flow

### Admin Dashboard
- Overview statistics (events, registrations, revenue)
- Events CRUD (create, edit, delete)
- Multi-step event form with ticket management
- Registrations management per event
- Booking requests management (venue rentals)
- Attendee check-in system

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend && npm install

# Install functions dependencies
cd functions && npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Get your Firebase config from Project Settings > General > Your apps

### 3. Environment Variables

Add the following secrets in Replit:

- `VITE_FIREBASE_API_KEY` - Your Firebase API key

### 4. Create Admin User

1. Register a new user through the website
2. In Firebase Console > Firestore, find the user document in `users` collection
3. Change the `role` field from `"user"` to `"admin"`

## Running the Project

### Development

```bash
# Start frontend (port 5000)
cd frontend && npm run dev

# Start backend API (port 3001) - optional
cd functions && npm run serve
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/payments/create-session` | Create payment session |
| POST | `/api/payments/webhook` | Payment webhook handler |
| POST | `/api/registrations/free` | Register for free event |

## Firestore Collections

- **users** - User accounts with roles
- **events** - Event information
- **events/{id}/tickets** - Ticket types per event
- **registrations** - Event registrations
- **bookings** - Venue rental requests
- **payments** - Payment records
- **contacts** - Contact form submissions

## Security

- Firestore rules restrict access based on user roles
- Admin-only routes are protected
- API keys stored as environment secrets
