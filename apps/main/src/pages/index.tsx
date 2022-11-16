import MainLayout from '../layouts/main'
import Hero from '../components/home/hero'
import Items from '../components/items'
import {
  AssetItemPlaceholder,
  BundleItemPlaceholder,
  CollectionItemPlaceholder
} from '@fafty/shared/ui'
import {
  getAssets,
  getBundles,
  getCollections,
  GetAssetsParamsProps,
  GetAssetsResponseProps,
  GetBundlesParamsProps,
  GetBundlesResponseProps,
  GetCollectionsParamsProps,
  GetCollectionsResponseProps,
  useAsync
} from '@fafty/shared/api'
import { MutableRefObject, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useOnScreen } from '@fafty/usehooks'
import { motion } from 'framer-motion'

export default function Home(): JSX.Element {
  // Refs
  const assetsContainerRef = useRef<HTMLDivElement | null>(null)
  const bundlesContainerRef = useRef<HTMLDivElement | null>(null)
  const collectionsContainerRef = useRef<HTMLDivElement | null>(null)

  // Async hooks
  const {
    data: assetsData,
    call: assetsCall,
    // isLoading: assetsIsLoading,
    isSuccess: assetsIsSuccess
  } = useAsync<GetAssetsResponseProps, GetAssetsParamsProps>({
    callback: getAssets
  })

  const {
    data: bundlesData,
    call: bundlesCall,
    // isLoading: bundlesIsLoading,
    isSuccess: bundlesIsSuccess
  } = useAsync<GetBundlesResponseProps, GetBundlesParamsProps>({
    callback: getBundles
  })

  const {
    data: collectionsData,
    call: collectionsCall,
    // isLoading: collectionsIsLoading,
    isSuccess: collectionsIsSuccess
  } = useAsync<GetCollectionsResponseProps, GetCollectionsParamsProps>({
    callback: getCollections
  })

  // On screen hooks
  const assetsContainerOnScreen: boolean = useOnScreen<HTMLDivElement>(
    assetsContainerRef as MutableRefObject<HTMLDivElement>,
    '0px'
  )
  useEffect(() => {
    if (!assetsIsSuccess && assetsContainerOnScreen) {
      assetsCall({ limit: 15, offset: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsContainerOnScreen])

  const bundlesContainerOnScreen: boolean = useOnScreen<HTMLDivElement>(
    bundlesContainerRef as MutableRefObject<HTMLDivElement>,
    '0px'
  )
  useEffect(() => {
    if (!bundlesIsSuccess && bundlesContainerOnScreen) {
      bundlesCall({ limit: 15, offset: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundlesContainerOnScreen])

  const collectionsContainerOnScreen: boolean = useOnScreen<HTMLDivElement>(
    collectionsContainerRef as MutableRefObject<HTMLDivElement>,
    '0px'
  )
  useEffect(() => {
    if (!collectionsIsSuccess && collectionsContainerOnScreen) {
      collectionsCall({ limit: 15, offset: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionsContainerOnScreen])

  return (
    <MainLayout
      title={'undefined'}
      description={'undefined'}
      className="px-0"
    >
      <Hero />
      <div className="pt-10 px-8 bg-[#010d47]" ref={collectionsContainerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 1.1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ease: 'easeOut', duration: 1, delay: 0.3 }}
          className="z-10 my-[5rem] flex h-full w-full flex-col items-center justify-center"
        >
          <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-blue-500 sm:text-8xl">
            Buy, Hold, Sell, Earn
          </h1>
          <p className=" mt-4 text-3xl tracking-tight text-slate-900 dark:text-blue-500">
            Buy and sell digital collectibles NFTs or earn by creating your own.
          </p>
          <div className="mt-10">
            <Link
              href="/collections"
              className="relative inline-block rounded-full border border-transparent bg-blue-600 py-4 px-8 text-center text-2xl font-medium text-white hover:bg-blue-700"
            >
              See popular collections
            </Link>
          </div>
        </motion.div>
        {/* <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Collections</h3>
          </div>
          <div className="right-0 ml-auto">
            <Link
              href="/collections"
              className="mb-1 w-full rounded-[7px] bg-gray-200 p-3 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none dark:bg-neutral-700 dark:text-gray-50"
            >
              See all Collection
            </Link>
          </div>
        </div> */}
        {!collectionsIsSuccess && !collectionsData?.paginate?.count ? (
          <div className="items-slider">
            <div className="wrapper-items">
              <div className="items carousel">
                <div className="min-w-[44px]" />
                {Array.from({ length: 6 }, (_, index) => (
                  <CollectionItemPlaceholder key={index} />
                ))}
                <div className="min-w-[44px]" />
              </div>
            </div>
          </div>
        ) : (
          collectionsData?.records && (
            <Items type="collection" items={collectionsData?.records} />
          )
        )}
      </div>
      <div className="mt-10 px-8" ref={bundlesContainerRef}>
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Bundles</h3>
          </div>
          <div className="right-0 ml-auto">
            <Link
              href="/bundles"
              className="mb-1 w-full rounded-[7px] bg-gray-200 p-3 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none dark:bg-neutral-700 dark:text-gray-50"
            >
              See all Bundles
            </Link>
          </div>
        </div>
        {!bundlesIsSuccess && !bundlesData?.paginate?.count ? (
          <div className="items-slider">
            <div className="wrapper-items">
              <div className="items carousel">
                <div className="min-w-[44px]" />
                {Array.from({ length: 6 }, (_, index) => (
                  <BundleItemPlaceholder key={index} />
                ))}
                <div className="min-w-[44px]" />
              </div>
            </div>
          </div>
        ) : (
          bundlesData?.records && (
            <Items type="bundle" items={bundlesData?.records} />
          )
        )}
      </div>
      <div className="mt-10 px-8" ref={assetsContainerRef}>
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Nfts</h3>
          </div>
          <div className="right-0 ml-auto">
            <Link
              href="/assets"
              className="mb-1 w-full rounded-[7px] bg-gray-200 p-3 text-gray-900 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none dark:bg-neutral-700 dark:text-gray-50"
            >
              See all Nfts
            </Link>
          </div>
        </div>
        {!assetsIsSuccess && !assetsData?.paginate?.count ? (
          <div className="items-slider">
            <div className="wrapper-items">
              <div className="items carousel">
                <div className="min-w-[44px]" />
                {Array.from({ length: 6 }, (_, index) => (
                  <AssetItemPlaceholder key={index} />
                ))}
                <div className="min-w-[44px]" />
              </div>
            </div>
          </div>
        ) : (
          assetsData?.records && (
            <Items type="asset" items={assetsData?.records} />
          )
        )}
      </div>
    </MainLayout>
  )
}
