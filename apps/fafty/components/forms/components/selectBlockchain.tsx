import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

const SelectBlockchain = (): JSX.Element => {
  const blockchains = [
    {
      id: 1,
      name: 'Ethereum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/ethereum.svg',
    },
    {
      id: 2,
      name: 'Dfinity Internet Computer',
      description: 'Dfinity bla bla bla',
      logo: '/images/logos/dfinity.svg',
    },
    {
      id: 3,
      name: 'Near',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/near.svg',
    },
    {
      id: 4,
      name: 'Solana',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/solana.svg',
    },
    {
      id: 5,
      name: 'Polygon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/polygon.svg',
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const [selected, setSelected] = useState(blockchains[1]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Blockchain
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white dark:bg-neutral-900 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <span className="flex items-center relative">
                <Image
                  src={selected.logo}
                  alt={selected.name}
                  className="flex-shrink-0 h-6 w-6"
                  layout="raw"
                  width="1.5rem"
                  height="1.5rem"
                />
                <div className="flow-root truncate">
                  <div className="ml-3 block truncate">{selected.name}</div>
                  <div className="ml-3 block truncate text-xs text-gray-400">
                    {selected.description}
                  </div>
                </div>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {blockchains.map((blockchain) => (
                  <Listbox.Option
                    key={blockchain.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={blockchain}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <Image
                            src={blockchain.logo}
                            alt={blockchain.name}
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                            layout="raw"
                            width="1.5rem"
                            height="1.5rem"
                          />
                          <div className="ml-3 block truncate">
                            <div
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'dark:text-white'
                              )}
                            >
                              {blockchain.name}
                            </div>
                            <div
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'text-xs block truncate text-gray-400'
                              )}
                            >
                              {blockchain.description}
                            </div>
                          </div>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? 'text-white'
                                : 'text-blue-600 dark:text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectBlockchain;
