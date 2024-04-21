'use client';
import React from 'react';
import Image from 'next/image';

import { useFirebase } from '@/context/FirebaseContext';

const User = () => {
    const {user} = useFirebase()
    
  return (
    <Image
      src={user?.userPhoto || '/icons/user.svg'}
      width={50}
      height={50}
      alt='user'
      className={`rounded-full w-16 h-16 ${!user?.userPhoto ? 'invert': ''} dark:invert-0`}
    />
  );
};

export default User;
