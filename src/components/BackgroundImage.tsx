'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

const BackgroundImage = () => {
    const urls = ['/header.png', '/background.png', '/weather.png']
    const [background, setBackground] = useState(urls[0]);
    const { theme, resolvedTheme } = useTheme();

  const imageRef = useRef<HTMLImageElement>(null);
  const [currHeight, setCurrHeight] = useState<number>(0);
  const [naturalHeight, setNaturalHeight] = useState<number>(0);
  const [naturalWidth, setNaturalWidth] = useState<number>(0);

  useEffect(() => {
    if (imageRef.current) {
      setNaturalHeight(imageRef.current.naturalHeight);
      setNaturalWidth(imageRef.current.naturalWidth);
      setCurrHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    setBackground(resolvedTheme === 'dark' ? urls[0] : urls[2]);
  }
    , [theme, resolvedTheme]);

  return (
    <img
    id='background-image'
      ref={imageRef}
      src={background}
      style={{
        maxWidth: `calc(200vw + ${
          (currHeight * naturalWidth) / naturalHeight
        }px`,
      }}
      alt='background'
      className={`desk:w-full sm:w-[${
        (currHeight * naturalWidth) / naturalHeight
      }] fixed sm:-left-1/4 top-0 desk:left-0 bg-cover bg-center bg-no-repeat min-w-screen h-screen -z-50 select-none`}
    />
  );
};

export default BackgroundImage;
