// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFmJKBLmwXT3ehzHgoGzUyTigNQUOVj2A",
  authDomain: "minervablog-1ecaf.firebaseapp.com",
  projectId: "minervablog-1ecaf",
  storageBucket: "minervablog-1ecaf.appspot.com",
  messagingSenderId: "1063298888697",
  appId: "1:1063298888697:web:640f407a7a898c54320328",
  measurementId: "G-TQ5QXD1W76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();