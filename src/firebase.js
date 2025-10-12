// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// This is the object you just copied from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAhER8MvPEhaCjEUFYqWmORbYRszavZ5t4",
  authDomain: "simple-canvas-editor-fb2f4.firebaseapp.com",
  projectId: "simple-canvas-editor-fb2f4",
  storageBucket: "simple-canvas-editor-fb2f4.firebasestorage.app",
  messagingSenderId: "815852108733",
  appId: "1:815852108733:web:52b1ab1f449038a68ef0d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// This 'db' export is what you will use throughout your app to interact with Firestore
export const db = getFirestore(app);