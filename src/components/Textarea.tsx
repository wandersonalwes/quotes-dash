import { FC, TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  errorMessage?: string
}

const Textarea: FC<TextareaProps> = ({ label, name, errorMessage, ...rest }) => {
  return (
    <>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        id={name}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-4"
        {...rest}
      ></textarea>
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </>
  )
}

export default Textarea
