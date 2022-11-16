import classNames from 'classnames'
import { CloseIcon } from '@remixicons/react/fill'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce, useOnClickOutside } from '@fafty/usehooks'
import {
  GetSearchTagsResponseProps,
  getTagsBySearch,
  TagProps,
  useAsync
} from '@fafty/shared/api'

type Props = {
  tags: TagProps[]
  onDelete: (value: TagProps) => void
  onChange: (value: TagProps) => void
}

const TagsInput = ({ tags, onChange, onDelete }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedValue = useDebounce(inputValue, 300)

  const [hiddenTagIndex, setHiddenTagIndex] = useState<number | null>(null)
  // const [selectedSearchedTag, setSelectedSearchedTag] = useState(null);
  const tm: { current: NodeJS.Timeout | null } = useRef(null)

  const {
    data: searchResult,
    call: callSearchTags,
    clearAsyncData
  } = useAsync<GetSearchTagsResponseProps, string>({
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

  const onMouseDown = (searchRecord: TagProps) => () => {
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
    <div
      className={classNames(
        'relative my-2 flex flex-wrap rounded border border-white border-transparent'
      )}
    >
      <div
        onClick={() => inputRef?.current?.focus?.()}
        className="flex w-full cursor-pointer flex-wrap gap-2 rounded-md border border-gray-200 p-2 dark:border-neutral-700"
      >
        {!!tags.length &&
          tags.map((tag, tagIndex) => (
            <div
              onClick={() => onChange(tag)}
              key={tag.slug}
              className={classNames(
                'flex cursor-pointer items-center justify-center rounded bg-blue-600 p-2 text-sm text-white dark:text-slate-50',
                {
                  'bg-gray-500': hiddenTagIndex === tagIndex
                }
              )}
            >
              {tag.name}
              <CloseIcon className="ml-1 h-4 w-4 fill-white" />
            </div>
          ))}
        <input
          placeholder="Type to search tags"
          ref={inputRef}
          className={classNames(
            'border-0 bg-transparent p-2 text-sm outline-0'
          )}
          value={inputValue}
          onKeyDown={handleOnKeyDown}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
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
