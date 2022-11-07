import { ChangeEvent, Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { FiltersPrice } from './types';

type Props = {
  value?: FiltersPrice;
  onChange: (value: FiltersPrice) => void;
};

export const Price = ({ value = {}, onChange }: Props) => {
  const [localPriceValue, setLocalPriceValue] = useState<FiltersPrice>(value);

  const onChangePriceLocalValue =
    (key: string) => (changeValue: ChangeEvent<HTMLInputElement>) => {
      setLocalPriceValue((prev) => ({
        ...prev,
        [key]: changeValue.target.value,
      }));
    };

  const onSaveFilters = () => {
    onChange(localPriceValue);
  };

  return (
    <Transition
      as={Fragment}
      show
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div className="flex w-auto transform items-center sm:px-0">
        <div className="flex w-[250px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="flex w-full justify-start p-3">
            <input
              type="number"
              title="min"
              placeholder="From"
              value={localPriceValue.min}
              onChange={onChangePriceLocalValue('min')}
              className="mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
            />
            <input
              type="number"
              title="max"
              placeholder="To"
              value={localPriceValue.max}
              onChange={onChangePriceLocalValue('max')}
              className="ml-2.5 mt-1 w-full rounded-md border border-gray-200 p-3 text-gray-700 shadow-sm focus:border-gray-500 focus:shadow focus:outline-none dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-gray-100"
            />
          </div>
          <div className="flex w-full justify-end border-t border-white p-1">
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
    </Transition>
  );
};
