import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUg-oO8mDXhSyaKgv6rt_QuB_rIJusOgY",
  authDomain: "social-bf7c5.firebaseapp.com",
  projectId: "social-bf7c5",
  storageBucket: "social-bf7c5.appspot.com",
  messagingSenderId: "582853899763",
  appId: "1:582853899763:web:b8510bff45460affc00e86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
