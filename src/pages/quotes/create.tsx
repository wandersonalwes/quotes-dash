import Quote from '@/components/Quote'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await categoryAPI.findAll()

  return {
    props: {
      categories
    }
  }
}

const QuotePage = ({ categories }) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return router.push('/api/auth/signin')
  }

  return (
    <Quote categories={categories} />
  )
}

export default QuotePage
