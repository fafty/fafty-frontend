import { Listbox } from '@headlessui/react';
import { ArrowDownSIcon } from '@remixicons/react/line';
import { Field } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';

const CURRENCY_OPTIONS = [
  {
    title: 'ICP',
    value: 'icp',
  },
];

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
    ...value,
    currency: 'icp',
  });

  useEffect(() => {
    setPriceLocalValue((prev) => ({
      ...prev,
      from: value?.from ?? '',
      to: value?.to ?? '',
    }));
  }, [value?.from, value?.to]);

  const onChangePriceLocalValue =
    (key: string) => (changeValue: ChangeEvent<HTMLInputElement>) => {
      setPriceLocalValue((prev) => ({
        ...prev,
        [key]: changeValue.target.value,
      }));
    };

  const onChangeCurrency = (value: string) => {
    setPriceLocalValue((prev) => ({ ...prev, currency: value }));
  };

  const onSave = () => {
    onChange(priceLocalValue);
  };

  const title = CURRENCY_OPTIONS.find(
    ({ value }) => value === priceLocalValue.currency
  )?.title;

  return (
    <div className="flex flex-col relative">
      <Listbox
        value={priceLocalValue.currency}
        onChange={onChangeCurrency}
        disabled
        as="div"
      >
        <div className="relative mt-1 w-full flex">
          <Listbox.Button className="flex w-full px-5 py-2.5 items-center border text-sm border-gray-200 rounded-xl justify-between">
            {title}
            <ArrowDownSIcon className="h-4 w-4 fill-gray-200 flex-shrink-0" />
          </Listbox.Button>
          <Listbox.Options className="absolute top-full right-0 left-0 z-10 overflow-hidden p-2 rounded-lg text-gray-500 dark:text-gray-500 bg-white dark:bg-neutral-800 ">
            {CURRENCY_OPTIONS.map((option) => (
              <Listbox.Option key={option.value} value={option.value}>
                {({ active, selected }) => (
                  <li className="cursor-pointer focus:outline-none text-sm flex items-center p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
                    {option.title}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      <div className="flex mt-2.5">
        <input
          value={priceLocalValue.from}
          onChange={onChangePriceLocalValue('from')}
          className="border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3"
        />
        <input
          value={priceLocalValue.to}
          onChange={onChangePriceLocalValue('to')}
          className="ml-2.5 border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-gray-100 dark:bg-neutral-900/90 mt-1 border focus:outline-none rounded-md shadow-sm focus:border-gray-500 focus:shadow w-full p-3"
        />
      </div>
      <div>
        <button
          type="button"
          className="mb-1 mt-2.5 w-full bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
