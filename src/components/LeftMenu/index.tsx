import LeftMenuHeader from './LeftMenuHeader'
import LeftMenuFooter from './LeftMenuFooter'
import LeftMenuLink from './LeftMenuLink'
import { menuItems } from './menuItems'

interface LeftMenuProps {
  isOpen: boolean
}

export default function LeftMenu ({ isOpen }: LeftMenuProps) {
  return (
    <div className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:flex flex-col justify-between lg:inset-0 ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
      <LeftMenuHeader />

      <div className="flex flex-1 flex-col justify-between h-auto">
        <nav className="mt-10">
          {menuItems.map(({ title, icon, destination }) => (
            <LeftMenuLink key={title} href={destination} icon={icon}>
              {title}
            </LeftMenuLink>
          ))}
        </nav>

        <LeftMenuFooter />
      </div>
    </div>
  )
}
