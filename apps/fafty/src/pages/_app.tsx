import '../styles/globals.sass';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@fafty-frontend/theme';
import { NotificationProvider } from '@fafty-frontend/notifications';
import { ProvideAuth } from '../auth';

function FaftyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="system" attribute="class">
        <NotificationProvider>
          <ProvideAuth>
            <Component {...pageProps} />
          </ProvideAuth>
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}

export default FaftyApp;
