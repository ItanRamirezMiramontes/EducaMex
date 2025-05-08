import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBheeskYN-PVFw3e8L8pw1vPEz-_MrAMs8",
  authDomain: "educamex-24fab.firebaseapp.com",
  projectId: "educamex-24fab",
  storageBucket: "educamex-24fab.appspot.com", 
  messagingSenderId: "1098720040012",
  appId: "1:1098720040012:web:1de29a622e7a291c84d0e9",
  measurementId: "G-HGKXTJ2GV2",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, firestore, auth, storage };
