// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firebase-messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOPm74JiO-HllLGoiqrXctOislDzi6Rw0",
  authDomain: "banzzokee-17e14.firebaseapp.com",
  projectId: "banzzokee-17e14",
  storageBucket: "banzzokee-17e14.appspot.com",
  messagingSenderId: "367984172530",
  appId: "1:367984172530:web:adc1a061adb06bdc2b9f6b",
  measurementId: "G-TF7TX3GRXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);