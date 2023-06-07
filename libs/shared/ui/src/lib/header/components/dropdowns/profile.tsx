import { Fragment, lazy, Suspense } from 'react'
import { Popover, Transition } from '@headlessui/react'
import ProfileButton from './buttons/profile'
import MainPanelPlaceholder from '../../../placeholders/header/components/dropdowns/panels/main'
import classNames from 'classnames'
const MainPanel = lazy(() => import('./panels/main'))

const ProfileMenu = ({
  currency,
  address,
  balance,
  onLogOut
}: {
  currency: string
  address: string | undefined
  balance: number
  onLogOut: () => void
}): JSX.Element => {
  return (
    <Popover className="align-center relative inline-block">
      {({ open }) => {
        return (
          <>
            <Popover.Button
              className={classNames(
                'relative m-0 box-border flex h-10 cursor-pointer touch-manipulation select-none list-none items-center justify-center -space-x-1 overflow-hidden rounded-full border p-0 decoration-0 outline-none transition duration-150 ease-in-out dark:text-gray-200 dark:hover:bg-blue-600/25',
                {
                  'border-blue-500 bg-blue-100 dark:bg-blue-800/25': open,
                  'border-neutral-300 text-slate-900 dark:border-neutral-700':
                    !open
                }
              )}
            >
              <ProfileButton
                avatarUrl={`https://avatars.dicebear.com/api/pixel-art/${
                  address || 'nouser'
                }.svg`}
                balance={balance}
                ticker={currency}
              />
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
              <Popover.Panel className="absolute right-0 z-10 mt-4 max-h-[calc(100vh_-_90px)] w-screen max-w-xs origin-top-right overflow-x-scroll rounded-lg px-2 drop-shadow-lg sm:px-0">
                <Suspense fallback={<MainPanelPlaceholder />}>
                  <MainPanel address={address} onLogOut={onLogOut} open close />
                </Suspense>
              </Popover.Panel>
            </Transition>
          </>
        )
      }}
    </Popover>
  )
}

export default ProfileMenu
