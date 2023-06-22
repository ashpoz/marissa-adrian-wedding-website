import type { ServiceAccount } from "firebase-admin";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  databaseURL: import.meta.env.FIREBASE_DATABASE_URL,
});

export const db = getDatabase();
