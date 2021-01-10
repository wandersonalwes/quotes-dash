import { BsPeople, BsChatSquareQuote } from 'react-icons/bs'
import { HiOutlineChartPie, HiOutlineViewGridAdd } from 'react-icons/hi'

const sizeIcon = 'h-6 w-6'

export const menuItems = [
  {
    title: 'Dashboard',
    icon: <HiOutlineChartPie className={sizeIcon} />,
    destination: '/'
  },
  {
    title: 'Frases',
    icon: <BsChatSquareQuote className={sizeIcon} />,
    destination: '/quotes'
  },
  {
    title: 'Categorias',
    icon: <HiOutlineViewGridAdd className={sizeIcon} />,
    destination: '/categories'
  },
  {
    title: 'Usuários',
    icon: <BsPeople className={sizeIcon} />,
    destination: '/users'
  }
]
