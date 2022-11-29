import { useRouter } from 'next/router'
import {
  AssetTabsPlaceholder,
  CollectionItemPlaceholder
} from '@fafty/shared/ui'
import qs from 'qs'
import MainLayout from '../../layouts/main'
import { useAsync, getCollections } from '@fafty/shared/api'
import {
  CollectionType,
  GetCollectionsResponseType,
  GetCollectionsParamsType
} from '@fafty/shared/types'
import Item from '../../components/items/collection/item'
import {
  BillingType,
  BillingTypeValue,
  PriceFilterProps,
  PriceFiltersValue
} from '../../components/assets/filters'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker'
import { Panel } from '../../components/common/bar'
// import { Pills } from '../../components/assets/pills'
import { useComponentDidUpdate } from '@fafty/usehooks'

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

const Tabs = lazy(() => import('../../components/asset/tabs'))

const Price = dynamic<PriceFilterProps>(
  () =>
    import('../../components/assets/filters/price').then((mod) => mod.Price),
  {
    ssr: false
  }
)

const mapper = (
  data: GetCollectionsResponseType,
  prev?: GetCollectionsResponseType
): GetCollectionsResponseType => {
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

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetCollectionsResponseType,
    GetCollectionsParamsType
  >({
    callback: getCollections,
    mapper
  })

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
    const { filters, paginate } = localFiltersState
    const nextQuery = qs.stringify(filters)
    if (nextQuery !== search) {
      replace(`/collections?${nextQuery}`)
    }

    call({
      limit: LIMIT,
      offset: paginate.offset,
      filters: {
        blockchain: filters?.blockchain
      },
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
    ) as CollectionType[]
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  return (
    <MainLayout
      title={'Collections | Marketplace'}
      description={'Collections | Marketplace'}
      className=""
    >
      <div className="relative flex items-start py-10">
        <div className="sticky top-[120px]  flex w-[250px] flex-shrink-0 items-start pr-5">
          <div className="flex w-full flex-col rounded bg-white  p-2.5 dark:bg-neutral-800">
            <Panel title="Price" initialState>
              <Price
                value={{
                  currency: '',
                  from: '',
                  to: ''
                }}
                onChange={onChangeFiltersByKey('price')}
              />
            </Panel>
            <Panel title="Billing type" initialState>
              <BillingType
                value={'fixed_price'}
                onChange={onChangeFiltersByKey('billing_type')}
              />
            </Panel>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-end">
            <div className="flex">
              <Suspense fallback={<AssetTabsPlaceholder />}>
                <Tabs
                  tabs={TABS}
                  tabIndex={tabIndex}
                  setTabIndex={onChangeTab}
                />
              </Suspense>
            </div>
          </div>
          <div className="my-4 flex">
            {/*<Pills onClosePill={onClosePill} onClearFilters={onClearFilters} />*/}
          </div>
          <div className="wrapper-items">
            <div className="items grided">
              {!isSuccess && !data?.paginate?.count
                ? Array.from({ length: 24 }, (_, index) => (
                    <CollectionItemPlaceholder key={index} />
                  ))
                : items.map((item) => <Item key={item.token} item={item} />)}
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
