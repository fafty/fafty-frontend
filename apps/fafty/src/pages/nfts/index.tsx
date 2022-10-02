import MainLayout from '../../layouts/main';
import { useAsync } from '../../api/useAsync';
import { getNfts } from '../../api/callbacks/nfts';
import { GetNftsParams, GetNftsResponse } from '../../api/callbacks/nfts/types';
import { Masonry } from 'masonic';
import Item from '../../components/item';
import {
  PriceFiltersValue,
  PriceFilterProps,
} from '../../components/nfts/filters/Price';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabsProps } from '../../components/nft/Tabs';
import { InfinityLoadChecker } from '../../components/common/InfinityLoadChecker';

type FiltersValues = {
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
  () => import('../../components/nfts/filters/Price').then((mod) => mod.Price),
  {
    ssr: false,
  }
);

const mapper = (data: GetNftsResponse, prev?: GetNftsResponse): GetNftsResponse => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

const Nfts = () => {
  const { asPath, replace } = useRouter();
  const [offset, setOffset] = useState(0);

  const { data, call, isLoading, clearAsyncData } = useAsync<
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

      setOffset(0);

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
    setOffset((prev) => prev + LIMIT);
  };

  useEffect(() => {
    call({ limit: LIMIT, offset, ...filters });
  }, [offset, search]);

  return (
    <MainLayout title={'undefined'} description={'undefined'}>
      <div className="flex items-start py-10 relative">
        <div className="flex w-[340px]  items-start flex-shrink-0 sticky top-[120px] pr-5">
          <div className="flex bg-neutral-800 p-2.5 border rounded w-full">
            <Price
              value={filters.price}
              onChange={onChangeFiltersByKey('price')}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-end">
            <div className="flex">
              <Tabs tabs={TABS} tabIndex={tabIndex} setTabIndex={onChangeTab} />
            </div>
          </div>
          <div className="items-slider masonic">
            {data?.records && (
              <Masonry
                columnGutter={24}
                items={data.records}
                render={({ data }) => <Item item={data} />}
              />
            )}
          </div>
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
