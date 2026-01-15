import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDWpEHwqIsgcwMmiT6C4LHcANbIT1Tb5PI",
    authDomain: "smart-crowd-surveillance.firebaseapp.com",
    projectId: "smart-crowd-surveillance",
    storageBucket: "smart-crowd-surveillance.appspot.com",
    messagingSenderId: "724190379324",
    appId: "1:724190379324:web:11c9dad9d83a23641ff239"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
