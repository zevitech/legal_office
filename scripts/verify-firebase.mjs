/**
 * Firebase configuration check.
 *
 *   node --env-file=.env.local scripts/verify-firebase.mjs
 *
 * Exercises the three services the portal depends on (Auth, Firestore,
 * Storage) using the Admin SDK, then cleans up after itself. Run this before
 * touching the portal UI so a failure points at one specific credential
 * instead of surfacing as a generic 503.
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const required = ["FIREBASE_ADMIN_PROJECT_ID", "FIREBASE_ADMIN_CLIENT_EMAIL", "FIREBASE_ADMIN_PRIVATE_KEY"];
const missing = required.filter((name) => !process.env[name]?.trim());
if (missing.length) {
  console.error(`✗ Missing or empty in .env.local: ${missing.join(", ")}`);
  process.exit(1);
}

const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n");
if (!privateKey.includes("BEGIN PRIVATE KEY")) {
  console.error("✗ FIREBASE_ADMIN_PRIVATE_KEY does not look like a PEM key.");
  console.error("  Expected one line in double quotes containing literal \\n sequences.");
  process.exit(1);
}

const bucketName = process.env.FIREBASE_ADMIN_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey,
  }),
  storageBucket: bucketName,
});

let failed = false;
const pass = (message) => console.log(`✓ ${message}`);
const fail = (label, error) => { failed = true; console.error(`✗ ${label}: ${error?.message || error}`); };

try {
  await getAuth().listUsers(1);
  pass("Auth — service account credentials accepted");
} catch (error) {
  fail("Auth", error);
  console.error("  Check client_email and private_key formatting.");
}

try {
  const db = getFirestore();
  const ref = db.collection("_configCheck").doc("probe");
  await ref.set({ checkedAt: new Date().toISOString() });
  const snapshot = await ref.get();
  if (!snapshot.exists) throw new Error("write succeeded but read returned nothing");
  await ref.delete();
  pass("Firestore — write, read and delete all succeeded");
} catch (error) {
  fail("Firestore", error);
  console.error("  Confirm the database is created (Databases & Storage -> Firestore).");
}

try {
  const [exists] = await getStorage().bucket().exists();
  if (!exists) throw new Error(`bucket "${bucketName}" not found`);
  pass(`Storage — bucket reachable (${bucketName})`);
} catch (error) {
  fail("Storage", error);
  console.error("  Cloud Storage needs the Blaze plan, and the bucket name must match the console exactly.");
}

console.log(failed ? "\nSome checks failed — fix the items above before testing the portal." : "\nAll checks passed. Portal credentials are correctly configured.");
process.exit(failed ? 1 : 0);
