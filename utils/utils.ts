export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting localStorage key:", key, error);
  }
};

export const getLocalStorage = <T>(key: string): T | null | string => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error getting localStorage key:", key, error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage key:", key, error);
  }
};
