import Layout from '@/components/Layout'
import Card from '@/components/Card'
import LeftMenuProvider from '@/contexts/LeftMenu'
import { cardItems } from '@/utils/cardItems'
import Table from '@/components/Table'

export default function Home () {
  return (
    <LeftMenuProvider>
      <Layout>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

            <div className="mt-4">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">

                {cardItems.map(({ title, subTitle, icon, bgIcon }) => (
                  <Card
                    key={title}
                    title={title}
                    subtitle={subTitle}
                    icon={icon}
                    bgIcon={bgIcon} />
                ))}

              </div>
            </div>
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
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">Editar</a>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </LeftMenuProvider>
  )
}
