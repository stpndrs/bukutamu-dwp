// firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.VITE_FIREBASE_API_KEY,
    authDomain: "darma-wanita.firebaseapp.com",
    projectId: "darma-wanita",
    storageBucket: "darma-wanita.appspot.com",
    messagingSenderId: "826983910941",
    appId: "1:826983910941:web:3779ab388cde37297cc0f4",
    measurementId: "G-G83D874RRB",
    databaseURL: "https://darma-wanita-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
