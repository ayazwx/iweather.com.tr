"use client"
import { Location } from "@/types/ValueTypes";
import { WeatherResponseData } from "@/types/WeatherResponseType";
import React, { useState } from "react";

export const DataContext = React.createContext({
  data: undefined as WeatherResponseData | undefined,
  setData: (data: WeatherResponseData) => {},
  city: undefined as Location | undefined,
  setCity: (city: Location) => {},
});

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<WeatherResponseData>({ "base": "stations", "clouds": { "all": 100 }, "cod": 200, "coord": { "lat": 40.7127, "lon": -74.006 }, "dt": 1711236508, "id": 5128581, "main": { "feels_like": 0.05, "humidity": 86, "pressure": 1006, "temp": 5.5, "temp_max": 7.09, "temp_min": 3.48, "sea_level": 0, "grnd_level" : 0 }, "name": "New York", "sys": { "country": "US", "id": 2008101, "sunrise": 1711191216, "sunset": 1711235470, "type": 2 }, "timezone": -14400, "visibility": 10000, "weather": [{ "description": "overcast clouds", "icon": "04n", "id": 804, "main": "Clouds" }], "wind": { "deg": 340, "gust": 15.43, "speed": 10.8 } });
  const [city, setCity] = useState<Location>();

  const value = {
    data,
    setData,
    city,
    setCity,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
