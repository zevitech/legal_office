import nodemailer from "nodemailer";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth } from "@/lib/firebaseAdmin";
import { createPortalClient } from "@/lib/portalData";
import { sendAttorneyActivityEmail } from "@/lib/portalEmail";

const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function invitationEmail({ name, email, markName, trademarks = [], setupUrl, source }) {
  const intro = source === "checkout"
    ? "Your payment was confirmed and your private client portal has been created automatically."
    : "Your Legal Trademark Office team created a private client portal for you.";
  const matters=trademarks.length?trademarks:(markName?[{markName}]:[]);const rows=matters.map((item,index)=>`<tr><td style="padding:12px;border-top:1px solid #e2e8f0;color:#64748b;font-size:13px">Trademark ${index+1}</td><td style="padding:12px;border-top:1px solid #e2e8f0;text-align:right;color:#0f172a;font-size:13px;font-weight:700">${escapeHtml(item.markName)}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a"><table role="presentation" width="100%"><tr><td style="padding:36px 14px"><div style="max-width:620px;margin:auto;overflow:hidden;border-radius:20px;background:#fff"><div style="padding:28px;background:#087dcc;color:#fff"><div style="font-size:21px;font-weight:800">Legal Trademark Office®</div><div style="margin-top:6px;font-size:13px">Secure Client Portal</div></div><div style="padding:32px"><div style="display:inline-block;border-radius:999px;background:#e0f2fe;padding:7px 12px;color:#0369a1;font-size:12px;font-weight:700">YOUR PORTAL IS READY</div><h1 style="margin:20px 0 10px;font-size:27px">Welcome, ${escapeHtml(name)}</h1><p style="color:#334155;line-height:1.7">${escapeHtml(intro)} You can now manage your trademark applications, attorney requests, documents, appointments, filing records, payments and additional business services in one place.</p><table role="presentation" width="100%" style="margin-top:22px;border-collapse:collapse;border:1px solid #e2e8f0"><tr><td style="padding:12px;color:#64748b;font-size:13px">User ID / login email</td><td style="padding:12px;text-align:right;font-size:13px;font-weight:700">${escapeHtml(email)}</td></tr>${rows}</table><p style="margin-top:22px;color:#475569;font-size:14px;line-height:1.7">Use the single-use button below to create your private password before your first login.</p><a href="${escapeHtml(setupUrl)}" style="display:inline-block;margin-top:24px;border-radius:12px;background:#006fbd;padding:14px 22px;color:#fff;text-decoration:none;font-size:15px;font-weight:700">Create password and open portal</a><p style="margin-top:24px;color:#64748b;font-size:13px;line-height:1.6">For your security, we do not email temporary passwords. This setup link is single-use and time-limited.</p></div></div></td></tr></table></body></html>`;
}

function existingClientMatterEmail({ name, markName, email, source }) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const reason = source === "checkout" ? "Your payment was confirmed and" : "Your legal team added";
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a"><div style="max-width:620px;margin:36px auto;border-radius:20px;background:#fff;overflow:hidden"><div style="padding:28px;background:#087dcc;color:#fff;font-size:21px;font-weight:800">Legal Trademark Office®</div><div style="padding:32px"><h1 style="font-size:26px">Your new trademark matter was added</h1><p style="color:#334155;line-height:1.7">Hello ${escapeHtml(name)}, ${escapeHtml(reason)} <b>${escapeHtml(markName || "your new trademark application")}</b> to your existing client portal under ${escapeHtml(email)}.</p><p style="color:#475569;line-height:1.7">Your current password remains unchanged. You do not need to create another portal account.</p><a href="${escapeHtml(`${appUrl}/portal-login`)}" style="display:inline-block;margin-top:18px;border-radius:12px;background:#006fbd;padding:14px 22px;color:#fff;text-decoration:none;font-weight:700">Open existing portal</a></div></div></body></html>`;
}

