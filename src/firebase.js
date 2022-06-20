// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbytuW-rLrmO4ngw4EOEEVLlfPwoKa-NQ",
  authDomain: "netflix-clone-fd3f1.firebaseapp.com",
  projectId: "netflix-clone-fd3f1",
  storageBucket: "netflix-clone-fd3f1.appspot.com",
  messagingSenderId: "310182909980",
  appId: "1:310182909980:web:5d9e5ed55ed9577f2aa7d9",
  measurementId: "G-8Q1H6B1EF5"
};

  const App = firebase.initializeApp(firebaseConfig)
  const db = App.firestore()
  const auth = firebase.auth()

  export { auth, db }