import Category from '@/components/Category'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const CategoryPage = () => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return router.push('/api/auth/signin')
  }

  return (
    <Category />
  )
}

export default CategoryPage
