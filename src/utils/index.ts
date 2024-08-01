export const OMDbAPI = "https://www.omdbapi.com/";
export const API_KEY = "121ed492";

//SET To LocalStorage
export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};
// GET From LocalStorage
export const getFromLocalStorage = (key: any) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key)
      ? localStorage.getItem(key)
      : null
    : null;
};
//  Remove from LocalStorage
export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
