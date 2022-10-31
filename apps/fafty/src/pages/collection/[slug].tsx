import { useRouter } from 'next/router';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import MainLayout from '../../layouts/main';
import Item from '../../components/items/asset/item';
import Image from 'next/future/image';
import { Viewer } from '@fafty-frontend/text/viewer';

import {
  useAsync,
  getCollection,
  getCollectionAssetsBySlug,
  GetCollectionAssetsBySlugParamsProps,
  GetCollectionAssetsBySlugResponseProps,
  GetCollectionParamsProps,
  GetCollectionResponseProps,
  AssetProps,
} from '@fafty-frontend/shared/api';
import {
  BillingType,
  BillingTypeValue,
  PriceFilterProps,
  PriceFiltersValue,
} from '../../components/assets/filters';
import { InfinityLoadChecker } from '../../components/common/InfinityLoadChecker';
import {
  AssetItemPlaceholder,
  AssetTabsPlaceholder,
} from '@fafty-frontend/shared/ui';
import { useComponentDidUpdate } from '@fafty-frontend/usehooks';
import dynamic from 'next/dynamic';
import qs from 'qs';
import { Pills } from '../../components/assets/pills';
import { Panel } from '../../components/common/panel';

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
];

// const Tabs = dynamic<TabsProps>(
//   () => import('../../components/asset/tabs').then((mod) => mod.Tabs),
//   {
//     ssr: false,
//   }
// );
const Tabs = lazy(() => import('../../components/asset/tabs'));

const Price = dynamic<PriceFilterProps>(
  () =>
    import('../../components/assets/filters/price').then((mod) => mod.Price),
  {
    ssr: false,
  }
);

const mapper = (
  assetsData: GetCollectionAssetsBySlugResponseProps,
  prev?: GetCollectionAssetsBySlugResponseProps
): GetCollectionAssetsBySlugResponseProps => {
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
            ...assetsData.record.assets.records,
          ],
        },
      },
    };
  }

  return assetsData;
};

const LIMIT = 20;

type QueryFiltersProps = {
  paginate: {
    limit: number;
    offset: number;
  };
  filters?: FiltersValues;
  sort?: string;
};

