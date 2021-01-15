import { signIn } from 'next-auth/client'
import { BsArrowRightShort } from 'react-icons/bs'

export const AccessDenied = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <img className="mb-8" src="/images/access-denied.png" alt="Acesso negado" width="150" />
      <h2 className="text-5xl mb-4 text-center font-bold">Acesso negado</h2>
      <p className="text-gray-600 text-lg text-center mb-6">Você deve estar conectado para visualizar<br /> esta página.</p>

      <button
        onClick={() => signIn('github')}
        className="flex bg-indigo-500 hover:bg-indigo-400 transition px-8 py-4 rounded text-white shadow-2xl"
      >
        Entrar com GitHub

        <BsArrowRightShort className=" h-6 w-6" />
      </button>
    </div>
  )
}

export default AccessDenied
