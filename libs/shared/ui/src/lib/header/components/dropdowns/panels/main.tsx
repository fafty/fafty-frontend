import {
  useState,
  useEffect,
  SVGProps,
  ReactNode,
  useRef,
  MutableRefObject,
  useLayoutEffect,
} from 'react'
import Image from 'next/image'
import { RadioGroup } from '@headlessui/react'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  Bars3Icon,
  MoonIcon,
  ArrowSmallLeftIcon,
  ChevronRightIcon,
  ArrowLeftOnRectangleIcon,
  SunIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { BrushIcon } from '@remixicons/react/line'
import { useTheme } from '@fafty/shared/theme'
import classNames from 'classnames'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const themeOptions = [
  {
    name: 'Light mode',
    description: 'Adjust the appearance of Fafty to normal light mode.',
    icon: SunIcon,
    theme: 'light',
  },
  {
    name: 'Dark mode',
    description:
      'Adjust the appearance of Fafty to reduce glare and give your eyes a break.',
    icon: MoonIcon,
    theme: 'dark',
  },
  {
    name: 'System',
    description:
      'We’ll automatically adjust the display based on your device’s system settings.',
    icon: BrushIcon,
    theme: 'system',
  },
]

const variants = {
  enter: ({ direction, menu }: { direction: number; menu: string }) => ({
    zIndex: 0,
    x: direction > 0 && menu !== 'main' ? '120%' : '-120%',
    opacity: 0,
    height: 'auto',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      delay: 0.1,
    },
    transitionBegin: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: 0,
      overflow: 'hidden',
    },
    transitionEnd: {
      // after animation has finished, reset the position to relative
      position: 'relative',
      overflow: 'hidden',
    },
  }),
  center: ({ direction, menu }: { direction: number; menu: string }) => ({
    zIndex: 1,
    x: 0,
    opacity: 1,
    height: 'auto',

    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      // delay: 0.1,
      height: {
        duration: 0.5,
        delay: 0.1,
      },
    },
  }),
  exit: ({ direction, menu }: { direction: number; menu: string }) => ({
    zIndex: 1,
    x: direction > 0 && menu !== 'main' ? '-120%' : '120%',
    opacity: 0,
    height: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',

    transition: {
      duration: 0.2,
      ease: 'easeInOut',
      // delay: 0.1,
      height: {
        duration: 0.5,
        delay: 0.1,
      },
    },
  }),
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        className="fill-gray-800 dark:fill-gray-200 "
        cx={12}
        cy={12}
        r={12}
        opacity="0.2"
      />
      <path
        d="M7 13l3 3 7-7"
        className="stroke-gray-800 dark:stroke-gray-200"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MainPanel = ({
  address,
  open,
  close,
  onLogOut,
}: {
  address: string | undefined;
  open: boolean;
  close: boolean;
  onLogOut: () => void;
}): JSX.Element => {
  const [height, setHeight] = useState(0)
  const refChildren = useRef() as MutableRefObject<HTMLDivElement>
  const [activeMenu, setActiveMenu] = useState('main')
  const { theme, setTheme } = useTheme()
  const [direction, setDirection] = useState(0)

  const observerSize = new ResizeObserver(([entry]) => {
    setHeight(entry.contentRect.height)
  })

  useEffect(() => {
    setActiveMenu('main')
  }, [close])

  interface DropdownItemOrBackProps {
    children: ReactNode;
    goToMenu?: string;
    onClick?: () => void;
    leftIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    rightIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  }

  const DropdownBack = (props: DropdownItemOrBackProps): JSX.Element => {
    return (
      <div className="flex items-center self-center p-2">
        <div>
          <button
            type="button"
            onClick={() => goTo(props.goToMenu)}
            className="w-full rounded-full bg-neutral-100 px-1 py-1 text-neutral-700 hover:bg-neutral-200/80 focus:outline-none dark:bg-neutral-700 dark:fill-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-600"
          >
            <span className="sr-only">Back to main menu</span>
            <ArrowSmallLeftIcon
              className="h-6 w-6"
              strokeWidth="2"
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>
        <div>
          <h3
            className="ml-3 text-base font-bold text-slate-900 dark:text-slate-50"
            dir="auto"
          >
            {props.children}
          </h3>
        </div>
      </div>
    )
  }
  const goTo = (goToMenu: string | undefined) => {
    if (goToMenu === 'main') {
      setDirection(-1)
    } else {
      setDirection(1)
    }
    goToMenu && setActiveMenu(goToMenu)
  }
  const DropdownItem = (props: DropdownItemOrBackProps): JSX.Element => {
    const {
      children,
      goToMenu,
      onClick,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
    } = props

    return (
      <div
        className="flex cursor-pointer items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
        onClick={() => (goToMenu ? goTo(goToMenu) : onClick?.())}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 px-1 py-1 text-neutral-700 focus:outline-none dark:bg-neutral-700 dark:fill-neutral-200 dark:text-neutral-200">
          {LeftIcon && (
            <LeftIcon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />
          )}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium">{children}</p>
        </div>
        <div className="ml-auto justify-end">
          {RightIcon && (
            <RightIcon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    observerSize.observe(refChildren.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    return () => {
      observerSize.unobserve(refChildren.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative overflow-hidden bg-white p-2 text-gray-500 dark:bg-neutral-800 dark:text-gray-500">
      <motion.div
        animate={{
          height: height || 'auto',
          transition: {
            height: {
              duration: 0.2,
            },
          },
        }}
      >
        <div className="h-auto" ref={refChildren}>
          <AnimatePresence
            initial={false}
            exitBeforeEnter={false}
            custom={{ direction: direction, activeMenu: activeMenu }}
          >
            <motion.div
              // layouttransition
              // layout={false}
              key={activeMenu}
              custom={{ direction: direction, menu: activeMenu }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore 
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {activeMenu === 'main' && (
                <motion.div
                  layout
                  layoutId="main"
                  className="relative grid grid-cols-1 gap-1 p-1"
                >
                  <Link
                    href={'/profile'}
                    className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <>
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 py-1 hover:bg-blue-500 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                        <Image
                          className="m-1 inline-block h-12 w-12 rounded-full ring-2 ring-white"
                          src={`https://avatars.dicebear.com/api/pixel-art/${
                            address || 'nouser'
                          }.svg`}
                          alt={address as string}
                          width={32}
                          height={32}
                          unoptimized
                        />
                      </div>
                      <div className="ml-4 grid">
                        <p className="relative truncate text-sm font-medium">
                          {address}
                        </p>
                        <p className="text-xs text-neutral-400">
                          See your profile
                        </p>
                      </div>
                    </>
                  </Link>
                  <div className="py-2">
                    <div className="w-full border-t border-gray-100 dark:border-neutral-700"></div>
                  </div>
                  <Link
                    href={'/account/dashboard'}
                    className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <>
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 px-1 py-1 text-neutral-700 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200">
                        <Squares2X2Icon
                          className="h-6 w-6"
                          strokeWidth="2"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">
                          Account Management
                        </p>
                        <p className="text-xs text-neutral-400">
                          Account Manage Panel
                        </p>
                      </div>
                    </>
                  </Link>
                  <div className="py-2">
                    <div className="w-full border-t border-gray-100 dark:border-neutral-700"></div>
                  </div>
                  <Link
                    href={'/'}
                    className="flex items-center rounded-lg p-2 text-neutral-700 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <>
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 px-1 py-1 text-neutral-700 focus:outline-none dark:bg-neutral-700 dark:text-neutral-200">
                        <ChatBubbleOvalLeftEllipsisIcon
                          className="h-6 w-6"
                          strokeWidth="2"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">Give Feedback</p>
                        <p className="text-xs text-neutral-400">
                          Help us improve Fafty.
                        </p>
                      </div>
                    </>
                  </Link>
                  <div className="py-2">
                    <div className="w-full border-t border-gray-100 dark:border-neutral-700"></div>
                  </div>
                  <DropdownItem
                    leftIcon={QuestionMarkCircleIcon}
                    rightIcon={ChevronRightIcon}
                    goToMenu="help"
                  >
                    Help & Support
                  </DropdownItem>
                  <DropdownItem
                    leftIcon={CogIcon}
                    rightIcon={ChevronRightIcon}
                    goToMenu="settings"
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    leftIcon={BrushIcon}
                    rightIcon={ChevronRightIcon}
                    goToMenu="appearance"
                  >
                    Appearance
                  </DropdownItem>
                  <DropdownItem
                    onClick={onLogOut}
                    leftIcon={ArrowLeftOnRectangleIcon}
                  >
                    Disconnect
                  </DropdownItem>
                </motion.div>
              )}
              {activeMenu === 'settings' && (
                <motion.div
                  layoutId="settings"
                  layout
                  className="relative grid grid-cols-1 gap-1 p-1"
                >
                  <DropdownBack goToMenu="main">Settings</DropdownBack>
                  <DropdownItem leftIcon={Bars3Icon}>HTML</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>CSS</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>JavaScript</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>Awesome!</DropdownItem>
                </motion.div>
              )}
              {activeMenu === 'help' && (
                <div
                  // layoutId="help"
                  // layout
                  className=" grid grid-cols-1 gap-1 p-1"
                >
                  <DropdownBack goToMenu="main">
                    Display & Accessibility
                  </DropdownBack>
                  <DropdownItem leftIcon={Bars3Icon}>HTML</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>CSS</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>JavaScript</DropdownItem>
                  <DropdownItem leftIcon={Bars3Icon}>Awesome!</DropdownItem>
                </div>
              )}
              {activeMenu === 'appearance' && (
                <div
                  // custom={{ direction: direction, menu: activeMenu }}
                  // variants={variants}
                  // initial="enter"
                  // animate="center"
                  // exit="exit"
                  // layoutId={activeMenu}
                  // layout
                  className=" grid grid-cols-1 gap-1 p-1"
                >
                  <DropdownBack goToMenu="main">Appearance</DropdownBack>
                  <RadioGroup value={theme} onChange={setTheme}>
                    <RadioGroup.Label className="sr-only">
                      Theme mode
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {themeOptions.map((theme) => (
                        <RadioGroup.Option
                          key={theme.name}
                          value={theme.theme}
                          className={({ active, checked }) =>
                            classNames(
                              'relative flex cursor-pointer rounded-lg px-2 py-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none dark:text-neutral-100 dark:hover:bg-neutral-700',
                              {
                                'ring-2': active,
                                'bg-white bg-opacity-75 text-slate-900 dark:bg-neutral-700 dark:text-slate-50':
                                  checked,
                              }
                            )
                          }
                        >
                          {({ checked }) => (
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-200 fill-neutral-700 focus:outline-none dark:bg-neutral-700 dark:fill-neutral-200">
                                  <theme.icon
                                    className="h-6 w-6 flex-shrink-0"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-4">
                                  <RadioGroup.Label
                                    as="p"
                                    className={'font-medium'}
                                  >
                                    {theme.name}
                                  </RadioGroup.Label>
                                  <p className={'text-xs text-neutral-400'}>
                                    {theme.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-shrink-0 text-white">
                                {checked ? (
                                  <CheckIcon className="h-6 w-6" />
                                ) : (
                                  <div className="h-6 w-6" />
                                )}
                              </div>
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default MainPanel
