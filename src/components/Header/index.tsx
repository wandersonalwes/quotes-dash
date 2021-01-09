import { useState } from 'react'
import { useLeftMenu } from '@/contexts/LeftMenu'
import Avatar from '../Avatar'
import { DropdrownUserOverlay, DropdrownUserContent } from './DropdrownUser'
import { HiOutlineSearch, HiOutlineMenuAlt2 } from 'react-icons/hi'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { setIsOpen } = useLeftMenu()

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        <button onClick={() => setIsOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
          <HiOutlineMenuAlt2 className="h-6 w-6" />
        </button>

        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <HiOutlineSearch className="h-5 w-5 text-gray-500" />
          </span>

          <input className="w-32 sm:w-64 rounded-md pl-10 pr-4 focus:ring-indigo-500 focus:border-indigo-500 py-2" type="text"
            placeholder="Pesquisar" />
        </div>
      </div>

      <div className="flex items-center">

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">

            <Avatar src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80" alt="Foto de perfil" />

          </button>

          {dropdownOpen && (
            <>
              <DropdrownUserOverlay onClick={() => setDropdownOpen(false)} />
              <DropdrownUserContent />
            </>
          )}

        </div>
      </div>
    </header>
  )
}

export default Header
