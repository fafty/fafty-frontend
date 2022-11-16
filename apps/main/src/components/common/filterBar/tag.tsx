import React, { useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { useOnClickOutside } from '@fafty/usehooks'
import {
  ArrayProps,
  RangeProps,
  TypeProps,
  RangeFilterValueProps,
  TagProps
} from './types'
import ArrayFilter from './filters/array'
import RangeFilter from './filters/range'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const Tag = <T,>({
  onClickClose,
  value,
  filter,
  onChange
}: TagProps<T>): JSX.Element => {
  const tagRef = useRef(null)
  const [openedFilterTag, setOpenedFilterTag] = useState(false)

  useOnClickOutside(tagRef, () => {
    setOpenedFilterTag(false)
  })

  const renderAbsoluteContent = useMemo(() => {
    if (filter.type === TypeProps.ARRAY) {
      const currentFilter = filter as ArrayProps

      return (
        <ArrayFilter
          options={currentFilter.options}
          value={value as string[]}
          onChange={(value) => {
            setOpenedFilterTag(false)
            onChange(value)
          }}
        />
      )
    }

    if (filter.type === TypeProps.RANGE) {
      const currentFilter = filter as RangeProps

      return (
        <RangeFilter
          value={value as RangeFilterValueProps}
          params={currentFilter.params}
          onChange={(value) => {
            setOpenedFilterTag(false)
            onChange(value)
          }}
        />
      )
    }
  }, [filter, onChange, value])

  const renderTitle = useMemo(() => {
    if (filter.type === TypeProps.ARRAY) {
      const currentFilter = filter as ArrayProps
      const currentValue = value as string[]
      const totalTitles = currentValue.reduce((total, current) => {
        const optionTitle = currentFilter.options.find(
          (option) => option.value === current
        )?.title

        if (optionTitle) {
          total.push(optionTitle)
        }

        return total
      }, [])

      return (
        <span
          title={`${currentFilter.title}: ${totalTitles.join(', ').trim()}`}
          className="max-w-[200px] truncate text-sm"
        >
          {currentFilter.title}: {totalTitles.join(', ').trim()}
        </span>
      )
    }

    if (filter.type === TypeProps.RANGE) {
      const currentFilter = filter as RangeProps
      const currentValue = value as RangeFilterValueProps
      const firstValue = currentValue[currentFilter.params.firstKey]
      const secondValue = currentValue[currentFilter.params.secondKey]

      const firstTitle = firstValue
        ? `${currentFilter.params.firstTitle}: ${
            currentValue[currentFilter.params.firstKey]
          }`
        : ''

      const secondTitle = secondValue
        ? `${currentFilter.params.secondTitle}: ${
            currentValue[currentFilter.params.secondKey]
          }`
        : ''

      return (
        <span
          title={`${currentFilter.title}: ${firstTitle} ${
            firstValue && secondValue ? '-' : ''
          } ${secondTitle}`}
          className="max-w-[200px] truncate text-sm"
        >
          {currentFilter.title}: {firstTitle}
          {firstValue && secondValue && (
            <>
              <span className="mx-1">
                -
              </span>
              {secondTitle}
            </>
            
          )}
        </span>
      )
    }
  }, [filter, value])

  return (
    <motion.div
      key={filter.title}
      layout
      ref={tagRef}
      className="relative z-20">
      <div
        onClick={() => setOpenedFilterTag(!openedFilterTag)}
        className={classNames(
          'duration-250 relative m-0 box-border flex flex-shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 py-1 pl-3 pr-1 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
        )}
      >
        <motion.span
          layout="preserve-aspect"
          className="max-w-[200px] truncate text-sm"
        >
          {renderTitle}
        </motion.span>
        <button
          title="Remove filter"
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClickClose()
          }}
          className="ml-1 rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-500"
        >
          <span className="sr-only">Remove filter</span>
          <XMarkIcon
            className="h-4 w-4"
            strokeWidth="2"
            width={16}
            height={16}
            aria-hidden="true"
          />
        </button>
      </div>
      {openedFilterTag && (
        <div className="absolute left-0 z-[999] pt-4">
          <div className="inline-table">{renderAbsoluteContent}</div>
        </div>
      )}
    </motion.div>
  )
}

export default Tag
