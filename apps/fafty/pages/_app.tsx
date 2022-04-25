import '../styles/globals.sass'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { NotificationProvider } from '@fafty-frontend/notifications'

function FaftyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  )  
}
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default FaftyApp
