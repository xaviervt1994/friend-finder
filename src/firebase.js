// src/firebase.js

// Import core SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDQaudcQAr0A2P7pZJqTh3ZdP5blG75wQ",
  authDomain: "friend-finder-f25a4.firebaseapp.com",
  projectId: "friend-finder-f25a4",
  storageBucket: "friend-finder-f25a4.appspot.com", // Fixed typo here
  messagingSenderId: "822054978601",
  appId: "1:822054978601:web:0ee25b0f5710723f8d0838",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export so we can use them in other files
export { auth, db };
