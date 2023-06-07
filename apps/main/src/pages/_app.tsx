import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@fafty/shared/theme'
import { NotificationProvider } from '@fafty/notifications'
import { Listeners } from '../layouts/Listeners'
import { ProvideAuth } from '../utils/auth'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

export function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 15_000
  return library
}

function FaftyMainApp({ Component, pageProps, router }: AppProps) {
  const url = router.route
  return (
    <>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeProvider defaultTheme="system" attribute="class">
            <NotificationProvider>
              <ProvideAuth>
                <Listeners>
                  <Component {...pageProps} canonical={url} key={url} />
                  <Analytics />
                </Listeners>
              </ProvideAuth>
            </NotificationProvider>
          </ThemeProvider>
        </Web3ReactProvider>
      </AnimatePresence>
    </>
  )
}

export default FaftyMainApp
