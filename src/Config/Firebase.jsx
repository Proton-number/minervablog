// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFmJKBLmwXT3ehzHgoGzUyTigNQUOVj2A",
  authDomain: "minervablog-1ecaf.firebaseapp.com",
  projectId: "minervablog-1ecaf",
  storageBucket: "minervablog-1ecaf.appspot.com",
  messagingSenderId: "1063298888697",
  appId: "1:1063298888697:web:4de9fe9ddf53514e320328",
  measurementId: "G-YLJVXN8ZN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
