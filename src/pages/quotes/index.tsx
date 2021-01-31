import Link from 'next/link'
import Layout from '@/components/Layout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import HeaderPage from '@/components/HeaderPage'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { QuoteData } from '@/domain/quote'
import { quoteAPI } from '@/lib/api'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'
import Loading from '@/components/Loading'
import NextError from 'next/error'
import { paramNumber } from '@/utils/paramNumber'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const perPage = 20

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
  const totalQuotes = await quoteAPI.count()
  const quotes = await quoteAPI.findAll(`?per_page=${perPage}&page=${page}`)

  return {
    props: {
      quotes,
      totalQuotes,
      page,
      perPage
    }
  }
}

interface QuotesProps {
  page: string
  perPage: number
  totalQuotes: number
  quotes: QuoteData[]
}

export default function Quotes ({ page, totalQuotes, quotes }: QuotesProps) {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return <Loading />
  }

  if (!session) {
    return <AccessDenied />
  }

  const lastPage = Math.ceil(totalQuotes / perPage)
  const pageNumber = parseInt(page)

  if (paramNumber(router.query.page) > lastPage) {
    return <NextError statusCode={404} />
  }

  return (
    <Layout>
      <HeaderPage
        title="Frases"
        rightContent={
          <Button
            onClick={() => router.push('/quotes/create')}
            title="Nova Frase"
            variant="primary"
          />
        }
      />

      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg ">
            <Table columns={['ID', 'Conteúdo', '']}>

              <tbody className="bg-white">
                {quotes.length > 0 && quotes.map(({ id, content }) => (
                  <tr key={id} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-no-wrap ">{id}</td>

                    <td className="px-6 py-4 whitespace-no-wrap w-64 block">
                      <p className="truncate">{content}</p>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                      <Link href={`/quotes/${id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">Editar</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="flex justify-between items-center bg-white px-6 py-3 text-sm text-gray-600">
              <p>Mostrando {perPage * (pageNumber - 1)} a {pageNumber === lastPage ? totalQuotes : perPage * pageNumber} de {totalQuotes} resultados</p>

              <nav className="flex space-x-3">

                <Link href={`/quotes?page=${pageNumber === 1 ? 1 : pageNumber - 1}`}>
                  <a className="p-1 border rounded hover:bg-gray-50">
                    <HiChevronLeft className="w-6 h-6 text-gray-500" />
                  </a>
                </Link>

                <Link href={`/quotes?page=${pageNumber === lastPage ? lastPage : pageNumber + 1}`}>
                  <a className="p-1 border rounded hover:bg-gray-50">
                    <HiChevronRight className="w-6 h-6 text-gray-500" />
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
