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
        case 'collection':
          return push(`/collection/${item?.searchable?.slug}`);
        case 'bundle':
          return push(`/bundle/${item?.searchable?.slug}`);
        case 'nft':
          return push(`/nft/${item?.searchable?.slug}`);
        case 'user':
          return push(`/account/${item?.searchable?.slug}`);
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
      <div className="flex items-center">
        <div className="w-full h-[50px]">
          <div className="pointer-events-none absolute p-2 inset-y-0 left-0 flex items-center pl-3 pr-5">
            <span
              className={classNames(
                {
                  'fill-blue-500': isOpened,
                  'fill-gray-300 dark:fill-neutral-700': !isOpened,
                },
                'sm:text-sm'
              )}
            >
              <SearchIcon className="h-5 w-5 mr-2 flex-shrink-0" />
            </span>
          </div>
          <input
            onFocus={onFocus}
            onChange={onChangeValue}
            value={inputValue}
            autoComplete="off"
            spellCheck="false"
            type="search"
            autoCorrect="off"
            autoCapitalize="off"
            name="search"
            id="search"
            className={classNames(
              !!data?.records?.length && isOpened
                ? 'border-b-0 rounded-t-xl border-blue-500'
                : 'rounded-xl',
              'border-2 focus:ring-0 focus:ring-offset-0 block w-full bg-transparent border-gray-200 dark:border-neutral-700 pl-9 pr-3 p-3 focus:border-blue-500 ring-0 dark:focus:border-blue-500 sm:text-sm md:text-base'
            )}
            placeholder="Search for NFTs, Collections, Users, Bundles etc."
          />
        </div>
        {!!data?.records?.length && isOpened && (
          <div className="flex flex-col absolute backdrop-blur bg-white/95 dark:bg-neutral-800/95 border-x-2 border-b-2 border-blue-500 shadow transition duration-300 right-0 left-0 top-full rounded-b-xl">
            {data.records.map(({ result_type, searchable }, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  onClick={onClickItem}
                  className={classNames(
                    'flex flex-col p-2 w-full cursor-pointer focus:outline-none transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100/95 dark:text-neutral-100 dark:hover:bg-neutral-700/95',
                    {
                      'bg-neutral-100/95 dark:bg-neutral-700/95': isActive,
                    }
                  )}
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span
                    className={classNames('mx-3 text-base font-medium', {
                      'text-neutral-700 dark:text-neutral-200': isActive,
                    })}
                  >
                    {searchable.name}
                  </span>
                  <span className="block">{result_type}</span>
                  {!isObject(searchable.description) && (
                    <span className="text-sm text-bold text-gray-300">
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
