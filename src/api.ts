import firebase from "firebase/app";
import "firebase/functions";
import "firebase/firestore";

// init
firebase.initializeApp({
  apiKey: "AIzaSyBCkeQeSvYVPfOO6WQavvBcY81nfJWY7gM",
  authDomain: "squarescrape-c3cbe.firebaseapp.com",
  projectId: "squarescrape-c3cbe",
  storageBucket: "squarescrape-c3cbe.appspot.com",
  messagingSenderId: "107147838576",
  appId: "1:107147838576:web:ac0cafbfc49f4601c5a0b5",
  measurementId: "G-2TFT2SPN2M",
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
