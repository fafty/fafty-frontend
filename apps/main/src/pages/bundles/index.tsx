import { useRouter } from 'next/router'
import { ReactComponent as EmptyIllustration } from '../../assets/empty.svg'
import { AssetTabsPlaceholder, BundleItemPlaceholder } from '@fafty/shared/ui'
import qs from 'qs'
import MainLayout from '../../layouts/main'
import { useAsync, getBundles } from '@fafty/shared/api'
import {
  BundleType,
  GetBundlesParamsType,
  GetBundlesResponseType
} from '@fafty/shared/types'
import Item from '../../components/items/bundle/item'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker'
import { useComponentDidUpdate } from '@fafty/usehooks'

import {
  TypeProps,
  OnChangeValueProps
} from '../../components/common/filterBar/types'

import FilterBar from '../../components/common/filterBar'
import { BLOCKCHAIN_CHECKS } from '../../constants/user/assets'
import { GetBundlesFiltersParamsType } from '@fafty/shared/types'
import { motion } from 'framer-motion'
import { BUNDLES_SORT_TABS } from '../../constants/bundles'

const BUNDLES_FILTERS = [
  {
    title: 'Blockchain',
    value: 'blockchain',
    type: TypeProps.ARRAY,
    options: BLOCKCHAIN_CHECKS
  },
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
  data: GetBundlesResponseType,
  prev?: GetBundlesResponseType
): GetBundlesResponseType => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] }
  }

  return data
}

const LIMIT = 20

type QueryFiltersProps = {
  paginate: {
    limit: number
    offset: number
  }
  filters?: GetBundlesFiltersParamsType
  sort?: string
}

const Bundles = () => {
  const { replace, asPath } = useRouter()

  const search = asPath.split('?')[1] ?? ''
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

  const onCloseTag = (key: keyof GetBundlesFiltersParamsType) => {
    const { [key]: deletedProp, ...rest } = localFiltersState.filters
    clearAsyncData()

    setLocalFiltersState((prev) => ({
      ...prev,
      filters: { ...rest },
      paginate: { limit: LIMIT, offset: 0 }
    }))
  }

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetBundlesResponseType,
    GetBundlesParamsType
  >({
    callback: getBundles,
    mapper
  })

  const { paginate, sort, ...panelFilterState } = localFiltersState

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false

  const tabIndex = useMemo(() => {
    const index = BUNDLES_SORT_TABS.findIndex(
      (tab) => tab.value === localFiltersState?.sort
    )

    return index >= 0 ? index : 0
  }, [localFiltersState?.sort])

  const onChangeTab = (index: number) => {
    const tab = BUNDLES_SORT_TABS[index]

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

    if (nextQuery !== search) {
      replace(`/bundles?${nextQuery}`)
    }

    call({
      filters: filters || {},
      limit: LIMIT,
      offset: paginate.offset,
      sort: BUNDLES_SORT_TABS[tabIndex]?.value || BUNDLES_SORT_TABS[0].value
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData()

        setLocalFiltersState((prev) => ({
          ...prev,
          paginate: { ...prev.paginate, offset: 0 }
        }))
      }
    },
    { search }
  )

  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      data?.paginate?.count ?? 0
    )

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    ) as BundleType[]
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  return (
    <MainLayout
      title={'Bundles | Fafty Marketplace'}
      description={'Bundles | Fafty Marketplace'}
      className="px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -5, scale: 1.1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1, delay: 0.3 }}
        className="my-20 flex flex-col items-center justify-center"
      >
        <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-gray-50 sm:text-8xl">
          Explore Bundles
        </h1>
        <p className="mt-4 text-3xl tracking-tight text-slate-900 dark:text-gray-50">
          Discover the most popular Bundles on the Fafty marketplace.
        </p>
      </motion.div>
      <div className="flex w-full flex-col">
        <div className="z-1 sticky top-[82px] mx-auto flex w-full flex-col bg-white shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
          <div className="grid grid-flow-col">
            <FilterBar<GetBundlesFiltersParamsType>
              filters={BUNDLES_FILTERS}
              onCloseTag={onCloseTag}
              values={panelFilterState.filters || {}}
              onChange={onChangeFilters}
            />
            <div className="relative ml-auto mr-8 flex">
              <div className="mt-2 flex">
                <Suspense fallback={<AssetTabsPlaceholder />}>
                  <Tabs
                    tabs={BUNDLES_SORT_TABS}
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
              {!isSuccess && !data?.paginate?.count
                ? Array.from({ length: 24 }, (_, index) => (
                    <BundleItemPlaceholder key={index} />
                  ))
                : items.map((item) => <Item key={item.token} item={item} />)}
              {isSuccess && items.length === 0 && (
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
            isLoading={isLoading}
            loadMore={loadMore}
          />
        </div>
      </div>
    </MainLayout>
  )
}
export default Bundles
