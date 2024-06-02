import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";

export type MenuType = {
    menuName: string;
    servedTime: string;
    menuPrice: string;
    status: string;
}

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

export const fetchDataFromDatabase = async (today: Date): Promise<{
  data: MenuType[] ;
  totalCouponCount: number;
  totalAmount: number;
} | null> => {
  let totalPlatesi: number = 0;
  let totalAmounti: number = 0;


    try {

    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

      const couponsRef = ref(database, `Coupons/Coupons Used/${formattedDate}`);
      const snapshot = await get(couponsRef);
      
      if (snapshot.exists()) {
        const data: MenuType[] = [];
        let totalCouponCount = 0;
        let totalAmount = 0;
  
        snapshot.forEach((childSnapshot) => {
          const menuName = childSnapshot.key;
          if (menuName !== "Used Today" && menuName !== "Used Total") {
            const [couponCount, totalSales] = childSnapshot.val().split(" ");
            const servedTime = couponCount ;
            const status = "Used";
  
            data.push({
              menuName,
              menuPrice: totalSales,
              servedTime,
              status,
            });
  
            totalCouponCount += parseInt(couponCount);
            totalAmount += parseInt(totalSales);
          }
        });
  
        totalAmounti = totalAmount;
        totalPlatesi = totalCouponCount;
  
        return { data, totalCouponCount, totalAmount };
      } else {
        console.log("No data available");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };