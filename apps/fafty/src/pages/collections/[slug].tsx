import { useAsync } from '../../api/useAsync';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '../../layouts/main';
import { GetNftsParams, GetNftsResponse } from '../../api/callbacks/nfts/types';
import { getNfts } from '../../api/callbacks/nfts';
import { Masonry } from 'masonic';
import Item from '../../components/item';
import { getCollection } from '../../api/callbacks/collections';
import {
  GetCollectionParams,
  GetCollectionResponse,
} from '../../api/callbacks/collections/types';

const Collection = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug as string;

  const { data, call } = useAsync<GetCollectionResponse, GetCollectionParams>({
    callback: getCollection,
  });

  //todo add filters
  const { data: nftsData } = useAsync<GetNftsResponse, GetNftsParams>({
    callback: getNfts,
    withMount: true,
  });

  useEffect(() => {
    if (isReady) {
      call({ slug });
    }
  }, [isReady]);

  return (
    <MainLayout title={`Collection ${slug}`} description={`Collection ${slug}`}>
      <div className="flex flex-col py-10 h-full w-full">
        <div className="flex">
          <div className="w-48 h-48 bg-neutral-800 shadow rounded-full" />
          <div className="flex flex-col ml-5">
            {data?.record &&
              Object.entries(data.record).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="text-white font-bold text-lg">{key}</span>
                  <span className="ml-2.5 text-neutral-500 text-lg">
                    {typeof value === 'string' ? value : ''}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex mt-10">
          <div className="items-slider masonic">
            {nftsData?.records && (
              <Masonry
                columnGutter={24}
                items={nftsData.records}
                render={({ data }) => <Item item={data} />}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Collection;
