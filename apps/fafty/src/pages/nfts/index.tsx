import { useRouter } from 'next/router';
import { ItemPlaceholder } from '@fafty-frontend/shared/ui';
import qs from 'qs';
import MainLayout from '../../layouts/main';
import { useAsync, getNfts, GetNftsParamsProps, GetNftsResponseProps, NftProps } from '@fafty-frontend/shared/api';
import { Masonry } from 'masonic';
import Item from '../../components/item';
import {
  BillingType,
  BillingTypeValue,
  PriceFilterProps,
  PriceFiltersValue,
} from '../../components/nfts/filters';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabsProps } from '../../components/nft/tabs';
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker';
import { Panel } from '../../components/common/panel';
import { Pills } from '../../components/nfts/pills';
import { useComponentDidUpdate } from '@fafty-frontend/usehooks';

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

const Tabs = dynamic<TabsProps>(
  () => import('../../components/nft/tabs').then((mod) => mod.Tabs),
  {
    ssr: false,
  }
);

const Price = dynamic<PriceFilterProps>(
  () => import('../../components/nfts/filters/price').then((mod) => mod.Price),
  {
    ssr: false,
  }
);

const mapper = (
  data: GetNftsResponseProps,
  prev?: GetNftsResponseProps
): GetNftsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

type QueryFiltersProps = {
  paginate: {
    limit: number;
    offset: number;
  };
  filters?: FiltersValues;
  sort?: string;
};

const Nfts = () => {
  const { replace, asPath } = useRouter();
  const search = asPath.split('?')[1];

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>({
    paginate: {
      limit: LIMIT,
      offset: 0,
    },
    filters: { ...(qs.parse(search) as FiltersValues) },
  });

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetNftsResponseProps,
    GetNftsParamsProps
  >({
    callback: getNfts,
    mapper,
  });

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false;

  const onChangeFiltersByKey =
    (key: string) => (value: PriceFiltersValue | string | BillingTypeValue) => {
      clearAsyncData();

      setLocalFiltersState((prev) => ({
        paginate: { ...prev.paginate, offset: 0 },
        filters: { ...prev.filters, [key]: value },
      }));
    };

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

    if (nextQuery !== search) {
      replace(`/nfts?${nextQuery}`);
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
    });
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
      data?.paginate?.count ?? 0
    );

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    );
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset]);

  const renderMasonry = useMemo(() => {
    if (!isSuccess && !data?.paginate?.count) {
      return (
        <div className="grid grid-cols-placeholders_nfts_desktop gap-[24px]">
          {Array.from({ length: 10 }, (_, index) => (
            <ItemPlaceholder key={index} />
          ))}
        </div>
      );
    }

    return (
      <Masonry
        columnGutter={24}
        items={items}
        render={({ data }) => {
          if (!Object.keys(data).length) {
            return <ItemPlaceholder />;
          }

          return <Item item={data as NftProps} />;
        }}
      />
    );
  }, [data?.paginate?.count, isSuccess, items]);

  return (
    <MainLayout title={'Nfts | Marketplace'} description={'Nfts | Marketplace'}>
      <div className="flex items-start py-10 relative">
        <div className="flex w-[340px]  items-start flex-shrink-0 sticky top-[120px] pr-5">
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
              <Tabs tabs={TABS} tabIndex={tabIndex} setTabIndex={onChangeTab} />
            </div>
          </div>
          <div className="flex my-4">
            <Pills onClosePill={onClosePill} onClearFilters={onClearFilters} />
          </div>
          <div className="items-slider masonic">{renderMasonry}</div>
          <InfinityLoadChecker
            allowLoad={allowLoad}
            isLoading={isLoading}
            loadMore={loadMore}
          />
        </div>
      </div>
    </MainLayout>
  );
};
export default Nfts;
