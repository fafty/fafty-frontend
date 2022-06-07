import Head from 'next/head'

interface Props {
  title: string
  description: string
}

const Meta = ({title, description}: Props) => {
  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href="/assets/shared/ui/favicon/fafty-logo.svg" color="currentColor"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/shared/ui/favicon/apple-touch-icon.png"/>
      <link rel="alternate icon" type="image/png" sizes="32x32" href="/assets/shared/ui/favicon/favicon-32x32.png"/>
      <link rel="alternate icon" type="image/png" sizes="16x16" href="/assets/shared/ui/favicon/favicon-16x16.png"/>
      <link rel="manifest" href="/assets/shared/ui/favicon/manifest.json"/>
      <link rel="mask-icon" href="/assets/shared/ui/favicon/safari-pinned-tab.svg" color="currentColor"/>
      <meta name="msapplication-TileColor" content="#000"/>
      <meta name="msapplication-config" content="/assets/shared/ui/favicon/browserconfig.xml"/>
      <meta name="theme-color" content="rgb(255 255 255 / 0.95)" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="rgb(38 38 38 / 0.95)" media="(prefers-color-scheme: dark)"/>
      <meta charSet="utf-8"/>
      <title>{title}</title>
      <meta name="description" content={description} key="description"/>
      <meta property="og:title" content={title} key="title"/>
      <meta property="og:description" content={description} key="description"/>
      <meta property="og:image" content=""/>
    </Head>
  )
}

export default Meta;
