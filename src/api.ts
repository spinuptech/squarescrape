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
  // db.useEmulator("localhost", 8080);
  // auth.useEmulator("http://localhost:9000");
}

// functions
export const getCategories = functions.httpsCallable("getCategories");
export const getPosts = functions.httpsCallable("getPosts");

// users
export const updateUserData = async (user: firebase.User, urls: string[]) => {
  const update = await db
    .collection("users")
    .doc(user.uid)
    .set({ urls }, { merge: true });
  return update;
};

export const getUserData = async (user: firebase.User): Promise<string[]> => {
  const doc = await db.collection("users").doc(user.uid).get();
  if (doc.exists) {
    const data = doc.data();
    if (data) return data.urls;
  }

  // then create new one if none exists
  const urls = ["http://example.com/events"];
  await updateUserData(user, urls);

  return urls;
};
