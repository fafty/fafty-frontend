import { useDebouncedCallback, useOnScreen } from '@fafty/usehooks'
import { RadioGroup } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ImageIcon } from '@remixicons/react/line'
import { api } from '@fafty/shared/api'
// import { useDebouncedCallback } from '../../../hooks';
import isClient from '../../../utils/isClient'
import classNames from 'classnames'
import Image from 'next/image'
import { MutableRefObject, SVGProps, useEffect, useRef, useState } from 'react'

// TODO extend exist types from @fafty/shared/api
interface CollectionProps {
  token: string
  name: string
  description: string
  supply: number
  cover?: {
    src: string
    dominant_color: string
  }
  speed: string
  popularity: string
  fees: string
}

interface ResponceProps {
  records: CollectionProps[]
}

interface Props {
  initial: string
  onChange: (value: string) => void
}

/**
 * @name CheckIcon
 * @description - On select collection item mark it as selected by icon.
 * @param {JSX.IntrinsicAttributes & SVGProps<SVGSVGElement} props
 * @returns {JSX.Element}
 * @example
 * <CheckIcon className="w-5 h-5 text-white" />
 */
function CheckIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle className="fill-blue-600" cx={12} cy={12} r={12} />
      <path
        d="M7 13l3 3 7-7"
        className="stroke-white "
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Select collection component
 * @name SelectCollection
 * @description Select collection component.
 * @param props
 * @param {string} props.initial - initial collections
 * @param {(collection: CollectionProps) => void} props.onChange - Change event handler.
 * @returns {JSX.Element}
 * @example
 * <SelectCollection initial={initial} onChange={onChange} />
 */
