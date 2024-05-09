import {
  Avatar, Badge, Button, Flex, Group, Modal, Paper, Space, Table, Text, TextInput, Title, 
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { color } from "../../../../lib/colors";

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

interface Props {
  couponCounts: { [key: string]: number };
}

export let totalPlatesi: number = 0;
export let totalAmounti: number = 0;

const SalesReportTable: React.FC<Props> = () => { 
  const [opened, { open }] = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const [totalPlates, setTotalPlates] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [salesData, setSalesData] = useState<any[]>([]); 
  


  useEffect(() => {
    const couponsRef = ref(database, "Coupons/Coupons Used/9-5-2024"); 
    get(couponsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data: any[] = [];
        let totalCouponCount = 0; 
        let totalAmount = 0; 
  
        // Extracting data for each food item sold
        snapshot.forEach((childSnapshot) => {
          const menuName = childSnapshot.key; 
          if (menuName !== "Used Today" && menuName !== "Used Total") {
            const [couponCount, totalSales] = childSnapshot.val().split(" "); 
            const servedTime = couponCount + " sold"; 
            const status = "Used";
    
            // Pushing coupon data to data array
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
        setTotalPlates(totalCouponCount);
        setTotalAmount(totalAmount);
        setSalesData(data);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);
  
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    const filteredData = salesData.filter((row) =>
      row.menuName.toLowerCase().includes(event.currentTarget.value.toLowerCase())
    );
    setSalesData(filteredData);
  };

  const rows = salesData.map((row, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{row.menuName}</Table.Td>
        <Table.Td>{row.servedTime}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>{row.menuPrice}</Table.Td>
      </Table.Tr>
    );
  });
  
  const footerRow = (
    <Table.Tr>
      <Table.Td>Total</Table.Td>
      <Table.Td>{totalPlates} sold</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{totalAmount} TZS</Table.Td>
    </Table.Tr>
  );
  
  
  return (
    <div>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "start" }}
        justify={{ base: "start", md: "space-between" }}
        gap={"sm"}
      >
        <Title order={3} c={`${color.blue_950}`}>
          Sales Report
        </Title>
        <Flex direction={"row"} gap={"md"}>
          <Button variant="outline" onClick={open}>
            Customize Report
          </Button>
          <TextInput
            value={search}
            placeholder="Search..."
            onChange={handleSearch}
          />
        </Flex>
      </Flex>
  
      <Space h={"md"} />
  
      <Paper>
        <Table.ScrollContainer minWidth={1000} type="native" mah={600}>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Td>Menu Name</Table.Td>
                <Table.Td>Sold Plates</Table.Td>
                <Table.Td>Status</Table.Td>
                <Table.Td>Amount (TZS)</Table.Td>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Tfoot>{footerRow}</Table.Tfoot>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </div>
  );
}


export default SalesReportTable;
