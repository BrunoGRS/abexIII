// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMAAeR42cJGH-bffSZyxroOn0Q-lyaA1U",
  authDomain: "ixmed-d6e10.firebaseapp.com",
  projectId: "ixmed-d6e10",
  storageBucket: "ixmed-d6e10.firebasestorage.app",
  messagingSenderId: "1046426040481",
  appId: "1:1046426040481:web:fe1ef252dfc1b2b4f458e0",
  measurementId: "G-D466Z9K001",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