const SelectCollection = ({ initial, onChange }: Props): JSX.Element => {
  const [data, setData] = useState<CollectionProps[] | null>(null)
  const [loading, setLoading] = useState(false)
  const defaultSelected =
    initial === 'none'
      ? { token: initial }
      : data && data.find((b) => b.token === initial)
  const [selected, setSelected] = useState(defaultSelected?.token || '')
  const [previousSelected, setPreviousSelected] = useState(
    defaultSelected?.token || null
  )
  const itemsContainerRef = useRef<HTMLDivElement | null>(null)
  const [arrows, setArrows] = useState({ left: false, right: false })

  const toggleArrow = (): void => {
    if (itemsContainerRef.current === null) return
    const hasScrollbar =
      itemsContainerRef.current.clientWidth <
      itemsContainerRef.current.scrollWidth
    const scrolledFromLeft =
      itemsContainerRef.current.offsetWidth +
      itemsContainerRef.current.scrollLeft
    const scrolledToRight =
      scrolledFromLeft >= itemsContainerRef.current.scrollWidth
    const scrolledToLeft = itemsContainerRef.current.scrollLeft === 0

    setArrows({
      left: hasScrollbar && !scrolledToLeft,
      right: hasScrollbar && !scrolledToRight
    })
  }
  const debouncedtoggleArrow = useDebouncedCallback(() => {
    toggleArrow()
  }, 100)

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const element = isClient ? window : undefined
    const isSupported = element && element.addEventListener
    if (!isSupported) return
    // Set first arrows
    toggleArrow()
    const refCurrent = itemsContainerRef.current
    // Add event listener
    const events = [
      { event: 'resize', callback: debouncedtoggleArrow },
      { event: 'scroll', callback: debouncedtoggleArrow }
    ]
    if (refCurrent) {
      events.forEach(({ event, callback }) => {
        refCurrent.addEventListener(event, callback)
      })
    }
    fetchData()

    return () => {
      setLoading(false)
      setData(null)
      // Remove event listener on unmount
      if (refCurrent) {
        events.forEach(({ event, callback }) => {
          refCurrent.removeEventListener(event, callback)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onScreen: boolean = useOnScreen<HTMLDivElement>(
    itemsContainerRef as MutableRefObject<HTMLDivElement>,
    '0px'
  )
  useEffect(() => {
    if (onScreen) {
      scrollItemsToCenterSelected(selected, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen])

  useEffect(() => {
    if (selected !== previousSelected) {
      scrollItemsToCenterSelected(selected, 300)
    }
    onChange(selected)
    setPreviousSelected(selected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  useEffect(() => {
    if (initial !== 'none') {
      const defaultSelected = data && data.find((b) => b.token === initial)
      setSelected(defaultSelected?.token || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial, loading])

  const fetchData = async () => {
    setLoading(true)
    const response = await api.get<ResponceProps>('user/0xfaftyandrew/collections')
    if (response.status === 200 && response.data) {
      const { data } = response
      setData(data.records)
      setLoading(false)
    }
  }

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
   * @returns {void}
   */
  const scrollItems = (direction: string): void => {
    if (itemsContainerRef.current === null) return
    const items =
      itemsContainerRef.current?.parentElement?.querySelector('.items')
    if (items === null || items === undefined) return

    const operator = direction === 'right' ? '+' : '-'
    const scrollLeft = eval(
      'items.scrollLeft' + operator + 'itemsContainerRef.current?.clientWidth'
    )
    items &&
      items.scroll({
        left: scrollLeft,
        behavior: 'smooth'
      })
  }

  /**
   * Scroll to the center of the selected item
   * @param {String} id The id of item to scroll to
   * @returns {void}
   */
  const scrollItemsToCenterSelected = (id: string, delay: number): void => {
    const item = document.getElementById(id)
    if (!item) return

    const parentNode = item.parentNode as HTMLElement

    if (item && item instanceof HTMLElement) {
      const scrollSize = item.getBoundingClientRect()

      setTimeout(function () {
        if (scrollSize?.left && scrollSize.width) {
          itemsContainerRef.current?.scroll({
            left: parentNode?.offsetLeft - scrollSize.width
          })
        }
      }, delay)
    }
  }

  /**
   * Button Arrow left or right.
   * @param {string} direction - left or right
   * @returns {JSX.Element}
   * @example
   * <Button direction="left" />
   * <Button direction="right" />
   *
   */
  const Button = ({ direction }: { direction: string }): JSX.Element => {
    const isVisible = direction === 'right' ? arrows.right : arrows.left
    return (
      <div
        className={classNames('navigation-wrapper', {
          left: direction === 'left',
          right: direction === 'right',
          'opacity-0': !isVisible,
          'opacity-100': isVisible
        })}
      >
        <div className="navigation">
          <div
            className="button"
            {...{
              'aria-label':
                direction === 'right' ? 'Next Items' : 'Previous Items'
            }}
            role="button"
            {...(!isVisible && { 'aria-hidden': true, 'aria-disabled': true })}
            tabIndex={isVisible ? 0 : -1}
            onClick={() => scrollItems(direction)}
          >
            {direction === 'right' ? (
              <ChevronRightIcon
                className="h-4 w-4"
                strokeWidth="2"
                aria-hidden="true"
              />
            ) : (
              <ChevronLeftIcon
                className="h-4 w-4"
                strokeWidth="2"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="collection-slider">
      <Button direction="left" />
      <div className="wrapper-items">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          as="div"
          ref={itemsContainerRef}
          aria-label="Items list"
          role="region"
          className="items"
        >
          <div className="min-w-[44px]" />
          <RadioGroup.Option
            value="none"
            className={({ checked }) =>
              classNames(
                'item relative my-2 flex cursor-pointer overflow-hidden rounded-lg shadow focus:outline-none',
                {
                  'ring-2 ring-blue-600': checked,
                  'bg-white bg-opacity-75 text-slate-900 dark:bg-neutral-700 dark:text-slate-50':
                    checked
                }
              )
            }
          >
            {({ checked }) => (
              <div
                id="none"
                className="flex w-[15rem] select-none items-stretch"
              >
                <div className="dark:highlight-white/5 mx-auto flex max-w-sm items-center gap-6 self-end rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition duration-150 ease-in-out hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                  <div className="absolute top-[0.3rem] right-[0.3rem]">
                    {checked && <CheckIcon className="h-4 w-4" />}
                  </div>
                  <div className="absolute -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 shadow-lg">
                    <ImageIcon strokeWidth="2" className="h-16 w-16" />
                  </div>
                  <div className="flex flex-col py-4 pl-20 pr-2">
                    <strong className="text-sm font-medium text-slate-900 dark:text-slate-200">
                      Without Collection
                    </strong>
                    <div className="flex justify-center">
                      <div className="mt-1 flex flex-row space-x-4">
                        <span className="flex flex-col items-center justify-center text-xs text-slate-500 dark:text-slate-400">
                          You create item not included to the collection.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </RadioGroup.Option>

          {data &&
            data.map((collection) => (
              <RadioGroup.Option
                key={collection.name}
                value={collection.token}
                className={({ checked }) =>
                  classNames(
                    'item relative my-2 flex cursor-pointer overflow-hidden rounded-lg shadow focus:outline-none',
                    {
                      'ring-2 ring-blue-600': checked,
                      'bg-white bg-opacity-75 text-slate-900 dark:bg-neutral-700 dark:text-slate-50':
                        checked
                    }
                  )
                }
              >
                {({ checked }) => (
                  <div
                    id={collection.token}
                    className="flex select-none items-stretch"
                  >
                    <div className="dark:highlight-white/5 mx-auto flex max-w-sm items-center gap-6 self-stretch rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition duration-150 ease-in-out hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 ">
                      <div className="absolute top-[0.3rem] right-[0.3rem]">
                        {checked && <CheckIcon className="h-4 w-4" />}
                      </div>
                      <div className="absolute -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 shadow-lg">
                        {collection.cover && (
                          <Image
                            src={collection.cover?.src || ''}
                            alt={collection.name}
                            className="inline-block h-24 w-24 rounded-full"
                            width="96"
                            height="96"
                          />
                        )}
                      </div>
                      <div className="inset-0 flex flex-col py-4 pl-20 pr-2">
                        <strong className="text-sm font-medium text-slate-900 dark:text-slate-200">
                          {collection.name}
                        </strong>
                        <div className="flex">
                          <div className="mt-1 flex flex-row space-x-4">
                            <span className="text-[0.70rem] text-slate-500 dark:text-slate-400">
                              <span className="font-medium">
                                {collection.supply}
                              </span>
                              <span className="ml-1">Items</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          <div className="min-w-[44px]" />
        </RadioGroup>
      </div>
      <Button direction="right" />
    </div>
  )
}

export default SelectCollection
