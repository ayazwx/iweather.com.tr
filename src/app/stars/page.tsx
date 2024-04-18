'use client';
import Card from '@/components/Card';
import Container from '@/components/Container';
import { DataContext } from '@/context/DataProvider';
import { useFirebase } from '@/context/FirebaseContext';
import { Location } from '@/types/ValueTypes';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const Page = () => {
  const [activeStar, setActiveStar] = useState<number>(0);
  const [stars, setStars] = useState<Location[]>([]);
  const { homeCities } = useContext(DataContext);
  const { user } = useFirebase();

  useEffect(() => {
    if (user) {
      setStars(user.stars);
    }
  }, [user]);

  return (
    <Container name='stars' flexDirect='col'>
      <h1 className='text-3xl border-b-2 border-gray-800 dark:border-gray-200'>Your Home Page Cities: {homeCities?.length}</h1>
      <div className='flex flex-col gap-4'>
        {homeCities ? (
          <>
            {homeCities.map((city, index) => (
              <Link
                href={`/city/${city.name}-${city.country}`}
                key={index}
                className='flex bg-slate-700 shadow rounded-md p-8 gap-4 items-start justify-between'
              >
                <h1>{city.name}</h1>
                <h1>{city.country}</h1>
                <h1>{city.lat}</h1>
                <h1>{city.lon}</h1>
                <button onClick={
                  () => setActiveStar(index)
                }>
                  {homeCities.some((city) => city.name === city.name) ? '*' : '-'}
                </button>
              </Link>
            ))}
          </>
        ) : (
          <h1>Sign in to see your stars</h1>
        )}
      </div>
      <h1 className='text-3xl mt-20 border-b-2 border-gray-800 dark:border-gray-200'>Your Stars {user ? stars.length : ''}</h1>
      <div className='flex flex-col gap-4'>
        {user ? (
          <>
            {stars.map((star, index) => (
              <Link
                href={`/city/${star.name}-${star.country}`}
                key={index}
                className='flex bg-slate-700 shadow rounded-md p-8 gap-4 items-start justify-between'
              >
                <h1>{star.name}</h1>
                <h1>{star.country}</h1>
                <h1>{star.lat}</h1>
                <h1>{star.lon}</h1>
                <button></button>
              </Link>
            ))}
          </>
        ) : (
          <h1>Sign in to see your stars</h1>
        )}
      </div>
    </Container>
  );
};

export default Page;
