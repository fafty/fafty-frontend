import { Header, Meta } from '@fafty-frontend/shared/ui';
import { ReactNode, SVGProps, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import { HeartIcon, QuestionMarkCircleIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const AccountLayout = ({ children, title, description }: Props) => {
  const [collapseShow, setCollapseShow] = useState('hidden');
  const router = useRouter();
  const auth = useAuth();

  const onAuth = (key: string) => {
    if (key === 'ic') {
      auth.useInternetIdentity();
    }
  };

  useEffect(() => {
    if (!auth.principal && auth.wallet) {
      auth.wallet?.logIn();
    }
  }, [auth.wallet]);

  const balance = useMemo(() => {
    return Number(auth.balance) / Math.pow(10, 8) || 0;
  }, [auth.balance]);

  interface MenuItemProps {
    children: ReactNode;
    path: string;
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }

  const MenuItem = (props: MenuItemProps): JSX.Element => {
    const {
      children,
      path,
      icon: Icon,
    } = props;

    return (
      <Link href={path}>
        <a
          className="cursor-pointer focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:fill-neutral-200 dark:bg-neutral-700">
            {Icon && <Icon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">{children}</p>
          </div>
        </a>
      </Link>
    );
  };
  // const menuItem = ({
  //   name = null,
  //   path = null,
  // }: { name: string; path: string }): JSX.Element => {
  //   return (
  //     <li className="items-center">
  //       <Link href="/account/assets/create">
  //         <a
  //           className={classNames(
  //             'cursor-pointer focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700',
  //             {
  //               'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700 bg-white bg-opacity-75 dark:bg-neutral-700':
  //                 router.pathname === path,
  //             }
  //           )}
  //         >
  //           <p className="text-sm font-medium">{name}</p>
  //         </a>
  //       </Link>
  //     </li>
  //   );
  // };

  return (
    <>
      <Meta title={title} description={description} />
      <Header
        onLogOut={() => auth.wallet?.logOut?.()}
        onAuth={onAuth}
        balance={balance}
        isAuth={!!auth.principal?.toString()}
      />
      <>
        <nav className="hidden lg:block fixed z-20 inset-0 top-[5.12rem] left-[max(0px,calc(50%-45rem))] right-auto w-[15.5rem] pb-10 px-2 overflow-y-auto backdrop-blur bg-white/95 dark:bg-neutral-800/95 border-r border-gray-100 dark:border-neutral-700">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                {/* <NotificationDropdown /> */}
              </li>
              <li className="inline-block relative">
                {/* <UserDropdown /> */}
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link href="/">
                      <a
                        href="#pablo"
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                      >
                        Notus NextJS
                      </a>
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow('hidden')}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Navigation */}

              <ul className="md:flex-col md:min-w-full flex flex-col list-none  relative grid gap-1 p-1 grid-cols-1">
                {/* <li className="items-center">
                  <Link href="/account/assets/create">
                    <a
                      className={classNames(
                        'cursor-pointer focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700',
                        {
                          'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700 bg-white bg-opacity-75 text-slate-900 dark:text-slate-50 dark:bg-neutral-700':
                            router.pathname === '/account/assets/create',
                        }
                      )}
                    >
                      <p className="text-sm font-medium">Dashboard</p>
                    </a>
                  </Link>
                </li> */}
                <MenuItem
                  path="/account/assets/create"
                  icon={QuestionMarkCircleIcon}
                >
                  Dashboard
                </MenuItem>
                {/* <LinkTo name="Assets" path="/account/assets" /> */}

                {/* <li className="items-center">
                  <Link href="/account/assets">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/assets',
                        }
                      )}
                    >
                      Assets
                    </a>
                  </Link>
                </li> */}
                <MenuItem
                  path="/account/assets"
                  icon={QuestionMarkCircleIcon}
                >
                  Assets
                </MenuItem>
                <MenuItem
                  path="/account/collections"
                  icon={QuestionMarkCircleIcon}
                >
                  Collections
                </MenuItem>
                <MenuItem
                  path="/account/bundles"
                  icon={QuestionMarkCircleIcon}
                >
                  Bundles
                </MenuItem>
                <MenuItem
                  path="/account/Bids"
                  icon={BarsArrowUpIcon}
                >
                  Bids
                </MenuItem>
                <MenuItem
                  path="/account/offers"
                  icon={QuestionMarkCircleIcon}
                >
                  Offers
                </MenuItem>
                <MenuItem
                  path="/account/favorites"
                  icon={HeartIcon}
                >
                  Favorites
                </MenuItem>
                {/* <LinkTo name="Collections" path="/account/collections" /> */}
                {/* <li className="items-center">
                  <Link href="/account/collections">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/collections',
                        }
                      )}
                    >
                      Collections
                    </a>
                  </Link>
                </li> */}
                {/* <li className="items-center">
                  <Link href="/account/bundles">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/bundles',
                        }
                      )}
                    >
                      Bundles
                    </a>
                  </Link>
                </li> */}
                {/* <LinkTo name="Bundles" path="/account/bundles" /> */}
                {/* <li className="items-center">
                  <Link href="/account/bids">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/bids',
                        }
                      )}
                    >
                      Bids
                    </a>
                  </Link>
                </li> */}
                {/* <LinkTo name="Bids" path="/account/bids" /> */}
                {/* <li className="items-center">
                  <Link href="/account/offers">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/offers',
                        }
                      )}
                    >
                      Offers
                    </a>
                  </Link>
                </li> */}
                {/* <LinkTo name="Favorites" path="/account/favorites" /> */}
                {/* <li className="items-center">
                  <Link href="/account/favorites/">
                    <a
                      className={classNames(
                        'text-xs uppercase py-3 font-bold block',
                        {
                          'text-blue-500 hover:text-blue-600':
                            router.pathname === '/account/favorites',
                        }
                      )}
                    >
                      Favorites
                    </a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </>
      <main className="relative md:ml-64 px-8">{children}</main>
    </>
  );
};

export default AccountLayout;