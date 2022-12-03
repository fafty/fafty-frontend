import { useState } from 'react'
import { Checkbox } from '../../checkbox'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

type ArrayFilterOptionsProps = {
  title: string
  value: string
}

type Props = {
  title?: string
  options: ArrayFilterOptionsProps[]
  value: string[]
  onChange: (value: string[]) => void
  onDismiss: () => void
}

/**
 * @name ArrayFilter
 * @description Array filter component for filter panel component (filter panel component is a component that is used for filtering data in a lists)
 * @param {Props} props
 * @param {string} props.title
 * @param {ArrayFilterOptionsProps[]} props.options
 * @param {string[]} props.value
 * @param {(value: string[]) => void} props.onChange
 * @param {() => void} props.onDismiss
 * @returns {JSX.Element}
 * @example
 * <ArrayFilter options={options} value={value} onChange={onChange} onDismiss={onDismiss} />
 */
const ArrayFilter = ({ title, value = [], options, onChange, onDismiss}: Props): JSX.Element => {
  const [localValue, setLocalValue] = useState<string[]>(value)

  const onChangeCheckbox = (checkboxValue: string) => () => {
    const isIncludes = localValue.includes(checkboxValue)

    if (isIncludes) {
      setLocalValue(
        localValue.filter((filterValue) => filterValue !== checkboxValue)
      )
    } else {
      setLocalValue([...localValue, checkboxValue])
    }
  }

  const onSaveFilters = () => {
    onChange(localValue)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex w-auto transform sm:px-0">
        <div className="flex min-w-[200px] max-w-[300px] flex-col rounded-lg bg-white px-3 pt-2 pb-1.5 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="relative justify-center flex items-center align-center flex-1 mb-3">
            <div className="text-lg">
              {title}
            </div>
            <button
              title="Close"
              type="button"
              onClick={() => {
                onDismiss()
              }}
              className="relative ml-auto r-0 items-center justify-center flex  h-5 w-5 rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-500"
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
          <div className="flex w-full flex-col justify-start gap-2.5">
            {options.map((check) => (
              <div className="flex" key={check.title}>
                <Checkbox
                  onChange={onChangeCheckbox(check.value)}
                  checked={localValue?.includes(check.value)}
                  title={check.title}
                  namespace={`array_filter_${check.title}`}
                />
              </div>
            ))}
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

export default ArrayFilter
