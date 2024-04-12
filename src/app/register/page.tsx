'use client';
import Input from '@/components/Input';
import { useFirebase } from '@/context/FirebaseContext';
import ThemeSwitcher from '@/theme/ThemeSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { registerSchema } from '@/yups/authYups';

import { useFormik } from 'formik';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Page() {
  // const {data, setData, city, setCity} = useContext(DataContext);
  // console.log(data);
  const { signInEmailPassword, createUserEmailPassword, user } = useFirebase();
  const [state, setValue, removeValue] = useLocalStorage('auth');
  console.log(state);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      const createUser = async () => {
        const response = await createUserEmailPassword(
          values.email,
          values.password
        )
        console.log('response', response);
      };
      createUser();
    },
  });

  // useEffect(() => {
  //   // signInEmailPassword("hello@gmail.com", "password");
  //   createUserEmailPassword("helloworld@gmail.com", "password").then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);

  //   })
  // }
  // , []);

  return (
    <Container>
      <Loading isLoading={true} />
      <div className='desk:max-w-[400px] shadow rounded-lg p-8 sm:px-4'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Create an account
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={formik.handleSubmit}>
          <Input
            label={'Your Email'}
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
            label={'Password'}
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
                className='font-light text-gray-500 dark:text-gray-300'
              >
                I accept the{' '}
                <a
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  href='#'
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <Button
            name={'Register'}
            type={'submit'}
            width='w-full'
            bgColor='bg-white'
            textColor='text-black'
          />
          <Button
            name={'Register with Google'}
            isBorder={false}
            width='w-full'
            bgColor='bg-blue-950'
            isIcon='/icons/google.svg'
          />

          <p className='text-sm font-light text-white dark:text-white'>
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
    </Container>
  );
}
