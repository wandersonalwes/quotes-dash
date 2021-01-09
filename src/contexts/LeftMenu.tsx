import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface LeftMenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const LeftMenuContext = createContext({} as LeftMenuProps)

export default function LeftMenuProvider ({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <LeftMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </LeftMenuContext.Provider>
  )
}

export const useLeftMenu = () => {
  const context = useContext(LeftMenuContext)

  return context
}
