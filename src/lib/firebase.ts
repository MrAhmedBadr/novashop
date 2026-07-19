/**
 * Firebase bootstrap (lazy / optional).
 *
 * NovaShop runs on mock data by default so it works with zero configuration.
 * To go live, set VITE_DATA_SOURCE=firebase and the VITE_FIREBASE_* vars in
 * `.env.local`, then `npm i firebase` and uncomment the initialization below.
 *
 * The service layer (see `src/lib/services`) is the single seam — swap the
 * mock implementations for Firestore queries and the UI is unchanged.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const DATA_SOURCE = (import.meta.env.VITE_DATA_SOURCE ?? "mock") as "mock" | "firebase";

export const isFirebaseEnabled = DATA_SOURCE === "firebase" && Boolean(firebaseConfig.apiKey);

// Example (uncomment after `npm i firebase`):
//
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
//
// export const app = isFirebaseEnabled ? initializeApp(firebaseConfig) : null;
// export const db = app ? getFirestore(app) : null;
// export const auth = app ? getAuth(app) : null;
// export const storage = app ? getStorage(app) : null;
