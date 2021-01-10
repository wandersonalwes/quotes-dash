import { FC } from 'react'

interface TheadProps {
  columns: string[]
}

const Thead: FC<TheadProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">{column}</th>
        ))}
      </tr>
    </thead>
  )
}

export default Thead
