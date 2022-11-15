import React, { useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { CloseIcon } from '@remixicons/react/fill'
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

      return `${currentFilter.title}: ${totalTitles.join(', ').trim()}`
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

      return `${currentFilter.title}: ${firstTitle} ${
        firstValue && secondValue ? '-' : ''
      } ${secondTitle}`
    }
  }, [filter, value])

  return (
    <div ref={tagRef} className="relative">
      <div
        onClick={() => setOpenedFilterTag(!openedFilterTag)}
        className={classNames(
          'flex flex-shrink-0 cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-sm text-white dark:text-slate-50'
        )}
      >
        {renderTitle}
        <CloseIcon
          onClick={(e) => {
            e.stopPropagation()
            onClickClose()
          }}
          className="ml-1 h-4 w-4 fill-white"
        />
      </div>
      {openedFilterTag && (
        <div className="absolute left-0 z-[999] pt-4">
          <div className="inline-table">{renderAbsoluteContent}</div>
        </div>
      )}
    </div>
  )
}

export default Tag
