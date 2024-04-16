"use client"
import React, { useContext, useEffect, useState } from 'react';
import WeatherHome from '@/components/WeatherHome';
import { DataContext } from '@/context/DataProvider';
import { Location } from '@/types/ValueTypes';
import { notify, notifyError,notifyLoading,notifyPromise, notifySuccess } from '@/components/Toast';

export default function Home() {
  const [activeCity, setActiveCity] = useState<Location | null>(null);
  const { homeCity } = useContext(DataContext);

  useEffect(() => {
    notify('Welcome to the Weather App!');
    if (homeCity && homeCity.length > 0) {
      setActiveCity(homeCity[0]);
    } else {
      setActiveCity(null);
    }
  }, [homeCity]);

  return <WeatherHome cityLatitude={activeCity?.lat ?? 0} cityLongitude={activeCity?.lon ?? 0} homeCity={activeCity} />;
}
