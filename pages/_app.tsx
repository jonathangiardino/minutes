import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from 'lib/contexts/authContext'
import { SyncContextProvider } from '@/lib/contexts/syncContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <SyncContextProvider>
        <Component {...pageProps} />
      </SyncContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
