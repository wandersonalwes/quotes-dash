import { dropdrownItems } from './dropdrownItems'
import DropdrownUserLink from './DropdrownUserLink'

const DropdrownUserContent = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      {dropdrownItems.map(({ title, destination }) => (
        <DropdrownUserLink href={destination} key={title}>
          {title}
        </DropdrownUserLink>
      ))}
    </div>
  )
}

export default DropdrownUserContent
