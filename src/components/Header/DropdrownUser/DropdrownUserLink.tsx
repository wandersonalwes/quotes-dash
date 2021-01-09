import { FC } from 'react'

interface DropdrownUserLinkProps {
  href: string
}

const DropdrownUserLink: FC<DropdrownUserLinkProps> = ({ href, children }) => {
  return (
    <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">{children}</a>
  )
}

export default DropdrownUserLink
