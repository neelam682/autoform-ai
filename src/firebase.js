// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDdHjyObOnrNfYw2hPHwkD_RYrJgcTpuI",
  authDomain: "new-auto-form-ai.firebaseapp.com",
  projectId: "new-auto-form-ai",
  storageBucket: "new-auto-form-ai.firebasestorage.app",
  messagingSenderId: "551325525032",
  appId: "1:551325525032:web:e7567c84829ff51f86811d",
  measurementId: "G-MQ0LETWLK5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
