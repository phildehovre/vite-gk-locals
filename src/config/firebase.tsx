import firebase from 'firebase/app';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // Initialize Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_APIKEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTHDOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECTID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_REACT_APP_APPID,
    measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENTID
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore(app)
export const auth = getAuth(app);
export const rtdb = getDatabase(app)
export const storage = getStorage(app)
export const imagesRef = ref(storage, 'images')
export const provider = new GoogleAuthProvider();
