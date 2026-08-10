import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  // Deployment platforms store the key either with real newlines or with the
  // escaped \n sequences copied out of the service-account JSON. Accept both,
  // and strip wrapping quotes a dashboard paste can leave behind.
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) return null;

  // A malformed credential makes cert() throw. Left uncaught it propagates out
  // of every server component that resolves the signed-in user and renders a
  // blank "server-side exception" page. Returning null instead lets each route
  // surface its own "portal is not configured" message.
  try {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (error) {
    console.error("Firebase Admin credentials were rejected:", error?.message);
    return null;
  }
}

export function getAdminAuth() {
  const app = getAdminApp();
  return app ? getAuth(app) : null;
}

export function getAdminFirestore() {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminStorage() {
  const app = getAdminApp();
  return app ? getStorage(app) : null;
}
