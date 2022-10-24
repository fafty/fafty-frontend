import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '../../layouts/main';
import { Masonry } from 'masonic';
import Item from '../../components/items/asset/item';
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

const Collection = () => {
  const { query, isReady } = useRouter();
  const slug = query.slug as string;

  const { data, call } = useAsync<GetCollectionResponseProps, GetCollectionParamsProps>({
    callback: getCollection,
  });

  //todo add filters
  const { data: assetsData, call: callAssets } = useAsync<
    GetCollectionAssetsBySlugResponseProps,
    GetCollectionAssetsBySlugParamsProps
  >({
    callback: getCollectionAssetsBySlug,
  });

  useEffect(() => {
    if (isReady) {
      call({ slug });
      callAssets({ slug });
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
            {assetsData?.assets?.records && (
              <Masonry
                columnGutter={24}
                items={assetsData?.assets?.records}
                render={({ data }) => <Item item={data as AssetProps} />}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Collection;
