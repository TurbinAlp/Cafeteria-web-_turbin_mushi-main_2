import {
  IconChefHat,
  IconCoin,
  IconCreditCard,
  IconGiftCard,
  IconMessages,
  IconReport,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";
import { ReactNode } from "react";

export type QuickAccessType = {
  label: string;
  icon: ReactNode;
};

export const QUICK_ACTION: QuickAccessType[] = [
  {
    label: "Menu",
    icon: <IconChefHat style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
  {
    label: "Cards",
    icon: (
      <IconCreditCard style={{ width: "70%", height: "70%" }} stroke={1.5} />
    ),
  },
  {
    label: "Staffs",
    icon: (
      <IconUserCircle style={{ width: "70%", height: "70%" }} stroke={1.5} />
    ),
  },
  {
    label: "Coupon",
    icon: <IconGiftCard style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
  {
    label: "Reports",
    icon: <IconReport style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
  {
    label: "Customer Registration",
    icon: <IconUser style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
  {
    label: "Feedback",
    icon: <IconMessages style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
  {
    label: "Container Charges",
    icon: <IconCoin style={{ width: "70%", height: "70%" }} stroke={1.5} />,
  },
];
