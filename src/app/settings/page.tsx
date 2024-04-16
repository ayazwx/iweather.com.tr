'use client';
import Input from '@/components/Input';
import { useFirebase } from '@/context/FirebaseContext';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Card from '@/components/Card';
import useLocalStorage from '../../hooks/useLocalStorage';
import Modal from '@/components/Modal';
import { registerSchema } from '@/yups/authYups';

export default function Page() {
  const { signInEmailPassword, createUserEmailPassword, user } = useFirebase();
  console.log(user);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string>('User');
  const [editingProfilePhoto, setEditingProfilePhoto] = useState<
    string | null
  >();

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      password: '',
      name: user?.name || '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handeBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileDataURL = reader.result as string;
        setProfilePicture(fileDataURL);
        user?.setProfilePicture(fileDataURL);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // useEffect(() => {
  //   // signInEmailPassword("hello@gmail.com", "password");
  //   createUserEmailPassword("helloworld@gmail.com", "password").then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);

  //   })
  // }
  // , []);
  useEffect(() => {
    console.log(profilePicture);
    user.updateUserPhoto(profilePicture);
  }, [user]);

  const hadleEditProfilePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileDataURL = reader.result as string;
        console.log(fileDataURL);
        setEditingProfilePhoto(fileDataURL);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpdateProfilePhoto = () => {
    if (editingProfilePhoto) {
      console.log(editingProfilePhoto);
      // user.updateUserPhoto(hadleEditProfilePhoto)
    }
  };

  const handleDeleteAccount = () => {
    console.log('delete');
  };

  const setBackground = (img: string) => {
    let background = document.getElementById('background-image');
    if (background) {
      background.setAttribute('src', img);
    }
  };


  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const fileDataURL = reader.result as string;
  //       setProfilePicture(fileDataURL);
  //       user?.setProfilePicture(fileDataURL);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   }
  // };
  // const removeFile = () => {
  //   localStorage.removeItem('fileDataURL');
  //   setProfilePicture(null);
  // };

  return (
    <Container name='settings' claNamess='flex-wrap'>
      <Loading isLoading={false} />

      <Card name='User Settings'>
        <div className='w-full flex flex-col justify-center items-center mb-4 relative'>
          <div className='relative'>
            {
              user && (
                <div className='w-24 h-24 absolute flex justify-center items-center top-0 left-0 z-100'>
              <Modal
                btnName=''
                btnColor='bg-transparent'
                title='User Profile'
                handleSaveText='Set Profile Picture'
                btWidth='w-full'
                btHeight='h-full'
                handleSubmit={handleUpdateProfilePhoto}
              >
                <div className='flex gap-4 justify-center items-center'>
                  <Image
                    src={`${
                      editingProfilePhoto
                        ? editingProfilePhoto
                        : '/icons/user.svg'
                    }`}
                    width={50}
                    height={50}
                    alt='user'
                    className='rounded-md w-24 h-24 border border-gray-800 dark:border-gray-100 hover:opacity-85'
                  />
                  <input
                    type='file'
                    className=''
                    onChange={hadleEditProfilePhoto}
                  />
                </div>
              </Modal>
            </div>
              )
            }
            <Image
              src={'/icons/edit.svg'}
              width={50}
              height={50}
              alt='edit'
              className='w-8 h-8 dark:invert absolute right-1 bottom-4'
            />
            <Image
              src={`${profilePicture ? profilePicture : '/icons/user.svg'}`}
              width={50}
              height={50}
              alt='user'
              className='w-24 h-24 rounded-md'
            />
          </div>
          <div className='w-full flex flex-col justify-center text-gray-800 dark:text-gray-100'>
            <p className='text-center font-bold'>{user?.name}</p>
            <p className='text-center font-bold'>{user?.email}</p>
          </div>
        </div>

        {!user ? (
         <div>
          <p className='text-gray-800 dark:text-gray-100'>You Are Not Signed In.</p>
          <Link href={'/login'}>
                <Button name={'Log In'} width='w-full'/>
              </Link>
              <Link href={'/register'}>
                <Button name={'Sign Up'} width='w-full' viewTheme={1}/>
              </Link>
         </div>
        ) : (
          <form
            className='space-y-4 md:space-y-6'
            onSubmit={formik.handleSubmit}
          >
            <Input
              label={'Your Name'}
              type={'text'}
              id={'name'}
              placeholder={'name'}
              {...formik.getFieldProps('name')}
            />
            <Input
              label={'Your Email'}
              type={'email'}
              id={'email'}
              placeholder={'name@company.com'}
              value={user?.email}
              isDisabled={true}
            />
            <Input
            label={'Password'}
            type={'password'}
            id={'password'}
            placeholder={'*******'}
            isEye
            {...formik.getFieldProps('password')}
            />{formik.touched.password && formik.errors.password && (
              <div className='h-3.5 gap-1 flex w-full mb-3'>
                <div className='grow shrink basis-0 text-rose-900 text-[12px] font-normal leading-none'>
                  {formik.errors.password}
                </div>
              </div>
            )}
            <Button
              name={'Save'}
              type={'submit'}
              width='w-full'
              bgColor='bg-white'
              textColor='text-black'
            />
            <div className='flex justify-between'>
          <Button
            name={'Sign Out'}
            width='w-full'
            viewTheme={1}
            onClick={() => user.logOut()}
          />
        </div>
        <div className='flex justify-between'>
          <Modal
            btnName={'Delete Account'}
            title={''}
            isWarn
            handleSaveText="Yes, I'm sure"
            handleSubmit={handleDeleteAccount}
            btWidth='w-full'
            btnType={2}
          >
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete account?
            </h3>
          </Modal>
        </div>
          </form>
        )}
        
      </Card>
      <Card name='Change Background'>
        <div className='flex flex-col justify-center'>
          <div className='w-full min-w-60 flex gap-4 flex-wrap justify-center'>
            <Image
              src='/header.png'
              width={100}
              height={100}
              alt='background'
              className='hover:opacity-85 cursor-pointer w-60'
              onClick={() => setBackground('/header.png')}
            />
            <Image
              src={'/background.png'}
              width={100}
              height={100}
              alt='background'
              className='hover:opacity-85 cursor-pointer w-60'
              onClick={() => setBackground('/background.png')}
            />
            <Image
              src={'/weather.png'}
              width={100}
              height={100}
              alt='background'
              className='hover:opacity-85 cursor-pointer w-60'
              onClick={() => setBackground('/weather.png')}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
}
