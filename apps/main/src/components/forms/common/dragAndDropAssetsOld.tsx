import { getUserAssets, useAsync } from '@fafty/shared/api'
import {
  AssetType,
  GetUserAssetsParamsType,
  GetUserAssetsResponseType
} from '@fafty/shared/types'
import { useEffect, useMemo, useRef, useState } from 'react'
import Sortable, { MultiDrag } from 'sortablejs'
import { InfinityLoadChecker } from '../../common/infinityLoadChecker'
import Image from 'next/image'
import { FunnelIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface DragAndDropAssetsProps {
  current: AssetType[]
  onChange: (assets: AssetType[]) => void
  onDragStart: () => void
  onDragEnd: () => void
  hasError: boolean
}

type Props = {
  item: AssetType
}

const Item = ({ item }: Props): JSX.Element => {
  return (
    <div className="item" data-token={item.token}>
      <div className="item-wrapper">
        <div className="item-block">
          <div className="item-card">
            <div className="item-card-link">
              <div className="thumbnail-wrapper asset">
                <div className="thumbnail">
                  {item.media?.src && (
                    <Image
                      src={item.media?.src}
                      style={{
                        backgroundColor: item.media?.dominant_color || undefined
                      }}
                      width={300}
                      height={300}
                      alt={item.name}
                    />
                  )}
                </div>
              </div>
              <div className="item-card-body">
                <div className="item-card-content">
                  <div className="item-head">
                    <div className="item-card-title">
                      <span>{item.name}</span>
                    </div>
                    <div className="item-price">
                      {item.price} {item.ticker}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for drag and drop based sortablejs with two columns
const DragAndDropAssets = (props: DragAndDropAssetsProps) => {
  const { current, onDragStart, onDragEnd, onChange, hasError } = props

  /**
   * Sortablejs
   */
  const sortableAccountAssets = useRef<Sortable | null>(null)
  const sortableCollectionAssets = useRef<Sortable | null>(null)
  const [onDragOverSortableAccountAssets, setOnDragOverSortableAccountAssets] =
    useState(false)
  const [
    onDragOverSortableCollectionAssets,
    setOnDragOverSortableCollectionAssets
  ] = useState(false)
  // const [
  //   selectedSortableAccountAssetsCount,
  //   setSelectedSortableAccountAssetsCount,
  // ] = useState(0);
  // const [
  //   selectedSortableCollectionAssetsCount,
  //   setSelectedSortableCollectionAssetsCount,
  // ] = useState(0);

  const [currentAssets] = useState<AssetType[]>(current || [])

  // console.log('currentcurrent', current);
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

  type QueryFiltersProps = {
    paginate: {
      limit: number
      offset: number
    }
  }

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0
      }
    }
  )

  const { data, call, isLoading, isSuccess } = useAsync<
    GetUserAssetsResponseType,
    GetUserAssetsParamsType
  >({
    callback: getUserAssets,
    mapper
  })

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
    const { paginate } = localFiltersState

    call({
      address: '0xfaftyandrew',
      params: {
        limit: LIMIT,
        offset: paginate.offset
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  // useComponentDidUpdate(
  //   (prev) => {
  //     if (!!prev.search) {
  //       clearAsyncData();

  //       setLocalFiltersState((prev) => ({
  //         paginate: { ...prev.paginate, offset: 0 },
  //       }));
  //     }
  //   },
  //   { search }
  // );

  const items = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      data?.paginate?.count ?? 0
    )

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    ).filter(
      (item) =>
        !current.find((currentItem) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          return currentItem.token === item?.token
        })
    ) as AssetType[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

  useEffect(() => {
    console.log('useEffect mount?')
    if (sortableAccountAssets.current) {
      sortableAccountAssets.current.destroy()
    }
    if (sortableCollectionAssets.current) {
      sortableCollectionAssets.current.destroy()
    }
    try {
      Sortable.mount(new MultiDrag())
    } catch (e) {
      console.log(e)
    }

    sortableAccountAssets.current = Sortable.create(
      document.getElementById('sortable-account-assets') as HTMLElement,
      {
        animation: 150,
        // handle: '.item',
        draggable: '.item',
        multiDrag: true, // Enable multi-drag
        selectedClass: 'selected',
        delayOnTouchOnly: true,
        fallbackTolerance: 10,
        handle: '.item',
        dataIdAttr: 'data-token',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'draggable-ghost',
        onSelect: (evt) => {
          console.log('onSelect', evt)
        },
        onDeselect: (evt) => {
          console.log('onDeselect', evt)
        },
        group: {
          name: 'assets'
        },
        onStart: onDragStart,
        onEnd: (e) => {
          onDragEnd()
        }
      }
    )
    sortableCollectionAssets.current = Sortable.create(
      document.getElementById('sortable-collection-assets') as HTMLElement,
      {
        sort: true,
        animation: 150,
        // handle: '.item',
        draggable: '.item',
        multiDrag: true, // Enable multi-drag
        selectedClass: 'selected',
        delayOnTouchOnly: true,
        fallbackTolerance: 10,
        dataIdAttr: 'data-token',
        handle: '.item',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'draggable-ghost',
        store: {
          get: (sortable) => {
            return []
          },
          set: (sortable) => {
            const a = sortable.toArray()
            // select objects from array of tokens a in currentAssets and data.records and sort them by position in a
            const selectedAssets = a
              .map((token) => {
                const asset = currentAssets.find(
                  (asset) => asset.token === token
                )
                if (asset) {
                  return asset
                }
                return data?.records.find((asset) => asset.token === token)
              })
              .filter(Boolean) as AssetType[]
            // set selected assets to state
            selectedAssets && onChange(selectedAssets)
          }
        },

        group: {
          name: 'assets'
        },
        onStart: (e) => {
          onDragStart()
        },
        onEnd: (e) => {
          onDragEnd()
        },
        onAdd: (e) => {
          console.log('onAdd', e)
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAssets, data?.records])

  return (
    <div className="my-5 flex flex-col">
      <div className="relative flex flex-col">
        <div>
          <div className="relative flex h-[50px] w-full flex-row">
            <div className="pointer-events-none absolute inset-0 left-0 flex items-center py-2 pr-5">
              <div className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                <FunnelIcon
                  strokeWidth="2"
                  className="h-5 w-5 touch-manipulation select-none"
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
              className="block w-full border-2 border-transparent bg-transparent p-3 pl-[2.5rem] pr-3 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base"
              placeholder="Filter"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(2,_minmax(100px,_1fr))] gap-4">
        <div>
          <div>
            <h3 className="font-semibold">
              Your aviable assets for adding to collection.
            </h3>
          </div>
          <div
            className={classNames(
              'h-full min-h-full w-full min-w-full rounded-md border-[2px]',
              {
                'border-blue-700': onDragOverSortableAccountAssets,
                'border-gray-200 bg-gray-100 dark:border-neutral-900 dark:bg-neutral-900/50':
                  !onDragOverSortableAccountAssets
              }
            )}
          >
            <div className="grid-items">
              <div className="wrapper-items">
                <div
                  id="sortable-account-assets"
                  className="items grided small"
                  onDragOver={(e) => {
                    // e.preventDefault();
                    setOnDragOverSortableAccountAssets(true)
                  }}
                  onDragLeave={(e) => {
                    // e.preventDefault();
                    setOnDragOverSortableAccountAssets(false)
                  }}
                >
                  {!isSuccess && !data?.paginate?.count
                    ? Array.from({ length: 24 }, (_, index) => (
                        // <ItemPlaceholder key={index} />
                        <div key={index}>ascsc</div>
                      ))
                    : items.map((item) => (
                        <Item key={item.token} item={item} />
                      ))}
                </div>
              </div>
              <InfinityLoadChecker
                allowLoad={allowLoad}
                isLoading={isLoading}
                loadMore={loadMore}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3 className="font-semibold">
              Items draged here will be apper in your collection.
            </h3>
          </div>
          <div
            className={classNames(
              'h-full min-h-full w-full min-w-full rounded-md border-[2px]',
              {
                'border-blue-700': onDragOverSortableCollectionAssets,
                'border-gray-200 bg-gray-100 dark:border-neutral-900 dark:bg-neutral-900/50':
                  !onDragOverSortableCollectionAssets && !hasError,
                'border-red-500': hasError
              }
            )}
          >
            <div className="wrapper-items h-full min-h-full w-full min-w-full">
              <div
                id="sortable-collection-assets"
                className="items grided small h-full min-h-full w-full min-w-full"
                onDragEnter={(e) => {
                  setOnDragOverSortableCollectionAssets(true)
                }}
                onDragLeave={(e) => {
                  setOnDragOverSortableCollectionAssets(false)
                }}
              >
                {currentAssets &&
                  currentAssets.map((item) => (
                    <Item key={item.token} item={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DragAndDropAssets
