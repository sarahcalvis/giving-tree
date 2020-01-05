//Reasoning for this file: https://stackoverflow.com/questions/48492047/where-do-i-initialize-firebase-app-in-react-application

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

//Import everything, not recommended for production apps
//import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAkeCK6w-qbvHzaOdEyg_PtpGQbElAv0_M",
  authDomain: "givingtree-cfs.firebaseapp.com",
  databaseURL: "https://givingtree-cfs.firebaseio.com",
  projectId: "givingtree-cfs",
  storageBucket: "givingtree-cfs.appspot.com",
  messagingSenderId: "709659064913",
  appId: "1:709659064913:web:d9decf22beb442f2e79670",
  measurementId: "G-KZ6PNG9K64"
};


firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();