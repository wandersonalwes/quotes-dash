import { Category, AccessDenied, Loading } from '@/components'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import Error from 'next/error'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = await categoryAPI.findByID(params.id)

  return {
    props: {
      category
    }
  }
}

const CategoryPage = ({ category }) => {
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
    <Category category={category} />
  )
}

export default CategoryPage
