import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sard-283cc.firebaseapp.com",
  projectId: "sard-283cc",
  storageBucket: "sard-283cc.firebasestorage.app",
  messagingSenderId: "627663221608",
  appId: "1:627663221608:web:a32127411eb3aee8eb1cdd",
  measurementId: "G-B4QHGNL2D1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
