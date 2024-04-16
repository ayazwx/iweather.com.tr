import React from 'react';

interface Props {
  name: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  isBorder?: boolean;
  isIcon?: string;
  viewTheme?: number;
  isDisabled?: boolean;
}

const ButtonType = [
  {
    bgColor: 'bg-transparent',
    darkBgColor: 'dark:bg-transparent',
    textColor: 'text-gray-800',
    darkTextColor: 'dark:text-gray-200',
    borderColor: 'border border-gray-800 dark:border-gray-200',
    darkBorderColor: 'dark:border-gray-200',
  },
  {
    bgColor: 'bg-gray-900',
    darkBgColor: 'dark:bg-gray-100',
    textColor: 'text-gray-200',
    darkTextColor: 'dark:text-gray-900',
    borderColor: '',
    darkBorderColor: '',
  },
  {
    bgColor: 'bg-red-700',
    darkBgColor: 'dark:bg-red-700',
    textColor: 'text-gray-200',
    darkTextColor: 'dark:text-gray-200',
    borderColor: '',
    darkBorderColor: '',
  },
]

const Button = ({
  name,
  type = 'button',
  onClick,
  width,
  height,
  isDisabled = false,
  isIcon,
  viewTheme = 0,
}: Props) => {
  return (
    <button
      type={type}
      className={`flex justify-center items-center p-1 ${
        isIcon && 'p-2'
      } px-2 hover:opacity-85 rounded-md my-1 font-bold text-[15px] gap-2 ${width} ${height} ${ButtonType[viewTheme].bgColor} ${ButtonType[viewTheme].textColor} ${ButtonType[viewTheme].borderColor} ${ButtonType[viewTheme].darkBgColor} ${ButtonType[viewTheme].darkTextColor} ${ButtonType[viewTheme].darkBorderColor}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isIcon && <img src={isIcon} alt={isIcon} className='w-6 h-6' />}
      {name}
    </button>
  );
};
export default Button;
