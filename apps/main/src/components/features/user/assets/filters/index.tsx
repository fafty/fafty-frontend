import { FunnelIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useOnClickOutside } from '@fafty/usehooks';
import {
  FiltersPrice,
  FiltersProps,
  VisibilityValues,
  BlockchainValues,
  ContentTypeValues,
  RestrictionsValues,
  FiltersState,
} from './types';
import { Visibility } from './visibility';
import { Restrictions } from './restrictions';
import { Blockchain } from './blockchain';
import { ContentType } from './contentType';
import { Price } from './price';
import classNames from 'classnames';
import { CloseIcon } from '@remixicons/react/fill';
import {
  BLOCKCHAIN_CHECKS,
  CONTENT_TYPE_CHECKS,
  RESTRICTIONS_CHECKS,
  VISIBILITY_CHECKS,
} from './constants';

const FILTERS = [
  {
    title: 'Visibility',
    value: 'visibility',
  },
  {
    title: 'Restrictions',
    value: 'restrictions',
  },
  {
    title: 'Blockchain',
    value: 'blockchain',
  },
  {
    title: 'Price',
    value: 'price',
  },
  {
    title: 'Type',
    value: 'type',
  },
];

export const Filters = ({
  values = {},
  onChange,
  onCloseTag,
}: FiltersProps) => {
  const [activeFilter, setActiveFilter] = useState('');
  const filterContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef();
  const [isOpenedPopover, setIsOpenedPopover] = useState(false);
  const [filterPosition, setFilterPosition] = useState({
    x: 0,
    y: 0,
  });

  const togglePopover = useCallback(() => {
    setIsOpenedPopover((prev) => !prev);
  }, [setIsOpenedPopover]);

  const onClickFunnel = useCallback(() => {
    if (!(isOpenedPopover && activeFilter)) {
      togglePopover();
    }
    const { x, y } = buttonRef.current.getBoundingClientRect();

    setFilterPosition({ x, y });
    setActiveFilter('');
  }, [activeFilter, isOpenedPopover, togglePopover]);

  const renderActiveFilter = useMemo(() => {
    switch (activeFilter) {
      case 'visibility':
        return (
          <Visibility
            value={values?.visibility}
            onChange={(value: VisibilityValues[]) => {
              setIsOpenedPopover(false);
              onChange('visibility', value);
            }}
          />
        );
      case 'restrictions':
        return (
          <Restrictions
            value={values?.restrictions}
            onChange={(value: RestrictionsValues[]) => {
              setIsOpenedPopover(false);
              onChange('restrictions', value);
            }}
          />
        );
      case 'blockchain':
        return (
          <Blockchain
            value={values?.blockchain}
            onChange={(value: BlockchainValues[]) => {
              setIsOpenedPopover(false);
              onChange('blockchain', value);
            }}
          />
        );
      case 'type':
        return (
          <ContentType
            value={values?.type}
            onChange={(value: ContentTypeValues[]) => {
              setIsOpenedPopover(false);
              onChange('type', value);
            }}
          />
        );
      case 'price':
        return (
          <Price
            value={values?.price}
            onChange={(value: FiltersPrice) => {
              setIsOpenedPopover(false);
              onChange('price', value);
            }}
          />
        );
      default:
        return (
          <div className="flex items-center overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
            <div className="relative flex flex-col gap-1 p-1">
              {FILTERS.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
                  onClick={() => {
                    setActiveFilter(item.value);
                  }}
                >
                  <div className="text-left">
                    <p className="mx-4 text-base font-medium">{item.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  }, [
    activeFilter,
    onChange,
    values?.blockchain,
    values?.price,
    values?.restrictions,
    values?.type,
    values?.visibility,
  ]);

  // useOnClickOutside(filterContainerRef, () => {
  //   setActiveFilter('');
  // });

  const onClickTag =
    (valueKey: keyof FiltersState) =>
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      const node = e.target as HTMLElement;
      const { x, y } = node.getBoundingClientRect();

      if (!isOpenedPopover) {
        setIsOpenedPopover(true);
      }

      setFilterPosition({ x, y });
      setActiveFilter(valueKey);
    };

  const renderTags = useMemo(() => {
    const allKeyValuesTitle = [
      ...RESTRICTIONS_CHECKS,
      ...VISIBILITY_CHECKS,
      ...CONTENT_TYPE_CHECKS,
      ...BLOCKCHAIN_CHECKS,
    ].reduce((total, current) => {
      return { ...total, [current.value]: current.title };
    }, {});

    return Object.keys(values).map((valueKey: keyof FiltersState) => {
      if (Array.isArray(values[valueKey])) {
        const currentValue = values[valueKey] as Array<FiltersState>;

        const { title } = FILTERS.find((filter) => filter.value === valueKey);

        return (
          <div
            onClick={onClickTag(valueKey)}
            key={valueKey}
            className={classNames(
              'flex flex-shrink-0 cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-sm text-white dark:text-slate-50'
            )}
          >
            {title} :{' '}
            {currentValue
              .map((item) =>
                allKeyValuesTitle[item as keyof FiltersState].toLowerCase()
              )
              .join(', ')
              .trim()}
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                onCloseTag(valueKey);
              }}
              className="ml-1 h-4 w-4 fill-white"
            />
          </div>
        );
      }

      if (valueKey === 'price') {
        const currentValue = (values[valueKey] as FiltersPrice) ?? {};

        return (
          <div
            onClick={onClickTag(valueKey)}
            key={valueKey}
            className={classNames(
              'flex flex-shrink-0 cursor-pointer items-center justify-center rounded bg-blue-600 p-1 text-sm text-white dark:text-slate-50'
            )}
          >
            <>
              Price min: {currentValue.min} - max: {currentValue.max}
            </>
            <CloseIcon
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenedPopover(false);
                onCloseTag(valueKey);
              }}
              className="ml-1 h-4 w-4 fill-white"
            />
          </div>
        );
      }

      return null;
    });
  }, [onClickTag, onCloseTag, values]);

  useOnClickOutside(popoverRef, () => {
    setIsOpenedPopover(false);
  });

  return (
    <div className="ml-8 flex flex-col">
      <div ref={popoverRef}>
        <div className="relative flex h-[50px] w-full flex-row">
          <>
            <div className="inset-0 left-0 flex h-12 w-8 items-center py-2">
              <div
                onClick={onClickFunnel}
                ref={buttonRef}
                className="duration-250 relative m-0 box-border flex h-8 w-8 cursor-pointer touch-manipulation select-none list-none items-center justify-center rounded-full border-0 bg-neutral-200 p-0 decoration-0 outline-none transition ease-in-out hover:bg-blue-100 dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600"
              >
                <FunnelIcon
                  strokeWidth="2"
                  className="h-5 w-5 touch-manipulation select-none"
                />
              </div>
            </div>
            <Transition
              show={isOpenedPopover}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div
                className="fixed z-10 mt-14 flex transform items-center sm:px-0"
                style={{ left: filterPosition.x, top: filterPosition.y }}
              >
                {renderActiveFilter}
              </div>
            </Transition>
          </>

          <div ref={filterContainerRef} className="ml-2.5 flex w-full flex-1">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {renderTags}
              <input
                autoComplete="off"
                spellCheck="false"
                type="search"
                autoCorrect="off"
                autoCapitalize="off"
                name="search"
                id="search"
                className="block w-full max-w-[220px] border-2 border-transparent bg-transparent p-3 ring-0 transition duration-200 hover:border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 dark:border-transparent dark:hover:border-transparent dark:focus:border-transparent sm:text-sm md:text-base"
                placeholder="Filter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
