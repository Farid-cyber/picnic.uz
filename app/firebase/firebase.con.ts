// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvKxJYma2GzqFhIuLKaUCJO_wYhu7gBfk",
  authDomain: "picnicuz-21824.firebaseapp.com",
  projectId: "picnicuz-21824",
  storageBucket: "picnicuz-21824.firebasestorage.app",
  messagingSenderId: "290327862981",
  appId: "1:290327862981:web:449ddc7c68c316fc839aac",
  measurementId: "G-BFKKTN7HD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
