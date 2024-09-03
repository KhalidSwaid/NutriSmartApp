// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt7skL0N_21SPgmCMZwCaYvm5KtJXWEfg",
  authDomain: "nutrismart-16b38.firebaseapp.com",
  projectId: "nutrismart-16b38",
  storageBucket: "nutrismart-16b38.appspot.com",
  messagingSenderId: "683842722546",
  appId: "1:683842722546:web:d0b1e67f2386ef99e74e6b",
  measurementId: "G-7F04WJ7MW0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db: Firestore = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth };

// rules_version = '2';

// service cloud.firestore {
// match /databases/{database}/documents {
// match /users/{userId} {
// allow read, write: if request.auth != null;
// }
// match /users/usersInfo {
// allow read, write: if request.auth != null;
// }
// }
// }
