import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAsync } from '../../api/useAsync';
import MainLayout from '../../layouts/main';
import { Masonry } from 'masonic';
import Item from '../../components/item';
import {
  getCollection,
  getCollectionNftsBySlug,
} from '../../api/callbacks/collections';
import {
  GetCollectionNftsBySlugParams,
  GetCollectionNftsBySlugResponse,
  GetCollectionParams,
  GetCollectionResponse,
} from '../../api/callbacks/collections/types';
import { NftItem } from '../../api/callbacks/nfts/types';

const Collection = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug as string;

  const { data, call } = useAsync<GetCollectionResponse, GetCollectionParams>({
    callback: getCollection,
  });

  //todo add filters
  const { data: nftsData, call: callNfts } = useAsync<
    GetCollectionNftsBySlugResponse,
    GetCollectionNftsBySlugParams
  >({
    callback: getCollectionNftsBySlug,
  });

  useEffect(() => {
    if (isReady) {
      call({ slug });
      callNfts({ slug });
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
            {nftsData?.nfts?.records && (
              <Masonry
                columnGutter={24}
                items={nftsData?.nfts?.records}
                render={({ data }) => <Item item={data as NftItem} />}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Collection;
