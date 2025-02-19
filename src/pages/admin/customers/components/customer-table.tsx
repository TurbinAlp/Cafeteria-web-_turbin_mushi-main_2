import {
  ActionIcon,
  Anchor,
  Avatar,
  Center,
  Divider,
  Flex,
  Group,
  Menu,
  Modal,
  Paper,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  keys,
  rem,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "../../../../global/css/TableSort.module.css";
import { color } from "../../../../lib/colors";
import {
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconSearch,
  IconSelector,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { CUSTOMER_DATA, CUSTOMER_TYPE } from "./data";
import { useDisclosure } from "@mantine/hooks";
import CustomerInformation from "./customer-information";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: CUSTOMER_TYPE[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: CUSTOMER_TYPE[],
  payload: {
    sortBy: keyof CUSTOMER_TYPE | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

//   MAIN FUNCTION

const CustomerTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(CUSTOMER_DATA);
  const [sortBy, setSortBy] = useState<keyof CUSTOMER_TYPE | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const [openedStaffInfo, { open, close }] = useDisclosure(false);
  const [selectedStaff, setSelectedStaff] = useState<{
    email: string;
    name: string;
  } | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const setSorting = (field: keyof CUSTOMER_TYPE) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(CUSTOMER_DATA, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(CUSTOMER_DATA, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row: CUSTOMER_TYPE, index) => (
    <Table.Tr
      key={row.Fullname}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor:
          hoveredItem === index ? color.semi_transparent_blue : color.white,
      }}
    >
      <Table.Td>
        <UnstyledButton>
          <Flex wrap="wrap" gap={"sm"} align="center" direction={"row"}>
            <Avatar src={row.profilePic} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {row.Fullname}
              </Text>
            </div>
          </Flex>
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <Anchor fz="sm" href={`mailto:${row.username}`} lineClamp={1}>
          {row.username}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor fz="sm" href={`tell:${row.PhoneNumber}`}>
          {row.PhoneNumber}
        </Anchor>
      </Table.Td>
      <Table.Td>{row.Gender}</Table.Td>
      <Table.Td>{row.Account_Number}</Table.Td>
      <Table.Td>{row.Amount}</Table.Td>

      <Table.Td>
        <Group>
          <ActionIcon
            variant="light"
            size={"lg"}
            onClick={() => {
              setSelectedStaff({ email: row.username, name: row.Fullname });
              open();
            }}
          >
            <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>

          <Menu position="bottom" withArrow width={200} shadow="md">
            <Menu.Target>
              <ActionIcon variant="light" size={"lg"}>
                <IconSettings
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item c={`${color.dimmed}`}>Actions</Menu.Item>

              <Menu.Item>
                <Group c={`${color.red}`}>
                  <IconTrash />
                  <Text>Delete</Text>
                </Group>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Modal
        opened={openedStaffInfo}
        onClose={close}
        title={
          <Text c={`${color.blue_950}`}>{selectedStaff?.name} Information</Text>
        }
        radius={"md"}
        centered
        size={"xl"}
        withCloseButton
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        closeOnClickOutside={false}
      >
        <Divider size={"sm"} />

        <CustomerInformation data={{ email: selectedStaff?.email }} />
      </Modal>

      <Paper p={30} radius="md" shadow="sm">
        <Flex justify="space-between" gap={"md"}>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            value={search}
            onChange={handleSearchChange}
            w={{ base: "100%", sm: "100%", md: "60%", lg: "50%", xl: "40%" }}
          />
        </Flex>
        <Table.ScrollContainer minWidth={1500} type="native">
          <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
            <Table.Tbody>
              <Table.Tr bg={`${color.blue_100}`}>
                <Th
                  sorted={sortBy === "Fullname"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("Fullname")}
                >
                  Name
                </Th>
                <Th
                  sorted={sortBy === "username"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("username")}
                >
                  Email
                </Th>
                <Th
                  sorted={sortBy === "PhoneNumber"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("PhoneNumber")}
                >
                  Phone Number
                </Th>
                <Th
                  sorted={sortBy === "Gender"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("Gender")}
                >
                  Gender
                </Th>

                <Th
                  sorted={sortBy === "Account_Number"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("Account_Number")}
                >
                  Card Number
                </Th>

                <Th
                  sorted={sortBy === "Amount"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("Amount")}
                >
                  Amount
                </Th>
                {/* <Th
                  sorted={sortBy === "cardNumber"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("cardNumber")}
                >
                  Card Number
                </Th> */}

                <Th sorted={false} reversed={false} onSort={() => {}}>
                  Actions
                </Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </div>
  );
};

export default CustomerTable;
