import { getFromLocalStorage, saveToLocalStorage } from "@/utils";
import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [data, setData] = useState(() => {
    const storedData = getFromLocalStorage(key);
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    saveToLocalStorage(key, JSON.stringify(data));
  }, [key, data]);

  const toggleData = (item: any, idField: any) => {
    setData((prevData: any) => {
      const exists = prevData.some((i: any) => i[idField] === item[idField]);
      if (exists) {
        return prevData.filter((i: any) => i[idField] !== item[idField]);
      } else {
        return [...prevData, item];
      }
    });
  };

  const isDataStored = (item: any, idField: any) => {
    return data.some((i: any) => i[idField] === item[idField]);
  };

  return { data, setData, toggleData, isDataStored };
};

export default useLocalStorage;