const Collection = () => {
  const { query, isReady, replace, asPath } = useRouter();
  const slug = query.slug as string;

  const search = asPath.split('?')[1];

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0,
      },
      filters: { ...(qs.parse(search) as FiltersValues) },
    }
  );

  const onChangeFiltersByKey =
    (key: string) => (value: PriceFiltersValue | string | BillingTypeValue) => {
      clearAsyncData();

      setLocalFiltersState((prev) => ({
        paginate: { ...prev.paginate, offset: 0 },
        filters: { ...prev.filters, [key]: value },
      }));
    };

  const { data, call } = useAsync<
    GetCollectionResponseProps,
    GetCollectionParamsProps
  >({
    callback: getCollection,
  });

  //todo add filters
  const {
    data: assetsData,
    call: callAssets,
    isLoading: isAssetsLoading,
    isSuccess: isAssetsSuccess,
    clearAsyncData,
  } = useAsync<
    GetCollectionAssetsBySlugResponseProps,
    GetCollectionAssetsBySlugParamsProps
  >({
    callback: getCollectionAssetsBySlug,
    mapper,
  });

  const allowLoad = assetsData
    ? !isAssetsLoading &&
      assetsData?.record.assets.records.length <
        assetsData?.record.assets.paginate?.count
    : false;

  useEffect(() => {
    if (isReady) {
      call({ slug });
      callAssets({ slug, limit: LIMIT, offset: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const tabIndex = useMemo(() => {
    const index = TABS.findIndex(
      (tab) => tab.value === localFiltersState?.filters?.sort
    );

    return index >= 0 ? index : 0;
  }, [localFiltersState?.filters?.sort]);

  const onChangeTab = (index: number) => {
    const tab = TABS[index];

    onChangeFiltersByKey('sort')(tab.value);
  };

  const loadMore = () => {
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        offset: prev.paginate.offset + LIMIT,
      },
    }));
  };

  const onClosePill = (key: keyof FiltersValues) => {
    const { [key]: ommited, ...rest } = localFiltersState.filters || {};
    clearAsyncData();

    setLocalFiltersState((prev) => ({
      paginate: { ...prev.paginate },
      filters: { ...rest },
    }));
  };

  const onClearFilters = () => {
    clearAsyncData();

    setLocalFiltersState((prev) => ({
      paginate: { ...prev.paginate, offset: 0 },
    }));
  };

  useEffect(() => {
    const { filters, paginate } = localFiltersState;
    const nextQuery = qs.stringify(filters);

    if (data && nextQuery !== search) {
      replace(`/collection/${data.record.slug}?${nextQuery}`);
    }

    slug &&
      callAssets({
        slug: slug,
        limit: LIMIT,
        offset: paginate.offset,
        filters: {
          currency: filters?.price?.currency,
          price: { lg: filters?.price?.from, ge: filters?.price?.to },
          // billing_type: filters?.billing_type,
        },
        sort: TABS[tabIndex]?.value || TABS[0].value,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState]);

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData();

        setLocalFiltersState((prev) => ({
          paginate: { ...prev.paginate, offset: 0 },
        }));
      }
    },
    { search }
  );

  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      assetsData?.record.assets?.paginate?.count ?? 0
    );
    console.log('count', count, assetsData);

    return Array.from(
      { length: count },
      (_, index) => assetsData?.record.assets.records[index] ?? {}
    ) as AssetProps[];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assetsData?.record?.assets?.paginate?.count,
    assetsData?.record?.assets?.records,
    localFiltersState.paginate.offset,
  ]);

  const isObjectEmpty = (value: object | string) =>
    typeof value === 'object' ? Object.keys(value).length === 0 : !value;

  return (
    <MainLayout title={`Collection ${slug}`} description={`Collection ${slug}`}>
      <div className="flex flex-col py-10 h-full w-full">
        <div className="flex">
          {/* <div className="w-48 h-48 bg-neutral-800 shadow rounded-full" /> */}
          <div className="relative flex h-48 w-48 flex-shrink-0 items-center justify-center bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
            {data && data?.record.cover && (
              <Image
                className="relative flex flex-shrink-0 w-full h-full rounded-full ring-4 ring-white"
                src={data?.record.cover.src || ''}
                alt=""
                width={100}
                height={100}
              />
            )}
          </div>
          <div className="flex flex-col ml-5">
            <h3 className="text-2xl font-bold">{data?.record.name}</h3>
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
            {/* {data?.record &&
              Object.entries(data.record).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="text-white font-bold text-lg">{key}</span>
                  <span className="ml-2.5 text-neutral-500 text-lg">
                    {typeof value === 'string' ? value : ''}
                  </span>
                </div>
              ))} */}
          </div>
        </div>
        <div className="flex mt-10 w-full">
          <div className="relative flex items-start w-full py-10 ">
            <div className="flex w-[250px] items-start flex-shrink-0 sticky top-[120px] pr-5">
              <div className="flex flex-col bg-white dark:bg-neutral-800 p-2.5  rounded w-full">
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
            <div className="flex flex-col w-full">
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
              <div className="flex my-4">
                <Pills
                  onClosePill={onClosePill}
                  onClearFilters={onClearFilters}
                />
              </div>
              <div className="wrapper-items">
                <div className="items grided">
                  {!isAssetsSuccess && !assetsData?.record.assets.paginate.count
                    ? Array.from({ length: 24 }, (_, index) => (
                        <AssetItemPlaceholder key={index} />
                      ))
                    : items.map((item) => (
                        <Item key={item.token} item={item} />
                      ))}
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
      </div>
    </MainLayout>
  );
};

export default Collection;
