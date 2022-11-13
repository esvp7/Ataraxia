import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBNjNMXdF2v12j8te-2qClmSbUQxPp50PM",
  authDomain: "ataraxia-83f9e.firebaseapp.com",
  databaseURL: "https://ataraxia-83f9e-default-rtdb.firebaseio.com",
  projectId: "ataraxia-83f9e",
  storageBucket: "ataraxia-83f9e.appspot.com",
  messagingSenderId: "839039368841",
  appId: "1:217644061505:web:0c9299eec04c39dc6d07c0"
});

// Initialize Firebase
export { firebaseConfig as firebase };

const auth = firebase.auth();

export { auth };


