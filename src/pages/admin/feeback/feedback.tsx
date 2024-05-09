import { Button, Flex, Paper, SimpleGrid, Space, Title } from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import { IconCalendar, IconPrinter } from "@tabler/icons-react";
import { color } from "../../../lib/colors";
import { useForm } from "@mantine/form";
import ReactNodeSwiper from "../../../global/components/reactNote-swiper";
import useFeedbackNodes from "./components/node";
import SalesReportTable from "./components/sales-report-table";

const Feedback = () => {
  const { FinishedFood, NewUser, Sales, SoldPlate } = useFeedbackNodes();

  const dateForm = useForm<{ initialDate: Date | null; endDate: Date | null }>({
    initialValues: {
      initialDate: new Date(),
      endDate: new Date(),
    },
  });

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
          <Button leftSection={<IconPrinter />} variant="outline">
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
                  value={dateForm.values.initialDate}
                  onChange={(value: DateValue) =>
                    dateForm.setFieldValue("initialDate", value)
                  }
                />

                <DateInput
                  maw={150}
                  variant="unstyled"
                  value={dateForm.values.endDate}
                  onChange={(value: DateValue) =>
                    dateForm.setFieldValue("endDate", value)
                  }
                />
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

      <SalesReportTable />
    </div>
  );
};

export default Feedback;
