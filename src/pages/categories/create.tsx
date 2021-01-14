import Category from '@/components/Category'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'
import Loading from '@/components/Loading'

const CategoryPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <Category />
  )
}

export default CategoryPage
