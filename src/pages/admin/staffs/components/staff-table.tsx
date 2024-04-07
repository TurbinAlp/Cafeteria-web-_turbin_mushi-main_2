import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Center,
  Collapse,
  Flex,
  Group,
  Paper,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  keys,
  rem,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconSearch,
  IconSelector,
  IconSettings,
} from "@tabler/icons-react";
import React, { useState } from "react";
import classes from "../css/TableSort.module.css";
import { STAFF_DATA, STAFF_DATA_TYPE } from "../staff-data";
import { useDisclosure } from "@mantine/hooks";
import { STATUS } from "../../../../lib/enum";
import { color } from "../../../../lib/colors";

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

function filterData(data: STAFF_DATA_TYPE[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: STAFF_DATA_TYPE[],
  payload: {
    sortBy: keyof STAFF_DATA_TYPE | null;
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
const StaffTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(STAFF_DATA);
  const [sortBy, setSortBy] = useState<keyof STAFF_DATA_TYPE | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [opened, { toggle }] = useDisclosure(false);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const setSorting = (field: keyof STAFF_DATA_TYPE) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(STAFF_DATA, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(STAFF_DATA, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr
      key={row.name}
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
            <Avatar src={row.passport} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {row.name}
              </Text>

              {/* <Text c="dimmed" size="xs">
                {row.email}
              </Text> */}
            </div>
          </Flex>
        </UnstyledButton>
      </Table.Td>
      <Table.Td>
        <Anchor fz="sm" href={`mailto:${row.email}`}>
          {row.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor fz="sm" href={`tell:${row.mobile}`}>
          {row.mobile}
        </Anchor>
      </Table.Td>
      <Table.Td>{row.role}</Table.Td>
      <Table.Td>
        {row.status === STATUS.ACTIVE ? (
          <Badge bg={`${color.green}`} w={120} py={"xs"}>
            {row.status}
          </Badge>
        ) : (
          <Badge bg={`${color.red}`} w={120} py={"xs"}>
            {row.status}
          </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Flex justify={"center"} align={"center"} gap={"md"}>
          <IconEye />
          <IconSettings />
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
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

          <ActionIcon size="lg" variant="default" onClick={toggle}>
            {opened ? (
              <IconChevronDown
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            ) : (
              <IconChevronUp
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            )}
          </ActionIcon>
        </Flex>
        <Collapse in={opened}>
          <Table.ScrollContainer minWidth={1500} type="native">
            <Table horizontalSpacing="md" verticalSpacing="xs" layout="fixed">
              <Table.Tbody>
                <Table.Tr bg={`${color.blue_100}`}>
                  <Th
                    sorted={sortBy === "name"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("name")}
                  >
                    Name
                  </Th>
                  <Th
                    sorted={sortBy === "email"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("email")}
                  >
                    Email
                  </Th>
                  <Th
                    sorted={sortBy === "mobile"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("mobile")}
                  >
                    Mobile
                  </Th>
                  <Th
                    sorted={sortBy === "role"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("role")}
                  >
                    Role
                  </Th>

                  <Th
                    sorted={sortBy === "status"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("status")}
                  >
                    Street
                  </Th>
                  <Th sorted={false} reversed={false} onSort={() => {}}>
                    Actions
                  </Th>
                </Table.Tr>
              </Table.Tbody>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Collapse>
      </Paper>
    </div>
  );
};

export default StaffTable;
