import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  Flex,
  Menu,
} from "@mantine/core";
import { IconChevronDown, IconLogout2 } from "@tabler/icons-react";
import UseCustomNavigation from "../function/navigation";

export function UserButton() {
  const { logout } = UseCustomNavigation();

  return (
    <UnstyledButton>
      <Group wrap="wrap" align="center">
        <Menu position="bottom" withArrow>
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
                <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
