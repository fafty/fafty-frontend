import { getUserAssets, useAsync } from '@fafty/shared/api'
import {
  AssetType,
  GetUserAssetsResponseType,
  GetUserAssetsParamsType
} from '@fafty/shared/types'
import { SVGProps, useEffect, useMemo, useState } from 'react'
import {
  // DragStartEvent,
  DragEndEvent,
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable'

import { InfinityLoadChecker } from '../../common/infinityLoadChecker'
import Image from 'next/image'
import { FunnelIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AssetItemPlaceholder } from '@fafty/shared/ui'
import { motion } from 'framer-motion'
import classNames from 'classnames'

interface ActionButtonProps {
  title: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  onAction: () => void
  className?: string
}
/**
 * Action button for add or remove asset.
 * @param {ActionButtonProps} props
 * @param {SVGProps<SVGSVGElement>} props.Icon - Icon component.
 * @param {() => void} props.onAction - Click event handler.
 * @param {string} props.className - Class names.
 * @returns {JSX.Element}
 * @example
 * <ActionButton title="Add" Icon={PlusIcon} onAction={() => {}} />
 * <ActionButton title="Remove" Icon={XMarkIcon} onAction={() => {}} />
 */
const ActionButton = ({
  title,
  Icon,
  onAction,
  className
}: ActionButtonProps): JSX.Element => {
  return (
    <button
      title={title}
      type="button"
      className={classNames(
        'w-full rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600',
        className
      )}
      onClick={onAction}
    >
      <span className="sr-only">{title}</span>
      <Icon
        className="h-4 w-4"
        strokeWidth="2"
        width={16}
        height={16}
        aria-hidden="true"
      />
    </button>
  )
}
type Props = {
  item: AssetType
  addable?: boolean
  removable?: boolean
  onAdd?: (token: string) => void
  onRemove?: (token: string) => void
}

/**
 * Asset item component for drag and drop. useSortable hook is used for drag and drop.
 * @param {Props} props
 * @param {AssetProps} props.item - Asset item.
 * @param {boolean} props.addable - Addable flag.
 * @param {boolean} props.removable - Removable flag.
 * @param {(token: string) => void} props.onAdd - Add event handler.
 * @param {(token: string) => void} props.onRemove - Remove event handler.
 * @returns {JSX.Element}
 * @example
 * <Item item={asset} addable={true} removable={false} onAdd={() => {}} onRemove={() => {}} />
 */
const Item = ({
  item,
  addable = false,
  removable = false,
  onAdd,
  onRemove
}: Props): JSX.Element => {
  const { isDragging, attributes, listeners, setNodeRef, transform } =
    useSortable({ id: item?.token, transition: null })

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1
  }
  return (
    <motion.div
      layoutId={item?.token}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1000 : 0,
              boxShadow: isDragging
                ? '0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)'
                : undefined
            }
          : initialStyles
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        ease: {
          type: 'spring'
        },
        scale: {
          duration: 0.25
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25
        }
      }}
      className="item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="item-wrapper">
        <div className="item-block">
          <span className="z-1 absolute right-1 top-1 mt-1 mr-1">
            {addable && (
              <ActionButton
                title={`Add ${item?.name} to collection`}
                Icon={PlusIcon}
                onAction={() => onAdd?.(item?.token)}
              />
            )}
            {removable && (
              <ActionButton
                title={`Remove ${item?.name} from collection`}
                Icon={XMarkIcon}
                onAction={() => onRemove?.(item?.token)}
              />
            )}
          </span>
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
    </motion.div>
  )
}

interface DragAndDropAssetsProps {
  initial: AssetType[]
  onChange: (assets: AssetType[]) => void
  onDragStart: () => void
  onDragEnd: () => void
  hasError: boolean
}
/**
 * Drag and drop assets component.
 * @param {DragAndDropAssetsProps} props
 * @param {AssetProps[]} props.initial - Initial assets.
 * @param {(assets: AssetProps[]) => void} props.onChange - Change event handler.
 * @param {() => void} props.onDragStart - Drag start event handler.
 * @param {() => void} props.onDragEnd - Drag end event handler.
 * @param {boolean} props.hasError - Error flag.
 * @returns {JSX.Element}
 * @example
 * <DragAndDropAssets initial={assets} onChange={() => {}} onDragStart={() => {}} onDragEnd={() => {}} hasError={false} />
 */
