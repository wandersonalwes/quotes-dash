import { Quote, AccessDenied, Loading } from '@/components'
import { categoryAPI, quoteAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import NextError from 'next/error'

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

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  if (quote.error) {
    return <NextError statusCode={404} />
  }

  return (
    <Quote
      quote={quote}
      categories={categories}
    />
  )
}

export default QuotePage
