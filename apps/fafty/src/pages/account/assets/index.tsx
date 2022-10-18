import AccountLayout from '../../../layouts/account';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { Viewer } from '@fafty-frontend/text/viewer';
import {
  useAsync,
  getNfts,
  GetNftsParamsProps,
  GetNftsResponseProps,
  NftProps,
} from '@fafty-frontend/shared/api';
import { List } from 'masonic';

import { useEffect, useMemo, useState } from 'react';
import { useComponentDidUpdate } from '@fafty-frontend/usehooks';
import { InfinityLoadChecker } from '../../../components/common/infinityLoadChecker';
import {
  EyeIcon,
  FunnelIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  childVariants,
  variants,
} from '../../../components/forms/asset/constants';
import FormAssetModal from '../../../components/modals/forms/asset';

const isObjectEmpty = (value: object | string) =>
  typeof value === 'object' ? Object.keys(value).length === 0 : !value;
  // Object.keys(JSON.parse(value as string)).length === 0 // && value?.constructor === Object;

const mapper = (
  data: GetNftsResponseProps,
  prev?: GetNftsResponseProps
): GetNftsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] };
  }

  return data;
};

const LIMIT = 10;

type QueryFiltersProps = {
  paginate: {
    limit: number;
    offset: number;
  };
};

