import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-f96b1.firebaseapp.com",
  projectId: "mern-auth-f96b1",
  storageBucket: "mern-auth-f96b1.firebasestorage.app",
  messagingSenderId: "978203173513",
  appId: "1:978203173513:web:a8fb2b2f30aad6addf9c58"
};

export const app = initializeApp(firebaseConfig);