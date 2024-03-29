import { useDebouncedCallback, useOnScreen } from '@fafty/usehooks'
import { RadioGroup } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import isClient from '../../../utils/isClient'
import classNames from 'classnames'
import Image from 'next/image'
import { MutableRefObject, SVGProps, useEffect, useRef, useState } from 'react'

interface CollectionProps {
  id: string
  name: string
  logo: string
  speed: string
  popularity: string
  fees: string
}

interface Props {
  initial: string
  onChange: (value: string) => void
}
declare global {
  interface Array<T> {
    move(from: T, to: T): Array<T>
  }
}
Array.prototype.move = function <T>(this: T[], from: number, to: number) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
const collections: CollectionProps[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: '/images/logos/ethereum.svg',
    speed: 'Low',
    popularity: 'High',
    fees: 'High'
  },
  {
    id: 'dfinity',
    name: 'Dfinity Internet Computer',
    logo: '/images/logos/dfinity.svg',
    speed: 'High',
    popularity: 'Average',
    fees: 'Low'
  },
  {
    id: 'near',
    name: 'Near',
    logo: '/images/logos/near.svg',
    speed: 'High',
    popularity: 'Average',
    fees: 'Low'
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: '/images/logos/solana.svg',
    speed: 'High',
    popularity: 'Average',
    fees: 'Low'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    logo: '/images/logos/polygon.svg',
    speed: 'High',
    popularity: 'Average',
    fees: 'Low'
  }
]

const SelectBlockchain = ({ initial, onChange }: Props): JSX.Element => {
  const defaultSelected = collections.find((b) => b.id === initial)
  const [selected, setSelected] = useState(defaultSelected?.id || 'dfinity')
  const [previousSelected, setPreviousSelected] = useState(
    defaultSelected?.id || null
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
  const debouncedToggleArrow = useDebouncedCallback(() => {
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
      { event: 'resize', callback: debouncedToggleArrow },
      { event: 'scroll', callback: debouncedToggleArrow }
    ]
    if (refCurrent) {
      events.forEach(({ event, callback }) => {
        refCurrent.addEventListener(event, callback)
      })
    }
    return () => {
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
    const defaultSelected = collections.find((b) => b.id === initial)
    setSelected(defaultSelected?.id || 'dfinity')
  }, [initial])

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
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
   */
  const scrollItemsToCenterSelected = (id: string, delay: number): void => {
    const item = document.getElementById(id)
    if (item === null || item === undefined) return
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
    <>
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
            {collections.map((collection) => (
              <RadioGroup.Option
                key={collection.name}
                value={collection.id}
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
                  <div id={collection.id} className="relative select-none">
                    <div className="dark:highlight-white/5 relative mx-auto flex max-w-sm items-center gap-6 rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition duration-150 ease-in-out hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                      <div className="absolute top-[0.3rem] right-[0.3rem]">
                        {checked && <CheckIcon className="h-4 w-4" />}
                      </div>
                      <div className="absolute -left-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 shadow-lg">
                        <Image
                          src={collection.logo}
                          alt={collection.name}
                          className="h-16 w-16"
                          width="24"
                          height="24"
                        />
                      </div>
                      <div className="flex flex-col py-4 pl-20 pr-2">
                        <strong className="text-sm font-medium text-slate-900 dark:text-slate-200">
                          {collection.name}
                        </strong>
                        <div className="flex justify-center">
                          <div className="mt-1 flex flex-row space-x-4 text-xs">
                            <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                              <div className="">Speed</div>
                              <div className="">{collection.speed}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                              <div className=" ">Popularity</div>
                              <div className="">{collection.popularity}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                              <div className="">Fees</div>
                              <div className="">{collection.fees}</div>
                            </div>
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
    </>
  )
}

export default SelectBlockchain
