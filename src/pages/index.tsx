import Layout from '@/components/Layout'
import LeftMenuProvider from '@/contexts/LeftMenu'

export default function Home () {
  return (
    <LeftMenuProvider>
      <Layout>
        <h1>Dashboard</h1>
      </Layout>
    </LeftMenuProvider>
  )
}
