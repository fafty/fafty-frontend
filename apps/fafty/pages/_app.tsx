import '../styles/globals.sass'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
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
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default FaftyApp
