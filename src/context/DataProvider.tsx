import React, { createContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Location } from "@/types/ValueTypes";
import { WeatherResponseData } from "@/types/WeatherResponseType";

export const DataContext = createContext<{
  data: WeatherResponseData | null;
  setData: (data: WeatherResponseData | null) => void;
  city: Location | null;
  setCity: (city: Location | null) => void;
  homeCities: Location[] | null;
  setHomeCities: (city: Location[] | null) => void;
  addHomeCity: (city: Location) => void;
  removeHomeCity: (city: Location) => void;
}>({
  data: null,
  setData: () => {},
  city: null,
  setCity: () => {},
  homeCities: null,
  setHomeCities: () => {},
  addHomeCity: () => {},
  removeHomeCity: () => {},
});

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<WeatherResponseData | null>(null);
  const [homeCities, setHomeCities] = useLocalStorage("homeCities");
  const [city, setCity] = useState<Location | null>(null);

  const addHomeCity = (city: Location) => {
    if (homeCities) {
      if (!homeCities.find((home: Location) => home.id === city.id)) {
        setHomeCities([...homeCities, city]);
      }
    } else {
      setHomeCities([city]);
    }
  }
  const removeHomeCity = (city: Location) => {
    if (homeCities) {
      // console.log(homeCities.filter((home: Location) => home.name !== city.name && home.country !== city.country));
      setHomeCities(homeCities.filter((home: Location) => home.name !== city.name && home.country !== city.country));
    }
  }



  const value = {
    data,
    setData,
    city,
    setCity,
    homeCities,
    setHomeCities,
    addHomeCity,
    removeHomeCity,    
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
