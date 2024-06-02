import {
  Avatar, Badge, Button, Flex, Group, Modal, Paper, Space, Table, Text, TextInput, Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { color } from "../../../../lib/colors";
import { MenuType, fetchDataFromDatabase } from "../request/request-data";
import CustomizeReport from "./customize-report";

type SalesReportTableProps = {
  date: Date;
}

const SalesReportTable: React.FC<SalesReportTableProps> = ({date}) => {
  const [opened, { open }] = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const [totalPlates, setTotalPlates] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [salesData, setSalesData] = useState<MenuType[]>([]);
  const [filteredData, setFilteredData] = useState<MenuType[]>([]);

  useEffect(() => {
    setSalesData([]);
    fetchData();
  }, [date]);

  const fetchData = () => {
    fetchDataFromDatabase(date).then((result) => {
      if (result) {
        const { data, totalCouponCount, totalAmount } = result;
        setSalesData(data);
        setTotalPlates(totalCouponCount);
        setTotalAmount(totalAmount);

      }
    });
  }


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);

    const fData = salesData.filter((row) =>
      row.menuName
        .toLowerCase()
        .includes(event.currentTarget.value.toLowerCase())
    );
    
    let totalAmount = 0;
    let soldPlates = 0;
    fData.forEach((row) => {
      totalAmount += parseFloat(row.menuPrice);
      soldPlates += parseInt(row.servedTime);
    });

    setTotalAmount(totalAmount);
    setTotalPlates(soldPlates);

    setFilteredData(fData);

  };

  const rows = search.length != 0 ? filteredData.map((row, index) => {
    const averagePricePerCoupon = parseFloat(row.menuPrice) / parseFloat(row.servedTime);
    return (
      <Table.Tr key={index}>
        <Table.Td>{row.menuName}</Table.Td>
        <Table.Td>{averagePricePerCoupon}</Table.Td>
        <Table.Td>{row.servedTime}</Table.Td>
        <Table.Td>{row.status}</Table.Td>
        <Table.Td>{row.menuPrice}</Table.Td>
      </Table.Tr>
    );
  }) : 

  salesData.map((row, index) => {
    const averagePricePerCoupon = parseFloat(row.menuPrice) / parseFloat(row.servedTime);
    return (
    <Table.Tr key={index} p={"xl"}>
      <Table.Td>
        <Group>
          <Avatar src={row.menuName} radius="md" size={"lg"} />
          {row.menuName}
        </Group>
      </Table.Td>
      <Table.Td>{averagePricePerCoupon}</Table.Td>
      <Table.Td>{row.servedTime}</Table.Td>
      <Table.Td>
        {row.status ? (
          <Badge color={`${color.green}`}>Available</Badge>
        ) : (
          <Badge color={`${color.red}`}>Finished</Badge>
        )}
      </Table.Td>
      <Table.Td>{row.menuPrice}</Table.Td>
    </Table.Tr>
  );
}
);

  const footerRow = (
    <Table.Tr
      style={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1,
        height: 60,
      }}
    >
      {" "}
      <Table.Td>
        <Title c={`${color.blue_950}`} order={3}>
          Total
        </Title>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Title order={4} c={`${color.green}`}>
          {totalPlates}
        </Title>
      </Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>
        <Title order={4} c={`${color.green}`}>
          {totalAmount}
        </Title>
      </Table.Td>
    </Table.Tr>
  );



  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        size={"xl"}
        title={<Text c={`${color.blue_950}`}>Customize Report</Text>}
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
        <CustomizeReport close={close} />
      </Modal>

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
            <Table.Thead
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "white",
                zIndex: "1",
              }}
            >

              <Table.Tr h={80} c={`${color.blue_950}`}>
                <Table.Td>
                  <Title c={`${color.blue_950}`} order={4}>Menu Name</Title>
                </Table.Td>
                <Table.Td>
                  <Title c={`${color.blue_950}`} order={4}>Price @</Title>
                </Table.Td>
                <Table.Td>
                  <Title c={`${color.blue_950}`} order={4}>Sold Plates</Title>
                </Table.Td>
                <Table.Td>
                  <Title c={`${color.blue_950}`} order={4}>Status</Title>
                </Table.Td>
                <Table.Td>
                  <Title c={`${color.blue_950}`} order={4}>Amount (TZS)</Title>
                </Table.Td>
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
