import LeftMenuProvider from '@/contexts/LeftMenu'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <LeftMenuProvider>
      <Component {...pageProps} />
    </LeftMenuProvider>
  )
}

export default MyApp
