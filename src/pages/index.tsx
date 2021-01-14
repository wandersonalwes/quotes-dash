import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Card from '@/components/Card'
import Table from '@/components/Table'
import HeaderPage from '@/components/HeaderPage'
import { categoryAPI, quoteAPI } from '@/lib/api'
import { BsChatSquareQuote } from 'react-icons/bs'
import { HiOutlineViewGridAdd, HiOutlineUsers } from 'react-icons/hi'
import { QuoteData } from '@/domain/quote'
import { useSession } from 'next-auth/client'
import AccessDenied from '@/components/AccessDenied'

const cardIconClasses = 'w-8 h-8 text-white'

export const getServerSideProps: GetServerSideProps = async () => {
  const categoriesTotal = await categoryAPI.count()
  const quotesTotal = await quoteAPI.count()
  const quotes = await quoteAPI.findAll()

  return {
    props: {
      categoriesTotal,
      quotesTotal,
      quotes
    }
  }
}

type Props = {
  categoriesTotal: number
  quotesTotal: number
  quotes: QuoteData[]
}

export default function Home ({ categoriesTotal, quotesTotal, quotes }: Props) {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!session) {
    return <AccessDenied />
  }

  return (

    <Layout>
      <HeaderPage title="Dashboard" />

      <div className="mt-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

          <Card
            title={String(quotesTotal)}
            subtitle='Frases'
            icon={<BsChatSquareQuote className={cardIconClasses} />}
            bgIcon='bg-pink-500'
          />

          <Card
            title={String(categoriesTotal)}
            subtitle='Categorias'
            icon={<HiOutlineViewGridAdd className={cardIconClasses} />}
            bgIcon='bg-green-500'
          />

          <Card
            title='1'
            subtitle='Usuários'
            icon={<HiOutlineUsers className={cardIconClasses} />}
            bgIcon='bg-yellow-500'
          />

        </div>
      </div>
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
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
