export function arrayObjectToMap<O, K extends keyof O>(arrayObjects: O[], key: K): Map<string, O>;
export function arrayObjectToMap<O, K extends keyof O, V>(arrayObjects: O[], key: K, iniValue: V): Map<string, V>;
export function arrayObjectToMap<O, K extends keyof O, V>(arrayObjects: O[], key: K, iniValue: (obj: O) => V): Map<string, V>;

export function arrayObjectToMap<O, K extends keyof O, V>(arrayObjects: O[], key: K, iniValue?: V | ((obj: O) => V)): Map<string, V | O> {
  const result = new Map<string, V | O>();

  arrayObjects.forEach((obj) => {
    const keyValue = String(obj[key]);
    const value = iniValue instanceof Function ? iniValue(obj) : iniValue ?? obj;
    result.set(keyValue, value);
  });

  return result;
}
