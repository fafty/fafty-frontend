import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import { GalleryIcon, ImageAddIcon } from '@remixicons/react/line'
import ProfileMenu from './components/dropdowns/profile'

const pagesLinks = [
  {
    name: 'Bundles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/assets/create',
    icon: ChartBarIcon,
  },
  {
    name: 'Nfts',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '/assets/create',
    icon: CursorClickIcon,
  }
]
const createLinks = [
  {
    name: 'Add Bundle',
    href: '/assets/create',
    description: 'description Add bundle',
    icon: GalleryIcon,
  },
  {
    name: 'Add Nft',
    href: '/assets/create',
    description: 'description Add nft',
    icon: ImageAddIcon,
  },
]

const Header = (): JSX.Element => {
  return (
    <header className="header sticky top-0 z-50 backdrop-blur bg-white/95 dark:bg-neutral-800/95 border-b border-gray-100 dark:border-neutral-700 shadow transition duration-300">
      <Popover>
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center py-4 md:justify-start align-center">
            <div className="flex justify-start mr-auto">
              <Link href={'/'}>
                <a title="Go to Home Page" className='fill-[#23262F] dark:fill-[#F4F5F6]'>
                  <svg width="120" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.301061 23.4158C0.850018 23.8479 1.89456 24.2895 2.77686 24.4515C3.57803 24.6043 4.91932 24.6043 5.81961 24.4423L6.17094 24.3795L6.09897 24.9102C6.05383 25.1984 6.03584 25.6936 6.04468 25.9995C6.06268 26.6479 6.08982 26.6302 4.96415 26.7379C2.8037 26.927 1.30962 26.0807 0.174801 24.0373C-0.121942 23.4881 -0.229903 23.1459 -0.0947988 23.1459C-0.0679609 23.1459 0.111975 23.2721 0.301061 23.4158Z"/>
                    <path d="M13.9491 14.9446C14.147 15.1428 15.9027 15.944 16.6859 16.2142C17.154 16.3673 17.9461 16.5561 18.4414 16.6372C18.9366 16.7092 18.929 16.7196 19.5399 16.8083C20.8989 17.005 20.6829 19.1847 20.7192 24.0643L20.7458 28.9979H19.6384H18.5225L18.3782 28.3675C18.0001 26.7831 17.19 25.8109 15.9924 25.4867C15.5514 25.3788 15.5334 25.3156 15.8036 24.9466C16.0555 24.5956 16.0647 23.9923 15.8128 23.5962L15.6234 23.2988L15.5605 23.7856C15.5243 24.0552 15.4431 24.3797 15.3715 24.5056C15.2184 24.8112 14.7322 25.2348 14.3632 25.3879C14.0662 25.5139 13.9942 25.5929 14.129 25.9009C14.2034 26.0704 14.2244 26.0805 14.7322 26.0088C15.4065 25.9134 16.2175 26.0988 16.6676 26.4501C17.0729 26.756 17.4599 27.3864 17.6762 28.0882C17.7969 28.4779 17.9467 29.0006 17.9314 29C17.9198 28.9991 16.6023 28.9979 13.5977 28.9979C9.86176 28.9979 9.27682 28.9796 8.8895 28.8445C6.99895 28.2053 6.08982 26.0897 6.94527 24.2985C7.35913 23.4251 8.57446 21.7596 9.60985 20.6342C11.0234 19.1127 11.5184 18.2576 11.8874 16.7272L12.0494 16.016L12.6349 15.6381C12.9588 15.4219 13.301 15.1605 13.3909 15.0617C13.5709 14.8546 13.8051 14.8098 13.9491 14.9446Z"/>
                    <path d="M19.5282 6.37955C19.5282 6.96785 20.0055 7.4448 20.5938 7.4448C20.8768 7.4448 21.1333 7.33443 21.3245 7.1545C21.3255 7.17642 21.3258 7.19811 21.3258 7.22007C21.3258 8.15939 20.5639 8.92122 19.6249 8.92122C18.6856 8.92122 17.9238 8.15939 17.9238 7.22007C17.9238 6.28104 18.6856 5.51921 19.6249 5.51921C19.7286 5.51921 19.8305 5.52867 19.9293 5.54666C19.6853 5.74185 19.5282 6.04225 19.5282 6.37955ZM7.44935 10.4074L7.52102 11.0286C7.61129 11.7758 7.82722 12.2976 8.25022 12.7658C9.11483 13.7203 10.8883 13.9902 11.8514 13.315C12.1576 13.0991 12.1576 13.1802 11.8605 13.5761C11.5635 13.9725 10.8248 14.3864 10.285 14.4587C9.73576 14.5398 9.02455 14.3321 8.4393 13.9454C7.62929 13.3961 7.18799 12.1271 7.37707 10.8844L7.44935 10.4074ZM26.6424 2.09798C26.5345 2.35903 26.4445 2.43101 26.2106 2.467C26.0483 2.51732 25.3914 2.64694 24.743 2.79119C23.8821 2.98241 23.2666 3.09708 22.4655 3.13306C21.1962 3.19619 20.854 3.13306 19.2968 2.61125C17.6218 2.044 16.6676 1.87291 15.11 1.87291C13.5708 1.87291 12.6349 2.05315 11.5 2.57496C8.67353 3.87143 6.69301 6.77934 6.32368 10.1823C6.17974 11.533 6.39596 13.0363 6.88179 13.9814C7.16999 14.5483 7.82783 15.1952 8.39417 15.4669C8.758 15.641 9.39754 15.7228 9.88886 15.7179C11.6894 15.7179 12.9139 15.0887 13.526 13.9002C13.913 13.1354 14.0301 12.5321 14.0301 11.2445C14.0301 10.4705 14.057 10.0835 14.1109 10.2091C14.4803 11.1542 14.5431 12.802 14.2552 13.6484C14.1561 13.9363 14.0753 14.2245 14.0753 14.2876C14.0753 14.4315 16.0646 15.4035 16.9829 15.71C18.2342 16.1238 19.1165 16.2413 20.5569 16.187C21.736 16.1513 21.9342 16.1238 22.6722 15.8628C26.0846 14.6386 28.8925 11.6879 29.3973 7.7065C29.5449 6.54332 29.5412 5.03278 29.4064 4.58233C29.3161 4.28558 29.3253 4.23188 29.5147 4.06079C29.8386 3.75432 30.0097 3.32213 30.0097 2.80919C30.0097 2.0077 29.6315 1.41361 28.9383 1.12571C28.0651 0.765534 27.012 1.20684 26.6424 2.09798Z"/>
                    <path d="M50.456 7.152V10.44H43.592V13.992H48.728V17.184H43.592V24H39.488V7.152H50.456ZM51.317 17.28C51.317 15.904 51.573 14.696 52.085 13.656C52.613 12.616 53.325 11.816 54.221 11.256C55.117 10.696 56.117 10.416 57.221 10.416C58.165 10.416 58.989 10.608 59.693 10.992C60.413 11.376 60.965 11.88 61.349 12.504V10.608H65.453V24H61.349V22.104C60.949 22.728 60.389 23.232 59.669 23.616C58.965 24 58.141 24.192 57.197 24.192C56.109 24.192 55.117 23.912 54.221 23.352C53.325 22.776 52.613 21.968 52.085 20.928C51.573 19.872 51.317 18.656 51.317 17.28ZM61.349 17.304C61.349 16.28 61.061 15.472 60.485 14.88C59.925 14.288 59.237 13.992 58.421 13.992C57.605 13.992 56.909 14.288 56.333 14.88C55.773 15.456 55.493 16.256 55.493 17.28C55.493 18.304 55.773 19.12 56.333 19.728C56.909 20.32 57.605 20.616 58.421 20.616C59.237 20.616 59.925 20.32 60.485 19.728C61.061 19.136 61.349 18.328 61.349 17.304ZM74.6621 14.016H72.4541V24H68.3501V14.016H66.8621V10.608H68.3501V10.224C68.3501 8.576 68.8221 7.328 69.7661 6.48C70.7101 5.616 72.0941 5.184 73.9181 5.184C74.2221 5.184 74.4461 5.192 74.5901 5.208V8.688C73.8061 8.64 73.2541 8.752 72.9341 9.024C72.6141 9.296 72.4541 9.784 72.4541 10.488V10.608H74.6621V14.016ZM83.5745 20.52V24H81.4865C79.9985 24 78.8385 23.64 78.0065 22.92C77.1745 22.184 76.7585 20.992 76.7585 19.344V14.016H75.1265V10.608H76.7585V7.344H80.8625V10.608H83.5505V14.016H80.8625V19.392C80.8625 19.792 80.9585 20.08 81.1505 20.256C81.3425 20.432 81.6625 20.52 82.1105 20.52H83.5745ZM99.0605 10.608L90.6605 30.36H86.2445L89.3165 23.544L83.8685 10.608H88.4525L91.5485 18.984L94.6205 10.608H99.0605Z"/>
                  </svg>
                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="mb-1 w-full font-medium bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-2 py-2 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10 mr-0 md:mr-auto">
              <Link href={'/bundles'}>
                <a className="text-base font-medium text-slate-900 dark:text-slate-50 hover:text-slate-800 dark:hover:text-slate-300">
                  Bundles
                </a>
              </Link>
              <Link href={'/nfts'}>
                <a className="text-base font-medium text-slate-900 dark:text-slate-50 hover:text-slate-800 dark:hover:text-slate-300">
                  Nfts
                </a>
              </Link>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end">
              <Popover className="relative mr-5 flex align-center rounded-full backdrop-blur bg-white/95 dark:bg-neutral-800/95">
                {({ open }) => (
                  <>
                    <Popover.Button title="Add items" aria-label="Add items" className={`${open ? 'bg-blue-50 dark:bg-blue-500/20' : 'bg-neutral-200 dark:bg-neutral-700'} w-10 h-10 rounded-full hover:bg-blue-100  dark:hover:bg-neutral-600 box-border justify-center p-0 m-0 cursor-pointer flex relative dark:text-gray-200 touch-manipulation items-center select-none border-0 list-none outline-none decoration-0 transition duration-250 ease-in-out`}>
                      <PlusIcon
                        className={`${open ? 'text-blue-500' : 'text-slate-900'} dark:text-slate-50 touch-manipulation select-none border-0 list-none outline-none decoration-0 w-5`}
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
                      <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-14 w-screen max-w-xs sm:px-0">
                        <div className="p-2 rounded-lg drop-shadow-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 overflow-hidden">
                          <div className="relative grid gap-1 p-1">
                            {createLinks.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                              >
                                <a className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
                                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:fill-neutral-200 dark:bg-neutral-700">
                                    <item.icon className="flex-shrink-0 h-6 w-6 fill-slate-900 dark:fill-slate-50" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <p className="ml-4 text-base font-medium">{item.name}</p>
                                    <p className="ml-4 text-sm text-gray-400">{item.description}</p>
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <div className="flex items-center">
                <ProfileMenu />
              </div>
            </div>
          </div>
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <Link href={'/'}>
                    <a className='fill-[#23262F] dark:fill-[#F4F5F6] focus:outline-none'>
                      <svg width="120" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.301061 23.4158C0.850018 23.8479 1.89456 24.2895 2.77686 24.4515C3.57803 24.6043 4.91932 24.6043 5.81961 24.4423L6.17094 24.3795L6.09897 24.9102C6.05383 25.1984 6.03584 25.6936 6.04468 25.9995C6.06268 26.6479 6.08982 26.6302 4.96415 26.7379C2.8037 26.927 1.30962 26.0807 0.174801 24.0373C-0.121942 23.4881 -0.229903 23.1459 -0.0947988 23.1459C-0.0679609 23.1459 0.111975 23.2721 0.301061 23.4158Z"/>
                        <path d="M13.9491 14.9446C14.147 15.1428 15.9027 15.944 16.6859 16.2142C17.154 16.3673 17.9461 16.5561 18.4414 16.6372C18.9366 16.7092 18.929 16.7196 19.5399 16.8083C20.8989 17.005 20.6829 19.1847 20.7192 24.0643L20.7458 28.9979H19.6384H18.5225L18.3782 28.3675C18.0001 26.7831 17.19 25.8109 15.9924 25.4867C15.5514 25.3788 15.5334 25.3156 15.8036 24.9466C16.0555 24.5956 16.0647 23.9923 15.8128 23.5962L15.6234 23.2988L15.5605 23.7856C15.5243 24.0552 15.4431 24.3797 15.3715 24.5056C15.2184 24.8112 14.7322 25.2348 14.3632 25.3879C14.0662 25.5139 13.9942 25.5929 14.129 25.9009C14.2034 26.0704 14.2244 26.0805 14.7322 26.0088C15.4065 25.9134 16.2175 26.0988 16.6676 26.4501C17.0729 26.756 17.4599 27.3864 17.6762 28.0882C17.7969 28.4779 17.9467 29.0006 17.9314 29C17.9198 28.9991 16.6023 28.9979 13.5977 28.9979C9.86176 28.9979 9.27682 28.9796 8.8895 28.8445C6.99895 28.2053 6.08982 26.0897 6.94527 24.2985C7.35913 23.4251 8.57446 21.7596 9.60985 20.6342C11.0234 19.1127 11.5184 18.2576 11.8874 16.7272L12.0494 16.016L12.6349 15.6381C12.9588 15.4219 13.301 15.1605 13.3909 15.0617C13.5709 14.8546 13.8051 14.8098 13.9491 14.9446Z"/>
                        <path d="M19.5282 6.37955C19.5282 6.96785 20.0055 7.4448 20.5938 7.4448C20.8768 7.4448 21.1333 7.33443 21.3245 7.1545C21.3255 7.17642 21.3258 7.19811 21.3258 7.22007C21.3258 8.15939 20.5639 8.92122 19.6249 8.92122C18.6856 8.92122 17.9238 8.15939 17.9238 7.22007C17.9238 6.28104 18.6856 5.51921 19.6249 5.51921C19.7286 5.51921 19.8305 5.52867 19.9293 5.54666C19.6853 5.74185 19.5282 6.04225 19.5282 6.37955ZM7.44935 10.4074L7.52102 11.0286C7.61129 11.7758 7.82722 12.2976 8.25022 12.7658C9.11483 13.7203 10.8883 13.9902 11.8514 13.315C12.1576 13.0991 12.1576 13.1802 11.8605 13.5761C11.5635 13.9725 10.8248 14.3864 10.285 14.4587C9.73576 14.5398 9.02455 14.3321 8.4393 13.9454C7.62929 13.3961 7.18799 12.1271 7.37707 10.8844L7.44935 10.4074ZM26.6424 2.09798C26.5345 2.35903 26.4445 2.43101 26.2106 2.467C26.0483 2.51732 25.3914 2.64694 24.743 2.79119C23.8821 2.98241 23.2666 3.09708 22.4655 3.13306C21.1962 3.19619 20.854 3.13306 19.2968 2.61125C17.6218 2.044 16.6676 1.87291 15.11 1.87291C13.5708 1.87291 12.6349 2.05315 11.5 2.57496C8.67353 3.87143 6.69301 6.77934 6.32368 10.1823C6.17974 11.533 6.39596 13.0363 6.88179 13.9814C7.16999 14.5483 7.82783 15.1952 8.39417 15.4669C8.758 15.641 9.39754 15.7228 9.88886 15.7179C11.6894 15.7179 12.9139 15.0887 13.526 13.9002C13.913 13.1354 14.0301 12.5321 14.0301 11.2445C14.0301 10.4705 14.057 10.0835 14.1109 10.2091C14.4803 11.1542 14.5431 12.802 14.2552 13.6484C14.1561 13.9363 14.0753 14.2245 14.0753 14.2876C14.0753 14.4315 16.0646 15.4035 16.9829 15.71C18.2342 16.1238 19.1165 16.2413 20.5569 16.187C21.736 16.1513 21.9342 16.1238 22.6722 15.8628C26.0846 14.6386 28.8925 11.6879 29.3973 7.7065C29.5449 6.54332 29.5412 5.03278 29.4064 4.58233C29.3161 4.28558 29.3253 4.23188 29.5147 4.06079C29.8386 3.75432 30.0097 3.32213 30.0097 2.80919C30.0097 2.0077 29.6315 1.41361 28.9383 1.12571C28.0651 0.765534 27.012 1.20684 26.6424 2.09798Z"/>
                        <path d="M50.456 7.152V10.44H43.592V13.992H48.728V17.184H43.592V24H39.488V7.152H50.456ZM51.317 17.28C51.317 15.904 51.573 14.696 52.085 13.656C52.613 12.616 53.325 11.816 54.221 11.256C55.117 10.696 56.117 10.416 57.221 10.416C58.165 10.416 58.989 10.608 59.693 10.992C60.413 11.376 60.965 11.88 61.349 12.504V10.608H65.453V24H61.349V22.104C60.949 22.728 60.389 23.232 59.669 23.616C58.965 24 58.141 24.192 57.197 24.192C56.109 24.192 55.117 23.912 54.221 23.352C53.325 22.776 52.613 21.968 52.085 20.928C51.573 19.872 51.317 18.656 51.317 17.28ZM61.349 17.304C61.349 16.28 61.061 15.472 60.485 14.88C59.925 14.288 59.237 13.992 58.421 13.992C57.605 13.992 56.909 14.288 56.333 14.88C55.773 15.456 55.493 16.256 55.493 17.28C55.493 18.304 55.773 19.12 56.333 19.728C56.909 20.32 57.605 20.616 58.421 20.616C59.237 20.616 59.925 20.32 60.485 19.728C61.061 19.136 61.349 18.328 61.349 17.304ZM74.6621 14.016H72.4541V24H68.3501V14.016H66.8621V10.608H68.3501V10.224C68.3501 8.576 68.8221 7.328 69.7661 6.48C70.7101 5.616 72.0941 5.184 73.9181 5.184C74.2221 5.184 74.4461 5.192 74.5901 5.208V8.688C73.8061 8.64 73.2541 8.752 72.9341 9.024C72.6141 9.296 72.4541 9.784 72.4541 10.488V10.608H74.6621V14.016ZM83.5745 20.52V24H81.4865C79.9985 24 78.8385 23.64 78.0065 22.92C77.1745 22.184 76.7585 20.992 76.7585 19.344V14.016H75.1265V10.608H76.7585V7.344H80.8625V10.608H83.5505V14.016H80.8625V19.392C80.8625 19.792 80.9585 20.08 81.1505 20.256C81.3425 20.432 81.6625 20.52 82.1105 20.52H83.5745ZM99.0605 10.608L90.6605 30.36H86.2445L89.3165 23.544L83.8685 10.608H88.4525L91.5485 18.984L94.6205 10.608H99.0605Z"/>
                      </svg>
                    </a>
                  </Link>
                  <div className="-mr-2">
                    <Popover.Button className="mb-1 w-full font-medium bg-gray-600 text-gray-100 rounded-full hover:bg-gray-500 px-2 py-2 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {pagesLinks.map((item) => (
                      <Link href={ item.href } key={ item.href} >
                        <a
                          className="-m-3 px-2 py-3 flex items-center rounded-md w-full font-medium text-gray-100 hover:bg-gray-500 focus:outline-nonedark:hover:bg-stone-600"
                        >
                          <item.icon className="flex-shrink-0 h-6 w-6 text-slate-900 dark:text-slate-50" aria-hidden="true" />
                          <span className="ml-3 text-base font-medium text-slate-900 dark:text-slate-50">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {createLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  )
};

export default Header;
