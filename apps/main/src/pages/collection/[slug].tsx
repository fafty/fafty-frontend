import { useRouter } from 'next/router'
import { ReactComponent as EmptyIllustration } from '../../assets/empty.svg'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import MainLayout from '../../layouts/main'
import Item from '../../components/items/asset/item'
import Image from 'next/image'
import { Viewer } from '@fafty/text/viewer'

import {
  useAsync,
  getCollection,
  getCollectionAssetsBySlug
} from '@fafty/shared/api'
import {
  AssetType,
  GetCollectionParamsType,
  GetCollectionResponseType,
  GetCollectionAssetsBySlugResponseType,
  GetCollectionAssetsBySlugParamsType,
  GetCollectionAssetsBySlugFiltersParamsType
} from '@fafty/shared/types'
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker'
import { AssetItemPlaceholder, AssetTabsPlaceholder } from '@fafty/shared/ui'
import { useComponentDidUpdate } from '@fafty/usehooks'
import qs from 'qs'
import {
  TypeProps,
  OnChangeValueProps
} from '../../components/common/filterBar/types'

import FilterBar from '../../components/common/filterBar'
import { motion } from 'framer-motion'
import { COLLECTION_SORT_TABS } from '../../constants/collection'

const ASSETS_FILTERS = [
  {
    title: 'Price',
    value: 'price',
    type: TypeProps.RANGE,
    params: {
      firstTitle: 'min',
      secondTitle: 'max',
      firstKey: 'ge',
      secondKey: 'le'
    }
  },
  {
    title: 'Included Items',
    value: 'cached_assets_count',
    type: TypeProps.RANGE,
    params: {
      firstTitle: 'min',
      secondTitle: 'max',
      firstKey: 'ge',
      secondKey: 'le'
    }
  }
]
const Tabs = lazy(() => import('../../components/asset/tabs'))

const mapper = (
  assetsData: GetCollectionAssetsBySlugResponseType,
  prev?: GetCollectionAssetsBySlugResponseType
): GetCollectionAssetsBySlugResponseType => {
  if (prev && Object.keys(prev).length) {
    return {
      ...prev,
      ...assetsData,
      record: {
        ...prev.record,
        assets: {
          paginate: assetsData.record?.assets?.paginate,
          records: [
            ...prev.record.assets.records,
            ...assetsData.record.assets.records
          ]
        }
      }
    }
  }

  return assetsData
}

const LIMIT = 20

type QueryFiltersProps = {
  paginate: {
    limit: number
    offset: number
  }
  filters?: GetCollectionAssetsBySlugFiltersParamsType
  sort?: string
}

