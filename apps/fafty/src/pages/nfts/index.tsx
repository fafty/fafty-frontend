import Link from 'next/link';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAsync } from '../../api/useAsync';
import { getCollections } from '../../api/callbacks/collections';
import { GetCollectionResponse } from '../../api/callbacks/collections/types';
import { Masonry } from 'masonic';
import MainLayout from '../../layouts/main';
import { useOnScreen } from '@fafty-frontend/usehooks';

const mapper = (
  data: GetCollectionResponse,
  prev?: GetCollectionResponse
): GetCollectionResponse => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

const Collections = () => {
  const [offset, setOffset] = useState(0);

  const loaderAreaRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useOnScreen<HTMLDivElement>(
    loaderAreaRef as MutableRefObject<HTMLDivElement>
  );

  const { data, isLoading, call } = useAsync<GetCollectionResponse, undefined>({
    callback: () => getCollections({ offset, limit: LIMIT }),
    mapper,
  });

  const allowLoad = data ? data?.records.length < data?.paginate?.count : true;

  const loadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  useEffect(() => {
    if (!isLoading && onScreen && allowLoad) {
      loadMore();
    }
  }, [onScreen, isLoading, allowLoad]);

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
              <Link href="#">
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
        <div className="flex relative">
          <div className="flex absolute b-full h-[300px]" ref={loaderAreaRef} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Collections;
