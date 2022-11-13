import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { CloseIcon } from '@remixicons/react/fill';
import { useOnClickOutside } from '@fafty/usehooks';
import {
  FilterTypeArray,
  FilterTypeRange,
  FilterTypes,
  RangeFilterValue,
  TagProps,
} from './types';
import { ArrayFilter } from './arrayFilter';
import { RangeFilter } from './rangeFilter';

export function Tag<T>({ onClickClose, value, filter, onChange }: TagProps<T>) {
  const tagRef = useRef(null);
  const [openedFilterTag, setOpenedFilterTag] = useState(false);

  useOnClickOutside(tagRef, () => {
    setOpenedFilterTag(false);
  });

  const renderAbsoluteContent = useMemo(() => {
    if (filter.type === FilterTypes.ARRAY) {
      const currentFilter = filter as FilterTypeArray;

      return (
        <ArrayFilter
          options={currentFilter.options}
          value={value as string[]}
          onChange={(value) => {
            setOpenedFilterTag(false);
            onChange(value);
          }}
        />
      );
    }

    if (filter.type === FilterTypes.RANGE) {
      const currentFilter = filter as FilterTypeRange;

      return (
        <RangeFilter
          value={value as RangeFilterValue}
          params={currentFilter.params}
          onChange={(value) => {
            setOpenedFilterTag(false);
            onChange(value);
          }}
        />
      );
    }
  }, [filter, onChange, value]);

  const renderTitle = useMemo(() => {
    if (filter.type === FilterTypes.ARRAY) {
      const currentFilter = filter as FilterTypeArray;
      const currentValue = value as string[];
      const totalTitles = currentValue.reduce((total, current) => {
        const optionTitle = currentFilter.options.find(
          (option) => option.value === current
        )?.title;

        if (optionTitle) {
          total.push(optionTitle);
        }

        return total;
      }, []);

      return `${currentFilter.title}: ${totalTitles.join(', ').trim()}`;
    }

    if (filter.type === FilterTypes.RANGE) {
      const currentFilter = filter as FilterTypeRange;
      const currentValue = value as RangeFilterValue;

      return `${currentFilter.title}: ${currentFilter.params.firstTitle}: ${
        currentValue[currentFilter.params.firstKey]
      } - ${currentFilter.params.secondTitle}: ${
        currentValue[currentFilter.params.secondKey]
      }`;
    }
  }, [filter, value]);

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
            e.stopPropagation();
            onClickClose();
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
  );
}
