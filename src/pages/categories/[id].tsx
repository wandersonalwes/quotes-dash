import Category from '@/components/Category'
import { categoryAPI } from '@/lib/api'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = await categoryAPI.findByID(params.id)

  return {
    props: {
      category
    }
  }
}

const CategoryPage = ({ category }) => {
  return (
    <Category category={category} />
  )
}

export default CategoryPage
