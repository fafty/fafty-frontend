import { useState } from 'react';
import { Checkbox } from '../checkbox';
import { motion } from 'framer-motion';

type ArrayFilterOptions = {
  title: string;
  value: string;
};

type Props = {
  options: ArrayFilterOptions[];
  value: string[];
  onChange: (value: string[]) => void;
};

export const ArrayFilter = ({ value = [], onChange, options }: Props) => {
  const [localValue, setLocalValue] = useState<string[]>(value);

  const onChangeCheckbox = (checkboxValue) => () => {
    const isIncludes = localValue.includes(checkboxValue);

    if (isIncludes) {
      setLocalValue(
        localValue.filter((filterValue) => filterValue !== checkboxValue)
      );
    } else {
      setLocalValue([...localValue, checkboxValue]);
    }
  };

  const onSaveFilters = () => {
    onChange(localValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-auto transform items-center sm:px-0">
        <div className="flex w-[150px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="flex w-full flex-col justify-start gap-2.5 p-3">
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
          <div className=" flex w-full justify-end border-t border-white p-1">
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
