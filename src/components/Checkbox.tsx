import { FC, InputHTMLAttributes } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

const Checkbox: FC<CheckboxProps> = ({ ...rest }) => {
  return (
    <>
      <input type="checkbox" className="input-check appearance-none checked:bg-blue-600 checked:border-transparent p-2 border rounded-sm outline-none cursor-pointer " {...rest} />

      <style jsx>{`
      .input-check:checked {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        }`}
      </style>
    </>
  )
}

export default Checkbox
