import React from 'react';

interface Props {
  children: React.ReactNode;
  name?: string;
  width?: string;
  height?: string;
}

const Card = ({
  children,
  width = 'w-full',
  height = 'h-full',
  name,
}: Props) => {
  return (
    <div className='desk:max-w-[400px] w-full shadow rounded-lg p-8 sm:px-4'>
      {name && (
        <h1 className='absolute top-2 left-4 uppercase text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          {name}
        </h1>
      )}
      {children}
    </div>
  );
};

export default Card;
