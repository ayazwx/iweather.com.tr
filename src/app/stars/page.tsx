'use client';
import Card from '@/components/Card';
import Container from '@/components/Container';
import { useFirebase } from '@/context/FirebaseContext';
import { Location } from '@/types/ValueTypes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [activeStar, setActiveStar] = useState<number>(0);
  const [stars, setStars] = useState<Location[]>([]);
  const { user } = useFirebase();

  useEffect(() => {
    if (user) {
      setStars(user.stars);
    }
  }, [user]);

  return (
    <Container name='stars' flexDirect='col'>
      <div className='flex flex-col gap-4'>
        {user ? (
          <>
            {stars.map((star, index) => (
              <Link
                href={`/city/${star.name}`}
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
