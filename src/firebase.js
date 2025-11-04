import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWOISTfDex05oAeD5qSNIDzGYhtgTiABM",
  authDomain: "agri-recommender.firebaseapp.com",
  projectId: "agri-recommender",
  storageBucket: "agri-recommender.firebasestorage.app",
  messagingSenderId: "928624017263",
  appId: "1:928624017263:web:15b28c45b6ca76c062b29a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);