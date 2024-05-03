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

export interface firebaseCustomerData {
  Fullname: string;
  username: string;
  PhoneNumber: string;
  Gender: string;
  Account_Number: string;
  cardNumber: string;
  Amount: string;
  birthDate: string;
  profilePic: string;
};

export interface CUSTOMER_TYPE {
  Fullname: string;
  username: string;
  PhoneNumber: string;
  Gender: string;
  Account_Number: string;
  cardNumber: string;
  Amount: string;
  birthDate: string;
  profilePic: string;
};

// Function to fetch data from Firebase
async function fetchDataFromFirebase(): Promise<firebaseCustomerData[]> {
  const firebaseData: firebaseCustomerData[] = [];
  try {
    const snapshot = await get(ref(database, 'All Users'));
    snapshot.forEach((userDoc) => {
      const userDetails = userDoc.child('Details').val(); // Access the 'Details' subcollection for each user
      if (userDetails) {
        firebaseData.push(userDetails); // Push the details into the firebaseData array
      }
    });
    return firebaseData;
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    return [];
  }
}

// Define STAFF_DATA as empty array initially
 let CUSTOMER_DATA: CUSTOMER_TYPE[] = [];

async function mergeData() {
  try {
    const firebaseCustomerData = await fetchDataFromFirebase();

    CUSTOMER_DATA.splice(0, CUSTOMER_DATA.length, ...firebaseCustomerData);
    
  } catch (error) {
    console.error('Error merging data:', error);
  }
}


// Call mergeData() to initiate the merging process
mergeData();

// Export the STAFF_DATA array after it's been updated with Firebase data
export { CUSTOMER_DATA };