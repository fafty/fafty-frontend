import Link from 'next/link';
import { Masonry } from 'masonic';
import MainLayout from '../../layouts/main';
import { useEffect, useState } from 'react';
import { useAsync, getCollections, GetCollectionsResponseProps } from '@fafty-frontend/shared/api';
import { InfinityLoadChecker } from '../../components/common/infinityLoadChecker';

const mapper = (
  data: GetCollectionsResponseProps,
  prev?: GetCollectionsResponseProps
): GetCollectionsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

const Collections = () => {
  const [offset, setOffset] = useState(0);

  const { data, isLoading, call } = useAsync<GetCollectionsResponseProps, undefined>(
    {
      callback: () => getCollections({ offset, limit: LIMIT }),
      mapper,
    }
  );

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false;

  const loadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  useEffect(() => {
    call();
  }, [offset]);

  return (
    <MainLayout title="collections" description="collections">
      <div className="py-10">
        {!!data?.records.length && (
          <Masonry
            columnGutter={20}
            columnWidth={420}
            items={data.records}
            render={({ data }) => (
              <Link href={`/collections/${data.slug}`}>
                <div className="flex cursor-pointer flex-col h-[340px] w-full rounded overflow-hidden items-center shadow shadow-white">
                  <div
                    className="flex w-full h-3/4 bg-neutral-800"
                    style={{
                      backgroundImage: `url(${data.banner})`,
                    }}
                  />
                  <div className="pl-4 pb-4 pr-4 flex flex-grow w-full items-center">
                    <div className="relative -top-4 border-[4px] border-white rounded w-[70px] h-[70px]">
                      <div
                        className="flex w-full bg-gray-400 h-full"
                        style={{ backgroundImage: `url(${data.cover})` }}
                      />
                    </div>
                    <span className="ml-4 mb-1 text-slate-50">{data.name}</span>
                  </div>
                </div>
              </Link>
            )}
          />
        )}
        <InfinityLoadChecker
          isLoading={isLoading}
          loadMore={loadMore}
          allowLoad={allowLoad}
        />
      </div>
    </MainLayout>
  );
};

export default Collections;
