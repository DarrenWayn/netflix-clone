// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwTcIphDVvXYZms9pSglIXt0A8wWDRJos",
  authDomain: "netflix-clone-8d469.firebaseapp.com",
  projectId: "netflix-clone-8d469",
  storageBucket: "netflix-clone-8d469.appspot.com",
  messagingSenderId: "662103934133",
  appId: "1:662103934133:web:7076577f527c10fc30aafc",
  measurementId: "G-Z1959HN9D4"
};

  const App = firebase.initializeApp(firebaseConfig)
  const db = App.firestore()
  const auth = firebase.auth()

  export { auth, db }