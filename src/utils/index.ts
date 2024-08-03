export const OMDbAPI = "https://www.omdbapi.com/";
export const API_KEY = "e0b94510";

//SET To LocalStorage
export const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};
// GET From LocalStorage
export const getFromLocalStorage = (key: string): any | null => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key)
      ? localStorage.getItem(key)
      : null
    : null;
};
//  Remove from LocalStorage
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
