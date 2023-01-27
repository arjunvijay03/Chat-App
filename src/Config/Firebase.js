import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'




const firebaseConfig = {
  apiKey: "AIzaSyAOrFO8KCAZYNpWF9elYmPQaPLOSeUUwv4",
  authDomain: "chat-app-d0683.firebaseapp.com",
  projectId: "chat-app-d0683",
  storageBucket: "chat-app-d0683.appspot.com",
  messagingSenderId: "732955572965",
  appId: "1:732955572965:web:fd9018af55f3a3a6a1b20c"
};

export default  firebase.initializeApp(firebaseConfig);
