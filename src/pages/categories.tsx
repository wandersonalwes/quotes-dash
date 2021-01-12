import Layout from '@/components/Layout'
import Table from '@/components/Table'
import HeaderPage from '@/components/HeaderPage'

export default function Categories () {
  return (
    <Layout>
      <HeaderPage title="Categorias" />
      <div className="mt-8"></div>
      <div className="flex flex-col mt-8">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <Table columns={['ID', 'Nome', '']}>

              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-16">1</td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200  w-32 block">
                    <p className="truncate">Amor</p>
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
    </Layout>
  )
}
