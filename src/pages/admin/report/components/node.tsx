import {
  IconMeat,
  IconUsers,
  IconChefHat,
  IconStairsUp,
  IconArrowUp,
} from "@tabler/icons-react";
import { color } from "../../../../lib/colors";
import { Badge, Flex, Paper, Text, Title } from "@mantine/core";
import { fetchDataFromDatabase } from "../request/request-data";
import React, { useEffect } from "react";


const useFeedbackNodes = () => {
  const [totalPlates, setTotalPlates] = React.useState<number>(0);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  useEffect(() => {
    fetchDataFromDatabase().then((result) => {
      if (result) {
        const { totalCouponCount, totalAmount } = result;
        setTotalPlates(totalCouponCount);
        setTotalAmount(totalAmount);
      }
    });
  }, []);


  const Sales = () => {
    return (
      <Paper p={"md"} radius={"md"}>
        <Flex direction={"column"}>
          <IconStairsUp color="gold" size={40} />
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <div>
              <Title order={4} c={"gold"}>
                {totalAmount} Tshs 
              </Title>
              <Text c={`${color.dimmed}`}>Today's Sale</Text>
            </div>
            <Badge
              leftSection={<IconArrowUp />}
              color={`${color.green}`}
              variant="outline"
              p={"sm"}
            >
              <Text>12%</Text>
            </Badge>
          </Flex>
        </Flex>
      </Paper>
    );
  };

  const SoldPlate = () => {
    return (
      <Paper p={"md"} radius={"md"}>
        <Flex direction={"column"}>
          <IconMeat color={`${color.blue_800}`} size={40} />
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <div>
              <Title order={4} c={`${color.blue_800}`}>
                {totalPlates}
              </Title>
              <Text c={`${color.dimmed}`}>Today's Sold Plates</Text>
            </div>
            <Badge
              leftSection={<IconArrowUp />}
              color={`${color.green}`}
              variant="outline"
              p={"sm"}
            >
              <Text>12%</Text>
            </Badge>
          </Flex>
        </Flex>
      </Paper>
    );
  };

  const NewUser = () => {
    return (
      <Paper p={"md"} radius={"md"}>
        <Flex direction={"column"}>
          <IconUsers color={`${color.blue_500}`} size={40} />
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <div>
              <Title order={4} c={`${color.blue_500}`}>
                10
              </Title>
              <Text c={`${color.dimmed}`}>Today's New Users</Text>
            </div>
            <Badge
              leftSection={<IconArrowUp />}
              color={`${color.green}`}
              variant="outline"
              p={"sm"}
            >
              <Text>0.2%</Text>
            </Badge>
          </Flex>
        </Flex>
      </Paper>
    );
  };

  const FinishedFood = () => {
    return (
      <Paper p={"md"} shadow="md" radius={"md"}>
        <Flex direction={"column"}>
          <IconChefHat color={`${color.blue_500}`} size={40} />
          <Flex direction={"row"} justify={"space-between"} align={"center"}>
            <div>
              <Title order={4} c={`${color.blue_500}`}>
                2
              </Title>
              <Text c={`${color.dimmed}`}>Today's Unavailable dishes</Text>
            </div>
            <Badge
              leftSection={<IconArrowUp />}
              color={`${color.green}`}
              variant="outline"
              p={"sm"}
            >
              <Text>0.2%</Text>
            </Badge>
          </Flex>
        </Flex>
      </Paper>
    );
  };

  return { Sales, SoldPlate, NewUser, FinishedFood };
};

export default useFeedbackNodes;
