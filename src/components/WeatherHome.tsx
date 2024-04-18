'use client';
import React, { useContext, useEffect } from 'react';


import Container from '@/components/Container';
import SearchBar from '@/components/SearchBar';
import { DataContext } from '@/context/DataProvider';
import { Location } from '@/types/ValueTypes';
import { fetchWeather } from '@/api/FetchWeather';
import CityWeatherDisplay from './CityWeatherDisplay';
import WeatherContentList from './WeatherContentList';
import FiveDayForecast from './5DayForecast';
import Card from './Card';
import Loading from './Loading';

interface Props {
  cityLongitude?: number;
  cityLatitude?: number;
  homeCity?: Location | null;
}

const WeatherHome = ({ cityLongitude, cityLatitude, homeCity }: Props) => {
  const { data, setData, city, setCity } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      if (homeCity) {
        try {
          console.log(homeCity.lon, homeCity.lat);
          const weatherData = await fetchWeather(homeCity.lon, homeCity.lat);
          setData(weatherData);
          console.log(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      } else {
        try {
          if (cityLatitude && cityLongitude) {
            console.log(cityLongitude, cityLatitude);
            const weatherData = await fetchWeather(cityLongitude, cityLatitude);
            setData(weatherData);
            console.log(data);
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchData();
  }, [homeCity]);

  return (
    <Container flexDirect='col'>
      <SearchBar setCity={setCity} />
      {/* {
        homeCities && <CityWeather homeCities={homeCities} />
      } */}
      {data ? (
        <div className='relative flex justify-center items-center h-full p-2 max-h-screen'>
          <div className='flex-grow max-h-[500px] sm:max-h-full h-full flex sm:flex-col justify-center gap-2 items-center'>
            <CityWeatherDisplay data={data} city={city} />
            <div className='flex-grow flex flex-col justify-center gap-2 items-center'>
              <WeatherContentList data={data} />
              <FiveDayForecast data={data} />
            </div>
          </div>
        </div>
      ) : homeCity ? (
        <Card>
          <p>Weather is Loading</p>
          <Loading isLoading={true} />
        </Card>
      ) : null}
    </Container>
  );
};

export default WeatherHome;
