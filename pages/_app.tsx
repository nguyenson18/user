import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from './contexts/AuthContext'
import {  LoginProvider } from './contexts/loginContext'



function MyApp({ Component, pageProps }: AppProps) {
  return <LoginProvider>
      <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  </LoginProvider>
  
}

export default MyApp
