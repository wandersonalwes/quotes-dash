import { ReactNode } from 'react'
import { startsWith } from 'lodash'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/dist/client/router'

interface LeftMenuLinkProps extends LinkProps {
  href: string
  icon: ReactNode
  children: ReactNode
}

const LeftMenuLink = ({ href, icon, children }: LeftMenuLinkProps) => {
  const router = useRouter()

  const isLinkActive = startsWith(router.pathname.concat('/'), href.concat('/'))

  return (
    <Link href={href}>
      <a className={`flex items-center mt-4 py-2 px-6 bg-opacity-25 ${isLinkActive ? 'bg-gray-700 text-gray-200 border-l border-indigo-500' : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'}`}>
        {icon && icon}

        <span className="mx-3">{children}</span>
      </a>
    </Link>
  )
}

export default LeftMenuLink
