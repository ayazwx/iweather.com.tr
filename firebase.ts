import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAL5LjR831JaN1uD36UyZJh15NZa1VbA-o",
  authDomain: "iweather-next.firebaseapp.com",
  projectId: "iweather-next",
  storageBucket: "iweather-next.appspot.com",
  messagingSenderId: "651901688714",
  appId: "1:651901688714:web:9c327574c91766cfe60673",
  measurementId: "G-KHCGTDSZ7V"
};
// console.log(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(firebaseApp);
// console.log('app',app)
// export const auth = getAuth()
// console.log('auth', auth)