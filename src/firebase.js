import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/compat/firestore';
// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';



const settings = {timestampsInSnapshots: true};


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE6lytrcKeRkJ-4vnMeOiRgkzGqjPuxm4",
  authDomain: "journal-b6d9e.firebaseapp.com",
  projectId: "journal-b6d9e",
  storageBucket: "journal-b6d9e.appspot.com",
  messagingSenderId: "388394467205",
  appId: "1:388394467205:web:ac77ddff4f6e5f70f4ceec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };