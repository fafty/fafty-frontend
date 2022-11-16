import { Header, Meta } from '@fafty/shared/ui'
import { ReactNode, SVGProps, useMemo, useState } from 'react'
import { useAuth } from '../utils/auth'
import Link from 'next/link'
import {
  HeartIcon,
  BarsArrowUpIcon,
  Squares2X2Icon,
  RectangleStackIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { getAccountId } from '../utils/account'
import FormAssetModal from '../components/modals/forms/asset'
import FormCollectionModal from '../components/modals/forms/collection'

import { GalleryIcon } from '@remixicons/react/line'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  title: string
  description: string
  className?: string
}

const AccountLayout = ({ children, title, description, className }: Props) => {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const [openedFormAssetModal, setOpenedFormAssetModal] = useState(false)
  const [openedFormCollectionModal, setOpenedFormCollectionModal] =
    useState(false)
  // const [openedFormBundleModal, setOpenedFormBundleModal] = useState(false);
  const router = useRouter()

  const auth = useAuth()

  const balance = useMemo(() => {
    return Number(auth?.balance) / Math.pow(10, 8) || 0
  }, [auth?.balance])

  const onForm = (key: string) => {
    switch (key) {
      case 'asset':
        setOpenedFormAssetModal(true)
        break
      case 'collection':
        setOpenedFormCollectionModal(true)
        break
      // case 'bundle':
      //   setOpenedFormBundleModal(true);
      //   break;
      default:
        break
    }
  }

  interface MenuItemProps {
    children: ReactNode
    path: string
    icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
  }

  const MenuItem = (props: MenuItemProps): JSX.Element => {
    const { children, path, icon: Icon } = props

    return (
      <Link
        href={path}
        className={classNames(
          'flex cursor-pointer items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700',
          {
            'bg-white bg-opacity-75 text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-700':
              router.pathname === path
          }
        )}
      >
        <>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 px-1 py-1 text-neutral-700 focus:outline-none dark:bg-neutral-700 dark:fill-neutral-200 dark:text-neutral-200">
            {Icon && (
              <Icon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium">{children}</p>
          </div>
        </>
      </Link>
    )
  }

  return (
    <>
      <Meta title={title} description={description} />
      <Header
        address={auth?.principal && getAccountId(auth.principal?.toString(), 0)}
        onLogOut={() => auth.wallet?.logOut?.()}
        onCreate={onForm}
        balance={balance}
        isAuth={!!auth?.principal?.toString()}
      />
      <>
        <nav className="fixed inset-0 top-[5.12rem] left-0 right-auto z-20 hidden w-[15.5rem] overflow-y-auto border-r border-gray-100 bg-white/95 px-2 pb-10 backdrop-blur dark:border-neutral-700 dark:bg-neutral-800/95 lg:block">
          <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
            {/* Toggler */}
            <button
              title="Toggle Menu"
              className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
              type="button"
              onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
            >
              <i className="fas fa-bars"></i>
            </button>

            {/* User */}
            <ul className="flex list-none flex-wrap items-center md:hidden">
              <li className="relative inline-block">
                {/* <NotificationDropdown /> */}
              </li>
              <li className="relative inline-block">
                {/* <UserDropdown /> */}
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                'absolute top-0 left-0 right-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="border-blueGray-200 mb-4 block border-b border-solid pb-4 md:hidden md:min-w-full">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      href="/"
                      className="text-blueGray-600 mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase md:block md:pb-2"
                    >
                      Fafty
                    </Link>
                  </div>
                  <div className="flex w-6/12 justify-end">
                    <button
                      title="Close Sidebar"
                      type="button"
                      className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                      onClick={() => setCollapseShow('hidden')}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Navigation */}
              <ul className="relative grid list-none  grid-cols-1 gap-2 p-1 md:min-w-full md:flex-col">
                <MenuItem path="/account/dashboard" icon={Squares2X2Icon}>
                  Dashboard
                </MenuItem>
                <MenuItem path="/account/assets" icon={GalleryIcon}>
                  Assets
                </MenuItem>
                <MenuItem path="/account/collections" icon={GalleryIcon}>
                  Collections
                </MenuItem>
                <MenuItem path="/account/bundles" icon={RectangleStackIcon}>
                  Bundles
                </MenuItem>
                <MenuItem path="/account/bids" icon={BarsArrowUpIcon}>
                  Bids
                </MenuItem>
                <MenuItem path="/account/offers" icon={TagIcon}>
                  Offers
                </MenuItem>
                <MenuItem path="/account/favorites" icon={HeartIcon}>
                  Favorites
                </MenuItem>
              </ul>
            </div>
          </div>
        </nav>
      </>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              duration: 0.2
            }
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.2,
              delay: 0.1
            }
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2
            }
          }
        }}
        transition={{ type: 'linear' }}
        className={classNames(className, 'relative md:ml-[15.5rem]')}
      >
        {children}
      </motion.main>
      {/* <main className="relative md:ml-[15.5rem]">{children}</main> */}
      {openedFormAssetModal && (
        <FormAssetModal
          title="Create Your Asset"
          onClose={() => setOpenedFormAssetModal(false)}
          isOpened={openedFormAssetModal}
        />
      )}
      {openedFormCollectionModal && (
        <FormCollectionModal
          title="Create Your Collection"
          onClose={() => setOpenedFormCollectionModal(false)}
          isOpened={openedFormCollectionModal}
        />
      )}
    </>
  )
}

export default AccountLayout
