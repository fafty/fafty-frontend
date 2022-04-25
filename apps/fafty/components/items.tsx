import React, { useState, useRef, useCallback, useEffect } from 'react';
import ItemType from '../types/item'
import Item from '../components/item'
import { useWindowWidthChange, useDebouncedFunction } from '../hooks'
import isClient from '../utils/isClient'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useNotifications } from '@fafty-frontend/notifications'

type Props = {
  items: ItemType[]
}

const Items = ({ items }: Props) => {
  const [width, setWidth] = useState(null)
  const [notificationId, setNotificationId] = useState(null)
  const [arrows, setArrows] = useState({left: null, right: null})
  const { enqueueNotification, closeNotification } = useNotifications()

  useEffect(() => {
    toggleArrow()
    // Make sure element supports addEventListener
    // On
    const element = isClient ? window : undefined
    const isSupported = element && element.addEventListener
    if (!isSupported) return
    itemsContainer.current.addEventListener('scroll', toggleArrow, { passive: true })
    return () => {
      console.log('return useEffect')
      itemsContainer.current?.removeEventListener('scroll', toggleArrow)
    }
  }, [])

	const scrollContainer = useCallback((node: { getBoundingClientRect: () => { (): any; new(): any; width: any; }; }) => {
    if (node !== null) {
      const calculated = node.getBoundingClientRect().width
      setWidth(calculated)
      debouncedtoggleArrow()
    }
  }, [width])

  const itemsContainer = useRef<HTMLDivElement>(null)

  const handleClick = (): void => {
    const id = enqueueNotification({
      message: 'This is an awesome Notification! and other more data here',
      options: { dismissible: true }
    });
    setNotificationId(id)
  };

  useWindowWidthChange((change: number): void => {
    setWidth(width - change)
    // debouncedtoggleArrow()
  })

  const toggleArrow = (): void => {
    const hasScrollbar = itemsContainer.current.clientWidth < itemsContainer.current.scrollWidth
    const scrolledFromLeft = itemsContainer.current.offsetWidth + itemsContainer.current.scrollLeft
    const scrolledToRight = scrolledFromLeft >= itemsContainer.current.scrollWidth
    const scrolledToLeft = itemsContainer.current.scrollLeft === 0
    setArrows({left: hasScrollbar && !scrolledToLeft, right: hasScrollbar && !scrolledToRight})
  }

  const debouncedtoggleArrow = useDebouncedFunction(toggleArrow, 100)

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
  */
  const advancePage = (direction: string): void => {
    closeNotification(notificationId)

    const items = itemsContainer.current.parentElement.querySelector('.items')
    if (direction === 'backward') {
      items.scrollLeft -= itemsContainer.current.parentElement.clientWidth
    } else if (direction === 'forward') {
      items.scroll({
        left: items.scrollLeft += itemsContainer.current.parentElement.clientWidth,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div>
      <button type="button" onClick={handleClick}>Show notification</button>
        <div className='items-slider'>
          <button type="button" aria-hidden={!arrows.left} className={'navigation-wrapper left ' + (arrows.left ? 'opacity-100' : 'opacity-0 invisible')}>
            <div className="navigation">
              <div aria-label="Previous Items" className="button" tabIndex={arrows.left ? 0 : -1} aria-disabled={!arrows.left} role="button" onClick={() => advancePage('backward')}>
                <ChevronLeftIcon className="h-6 w-6" />
              </div>
            </div>
          </button>
          <div ref={scrollContainer} className="wrapper-items">
            <div ref={itemsContainer} aria-label="Nft list" role="region" className="items">
              <div className='min-w-[44px]' />
                {items.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              <div className='min-w-[44px]' />
            </div>
          </div>
          <button type="button" aria-hidden={!arrows.right} className={'navigation-wrapper right ' + (arrows.right ? 'opacity-100' : 'opacity-0')}>
            <div className="navigation">
              <div aria-label="Next Items" aria-disabled={!arrows.right} className="button" tabIndex={arrows.right ? 0 : -1} role="button" onClick={() => advancePage('forward')}>
                <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

export default Items