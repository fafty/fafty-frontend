import { Fragment } from 'react';
import { Transition } from '@headlessui/react';

export const Visibility = () => {
  return (
    <Transition
      as={Fragment}
      show
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div className="flex w-auto items-center absolute z-10 left-0 transform mt-14 w-screen sm:px-0">
        <div className="flex items-center p-2 rounded-lg drop-shadow-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 overflow-hidden">
          <div className="flex relative flex-col gap-1 p-1"></div>
        </div>
      </div>
    </Transition>
  );
};
