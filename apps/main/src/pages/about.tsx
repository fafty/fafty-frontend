import { AnimatePresence, motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import Parallax from '../components/home/parallax'
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
    <MainLayout
      title={'About us'}
      description={'Fafty NFT marketplace'}
      className="px-0"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="item-jsonld"
        />
      </Head>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-full max-h-[calc(100vh_-_80px)] w-full overflow-hidden">
        <div className="z-1 absolute inset-0 h-40 bg-gradient-to-b from-black/90"></div>
        <div className="z-1 absolute inset-0  bg-gradient-to-t from-blue-600/60 via-neutral-900/60 to-neutral-900/90" />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 1.1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ease: 'easeOut', duration: 1, delay: 0.3 }}
            className="absolute z-10 w-full h-full flex flex-col items-center justify-center mt-[5rem]">
            <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-8xl">
              The new creative economy.
            </h1>
            <p className=" mt-4 text-3xl tracking-tight text-slate-900 dark:text-slate-50">
              Create, explore, &amp; collect digital art NFT.
            </p>
            <div className="mt-5">
              <Link
                href="/collections"
                className="relative inline-block rounded-full border border-transparent bg-blue-600 py-4 px-8 text-center text-2xl font-medium text-white hover:bg-blue-700"
              >
                Explore
              </Link>
            </div>
          </motion.div>
        {/* <div className="relative z-10 flex w-full h-full flex-col items-center justify-center">
        </div> */}
        
        <Parallax />
      </motion.div>
      </AnimatePresence>

      <div className="pt-20">
        <h2>What is Fafty?</h2>
        <p>
          Fafty is a decentralized, open-source, decentralized identity platform
          for the Ethereum blockchain.
        </p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        euismod nisl, nec
      </p>
    </MainLayout>
  )
}
export default AboutPage
