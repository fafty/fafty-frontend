import React, { useState, useRef, useEffect } from 'react';
import {default as AssetItem } from './items/asset/item';
import {default as BundleItem } from './items/bundle/item';
import {default as CollectionItem} from './items/collection/item';

import isClient from '../utils/isClient';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNotifications } from '@fafty-frontend/notifications';
import classNames from 'classnames';
import { useDebouncedCallback } from '@fafty-frontend/usehooks';
import { AssetProps, BundleProps, CollectionProps } from '@fafty-frontend/shared/api';

interface Props <T> {
  type: 'asset' | 'bundle' | 'collection';
  items: T
}

const Items = <T extends AssetProps[] | BundleProps[] | CollectionProps[]>({ type, items }: Props<T>): JSX.Element => {
  const [notificationId, setNotificationId] = useState<number>();
  const { enqueueNotification, closeNotification } = useNotifications();
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const [arrows, setArrows] = useState({ left: false, right: false });

  const toggleArrow = (): void => {
    if (itemsContainerRef.current === null) return;
    const hasScrollbar =
      itemsContainerRef.current.clientWidth <
      itemsContainerRef.current.scrollWidth;
    const scrolledFromLeft =
      itemsContainerRef.current.offsetWidth +
      itemsContainerRef.current.scrollLeft;
    const scrolledToRight =
      scrolledFromLeft >= itemsContainerRef.current.scrollWidth;
    const scrolledToLeft = itemsContainerRef.current.scrollLeft === 0;

    setArrows({
      left: hasScrollbar && !scrolledToLeft,
      right: hasScrollbar && !scrolledToRight,
    });
  };
  const debouncedtoggleArrow = useDebouncedCallback(() => {
    toggleArrow();
  }, 100);

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const element = isClient ? window : undefined;
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    // Set first arrows
    toggleArrow();
    const refCurrent = itemsContainerRef.current;
    // Add event listener
    const events = [
      { event: 'resize', callback: debouncedtoggleArrow },
      { event: 'scroll', callback: debouncedtoggleArrow },
    ];
    if (refCurrent) {
      events.forEach(({ event, callback }) => {
        refCurrent.addEventListener(event, callback);
      });
    }
    return () => {
      // Remove event listener on unmount
      if (refCurrent) {
        events.forEach(({ event, callback }) => {
          refCurrent.removeEventListener(event, callback);
        });
      }
    };
  }, []);

  const handleClick = (): void => {
    // create notification demo
    const id = enqueueNotification({
      title: 'Notification title',
      message: 'This is an awesome Notification! and other more data here',
      options: { dismissible: true, playSound: true },
      position: 'bottom-left',
    });
    setNotificationId(id);
  };

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
   */
  const scrollItems = (direction: string): void => {
    notificationId && closeNotification(notificationId);
    if (itemsContainerRef.current === null) return;
    const items =
      itemsContainerRef.current?.parentElement?.querySelector('.items');
    if (items === null || items === undefined) return;

    const operator = direction === 'right' ? '+' : '-';
    const scrollLeft = eval(
      'items.scrollLeft' + operator + 'itemsContainerRef.current?.clientWidth'
    );
    items &&
      items.scroll({
        left: scrollLeft,
        behavior: 'smooth',
      });
  };

  const Button = ({ direction }: { direction: string }): JSX.Element => {
    const isVisible = direction === 'right' ? arrows.right : arrows.left;
    return (
      <div
        className={classNames('navigation-wrapper', {
          left: direction === 'left',
          right: direction === 'right',
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        })}
      >
        <div className="navigation">
          <div
            className="button"
            {...{
              'aria-label':
                direction === 'rught' ? 'Next Items' : 'Previous Items',
            }}
            role="button"
            {...(!isVisible && { 'aria-hidden': true, 'aria-disabled': true })}
            tabIndex={isVisible ? 0 : -1}
            onClick={() => scrollItems(direction)}
          >
            {direction === 'right' ? (
              <ChevronRightIcon
                className="h-6 w-6"
                strokeWidth="2"
                aria-hidden="true"
              />
            ) : (
              <ChevronLeftIcon
                className="h-6 w-6"
                strokeWidth="2"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="items-slider">
        <Button direction="left" />
        <div className="wrapper-items">
          <div
            ref={itemsContainerRef}
            aria-label="Items list"
            role="region"
            className="items carousel"
          >
            <div className="min-w-[44px]" />
            {items &&
              items.map((item, index) => {
                switch (type) {
                  case 'asset':
                    return <AssetItem key={index} item={item}/>;
                  case 'bundle':
                    return <BundleItem key={index} item={item} />;
                  case 'collection':
                    return <CollectionItem key={index} item={item} />;
                  default:
                    return null;
                }
              })}
            <div className="min-w-[44px]" />
          </div>
        </div>
        <Button direction="right" />
      </div>
    </div>
  );
};

export default Items;
