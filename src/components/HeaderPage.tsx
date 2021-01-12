import { FC, ReactNode } from 'react'

interface HeaderPageProps {
  title: string
  rightContent?: ReactNode
}

const HeaderPage: FC<HeaderPageProps> = ({ title, rightContent }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-gray-700 text-3xl font-medium">{title}</h3>
      <div className="flex items-center">
        {rightContent && rightContent}
      </div>
    </div>
  )
}

export default HeaderPage
