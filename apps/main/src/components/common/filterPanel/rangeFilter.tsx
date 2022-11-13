import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { RangeFilterValue } from './types';

type Props = {
  value?: RangeFilterValue;
  onChange: (value: RangeFilterValue) => void;
  params: {
    firstTitle: string;
    secondTitle: string;
    firstKey: string;
    secondKey: string;
  };
};

export const RangeFilter = ({
  value = { from: '', to: '' },
  onChange,
  params,
}: Props) => {
  const [localPriceValue, setLocalPriceValue] = useState(value);

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

  console.log(params);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-auto transform items-center sm:px-0">
        <div className="flex w-[250px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="flex w-full justify-start p-3">
            <input
              type="number"
              title={params.firstTitle}
              placeholder="From"
              value={localPriceValue[params.firstTitle]}
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
    </motion.div>
  );
};
