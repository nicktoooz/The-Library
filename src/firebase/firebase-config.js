import { getAuth } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
1;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDIfkhwOzq-6CAJ4GeHeKCdJ0YD9-zCeDY',
  authDomain: 'librarymanagementsystem-ad274.firebaseapp.com',
  databaseURL: 'https://librarymanagementsystem-ad274-default-rtdb.firebaseio.com',
  projectId: 'librarymanagementsystem-ad274',
  storageBucket: 'librarymanagementsystem-ad274.appspot.com',
  messagingSenderId: '219955846882',
  appId: '1:219955846882:web:8e74f95497e09605c948bb',
  measurementId: 'G-QESC4NRYGV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
