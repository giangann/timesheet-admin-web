export type TGroupUser = {
  id: number;
  name: string;
  email: string | null;
  address: string | null;
  phone: string | null;
  identifyCard: string;
  roleName: string;
  roleCode: string;
  team: {
    id: number;
    name: string;
    code: string | null;
    hotline: string | null;
  };
};

export type TGroupUserUpdateFormFields = {
  name: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  team: number | undefined;
  role: number | undefined;
  identifyCard: string | undefined;
  password: string | undefined;
};

export type TGroupUserUpdate = Partial<TGroupUserUpdateFormFields>;