export async function provisionPortalClient({ name, email, company = "", phone = "", markName = "", markType = "Word mark", packageName = "", trademarks = [], transactionId = "", orderTotal = 0, source = "manual", applicationDetails = {}, billingProfile = {} }) {
  const adminAuth = getAdminAuth();
  if (!adminAuth) throw new Error("Firebase Admin is not configured");
  let user;
  let newlyCreated = false;
  try {
    user = await adminAuth.getUserByEmail(email);
    user = await adminAuth.updateUser(user.uid, { displayName: name, disabled: false });
  } catch (error) {
    if (error.code !== "auth/user-not-found") throw error;
    user = await adminAuth.createUser({ email, displayName: name, emailVerified: false, disabled: false });
    newlyCreated = true;
  }
  if (!newlyCreated && user.customClaims?.role && user.customClaims.role !== "client") throw new Error("This email belongs to a staff portal account");
  await adminAuth.setCustomUserClaims(user.uid, { ...(user.customClaims || {}), role: "client" });
  const portalRecord = await createPortalClient({ uid: user.uid, name, email, company, phone, markName, markType, packageName, trademarks, transactionId, orderTotal, source, applicationDetails, billingProfile });
  const primaryCaseId = portalRecord.caseIds[0] || "";
  const matterNames = trademarks.length ? trademarks.map((item) => item.markName).filter(Boolean) : [markName].filter(Boolean);
  const isNewClient = newlyCreated || portalRecord.isNewPortalClient;
  const notification = {
    clientUid: user.uid,
    clientName: name,
    clientEmail: email,
    caseId: primaryCaseId,
    type: isNewClient ? "client_onboarded" : "trademark_matter_added",
    title: isNewClient ? `New client onboarded: ${name}` : `New trademark matter added: ${name}`,
    message: isNewClient
      ? `${source === "checkout" ? "Payment was confirmed and" : "An attorney invitation created"} a new client portal account${matterNames.length ? ` for ${matterNames.join(", ")}` : ""}. Open the case and schedule the mandatory trademark consultation.`
      : `${matterNames.join(", ") || "A new trademark matter"} was added to this client's existing portal${source === "checkout" ? " after payment confirmation" : ""}.`,
    source,
    packageName: packageName || trademarks[0]?.packageName || "",
    orderTotal: Number(orderTotal || 0),
    read: false,
    createdAt: FieldValue.serverTimestamp(),
  };
  const notificationId = `onboarding-${user.uid}-${primaryCaseId || source}`.replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 180);
  await portalRecord.clientRef.firestore.collection("portalAttorneyNotifications").doc(notificationId).set(notification, { merge: true });
  await portalRecord.clientRef.collection("auditLog").add({ event: notification.type, caseId: primaryCaseId, source, matterNames, actorRole: source === "checkout" ? "client" : "staff", createdAt: FieldValue.serverTimestamp() });
  try { await sendAttorneyActivityEmail(notification); } catch (error) { console.error("New client attorney email failed:", error?.message); }

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || undefined, port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true, service: process.env.SMTP_HOST ? undefined : "gmail", auth: { user: process.env.SUPPORT_EMAIL || process.env.MAILER_EMAIL, pass: process.env.SUPPORT_EMAIL_PASSWORD || process.env.MAILER_PASSWORD } });
  if (!isNewClient) {
    await transporter.sendMail({ from: `Legal Trademark Office <${process.env.SUPPORT_EMAIL || process.env.MAILER_EMAIL}>`, to: email, subject: source === "checkout" ? "Payment confirmed — new trademark added to your portal" : "A new trademark matter was added to your portal", html: existingClientMatterEmail({ name, markName: markName || trademarks[0]?.markName, email, source }) });
  } else {
    const firebaseLink = await adminAuth.generatePasswordResetLink(email, { url: `${appUrl}/portal-login` });
    const code = new URL(firebaseLink).searchParams.get("oobCode");
    if (!code) throw new Error("Unable to create setup code");
    const setupUrl = `${appUrl}/portal/set-password?oobCode=${encodeURIComponent(code)}&email=${encodeURIComponent(email)}`;
    await transporter.sendMail({ from: `Legal Trademark Office <${process.env.SUPPORT_EMAIL || process.env.MAILER_EMAIL}>`, to: email, subject: source === "checkout" ? "Payment confirmed — your client portal is ready" : "Manage your trademark applications in your new client portal", html: invitationEmail({ name, email, markName, trademarks, setupUrl, source }) });
  }
  return { uid: user.uid, newlyCreated, notificationCreated: true };
}
