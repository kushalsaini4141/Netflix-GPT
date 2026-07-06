// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5e0Mg2tPlcUPHzsTaj2O0u333n6AFXcE",
  authDomain: "netflixgpt-3dcf7.firebaseapp.com",
  projectId: "netflixgpt-3dcf7",
  storageBucket: "netflixgpt-3dcf7.firebasestorage.app",
  messagingSenderId: "605139470385",
  appId: "1:605139470385:web:ab782081a491a53d6aad10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();