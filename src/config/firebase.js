
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "prototype-3577a.firebaseapp.com",
  projectId: "prototype-3577a",
  storageBucket: "prototype-3577a.appspot.com",
  messagingSenderId: "504810198995",
  appId: "1:504810198995:web:d960666679f45098a34126"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);