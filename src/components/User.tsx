'use client';
import { useFirebase } from '@/context/FirebaseContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const User = () => {
    const {user} = useFirebase()
    
  return (
    <Image
      src={user?.profilePicture || '/icons/user.svg'}
      width={50}
      height={50}
      alt='user'
      className={`rounded-full w-16 h-16 ${!user?.profilePicture && 'invert'} dark:invert-0`}
    />
  );
};

export default User;
