import { FC, LinkHTMLAttributes } from 'react'

interface DropdrownUserLinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
  href: string
}

const DropdrownUserLink: FC<DropdrownUserLinkProps> = ({ href, children, ...rest }) => {
  return (
    <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white" {...rest}>{children}</a>
  )
}

export default DropdrownUserLink
