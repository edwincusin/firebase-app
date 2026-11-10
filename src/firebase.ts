// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNCqtWwKMreK6mSft-kQk3Sm5YeksYDS0",
    authDomain: "curso-firebase-3e344.firebaseapp.com",
    projectId: "curso-firebase-3e344",
    storageBucket: "curso-firebase-3e344.firebasestorage.app",
    messagingSenderId: "381755560476",
    appId: "1:381755560476:web:d25e4a70955c8ddcf005d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };