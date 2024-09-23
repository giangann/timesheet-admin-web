import React, { useState } from 'react';

type UseStorageHook<T> = [[boolean, T | null], (value: T | null) => void];
export function useLocalStorage<T>(key: string): UseStorageHook<T> {
  const [item, setItem] = React.useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // get
  React.useEffect(() => {
    const stringfyValue = localStorage.getItem(key);

    if (stringfyValue) {
      const parsedValue: T = JSON.parse(stringfyValue);
      setItem(parsedValue);
    }

    setLoading(false);
  }, [key]);

  const setItemValue = React.useCallback(
    (value: T | null) => {
      // update state
      setItem(value);

      // stringfy before save to storage
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        const stringfyValue = JSON.stringify(value);
        localStorage.setItem(key, stringfyValue);
      }
    },
    [key]
  );

  return [[loading, item], setItemValue];
}
