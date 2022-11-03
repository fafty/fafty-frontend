import { Listbox } from '@headlessui/react'
import { ArrowDownSIcon } from '@remixicons/react/line'
import { ChangeEvent, useEffect, useState } from 'react'

const CURRENCY_OPTIONS = [
  {
    title: 'ICP',
    value: 'icp',
  },
  {
    title: 'XTC',
    value: 'xtc',
  },
]

export type PriceFiltersValue = {
  currency?: string;
  from?: string;
  to?: string;
};

export type PriceFilterProps = {
  value?: PriceFiltersValue;
  onChange: (value: PriceFiltersValue) => void;
};

export const Price = ({ value, onChange }: PriceFilterProps) => {
  const [priceLocalValue, setPriceLocalValue] = useState<PriceFiltersValue>({
    from: '',
    to: '',
    currency: '',
    ...value,
  })

  useEffect(() => {
    setPriceLocalValue((prev) => ({
      ...prev,
      from: value?.from ?? '',
      to: value?.to ?? '',
    }))
  }, [value?.from, value?.to])

  const onChangePriceLocalValue =
    (key: string) => (changeValue: ChangeEvent<HTMLInputElement>) => {
      setPriceLocalValue((prev) => ({
        ...prev,
        [key]: changeValue.target.value,
      }))
    }

  const onChangeCurrency = (value: string) => {
    setPriceLocalValue((prev) => ({ ...prev, currency: value }))
  }

  const onSave = () => {
    onChange(priceLocalValue)
  }

  const title = CURRENCY_OPTIONS.find(
    ({ value }) => value === priceLocalValue.currency
  )?.title

  return (
    <div className="relative flex flex-col">
      <Listbox
        value={priceLocalValue.currency}
        onChange={onChangeCurrency}
        as="div"
      >
        <div className="relative mt-1 flex w-full">
          <Listbox.Button className="flex w-full items-center justify-between rounded-md border border-blue-600 px-5 py-2.5 text-sm">
            {title || 'Select currency'}
            <ArrowDownSIcon
              className="h-4 w-4 flex-shrink-0 fill-neutral-700 dark:fill-neutral-200"
              strokeWidth="2"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute top-full right-0 left-0 z-10 overflow-hidden rounded-lg bg-white p-2 text-gray-500 dark:bg-neutral-800 dark:text-gray-500">
            {CURRENCY_OPTIONS.map((option) => (
              <Listbox.Option key={option.value} value={option.value}>
                {({ active, selected }) => (
                  <li className="flex cursor-pointer items-center p-2 text-sm text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700">
                    {option.title}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <div className="mt-2.5 flex">
        <input
          type="number"
          title="from"
          placeholder="From"
          value={priceLocalValue.from}
          onChange={onChangePriceLocalValue('from')}
          className="mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
        />
        <input
          type="number"
          title="to"
          placeholder="To"
          value={priceLocalValue.to}
          onChange={onChangePriceLocalValue('to')}
          className="ml-2.5 mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
        />
      </div>
      <div className="py-2">
        <button
          type="button"
          className="mb-1 w-full rounded-[7px] bg-gray-200 px-2 py-2 font-medium text-gray-900 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none dark:bg-neutral-700 dark:text-gray-50"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}
