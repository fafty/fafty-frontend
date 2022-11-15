import { FunnelIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { useOnClickOutside } from '@fafty/usehooks'
import {
  FilterItemValue,
  FiltersProps,
  FilterTypeArray,
  FilterTypeRange,
  FilterTypes,
} from './types'
import { Tag } from './tag'
import { ArrayFilter } from './arrayFilter'
import { RangeFilter } from './rangeFilter'
import { isEmpty } from '../../../utils/helpers'

export const FilterPanel = <T,>({
  filters,
  values,
  onChange,
  onCloseTag,
}: FiltersProps<T>) => {
  const [inputValue, setInputValue] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [isOpenedPopover, setIsOpenedPopover] = useState(false)

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

    if (filter?.type === FilterTypes.ARRAY) {
      const currentFilter = filter as FilterTypeArray

      return (
        <ArrayFilter
          options={currentFilter.options}
          value={values?.[activeFilter]}
          onChange={(value) => {
            setInputValue('')
            setIsOpenedPopover(false)
            onChange(activeFilter, value)
          }}
        />
      )
    }

    if (filter?.type === FilterTypes.RANGE) {
      const currentFilter = filter as FilterTypeRange

      return (
        <RangeFilter
          params={currentFilter.params}
          value={values?.[activeFilter]}
          onChange={(value) => {
            setInputValue('')
            setIsOpenedPopover(false)
            onChange(activeFilter, value)
          }}
        />
      )
    }

    return (
      <div className="flex items-center overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
        <div className="relative flex flex-col gap-1 p-1">
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
              onChange={(value: FilterItemValue<typeof filter.type>) => {
                setInputValue('')
                onChange(valueKey, value)
              }}
            />
          )
        }

        return null
      })
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
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {renderTags}
              <div ref={buttonRef} className="relative">
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => {
                    setActiveFilter('')
                    setIsOpenedPopover(true)
                  }}
                  value={inputValue}
                  autoComplete="off"
                  spellCheck="false"
                  type="search"
                  autoCorrect="off"
                  autoCapitalize="off"
                  name="search"
                  id="search"
                  className="block w-full max-w-[220px] border-2 border-transparent bg-transparent px-3 py-1 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base"
                  placeholder="Filter"
                />
                {isOpenedPopover && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-full z-10 flex transform items-center sm:px-0">
                      {renderActiveFilter}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
