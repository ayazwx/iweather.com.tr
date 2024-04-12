"use client";
import React, { useContext, useEffect, useState } from "react";
import SVGPasswordEye from "./icons/SVGPasswordEye";
import Loading from "./Loading";

interface Props {
  label?: string,
  type: string,
  id: string,
  value?: string,
  setValue?: (value: string) => void,
  placeholder: string,
  isRequired?: boolean,
  isEye?: boolean,
  isLoading?: boolean,
  isProcessing?: boolean,
  isDisabled?: boolean,
}

export default function Input({label, type, id, placeholder, isRequired = false, isEye=false, isLoading=false, isProcessing=false, isDisabled=false, value,setValue, ...props}:Props) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)


  return (
    <div className="w-full min-w-[280px] relative">
      {
        label && (
          <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
        )
      }
      <input
        type={type === "password" ? isVisiblePassword ? "text" : "password" : type}
        name={id}
        id={id}
        value={value}
        onChange={(e) => setValue && setValue(e.target.value)}
        {...props}
        placeholder={placeholder}
        className="px-4 py-2 w-80 sm:w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 placeholder-gray-800 dark:placeholder-gray-500 rounded-md outline-none focus:ring focus:ring-blue-500"
        required={isRequired}
        disabled={isDisabled}
      />
      {
        isEye && <SVGPasswordEye visible={isVisiblePassword} className="absolute bottom-2.5 right-3" onClick={() => console.log(!isVisiblePassword)} />
      }
      {
        isLoading && <Loading isLoading={isProcessing} />
      }
    </div>
  );
}
