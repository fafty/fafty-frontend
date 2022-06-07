import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@fafty-frontend/theme'
import { NotificationProvider } from '@fafty-frontend/notifications'

function FaftyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <ThemeProvider defaultTheme="system" attribute="class">
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ThemeProvider>
    </>
  )  
}

export default FaftyApp
