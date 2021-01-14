import Category from '@/components/Category'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'
import Loading from '@/components/Loading'

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

  return (
    <Category category={category} />
  )
}

export default CategoryPage
