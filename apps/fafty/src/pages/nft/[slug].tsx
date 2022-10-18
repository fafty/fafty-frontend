import MainLayout from '../../layouts/main';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { api } from '@fafty-frontend/shared/api';
import { SVGProps, useEffect, useMemo, useState } from 'react';
import { Tabs } from '../../components/nft/tabs';
import { Info } from '../../components/nft/tabs/info';
import { Owners } from '../../components/nft/tabs/owners';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Viewer } from '@fafty-frontend/text/viewer';

const isObjectEmpty = (value: object | string) =>
  typeof value === 'object' ? Object.keys(value).length === 0 : !value;

const TABS = [
  { title: 'Info', value: 'info' },
  { title: 'Owners', value: 'owners' },
  { title: 'History', value: 'history' },
  { title: 'Bids', value: 'bids' },
];

interface BreadcrumbProps {
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  href?: string;
}

interface NftProps {
  category: string;
  name: string;
  description: string;
  asset: {
    src: string;
    dominant_color: string;
  };
  slug: string;
  price: string;
  ticker: string;
  owner: string;
  token: string;
  available_supply_units: number;
  created_at: string;
  updated_at: string;
}

interface ResponceProps {
  record: NftProps;
}

export default function Nft() {
  const param = useRouter();
  const { slug } = param.query;
  const breadcrumb: BreadcrumbProps[] = useMemo(() => [], []);

  const [detail, setDetail] = useState<NftProps | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const renderTabContent = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <Info />;
      case 1:
        return <Owners />;
      default:
        return null;
    }
  }, [tabIndex]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (slug) {
        const response = await api.get<ResponceProps>(`nft/${slug}`);
        if (response.status === 200 && response.data) {
          const { data } = response;
          breadcrumb.push(
            {
              icon: HomeIcon,
              name: 'Fafty',
              href: `/`,
            },
            {
              icon: ChevronRightIcon,
              name: 'Nfts',
              href: `/nfts`,
            },
            {
              icon: ChevronRightIcon,
              name: data.record.name,
              href: `/nft/${data.record.slug}`,
            }
          );
          setDetail(data.record);
          setLoading(false);
        } else {
          setError(true);
        }
      }
    };
    fetchData();

    return () => {
      setLoading(false);
      setError(false);
      setDetail(null);
      breadcrumb.length = 0;
    };
  }, [slug, breadcrumb]);

  useEffect(() => {
    // const fetchData = async () => {
    //   setLoading(true);
    //   const response = await api.get<ResponceProps>(`nft/${slug}`);
    //   if (response.status === 200 && response.data) {
    //     const { data } = response;
    //     setDetail(data.record);
    //     setLoading(false);
    //   } else {
    //     setError(true);
    //   }
    // };
    // fetchData();

    return () => {
      // setLoading(false);
      // setError(false);
      // setDetail(null);
    };
  }, [tabIndex]);

  // if (isLoading) {
  //   return (
  //     <MainLayout title={''} description={''}>
  //       <div className="flex justify-center">
  //         <div className="spinner"></div>
  //       </div>
  //     </MainLayout>
  //   );
  // }

  if (isError) return <div>Failed to load</div>;
  // if (!detail) return <p>No data</p>;

  return (
    <>
      <MainLayout
        title={detail?.name || '...'}
        description={detail?.description || '...'}
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-[1fr,350px] lg:grid-cols-[1fr,400px] gap-y-16 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-13  py-24 px-4">
          <div className="row-start-1 col-span-full">
            <nav
              className="flex px-5 py-5 border dark:bg-neutral-800 text-slate-900 border-t border-gray-100 dark:border-neutral-700 rounded-lg shadow-md"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {breadcrumb &&
                  breadcrumb.map((item) => (
                    <li key={item.name} className="inline-flex items-center">
                      <Link href={item.href || ''}>
                        <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                          {item.icon && (
                            <item.icon
                              className="w-5 h-5 mr-2 "
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
              </ol>
            </nav>
          </div>
          <div className="row-start-2 row-span-2 lg:mr-10">
            <div className="bg-gray-200 flex rounded-2xl overflow-hidden w-full h-full group">
              <div className="flex items-center justify-center bg-gray-50" />
              {detail?.asset?.src && (
                <Image
                  src={detail.asset.src}
                  style={{
                    backgroundColor: detail?.asset?.dominant_color,
                  }}
                  alt={detail.name}
                  // layout="raw"
                  width={400}
                  height={400}
                  className="w-full h-full object-center object-cover"
                />
              )}
              <div className="absolute ml-5 mt-5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none duration-750 delay-300 group-hover:opacity-0 group-hover:delay-1 ease-in-out">
                <div className="inline-flex space-x-2 items-start justify-start">
                  <div className="flex items-center justify-center px-2 pt-2 pb-1.5 bg-gray-800 rounded drop-shadow shadow hover:opacity-100">
                    <p className="text-xs font-bold leading-3 text-gray-50 uppercase">
                      Art
                    </p>
                  </div>
                  <div className="flex items-center justify-center px-2 pt-2 pb-1.5 bg-purple-500 rounded drop-shadow shadow">
                    <p className="text-xs font-bold leading-3 text-gray-50 uppercase">
                      unlockable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-start-2 row-end-4">
            <div className="grid grid-cols-1 gap-y-7">
              <div className="flex flex-col space-y-2 items-start justify-center w-full">
                <div className="flex space-x-2.5">
                  <p className="w-full text-4xl font-bold leading-10 text-slate-900 dark:text-slate-50">
                    {detail?.name}
                  </p>
                  
                </div>
                <div className="inline-flex space-x-2 items-center justify-start">
                  <div className="flex items-center justify-center ml-auto text-sm font-bold text-green-500 border-2 border-green-500 rounded px-1 py-1">
                    <span>2.5 ETH</span>
                  </div>
                  <div className="flex items-center justify-center ml-auto text-sm font-bold text-gray-500 border-2 border-gray-200 dark:border-neutral-700 rounded px-1 py-1">
                    <span>$4,429.87</span>
                  </div>
                  <p className="text-sm font-bold leading-none text-gray-500">
                    {detail?.available_supply_units} in stock
                  </p>
                </div>
              </div>
              <div className="text-base leading-normal text-slate-900 dark:text-slate-50">
                {detail?.description && isObjectEmpty(detail.description) ? (
                  <span className="text-xs font-medium opacity-50">
                    No description
                  </span>
                ) : (
                  detail?.description && <Viewer namespace={'description'} editorState={detail.description as string} />
                )}

               
              </div>
              <div className="flex flex-col space-y-2.5">
                <Tabs
                  tabs={TABS}
                  tabIndex={tabIndex}
                  setTabIndex={setTabIndex}
                />
                {renderTabContent}
              </div>
              <div className="flex flex-col space-y-8 items-start justify-center w-full p-6 bg-white dark:bg-neutral-800 text-slate-900 dark:text-slate-200 border-t border-gray-100 dark:border-neutral-700 rounded-2xl drop-shadow-2xl shadow-md">
                <div className="text-base font-medium leading-normal">
                  <div className="flex space-x-1 items-start justify-start">
                    <span className="text-slate-900 dark:text-slate-300">
                      Highest bid by
                    </span>
                    <span className="text-base font-medium leading-normal">
                      Kohaku Tora
                    </span>
                  </div>
                  <div className="inline-flex space-x-3 items-start justify-start">
                    <span className="text-2xl font-semibold leading-loose text-black dark:text-white">
                      1.46 ETH
                    </span>
                    <span className="text-2xl font-semibold leading-loose text-gray-500">
                      $2,764.89
                    </span>
                  </div>
                </div>
                <div className="inline-flex space-x-2 items-start justify-start w-full">
                  <div className="flex items-center justify-center flex-1 px-6 py-4 bg-blue-500 rounded-full">
                    <p className="text-base font-bold leading-none text-center text-gray-50">
                      Purchase now
                    </p>
                  </div>
                  <div className="flex items-center justify-center flex-1 px-6 py-4 border-2 rounded-full border-gray-200">
                    <p className="text-base font-bold leading-none text-center text-gray-800">
                      Place a bid
                    </p>
                  </div>
                </div>
                <div className="inline-flex space-x-3 items-center justify-start w-full">
                  <p className="text-sm font-medium leading-normal">
                    Service fee
                  </p>
                  <p className="text-sm font-medium leading-normal">1.5%</p>
                  <p className="text-sm leading-normal">2.563 ETH</p>
                  <p className="text-sm leading-normal">$4,540.62</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