const Collection = () => {
  const { query, isReady, replace, asPath } = useRouter()
  const slug = query.slug as string

  const search = asPath.split('?')[1]
  const params = qs.parse(search) as Omit<QueryFiltersProps, 'paginate'>

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0
      },
      ...params
    }
  )

  const onChangeFilters = (key: string, value: OnChangeValueProps) => {
    clearAsyncData()

    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: { limit: LIMIT, offset: 0 },
      filters: { ...prev.filters, [key]: value }
    }))
  }

  const onCloseTag = (
    key: keyof GetCollectionAssetsBySlugFiltersParamsType
  ) => {
    const { [key]: deletedProp, ...rest } = localFiltersState.filters
    clearAsyncData()

    setLocalFiltersState({ ...rest, paginate: { limit: LIMIT, offset: 0 } })
  }

  const { data, call } = useAsync<
    GetCollectionResponseType,
    GetCollectionParamsType
  >({
    callback: getCollection
  })

  //todo add filters
  const {
    data: assetsData,
    call: callAssets,
    isLoading: isAssetsLoading,
    isSuccess: isAssetsSuccess,
    clearAsyncData
  } = useAsync<
    GetCollectionAssetsBySlugResponseType,
    GetCollectionAssetsBySlugParamsType
  >({
    callback: getCollectionAssetsBySlug,
    mapper
  })

  const { paginate, ...panelFilterState } = localFiltersState

  const allowLoad = assetsData
    ? !isAssetsLoading &&
      assetsData?.record.assets.records.length <
        assetsData?.record.assets.paginate?.count
    : false

  useEffect(() => {
    if (isReady) {
      call({ slug })
      callAssets({ slug, limit: LIMIT, offset: 0 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  const tabIndex = useMemo(() => {
    const index = COLLECTION_SORT_TABS.findIndex(
      (tab) => tab.value === localFiltersState?.sort
    )

    return index >= 0 ? index : 0
  }, [localFiltersState?.sort])

  const onChangeTab = (index: number) => {
    const tab = COLLECTION_SORT_TABS[index]

    clearAsyncData()
    setLocalFiltersState((prev) => ({ ...prev, sort: tab.value }))
  }

  const loadMore = () => {
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        offset: prev.paginate.offset + LIMIT
      }
    }))
  }

  useEffect(() => {
    const { filters, paginate, sort } = localFiltersState
    const nextQuery = qs.stringify({ filters, sort })

    if (data && nextQuery !== search) {
      replace(`/collection/${data.record.slug}?${nextQuery}`)
    }

    slug &&
      callAssets({
        slug: slug,
        limit: LIMIT,
        offset: paginate.offset,
        filters: filters,
        sort:
          COLLECTION_SORT_TABS[tabIndex]?.value || COLLECTION_SORT_TABS[0].value
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData()

        setLocalFiltersState((prev) => ({
          paginate: { ...prev.paginate, offset: 0 }
        }))
      }
    },
    { search }
  )

  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      assetsData?.record.assets?.paginate?.count ?? 0
    )
    console.log('count', count, assetsData)

    return Array.from(
      { length: count },
      (_, index) => assetsData?.record.assets.records[index] ?? {}
    ) as AssetType[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assetsData?.record?.assets?.paginate?.count,
    assetsData?.record?.assets?.records,
    localFiltersState.paginate.offset
  ])

  const isObjectEmpty = (value: object | string) =>
    typeof value === 'object' ? Object.keys(value).length === 0 : !value

  return (
    <MainLayout
      title={data?.record.name}
      description={`Collection ${slug}`}
      className="px-0"
    >
      <div className="flex h-full w-full flex-col">
        <div className="m-8 flex">
          {/* <div className="w-48 h-48 bg-neutral-800 shadow rounded-full" /> */}
          <div className="relative flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
            {data && data?.record.cover && (
              <Image
                className="relative flex h-full w-full flex-shrink-0 rounded-full ring-4 ring-white"
                src={data?.record.cover.src || ''}
                alt=""
                width={100}
                height={100}
              />
            )}
          </div>
          <div className="ml-5 flex flex-col">
            <h1 className="text-2xl font-bold">{data?.record.name}</h1>
            {data?.record?.description &&
            isObjectEmpty(data?.record.description) ? (
              <span className="text-xs font-medium opacity-50">
                No description
              </span>
            ) : (
              data?.record?.description && (
                <Viewer
                  namespace={'description'}
                  editorState={data?.record.description as string}
                />
              )
            )}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="z-1 sticky top-[82px] mx-auto flex w-full flex-col bg-white shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            <div className="grid grid-flow-col">
              <FilterBar<GetCollectionAssetsBySlugFiltersParamsType>
                filters={ASSETS_FILTERS}
                onCloseTag={onCloseTag}
                values={panelFilterState.filters || {}}
                onChange={onChangeFilters}
              />
              <div className="relative ml-auto mr-8 flex">
                <div className="mt-2 flex">
                  <Suspense fallback={<AssetTabsPlaceholder />}>
                    <Tabs
                      tabs={COLLECTION_SORT_TABS}
                      tabIndex={tabIndex}
                      setTabIndex={onChangeTab}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
          <div className="m-8">
            <div className="wrapper-items">
              <div className="items grided">
                {!isAssetsSuccess && !assetsData?.record.assets.paginate.count
                  ? Array.from({ length: 24 }, (_, index) => (
                      <AssetItemPlaceholder key={index} />
                    ))
                  : items.map((item) => <Item key={item.token} item={item} />)}
                {isAssetsSuccess && items.length === 0 && (
                  <motion.div
                    variants={{
                      initial: {
                        opacity: 0
                      },
                      animate: {
                        opacity: 1
                      },
                      exit: {
                        opacity: 0
                      }
                    }}
                    className="flex h-full w-full flex-col items-center justify-center p-20"
                  >
                    <div className="h-[20rem] w-[25rem]">
                      <EmptyIllustration />
                    </div>
                    <h2 className="mt-5 text-2xl font-medium text-neutral-500 dark:text-neutral-50">
                      No items found
                    </h2>
                  </motion.div>
                )}
              </div>
            </div>
            <InfinityLoadChecker
              allowLoad={allowLoad}
              isLoading={isAssetsLoading}
              loadMore={loadMore}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Collection