const DragAndDropAssets = ({
  initial,
  onDragStart,
  onDragEnd,
  onChange,
  hasError
}: DragAndDropAssetsProps): JSX.Element => {
  const [assets, setAssets] = useState<AssetType[]>(initial || [])

  // const [activeAssetToken, setActiveAssetToken] = useState<
  //   string | number | null
  // >(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      // Press delay of 150ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 150,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  // const handleDragStart = (event: DragStartEvent) => {
  //   const { active } = event
  //   setActiveAssetToken(active.id)
  // }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setAssets((a) => {
        const oldIndex = a.findIndex((item) => item.token === active.id)
        const newIndex = a.findIndex((item) => item.token === over.id)

        return arrayMove(a, oldIndex, newIndex)
      })
    }
    // setActiveAssetToken(null)
    onChange(assets)
  }

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
  }, [call, localFiltersState])

  const availableAssets = useMemo(() => {
    const count = Math.min(
      localFiltersState.paginate.offset + LIMIT,
      data?.paginate?.count ?? 0
    )

    return Array.from(
      { length: count },
      (_, index) => data?.records[index] ?? {}
    ).filter(
      (item: AssetType) =>
        !assets.find((asset) => {
          return asset?.token === item?.token
        })
    ) as AssetType[]
  }, [
    data?.paginate?.count,
    data?.records,
    localFiltersState.paginate.offset,
    assets
  ])

  //
  const handleRemove = (token: string) => {
    setAssets((assets) => assets.filter((item) => item.token !== token))
  }

  // Add available assets to the assets and remove from available assets
  const handleAdd = (token: string) => {
    const asset = availableAssets.find((item) => item.token === token)
    if (asset) {
      setAssets((assets) => [...assets, asset])
    }
  }

  //  Block displaying sum of added assets based price.
  const total = useMemo(() => {
    return assets.reduce((acc, item) => {
      return acc + Number(item.price)
    }, 0)
  }, [assets])

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          // onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full w-full min-w-full rounded-md border-[2px] border-gray-200 bg-gray-100 dark:border-neutral-900 dark:bg-neutral-900/50">
            <div className="wrapper-items h-full w-full min-w-full">
              <div className="items grided small -my-2 h-full w-full min-w-full">
                <SortableContext
                  items={availableAssets.map((item) => item?.token)}
                  strategy={rectSortingStrategy}
                >
                  {!isSuccess && !data?.paginate?.count
                    ? Array.from({ length: 24 }, (_, index) => (
                        <AssetItemPlaceholder
                          key={index}
                          size="small"
                          action={false}
                        />
                      ))
                    : availableAssets.map((item) => (
                        <Item
                          key={item.token}
                          item={item}
                          addable={true}
                          onAdd={handleAdd}
                        />
                      ))}
                </SortableContext>
              </div>
              <InfinityLoadChecker
                allowLoad={allowLoad}
                isLoading={isLoading}
                loadMore={loadMore}
              />
            </div>
          </div>
          <div
            className={classNames(
              'h-full w-full min-w-full rounded-md border-[2px] bg-gray-100 dark:bg-neutral-900/50',
              {
                'border-gray-200 dark:border-neutral-900': !hasError,
                'border-red-500': hasError
              }
            )}
          >
            <div className="w-full">
              <span>
                Added to collection {assets.length} Items with sum {total}{' '}
              </span>
            </div>
            <div className="wrapper-items h-full w-full min-w-full">
              <div className="items grided small -my-2 h-full w-full min-w-full">
                <SortableContext
                  items={assets.map((item) => item?.token)}
                  strategy={rectSortingStrategy}
                >
                  {assets &&
                    assets.map((item) => (
                      <Item
                        key={item.token}
                        item={item}
                        removable={true}
                        onRemove={handleRemove}
                      />
                    ))}
                </SortableContext>
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  )
}

export default DragAndDropAssets
