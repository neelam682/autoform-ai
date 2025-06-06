// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzEk8XOGOsEjYjvAdlQ4-UIxhIQwbIpH4",
  authDomain: "autoformai.firebaseapp.com",
  projectId: "autoformai",
  storageBucket: "autoformai.appspot.com",
  messagingSenderId: "197546391391",
  appId: "1:197546391391:web:37bea097ce2fe49e53a8ea",
  measurementId: "G-1H8XE8XN6C"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export just once
export { auth, db };



