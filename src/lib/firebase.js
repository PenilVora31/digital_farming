// firebase library
import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// connect to the database

const config = {
  apiKey: "AIzaSyBQLN-_MsYlAKz3KHSQFFBXmbt4o-VoucA",
  authDomain: "digital-farming-a45ef.firebaseapp.com",
  projectId: "digital-farming-a45ef",
  storageBucket: "digital-farming-a45ef.appspot.com",
  messagingSenderId: "276916635308",
  appId: "1:276916635308:web:c8f339e4dc1d245bc7c109",
};

const firebase = Firebase.initializeApp(config);

export { firebase };
