import {
  ActionIcon,
  Container,
  Divider,
  Flex,
  Group, Menu, Paper, Select, Space, Title,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { color } from "../../../lib/colors";
import {
  IconCurrencyDollar, IconDots, IconShoppingCart, IconTransferOut,
} from "@tabler/icons-react";
import { TIME_RANGE } from "../../../lib/enum";
import useRandomNumberGenerator from "../../../global/function/random-number-generator";
import ReactNodeSwiper from "../../../global/components/reactNote-swiper";
import MenuTable from "./components/menu-table";
import SellsChart from "./components/sells-chart";
// import SelectTimeRange from "../../../global/components/time-range-select";
import YearlySalesStats from "./components/yearly-sales-stats";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";


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
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const AdminDashboard: React.FC = () => {
  const { totalSalesGenerator } = useRandomNumberGenerator();

  const [salesTime, setSalesTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );
  const [totalSales, setTotalSales] = useState<string>("0");

  const [revenueTime, setRevenueTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );
  const [totalRevenue, setTotalRevenue] = useState<string>("0");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; 
        const year = today.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

      const couponsRef = ref(database, `Coupons/Coupons Used/${formattedDate}`);
        const snapshot = await get(couponsRef);

        if (snapshot.exists()) {
          let totalSalesCount = 0;
          let totalRevenueCount = 0;

          snapshot.forEach((childSnapshot) => {
            const menuName = childSnapshot.key;
            if (menuName !== "Used Today" && menuName !== "Used Total") {
              const couponDetails = childSnapshot.val();
              const [couponCount, totalAmount] = couponDetails.split(" ");
              totalSalesCount += parseInt(couponCount);
              totalRevenueCount += parseInt(totalAmount);
            }
          });

          setTotalSales(totalSalesCount.toString());
          setTotalRevenue(totalRevenueCount.toString());
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, [database]);

  const onChangeTime = () => {
    setTotalSales(totalSalesGenerator);
  };

  const onChangeRevenue = () => {
    setTotalRevenue(totalSalesGenerator);
  };

  // NODES
  const sales = (
    <Paper p={"md"} shadow="md" w={"100%"} h={150} radius={"md"}>
      <Group justify="space-between">
        <Group>
          <Title order={2} c={`${color.blue_950}`}>
            Total Plates
          </Title>
          <Divider orientation="vertical" size={"lg"} />
          <Title order={3} c={`${color.dimmed}`}>
            {salesTime}
          </Title>
        </Group>
        <Menu position="bottom" withArrow width={200} shadow="md">
          <Menu.Target>
            <IconDots />
          </Menu.Target>

          <Menu.Dropdown>
            <Select
              label="Filter"
              value={salesTime}
              data={[
                TIME_RANGE.TODAY,
                TIME_RANGE.YESTERDAY,
                TIME_RANGE.THIS_WEEK,
                TIME_RANGE.THIS_MONTH,
                TIME_RANGE.LAST_MONTH,
                TIME_RANGE.LAST_YEAR,
              ]}
              variant="filled"
              onChange={(value: string | null) => {
                if (Object.values(TIME_RANGE).includes(value as TIME_RANGE)) {
                  setSalesTime(value as TIME_RANGE);
                  onChangeTime();
                }
              }}
            />
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Space h={"md"} />

      <Group>
        <ActionIcon
          variant="default"
          aria-label="Settings"
          radius={"xl"}
          size={"xl"}
        >
          <IconShoppingCart
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

        <Title order={2}>{totalSales} </Title>
      </Group>
    </Paper>
  );

  const revenue = (
    <Paper p={"md"} shadow="md" w={"100%"} h={150} radius={"md"}>
      <Group justify="space-between">
        <Group>
          <Title order={2} c={`${color.blue_950}`}>
            Sales
          </Title>
          <Divider orientation="vertical" size={"lg"} />
          <Title order={3} c={`${color.dimmed}`}>
            {revenueTime}
          </Title>
        </Group>
        <Menu position="bottom" withArrow width={200} shadow="md">
          <Menu.Target>
            <IconDots />
          </Menu.Target>

          <Menu.Dropdown>
            <Select
              label="Filter"
              value={revenueTime}
              data={[
                TIME_RANGE.TODAY,
                TIME_RANGE.YESTERDAY,
                TIME_RANGE.THIS_WEEK,
                TIME_RANGE.THIS_MONTH,
                TIME_RANGE.LAST_MONTH,
                TIME_RANGE.LAST_YEAR,
              ]}
              variant="filled"
              onChange={(value: string | null) => {
                if (Object.values(TIME_RANGE).includes(value as TIME_RANGE)) {
                  setRevenueTime(value as TIME_RANGE);
                  onChangeRevenue();
                }
              }}
            />
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Space h={"md"} />

      <Group>
        <ActionIcon
          variant="default"
          aria-label="Settings"
          radius={"xl"}
          size={"xl"}
        >
          <IconCurrencyDollar
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>

        <Title order={2}>{totalRevenue} Tshs</Title>
      </Group>
    </Paper>
  );

  return (
    <Container size={"xl"} bg={`${color.transparent}`} w={"100%"} p={0}>
      <ReactNodeSwiper node={[sales, revenue]} />

      <Space h={"md"} />

      <Flex
        direction={{ base: "column", xl: "row" }}
        justify={"space-evenly"}
        gap={"md"}
      >
        <Flex
          w={{
            base: "100%",
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "50%",
          }}
          align={"start"}
        >
          <YearlySalesStats />
        </Flex>
        <Flex
          w={{
            base: "100%",
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "50%",
          }}
        >
          <MenuTable />
        </Flex>
      </Flex>

      <Space h={"md"} />

      <SellsChart />
    </Container>
  );
};

export default AdminDashboard;