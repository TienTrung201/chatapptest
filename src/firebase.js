

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAqEJSxXP2TEpI7icLWj91K7pAUY1yxVe4",
  authDomain: "chat-app-test-18b5a.firebaseapp.com",
  projectId: "chat-app-test-18b5a",
  storageBucket: "chat-app-test-18b5a.appspot.com",
  messagingSenderId: "59326585763",
  appId: "1:59326585763:web:63696cfae7a54bc846d816",
  measurementId: "G-MCQZQECZE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);
 export {auth,db} 