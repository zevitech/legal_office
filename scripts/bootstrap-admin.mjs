/**
 * Grants the portal "admin" custom claim to an existing Firebase Auth user.
 *
 *   node --env-file=.env.local scripts/bootstrap-admin.mjs you@legaltrademarkoffice.com
 *
 * Needed once per environment: /portal-admin is gated on this claim and the
 * app has no self-service route that can create the first administrator.
 * Claims are read at sign-in, so the user must log out and back in afterwards.
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const email = process.argv[2]?.trim().toLowerCase();
if (!email || !email.includes("@")) {
  console.error("Usage: node --env-file=.env.local scripts/bootstrap-admin.mjs you@domain.com");
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

try {
  const user = await getAuth().getUserByEmail(email);
  await getAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), role: "admin" });
  console.log(`✓ ${email} (${user.uid}) now has role "admin".`);
  console.log("  Sign out and back in — custom claims only refresh on a new session.");
} catch (error) {
  if (error.code === "auth/user-not-found") {
    console.error(`✗ No Firebase Auth user with the email ${email}.`);
    console.error("  Create it first: Authentication -> Users -> Add user.");
  } else {
    console.error(`✗ ${error.message}`);
  }
  process.exit(1);
}
