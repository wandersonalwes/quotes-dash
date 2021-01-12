import Link from 'next/link'
import Layout from '@/components/Layout'
import Table from '@/components/Table'
import Button from '@/components/Button'
import HeaderPage from '@/components/HeaderPage'
import { useRouter } from 'next/router'

export default function Quotes () {
  const router = useRouter()

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
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <Table columns={['ID', 'Conteúdo', 'Status', '']}>

              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">1</td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  w-64 block">
                    <p className="truncate">Eu sou uma frase muito legal, e você pode me compartilhar com os seus amigos e pessoas queridas.</p>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Publicado</span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                    <Link href="/quotes/1">
                      <a className="text-indigo-600 hover:text-indigo-900">Editar</a>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
