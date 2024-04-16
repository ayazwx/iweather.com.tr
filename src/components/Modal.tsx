import React from 'react';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  btnName: string;
  btnColor?: string;
  title: string;
  handleSubmit?: () => void;
  handleSaveText?: string;
  classNamees?: string;
  isWarn?: boolean;
  btnType?: number;
  wFull?:boolean;
  btWidth?: string;
  btHeight?: string;
}

export default function Modal({
  children,
  btnName,
  btnColor,
  title,
  handleSubmit,
  handleSaveText,
  classNamees,
  isWarn,
  btnType,
  wFull,
    btWidth,
    btHeight
}: Props) {
  const [showModal, setShowModal] = React.useState(false);

  const handleSave = () => {
    if (handleSubmit) {
      handleSubmit();
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        name={btnName}
        viewTheme={btnType ?? 0}
        width={btWidth}
        height={btHeight}
      />
      {showModal ? (
        <>
          <div className='overflow-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className='w-full h-full inset-0 absolute top-0 left-0 bg-slate-950 bg-opacity-20' onClick={() => setShowModal(false)}></div>
            <div className='relative p-4 w-full max-w-md max-h-full z-100'>
              <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                <button
                  type='button'
                  className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                </button>
                <div className='p-4 md:p-5 text-center'>
                  {isWarn && (
                    <svg
                      className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='2'
                        d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  )}
                  {/* <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete this product?
                  </h3> */}
                  <div className='text-black dark:text-white pb-4 w-full'>
                    {children}
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    type='button'
                    className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={handleSave}
                    type='button'
                    className='text-white ms-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
                  >
                    {handleSaveText ?? 'Ok'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
