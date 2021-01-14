import Category from '@/components/Category'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'

const CategoryPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <Category />
  )
}

export default CategoryPage
