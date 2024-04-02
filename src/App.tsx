import { Button, Flex, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

function App() {
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      size: "sm",
      radius: "md",
      withCloseButton: false,

      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onClose: () => {},
      onConfirm: () => {},
    });
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"} p={"md"}>
      <Button onClick={openModal}>Try me</Button>
    </Flex>
  );
}

export default App;
