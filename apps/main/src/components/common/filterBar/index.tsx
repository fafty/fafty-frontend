import { FunnelIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, usePresence } from 'framer-motion'

import { useOnClickOutside } from '@fafty/usehooks'
import {
  ItemValueProps,
  ArrayProps,
  RangeProps,
  TypeProps,
  Props
} from './types'
import Tag from './tag'
import ArrayFilter from './filters/array'
import RangeFilter from './filters/range'
import { isEmpty } from '../../../utils/helpers'

const FilterBar = <T,>({ filters, values, onChange, onCloseTag }: Props<T>) => {
  const [isPresent, safeToRemove] = usePresence()

  const [inputValue, setInputValue] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [isOpenedPopover, setIsOpenedPopover] = useState(false)

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent])

  const togglePopover = useCallback(() => {
    setIsOpenedPopover((prev) => !prev)
  }, [setIsOpenedPopover])

  const onClickFunnel = useCallback(() => {
    if (!(isOpenedPopover && activeFilter)) {
      togglePopover()
    }

    setActiveFilter('')
  }, [activeFilter, isOpenedPopover, togglePopover])

  const actualFilters = useMemo(() => {
    return filters.filter(
      ({ title, value }) =>
        title.trim().toLowerCase().includes(inputValue.toLowerCase()) &&
        isEmpty(values[value])
    )
  }, [filters, inputValue, values])

  const renderActiveFilter = useMemo(() => {
    const filter = filters.find(({ value }) => value === activeFilter)

    if (filter?.type === TypeProps.ARRAY) {
      const currentFilter = filter as ArrayProps

      return (
        <ArrayFilter
          title={currentFilter.title}
          options={currentFilter.options}
          value={values?.[activeFilter]}
          onChange={(value) => {
            setInputValue('')
            setIsOpenedPopover(false)
            onChange(activeFilter, value)
          }}
          onDismiss={() => {
            setIsOpenedPopover(false)
          }}
        />
      )
    }

    if (filter?.type === TypeProps.RANGE) {
      const currentFilter = filter as RangeProps

      return (
        <RangeFilter
          title={currentFilter.title}
          params={currentFilter.params}
          value={values?.[activeFilter]}
          onChange={(value) => {
            setInputValue('')
            setIsOpenedPopover(false)
            onChange(activeFilter, value)
          }}
          onDismiss={() => {
            setIsOpenedPopover(false)
          }}
        />
      )
    }

    return (
      <div className="flex flex-1 items-center overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
        <div className="relative flex flex-1 flex-col gap-1 p-1">
          {actualFilters.map((item) => (
            <button
              key={item.title}
              type="button"
              className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
              onClick={() => {
                setInputValue('')
                setActiveFilter(item.value)
              }}
            >
              <div className="text-left">
                <p className="mx-4 text-base font-medium">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }, [activeFilter, actualFilters, filters, onChange, values])

  const renderTags = useMemo(() => {
    return Object.keys(values)
      .filter((valueKey) => !isEmpty(values[valueKey]))
      .map((valueKey) => {
        const filter = filters.find((filter) => filter.value === valueKey)

        if (filter) {
          return (
            <Tag<typeof filter.type>
              key={valueKey}
              onClickClose={() => {
                setIsOpenedPopover(false)
                onCloseTag(valueKey)
              }}
              filter={filter}
              value={values[valueKey]}
              onChange={(value: ItemValueProps<typeof filter.type>) => {
                setInputValue('')
                onChange(valueKey, value)
              }}
            />
          )
        }

        return null
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, onChange, onCloseTag, values])

  useOnClickOutside(buttonRef, () => {
    setIsOpenedPopover(false)
  })

  return (
    <div className="ml-8 flex flex-col">
      <div>
        <div className="flex w-full flex-row">
          <div className="relative inset-0 left-0 flex h-12 w-8 items-center py-2">
            <div
              onClick={onClickFunnel}
              className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
            >
              <FunnelIcon
                strokeWidth="2"
                className="h-5 w-5 touch-manipulation select-none"
              />
            </div>
          </div>
          <div className="ml-2.5 flex w-full flex-1">
            <motion.div className="m-2 flex flex-1 flex-wrap items-center gap-2">
              {renderTags}
              <motion.div
                key="input"
                layout
                ref={buttonRef}
                className="relative w-full flex-1"
              >
                <input
                  value={inputValue}
                  autoComplete="off"
                  spellCheck="false"
                  type="search"
                  autoCorrect="off"
                  autoCapitalize="off"
                  name="search"
                  id="search"
                  className="block w-full border-2 border-transparent bg-transparent px-2 py-1 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base"
                  placeholder="Filter"
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => {
                    setActiveFilter('')
                    setIsOpenedPopover(true)
                  }}
                />
                {isOpenedPopover && actualFilters.length > 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-full z-20 flex min-w-[200px] max-w-[300px] transform items-center sm:px-0">
                      {renderActiveFilter}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
