import { Firestore } from "firebase-admin/firestore";

let leadFirestore;

// A dedicated client for lead writes only: avoid importing portal Auth/Storage
// and defer gRPC loading. Same project, credentials, database and transactions.
export function getLeadFirestore() {
  if (leadFirestore) return leadFirestore;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.trim()
    .replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  try {
    leadFirestore = new Firestore({
      projectId,
      credentials: { client_email: clientEmail, private_key: privateKey },
      preferRest: true,
    });
    return leadFirestore;
  } catch {
    console.error("Lead database client could not initialize");
    return null;
  }
}
