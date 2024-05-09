import React from "react";
import {
  Button,
  Center,
  Group,
  Select,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput, DateValue } from "@mantine/dates";

type CustomizeReportProps = {
  close: () => void;
};

const CustomizeReport: React.FC<CustomizeReportProps> = ({ close }) => {
  const [timeRange, setTimeRange] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [value, setValue] = React.useState<string | null>("");

  const dateForm = useForm<{ initialDate: Date | null; endDate: Date | null }>({
    initialValues: {
      initialDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleCheckboxChange = (value: string) => {
    // Set the selected value
    setTimeRange(value);
  };

  return (
    <div>
      <Text>Report Time Range</Text>

      <Group>
        <div>
          <label>
            <input
              type="checkbox"
              checked={timeRange === "daily"}
              onChange={() => handleCheckboxChange("daily")}
            />
            Daily
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={timeRange === "weekly"}
              onChange={() => handleCheckboxChange("weekly")}
            />
            Weekly
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={timeRange === "monthly"}
              onChange={() => handleCheckboxChange("monthly")}
            />
            Monthly
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={timeRange === "yearly"}
              onChange={() => handleCheckboxChange("yearly")}
            />
            Yearly
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={timeRange === "custom"}
              onChange={() => handleCheckboxChange("custom")}
            />
            Custom
          </label>
        </div>
      </Group>

      <Space h={"md"} />

      <SimpleGrid cols={2}>
        <DateInput
          maw={150}
          variant="default"
          label="Start Date"
          value={dateForm.values.initialDate}
          onChange={(value: DateValue) =>
            dateForm.setFieldValue("initialDate", value)
          }
        />

        <DateInput
          maw={150}
          variant="default"
          label="End Date"
          value={dateForm.values.endDate}
          onChange={(value: DateValue) =>
            dateForm.setFieldValue("endDate", value)
          }
        />
      </SimpleGrid>

      <Space h={"md"} />

      <Group justify="space-between">
        <div>
          <Text>Cafeteria Category</Text>

          <Group>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={category === "all"}
                  onChange={() => setCategory("all")}
                />
                All
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={category === "VIP"}
                  onChange={() => setCategory("VIP")}
                />
                VIP
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={category === "regular"}
                  onChange={() => setCategory("regular")}
                />
                Regular
              </label>
            </div>
          </Group>
        </div>

        <Select
          label="Food Category"
          value={value}
          placeholder="Pick value"
          data={["All", "VIP", "Regular"]}
          onChange={setValue}
        />
      </Group>

      <Space h={"md"} />

      <Center>
        <Button w={200} onClick={close}>
          OK
        </Button>
      </Center>
    </div>
  );
};

export default CustomizeReport;
