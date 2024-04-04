import {
  Paper,
  Group,
  Title,
  Divider,
  Menu,
  Select,
  Space,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import React, { useState } from "react";
import { color } from "../../../../lib/colors";
import { TIME_RANGE } from "../../../../lib/enum";
import useRandomNumberGenerator from "../../../../global/function/random-number-generator";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type statsType = {
  name: string;
  price: number;
  time: string | null;
};

const SellsChart: React.FC = () => {
  const { totalSalesGenerator } = useRandomNumberGenerator();

  const [salesTime, setSalesTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );

  const stats: statsType[] = [
    {
      name: "Ugali Maharage",
      time: salesTime,
      price: Number(totalSalesGenerator()),
    },
    {
      name: "Chipsi Yai",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Kuku wa Kukaanga",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Makange Kuku",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Kuku Rosti",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Ugali Nyama",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Wali Maharage",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Wali Makange Nyama",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
    {
      name: "Wali Samaki",
      price: Number(totalSalesGenerator()),
      time: salesTime,
    },
  ];

  return (
    <Paper p={"md"} shadow="md" w={"100%"} radius={"md"} bg={`${color.white}`}>
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
                }
              }}
            />
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Space h={"md"} />

      <ResponsiveContainer width={"100%"} height={600}>
        <BarChart data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill={`${color.blue_500}`} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SellsChart;
