'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';

import { loginSchema } from '@/yups/authYups';
import Input from '@/components/Input';
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
  const { signInEmailPassword, user, signInWithGoogle } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setIsLoading(true)
      setMessage('Sign In account...')
      const createUser = async () => {
        try {
          const response = await signInEmailPassword(
            values.email,
            values.password,
          );
          handleSuccess()
        } catch (error: any) {
          setMessage(`Error Sign In account: ${error.message}`);
          notifyError('Error Sign In account!')
          console.error('Error Sign In account:', error);
        } finally {
          setIsLoading(false);
        }
      };
      createUser();
    },
  });
  
  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((user) => {
        // console.log('auth', user);
      })
      .catch((error) => {
        setMessage(`Error signing in with Google:, ${error}`)
        notifyError('Error signing in with Google!')
        console.error('Error signing in with Google:', error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if(user) {
        
      var name = user.name ?? user.name ?? user.email ?? 'user'
      notifySuccess(`Sign In Successfully! ${name}`)
      setMessage(`Sign In Successfully! ${name}`)
      setIsLoading(false)
      }
    }
    , 1000);
  }
  , [user]);

  const handleSuccess = () => {
    notifySuccess('redirecting to home page...')
    router.push('/')
  }


  return (
    <Container>
      {
        !user ? (
          <div className='desk:max-w-[400px] shadow rounded-lg p-8 sm:px-4'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Sign in an account
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
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
            name={'Sign In'}
            type={'submit'}
            width='w-full'
            isDisabled={isLoading}
          />
          <Button
            name={'Sing In with Google'}
            isBorder={false}
            isIcon='/icons/google.svg'
            onClick={handleSignInWithGoogle}
            width='w-full'
            viewTheme={1}
            isDisabled={isLoading}
          />
          <div className='text-red-900'>
            {message ? `* ${message}` : ''}
          </div>
          </div>
          <p className='text-sm font-light text-black dark:text-white'>
            Don't have an account?{' '}
            <Link
              href='/register'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'
            >
              Register here
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
                setMessage('Logging out...')
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
