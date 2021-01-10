// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey           : "AIzaSyBNVQx6R8_ZQbFEmnIWISMsuHp28Ah9_Cs",
  authDomain       : "nadav-first-vue.firebaseapp.com",
  projectId        : "nadav-first-vue",
  storageBucket    : "nadav-first-vue.appspot.com",
  messagingSenderId: "313545263849",
  appId            : "1:313545263849:web:af284be233ee15d0597e78",
  databaseURL      : "https://nadav-first-vue-default-rtdb.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database()
export const chatsRef = db.ref('chats')
export default firebase


// var firebaseConfig = {
//   apiKey: "AIzaSyCPlx6p1Go86y_BLjYbpR5wjv-DIQP6x08",
//   authDomain: "vue-practice-nadav.firebaseapp.com",
//   databaseURL: "https://vue-practice-nadav.firebaseio.com",
//   projectId: "vue-practice-nadav",
//   storageBucket: "vue-practice-nadav.appspot.com",
//   messagingSenderId: "521233447871",
//   appId: "1:521233447871:web:0b6dc37e2bcd2beffc3f0a"
// };