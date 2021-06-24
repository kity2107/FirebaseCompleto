import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBwEpBIhGLtn9d-F9E5vOxNisaBFw9oXmw",
  authDomain: "turneroweb-4ee24.firebaseapp.com",
  projectId: "turneroweb-4ee24",
  storageBucket: "turneroweb-4ee24.appspot.com",
  messagingSenderId: "119940939940",
  appId: "1:119940939940:web:8b3d45b1314825927ee631",
  measurementId: "G-H675SZX15N",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
