import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { SearchIcon } from '@remixicons/react/line'
import { useDebounce, useOnClickOutside } from '@fafty/usehooks'
import {
  useAsync,
  SearchResultResponseProps,
  getSearchResult,
} from '@fafty/shared/api'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Viewer } from '@fafty/text/viewer'
const isObjectEmpty = (value: object | string | null) => {
  return (
    (!value && value == null) ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    (typeof value === 'object' &&
      Object.keys(value).length === 0 &&
      Object.getPrototypeOf(value) === Object.prototype)
  )
}
export const Search = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 300)
  const [isOpened, setIsOpened] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { push } = useRouter()

  const { data, call } = useAsync<SearchResultResponseProps, string>({
    withMount: false,
    callback: getSearchResult,
  })

  const onChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
    },
    [setInputValue]
  )

  const onFocus = useCallback(() => {
    setIsOpened(true)
  }, [])

  const onClickItem = useCallback(() => {
    const item = data?.records[activeIndex]

    if (item) {
      setIsOpened(false)

      switch (item.result_type) {
        case 'collection':
          return push(`/collection/${item?.searchable?.slug}`)
        case 'bundle':
          return push(`/bundle/${item?.searchable?.slug}`)
        case 'asset':
          return push(`/asset/${item?.searchable?.slug}`)
        case 'user':
          return push(`/account/${item?.searchable?.slug}`)
      }
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, data])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const maxIndex = data?.records?.length ? data?.records?.length - 1 : -1

      if (e.code === 'ArrowDown') {
        return setActiveIndex(Math.min(maxIndex, activeIndex + 1))
      }

      if (e.code === 'ArrowUp') {
        return setActiveIndex(Math.max(0, activeIndex - 1))
      }

      if (e.code === 'Enter') {
        return onClickItem()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, activeIndex, setActiveIndex]
  )

  useOnClickOutside(containerRef, () => {
    setIsOpened(false)
    setActiveIndex(-1)
  })

  useEffect(() => {
    if (inputValue) {
      call(inputValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpened, activeIndex, onClickItem])

  return (
    <div className="relative mx-4 w-full max-w-[600px]" ref={containerRef}>
      <div className="flex items-center">
        <div className="h-[50px] w-full">
          <div className=" pointer-events-none absolute inset-y-0 left-0 flex items-center p-2 pl-3 pr-5">
            <span
              className={classNames(
                {
                  'fill-blue-500': isOpened,
                  'fill-gray-300 dark:fill-neutral-700': !isOpened,
                },
                'transition duration-200 sm:text-sm'
              )}
            >
              <SearchIcon className="mr-2 h-5 w-5 flex-shrink-0" />
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
                ? 'rounded-t-xl border-b-0 border-blue-500'
                : 'rounded-xl',
              'block w-full border-2 border-gray-200 bg-transparent p-3 pl-9 pr-3 ring-0 transition duration-200 hover:border-blue-300/70 focus:border-blue-500 focus:ring-0 focus:ring-offset-0 dark:border-neutral-700 dark:hover:border-blue-500/70 dark:focus:border-blue-500 sm:text-sm md:text-base'
            )}
            placeholder="Search for Assets, Collections, Users, Bundles etc."
          />
        </div>
        {!!data?.records?.length && isOpened && (
          <div className="absolute right-0 left-0 top-full z-10 flex max-h-[calc(100vh_-_80px)] flex-col overflow-hidden overflow-x-scroll overflow-y-scroll rounded-b-xl border-x-2 border-b-2 border-blue-500 bg-white/95  shadow drop-shadow-lg     backdrop-blur  transition duration-300 dark:bg-neutral-800/95">
            {data.records.map(({ result_type, searchable }, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  onClick={onClickItem}
                  className={classNames(
                    'flex w-full cursor-pointer flex-row items-center p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100/95 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700/95',
                    {
                      'bg-neutral-100/95 dark:bg-neutral-700/95': isActive,
                    }
                  )}
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div
                    className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600"
                    style={{
                      backgroundColor: searchable?.image.dominant_color || '',
                    }}
                  >
                    <Image
                      className="relative inline-block h-9 w-9 rounded-full ring-1 ring-white"
                      src={searchable?.image.src || ''}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">{searchable.name}</p>
                    <p className="text-xs font-medium opacity-50">
                      {result_type}
                    </p>
                    <div className="mt-1 text-xs font-medium opacity-50">
                      {isObjectEmpty(searchable.description) ? (
                        <span>No description</span>
                      ) : (
                        <span>
                          <Viewer
                            namespace={'description'}
                            editorState={searchable.description}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
