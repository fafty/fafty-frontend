import { FunnelIcon } from '@heroicons/react/24/outline';
import { Fragment, useMemo, useRef, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Visibility } from './visibility';
import { useOnClickOutside } from '@fafty-frontend/usehooks';

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
];

export const Filters = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const filterContainerRef = useRef<HTMLDivElement | null>(null);

  const renderActiveFilter = useMemo(() => {
    switch (activeFilter) {
      case 'visibility':
        return <Visibility />;
      default:
        return null;
    }
  }, [activeFilter]);

  useOnClickOutside(filterContainerRef, () => {
    console.log('hello');
    setActiveFilter('');
  });

  return (
    <div className="flex flex-col ml-8">
      <div className="relative w-full h-[50px] flex flex-row">
        <Popover>
          {({ open, close }) => {
            if (open) {
              setActiveFilter('');
            }

            return (
              <>
                <Popover.Button className="w-8 h-12 py-2 inset-0 left-0 flex items-center">
                  <div className="w-8 h-8 rounded-full hover:bg-blue-100 dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out bg-neutral-200 dark:bg-neutral-700">
                    <FunnelIcon
                      strokeWidth="2"
                      className="touch-manipulation select-none w-5 h-5"
                    />
                  </div>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="flex items-center absolute z-10 left-0 transform w-screen max-w-xs sm:px-0">
                    <div className="flex items-center p-2 rounded-lg drop-shadow-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 overflow-hidden">
                      <div className="flex relative flex-col gap-1 p-1">
                        {FILTERS.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
                            onClick={() => {
                              setActiveFilter(item.value);
                              close();
                            }}
                          >
                            <div className="text-left">
                              <p className="mx-4 text-base font-medium">
                                {item.title}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            );
          }}
        </Popover>
        <div className="flex relative ml-2.5">
          <div
            ref={filterContainerRef}
            className="flex absolute justify-center"
          >
            {renderActiveFilter}
          </div>
          <input
            autoComplete="off"
            spellCheck="false"
            type="search"
            autoCorrect="off"
            autoCapitalize="off"
            name="search"
            id="search"
            className="border-2 focus:ring-0 focus:ring-offset-0 block w-full bg-transparent border-transparent dark:border-transparent p-3 focus:border-transparent hover:border-transparent dark:focus:border-transparent dark:hover:border-transparent transition duration-200 ring-0 sm:text-sm md:text-base"
            placeholder="Filter"
          />
        </div>
      </div>
    </div>
  );
};
