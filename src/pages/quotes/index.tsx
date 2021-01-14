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

export const getServerSideProps: GetServerSideProps = async () => {
  const quotes = await quoteAPI.findAll()

  return {
    props: {
      quotes
    }
  }
}

interface QuotesProps {
  quotes: QuoteData[]
}

export default function Quotes ({ quotes }: QuotesProps) {
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
                    <td className="px-6 py-4 whitespace-no-wrap ">1</td>

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
          </div>
        </div>
      </div>
    </Layout>
  )
}
