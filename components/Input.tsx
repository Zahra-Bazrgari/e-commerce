import React from 'react'
import { Controller } from "react-hook-form";

type Props = {
  label: string,
  name: string,
  type: string,
  placeholder: string,
  control: any,
  error: string | undefined
}

const Input:React.FC<Props> = ({label, name, type, placeholder, control, error}) => {
  return (
    <div className='flex flex-col gap-1'>
      <label className="text-xs text-gray-600 text-right">{label}</label>
      <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className="w-full border-none border-b-[1px] pb-2 pr-1 border-transparent bg-gradient-to-r from-[rgb(160,145,253)] to-[rgb(96,141,239)] bg-no-repeat bg-[length:100%_2px] bg-bottom focus:outline-none placeholder:text-xs"
        />
      )}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default Input