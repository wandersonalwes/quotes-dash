import Category from '@/components/Category'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return router.push('/api/auth/signin')
  }

  return (
    <Category category={category} />
  )
}

export default CategoryPage
