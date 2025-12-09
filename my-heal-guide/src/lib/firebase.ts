import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// PASTE YOUR COPIED CONFIG HERE
const firebaseConfig = {

  apiKey: "AIzaSyDA2Pc1OY4l_5y7RrZPTYt17Xwco1E2Iqc",
  authDomain: "medico-ce78a.firebaseapp.com",
  projectId: "medico-ce78a",
  storageBucket: "medico-ce78a.firebasestorage.app",
  messagingSenderId: "118690645062",
  appId: "1:118690645062:web:55330e694e0281ea73f647",
  measurementId: "G-WNES8DPQJ9"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);