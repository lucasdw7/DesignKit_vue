// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXZBNULOvDpDpT8InOQ6AvBx4S9gu77i8",
    authDomain: "designkit-1244c.firebaseapp.com",
    projectId: "designkit-1244c",
    storageBucket: "designkit-1244c.firebasestorage.app",
    messagingSenderId: "923795138748",
    appId: "1:923795138748:web:f484ed33c76d02bcc348b9",
    measurementId: "G-EH8NYDX7XQ",
    databaseURL: "https://designkit-1244c-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
