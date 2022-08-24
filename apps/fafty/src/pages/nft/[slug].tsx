import MainLayout from '../../layouts/main';
import Image from 'next/future/image';
import { Tab } from '@headlessui/react'
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import api from '../../api';
import { Fragment, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

interface BreadcrumbProps {
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
  }
  slug: string;
  price: string;
  ticker: string;
  owner: string;
  token: string;
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

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (slug) {
        const response = await api.get<ResponceProps>(`nft/${slug}`);
        if (response.status === 200 && response.data) {
          const { data } = response;
          breadcrumb.push({
            name: 'Fafty',
            href: `/`,
          });
          breadcrumb.push({
            name: data.record.category,
            href: `/assets/${data.record.slug}`,
          });
          breadcrumb.push({
            name: data.record.name,
          });
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
  if (!detail) return <p>No data</p>;

  return (
    <MainLayout title={detail.name} description={detail.description}>
      <div className="grid sm:grid-cols-1 md:grid-cols-[1fr,350px] lg:grid-cols-[1fr,400px] grid-rows-3 gap-y-16 sm:gap-x-2 md:gap-x-4 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-13  py-24 px-4">
        <div className="row-start-1 row-span-2 lg:mr-10 ">
          <div className="bg-gray-200 flex rounded-2xl overflow-hidden w-full h-full group">
            <div className="flex items-center justify-center bg-gray-50" />
            <Image
              src={detail.asset.src}
              style={{
                backgroundColor: detail.asset?.dominant_color,
              }}
              alt={detail.name}
              // layout="raw"
              width={400}
              height={400}
              className="w-full h-full object-center object-cover"
            />
             <div className="absolute ml-5 mt-5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none duration-750 delay-300 group-hover:opacity-0 group-hover:delay-1 ease-in-out">
              <div className=" inline-flex space-x-2 items-start justify-start ">
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
        <div className="row-start-1 row-end-4">
          <div className="grid grid-cols-1 gap-y-7">
            <div className="flex flex-col space-y-2 items-start justify-center w-full">
              <p className="w-full text-4xl font-bold leading-10 text-slate-900 dark:text-slate-50">
                {detail.name}
              </p>
              <div className="inline-flex space-x-2 items-center justify-start">
                <div className="flex items-center justify-center ml-auto text-sm font-bold text-green-500 border-2 border-green-500 rounded px-1 py-1">
                  <span>2.5 ETH</span>
                </div>
                <div className="flex items-center justify-center ml-auto text-sm font-bold text-gray-500 border-2 border-gray-200 dark:border-neutral-700 rounded px-1 py-1">
                  <span>$4,429.87</span>
                </div>
                <p className="text-sm font-bold leading-none text-gray-500">
                  10 in stock
                </p>
              </div>
            </div>
            <div>
              <p className="text-base leading-normal text-slate-900 dark:text-slate-50">
                {/* { detail.description } */}
              </p>
            </div>
            { tabIndex }
            https://codesandbox.io/s/5q8j5?file=/src/Example.jsx
            <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
              <div className="flex flex-col space-y-8 items-start justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full p-1 border-2 rounded-full border-gray-200 dark:border-neutral-700">
                  <Tab.List>
                    <div className="inline-flex space-x-2 items-start justify-start w-96 transition-[background-color] duration-100 ease-linear">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              classNames(
                                'flex items-center justify-center px-3 py-1.5 rounded-full focus:outline-none transition-[background-color] duration-100 ease-linear',
                                {
                                  'bg-gray-700 dark:bg-gray-50': selected
                                }
                              )
                            }
                          >
                            <span
                              className={
                                classNames(
                                  'text-sm font-bold leading-none',
                                  {
                                    'text-gray-50 dark:text-gray-700': selected
                                  }
                                )
                              }
                            >
                              Info
                            </span>
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              classNames(
                                'flex items-center justify-center px-3 py-1.5 rounded-full focus:outline-none transition-[background-color] duration-100 ease-linear',
                                {
                                  'bg-gray-700 dark:bg-gray-50': selected
                                }
                              )
                            }
                          >
                            <span 
                              className={
                                classNames(
                                  'text-sm font-bold leading-none',
                                  {
                                    'text-gray-50 dark:text-gray-700': selected
                                  }
                                )
                              }
                            >
                              Owners
                            </span>
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              classNames(
                                'flex items-center justify-center px-3 py-1.5 rounded-full focus:outline-none transition-[background-color] duration-75 ease-linear',
                                {
                                  'bg-gray-700 dark:bg-gray-50': selected
                                }
                              )
                            }
                          >
                            <span 
                              className={
                                classNames(
                                  'text-sm font-bold leading-none',
                                  {
                                    'text-gray-50 dark:text-gray-700': selected
                                  }
                                )
                              }
                            >
                              History
                            </span>
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          
                          <button
                            className={
                              classNames(
                                'flex items-center justify-center px-3 py-1.5 rounded-full focus:outline-none transition-[background-color] duration-75 ease-linear',
                                {
                                  'bg-gray-700 dark:bg-gray-50': selected
                                }
                              )
                            }
                          >
                            <span 
                              className={
                                classNames(
                                  'text-sm font-bold leading-none',
                                  {
                                    'text-gray-50 dark:text-gray-700': selected
                                  }
                                )
                              }
                            >
                              Bids
                            </span>
                          </button>
                        )}
                      </Tab>
                    </div>
                  </Tab.List>
                </div>
                <div className="flex flex-col space-y-4 items-start justify-start w-full">
                  <div className="flex flex-col space-y-4 items-start justify-start w-full pb-4 border-b-2 border-gray-100 dark:border-neutral-700">
                    <div className="inline-flex space-x-4 items-center justify-start ">
                      <div className="relative" style={{ width: 48, height: 48 }}>
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
                          <img
                            className="w-12 h-full"
                            src="https://via.placeholder.com/49.339351654052734x74"
                          />
                        </div>
                        <div className="inline-flex items-center justify-center w-6 h-6 p-1.5 absolute right-0 bottom-0">
                          <div className="flex-1 h-full rounded-full">
                            <img
                              className="flex-1 h-full rounded-full"
                              src="https://via.placeholder.com/12x12"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                        <p className="text-sm leading-normal text-gray-500">
                          Owner
                        </p>
                        <div className="inline-flex space-x-1 items-start justify-start">
                          <p className="text-sm font-medium leading-normal text-gray-800">
                            Raquel
                          </p>
                          <p className="text-sm font-medium leading-normal text-gray-800">
                            Will
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 items-start justify-start w-full pb-4 border-b-2 border-gray-100 dark:border-neutral-700">
                    <div className="inline-flex space-x-4 items-center justify-start">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                        <img
                          className="flex-1 h-full"
                          src="https://via.placeholder.com/48x71.9912109375"
                        />
                      </div>
                      <div className="inline-flex flex-col space-y-0.5 items-start justify-start">
                        <p className="text-sm leading-normal text-gray-500">
                          Creator
                        </p>
                        <div className="inline-flex space-x-1 items-start justify-start">
                          <p className="text-sm font-medium leading-normal text-gray-800">
                            Selina
                          </p>
                          <p className="text-sm font-medium leading-normal text-gray-800">
                            Mayert
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Group>
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
  );
}
