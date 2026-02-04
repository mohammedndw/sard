import admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'sard-283cc',
    })
  } catch (error) {
    // If initialization fails, try without explicit config
    // Firebase Admin will use Application Default Credentials
    if (!admin.apps.length) {
      admin.initializeApp()
    }
  }
}

export const db = admin.firestore()
export default admin
