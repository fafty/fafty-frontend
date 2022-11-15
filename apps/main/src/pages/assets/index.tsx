import { useRouter } from 'next/router'
import { AssetItemPlaceholder, AssetTabsPlaceholder } from '@fafty/shared/ui'
import qs from 'qs'
import MainLayout from '../../layouts/main'
import {
  useAsync,
  getAssets,
  GetAssetsParamsProps,
  GetAssetsResponseProps,
  AssetProps,
} from '@fafty/shared/api'
// import { useVirtualizer } from '@tanstack/react-virtual';
import Item from '../../components/items/asset/item'
import {
  BillingType,
  BillingTypeValue,
  PriceFilterProps,
  PriceFiltersValue,
} from '../../components/assets/filters'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Panel } from '../../components/common/bar'
import { Pills } from '../../components/assets/pills'
import { useComponentDidUpdate } from '@fafty/usehooks'
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker'

export type FiltersValues = {
  price?: PriceFiltersValue;
  sort?: string;
  billing_type?: BillingTypeValue;
};

const TABS = [
  {
    title: 'Newest',
    value: 'newest',
  },
  {
    title: 'Oldest',
    value: 'oldest',
  },
  {
    title: 'Min price',
    value: 'min_price',
  },
  {
    title: 'Max price',
    value: 'max_price',
  },
]

// const Tabs = dynamic<TabsProps>(
//   () => import('../../components/asset/tabs').then((mod) => mod.Tabs),
//   {
//     // loading: () => <AssetTabsPlaceholder />,
//     ssr: false,
//     // suspense: true,
//   }
// );

const Tabs = lazy(() => import('../../components/asset/tabs'))

const Price = dynamic<PriceFilterProps>(
  () =>
    import('../../components/assets/filters/price').then((mod) => mod.Price),
  {
    ssr: false,
  }
)

const mapper = (
  data: GetAssetsResponseProps,
  prev?: GetAssetsResponseProps
): GetAssetsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] }
  }

  return data
}

const LIMIT = 20

type QueryFiltersProps = {
  paginate: {
    limit: number;
    offset: number;
  };
  filters?: FiltersValues;
  sort?: string;
};

