import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc9PwycSzELPqmQGXCUJxIQuyFpPcne4g",
  authDomain: "my-sheet-index.firebaseapp.com",
  projectId: "my-sheet-index",
  storageBucket: "my-sheet-index.firebasestorage.app",
  messagingSenderId: "706978961736",
  appId: "1:706978961736:web:ccd471d9a3d6a575763b7d",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
