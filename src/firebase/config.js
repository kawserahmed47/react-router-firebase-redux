import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCNviit0iM3mpDyFDPELGsDqo45_FzZAdM",
  authDomain: "react-eshop-9c478.firebaseapp.com",
  projectId: "react-eshop-9c478",
  storageBucket: "react-eshop-9c478.appspot.com",
  messagingSenderId: "217260972962",
  appId: "1:217260972962:web:2917680019049b2ebcb0fb",
  measurementId: "G-TQKM875SXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app