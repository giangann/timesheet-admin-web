import { Dayjs } from "dayjs";

export type TBaseSalary = {
  id: number;
  effectiveDate: string;
  value: number;
};
export type TBaseSalaryDetail = {
  id: number;
  effectiveDate: string;
  value: number;
};

export type TBaseSalaryCreateFormFields = {
  effectiveDate: string | undefined;
  value: number | undefined;
};
export type TBaseSalaryCreate = {
  effectiveDate: string;
  value: number;
};

export type TBaseSalaryUpdate = {
  effectiveDate?: string;
  value?: number;
};
export type TBaseSalaryUpdateFormFields = {
  effectiveDate: Dayjs | undefined;
  value: number | undefined;
};


