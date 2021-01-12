import LeftMenu from './LeftMenu'
import Header from './Header'
import { useLeftMenu } from '@/contexts/LeftMenu'

const Layout = ({ children }) => {
  const { isOpen, setIsOpen } = useLeftMenu()
  return (
    <div className="flex h-screen bg-gray-200">
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
      </div>

      <LeftMenu />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
