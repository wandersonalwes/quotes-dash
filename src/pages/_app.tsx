import LeftMenuProvider from '@/contexts/LeftMenu'
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <LeftMenuProvider>
        <Component {...pageProps} />
      </LeftMenuProvider>
      <ToastContainer />
    </Provider>
  )
}

export default MyApp
