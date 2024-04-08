import React from "react";

interface Props {
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  bgColor?: string;
  textColor?: string;
  isBorder?: boolean;
  isIcon?: string;
}

const Button = ({ name, type = "button", onClick, width, bgColor = "bg-gray", textColor = "text-white", isBorder = true, isIcon}: Props) => {
  return (
    <button
      type={type}
      className={`${isBorder && 'border border-white'} flex justify-center items-center p-1 ${isIcon && "p-2"} px-2 hover:opacity-85 rounded-md mt-2 text-[15px] gap-2 font-normal ${width} ${bgColor} ${textColor}`}
      {...onClick}
    >
        {isIcon && <img src={isIcon} alt={isIcon} className="w-6 h-6" />}
      {name}
    </button>
  );
};
export default Button;
