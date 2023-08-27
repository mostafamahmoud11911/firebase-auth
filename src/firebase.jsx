
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCiry5AYLi4DmRJtoABzA56alnRL1eJyBU',
  authDomain: 'authproject-fe36e.firebaseapp.com',
  projectId: 'authproject-fe36e',
  storageBucket: 'authproject-fe36e.appspot.com',
  messagingSenderId: '289010081782',
  appId: '1:289010081782:web:8a5e0097b0f326516971d7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;