'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import Input from '@/components/Input';
import { registerSchema } from '@/yups/authYups';
import { useFirebase } from '@/context/FirebaseContext';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import useLocalStorage from '@/hooks/useLocalStorage';
import Card from '@/components/Card';
import User from '@/components/User';
import { notifyError, notifySuccess } from '@/components/Toast';

export default function Page() {
  const router = useRouter();
  const { createUserEmailPassword, user, signInWithGoogle } = useFirebase();
  const [state, setValue] = useLocalStorage('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      setMessage('Creating User...')
      const createUser = async () => {
        try {
          const response = await createUserEmailPassword(
            values.email,
            values.password,
            values.name ?? 'User'
          );
          handleSuccess(response);
        } catch (error: any) {
          setMessage(`Error creating user: ${error.message}`);
          notifyError('Error creating user!')
          console.error('Error creating user:', error);
        } finally {
          setIsLoading(false);
        }
      };
      createUser();
    },
  });
  
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((userCredential) => {
        handleSuccess(userCredential)
      })
      .catch((error) => {
        setMessage(`Error signing in with Google:, ${error}`)
        notifyError('Error signing in with Google!')
        console.error('Error signing in with Google:', error);
      });
  };

  const handleSuccess = (auth: any) => {
    notifySuccess(`User Created Successfully! ${auth.name}`)
    setValue(auth)
    setMessage(`User Created Successfully! ${auth.name}`)
    setIsLoading(false)
    notifySuccess('redirecting to home page...')
    router.push('/')
  }

  return (
    <Container>
      {
        !user ? (
          <div className='desk:max-w-[400px] shadow rounded-lg p-8 sm:px-4'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Create an account
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
        <Input
            label={'Your Name'}
            type={'name'}
            id={'name'}
            placeholder={'name'}
            {...formik.getFieldProps('name')}
          />
          <Input
            label={'Your Email*'}
            type={'email'}
            id={'email'}
            placeholder={'name@company.com'}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='h-3.5 gap-1 flex w-full mb-3'>
              <div className='grow shrink basis-0 text-rose-900 text-[12px] font-normal leading-none'>
                {formik.errors.email}
              </div>
            </div>
          )}
          <Input
            label={'Password*'}
            type={'password'}
            id={'password'}
            placeholder={'*******'}
            isEye
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='h-3.5 gap-1 flex w-full mb-3'>
              <div className='grow shrink basis-0 text-rose-900 text-[12px] font-normal leading-none'>
                {formik.errors.password}
              </div>
            </div>
          )}

          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                aria-describedby='terms'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='terms'
                className='font-light text-gray-800 dark:text-gray-300'
              >
                I accept the{' '}
                <a
                  className='font-medium text-gray-800 hover:underline dark:text-gray-100'
                  href='#'
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className='relative flex flex-col gap-2'>
            {
              isLoading && (
                <div className='absolute top-0 rounded-xl left-0 w-full h-full bg-gray-100 dark:bg-gray-800 bg-opacity-20 flex justify-center items-center'>
                  <Loading isLoading={true} />
                </div>
              )
            }
          <Button
            name={'Register'}
            type={'submit'}
            width='w-full'
            isDisabled={isLoading}
          />
          <Button
            name={'Register with Google'}
            isBorder={false}
            isIcon='/icons/google.svg'
            onClick={handleSignInWithGoogle}
            width='w-full'
            viewTheme={1}
            isDisabled={isLoading}
          />
          <div className='text-red-900'>
            *{message}
          </div>
          </div>
          <p className='text-sm font-light text-black dark:text-white'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
        ): <Card>
          <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Already Logged In
          </h1>
          <div className='flex flex-col items-center space-x-2'>
            <User />
            <p className='text-gray-900 dark:text-white'>{user.name}</p>
            <p className='text-gray-900 dark:text-white'>{user.email}</p>
            <Button
              name={'Logout'}
              onClick={() => {
                user.logOut();
                router.refresh();
              }}
              width='w-full'
              viewTheme={2}
            />
          </div>
        </Card>
      }
    </Container>
  );
}
