import { useOnScreen } from '@fafty-frontend/usehooks';
import { Transition, RadioGroup } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { ImageIcon } from '@remixicons/react/line';
import api from '../../../api';
import { useDebouncedCallback } from 'apps/fafty/src/hooks';
import isClient from 'apps/fafty/src/utils/isClient';
import classNames from 'classnames';
import Image from 'next/future/image';
import { MutableRefObject, SVGProps, useEffect, useRef, useState } from 'react';

interface CollectionProps {
  token: string;
  name: string;
  description: string;
  total_nfts_count: number;
  cover?: {
    src: string;
    dominant_color: string;
  };
  speed: string;
  popularity: string;
  fees: string;
}

interface ResponceProps {
  records: CollectionProps[];
}

interface Props {
  current: string;
  onChange: (value: string) => void;
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
  );
}

const SelectCollection = ({ current, onChange }: Props): JSX.Element => {
  const [data, setData] = useState<CollectionProps[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const defaultSelected = data && data.find((b) => b.token === current);
  const [selected, setSelected] = useState(defaultSelected?.token || 'none');
  const [previousSelected, setPreviousSelected] = useState(
    defaultSelected?.token || null
  );
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
    console.log('fire useeefect');
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
    fetchData();

    return () => {
      setLoading(false);
      setError(false);
      setData(null);
      // Remove event listener on unmount
      if (refCurrent) {
        events.forEach(({ event, callback }) => {
          refCurrent.removeEventListener(event, callback);
        });
      }
    };
  }, []);

  const onScreen: boolean = useOnScreen<HTMLDivElement>(
    itemsContainerRef as MutableRefObject<HTMLDivElement>,
    '0px'
  );
  useEffect(() => {
    // console.log('onScreen', onScreen);
    if (onScreen) {
      scrollItemsToCenterSelected(selected, 0);
    }
  }, [onScreen]);

  useEffect(() => {
    if (selected !== previousSelected) {
      scrollItemsToCenterSelected(selected, 300);
    }
    onChange(selected);
    setPreviousSelected(selected);
  }, [selected]);

  useEffect(() => {
    // console.log('data', data);
    const defaultSelected = data && data.find((b) => b.token === current);
    setSelected(defaultSelected?.token || 'none');
    // console.log('selected', selected);
  }, [current, loading]);

  const fetchData = async () => {
    setLoading(true);
    const response = await api.get<ResponceProps>(
      `user/faftymaster/collections`
    );
    if (response.status === 200 && response.data) {
      const { data } = response;
      setData(data.records);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  /**
   * Increase/decrease the current page value
   * @param {String} direction (Optional) The direction to advance
   */
  const scrollItems = (direction: string): void => {
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

  /**
   * Scroll to the center of the selected item
   * @param {String} id The id of item to scroll to
   */
  const scrollItemsToCenterSelected = (id: string, delay: number): void => {
    // console.log('current id', id);
    const item = document.getElementById(id);
    if (item === null || item === undefined) return;
    setTimeout(function () {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }, delay);
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
                direction === 'right' ? 'Next Items' : 'Previous Items',
            }}
            role="button"
            {...(!isVisible && { 'aria-hidden': true, 'aria-disabled': true })}
            tabIndex={isVisible ? 0 : -1}
            onClick={() => scrollItems(direction)}
          >
            {direction === 'right' ? (
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    );
  };

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
                'item my-2 focus:outline-none flex cursor-pointer rounded-lg overflow-hidden relative shadow',
                {
                  'ring-2 ring-blue-600': checked,
                  'bg-white bg-opacity-75 text-slate-900 dark:text-slate-50 dark:bg-neutral-700':
                    checked,
                }
              )
            }
          >
            {({ checked }) => (
              <div
                id="none"
                className="w-[15rem] select-none flex items-stretch"
              >
                <div className="max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-neutral-800 dark:highlight-white/5 transition ease-in-out duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700 self-end">
                  <div className="absolute top-[0.3rem] right-[0.3rem]">
                    {checked && <CheckIcon className="h-4 w-4" />}
                  </div>
                  <div className="absolute -left-6 w-24 h-24 rounded-full shadow-lg bg-blue-100 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16" />
                  </div>
                  <div className="flex flex-col py-4 pl-20 pr-2">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                      Without Collection
                    </strong>
                    <div className="flex justify-center">
                      <div className="flex flex-row space-x-4 mt-1">
                        <span className="text-slate-500 text-xs dark:text-slate-400 flex flex-col items-center justify-center">
                          You create nft not included to the collection.
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
                    'item my-2 focus:outline-none flex cursor-pointer rounded-lg overflow-hidden relative shadow',
                    {
                      'ring-2 ring-blue-600': checked,
                      'bg-white bg-opacity-75 text-slate-900 dark:text-slate-50 dark:bg-neutral-700':
                        checked,
                    }
                  )
                }
              >
                {({ checked }) => (
                  <div
                    id={collection.token}
                    className="flex items-stretch select-none"
                  >
                    <div className="self-stretch max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-neutral-800 dark:highlight-white/5 transition ease-in-out duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-700 ">
                      <div className="absolute top-[0.3rem] right-[0.3rem]">
                        {checked && <CheckIcon className="h-4 w-4" />}
                      </div>
                      <div className="absolute -left-6 w-24 h-24 rounded-full shadow-lg bg-blue-100 flex items-center justify-center">
                        {collection.cover && (
                          <Image
                            src={collection.cover?.src || ''}
                            alt={collection.name}
                            className="w-16 h-16"
                            // layout="raw"
                            width="24"
                            height="24"
                          />
                        )}
                      </div>
                      <div className="flex flex-col py-4 pl-20 pr-2 inset-0">
                        <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                          {collection.name}
                        </strong>
                        <div className="flex">
                          <div className="flex flex-row space-x-4 mt-1">
                            <span className="text-[0.70rem] text-slate-500 dark:text-slate-400">
                              <span className="font-medium">
                                {collection.total_nfts_count}
                              </span>
                              <span className="ml-1 text-slate-800 dark:text-slate-700">
                                NFT's
                              </span>
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
  );
};

export default SelectCollection;
