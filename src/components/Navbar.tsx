'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from './Button';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import User from './User';
import { useFirebase } from '@/context/FirebaseContext';
import { useTheme } from 'next-themes';

const navItems = [
  {
    name: 'Home',
    icon: '/icons/apps-icon.svg',
    path: '/',
  },
  {
    name: 'Stars',
    icon: '/icons/star.svg',
    path: '/stars',
  },
  {
    name: 'Calendar',
    icon: '/icons/calendar.svg',
    path: '/calendar',
  },
  {
    name: 'Settings',
    icon: '/icons/settings.svg',
    path: '/settings',
  },
];

const Navbar = () => {
  const isLoggedIn = false;
  const [active, setActive] = useState<string>();
  const [showSignOut, setShowSignOut] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const {user} = useFirebase()

  const logout = () => {
    user?.logOut()
    console.log('logout')
    router.push('/')
  };

  const openMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  useEffect(() => {
    if (!active) {
      setActive(pathname);
    }
  }, [pathname, active]);
  return (
    <nav className='sm:w-full desk:h-full sm:mb-4 z-20'>
      <div className='sm:flex justify-between items-center px-4 hidden w-full mt-2'>
        <Link href={'/'} className=''>
          <Image
            src={resolvedTheme === 'dark' ? '/logo.svg' : '/logo-dark.svg'}
            width={150}
            height={150}
            alt='logo'
            className=''
          />
        </Link>
        <Image
          src='/icons/menu.svg'
          width={60}
          height={60}
          alt='menu'
          className='cursor-pointer invert dark:invert-0'
          onClick={() => openMobileMenu()}
        />
      </div>
      <div
        className={`
      flex ${
        isOpenMobileMenu ? 'sm:right-1' : 'sm:-right-96'
      } navbar sm:fixed sm:top-0 transition-all  flex-col w-24 h-full pb-4 mx-4 justify-between rounded-xl overflow-hidden text-white sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-003
      `}
      >
        <div className='w-full items-center'>
          <Link
            href={'/'}
            className='flex flex-col sm:hidden justify-center items-center py-6 border-b-2 w-full'
          >
            <Image
              src='/logo-icon.svg'
              width={30}
              height={30}
              alt='logo'
              className='mb-2'
            />
            <h1 className='text-md text-gray-800 font-bold dark:text-gray-100'>
              iWeather
            </h1>
          </Link>
          <button className='hidden sm:flex border-0 justify-center items-center py-6 border-b-2 w-full'>
            <Image
              src='/icons/close.svg'
              width={30}
              height={30}
              alt='close'
              className='flex justify-center dark:invert items-center w-full h-14 cursor-pointer relative'
              onClick={() => openMobileMenu()}
            />
          </button>
          {navItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={`w-full my-4 h-14 flex items-center justify-center cursor-pointer relative`}
              onClick={() => setActive(item.path)}
            >
              <div
                className={`${
                  active === item.path && 'bg-white'
                } w-full h-full absolute top-0 left-0 hover:bg-white opacity-10 z-10`}
              ></div>
              <div
                className={`${
                  active === item.path ? 'h-full bg-white' : ''
                } w-1 rounded-md absolute top-0 desk:left-0 sm:right-0`}
              ></div>
              <Image
                src={item.icon}
                width={30}
                height={30}
                alt={item.name}
                className='invert dark:invert-0'
              />
            </Link>
          ))}
          {<ThemeSwitcher />}
        </div>
        <div className='w-full flex flex-col justify-center items-center mb-1'>
          <Link href={'/settings'} onClick={() => setActive('/settings')}>
            <User />
          </Link>
          {!user ? (
            <>
              <Link href={'/login'} onClick={() => setActive('/login')}>
                <Button name={'Log In'}/>
              </Link>
              <Link href={'/register'} onClick={() => setActive('/register')}>
                <Button name={'Sign Up'} bgColor='bg-gray-100' textColor='text-gray-800' viewTheme={1}/>
              </Link>
            </>
          ) : (
            <Button name={'Log Out'} onClick={logout} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
