// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// OG way I imported Firebase
// import firebase from "firebase";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTvlN7WLxZU2tT5XLLiyBztjinctwtMWs",
    authDomain: "instagram-react-4b325.firebaseapp.com",
    databaseURL: "https://instagram-react-4b325-default-rtdb.firebaseio.com",
    projectId: "instagram-react-4b325",
    storageBucket: "instagram-react-4b325.appspot.com",
    messagingSenderId: "44272781133",
    appId: "1:44272781133:web:a0ef3a600f3fbee1e25904",
    measurementId: "G-V5LDJ23L90"
});

// To Access the database
const db = firebaseApp.firestore();
// To Access authentication
const auth = firebase.auth();
// How we can upload pictures to Firebase & store in our DB
const storage = firebase.storage();

export { db, auth, storage };