const AccountAssets = () => {
  const { replace, asPath } = useRouter();
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState({
    open: false,
    slug: '',
    title: '',
  });
  const search = asPath.split('?')[1];
  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0,
      },
    }
  );

  const { data, call, isLoading, isSuccess, clearAsyncData } = useAsync<
    GetNftsResponseProps,
    GetNftsParamsProps
  >({
    callback: getNfts,
    mapper,
  });

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false;

  const loadMore = () => {
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        offset: prev.paginate.offset + LIMIT,
      },
    }));
  };

  useEffect(() => {
    const { paginate } = localFiltersState;

    call({
      limit: LIMIT,
      offset: paginate.offset,
    });
  }, [localFiltersState]);

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData();

        setLocalFiltersState((prev) => ({
          paginate: { ...prev.paginate, offset: 0 },
        }));
      }
    },
    { search }
  );

  const Visibility = ({ visibility }: { visibility: string | undefined }) => {
    switch (visibility) {
      case 'public':
        return (
          <div className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-green-500">Public</span>
          </div>
        );
      case 'draft':
        return (
          <div className="flex items-center">
            <DocumentIcon className="w-4 h-4 mr-1" />
            <span className="">Draft</span>
          </div>
        );
      case 'private':
        return (
          <div className="flex items-center">
            <EyeIcon className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-gray-500">Private</span>
          </div>
        );
      default:
        return null;
    }
  };

  const Restrictions = ({
    restrictions,
  }: {
    restrictions: string | undefined;
  }) => {
    switch (restrictions) {
      case 'none':
        return <span>None</span>;
      case 'sensitive':
        return (
          <span>
            Sensitive content
            {/* (set by you) */}
          </span>
        );
      case 'sensitive_auto':
        return (
          <span>
            Sensitive content
            {/* (set automatically) */}
          </span>
        );
      case 'complaint_copyright':
        return <span className="text-red-500">Complaint (copyright)</span>;
      default:
        return null;
    }
  };

  type Props = {
    item: NftProps;
  };

  const Item = ({ item }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div
        role="row"
        className="relative h-[6rem] group grid grid-cols-[minmax(300px,_1fr)_minmax(70px,_100px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 py-1 mx-auto w-full transition duration-350 hover:bg-white dark:hover:bg-neutral-800/95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-row w-full p-1 z-2 ml-7 items-center overflow-hidden">
          <div className="relative flex h-17 w-17 flex-shrink-0 items-center justify-center bg-neutral-300 rounded hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
            <Image
              className="relative inline-block h-16 w-16 rounded"
              src={item?.asset.src}
              alt=""
              width={32}
              height={32}
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">{item.name}</p>
            <motion.div className="text-xs font-medium opacity-50 w-[150px] truncate"
              initial={'visible'}
              variants={{
                visible: {
                height: '30px',
                // opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.1,
                  when: 'beforeChildren',
                  staggerChildren: 0.1,
                },
              },
              hidden: {
                height: '20px',
                // opacity: 0,
                
                transition: {
                  duration: 0.2,
                  delay: 0.1
                },
              }}}
              animate={isHovered ? 'hidden' : 'visible'}
              exit={'visible'}
            >
              {item.description && isObjectEmpty(item.description) ? (
                <span className="text-xs font-medium opacity-50">
                  Add description
                </span>
              ) : (
                <Viewer namespace={'description'} editorState={item.description} />
                // <span>
                //   {/* {JSON.stringify(item.description)}
                //   { item.description?.toString()} */}
                // </span>

              )}
            </motion.div>
            <motion.div
              initial={'hidden'}
              variants={variants}
              animate={isHovered ? 'visible' : 'hidden'}
              exit={'hidden'}
            >
              <motion.div variants={childVariants}>
                <div className="py-2 grid grid-flow-col auto-cols-max items-center gap-2">
                  <button
                    type="button"
                    title="Edit"
                    className="w-8 h-8 rounded-full hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out bg-neutral-200 dark:bg-neutral-700"
                    onClick={() => setOpenedFormAssetModal({open: true, slug: item.slug, title: item.name})}
                  >
                    <PencilSquareIcon
                      strokeWidth="2"
                      className="touch-manipulation select-none w-5 h-5"
                    />
                  </button>
                  <button
                    type="button"
                    title="Manage Comments"
                    className="w-8 h-8 rounded-full hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out bg-neutral-200 dark:bg-neutral-700"
                    onClick={() =>
                      void console.log('open modal for manage comments')
                    }
                  >
                    <ChatBubbleBottomCenterTextIcon
                      strokeWidth="2"
                      className="touch-manipulation select-none w-5 h-5"
                    />
                  </button>
                  <Link
                    href="/nft/[slug]"
                    as={`/nft/${encodeURIComponent(item.slug as string)}`}
                  >
                    <a
                      className="w-8 h-8 rounded-full hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out bg-neutral-200 dark:bg-neutral-700"
                      title={`View ${item.name} on the marketplace`}
                    >
                      <EyeIcon
                        strokeWidth="2"
                        className="touch-manipulation select-none w-5 h-5"
                      />
                    </a>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="flex items-center justify-left">
          <Visibility visibility={item.visibility} />
        </div>
        <div className="flex items-center justify-center">
          <Restrictions restrictions={item.restrictions} />
        </div>
        <div className="flex items-center justify-center">
          {item.blockchain}
        </div>
        <div className="flex items-center justify-center">{item.name}</div>
        <div className="flex items-center justify-center">{item.name}</div>
        <div className="flex items-center justify-center">
          {item.visibility === 'public' ? (
            <span className="flex flex-col text-xs font-medium ">
              <span>{item?.published_at}</span>
              <span className="opacity-50">Published</span>
            </span>
          ) : (
            <span className="flex flex-col text-xs font-medium">
              <span>{item?.created_at}</span>
              <span className="opacity-50">Uploaded</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  const ItemPlaceholder = () => {
    return (
      <div
        role="row"
        className="relative h-[6rem] grid grid-cols-[minmax(300px,_1fr)_minmax(70px,_100px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 mx-auto w-full hover:bg-white dark:hover:bg-neutral-800/95"
      >
        <div className="flex flex-row w-full p-1 z-2 ml-7 items-center overflow-hidden">
          <div className="relative flex h-17 w-17 flex-shrink-0 items-center justify-center bg-neutral-300 rounded hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 animate-pulse">
            <span className="relative inline-block h-16 w-16 rounded  "></span>
          </div>
          <div className="ml-4 ">
            <div className="w-[10rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
            <div className="w-[7rem] h-[0.65rem] mt-2 bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />

            {/* <p className="text-xs font-medium opacity-50">
              <span>Add description</span>
            </p> */}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[3rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[2rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[3rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[2rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[3rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[2rem] h-[0.75rem] bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
        </div>
      </div>
    );
  };

  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      data?.paginate?.count ?? 0
    );

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    );
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset]);

  const renderMasonry = useMemo(() => {
    if (!isSuccess && !data?.paginate?.count) {
      return (
        <div className="relative">
          {Array.from({ length: 20 }, (_, index) => (
            <ItemPlaceholder key={index} />
          ))}
        </div>
      );
    }

    return (
      <List
        className="relative grid grid-cols-[minmax(300px,_1fr)_minmax(70px,_100px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 mx-auto w-full"
        // columnGutter={24}
        items={items}
        role="list"
        rowGutter={0}
        render={({ data }) => {
          if (!Object.keys(data).length) {
            return <ItemPlaceholder />;
          }

          return <Item item={data as NftProps} />;
        }}
      />
    );
  }, [data?.paginate?.count, isSuccess, items]);

  return (
    <>
      <AccountLayout
        title={'Assets on your profile'}
        description={'Assets on your profile'}
      >
        <div className="flex flex-1 flex-col w-full">
          <div className="flex p-8">
            <h1 className="text-2xl">Your Assets</h1>
            {/* {hoveredItem} */}
          </div>
          <div
            aria-label="Assets list"
            className="relative flex flex-col mx-auto w-full mb-10"
          >
            <div className="flex flex-col mx-auto w-full sticky top-[82px] z-1 bg-white dark:bg-neutral-800 shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)]">
              <div className="relative flex flex-col ml-8">
                <div>
                  <div className="relative w-full h-[50px] flex flex-row">
                    <div className="pointer-events-none absolute py-2 inset-0 left-0 flex items-center pr-5">
                      <div className="w-8 h-8 rounded-full hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out bg-neutral-200 dark:bg-neutral-700">
                        <FunnelIcon
                          strokeWidth="2"
                          className="touch-manipulation select-none w-5 h-5"
                        />
                      </div>
                    </div>
                    <input
                      autoComplete="off"
                      spellCheck="false"
                      type="search"
                      autoCorrect="off"
                      autoCapitalize="off"
                      name="search"
                      id="search"
                      className="border-2 focus:ring-0 focus:ring-offset-0 block w-full bg-transparent border-transparent dark:border-transparent pl-[2.5rem] pr-3 p-3 focus:border-transparent hover:border-transparent dark:focus:border-transparent dark:hover:border-transparent transition duration-200 ring-0 sm:text-sm md:text-base"
                      placeholder="Filter"
                    />
                  </div>
                </div>
              </div>
              <div
                role="row"
                className="left-0 sticky grid grid-cols-[minmax(300px,_1fr)_minmax(70px,_100px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 mx-auto h-[2rem] w-full"
              >
                <div role="columnheader" className="ml-8 left-0 sticky">
                  Asset
                </div>
                <div className="truncate">Access Options</div>
                <div className="truncate">Restrictions</div>
                <div className="truncate">Views</div>
                <div className="truncate">Comments</div>
                <div className="truncate">Likes</div>
                <div className="truncate">Date</div>
              </div>
            </div>
            {renderMasonry}
            <InfinityLoadChecker
              allowLoad={allowLoad}
              isLoading={isLoading}
              loadMore={loadMore}
            />
          </div>
        </div>
      </AccountLayout>
      {openedFormAssetModal && (
        <FormAssetModal
          title={openedFormAssetModal.title}
          slug={openedFormAssetModal.slug}
          onClose={() => setOpenedFormAssetModal({open: false, title: '', slug: ''})}
          isOpened={openedFormAssetModal.open}
        />
      )}
    </>
  );
};

export default AccountAssets;
