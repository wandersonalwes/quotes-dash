import { FC } from 'react'
import Thead from './Thead'

interface TableProps {
  columns: string[]
}

const Table: FC<TableProps> = ({ columns, children }) => {
  return (
    <table className="min-w-full">
      <Thead columns={columns} />

      {children}
    </table>
  )
}

export default Table
