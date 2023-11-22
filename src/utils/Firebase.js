// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAaj5J1AYD0s1PoiE5IuOHTxIkKcfEQdA",
  authDomain: "appimc-34422.firebaseapp.com",
  projectId: "appimc-34422",
  storageBucket: "appimc-34422.appspot.com",
  messagingSenderId: "917993787650",
  appId: "1:917993787650:web:650b9ab4dfe4d8b22df21b",
  measurementId: "G-5CVJ6KCPLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);