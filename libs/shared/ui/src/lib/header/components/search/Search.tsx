import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SearchIcon } from '@remixicons/react/line';
import { useAsync } from 'apps/fafty/src/api/useAsync';
import { useDebounce, useOnClickOutside } from 'apps/fafty/src/hooks';
import { SearchResultResponse } from 'apps/fafty/src/api/callbacks/search/types';
import { getSearchResult } from 'apps/fafty/src/api/callbacks/search';
import { isObject } from 'apps/fafty/src/utils/isObject';
import classNames from 'classnames';
import { useRouter } from 'next/router';

export const Search = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);
  const [isOpened, setIsOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { push } = useRouter();

  const { data, call } = useAsync<SearchResultResponse, string>({
    withMount: false,
    callback: getSearchResult,
  });

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const onFocus = useCallback(() => {
    setIsOpened(true);
  }, []);

  const onClickItem = useCallback(() => {
    const item = data?.records[activeIndex];

    if (item) {
      setIsOpened(false);

      switch (item.result_type) {
        case 'nft':
          return push('/nft');
        case 'user':
          return push('/account');
      }
    }

    return;
  }, [activeIndex, data]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const maxIndex = data?.records?.length ? data?.records?.length - 1 : -1;

      if (e.code === 'ArrowDown') {
        return setActiveIndex(Math.min(maxIndex, activeIndex + 1));
      }

      if (e.code === 'ArrowUp') {
        return setActiveIndex(Math.max(0, activeIndex - 1));
      }

      if (e.code === 'Enter') {
        return onClickItem();
      }
    },
    [data, activeIndex, setActiveIndex]
  );

  useOnClickOutside(containerRef, () => {
    setIsOpened(false);
    setActiveIndex(-1);
  });

  useEffect(() => {
    if (inputValue) {
      call(inputValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpened, activeIndex, onClickItem]);

  return (
    <div className="relative w-full mx-4 max-w-[600px]" ref={containerRef}>
      <div className=" flex items-center p-2 border border-white rounded">
        <SearchIcon className="h-6 w-6 fill-white mr-2 flex-shrink-0" />
        <input
          onFocus={onFocus}
          onChange={onChangeValue}
          value={inputValue}
          className="h-full w-full bg-transparent outline-none"
        />
        {!!data?.records?.length && isOpened && (
          <div className="flex flex-col absolute bg-white right-0 left-0 top-full rounded">
            {data.records.map(({ searchable }, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  onClick={onClickItem}
                  className={classNames(
                    'flex flex-col p-2 w-full cursor-pointer',
                    {
                      'bg-neutral-600': isActive,
                    }
                  )}
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span
                    className={classNames('text-base font-bold text-gray-900', {
                      'text-slate-50': isActive,
                    })}
                  >
                    {searchable.name}
                  </span>
                  {!isObject(searchable.description) && (
                    <span className="text-sm text-bold text-gray-600">
                      {searchable.description}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
