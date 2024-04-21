import { FC, useContext, useEffect, useState } from 'react';
import { getRandomInt, weatherIcons, weatherImages } from '@/constants/module';
import { getDate } from '@/constants/module';
import { WeatherResponseData } from '@/types/WeatherResponseType';
import Image from 'next/image';
import { DataContext } from '@/context/DataProvider';
import { useFirebase } from '@/context/FirebaseContext';
import { useTheme } from 'next-themes';
import { notify } from './Toast';
import { Location } from '@/types/ValueTypes';

interface CityWeatherDisplayProps {
  data: WeatherResponseData;
  city?: {
    name: string;
  } | null;
}

const CityWeatherDisplay: FC<CityWeatherDisplayProps> = ({ data, city }) => {
  const { homeCities, removeHomeCity, setHomeCities, addHomeCity } = useContext(DataContext);
  const [activeCity, setActiveCity] = useState<Location | null>(null);
  const [isHomeCity, setIsHomeCity] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const { resolvedTheme } = useTheme();
  const { user } = useFirebase();
  const dateUnix = data.dt;


  useEffect(() => {
    if (homeCities) {
      setIsHomeCity(homeCities.some((city) => city.name === data.name));
    }
  }
    , [homeCities]);

    useEffect(() => {
        if(user) {
            setIsStarred(user?.stars.some(
                (star) => star.name === data.name || star.name === city?.name
              ));
        }
        if(!user) {
            setIsStarred(false);
        }
    }
    , [user]);

  useEffect(() => {
    if (data) {
      setActiveCity({
        id: getRandomInt(100000),
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
    }
    
  }, [data]);

  const handleHomeCity = () => {
    if (isHomeCity) {
      removeHomeCity(activeCity!);
    } else {
      addHomeCity(activeCity!);
    }
  };
  const handleStarCity = () => {
    if (isStarred) {
      user?.removeStar(activeCity!);
    } else {
      if (user) {
        user.addStar(activeCity!);
      } else {
        notify('Please sign in to star a city');
      }
    }
  };

  return (
    <div className='relative bg-gray-900 p-4 sm:max-h-[300px] sm:w-full h-full min-w-[250px] rounded-xl overflow-hidden'>
      <div className='absolute top-2 right-4 flex z-10 gap-2'>
        <Image
          src={
            isHomeCity
              ? '/icons/home-red.svg'
              : resolvedTheme === 'dark'
              ? '/icons/home-white.svg'
              : '/icons/home.svg'
          }
          alt='home'
          width='50'
          height='50'
          onClick={handleHomeCity}
          className='w-8 h-8 cursor-pointer'
        />
        <Image
          src={`/icons/${isStarred ? 'heart-red.svg' : 'heart.svg'}`}
          alt=''
          width={20}
          height={20}
          className='w-8 h-8 cursor-pointer'
          onClick={handleStarCity}
        />
      </div>
      <Image
        width={100}
        height={100}
        src={weatherImages[data.weather[0].icon]}
        alt='Weather'
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='relative flex flex-col justify-between h-full p-8 pb-0 pr-0'>
        <div>
          <p className='text-white text-3xl'>
            {city?.name ?? data.name}, {data.sys.country}
          </p>
          <p className='text-white text-lg'>
            {getDate(dateUnix, data.timezone)}
          </p>
        </div>
        <div className='flex items-center justify-between w-ful'>
          <div className='flex flex-col'>
            <p className='text-4xl text-white font-bold'>
              {parseInt(data.main.temp.toString())}°c
            </p>
            <p className='text-lg text-white'>
              {parseInt(data.main.temp_max.toString())}°c /{' '}
              {parseInt(data.main.temp_min.toString())}°c
            </p>
            <p className='text-lg text-white'>{data.weather[0].description}</p>
          </div>
          <Image
            width={50}
            height={50}
            src={weatherIcons[data.weather[0].icon]}
            alt='Weather Icon'
            className='w-36 h-36'
          />
        </div>
      </div>
    </div>
  );
};

export default CityWeatherDisplay;
