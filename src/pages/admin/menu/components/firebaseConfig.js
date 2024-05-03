import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAndKeLngrxV4Hn3RE3YnLJ5-_DvtMfGos",
    authDomain: "dtcs-app.firebaseapp.com",
    projectId: "dtcs-app",
    storageBucket: "dtcs-app.appspot.com",
    messagingSenderId: "638755640647",
    appId: "1:638755640647:web:33289ec257f94bebb76862",
    measurementId: "G-LHHDQLFBDL"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
