import Quote from '@/components/Quote'
import { categoryAPI, quoteAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'

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
  return (
    <Quote
      quote={quote}
      categories={categories}
    />
  )
}

export default QuotePage
