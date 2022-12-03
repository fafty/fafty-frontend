import MainLayout from '../../layouts/main'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { api } from '@fafty/shared/api'
import { GetAssetResponseType, AssetType } from '@fafty/shared/types'
import { SVGProps, useEffect, useMemo, useState } from 'react'
import Tabs from '../../components/asset/tabs'
import { Info } from '../../components/asset/tabs/info'
import { Owners } from '../../components/asset/tabs/owners'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Viewer } from '@fafty/text/viewer'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const isObjectEmpty = (value: object | string) =>
  typeof value === 'object' ? Object.keys(value).length === 0 : !value

const TABS = [
  { title: 'Info', value: 'info' },
  { title: 'Owners', value: 'owners' },
  { title: 'History', value: 'history' },
  { title: 'Bids', value: 'bids' }
]

interface BreadcrumbProps {
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  name: string
  href?: string
}

export default function Asset() {
  const param = useRouter()
  const { slug } = param.query
  const breadcrumb: BreadcrumbProps[] = useMemo(() => [], [])
  const [isHovered, setHovered] = useState(false)
  const [tagsZoneHovered, setTagsZoneHovered] = useState(false)

  const [detail, setDetail] = useState<AssetType | null>(null)
  // const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false)

  const [tabIndex, setTabIndex] = useState(0)

  const renderTabContent = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <Info />
      case 1:
        return <Owners />
      default:
        return null
    }
  }, [tabIndex])

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      if (slug) {
        const response = await api.get<GetAssetResponseType>(`asset/${slug}`)
        if (response.status === 200 && response.data) {
          const { data } = response
          breadcrumb.push(
            {
              icon: HomeIcon,
              name: 'Fafty',
              href: '/'
            },
            {
              icon: ChevronRightIcon,
              name: 'Assets',
              href: '/assets'
            },
            {
              icon: ChevronRightIcon,
              name: data.record.name,
              href: `/asset/${data.record.slug}`
            }
          )
          setDetail(data.record)
        } else {
          setError(true)
        }
      }
    }
    fetchData()

    return () => {
      setError(false)
      setDetail(null)
      breadcrumb.length = 0
    }
  }, [slug, breadcrumb])

  const renderBreadcrumb = useMemo(() => {
    return (
      <nav
        className="flex rounded-lg border border-t border-gray-100 px-5 py-5 text-slate-900 shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {breadcrumb &&
            breadcrumb.map((item) => (
              <li key={item.name} className="inline-flex items-center">
                <Link
                  href={item.href || ''}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.icon && (
                    <item.icon className="mr-2 h-5 w-5 " aria-hidden="true" />
                  )}
                  {item.name}
                </Link>
              </li>
            ))}
        </ol>
      </nav>
    )
  }, [breadcrumb])

  const renderTags = useMemo(() => {
    const randomColor = () => {
      const colors = [
        'bg-red-500',
        'bg-yellow-500',
        'bg-green-500',
        'bg-gray-800',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-500'
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }
    return (
      <div className="inline-flex items-start justify-start space-x-2">
        {detail?.tags?.map((tag) => (
          <Link
            href={`/tag/${tag.slug}`}
            key={tag.slug}
            className={classNames(
              randomColor(),
              'flex items-center justify-center rounded px-2 pt-2 pb-1.5 shadow drop-shadow hover:opacity-100'
            )}
          >
            <p className="text-xs font-bold uppercase leading-3 text-gray-50">
              {tag.name}
            </p>
          </Link>
        ))}
      </div>
    )
  }, [detail])

  if (isError) return <div>Failed to load</div>

  return (
    <>
      <MainLayout
        title={detail?.name || '...'}
        description={
          typeof detail?.description === 'string' ? detail?.description : '...'
        }
        className="container"
      >
        <div className="2xl:gap-x-13 grid gap-y-16 py-24 px-4 sm:grid-cols-1 sm:gap-x-2 md:grid-cols-[1fr,350px] md:gap-x-4 lg:grid-cols-[1fr,400px]  lg:gap-x-8 xl:gap-x-10">
          <div className="col-span-full row-start-1">{renderBreadcrumb}</div>
          <div className="row-span-2 row-start-2 lg:mr-10">
            <motion.div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative flex h-full w-full"
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-50 dark:bg-neutral-800" />
              {detail?.media?.src && (
                <>
                  <Image
                    src={detail.media.src}
                    style={{
                      backgroundColor: detail?.media?.dominant_color
                    }}
                    alt={detail.name}
                    width={400}
                    height={400}
                    className="z-1  absolute h-full w-full overflow-hidden rounded-2xl object-cover object-center"
                  />
                  <motion.div
                    initial={'visible'}
                    variants={{
                      visible: { opacity: 1, transition: { delay: 0.3 } },
                      hidden: { opacity: 0 }
                    }}
                    animate={
                      isHovered && !tagsZoneHovered ? 'hidden' : 'visible'
                    }
                    exit={'visible'}
                    onMouseEnter={() => setTagsZoneHovered(true)}
                    onMouseLeave={() => setTagsZoneHovered(false)}
                    className="absolute z-10 flex w-full flex-shrink-0 px-5 pt-5 pb-10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    {renderTags}
                  </motion.div>
                  <motion.div
                    initial={'hidden'}
                    variants={{
                      visible: { opacity: 0.5, transition: { delay: 0.3 } },
                      hidden: { opacity: 0 }
                    }}
                    animate={isHovered ? 'visible' : 'hidden'}
                    exit={'hidden'}
                    className="absolute inset-0 flex items-center justify-center group-hover:opacity-0"
                  >
                    <Image
                      src={detail.media.src}
                      alt={detail.name}
                      width={400}
                      height={400}
                      className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-2xl object-cover  object-center blur-xl"
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
          <div className="row-start-2 row-end-4">
            <div className="grid grid-cols-1 gap-y-7">
              <div className="flex w-full flex-col items-start justify-center space-y-2">
                <div className="flex space-x-2.5">
                  <p className="w-full text-4xl font-bold leading-10 text-slate-900 dark:text-slate-50">
                    {detail?.name}
                  </p>
                </div>
                <div className="inline-flex items-center justify-start space-x-2">
                  <div className="ml-auto flex items-center justify-center rounded border-2 border-green-500 px-1 py-1 text-sm font-bold text-green-500">
                    <span>20 ICP</span>
                  </div>
                  <div className="ml-auto flex items-center justify-center rounded border-2 border-gray-200 px-1 py-1 text-sm font-bold text-gray-500 dark:border-neutral-700">
                    <span>$100</span>
                  </div>
                  <p className="text-sm font-bold leading-none text-gray-500">
                    {detail?.available_supply_units} in stock
                  </p>
                </div>
              </div>
              <div className="text-base leading-normal text-slate-900 dark:text-slate-50">
                {detail?.description && isObjectEmpty(detail.description) ? (
                  <span className="text-xs font-medium opacity-50">
                    No description
                  </span>
                ) : (
                  detail?.description && (
                    <Viewer
                      namespace={'description'}
                      editorState={detail.description as string}
                    />
                  )
                )}
              </div>
              <div className="flex flex-col space-y-2.5">
                <Tabs
                  tabs={TABS}
                  tabIndex={tabIndex}
                  setTabIndex={setTabIndex}
                />
                {renderTabContent}
              </div>
              <div className="flex w-full flex-col items-start justify-center space-y-8 rounded-2xl border-t border-gray-100 bg-white p-6 text-slate-900 shadow-md drop-shadow-2xl dark:border-neutral-700 dark:bg-neutral-800 dark:text-slate-200">
                <div className="text-base font-medium leading-normal">
                  <div className="flex items-start justify-start space-x-1">
                    <span className="text-slate-900 dark:text-slate-300">
                      Highest bid by
                    </span>
                    <span className="text-base font-medium leading-normal">
                      Andrew Zhuk
                    </span>
                  </div>
                  <div className="inline-flex items-start justify-start space-x-3">
                    <span className="text-2xl font-semibold leading-loose text-black dark:text-white">
                      20 ICP
                    </span>
                    <span className="text-2xl font-semibold leading-loose text-gray-500">
                      $100
                    </span>
                  </div>
                </div>
                <div className="inline-flex w-full items-start justify-start space-x-2">
                  <div className="flex flex-1 items-center justify-center rounded-full bg-blue-500 px-6 py-4">
                    <p className="text-center text-base font-bold leading-none">
                      Purchase now
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center rounded-full border-2 border-gray-200 px-6 py-4">
                    <p className="text-center text-base font-bold leading-none ">
                      Place a bid
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
