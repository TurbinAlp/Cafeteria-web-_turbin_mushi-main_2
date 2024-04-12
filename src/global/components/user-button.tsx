import { UnstyledButton, Avatar, Text, rem, Flex, Menu } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout2,
  IconUserCircle,
} from "@tabler/icons-react";
import useCustomNavigation from "../function/navigation";

export function UserButton() {
  const { logout } = useCustomNavigation();

  return (
    <UnstyledButton>
      <Menu position="bottom" withArrow width={200} shadow="md">
        <Menu.Target>
          <Flex
            direction={"row"}
            justify={"center"}
            align={"center"}
            gap={"xs"}
          >
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
              radius="xl"
            />

            <Flex
              style={{ flex: 1 }}
              visibleFrom="sm"
              direction={"column"}
              align={"start"}
              justify={"center"}
            >
              <Text size="sm" fw={500}>
                Bill Headbanger
              </Text>

              <Text c="dimmed" size="xs">
                headbanger@outlook.com
              </Text>
            </Flex>
            <IconChevronDown
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Flex>
        </Menu.Target>

        <Menu.Dropdown>
          

          <Menu.Item
            leftSection={
              <IconUserCircle style={{ width: rem(14), height: rem(14) }} />
            }
          >
            <Text>Profile</Text>
          </Menu.Item>

          <Menu.Item
            leftSection={
              <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={logout}
          >
            <Text>Logout</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </UnstyledButton>
  );
}
