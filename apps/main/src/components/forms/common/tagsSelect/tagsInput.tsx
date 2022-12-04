import classNames from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'

import React, { useEffect, useRef, useState } from 'react'
import { useDebounce, useOnClickOutside } from '@fafty/usehooks'
import { getTagsBySearch, useAsync } from '@fafty/shared/api'
import { GetSearchTagsResponseType, TagType } from '@fafty/shared/types'
import { motion } from 'framer-motion'

type Props = {
  tags: TagType[]
  onDelete: (value: TagType) => void
  onChange: (value: TagType) => void
}

const TagsInput = ({ tags, onChange, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedValue = useDebounce(inputValue, 300)

  const [hiddenTagIndex, setHiddenTagIndex] = useState<number | null>(null)
  const tm: { current: NodeJS.Timeout | null } = useRef(null)

  const {
    data: searchResult,
    call: callSearchTags,
    clearAsyncData
  } = useAsync<GetSearchTagsResponseType, string>({
    callback: (query?: string) => getTagsBySearch(query)
  })

  /**
   *
   * @param e KeyboardEvent<HTMLInputElement>
   * @returns {void}
   * @example
   * <input onKeyDown={handleOnKeyDown} />
   */
  const handleOnKeyDown = (e: { key: string }): void => {
    const currentIndex = tags.length - 1

    if (e.key === 'Backspace' && tags.length && !inputValue) {
      tm.current && clearTimeout(tm.current)

      if (currentIndex === hiddenTagIndex) {
        onDelete(tags[currentIndex])
      } else {
        setHiddenTagIndex(currentIndex)
      }

      tm.current = setTimeout(() => setHiddenTagIndex(null), 1000)
    }

    const hiddenTagIsNull = hiddenTagIndex === null

    if (searchResult?.records) {
      if (e.key === 'ArrowUp') {
        setHiddenTagIndex(hiddenTagIsNull ? 0 : Math.max(0, hiddenTagIndex - 1))
      }

      if (e.key === 'ArrowDown') {
        setHiddenTagIndex(
          hiddenTagIsNull
            ? 0
            : Math.min(hiddenTagIndex + 1, searchResult?.records.length - 1)
        )
      }

      if (e.key === 'Enter' && !hiddenTagIsNull) {
        onChange(searchResult?.records?.[hiddenTagIndex])
        clearAsyncData()
        setInputValue('')
        setHiddenTagIndex(null)
      }
    }
  }

  const onMouseDown = (searchRecord: TagType) => () => {
    onChange(searchRecord)
    clearAsyncData()
    setInputValue('')
    setHiddenTagIndex(null)
  }

  useEffect(() => {
    callSearchTags(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  useOnClickOutside(inputRef, () => {
    setIsFocused(false)
  })

  return (
    <div className={classNames('relative my-2 flex flex-wrap ')}>
      <motion.div
        layout
        className={classNames(
          'flex w-full flex-wrap gap-2 rounded-md border p-1.5 duration-250 transition ease-in-out',
          {
            'dark:border-blue-600': isFocused,
            'border-neutral-300 dark:border-neutral-700': !isFocused
          }
        )}
      >
        {!!tags.length &&
          tags.map((tag, tagIndex) => (
            <motion.div key={tag.slug} layout className="relative z-20">
              <div
                className={classNames(
                  'duration-250  m-0 box-border flex flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-neutral-200 py-1 pl-2 pr-1 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600',
                  {
                    'bg-gray-500': hiddenTagIndex === tagIndex
                  }
                )}
              >
                {tag.name}
                <button
                  title="Remove tag"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(tag)
                  }}
                  className="ml-1 rounded-full bg-gray-600 px-1 py-1 text-gray-100 hover:bg-gray-500 focus:outline-none dark:bg-neutral-600 dark:hover:bg-neutral-500"
                >
                  <span className="sr-only">Remove tag</span>
                  <XMarkIcon
                    className="h-3 w-3"
                    strokeWidth="2"
                    width={14}
                    height={14}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        <motion.div
          key="input"
          layout="preserve-aspect"
          className="relative w-full min-w-[170px] flex-1"
        >
          <input
            ref={inputRef}
            autoComplete="off"
            spellCheck="false"
            type="search"
            autoCorrect="off"
            autoCapitalize="off"
            name="search"
            id="search"
            placeholder="Type to search tags"
            className={classNames(
              'block w-full border-2 border-transparent bg-transparent px-1 py-1 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base'
            )}
            value={inputValue}
            onKeyDown={handleOnKeyDown}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </motion.div>
      </motion.div>
      {/* </AnimatePresence> */}
      {!!searchResult?.records?.length && isFocused && (
        <div className="absolute top-full left-0 right-0 flex flex-col bg-white">
          {searchResult?.records.map((searchRecord, searchRecordIndex) => {
            const isHiddenTagIndex = hiddenTagIndex === searchRecordIndex

            return (
              <div
                onMouseDown={onMouseDown(searchRecord)}
                onMouseEnter={() => setHiddenTagIndex(searchRecordIndex)}
                className={classNames('flex w-full cursor-pointer flex-col', {
                  'bg-neutral-600': isHiddenTagIndex
                })}
                key={searchRecord.slug}
              >
                <span
                  className={classNames('w-full p-2 text-base font-bold', {
                    'text-white': isHiddenTagIndex,
                    'text-gray-900': !isHiddenTagIndex
                  })}
                >
                  {searchRecord.name}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TagsInput
