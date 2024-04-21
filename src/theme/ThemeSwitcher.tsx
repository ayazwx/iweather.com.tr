'use client';
import Button from '@/components/Button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const availableThemes = ['dark', 'light', 'system'];

  useEffect(() => setMounted(true), []);

  const handleTheme = () => {
    if (theme) {
      const currentIndex = availableThemes.indexOf(theme);
      const nextIndex = (currentIndex + 1) % availableThemes.length;
      setTheme(availableThemes[nextIndex]);
    }
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <div onClick={handleTheme} className='w-min h-min invert cursor-pointer dark:invert-0'>
          <Image
            src={`/icons/theme/${!mounted ? 'system' : theme}.svg`}
            width={24}
            height={24}
            alt={`theme-icon`}
          />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
