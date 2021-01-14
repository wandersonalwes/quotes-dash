import { signIn } from 'next-auth/client'

export const AccessDenied = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-3xl mr-8 border-r border-gray-400 pr-8">403</h1>
      <div>
        <h2 className="text-2xl mb-2">Acesso negado</h2>
        <p className="text-gray-600 text-sm">
          <a href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>Você deve estar conectado para visualizar<br /> esta página.</a>
        </p>
      </div>
    </div>
  )
}

export default AccessDenied
