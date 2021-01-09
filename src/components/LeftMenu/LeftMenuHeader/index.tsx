import { BsChatSquareQuote } from 'react-icons/bs'

const LeftMenuHeader = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex flex-col items-center">

        <BsChatSquareQuote className="w-12 h-12 text-indigo-500" />

        <p className="text-white text-2xl mx-2 font-semibold mt-4">Frases para Status</p>
        <span className="text-gray-600">v1.0.0</span>
      </div>
    </div>
  )
}

export default LeftMenuHeader
