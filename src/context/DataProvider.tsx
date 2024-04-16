import React, { createContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Location } from "@/types/ValueTypes";
import { WeatherResponseData } from "@/types/WeatherResponseType";

export const DataContext = createContext<{
  data: WeatherResponseData | null;
  setData: (data: WeatherResponseData | null) => void;
  city: Location | null;
  setCity: (city: Location | null) => void;
  homeCity: Location[] | null;
  setHomeCity: (city: Location[] | null) => void;
  addHomeCity: (city: Location) => void;
}>({
  data: null,
  setData: () => {},
  city: null,
  setCity: () => {},
  homeCity: null,
  setHomeCity: () => {},
  addHomeCity: () => {},
});

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<WeatherResponseData | null>(null);
  const [homeCity, setHomeCity] = useLocalStorage("homeCity");
  const [city, setCity] = useState<Location | null>(null);

  const addHomeCity = (city: Location) => {
    if (homeCity) {
      if (!homeCity.find((home: Location) => home.id === city.id)) {
        setHomeCity([...homeCity, city]);
      }
    } else {
      setHomeCity([city]);
    }
  }


  const value = {
    data,
    setData,
    city,
    setCity,
    homeCity,
    setHomeCity,
    addHomeCity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
