export type TCredentials = {
  identifyCard: string;
  password: string;
};

export type TUserInfo = {
  address: string;
  email: string;
  identifyCard: string;
  name: string;
  phone: string;
  roleCode: string;
  roleName: string;
  team: {
    id: number;
    name: string;
    code: string | null;
    hotline: string | null;
  };
};
