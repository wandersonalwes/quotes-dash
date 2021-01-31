import { Quote, AccessDenied, Loading } from '@/components'
import { CategoryData } from '@/domain/category'
import { QuoteData } from '@/domain/quote'
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

interface QuotePageProps {
  categories: CategoryData[]
  quote: QuoteData & {
    error?: string
  }
}

const QuotePage = ({ categories, quote }: QuotePageProps) => {
  const [session, loading] = useSession()

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  if (quote.error || (session.user.id !== quote.userId && !session.user.isAdmin)) {
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
