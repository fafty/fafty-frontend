import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

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
      <div className="absolute left-0 z-10 mt-14 flex w-auto w-screen transform items-center sm:px-0">
        <div className="flex items-center overflow-hidden rounded-lg bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="relative flex flex-col gap-1 p-1"></div>
        </div>
      </div>
    </Transition>
  )
}
