import { format } from 'date-fns'

import AccountLayout from '../../../layouts/account'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Viewer } from '@fafty/text/viewer'
import {
  useAsync,
  getUserAssets,
  GetUserAssetsResponseProps,
  AssetProps,
  GetUserAssetsCallbackProps
} from '@fafty/shared/api'
import { List } from 'masonic'

import { useEffect, useMemo, useState } from 'react'
import { useComponentDidUpdate } from '@fafty/usehooks'
import {
  EyeIcon,
  ChatBubbleBottomCenterTextIcon,
  PencilSquareIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  childVariants,
  variants
} from '../../../components/forms/asset/constants'
import FormAssetModal from '../../../components/modals/forms/asset'
import FilterBar from '../../../components/common/filterBar'
import { InfinityLoadChecker } from '../../../components/common/infinityLoadChecker'
import {
  TypeProps,
  OnChangeValueProps
} from '../../../components/common/filterBar/types'

import {
  BLOCKCHAIN_CHECKS,
  VISIBILITY_CHECKS,
  RESTRICTIONS_CHECKS,
  CONTENT_TYPE_CHECKS
} from '../../../constants/user/assets'

import { AssetsUserFilterStateType } from '../../../types/user/assets'

const isObjectEmpty = (value: object | string | null) => {
  return (
    (!value && value == null) ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    (typeof value === 'object' &&
      Object.keys(value).length === 0 &&
      Object.getPrototypeOf(value) === Object.prototype)
  )
}

const mapper = (
  data: GetUserAssetsResponseProps,
  prev?: GetUserAssetsResponseProps
): GetUserAssetsResponseProps => {
  if (prev && Object.keys(prev).length) {
    return { ...prev, ...data, records: [...prev.records, ...data.records] }
  }

  return data
}

const LIMIT = 10

// type FiltersState

type QueryFiltersProps = AssetsUserFilterStateType & {
  paginate: {
    limit: number
    offset: number
  }
}

const ASSETS_FILTERS = [
  {
    title: 'Visibility',
    value: 'visibility',
    type: TypeProps.ARRAY,
    options: VISIBILITY_CHECKS
  },
  {
    title: 'Restrictions',
    value: 'restrictions',
    type: TypeProps.ARRAY,
    options: RESTRICTIONS_CHECKS
  },
  {
    title: 'Blockchain',
    value: 'blockchain',
    type: TypeProps.ARRAY,
    options: BLOCKCHAIN_CHECKS
  },
  {
    title: 'Price',
    value: 'price',
    type: TypeProps.RANGE,
    params: {
      firstTitle: 'min',
      secondTitle: 'max',
      firstKey: 'min',
      secondKey: 'max'
    }
  },
  {
    title: 'Type',
    value: 'type',
    type: TypeProps.ARRAY,
    options: CONTENT_TYPE_CHECKS
  }
]

