import { ReactComponent as EmptyIllustration } from '../../../assets/empty.svg'

import AccountLayout from '../../../layouts/account'
import { useRouter } from 'next/router'
import { useAsync, getUserAssets } from '@fafty/shared/api'
import {
  AssetType,
  GetUserAssetsResponseType,
  GetUserAssetsParamsType
} from '@fafty/shared/types'
import { List } from 'masonic'

import { useEffect, useMemo, useState } from 'react'
import { useComponentDidUpdate } from '@fafty/usehooks'
import { motion } from 'framer-motion'
import FormAssetModal from '../../../components/modals/forms/asset'
import FilterBar from '../../../components/common/filterBar'
import { InfinityLoadChecker } from '../../../components/common/infinityLoadChecker'
import {
  TypeProps,
  OnChangeValueProps
} from '../../../components/common/filterBar/types'
import { Item } from '../../../components/items/account/asset'
import { ItemPlaceholder } from '../../../components/items/account/asset/itemPlaceholder'
import {
  BLOCKCHAIN_CHECKS,
  VISIBILITY_CHECKS,
  RESTRICTIONS_CHECKS,
  CONTENT_TYPE_CHECKS
} from '../../../constants/user/assets'

import { AssetsUserFilterStateType } from '@fafty/shared/types'
import qs from 'qs'

const mapper = (
  data: GetUserAssetsResponseType,
  prev?: GetUserAssetsResponseType
): GetUserAssetsResponseType => {
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
      firstKey: 'ge',
      secondKey: 'le'
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
  const { asPath, replace } = useRouter()
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState({
    open: false,
    slug: '',
    title: ''
  })

  const search = asPath.split('?')[1] ?? ''
  const params = qs.parse(search) as Omit<QueryFiltersProps, 'paginate'>

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0
      },
      ...params
    }
  )

  const onChangeFilters = (key: string, value: OnChangeValueProps) => {
    clearAsyncData()
    console.log('localFiltersState', localFiltersState)
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
    useAsync<GetUserAssetsResponseType, GetUserAssetsParamsType>({
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
    const nextQuery = qs.stringify(restFilters)

    if (nextQuery !== search) {
      replace(`/account/assets?${nextQuery}`)
    }

    call({
      address: 'abcd',
      params: {
        filters: restFilters,
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
        <motion.div
          variants={{
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            },
            exit: {
              opacity: 0
            }
          }}
          // layout="preserve-aspect"
          className="relative"
        >
          {Array.from({ length: 20 }, (_, index) => (
            <ItemPlaceholder key={index} />
          ))}
        </motion.div>
      )
    }

    if (isSuccess && items.length === 0) {
      return (
        <motion.div
          variants={{
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            },
            exit: {
              opacity: 0
            }
          }}
          // layout="preserve-aspect"
          className="flex h-full w-full flex-col items-center justify-center p-20"
        >
          <div className="h-[20rem] w-[25rem]">
            <EmptyIllustration />
          </div>
          <h2 className="mt-5 text-2xl font-medium text-neutral-500 dark:text-neutral-50">
            No items found
          </h2>
        </motion.div>
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

          return (
            <Item
              onClickEdit={(item) =>
                setOpenedFormAssetModal({
                  open: true,
                  slug: item.slug,
                  title: item.name
                })
              }
              item={data as AssetType}
            />
          )
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
