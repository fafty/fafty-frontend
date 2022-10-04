import { useRouter } from 'next/router';
import qs from 'qs';
import MainLayout from '../../layouts/main';
import { useAsync } from '../../api/useAsync';
import { getNfts } from '../../api/callbacks/nfts';
import { GetNftsParams, GetNftsResponse } from '../../api/callbacks/nfts/types';
import { Masonry } from 'masonic';
import Item from '../../components/item';
import {
  PriceFilterProps,
  PriceFiltersValue,
} from '../../components/nfts/filters';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabsProps } from '../../components/nft/Tabs';
import { InfinityLoadChecker } from '../../components/common/InfinityLoadChecker';
import { ItemPlaceholder } from '@fafty-frontend/shared/ui';
import { Panel } from '../../components/common/panel';
import { Pills } from '../../components/nfts/pills';
import { NftItem } from '../../api/callbacks/nfts/types';

export type FiltersValues = {
  price: PriceFiltersValue;
  sort: string;
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
  () => import('../../components/nft/Tabs').then((mod) => mod.Tabs),
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
  data: GetNftsResponse,
  prev?: GetNftsResponse
): GetNftsResponse => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

const Nfts = () => {
  const { asPath, replace } = useRouter();
  const [offset, setOffset] = useState({ value: 0 });

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetNftsResponse,
    GetNftsParams
  >({
    callback: getNfts,
    mapper,
  });

  const search = asPath.split('?')[1] || '';
  const filters = qs.parse(search) as FiltersValues;

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false;

  const onChangeFiltersByKey =
    (key: string) => (value: PriceFiltersValue | string) => {
      clearAsyncData();

      setOffset({ value: 0 });

      replace(
        `/nfts${qs.stringify(
          { ...filters, [key]: value },
          { addQueryPrefix: true }
        )}`
      );
    };

  const tabIndex = useMemo(() => {
    const index = TABS.findIndex((tab) => tab.value === filters.sort);

    return index >= 0 ? index : 0;
  }, [filters.sort]);

  const onChangeTab = (index: number) => {
    const tab = TABS[index];

    onChangeFiltersByKey('sort')(tab.value);
  };

  const loadMore = () => {
    setOffset((prev) => ({ value: prev.value + LIMIT }));
  };

  const onClosePill = (key: keyof FiltersValues) => {
    const { [key]: ommited, ...rest } = filters;
    clearAsyncData();

    setOffset({ value: 0 });

    replace(`/nfts${qs.stringify(rest, { addQueryPrefix: true })}`);
  };

  const onClearFilters = () => {
    clearAsyncData();

    setOffset({ value: 0 });

    replace('/nfts');
  };

  useEffect(() => {
    call({
      limit: LIMIT,
      offset: offset.value,
      filters: {
        currency: filters?.price?.currency,
        price: { lg: filters?.price?.from, ge: filters?.price?.to },
      },
      sort: TABS[tabIndex]?.value,
    });
  }, [offset, search]);

  const items = useMemo(() => {
    const count = Math.min(offset.value + LIMIT, data?.paginate?.count ?? 0);

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    );
  }, [data?.paginate?.count, data?.records, offset]);

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

          return <Item item={data as NftItem} />;
        }}
      />
    );
  }, [isSuccess, items]);

  return (
    <MainLayout title={'undefined'} description={'undefined'}>
      <div className="flex items-start py-10 relative">
        <div className="flex w-[340px]  items-start flex-shrink-0 sticky top-[120px] pr-5">
          <div className="flex flex-col bg-white dark:bg-neutral-800 p-2.5  rounded w-full">
            <Panel title="Price" initialState={!!filters.price}>
              <Price
                value={filters.price}
                onChange={onChangeFiltersByKey('price')}
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