const Assets = () => {
  const { replace, asPath } = useRouter()
  // const containerRef = useRef(null);
  const search = asPath.split('?')[1]

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0,
      },
      filters: { ...(qs.parse(search) as FiltersValues) },
    }
  )

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetAssetsResponseProps,
    GetAssetsParamsProps
  >({
    callback: getAssets,
    mapper,
  })

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false

  const onChangeFiltersByKey =
    (key: string) => (value: PriceFiltersValue | string | BillingTypeValue) => {
      clearAsyncData()

      setLocalFiltersState((prev) => ({
        paginate: { ...prev.paginate, offset: 0 },
        filters: { ...prev.filters, [key]: value },
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
        offset: prev.paginate.offset + LIMIT,
      },
    }))
  }

  const onClosePill = (key: keyof FiltersValues) => {
    const { [key]: omitted, ...rest } = localFiltersState.filters || {}
    clearAsyncData()

    setLocalFiltersState((prev) => ({
      paginate: { ...prev.paginate },
      filters: { ...rest },
    }))
  }

  const onClearFilters = () => {
    clearAsyncData()

    setLocalFiltersState((prev) => ({
      paginate: { ...prev.paginate, offset: 0 },
    }))
  }

  useEffect(() => {
    const { filters, paginate } = localFiltersState
    const nextQuery = qs.stringify(filters)

    if (nextQuery !== search) {
      replace(`/assets?${nextQuery}`)
    }

    call({
      limit: LIMIT,
      offset: paginate.offset,
      filters: {
        currency: filters?.price?.currency,
        price: { lg: filters?.price?.from, ge: filters?.price?.to },
        billing_type: filters?.billing_type,
      },
      sort: TABS[tabIndex]?.value || TABS[0].value,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData()

        setLocalFiltersState((prev) => ({
          paginate: { ...prev.paginate, offset: 0 },
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
    ) as AssetProps[]
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  // const groupedItems = useMemo(() => {
  //   if (!items || items.length === 0) {
  //     return [];
  //   }

  //   const byGroups = 20;

  //   const totalGroups = Math.ceil(items.length / byGroups);
  //   return [...Array(totalGroups)].map((_, index) => {
  //     const endIndex: number = (index + 1) * byGroups;
  //     const startIndex: number = endIndex - byGroups;
  //     return items.slice(startIndex, endIndex);
  //   });
  // }, [items]);

  // const renderMasonry = useMemo(() => {
  //   if (!isSuccess && !data?.paginate?.count) {
  //     return (
  //       // grid grid-cols-placeholders_assets_desktop gap-[5px]
  //       <div className="">
  //         {Array.from({ length: 15 }, (_, index) => (
  //           <ItemPlaceholder key={index} />
  //         ))}
  //       </div>
  //     );
  //   }

  //   return (
  //     <MasonryScroller
  //       positioner={positioner}
  //       // The distance in px between the top of the document and the top of the
  //       // masonry grid container
  //       offset={offset}
  //       // The height of the virtualization window
  //       height={windowHeight}
  //       // Forwards the ref to the masonry container element
  //       containerRef={containerRef}
  //       items={items}
  //       overscanBy={6}
  //       render={({ data }) => {
  //         if (!Object.keys(data).length) {
  //           return <ItemPlaceholder />;
  //         }

  //         return <Item item={data as AssetProps} />;
  //       }}
  //     />
  //     // <Masonry
  //     //   columnGutter={5}
  //     //   items={items}
  //     //   render={({ data }) => {
  //     //     if (!Object.keys(data).length) {
  //     //       return <ItemPlaceholder />;
  //     //     }

  //     //     return <Item item={data as AssetProps} />;
  //     //   }}
  //     // />
  //   );
  // }, [data?.paginate?.count, isSuccess, items]);

  // const GridVirtualizerDynamic = ({ rows }: { rows: any[] }) => {
  //   const parentRef = useRef();

  //   const rowVirtualizer = useVirtualizer({
  //     count: rows.length,
  //     getScrollElement: () => parentRef.current,
  //     estimateSize: () => 400,
  //   });

  //   return (
  //     <>
  //       <div
  //         ref={parentRef}
  //         className="wrapper-items"
  //         style={{
  //           height: `100vh`,
  //           width: `100%`,
  //           overflow: 'auto',
  //         }}
  //       >
  //         <div
  //           // className="items"
  //           style={{
  //             height: rowVirtualizer.getTotalSize(),
  //             position: 'relative',
  //           }}
  //         >
  //           {rowVirtualizer.getVirtualItems().map((virtualRow) => (
  //             <div
  //               key={virtualRow.key}
  //               ref={(el) => {
  //                 virtualRow.measureElement(el);
  //               }}
  //               className="items"
  //               // style={{
  //               //   position: 'absolute',
  //               //   top: 0,
  //               //   left: 0,
  //               //   transform: `translateY(${virtualRow.start}px)`,
  //               // }}
  //             >
  //               {rows[virtualRow.index].map((item: AssetProps) => (
  //                 <Item key={item.token} item={item} />
  //                 // items.map((item) => <Item key={item.token} item={item} />)
  //                 // JSON.stringify(items)
  //               ))}
  //               {/* <div
  //                 style={{
  //                   height: rows[virtualRow.index],
  //                 }}
  //               >
  //               </div> */}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <MainLayout
      title={'Assets | Marketplace'}
      description={'Assets | Marketplace'}
      className=""
    >
      <div className="relative flex items-start py-10">
        <div className="sticky top-[120px]  flex w-[250px] flex-shrink-0 items-start pr-5">
          <div className="flex w-full flex-col rounded bg-white  p-2.5 dark:bg-neutral-800">
            <Panel
              title="Price"
              initialState={!!localFiltersState?.filters?.price}
            >
              <Price
                value={localFiltersState?.filters?.price}
                onChange={onChangeFiltersByKey('price')}
              />
            </Panel>
            <Panel
              title="Billing type"
              initialState={!!localFiltersState?.filters?.billing_type}
            >
              <BillingType
                value={localFiltersState?.filters?.billing_type}
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
            <Pills onClosePill={onClosePill} onClearFilters={onClearFilters} />
          </div>
          <div className="wrapper-items">
            <div className="items grided">
              {!isSuccess && !data?.paginate?.count
                ? Array.from({ length: 24 }, (_, index) => (
                    <AssetItemPlaceholder key={index} />
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
export default Assets
