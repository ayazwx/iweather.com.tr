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

export default function Page() {
  const { signInEmailPassword, createUserEmailPassword, user } = useFirebase();
  console.log(user);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string>('User');
  const [isEditing, setIsEditing] = useState(false);
  const [state, setValue, removeValue] = useLocalStorage('profilePicture');

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      password: '',
    },
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
        setValue(fileDataURL);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  // useEffect(() => {
  //   // signInEmailPassword("hello@gmail.com", "password");
  //   createUserEmailPassword("helloworld@gmail.com", "password").then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);

  //   })
  // }
  // , []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileDataURL = reader.result as string;
        setProfilePicture(fileDataURL);
        setValue(fileDataURL);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const removeFile = () => {
    localStorage.removeItem('fileDataURL');
    setProfilePicture(null);
  };

  return (
    <Container name='settings' claNamess='flex-wrap'>
      <Loading isLoading={false} />
      <Card>
        <div className='w-full flex flex-col justify-center items-center mb-4'>
          <Image
            src={`${profilePicture ? profilePicture : '/icons/user.svg'}`}
            width={50}
            height={50}
            alt='user'
            className='rounded-full w-24 h-24 cursor-pointer border border-gray-800 dark:border-gray-100 hover:opacity-85'
          />
          <div className='w-full flex flex-col justify-center text-gray-800 dark:text-gray-100'>
            <p className='text-center'>{name}</p>
            <p className='text-center'>{user?.email}</p>
          </div>
        </div>

        {isEditing ? (
          <Button
            name={'Edit Profile'}
            width='w-full'
            bgColor='bg-white'
            textColor='text-black'
            onClick={() => setIsEditing(true)}
          />
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
              value={name}
              setValue={setName}
              isDisabled={true}
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
              label={'Change Password'}
              type={'password'}
              id={'password'}
              placeholder={'*******'}
              {...formik.getFieldProps('password')}
            />
            <div>
              <input type='file' onChange={handleFileChange} />
            </div>
            <Button
              name={'Save'}
              type={'submit'}
              width='w-full'
              bgColor='bg-white'
              textColor='text-black'
            />
          </form>

        )}
        <ThemeSwitcher />
        <div className='flex justify-between'>
          <Button
            name={'Sign Out'}
            width='w-full'
            bgColor='bg-white'
            textColor='text-black'
          />
        </div>
        <div className='flex justify-between'>
          <Button
            name={'Delete Account'}
            width='w-full'
            bgColor='bg-red-500'
            textColor='text-white'
          />
        </div>
      </Card>
      <Card>
        <div className='flex flex-col justify-center'>
          <h1 className='uppercase'>Change Background</h1>
          <div className='w-full min-w-60 flex gap-4 flex-wrap justify-center'>
          <Image src='/header.png' width={100} height={100} alt='background' className='hover:opacity-85 cursor-pointer w-60' />
          <Image src={'/background.png'} width={100} height={100} alt='background' className='hover:opacity-85 cursor-pointer w-60' />
          <Image src={'/weather.png'} width={100} height={100} alt='background' className='hover:opacity-85 cursor-pointer w-60' />
          </div>
        </div>
      </Card>
    </Container>
  );
}
