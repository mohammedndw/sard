import { initializeApp, getApps } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Check if we should use emulators (development mode)
const useEmulators = process.env.NEXT_PUBLIC_USE_EMULATORS === "true";
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// For development without API key, use a placeholder that won't cause errors
const firebaseConfig = {
  apiKey: apiKey || (useEmulators ? "demo-api-key" : "AIzaSyDemoKeyForDevelopment"),
  authDomain: "sard-283cc.firebaseapp.com",
  projectId: "sard-283cc",
  storageBucket: "sard-283cc.firebasestorage.app",
  messagingSenderId: "627663221608",
  appId: "1:627663221608:web:a32127411eb3aee8eb1cdd",
  measurementId: "G-B4QHGNL2D1"
};

// Initialize Firebase only if not already initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Connect to emulators in development mode (client-side only)
if (useEmulators && typeof window !== 'undefined') {
  try {
    // Check if emulators are already connected
    const authHost = auth._delegate?._config?.emulator?.url;
    const firestoreHost = db._delegate?._settings?.host;
    const storageHost = storage._delegate?._host;

    if (!authHost) {
      connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    }
    if (!firestoreHost?.includes('localhost')) {
      connectFirestoreEmulator(db, 'localhost', 8080);
    }
    if (!storageHost?.includes('localhost')) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  } catch (error) {
    // Emulators might already be connected, ignore error
    if (!error.message?.includes('already been initialized')) {
      console.warn('Firebase emulator connection:', error.message);
    }
  }
}

export default app;
