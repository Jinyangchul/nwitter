import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI2X88nTCKSHO9CDJK1NaAFoQGE_zdMSU",
  authDomain: "nwitter-eb956.firebaseapp.com",
  projectId: "nwitter-eb956",
  storageBucket: "nwitter-eb956.appspot.com",
  messagingSenderId: "927517033002",
  appId: "1:927517033002:web:4d4ca03b08269f581f3953",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore();
