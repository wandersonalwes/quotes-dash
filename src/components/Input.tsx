import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  errorMessage?: string
}

const Input: FC<InputProps> = ({ label, name, errorMessage, ...rest }) => {
  return (
    <>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-4"
        {...rest}
      ></input>
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </>
  )
}

export default Input
