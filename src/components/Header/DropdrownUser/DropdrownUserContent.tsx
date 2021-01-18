import { signIn } from 'next-auth/client'
import DropdrownUserLink from './DropdrownUserLink'

const DropdrownUserContent = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <DropdrownUserLink href="/">Perfil</DropdrownUserLink>
      <DropdrownUserLink href="/api/auth/signout" onClick={() => signIn()}>Sair</DropdrownUserLink>
    </div>
  )
}

export default DropdrownUserContent
