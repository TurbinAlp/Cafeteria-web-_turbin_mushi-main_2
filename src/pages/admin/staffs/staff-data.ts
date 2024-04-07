import { ROLE, STATUS } from "../../../lib/enum";

export type STAFF_DATA_TYPE = {
  name: string;
  email: string;
  mobile: string;
  role: ROLE;
  status: STATUS;
  passport: string;
};

export const STAFF_DATA: STAFF_DATA_TYPE[] = [
  {
    name: "Fatuma Yusuf",
    email: "fatuma.yusuf@example.com",
    mobile: "+255 754 123 456",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
  },
  {
    name: "Rashid Salum",
    email: "rashid.salum@example.com",
    mobile: "+255 787 234 567",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
  },
  {
    name: "Aisha Said",
    email: "aisha.said@example.com",
    mobile: "+255 716 345 678",
    role: ROLE.CASHIER,
    status: STATUS.INACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
  },
  {
    name: "Hamisi Juma",
    email: "hamisi.juma@example.com",
    mobile: "+255 765 456 789",
    role: ROLE.CASHIER,
    status: STATUS.INACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
  },
  {
    name: "Zainab Ali",
    email: "zainab.ali@example.com",
    mobile: "+255 754 567 890",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
  },
  {
    name: "Ahmed Mwinyi",
    email: "ahmed.mwinyi@example.com",
    mobile: "+255 783 678 901",
    role: ROLE.CASHIER,
    status: STATUS.INACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
  },
  {
    name: "Neema Hassan",
    email: "neema.hassan@example.com",
    mobile: "+255 712 789 012",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
  },
  {
    name: "Juma Ali",
    email: "juma.ali@example.com",
    mobile: "+255 787 890 123",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
  },
  {
    name: "Mariam Juma",
    email: "mariam.juma@example.com",
    mobile: "+255 767 901 234",
    role: ROLE.CASHIER,
    status: STATUS.INACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
  },
  {
    name: "Hassan Said",
    email: "hassan.said@example.com",
    mobile: "+255 754 012 345",
    role: ROLE.CASHIER,
    status: STATUS.ACTIVE,
    passport:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
  },
];
