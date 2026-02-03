# Sard Cultural Center - Event Management System

## Overview
A full web system for Sard Cultural Center (مركز سرد الثقافي) that runs events/parties and rents venue space. Features React frontend with Firebase backend for authentication, database, and storage.

## Project Structure
```
/frontend               - React + Vite application
  /src
    /admin             - Admin dashboard (Dashboard, Events, Registrations, Bookings, Attendees)
    /components        - Reusable components (Header, Footer, Layout, ProtectedRoute)
    /contexts          - AuthContext for authentication state
    /pages             - Public pages (Home, About, Events, Login, Register, etc.)
    /styles            - CSS stylesheets
    firebase.js        - Firebase configuration

/functions             - Cloud Functions (Express API)
  index.js             - Payment and registration endpoints

firebase.json          - Firebase project configuration
firestore.rules        - Firestore security rules
storage.rules          - Storage security rules
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

## Firebase Integration

### Services Used:
- **Authentication**: Email/password login for users and admins
- **Firestore Database**: All data storage
- **Storage**: Event banners and logos

### Configuration
- Firebase config is in `frontend/src/firebase.js`
- API Key stored as `VITE_FIREBASE_API_KEY` secret

## Firestore Collections

### users
- `email`, `name`, `phone`, `role` (admin/user), `createdAt`

### events
- `title`, `description`, `startDate`, `endDate`, `location`, `venueName`
- `bannerUrl`, `logoUrl`, `categories`, `organizer`, `speakers`, `ticketType`

### events/{eventId}/tickets (subcollection)
- `name`, `type` (free/paid), `price`, `capacity`, `minPerOrder`, `maxPerOrder`

### registrations
- `eventId`, `ticketTypeId`, `userId`, `userName`, `userEmail`, `quantity`
- `amount`, `status`, `paymentStatus`, `createdAt`

### bookings
- `name`, `email`, `requestedDate`, `details`, `status`, `createdAt`

### payments
- `registrationId`, `sessionId`, `amount`, `currency`, `status`, `provider`

### contacts
- `name`, `email`, `message`, `createdAt`

## User Roles

### User (default)
- Browse events
- Register for free events
- Purchase paid tickets
- View own registrations

### Admin
- Access admin dashboard at /admin
- Create/edit/delete events
- Manage registrations
- Approve/reject booking requests
- Check-in attendees

## Creating an Admin User
1. Register through the website
2. Go to Firebase Console > Firestore > users collection
3. Find your user document
4. Change `role` field from "user" to "admin"

## Environment Variables
- `VITE_FIREBASE_API_KEY` - Firebase API key (stored as secret)

## Tech Stack
- Frontend: React 18, Vite, React Router v6
- Backend: Firebase (Auth, Firestore, Storage, Cloud Functions)
- Styling: Custom CSS with Arabic RTL support
