import React, { useState, useEffect } from "react";
import {
  Paper,
  Group,
  Title,
  Divider,
  Menu,
  Space,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
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
import SelectTimeRange from "../../../../global/components/time-range-select";
import { color } from "../../../../lib/colors";
import { TIME_RANGE } from "../../../../lib/enum";
import { MenuType, fetchDataFromDatabase } from "../../report/request/request-data";

type statsType = {
  name: string;
  price: number;
  time: string | null;
};

type SalesReportTableProps = {
  date: Date;
}

const SellsChart: React.FC<SalesReportTableProps> = ({date}) => {
  //const { totalSalesGenerator } = useRandomNumberGenerator();
  const [salesData, setSalesData] = useState<MenuType[]>([]);

  const [salesTime, setSalesTime] = useState<TIME_RANGE | null>(
    TIME_RANGE.TODAY
  );
  const [stats, setStats] = useState<statsType[]>([]);

  useEffect(() => {
    setSalesData([]);
    fetchData();
  }, [date]);

  const fetchData = () => {
    fetchDataFromDatabase(date).then((result) => {
      if (result && result.data) { 
        const newStats: statsType[] = result.data.map((menuItem: MenuType) => ({
          name: menuItem.menuName,
          price: Number(menuItem.menuPrice),
          time: salesTime,
        }));
        
        setStats(newStats);
      }
    });
  }
  

  return (
    <Paper p={"md"} shadow="md" w={"100%"} radius={"md"} bg={`${color.white}`}>
      <Group justify="space-between">
        <Group>
          <Title order={2} c={`${color.blue_950}`}>
            Saleees
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
            <SelectTimeRange
              label="Filter"
              value={salesTime}
              onChange={setSalesTime}
            />
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Space h={"md"} />

      <ResponsiveContainer width={"100%"} height={600}>
        <BarChart data={stats} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill={`${color.blue_500}`} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SellsChart;
