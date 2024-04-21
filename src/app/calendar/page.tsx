'use client';
import React, { useEffect, useState } from 'react';

import Container from '@/components/Container';
import { weekDayNames, monthNames } from '@/constants/module';

const Page = () => {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);

  const isToday = (date: number): boolean => {
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };
  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let dayOfWeek = new Date(year, month).getDay();
    let blankDaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankDaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };
  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <Container>
      <div className='w-full h-full bg-white dark:bg-transparent rounded-md overflow-hidden'>
        <header className='flex justify-between items-center p-4 border-b-2 text-gray-800 w-full'>
          <span
            className='text-lg font-semibold text-gray-800 dark:text-gray-100 cursor-pointer'
            onClick={() => {
              setMonth(today.getMonth());
              setYear(today.getFullYear());
            }}
          >
            {today.getDate()} {monthNames[today.getMonth()]}{' '}
            {today.getFullYear()}, {weekDayNames[today.getDay()]}
          </span>

          <button className='text-blue-500 bg-blue-200 px-4 py-2 font-bold rounded'>
            Month
          </button>

          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> getNoOfDays()}>+ Create Event</button> */}
        </header>

        <div className='flex w-full h-full sm:flex-col md:flex-col'>
          <div className='h-full p-4 border-r-2 sm:border-0 md:border-0'>
            <div className='p-4 rounded-t'>
              <div className='px-4 flex items-center justify-between'>
                <span className='focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800'>
                  {monthNames[month]} {year}
                </span>
                <div className='flex items-center'>
                  <button
                    className='focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100'
                    onClick={() => prevMonth()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-chevron-left'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      fill='none'
                      stroke-linecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                      <polyline points='15 6 9 12 15 18'></polyline>
                    </svg>
                  </button>
                  <button
                    className='focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100'
                    onClick={() => nextMonth()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler  icon-tabler-chevron-right'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      fill='none'
                      stroke-linecap='round'
                      strokeLinejoin='round'
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                      <polyline points='9 6 15 12 9 18'></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-between pt-4 sm:pt-2 overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr>
                      {weekDayNames.map((day) => (
                        <th key={day}>
                          <div className='w-full flex justify-center'>
                            <p className='text-base font-medium text-center text-gray-800 dark:text-gray-100'>
                              {day.slice(0, 2)}
                            </p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(
                      {
                        length: Math.ceil(
                          (blankDays.length + noOfDays.length) / 7
                        ),
                      },
                      (_, index) => index
                    ).map((weekIndex) => (
                      <tr>
                        {weekIndex === 0 &&
                          blankDays.map((_, i) => (
                            <td className='pt-2' key={`blank-${i}`}>
                              <div className='px-2 py-2 cursor-pointer flex w-full justify-center'></div>
                            </td>
                          ))}
                        {noOfDays
                          .slice(
                            weekIndex * 7 -
                              blankDays.length * (weekIndex > 0 ? 1 : 0),
                            weekIndex * 7 - blankDays.length + 7
                          )
                          .map((day, i) => (
                            <td className='pt-6 md:pt-2' key={`day-${i}`}>
                              <div className='px-2 py-2 cursor-pointer flex w-full justify-center'>
                                <p
                                  className={`${
                                    isToday(day)
                                      ? 'hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full'
                                      : 'text-gray-500'
                                  } text-base dark:text-gray-100 font-medium`}
                                >
                                  {day}
                                </p>
                              </div>
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='p-4 border-t-2'>
              <h1 className='font-bold text-gray-800 dark:text-gray-100'>
                Events
              </h1>
              <ul className='mt-2'>
                <li className='flex gap-2 items-center'>
                  <div className='w-1 h-4 bg-blue-900'></div>
                  <p className='text-gray-600 dark:text-gray-100'>Today: {today.getDate()} {monthNames[today.getMonth()]}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full h-full px-4 py-2'>
            <div className='grid grid-cols-7 gap-px border-b border-gray-300 dark:text-gray-100 text-center text-sm font-bold leading-6 text-gray-700 lg:flex-none'>
              {weekDayNames.map((day) => (
                <p className='w-full text-center font-bold'>
                  {day.slice(0, 3)}
                </p>
              ))}
            </div>
            <div className='flex h-full  text-xs leading-6 text-gray-700 lg:flex-auto'>
              <div className='w-full grid grid-cols-7 grid-rows-6 pb-20 gap-px'>
                {blankDays.map((day) => (
                  <div className='relative bg-gray-50 dark:bg-gray-600 px-3 py-2 '>
                    <time dateTime={`${year}-${month}-${day}`}>
                      <p className='opacity-0'>0</p>
                      <div className='flex'>
                        <div className='w-1 h-8'></div>
                        <p className=''></p>
                      </div>
                    </time>
                  </div>
                ))}
                {noOfDays.map((day) => (
                  <div className='relative bg-gray-50 px-3 py-2 text-gray-500 dark:bg-gray-600 dark:hover:bg-gray-400 hover:bg-gray-200 dark:text-gray-100'>
                    <time dateTime={`${year}-${month}-${day}`}>
                      <p>{day}</p>
                      {/* <div className="bg-slate-200 flex">
                                    <div className="w-1 h-8 bg-blue-900"></div>
                                    <p className="text-blue-900">a</p>
                                </div> */}
                    </time>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
