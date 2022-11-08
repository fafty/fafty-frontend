import {
  AssetProps,
  getUserAssets,
  GetUserAssetsCallbackProps,
  GetUserAssetsResponseProps,
  useAsync,
} from '@fafty/shared/api'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

import { InfinityLoadChecker } from '../../common/infinityLoadChecker'
import Image from 'next/image'
import { FunnelIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
// import Sortable from 'sortablejs'

interface DragAndDropAssetsProps {
  current: AssetProps[];
  onChange: (assets: AssetProps[]) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  hasError: boolean;
}

type Props = {
  item: AssetProps;
};

const Item = ({ item }: Props): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.token })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <div
      className="item"
      data-token={item.token}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
                        backgroundColor:
                          item.media?.dominant_color || undefined,
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

  const [sortedAssetsTokens, setSortedAssetsTokens] = useState<string[]>([])
  const [assets, setAssets] = useState<AssetProps[]>(current || [])
  const [activeAssetToken, setActiveAssetToken] = useState<string | number | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  
  const Droppable = ({ children, id }) =>{
    const { isOver, setNodeRef } = useDroppable({
      id,
      data: {
        supports: ['type1', 'type2'],
      },
    })
    const style = { backgroundColor: isOver ? 'green' : undefined }
  
    return (
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    )
  }
  
  const Draggable = ({ children, id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
      data: {
        type: ['type1', 'type2'],
        supports: ['type1', 'type2'],
      }
    })
    const style = { transform: CSS.Translate.toString(transform) }
  
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </div>
    )
  }
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveAssetToken(active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    console.log('over', over)
    if (over && active.id !== over.id) {
      setAssets((a) => {
        const oldIndex = a.findIndex((item) => item.token === active.id)
        const newIndex = a.findIndex((item) => item.token === over.id)

        return arrayMove(a, oldIndex, newIndex)
      })
    }
    setActiveAssetToken(null)
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

  type QueryFiltersProps = {
    paginate: {
      limit: number;
      offset: number;
    };
  };

  const [localFiltersState, setLocalFiltersState] = useState<QueryFiltersProps>(
    {
      paginate: {
        limit: LIMIT,
        offset: 0,
      },
    }
  )

  const { data, call, isLoading, isSuccess } = useAsync<
    GetUserAssetsResponseProps,
    GetUserAssetsCallbackProps
  >({
    callback: getUserAssets,
    mapper,
  })

  const allowLoad = data
    ? !isLoading && data?.records.length < data?.paginate?.count
    : false

  const loadMore = () => {
    setLocalFiltersState((prev) => ({
      ...prev,
      paginate: {
        ...prev.paginate,
        offset: prev.paginate.offset + LIMIT,
      },
    }))
  }

  useEffect(() => {
    const { paginate } = localFiltersState

    call({
      address: 'abcd',
      params: {
        limit: LIMIT,
        offset: paginate.offset,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiltersState])

  const aviableItems = useMemo(() => {
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
    ) as AssetProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.paginate?.count, data?.records, localFiltersState.paginate.offset])

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
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div>
            <div>
              <h3 className="font-semibold">
                Your aviable assets for adding to collection.
              </h3>
            </div>
            <div className="h-full min-h-full w-full min-w-full rounded-md border-[2px] border-gray-200 bg-gray-100 dark:border-neutral-900 dark:bg-neutral-900/50">
              <Draggable id="assets-aviable">
                <Droppable id="assets-aviable"> 
                  <SortableContext items={aviableItems.map((item) => item.token)} strategy={rectSortingStrategy}>
                    <div className="grid-items">
                      <div className="wrapper-items">
                        <div className="items grided small">
                          {!isSuccess && !data?.paginate?.count
                            ? Array.from({ length: 24 }, (_, index) => (
                                // <ItemPlaceholder key={index} />
                                <div key={index}>ascsc</div>
                              ))
                            : aviableItems.map((item) => (
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
                  </SortableContext>
                </Droppable>
              </Draggable>
            </div>
          </div>
          <div>
            <div>
              <h3 className="font-semibold">
                Items draged here will be apper in your collection.
              </h3>
            </div>
            <Draggable id="assets-collection">
              <Droppable id="assets-collection"> 
                <SortableContext items={assets.map((item) => item.token)} strategy={rectSortingStrategy}>
                  <div className="h-full min-h-full w-full min-w-full rounded-md border-[2px] border-gray-200 bg-gray-100 dark:border-neutral-900 dark:bg-neutral-900/50">
                    <div className="wrapper-items h-full min-h-full w-full min-w-full">
                      <div className="items grided small h-full min-h-full w-full min-w-full">
                        {assets &&
                          assets.map((item) => (
                            <Item key={item.token} item={item} />
                          ))}
                      </div>
                    </div>
                  </div>
                </SortableContext>
              </Droppable>
            </Draggable>
          </div>
          <DragOverlay modifiers={[restrictToWindowEdges]}>
            {activeAssetToken && (
              <div className="wrapper-items">
                <div className="items grided small">
                  <Item item={[...aviableItems, ...assets].find((item) => item.token === activeAssetToken)} />
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}

export default DragAndDropAssets
