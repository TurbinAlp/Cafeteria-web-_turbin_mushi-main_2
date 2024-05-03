import { ROLE, STAFF_STATUS } from "../../../lib/enum";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAndKeLngrxV4Hn3RE3YnLJ5-_DvtMfGos",
  authDomain: "dtcs-app.firebaseapp.com",
  databaseURL: "https://dtcs-app-default-rtdb.firebaseio.com",
  projectId: "dtcs-app",
  storageBucket: "dtcs-app.appspot.com",
  messagingSenderId: "638755640647",
  appId: "1:638755640647:web:33289ec257f94bebb76862",
  measurementId: "G-LHHDQLFBDL"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


// Define the type for staff data from Firebase
export interface FirebaseStaffData {
  username: string;
  email: string;
  mobile: string;
  role: ROLE;
  status: STAFF_STATUS;
  passport: string;
  course: string;
  academicYear: string;
  gender: string;
  address: string;
  birthDate: string;
}

export interface STAFF_DATA_TYPE {
  username: string;
  email: string;
  mobile: string;
  role: ROLE;
  status: STAFF_STATUS;
  passport: string;
  course: string;
  academicYear: string;
  gender: string;
  address: string;
  birthDate: string;
}

// Function to fetch data from Firebase
async function fetchDataFromFirebase(): Promise<FirebaseStaffData[]> {
  const firebaseData: FirebaseStaffData[] = []; // Explicitly type firebaseData as FirebaseStaffData[]
  try {
    const snapshot = await get(ref(database, 'Staff Members'));
    snapshot.forEach((childSnapshot) => {
      firebaseData.push(childSnapshot.val());
    });
    return firebaseData;
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    return []; // Return an empty array in case of error
  }
}

async function mergeData() {
  try {
    const firebaseStaffData = await fetchDataFromFirebase();

    STAFF_DATA.splice(0, STAFF_DATA.length, ...firebaseStaffData);
    
  } catch (error) {
    console.error('Error merging data:', error);
  }
}




// Define STAFF_DATA as empty array initially
 let STAFF_DATA: STAFF_DATA_TYPE[] = [];

// Call mergeData() to initiate the merging process
mergeData();

// Export the STAFF_DATA array after it's been updated with Firebase data
export { STAFF_DATA };