import { BsChatSquareQuote } from 'react-icons/bs'
import { HiOutlineViewGridAdd, HiOutlineUsers } from 'react-icons/hi'

const cardIconClasses = 'w-8 h-8 text-white'

export const cardItems = [
  {
    title: '123',
    subTitle: 'Frases',
    icon: <BsChatSquareQuote className={cardIconClasses} />,
    bgIcon: 'bg-pink-500'
  },
  {
    title: '123',
    subTitle: 'Categorias',
    icon: <HiOutlineViewGridAdd className={cardIconClasses} />,
    bgIcon: 'bg-green-500'
  },
  {
    title: '123',
    subTitle: 'Usuários',
    icon: <HiOutlineUsers className={cardIconClasses} />,
    bgIcon: 'bg-yellow-500'
  }
]
