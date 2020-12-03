import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";

// init
firebase.initializeApp({
  apiKey: "AIzaSyDW6MnXJy9aSHszm2EDmMGVKh58tv-vTe4",
  authDomain: "squarescrape.firebaseapp.com",
  databaseURL: "https://squarescrape.firebaseio.com",
  projectId: "squarescrape",
  storageBucket: "squarescrape.appspot.com",
  messagingSenderId: "813213656832",
  appId: "1:813213656832:web:440cc72230a62644faf5e5",
});

// setup
const functions = firebase.functions();
const db = firebase.firestore();

// local emulation
if (window.location.hostname === "localhost") {
  functions.useEmulator("localhost", 5001);
  db.useEmulator("localhost", 9000);
}

// functions
export const getCategories = functions.httpsCallable("getCategories");
export const getPosts = functions.httpsCallable("getPosts");
