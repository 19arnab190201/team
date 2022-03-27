import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC_UGU65QkBphI7vE8eZZu6OhvgrrjuvJQ",
  authDomain: "team-ac8aa.firebaseapp.com",
  projectId: "team-ac8aa",
  storageBucket: "team-ac8aa.appspot.com",
  messagingSenderId: "727428247109",
  appId: "1:727428247109:web:60ba1d67c3ef5848613d2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
