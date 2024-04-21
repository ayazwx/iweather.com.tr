"use client"
import React, { useContext, useEffect, useState } from 'react';
import WeatherHome from '@/components/WeatherHome';
import { DataContext } from '@/context/DataProvider';
import { Location } from '@/types/ValueTypes';
import { notify } from '@/components/Toast';

export default function Home() {

  const [activeCity, setActiveCity] = useState<Location | null>(null);
  const { homeCities } = useContext(DataContext);


  useEffect(() => {
    notify('Welcome to the Weather App!');
    console.log("homeCities", homeCities);
    if (homeCities && homeCities.length > 0) {
      setActiveCity(homeCities[0]);
    } else {
      setActiveCity(null);
    }
  }, [homeCities]);

  return <WeatherHome cityLatitude={activeCity?.lat} cityLongitude={activeCity?.lon} homeCity={activeCity} />;
}
