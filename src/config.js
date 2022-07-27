import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";


export const firebaseConfig = {
  apiKey: "AIzaSyAE6lytrcKeRkJ-4vnMeOiRgkzGqjPuxm4",
  authDomain: "journal-b6d9e.firebaseapp.com",
  projectId: "journal-b6d9e",
  storageBucket: "journal-b6d9e.appspot.com",
  messagingSenderId: "388394467205",
  appId: "1:388394467205:web:ac77ddff4f6e5f70f4ceec"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const app = initializeApp(firebaseConfig);

export {firebase};