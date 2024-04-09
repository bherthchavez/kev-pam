import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN_KEY1,
  projectId: import.meta.env.VITE_PROJECTID_KEY2,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET_KEY3,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID_KEY4,
  appId: import.meta.env.VITE_APPID_KEY5,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;




