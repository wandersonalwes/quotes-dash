import { FC, ReactNode } from 'react'

interface CardProps {
  title: string
  subtitle: string
  icon: ReactNode
  bgIcon: string
}

const Card: FC<CardProps> = ({ title, subtitle, icon, bgIcon, ...rest }) => {
  return (

    <div {...rest} className="w-full">
      <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
        <div className={`p-3 rounded-full bg-opacity-75 ${bgIcon}`}>
          {icon}
        </div>
        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">{title}</h4>
          <div className="text-gray-500">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
