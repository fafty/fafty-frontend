import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

interface CollectionsProps {
  id: string;
  name: string;
  description: string;
  logo: string;
}

interface Props {
  current: string;
  onChange: (value: string) => void;
}
const SelectCollections = ({ current, onChange }: Props): JSX.Element => {
  const collections: CollectionsProps[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/ethereum.svg',
    },
    {
      id: 'dfinity',
      name: 'Dfinity Internet Computer',
      description: 'Dfinity bla bla bla',
      logo: '/images/logos/dfinity.svg',
    },
    {
      id: 'near',
      name: 'Near',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/near.svg',
    },
    {
      id: 'solana',
      name: 'Solana',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/solana.svg',
    },
    {
      id: 'polygon',
      name: 'Polygon',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisi eu consectetur euismod, nisl nisl consectetur nisl, eu tincidunt nisl nisl euismod nisl.',
      logo: '/images/logos/polygon.svg',
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const defaultSelected = collections.find((b) => b.id === current);

  const [selected, setSelected] = useState(defaultSelected || collections[1]);
  const [query, setQuery] = useState('');

  const handleSelect = (value: CollectionsProps) => {
    setSelected(value);
    onChange(value.id);
  };

  const filteredCollections =
    query === ''
      ? collections
      : collections.filter((collection) =>
          collection.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="">
            <Combobox.Button className="relative w-full bg-white dark:bg-neutral-900 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <span className="flex items-center relative">
                <Image
                  src={selected.logo}
                  alt={selected.name}
                  className="flex-shrink-0 h-6 w-6"
                  layout="raw"
                  width="1.5rem"
                  height="1.5rem"
                />
                <div className="w-full">
                  <Combobox.Input
                    className="border-none w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    displayValue={(collection) => collection?.name}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCollections.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCollections.map((collection) => (
                  <Combobox.Option
                    key={collection.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-blue-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={collection}
                  >
                    {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image
                              src={collection.logo}
                              alt={collection.name}
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
                                {collection.name}
                              </div>
                              <div
                                className={classNames(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'text-xs block truncate text-gray-400'
                                )}
                              >
                                {collection.description}
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
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};

export default SelectCollections;