const AccountAssets = () => {
  const { asPath } = useRouter()
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState({
    open: false,
    slug: '',
    title: ''
  })

  const search = asPath.split('?')[1]
  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0
      }
    }
  )

  const onChangeFilters = (key: string, value: OnChangeValueProps) => {
    clearAsyncData()

    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: { limit: LIMIT, offset: 0 },
      [key]: value
    }))
  }

  const onCloseTag = (key: keyof AssetsUserFilterStateType) => {
    const { [key]: deletedProp, ...rest } = localFiltersState
    clearAsyncData()

    setLocalFiltersState({ ...rest, paginate: { limit: LIMIT, offset: 0 } })
  }

  const { data, call, isLoading, isSuccess, clearAsyncData, dataUpdater } =
    useAsync<GetUserAssetsResponseProps, GetUserAssetsCallbackProps>({
      callback: getUserAssets,
      mapper
    })

  const onUpdateAsset = (putAsset) => {
    dataUpdater((prev) => {
      if (prev) {
        const newRecords = prev.records.map((record) => {
          if (record.slug === putAsset.record.slug) {
            return { ...record, ...putAsset.record }
          }

          return record
        })

        return { ...prev, records: newRecords }
      }

      return prev
    })
  }

  const { paginate, ...panelFilterState } = localFiltersState

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false

  const loadMore = () => {
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        offset: prev.paginate.offset + LIMIT
      }
    }))
  }

  useEffect(() => {
    const { paginate, ...restFilters } = localFiltersState

    call({
      address: 'abcd',
      params: {
        ...restFilters,
        limit: LIMIT,
        offset: paginate.offset
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  useComponentDidUpdate(
    (prev) => {
      if (!!prev.search && !search) {
        clearAsyncData()

        setLocalFiltersState((prev) => ({
          paginate: { ...prev.paginate, offset: 0 }
        }))
      }
    },
    { search }
  )

  const Visibility = ({
    visibility,
    date
  }: {
    visibility: string | undefined
    date: string
  }) => {
    switch (visibility) {
      case 'public':
        return (
          <>
            <div className="flex flex-col">
              <div className="flex items-center text-green-500">
                <EyeIcon className="mr-1 h-4 w-4" />
                <span className="">Public</span>
              </div>
              <span className="flex flex-col text-xs font-medium opacity-50">
                <span>Published:</span>{' '}
                <span>{format(new Date(date), 'dd LLL yyyy')}</span>
              </span>
            </div>
          </>
        )
      case 'draft':
        return (
          <>
            <div className="flex flex-col">
              <div className="flex items-center">
                <DocumentIcon className="mr-1 h-4 w-4" />
                <span className="">Draft</span>
              </div>
              <span className="flex flex-col text-xs font-medium opacity-50">
                <span>Uploaded:</span>{' '}
                <span>{format(new Date(date), 'dd LLL yyyy')}</span>
              </span>
            </div>
          </>
        )
      case 'private':
        return (
          <div className="flex items-center">
            <EyeIcon className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Private</span>
          </div>
        )
      default:
        return null
    }
  }

  const Restrictions = ({
    restrictions
  }: {
    restrictions: string | undefined
  }) => {
    switch (restrictions) {
      case 'none':
        return <span>None</span>
      case 'sensitive':
        return <span>Sensitive content {/* (set by you) */}</span>
      case 'sensitive_auto':
        return <span>Sensitive content {/* (set automatically) */}</span>
      case 'complaint_copyright':
        return <span className="text-red-500">Complaint (copyright)</span>
      default:
        return null
    }
  }

  type Props = {
    item: AssetProps
  }

  const Item = ({ item }: Props) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
      <div
        className="duration-350 group relative mx-auto grid h-[6rem] w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 py-1 text-sm transition hover:bg-white dark:hover:bg-neutral-800/95"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="z-2 ml-7 flex w-full flex-row items-center overflow-hidden p-1">
          <div
            className="h-17 w-17 relative flex flex-shrink-0 items-center justify-center rounded bg-neutral-200 focus:outline-none dark:bg-neutral-700"
            style={{ backgroundColor: item.media.dominant_color || '' }}
          >
            <Image
              className="relative inline-block h-16 w-16 rounded"
              src={item?.media.src}
              alt={item.name}
              width={32}
              height={32}
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">{item.name}</p>
            <motion.div
              className="w-[150px] truncate text-xs  font-medium text-neutral-500"
              initial={'visible'}
              variants={{
                visible: {
                  height: '30px',
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                    delay: 0.1,
                    when: 'beforeChildren',
                    staggerChildren: 0.1
                  }
                },
                hidden: {
                  height: '20px',
                  opacity: 0.7,
                  filter: 'blur(0.6px)',
                  transition: {
                    duration: 0.2,
                    delay: 0.2
                  }
                }
              }}
              animate={isHovered ? 'hidden' : 'visible'}
              exit={'visible'}
            >
              {isObjectEmpty(item.description) ? (
                <span className="text-xs font-medium opacity-50">
                  Add description
                </span>
              ) : (
                <Viewer
                  namespace={'description'}
                  editorState={item.description}
                />
              )}
            </motion.div>
            <motion.div
              initial={'hidden'}
              variants={variants}
              animate={isHovered ? 'visible' : 'hidden'}
              exit={'hidden'}
            >
              <motion.div variants={childVariants}>
                <div className="grid auto-cols-max grid-flow-col items-center gap-2 py-2">
                  <button
                    type="button"
                    title="Edit"
                    className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                    onClick={() =>
                      setOpenedFormAssetModal({
                        open: true,
                        slug: item.slug,
                        title: item.name
                      })
                    }
                  >
                    <PencilSquareIcon
                      strokeWidth="2"
                      className="h-5 w-5 touch-manipulation select-none"
                    />
                  </button>
                  <button
                    type="button"
                    title="Manage Comments"
                    className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                    onClick={() =>
                      void console.log('open modal for manage comments')
                    }
                  >
                    <ChatBubbleBottomCenterTextIcon
                      strokeWidth="2"
                      className="h-5 w-5 touch-manipulation select-none"
                    />
                  </button>
                  <Link
                    href="/asset/[slug]"
                    as={`/asset/${encodeURIComponent(item.slug)}`}
                    className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
                    title={`View ${item.name} on the marketplace`}
                  >
                    <EyeIcon
                      strokeWidth="2"
                      className="h-5 w-5 touch-manipulation select-none"
                    />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {item.collection && item.collection.cover ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col">
              <div className="relative flex h-10 w-10 overflow-hidden rounded-full border-2">
                <div
                  className="bg-base-300"
                  style={{
                    backgroundColor: item.collection.cover.dominant_color || ''
                  }}
                >
                  <Image
                    className="relative inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={item.collection?.cover.src || ''}
                    alt={item.collection?.name || ''}
                    width={36}
                    height={36}
                  />
                </div>
              </div>
              <div className="mt-1 w-full">
                <p className="block truncate text-xs font-medium">
                  {item.collection?.name || ''}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="justify-left flex items-center">
            Without collection
          </div>
        )}
        <div className="justify-left flex items-center">
          <Visibility
            visibility={item.visibility}
            date={item.published_at || item.created_at}
          />
        </div>
        <div className="justify-left flex items-center">
          <Restrictions restrictions={item.restrictions} />
        </div>
        <div className="justify-left flex items-center">
          <div className="flex flex-col space-x-1">
            <span className="opacity-50">Available:</span>
            <div className="flex flex-row space-x-1">
              <span>{item.available_supply_units}</span>
              <span className="opacity-50">of</span>
              <span>{item.supply_units}</span>
            </div>
          </div>
        </div>
        <div className="justify-left flex items-center">{item.blockchain}</div>
      </div>
    )
  }

  /**
   * @name ItemPlaceholder
   * @description Item placeholder component.
   * @returns {JSX.Element}
   */
  const ItemPlaceholder = (): JSX.Element => {
    return (
      <div className="duration-350 group relative mx-auto grid h-[6rem] w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 py-1 text-sm transition hover:bg-white dark:hover:bg-neutral-800/95">
        <div className="z-2 ml-7 flex w-full flex-row items-center overflow-hidden p-1">
          <div className="h-17 w-17 relative flex flex-shrink-0 animate-pulse items-center justify-center rounded bg-neutral-300 hover:bg-neutral-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
            <span className="relative inline-block h-16 w-16 rounded"></span>
          </div>
          <div className="ml-4 -mt-2">
            <div className="h-[0.75rem] w-[10rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
            <div className="mt-2 h-[0.55rem] w-[7rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-800" />
          </div>
        </div>
        <div className="justify-left flex items-center">
          <div className="flex flex-col">
            <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <div className="mt-1 h-[0.75rem] w-[5rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>
        <div className="justify-left flex items-center">
          <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="justify-left flex items-center">
          <div className="h-[0.75rem] w-[3rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="justify-left flex items-center">
          <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="justify-left flex items-center">
          <div className="h-[0.75rem] w-[2rem] animate-pulse rounded-sm bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </div>
    )
  }

  // TODO: update record on changes on modal saves.
  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      data?.paginate?.count ?? 0
    )

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    )
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  const renderMasonry = useMemo(() => {
    if (!isSuccess && !data?.paginate?.count) {
      return (
        <div className="relative">
          {Array.from({ length: 20 }, (_, index) => (
            <ItemPlaceholder key={index} />
          ))}
        </div>
      )
    }

    return (
      <List
        className="relative mx-auto grid w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(70px,_100px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1"
        items={items}
        role="list"
        rowGutter={0}
        render={({ data }) => {
          if (!Object.keys(data).length) {
            return <ItemPlaceholder />
          }

          return <Item item={data as AssetProps} />
        }}
      />
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.paginate?.count, isSuccess, items])

  return (
    <>
      <AccountLayout
        title={'Assets on your profile'}
        description={'Assets on your profile'}
      >
        <div className="flex w-full flex-1 flex-col">
          <div className="flex p-8">
            <h1 className="text-2xl">Your Assets</h1>
          </div>
          <div
            aria-label="Assets list"
            className="relative mx-auto mb-10 flex w-full flex-col"
          >
            <div className="z-1 sticky top-[82px] mx-auto flex w-full flex-col bg-white shadow-[0_10px_5px_-10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
              <FilterBar<AssetsUserFilterStateType>
                filters={ASSETS_FILTERS}
                onCloseTag={onCloseTag}
                values={panelFilterState}
                onChange={onChangeFilters}
              />
              <div className="relative">
                <div className="sticky left-0 mx-auto grid h-[2rem] w-full grid-cols-[minmax(300px,_400px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)_minmax(100px,_120px)] gap-x-1 text-sm">
                  <div className="sticky left-0 ml-8">Asset</div>
                  <div className="truncate">Collection</div>
                  <div className="truncate">Access Options</div>
                  <div className="truncate">Restrictions</div>
                  <div className="truncate">Supply</div>
                  <div className="truncate">Blockchain</div>
                </div>
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
      {openedFormAssetModal.open && (
        <FormAssetModal
          onPutSuccess={onUpdateAsset}
          title={openedFormAssetModal.title}
          slug={openedFormAssetModal.slug}
          onClose={() =>
            setOpenedFormAssetModal({ open: false, title: '', slug: '' })
          }
          isOpened={openedFormAssetModal.open}
        />
      )}
    </>
  )
}

export default AccountAssets
