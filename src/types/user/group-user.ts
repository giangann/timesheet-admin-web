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

export type TGroupUserUpdate = Partial<
  TGroupUser & { role: string; roleId: number; teamName: string; teamId: string }
>;
