// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPlx6p1Go86y_BLjYbpR5wjv-DIQP6x08",
  authDomain: "vue-practice-nadav.firebaseapp.com",
  databaseURL: "https://vue-practice-nadav.firebaseio.com",
  projectId: "vue-practice-nadav",
  storageBucket: "vue-practice-nadav.appspot.com",
  messagingSenderId: "521233447871",
  appId: "1:521233447871:web:817b5b5e4e50aaeafc3f0a"
};
firebase.initializeApp(firebaseConfig);
 
export default firebase