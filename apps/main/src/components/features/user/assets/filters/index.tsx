import { Fragment, useMemo, useRef, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useOnClickOutside } from '@fafty/usehooks'
import { FunnelIcon } from '@heroicons/react/24/outline'
import {
  FiltersPrice,
  FiltersProps,
  VisibilityValues,
  BlockchainValues,
  ContentTypeValues,
  RestrictionsValues,
  FiltersState,
} from './types'
import { Visibility } from './visibility'
import { Restrictions } from './restrictions'
import { Blockchain } from './blockchain'
import { ContentType } from './contentType'
import { Price } from './price'
import classNames from 'classnames'
import { CloseIcon } from '@remixicons/react/fill'

const FILTERS = [
  {
    title: 'Visibility',
    value: 'visibility',
  },
  {
    title: 'Restrictions',
    value: 'restrictions',
  },
  {
    title: 'Blockchain',
    value: 'blockchain',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Type',
    value: 'type',
  },
]

export const Filters = ({
  values = {},
  onChange,
  onCloseTag,
}: FiltersProps) => {
  const [activeFilter, setActiveFilter] = useState('')
  const filterContainerRef = useRef<HTMLDivElement | null>(null)

  const renderActiveFilter = useMemo(() => {
    switch (activeFilter) {
      case 'visibility':
        return (
          <Visibility
            value={values?.visibility}
            onChange={(value: VisibilityValues[]) => {
              setActiveFilter('')
              onChange('visibility', value)
            }}
          />
        )
      case 'restrictions':
        return (
          <Restrictions
            value={values?.restrictions}
            onChange={(value: RestrictionsValues[]) => {
              setActiveFilter('')
              onChange('restrictions', value)
            }}
          />
        )
      case 'blockchain':
        return (
          <Blockchain
            value={values?.blockchain}
            onChange={(value: BlockchainValues[]) => {
              setActiveFilter('')
              onChange('blockchain', value)
            }}
          />
        )
      case 'type':
        return (
          <ContentType
            value={values?.type}
            onChange={(value: ContentTypeValues[]) => {
              setActiveFilter('')
              onChange('type', value)
            }}
          />
        )
      case 'price':
        return (
          <Price
            value={values?.price}
            onChange={(value: FiltersPrice) => {
              setActiveFilter('')
              onChange('price', value)
            }}
          />
        )
      default:
        return null
    }
  }, [activeFilter, values, onChange])

  useOnClickOutside(filterContainerRef, () => {
    setActiveFilter('')
  })

  const renderTags = useMemo(() => {
    return Object.keys(values).map((valueKey: keyof FiltersState) => {
      if (Array.isArray(values[valueKey])) {
        const currentValue = values[valueKey] as Array<FiltersState>

        const { title } = FILTERS.find((filter) => filter.value === valueKey)

        return (
          <div
            onClick={() => setActiveFilter(valueKey)}
            key={valueKey}
            className={classNames(
              'flex flex-shrink-0 cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-sm text-white dark:text-slate-50'
            )}
          >
            {title} : {currentValue.join(', ').trim()}
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation()
                onCloseTag(valueKey)
              }}
              className="ml-1 h-4 w-4 fill-white"
            />
          </div>
        )
      }

      if (valueKey === 'price') {
        const currentValue = (values[valueKey] as FiltersPrice) ?? {}

        return (
          <div
            onClick={() => setActiveFilter(valueKey)}
            key={valueKey}
            className={classNames(
              'flex flex-shrink-0 cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-sm text-white dark:text-slate-50'
            )}
          >
            <>
              Price min: {currentValue.min} - max: {currentValue.max}
            </>
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation()
                onCloseTag(valueKey)
              }}
              className="ml-1 h-4 w-4 fill-white"
            />
          </div>
        )
      }

      return null
    })
  }, [values])

  return (
    <div className="ml-8 flex flex-col">
      <div className="relative flex h-[50px] w-full flex-row">
        <Popover>
          {({ open, close }) => {
            if (open) {
              setActiveFilter('')
            }

            return (
              <>
                <Popover.Button className="inset-0 left-0 flex h-12 w-8 items-center py-2">
                  <div className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600">
                    <FunnelIcon
                      strokeWidth="2"
                      className="h-5 w-5 touch-manipulation select-none"
                    />
                  </div>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-0 z-10 flex w-screen max-w-xs transform items-center sm:px-0">
                    <div className="flex items-center overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
                      <div className="relative flex flex-col gap-1 p-1">
                        {FILTERS.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
                            onClick={() => {
                              setActiveFilter(item.value)
                              close()
                            }}
                          >
                            <div className="text-left">
                              <p className="mx-4 text-base font-medium">
                                {item.title}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )
          }}
        </Popover>
        <div
          ref={filterContainerRef}
          className="relative ml-2.5 flex w-full flex-1"
        >
          <div className="absolute flex justify-center">
            {renderActiveFilter}
          </div>
          <div className="flex flex-1 items-center">
            {renderTags}
            <input
              autoComplete="off"
              spellCheck="false"
              type="search"
              autoCorrect="off"
              autoCapitalize="off"
              name="search"
              id="search"
              className="block w-full border-2 border-transparent bg-transparent p-3 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base"
              placeholder="Filter"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
