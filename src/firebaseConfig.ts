import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPDLpuHUF9eC1IBqJqt8c_OoZvfu4I16E",
  authDomain: "clear-notes-36d0b.firebaseapp.com",
  projectId: "clear-notes-36d0b",
  storageBucket: "clear-notes-36d0b.firebasestorage.app",
  messagingSenderId: "816072451551",
  appId: "1:816072451551:web:55a0583d02786f5fdd906a",
  measurementId: "G-VPBQ219004"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };