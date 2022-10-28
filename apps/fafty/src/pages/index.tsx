import MainLayout from '../layouts/main';
import Hero from '../components/home/hero';
import Items from '../components/items';

import { AssetProps, BundleProps, CollectionProps, GetAssetsResponseProps, GetBundlesResponseProps, GetCollectionsResponseProps } from '@fafty-frontend/shared/api';
import { useEffect, useState } from 'react';
import { api } from '@fafty-frontend/shared/api';
import Link from 'next/link';

// type ResponceProps = {
//   records: AssetProps[];
// };

// type ResponceProps = {
//   records: AssetProps[];
// };

export default function Home(): JSX.Element {
  const [assets, setAssets] = useState<AssetProps[] | null>(null);
  const [bundles, setBundles] = useState<BundleProps[] | null>(null);
  const [collections, setCollections] = useState<CollectionProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<GetAssetsResponseProps>(`assets`);
      if (response.status === 200 && response.data) {
        const { data } = response;
        setAssets(data.records);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<GetBundlesResponseProps>(`bundles`);
      if (response.status === 200 && response.data) {
        const { data } = response;
        setBundles(data.records);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get<GetCollectionsResponseProps>(`collections`);
      if (response.status === 200 && response.data) {
        const { data } = response;

        setCollections(data.records);
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout title={'undefined'} description={'undefined'} className="container">
      <Hero />
      <div className="mt-10">
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Collections</h3>
          </div>
          <div className="ml-auto right-0">
            <Link href="/collections">
              <a className="text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 mb-1 w-full rounded-[7px] p-3 focus:outline-none transition duration-150 ease-in-out">
                See all Collection
              </a>
            </Link>
          </div>
        </div>
        {collections && <Items type="collection" items={collections} />}
      </div>
      <div className="mt-10">
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Bundles</h3>
          </div>
          <div className="ml-auto right-0">
            <Link href="/collections">
              <a className="text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 mb-1 w-full rounded-[7px] p-3 focus:outline-none transition duration-150 ease-in-out">
                See all Bundles
              </a>
            </Link>
          </div>
        </div>
        {bundles && <Items type="bundle" items={bundles} />}
      </div>
      <div className="mt-10">
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <h3 className="font-semibold">Top Nfts</h3>
          </div>
          <div className="ml-auto right-0">
            <Link href="/collections">
              <a className="text-gray-900 dark:text-gray-50 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 mb-1 w-full rounded-[7px] p-3 focus:outline-none transition duration-150 ease-in-out">
                See all Nfts
              </a>
            </Link>
          </div>
        </div>
        {assets && <Items type="asset" items={assets} />}
      </div>
    </MainLayout>
  );
}
