import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary',
  className?: string
}

const Button: FC<ButtonProps> = ({ title, leftIcon, rightIcon, variant = 'primary', className, ...rest }) => {
  const variants = {
    primary: 'bg-indigo-500 hover:opacity-90',
    secondary: 'bg-pink-500 hover:opacity-90',
    'outline-primary': 'border border-indigo-500 text-indigo-500  hover:opacity-70',
    'outline-secondary': 'border border-pink-500 text-pink-500  hover:opacity-70'
  }

  return (

    <button className={`flex items-center border box-border py-2 px-4 rounded text-white disabled:opacity-50 disabled:cursor-default transition-colors uppercase ${variants[variant]} ${className}`} {...rest}>

      {leftIcon && (<div className="mr-2">{leftIcon}</div>)}

      {title}

      {rightIcon && (<div className="ml-2">{rightIcon}</div>)}

    </button>
  )
}

export default Button
