import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvKxJYma2GzqFhIuLKaUCJO_wYhu7gBfk",
  authDomain: "picnicuz-21824.firebaseapp.com",
  projectId: "picnicuz-21824",
  storageBucket: "picnicuz-21824.firebasestorage.app",
  messagingSenderId: "290327862981",
  appId: "1:290327862981:web:449ddc7c68c316fc839aac",
  measurementId: "G-BFKKTN7HD1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
