import { useState, useRef, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import Input from './Input';
import Loading from './Loading';
import { Location } from '@/types/ValueTypes';
import { useLocation } from '@/hooks/useLocation';
import { notify, notifySuccess } from './Toast';
import { fetchReverseGeocode, fetchSearchGeo } from '@/api/FetchWeather';
import { getRandomInt } from '@/constants/module';
import { DataContext } from '@/context/DataProvider';

interface Props {
  setCity: (city: Location) => void;
}

const SearchBar: React.FC<Props> = ({
  setCity,
}) => {
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  const { data } = useContext(DataContext);
  const isData = true;
  const { getLocationPermission, locationPermission, geoLocation } = useLocation();

  const handleCity = (city: Location) => {
    setCity(city);
    setSearch('');
  };

  const handleCurrentLocation = async () => {

    const getLocation = async () => {
      if(geoLocation) {
        const response = await fetchReverseGeocode(geoLocation.longitude, geoLocation.latitude)
      notifySuccess(`Found your location: ${response[0].name}, ${response[0].country}`);
      setSearch(`${response[0].name}, ${response[0].country}`);
      console.log(response);
      }
    }
    if (!locationPermission) {
      console.log('Getting current location...');
      const permission = await getLocationPermission();
      if (permission) {
        notify('Getting your location...');
        getLocation();
      } else {
        notify('Location denied');
      }
    }
    else {
      notify('Getting your location...');
      getLocation();
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      setIsSearching(true);
      try {
        const response = await fetchSearchGeo(search);
        console.log(response);
        setLocations(
          response.map((location, index) => ({
            id: getRandomInt(100000) + index,
            name: location.name,
            lat: location.lat,
            lon: location.lon,
            country: location.country,
            state: location.state,
          }))
        );
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
      setIsSearching(false)
    };

    if (search.length > 0) {
      fetchLocations();
    }
  }, [search]);




  return (
    <div className={`flex flex-col relative justify-center sm:justify-start items-center ${!data && '-mt-60'}`}>
      <div className={`flex flex-col relative items-center justify-start gap-10`}>
      {
        !data && (
          <Image
        src={resolvedTheme === 'dark' ? '/logo.svg' : 'logo-dark.svg'}
        width={150}
        height={150}
        alt='Logo'
        className='mb-5'
      />
        )
      }
      <div>
        {!data && (
          <>
            <div className='flex justify-center mb-2'>
              <p className='dark:text-white text-gray-800 text-2xl'>
                Welcome to
              </p>
              <p className='text-blue-500 text-2xl font-bold ml-1'>
                TypeWeather
              </p>
            </div>
            <p className='dark:text-gray-400 mb-5 text-gray-600 text-center'>
              Choose a location to see the weather forecast
            </p>
          </>
        )}
        <div className='relative flex gap-2'>
          <Input
            type={'text'}
            id={'search'}
            placeholder={'Search Location'}
            value={search}
            setValue={setSearch}
            handleFocus={() => setIsInputFocused(true)}
            handleBlur={() => setIsInputFocused(locations.length > 0 ? true : false)}
          />
          <div className='absolute right-[72px] top-5'>
            <Loading isLoading={isSearching} />
          </div>
          <div className='flex justify-center items-center bg-gray-100 px-3 rounded-full cursor-pointer dark:bg-gray-900 hover:opacity-85'
          onClick={handleCurrentLocation}
          >
          <Image src={'/icons/crosshair.svg'} width={20} height={20} alt='search' className='dark:invert' />
          </div>
        </div>

        
      </div>
    </div>
    <div className='relative w-full'>
    {search.length > 0 && (
          <div className={`
          min-w-[280px] w-full max-w-[320px] sm:min-w-[180px] absolute top-2 left-0 z-50 bg-gray-100 dark:bg-gray-800 h-min sm:max-h-[400px] rounded-md overflow-y-auto shadow-lg
          `}>
            {locations.length > 0 ? (
              <ul>
                {locations.map((location) => (
                  <li
                    key={`${location.name}-${location.lat}-${location.lon}`}
                    className='border-b border-gray-700 cursor-pointer py-4 px-2'
                    onClick={() => handleCity(location)}
                  >
                    <Link href={`/city/${location.name}-${location.country}`} className='dark:text-white text-gray-800 px-4 py-3'>
                      {location.name} {location.state && `, ${location.state},`}{' '}
                      {location.country}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-white px-4 py-3'>
                No locations found. Please try another city.
              </p>
            )}
          </div>
        )}
    </div>
    </div>
  );
};

export default SearchBar;
