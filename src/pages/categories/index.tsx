import Link from 'next/link'
import Layout from '@/components/Layout'
import Table from '@/components/Table'
import HeaderPage from '@/components/HeaderPage'
import Button from '@/components/Button'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { categoryAPI } from '@/lib/api'
import { CategoryData } from '@/domain/category'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'
import Loading from '@/components/Loading'

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await categoryAPI.findAll()

  return {
    props: {
      categories
    }
  }
}

interface CategoriesProps {
  categories: CategoryData[]
}

export default function Categories ({ categories }: CategoriesProps) {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  return (
    <Layout>
      <HeaderPage
        title="Categorias"
        rightContent={<Button title="Nova categoria" onClick={() => router.push('/categories/create')} />}
      />
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <Table columns={['ID', 'Nome', '']}>

              <tbody className="bg-white">
                {categories.length > 0 && categories.map(({ id, name }) => (
                  <tr key={id} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-no-wrap  w-16">{id}</td>

                    <td className="px-6 py-4 whitespace-no-wrap w-32 block">
                      <p className="truncate">{name}</p>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                      <Link href={`/categories/${id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">Editar</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Layout >
  )
}
