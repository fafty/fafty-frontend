import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@fafty/shared/theme'
import { NotificationProvider } from '@fafty/notifications'
import { Listeners } from '../layouts/Listeners'
import { ProvideAuth } from '../utils/auth'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'

function FaftyMainApp({ Component, pageProps, router }: AppProps) {
  const url = router.route
  return (
    <>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
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
      </AnimatePresence>
    </>
  )
}

export default FaftyMainApp
