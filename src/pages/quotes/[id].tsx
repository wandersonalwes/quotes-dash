import Quote from '@/components/Quote'
import { categoryAPI, quoteAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const categories = await categoryAPI.findAll()
  const quote = await quoteAPI.findByID(params.id)

  return {
    props: {
      categories,
      quote
    }
  }
}

const QuotePage = ({ categories, quote }) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return router.push('/api/auth/signin')
  }

  return (
    <Quote
      quote={quote}
      categories={categories}
    />
  )
}

export default QuotePage
