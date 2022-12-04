import { ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { RangeFilterValueProps } from '../types'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  title?: string
  value?: RangeFilterValueProps
  params: {
    firstTitle: string
    secondTitle: string
    firstKey: string
    secondKey: string
  }
  onChange: (value: RangeFilterValueProps) => void
  onDismiss: () => void
}

/**
 *
 * @name RangeFilter
 * @description Range filter component for filter panel component.
 * @param {Props} props
 * @param {string} props.title
 * @param {RangeFilterValueProps} props.value
 * @param {{ firstTitle: string; secondTitle: string; firstKey: string; secondKey: string; }} props.params
 * @param {(value: RangeFilterValueProps) => void} props.onChange
 * @param {() => void} props.onDismiss
 * @returns {JSX.Element}
 * @example
 * <RangeFilter value={value} onChange={onChange} params={params} />
 */
const RangeFilter = ({
  title,
  value = { ge: '', le: '' },
  params,
  onChange,
  onDismiss
}: Props): JSX.Element => {
  const [localPriceValue, setLocalPriceValue] = useState(
    value || { [params.firstKey]: '', [params.secondKey]: '' }
  )

  const onChangePriceLocalValue =
    (key: string) => (changeValue: ChangeEvent<HTMLInputElement>) => {
      setLocalPriceValue((prev) => ({
        ...prev,
        [key]: changeValue.target.value
      }))
    }

  const onSaveFilters = () => {
    if (
      !localPriceValue[params.firstKey] &&
      !localPriceValue[params.secondKey]
    ) {
      onChange(undefined)
    } else {
      onChange(localPriceValue)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex w-auto transform items-center sm:px-0">
        <div className="flex min-w-[200px] max-w-[300px] flex-col rounded-lg bg-white px-3 pt-3 pb-1.5 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="align-center relative mb-3 flex flex-1 items-center justify-center">
            <div className="text-lg">{title}</div>
            <button
              title="Close"
              type="button"
              onClick={() => {
                onDismiss()
              }}
              className="r-0 relative ml-auto flex h-5 w-5  items-center justify-center rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-500"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon
                className="h-3 w-3"
                strokeWidth="2.5"
                width={14}
                height={14}
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="flex w-full justify-start">
            <input
              type="number"
              title={params.firstTitle}
              placeholder="From"
              value={localPriceValue[params.firstKey]}
              onChange={onChangePriceLocalValue(params.firstKey)}
              className="mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
            />
            <input
              type="number"
              title={params.secondTitle}
              placeholder="To"
              value={localPriceValue[params.secondKey]}
              onChange={onChangePriceLocalValue(params.secondKey)}
              className="ml-2.5 mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
            />
          </div>
          <div className="my-2 flex w-full justify-end border-t border-gray-100 dark:border-neutral-700">
            <button
              type="button"
              className="relative mt-2 inline-block rounded-md border border-transparent bg-blue-600 py-1 px-3 text-center font-medium text-white hover:bg-blue-700"
              onClick={onSaveFilters}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RangeFilter
