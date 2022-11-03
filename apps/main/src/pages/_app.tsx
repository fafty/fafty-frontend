import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@fafty/shared/theme'
import { NotificationProvider } from '@fafty/notifications'
import { Listeners } from '../layouts/Listeners'
import { ProvideAuth } from '../utils/auth'

function FaftyMainApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="system" attribute="class">
        <NotificationProvider>
          <ProvideAuth>
            <Listeners>
              <Component {...pageProps} />
            </Listeners>
          </ProvideAuth>
        </NotificationProvider>
      </ThemeProvider>
    </>
  )
}

export default FaftyMainApp