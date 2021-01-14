import Quote from '@/components/Quote'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'

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

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <Quote categories={categories} />
  )
}

export default QuotePage
