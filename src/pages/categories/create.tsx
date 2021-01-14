import { Category, AccessDenied, Loading } from '@/components'
import { useSession } from 'next-auth/client'

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
