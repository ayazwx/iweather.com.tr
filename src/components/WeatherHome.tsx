"use client"
import Container from '@/components/Container';
import SearchBar from '@/components/SearchBar';
import { DataContext } from '@/context/DataProvider';
import { useFirebase } from '@/context/FirebaseContext';
import React, { useContext, useEffect, useState } from 'react';
import { Location } from '@/types/ValueTypes';
import { fetchSearchGeo, fetchWeather } from '@/api/FetchWeather';
import CityWeatherDisplay from './CityWeatherDisplay';
import WeatherContentList from './WeatherContentList';
import FiveDayForecast from './5DayForecast';
import Card from './Card';
import Loading from './Loading';

interface Props {
  cityLongitude: number;
  cityLatitude: number;
  homeCity?: Location | null;
}

const WeatherHome = ({
  cityLongitude,
  cityLatitude,
  homeCity,
}: Props) => {
  console.log( cityLongitude, cityLatitude);
  const [search, setSearch] = useState('');
  const { data, setData, city } = useContext(DataContext);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (cityLongitude != 0 && cityLongitude != 0) {
        try {
          console.log(cityLongitude, cityLatitude);
          const weatherData = await fetchWeather(cityLongitude, cityLatitude);
          setData(weatherData);
          console.log(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      }
    };

    fetchData();
  }, []);

  return (
    <Container flexDirect='col'>
      <SearchBar
        locations={locations}
        setCity={() => {}}
        setSearch={setSearch}
        search={search}
        isSearching={false}
      />
      {/* {
        homeCity && <CityWeather homeCity={homeCity} />
      } */}
      {
        data ? (
          <div className='relative flex justify-center items-center h-full p-2 max-h-screen'>
      <div className='flex-grow max-h-[500px] sm:max-h-full h-full flex sm:flex-col justify-center gap-2 items-center'>
        <CityWeatherDisplay data={data} city={city} />
        <div className='flex-grow flex flex-col justify-center gap-2 items-center'>
          <WeatherContentList data={data} />
          <FiveDayForecast data={data} />
        </div>
      </div>
    </div>
        ): !homeCity ? (
          <Card>
              <p>Weather is Loading</p>
              <Loading isLoading={true} />
          </Card>
        ): null
      }

       
    </Container>
  );
}

export default WeatherHome