import React, { useState, useEffect } from "react";
import { ActionIcon, Avatar, Badge, Divider, Group, Menu, Paper, Space, Table, Title,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { color } from "../../../../lib/colors";
import {  STATUS } from "../../../../lib/enum";
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

const MenuTable: React.FC = () => {
  // Define the state for menus and its setter function
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  interface MenuItem {
  name: string;
  items: any[]; // Adjust this type according to the structure of your 'items'
}

useEffect(() => {
  // Function to fetch data from Firebase
  const fetchMenus = async () => {
    const menusRef = ref(database, 'MENUS');
    try {
      const snapshot = await get(menusRef);
      if (snapshot.exists()) {
        const menusData = snapshot.val();
        const menusArray = Object.keys(menusData).map((key) => ({
          name: key,
          items: Object.values(menusData[key]),
        }));
        setMenus(menusArray);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  fetchMenus(); // Call the fetchMenus function when component mounts
}, []);

useEffect(() => {
  // Filter the items based on the selected menu's sub-collection
  if (selectedMenu) {
    const selectedMenuItems = menus.find((m) => m.name === selectedMenu.name)?.items || [];
    setFilteredItems(selectedMenuItems);
  }
}, [selectedMenu, menus]);

useEffect(() => {
  // Set the default selected menu to "Breakfast"
  if (menus.length > 0) {
    const defaultMenu = menus.find((m) => m.name === "Breakfast");
    if (defaultMenu) {
      setSelectedMenu(defaultMenu);
    }
  }
}, [menus]);

const handleMenuSelect = (menu: MenuItem) => {
  setSelectedMenu(menu);
  const selectedMenuItems = menus.find((m) => m.name === menu.name)?.items || [];
  setFilteredItems(selectedMenuItems);
};

return (
  <Paper p={"md"} shadow="md" w={"100%"} radius={"md"}>
    <Group justify="space-between">
      <Group>
        <Title order={2} c={`${color.blue_950}`}>
          Menu
        </Title>
        <Divider orientation="vertical" size={"lg"} />
        <Title order={3} c={`${color.dimmed}`}>
          {/* Display the selected status mode */}
          {/* For example: {statusMode} */}
          {selectedMenu ? selectedMenu.name : ''}
        </Title>
      </Group>
      <Menu position="bottom" withArrow width={200} shadow="md">
        <Menu.Target>
          <IconDots />
        </Menu.Target>
        <Menu.Dropdown>
        {/* Map through the menus state to render dropdown items */}
          {menus.map((menu, index) => (
            <Menu.Item key={index} onClick={() => handleMenuSelect(menu)}>
              {menu.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>

      </Menu>
    </Group>

    <Space h={"md"} />

    <Table.ScrollContainer minWidth={700} type="native" mah={380}>
      <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
      <Table.Tbody>
        {filteredItems.map((item, index) => (
          <React.Fragment key={index}>
            <Table.Tr>
              <Table.Td>
                <Avatar src={item.menuImage} radius="md" size={"lg"} />
              </Table.Td>
              <Table.Td>{item.foodName}</Table.Td>
              <Table.Td>{item.price} Tshs</Table.Td>
              <Table.Td>
                <Badge bg={`${item.statusMode === STATUS.AVAILABLE ? color.green : color.red}`} w={120} py={"xs"}>
                  {item.statusMode}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group>
                  <ActionIcon variant="light" size={"lg"}>
                    <IconEdit style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon variant="light" c={`${color.red}`} size={"lg"}>
                    <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
            {/* Add a divider after each menu item */}
            <Table.Tr>
              <Table.Td colSpan={5}><Divider size="sm" /></Table.Td>
            </Table.Tr>
          </React.Fragment>
        ))}
      </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  </Paper>
);
};

export default MenuTable;
