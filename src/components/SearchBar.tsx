import { useState, useRef } from 'react';
import Loading from './Loading';
import { Location } from '@/types/ValueTypes';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Input from './Input';
import Link from 'next/link';

interface Props {
  locations: Location[];
  setCity: (city: Location) => void;
  setSearch: (search: string) => void;
  search: string;
  isSearching: boolean;
}

const SearchBar: React.FC<Props> = ({
  locations,
  setCity,
  setSearch,
  search,
  isSearching,
}) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { resolvedTheme } = useTheme();
  const isData = true;

  const handleCity = (city: Location) => {
    setCity(city);
    setSearch('');
  };

  return (
    <div className='flex flex-col relative items-center justify-start gap-10'>
      {
        !isData && (
          <Image
        src={resolvedTheme === 'dark' ? '/logo.svg' : 'logo-dark.svg'}
        width={150}
        height={150}
        alt='Logo'
        className='mb-10 sm:hidden'
      />
        )
      }
      <div>
        {!isData && (
          <>
            <div className='flex items-center mb-2'>
              <p className='dark:text-white text-gray-800 text-2xl'>
                Welcome to
              </p>
              <p className='text-blue-500 text-2xl font-bold ml-1'>
                TypeWeather
              </p>
            </div>
            <p className='dark:text-gray-400 mb-5 text-gray-600'>
              Choose a location to see the weather forecast
            </p>
          </>
        )}
        <div className='relative'>
          <Input
            type={'text'}
            id={'search'}
            placeholder={'Search Location'}
            value={search}
            setValue={setSearch}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(locations.length > 0 ? true : false)}
          />

          {/* <input
            type='text'
            className='px-4 py-2 w-80 bg-gray-900 text-gray-300 placeholder-gray-500 rounded-md outline-none focus:ring focus:ring-blue-500'
            placeholder='Search location'
            value={search}
            ref={textInputRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() =>
              setIsInputFocused(locations.length > 0 ? true : false)
            }
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <div className='absolute right-5 top-5'>
            <Loading isLoading={isSearching} />
          </div>
        </div>

        {search.length > 0 && (
          <div className='w-80 absolute top-10 z-10 left-0 bg-gray-100 dark:bg-gray-800 max-h-[400px] rounded-md mt-2 overflow-y-auto'>
            {locations.length > 0 ? (
              <ul>
                {locations.map((location) => (
                  <li
                    key={`${location.name}-${location.lat}-${location.lon}`}
                    className='border-b border-gray-700 cursor-pointer'
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
