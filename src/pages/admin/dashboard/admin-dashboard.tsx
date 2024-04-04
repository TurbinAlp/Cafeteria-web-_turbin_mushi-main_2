import {
  ActionIcon,
  Container,
  Divider,
  Flex,
  Group,
  Menu,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { color } from "../../../lib/colors";
import {
  IconCurrencyDollar,
  IconDots,
  IconShoppingCart,
} from "@tabler/icons-react";
import { QUICK_ACTION_LABEL, TIME_RANGE } from "../../../lib/enum";
import useRandomNumberGenerator from "../../../global/function/random-number-generator";
import { QUICK_ACTION, QuickAccessType } from "../../../lib/quick-action";
import ReactNodeSwiper from "../../../global/components/reactNote-swiper";
import { useDisclosure } from "@mantine/hooks";
import CustomerRegistration from "./components/customer-registration";
import MenuTable from "./components/menu-table";
import SellsChart from "./components/sells-chart";

const AdminDashboard: React.FC = () => {
  const { totalSalesGenerator } = useRandomNumberGenerator();
  const [openedAction, { open: openAction, close: closeAction }] =
    useDisclosure(false);
  const [
    openedRegisterCustomer,
    { open: openRegisterCustomer, close: closeRegisterCustomer },
  ] = useDisclosure(false);

  const [salesTime, setSalesTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );
  const [totalSales, setTotalSales] = useState<string>(totalSalesGenerator);

  const [revenueTime, setRevenueTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );
  const [totalRevenue, setTotalRevenue] = useState<string>(totalSalesGenerator);

  // NODES
  const sales = (
    <Paper p={"md"} shadow="md" w={"100%"} h={150} radius={"md"}>
      <Group justify="space-between">
        <Group>
          <Title order={2} c={`${color.blue_950}`}>
            Sales
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

        <Title order={2}>{totalSales} Tshs</Title>
      </Group>
    </Paper>
  );

  const revenue = (
    <Paper p={"md"} shadow="md" w={"100%"} h={150} radius={"md"}>
      <Group justify="space-between">
        <Group>
          <Title order={2} c={`${color.blue_950}`}>
            Revenue
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

  const quickAction = (action: QuickAccessType, index: number) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={() => handleOnClickQuickAction(action.label)}
      >
        <ActionIcon variant="default" size={80} c={`${color.blue_950}`}>
          {action.icon}
        </ActionIcon>

        <Text
          style={{
            whiteSpace: "pre-line",
            textAlign: "center",
          }}
        >
          {action.label}
        </Text>
      </div>
    );
  };

  // FUNCTIONS

  const handleOnClickQuickAction = (label: string) => {
    if (
      Object.values(QUICK_ACTION_LABEL).includes(label as QUICK_ACTION_LABEL)
    ) {
      if (label === QUICK_ACTION_LABEL.CUSTOMER_REGISTRATION) {
        closeAction();
        openRegisterCustomer();
      }
    }
  };

  const onChangeTime = () => {
    setTotalSales(totalSalesGenerator);
  };

  const onChangeRevenue = () => {
    setTotalRevenue(totalSalesGenerator);
  };

  return (
    <Container fluid bg={`${color.transparent}`} w={"100%"} p={0}>
      <Modal
        opened={openedAction}
        onClose={closeAction}
        title="Quick Actions"
        radius={"md"}
        centered
        withCloseButton
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        closeOnClickOutside={false}
      >
        <SimpleGrid cols={{ base: 3, xs: 4 }}>
          {QUICK_ACTION.map((action: QuickAccessType, index) =>
            quickAction(action, index)
          )}
        </SimpleGrid>
      </Modal>

      <Modal
        opened={openedRegisterCustomer}
        onClose={closeRegisterCustomer}
        title="Customer Registration"
        radius={"md"}
        centered
        withCloseButton
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        closeOnClickOutside={false}
      >
        <CustomerRegistration closeRegisterCustomer={closeRegisterCustomer} />
      </Modal>

      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={"space-evenly"}
        gap={"md"}
      >
        {/* STATS CARDS */}
        <Flex
          w={{ base: "100%", lg: 500, xl: 800 }}
          direction={{ base: "column", md: "row" }}
          gap={"md"}
          align={"center"}
        >
          <ReactNodeSwiper node={[sales, revenue]} />
        </Flex>

        <Paper
          p={"md"}
          shadow="xs"
          radius={"md"}
          w={{ base: "100%", lg: 500, xl: 500 }}
        >
          <Group justify="space-between">
            <Title order={2} c={`${color.blue_950}`}>
              Quick Actions
            </Title>
            <IconDots onClick={openAction} style={{ cursor: "pointer" }} />
          </Group>

          <Space h={"md"} />

          <SimpleGrid cols={4}>
            {QUICK_ACTION.slice(0, 4).map((action: QuickAccessType, index) =>
              quickAction(action, index)
            )}
          </SimpleGrid>
        </Paper>
      </Flex>

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
          <MenuTable />
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
          <SellsChart />
        </Flex>
      </Flex>
    </Container>
  );
};

export default AdminDashboard;
