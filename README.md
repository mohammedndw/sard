# Sard Cultural Center - Next.js Application

A full-featured Next.js application for Sard Cultural Center (مركز سرد الثقافي) that manages events, ticket sales, and venue rentals.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes + Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel / Any Node.js hosting

## Project Structure

```
/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (payments, registrations)
│   ├── admin/             # Admin dashboard pages
│   ├── events/            # Events pages
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.js
│   ├── Footer.js
│   └── ProtectedRoute.js
├── contexts/             # React contexts
│   └── AuthContext.js
├── lib/                  # Utility libraries
│   ├── firebase.js       # Firebase client config
│   └── firebase-admin.js # Server Firebase Admin
├── public/               # Static assets
│   └── assets/           # Images and media
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
└── storage.rules         # Storage security rules
```

## Features

### Public Website
- Landing page with cultural center information
- Events listing with filters
- Event details with ticket selection
- User registration and login
- Free event registration
- Paid ticket purchase flow

### Admin Dashboard
- Overview statistics (events, registrations, bookings)
- Events CRUD (create, edit, delete)
- Registrations management per event
- Booking requests management (venue rentals)

### API Routes
- `GET /api/health` - Health check
- `POST /api/payments/create-session` - Create payment session
- `POST /api/payments/webhook` - Payment webhook handler
- `POST /api/registrations/free` - Register for free event

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local` file (already created with emulator settings):

```bash
# Option 1: Use Firebase Emulators (for local development - DEFAULT)
NEXT_PUBLIC_USE_EMULATORS=true

# Option 2: Use actual Firebase API key (for production)
# NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_firebase_api_key_here

# Firebase Project ID
FIREBASE_PROJECT_ID=sard-283cc
```

**For hosting platforms**: Set these as environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY` (if not using emulators)
- `FIREBASE_PROJECT_ID`

### 3. Firebase Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Get your Firebase config from Project Settings > General > Your apps

### 4. Running with Firebase Emulators (Development)

The app is configured to use Firebase emulators by default. To start emulators:

```bash
# Start Firebase emulators
npm run emulators

# In another terminal, start Next.js dev server
npm run dev
```

Or run both together:
```bash
npm run dev:with-emulators
```

### 5. Create Admin User

1. Register a new user through the website
2. In Firebase Console > Firestore, find the user document in `users` collection
3. Change the `role` field from `"user"` to `"admin"`

## Running the Project

### Development (with emulators)

```bash
npm run dev:with-emulators
```

### Development (without emulators - requires API key)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

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
- Next.js API routes handle server-side logic

## Deployment

The project can be deployed to any Node.js hosting platform:
- **Vercel** (recommended for Next.js): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Firebase Hosting**: `firebase deploy --only hosting`
- **Any Node.js host**: Build with `npm run build` and run `npm start`

## Troubleshooting

### Firebase API Key Error
If you see `auth/invalid-api-key` error:
1. Make sure `.env.local` exists with `NEXT_PUBLIC_USE_EMULATORS=true` for development
2. Or set `NEXT_PUBLIC_FIREBASE_API_KEY` with your actual Firebase API key
3. Restart the dev server after changing environment variables
