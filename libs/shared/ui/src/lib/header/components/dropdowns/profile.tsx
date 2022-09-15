import { Fragment, lazy, Suspense } from 'react';
import { Popover, Transition } from '@headlessui/react';
import ProfileButton from './buttons/profile';
import MainPanelPlaceholder from '../../../placeholders/header/components/dropdowns/panels/main';
import classNames from 'classnames';
const MainPanel = lazy(() => import('./panels/main'));

const ProfileMenu = ({
  balance,
  onLogOut,
}: {
  balance: number;
  onLogOut: () => void;
}): JSX.Element => {
  return (
    <Popover className="relative inline-block align-center">
      {({ open }) => {
        return (
          <>
            <Popover.Button
              className={classNames(
                'flex -space-x-1 overflow-hidden border rounded-full dark:hover:bg-blue-600/25 box-border justify-center h-10 p-0 m-0 cursor-pointer relative dark:text-gray-200 touch-manipulation items-center select-none list-none outline-none decoration-0 transition duration-150 ease-in-out',
                {
                  'bg-blue-100 dark:bg-blue-800/25 border-blue-500': open,
                  'text-slate-900 border-neutral-300 dark:border-neutral-700':
                    !open,
                }
              )}
            >
              <ProfileButton
                avatarUrl={'/images/demo-avatar.jpeg'}
                balance={balance}
                ticker={'ICP'}
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
              <Popover.Panel className="absolute z-10 right-0 origin-top-right mt-4 px-2 w-screen max-w-xs max-h-[calc(100vh_-_60px)] sm:px-0 drop-shadow-lg shadow-lg">
                <Suspense fallback={<MainPanelPlaceholder />}>
                  <MainPanel onLogOut={onLogOut} open close />
                </Suspense>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
};

export default ProfileMenu;
