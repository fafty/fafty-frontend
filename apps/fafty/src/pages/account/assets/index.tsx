import Link from 'next/link';
import Image from 'next/future/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAsync } from '../../../api/useAsync';
import { getNfts } from '../../../api/callbacks/nfts';
import { GetNftResponse } from '../../../api/callbacks/nfts/types';
import { Masonry } from 'masonic';
import AccountLayout from '../../../layouts/account';
import { useOnScreen } from '@fafty-frontend/usehooks';
const mapper = (
  data: GetNftResponse,
  prev?: GetNftResponse
): GetNftResponse => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

const Nfts = () => {
  const [offset, setOffset] = useState(0);

  const loaderAreaRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useOnScreen<HTMLDivElement>(
    loaderAreaRef as MutableRefObject<HTMLDivElement>
  );

  const { data, isLoading, call } = useAsync<GetNftResponse, undefined>({
    callback: () => getNfts({ offset, limit: LIMIT }),
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
    <AccountLayout title="My Assets" description="My assets">
      <div className="mt-3">
        <div className="intro-x flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">Transactions</h2>
        </div>
        <div className="mt-5">
          {!!data?.records.length && (
            <Masonry
              columnGutter={20}
              columnWidth={1000}
              items={data.records}
              render={({ data }) => (
                <div className="intro-x">
                  <div className="shadow-md px-5 py-3 mb-3 flex items-center zoom-in">
                    <div className="w-10 h-10 flex-none image-fit rounded-lg overflow-hidden">
                      <Image
                        src={data.asset.src}
                        style={{backgroundColor: data.asset?.dominant_color}}
                        loading="eager"
                        alt={data.name}
                        layout="raw"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="ml-4 mr-auto">
                      <div className="font-medium">{data.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        15 July 2022
                      </div>
                    </div>
                    <div className="text-success">
                      <Link href={`/nft/${data.slug}`}>
                        <a className="button button--lg w-full sm:w-auto flex items-center justify-center bg-theme-1 text-white">
                          View
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            />
          )}
          <div className="flex relative">
            <div className="flex absolute b-full h-[300px]" ref={loaderAreaRef} />
          </div>
        </div>
      </div>
      
      {/* <div className="py-10">
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
      </div> */}
    </AccountLayout>
  );
};

export default Nfts;
