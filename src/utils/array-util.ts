import { TOption, UnknownObj } from 'src/types/common';

export function dataToOptions<T extends UnknownObj>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
): TOption[] {
  return data.map((el) => ({
    text: String(el[labelKey]),
    value: String(el[valueKey]),
  }));
}
