// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "cuong-blog-82f55.firebaseapp.com",
  projectId: "cuong-blog-82f55",
  storageBucket: "cuong-blog-82f55.firebasestorage.app",
  messagingSenderId: "962865584180",
  appId: "1:962865584180:web:4b2862e634dfa02c6a1261",
  measurementId: "G-GWGKVWQ6H4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
