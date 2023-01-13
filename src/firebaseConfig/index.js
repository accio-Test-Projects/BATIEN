// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_SeMycoZfh8g6Zu8UpMhdiIdzf39I5cs",
  authDomain: "batien-37aed.firebaseapp.com",
  projectId: "batien-37aed",
  storageBucket: "batien-37aed.appspot.com",
  messagingSenderId: "1083236800280",
  appId: "1:1083236800280:web:308bcd2928a62b4395b06d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);