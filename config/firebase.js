// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtYLa8bIYrE01fnwc2-oeg_0dwlbSxTe8",
  authDomain: "rideguardian-4b594.firebaseapp.com",
  projectId: "rideguardian-4b594",
  storageBucket: "rideguardian-4b594.appspot.com",
  messagingSenderId: "846208851007",
  appId: "1:846208851007:web:bc20c846bb61428d5c2c8a",
  measurementId: "G-PMZMJGXP40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);