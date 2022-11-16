import Head from 'next/head'
import MainLayout from '../layouts/main'

const AboutPage = (): JSX.Element => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: 'https://www.fafty.com',
    logo: '/assets/shared/ui/images/logo.svg',
    name: 'Fafty',
    description:
      'Fafty is a decentralized, open-source, decentralized identity platform for the Ethereum blockchain.',
    foundingDate: '2021-06-18',
    foundingLocation: 'Kyiv, Ukraine'
  }
  return (
    <MainLayout title={'About us'} description={'Fafty NFT marketplace'}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="item-jsonld"
        />
      </Head>
      <h1>About us</h1>
    </MainLayout>
  )
}
export default AboutPage
