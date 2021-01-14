import Quote from '@/components/Quote'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await categoryAPI.findAll()

  return {
    props: {
      categories
    }
  }
}

const QuotePage = ({ categories }) => {
  return (
    <Quote categories={categories} />
  )
}

export default QuotePage
