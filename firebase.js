import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, onSnapshot } from "firebase/firestore";
import { getStorage, uploadBytes, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpyKVC2yi-zQ_NIzureMz1j_wgXYWk5fo",
  authDomain: "recipe-app-ddbba.firebaseapp.com",
  projectId: "recipe-app-ddbba",
  storageBucket: "recipe-app-ddbba.appspot.com",
  messagingSenderId: "548423665937",
  appId: "1:548423665937:web:301eb9bff2d04d4b4d64b0",
  measurementId: "G-CM71L3VYVJ",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  doc,
  ref,
  auth,
  addDoc,
  setDoc,
  signOut,
  storage,
  onSnapshot,
  collection,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
