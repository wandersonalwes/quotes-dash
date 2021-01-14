import LeftMenuProvider from '@/contexts/LeftMenu'
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <LeftMenuProvider>
        <Component {...pageProps} />
      </LeftMenuProvider>
    </Provider>
  )
}

export default MyApp
