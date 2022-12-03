import { useRouter } from 'next/router'
import { ReactComponent as EmptyIllustration } from '../../assets/empty.svg'
import {
  AssetTabsPlaceholder,
  CollectionItemPlaceholder
} from '@fafty/shared/ui'
import qs from 'qs'
import MainLayout from '../../layouts/main'
import {
  useAsync,
  getCollections,
  GetCollectionsParamsProps,
  GetCollectionsResponseProps,
  CollectionProps
} from '@fafty/shared/api'
import Item from '../../components/items/collection/item'
import {
  // BillingType,
  BillingTypeValue,
  PriceFilterProps,
  PriceFiltersValue
} from '../../components/assets/filters'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker'
// import { Panel } from '../../components/common/bar'
// import { Pills } from '../../components/assets/pills'
import { useComponentDidUpdate } from '@fafty/usehooks'

import {
  TypeProps,
  OnChangeValueProps
} from '../../components/common/filterBar/types'

import FilterBar from '../../components/common/filterBar'
import {
  BLOCKCHAIN_CHECKS,
} from '../../constants/user/assets'
import { AssetsUserFilterStateType } from '../../types/user/assets'
import { motion } from 'framer-motion'

export type FiltersValues = {
  blockchain?: string
  sort?: string
}

const TABS = [
  {
    title: 'Newest',
    value: 'newest'
  },
  {
    title: 'Oldest',
    value: 'oldest'
  },
  {
    title: 'Min price',
    value: 'min_price'
  },
  {
    title: 'Max price',
    value: 'max_price'
  }
]

const COLLECTIONS_FILTERS = [
  {
    title: 'Blockchain',
    value: 'blockchain',
    type: TypeProps.ARRAY,
    options: BLOCKCHAIN_CHECKS
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

// const Price = dynamic<PriceFilterProps>(
//   () =>
//     import('../../components/assets/filters/price').then((mod) => mod.Price),
//   {
//     ssr: false
//   }
// )

const mapper = (
  data: GetCollectionsResponseProps,
  prev?: GetCollectionsResponseProps
): GetCollectionsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] }
  }

  return data
}

const LIMIT = 20

type QueryFiltersProps = AssetsUserFilterStateType & {
  paginate: {
    limit: number
    offset: number
  }
  filters?: FiltersValues
  sort?: string
}

const Collections = () => {
  const { replace, asPath } = useRouter()
  const search = asPath.split('?')[1]
  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0
      },
      filters: { ...(qs.parse(search) as FiltersValues) }
    }
  )

  const onChangeFilters = (key: string, value: OnChangeValueProps) => {
    clearAsyncData()
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: { limit: LIMIT, offset: 0 },
      [key]: value
    }))
  }

  const onCloseTag = (key: keyof AssetsUserFilterStateType) => {
    const { [key]: deletedProp, ...rest } = localFiltersState
    clearAsyncData()

    setLocalFiltersState({ ...rest, paginate: { limit: LIMIT, offset: 0 } })
  }

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetCollectionsResponseProps,
    GetCollectionsParamsProps
  >({
    callback: getCollections,
    mapper
  })

  const { paginate, ...panelFilterState } = localFiltersState

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false

  const onChangeFiltersByKey =
    (key: string) => (value: PriceFiltersValue | string | BillingTypeValue) => {
      clearAsyncData()
      setLocalFiltersState((prev) => ({
        paginate: { ...prev.paginate, offset: 0 },
        filters: { ...prev.filters, [key]: value }
      }))
    }

  const tabIndex = useMemo(() => {
    const index = TABS.findIndex(
      (tab) => tab.value === localFiltersState?.filters?.sort
    )

    return index >= 0 ? index : 0
  }, [localFiltersState?.filters?.sort])

  const onChangeTab = (index: number) => {
    const tab = TABS[index]
    onChangeFiltersByKey('sort')(tab.value)
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

  // const onClosePill = (key: keyof FiltersValues) => {
  //   const { [key]: omitted, ...rest } = localFiltersState.filters || {}
  //   clearAsyncData()
  //   setLocalFiltersState((prev) => ({
  //     paginate: { ...prev.paginate },
  //     filters: { ...rest },
  //   }))
  // }

  // const onClearFilters = () => {
  //   clearAsyncData()
  //   setLocalFiltersState((prev) => ({
  //     paginate: { ...prev.paginate, offset: 0 },
  //   }))
  // }

  useEffect(() => {
    const { filters, paginate, ...restFilters } = localFiltersState
    const nextQuery = qs.stringify(filters)
    if (nextQuery !== search) {
      replace(`/collections?${nextQuery}`)
    }

    call({
      limit: LIMIT,
      offset: paginate.offset,
      filters: restFilters,
      sort: TABS[tabIndex]?.value || TABS[0].value
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
      data?.paginate?.count ?? 0
    )

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    ) as CollectionProps[]
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  return (
    <MainLayout
      title={'Collections | Marketplace'}
      description={'Collections | Marketplace'}
      className="px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: -5, scale: 1.1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1, delay: 0.3 }}
        className="my-20 flex flex-col items-center justify-center"
      >
        <h1 className="font text-4xl font-extrabold tracking-tight text-slate-900 dark:text-gray-50 sm:text-8xl">
          Explore Collectibles
        </h1>
        <p className="mt-4 text-3xl tracking-tight text-slate-900 dark:text-gray-50">
          Discover the most popular collectibles on the Fafty marketplace.
        </p>
      </motion.div>
      <div className="flex w-full flex-col">
        <div className="z-1 sticky top-[82px] mx-auto flex w-full flex-col bg-white shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
          <div className="grid grid-flow-col">
            <FilterBar<AssetsUserFilterStateType>
              filters={COLLECTIONS_FILTERS}
              onCloseTag={onCloseTag}
              values={panelFilterState}
              onChange={onChangeFilters}
            />
            <div className="relative ml-auto mr-8 flex">
              <div className="mt-2 flex">
                <Suspense fallback={<AssetTabsPlaceholder />}>
                  <Tabs
                    tabs={TABS}
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
                    <CollectionItemPlaceholder key={index} />
                  ))
                : items.map((item) => <Item key={item.token} item={item} />
              )}
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
export default Collections
