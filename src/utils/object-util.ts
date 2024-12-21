export function pickProperties<T extends Record<string, any>>(
  object: T,
  selectedKeys: (keyof T)[]
): Partial<T> {
  const filteredObject: Partial<T> = {};
  for (const key in object) {
    if (selectedKeys.includes(key)) {
      filteredObject[key] = object[key];
    }
  }
  return filteredObject;
}

export function hasNullishValue(obj: Record<string, any>): boolean {
  return Object.values(obj).some((value) => value === null || value === undefined);
}

export function hasEmptyString(obj: Record<string, any>): boolean {
  return Object.values(obj).some((value) => value === '');
}

export function hasNullishOrEmptyString(obj: Record<string, any>): boolean {
  return hasNullishValue(obj) || hasEmptyString(obj)
}