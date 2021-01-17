import { Category, AccessDenied, Loading } from '@/components'
import { useSession } from 'next-auth/client'
import Error from 'next/error'

const CategoryPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  if (!session.user.isAdmin) {
    return <Error statusCode={404} />
  }

  return (
    <Category />
  )
}

export default CategoryPage
