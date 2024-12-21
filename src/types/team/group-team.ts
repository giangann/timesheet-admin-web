export type TGroupTeam = {
  id: number;
  name: string;
  code: string | null;
  hotline: string | null;
};

export type TTeamCreate = {
  name: string;
  hotline: string;
};

export type TTeamCreateFields = {
  name?: string;
  hotline?: string;
  code?: string;
};

export type TTeamUpdate = {
  name: string;
  hotline?: string;
  code?: string;
};

export type TTeamUpdateFields = {
  name?: string;
  hotline?: string;
  code?: string;
};
