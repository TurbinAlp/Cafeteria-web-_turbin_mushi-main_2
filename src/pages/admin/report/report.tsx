import { Button, Flex, Paper, SimpleGrid, Space, Title } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { IconCalendar, IconPrinter } from "@tabler/icons-react";
import { color } from "../../../lib/colors";
import ReactNodeSwiper from "../../../global/components/reactNote-swiper";
import useFeedbackNodes from "./components/node";
import SalesReportTable from "./components/sales-report-table";
import { MenuType } from "./request/request-data";
import React from "react";

const Report = () => {



  const [currentDate, setCurrentDate] = React.useState<Date | null>(new Date());

  const { Sales, SoldPlate, NewUser, FinishedFood } = useFeedbackNodes(currentDate);
  const [salesData, setSalesData] = React.useState<MenuType[]>([]);

  const handlePrint = () => {
    const totalPlates = salesData.reduce((acc, row) => acc + parseInt(row.servedTime), 0);
    const totalAmount = salesData.reduce((acc, row) => acc + parseFloat(row.menuPrice), 0);
    const printContent = `
          <html>
            <head>
              <title>Sales Report of ${currentDate}</title>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h1>Sales Report</h1>
              <table>
                <thead>
                  <tr>
                    <th>Menu Name</th>
                    <th>Average Price Per Coupon</th>
                    <th>Served Plates</th>
                    <th>Status</th>
                    <th>Menu Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${salesData.map(row => `
                    <tr>
                      <td>${row.menuName}</td>
                      <td>${(parseFloat(row.menuPrice) / parseFloat(row.servedTime)).toFixed(2)}</td>
                      <td>${row.servedTime}</td>
                      <td>${row.status ? 'Available' : 'Finished'}</td>
                      <td>${row.menuPrice}</td>
                    </tr>
                  `).join('')}
                  <tr>
              <td><strong>Total</strong></td>
              <td></td>
              <td><strong>${totalPlates}</strong></td>
              <td></td>
              <td><strong>${totalAmount}</strong></td>
            </tr>
                </tbody>
              </table>
            </body>
          </html>
        `;
    const printWindow = window.open("", "", "height=600,width=800");

    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Failed to open print window");
    }
  };

  return (
    <div>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "start" }}
        justify={"space-between"}
        gap={"md"}
      >
        <Title order={3} c={`${color.blue_950}`}>
          DCTS Report
        </Title>
        <Flex
          direction={"row"}
          align={"center"}
          justify={{ base: "space-between" }}
          w={{ base: "100%", md: 500 }}
          gap={"md"}
        >
          <Button leftSection={<IconPrinter />} variant="outline" onClick={handlePrint}>
            Print
          </Button>
          <Paper withBorder shadow="sm">
            <Flex
              direction={"row"}
              justify={"center"}
              align={"center"}
              gap={"xs"}
              px={"xs"}
            >
              <IconCalendar />
              <SimpleGrid cols={2}>
                <DateInput
                  maw={150}
                  variant="unstyled"
                  value={currentDate}
                  onChange={(value: DateValue) => setCurrentDate(value)
                    //dateForm.setFieldValue("initialDate", value)
                  }
                />

                {/* <DateInput
                  maw={150}
                  variant="unstyled"
                  value={dateForm.values.endDate}
                  onChange={(value: DateValue) =>
                    dateForm.setFieldValue("endDate", value)
                  } /> */}
              </SimpleGrid>
            </Flex>
          </Paper>
        </Flex>
      </Flex>

      <Space h={"md"} />

      <ReactNodeSwiper
        node={[<Sales />, <SoldPlate />, <NewUser />, <FinishedFood />]}
      />

      <Space h={"md"} />

      {/* <StatisticsBarChart /> */}

      <Space h={"md"} />

      <SalesReportTable date={currentDate ?? new Date()} setSalesData={setSalesData} />
    </div>
  );
};

export default Report;
