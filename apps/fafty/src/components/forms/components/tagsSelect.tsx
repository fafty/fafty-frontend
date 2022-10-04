import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAsync } from '../../../api/useAsync';
import { getPopularTags, getTagsBySearch } from '../../../api/callbacks/tags';
import { GetSearchTagsResponse, Tag } from '../../../api/callbacks/tags/types';
import classNames from 'classnames';
import { useDebounce, useOnClickOutside } from '../../../hooks';

type Props = {
  onChange: (value: Tag[]) => void;
  value: Tag[];
};

export const TagsSelect = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedValue = useDebounce(inputValue, 300);

  const { data: popularData } = useAsync({
    callback: getPopularTags,
    withMount: true,
  });

  const { data: searchResult, call: callSearchTags } = useAsync<
    GetSearchTagsResponse,
    string
  >({
    callback: (query?: string) => getTagsBySearch(query),
  });

  const onChangeTag = (tag: Tag) => {
    const isIncludes = value.find((valueTag) => valueTag.slug === tag.slug);

    if (isIncludes) {
      onChange(value.filter((valueTag) => valueTag.slug !== tag.slug));
    } else {
      onChange([...value, tag]);
    }
  };

  const onKeyDown = (e: { key: string }) => {
    if (e.key === 'Backspace' && value.length && !inputValue) {
      onChange([...value.slice(0, -1)]);
    }
  };

  useEffect(() => {
    callSearchTags(debouncedValue);
  }, [debouncedValue]);

  useOnClickOutside(inputRef, () => {
    setIsFocused(false);
  });

  const filteredPopularTags = useMemo(() => {
    return (
      popularData?.records?.filter(
        ({ slug }) => !value?.find((valueTag) => valueTag.slug === slug)
      ) || []
    );
  }, [popularData, value]);

  return (
    <div className="flex flex-col">
      <div
        className={classNames(
          'flex relative  flex-wrap rounded border-white border-transparent px-2 my-2 border w-1/2',
          {
            'py-2': !value.length,
          }
        )}
      >
        <div
          onClick={() => inputRef?.current?.focus?.()}
          className="flex w-[350px] p-1.5 rounded-md gap-2.5 flex-wrap border border-gray-200 dark:border-neutral-700 cursor-pointer"
        >
          {!!value.length &&
            value.map((tag) => (
              <div
                onClick={() => onChangeTag(tag)}
                key={tag.slug}
                className="bg-blue-600 text-white dark:text-slate-50 text-xs px-1 py-1 cursor-pointer flex"
              >
                {tag.name}
              </div>
            ))}
          <input
            ref={inputRef}
            className={classNames('border-0 outline-0 bg-transparent text-sm')}
            value={inputValue}
            onKeyDown={onKeyDown}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {!!searchResult?.records?.length && isFocused && (
          <div className="flex flex-col absolute top-full left-0 right-0 bg-white">
            {searchResult?.records.map((searchRecord) => (
              <div
                onMouseDown={() => onChangeTag(searchRecord)}
                className={classNames(
                  'flex flex-col p-2 w-full cursor-pointer hover:bg-neutral-600'
                )}
                key={searchRecord.slug}
              >
                <span className="text-base font-bold text-gray-900 hover:text-slate-50">
                  {searchRecord.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {!!filteredPopularTags.length && (
        <div className="flex flex-col">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-3">
            Popular tags
          </span>
          <div className="flex flex-wrap gap-2.5 col-auto -mt-2.5">
            {filteredPopularTags?.map((record) => (
              <div
                key={record.slug}
                onClick={() => onChangeTag(record)}
                className="bg-blue-600 text-sm px-4 py-2 cursor-pointer flex text-white dark:text-slate-50"
              >
                {record.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
