import {
  useState,
  useEffect,
  SVGProps,
  ReactNode,
  ComponentProps,
  Fragment,
} from 'react';
import { Transition, RadioGroup } from '@headlessui/react';
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
} from '@heroicons/react/24/outline';
import { BrushIcon } from '@remixicons/react/line';
import { useTheme } from '@fafty-frontend/theme';
import classNames from 'classnames';
import Link from 'next/link';
import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
  motion,
} from 'framer-motion';

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
];

// const variants = {
//   visible: (custom) => ({
//     opacity: 1,
//     transition: { delay: custom * 0.2 }
//   })
// }

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
    }
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
    }
  }),
};

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
  );
}

const MainPanel = ({
  open,
  close,
  onLogOut,
}: {
  open: boolean;
  close: boolean;
  onLogOut: () => void;
}): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState('main');
  const { theme, setTheme } = useTheme();
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setActiveMenu('main');
  }, [close]);

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
            className="w-full rounded-full px-1 py-1 focus:outline-none text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 dark:text-neutral-200 dark:fill-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
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
            className="text-base font-bold text-slate-900 dark:text-slate-50 ml-3"
            dir="auto"
          >
            {props.children}
          </h3>
        </div>
      </div>
    );
  };
  const goTo = (goToMenu: string | undefined) => {
    if (goToMenu === 'main') {
      setDirection(-1);
    } else {
      setDirection(1);
    }
    goToMenu && setActiveMenu(goToMenu);
  };
  const DropdownItem = (props: DropdownItemOrBackProps): JSX.Element => {
    const {
      children,
      goToMenu,
      onClick,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
    } = props;

    return (
      <a
        className="cursor-pointer focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
        onClick={() => (goToMenu ? goTo(goToMenu) : onClick?.())}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:fill-neutral-200 dark:bg-neutral-700">
          {LeftIcon && (
            <LeftIcon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />
          )}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium">{children}</p>
        </div>
        <div className="justify-end ml-auto">
          {RightIcon && (
            <RightIcon className="h-6 w-6" strokeWidth="2" aria-hidden="true" />
          )}
        </div>
      </a>
    );
  };
  return (
    <AnimateSharedLayout>
      <motion.div layout={true} animate={{height: 'auto'}} className="relative p-2 rounded-lg text-gray-500 dark:text-gray-500 bg-white dark:bg-neutral-800 overflow-hidden">
      <AnimatePresence
        initial={false}
        exitBeforeEnter={false}
        custom={{ direction: direction, activeMenu: activeMenu }}
      >
          <motion.div
            layoutTransition
            // layout={false}
            key={activeMenu}
            custom={{ direction: direction, menu: activeMenu }}
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
                className="relative grid gap-1 p-1 grid-cols-1"
              >
                <Link href={'/profile'}>
                  <a className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-blue-600 rounded-full hover:bg-blue-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                      <img
                        className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-1"
                        src="https://avatars.githubusercontent.com/u/3300389?v=4"
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Andrew Zhuk</p>
                      <p className="text-xs text-neutral-400">
                        See your profile
                      </p>
                    </div>
                  </a>
                </Link>
                <div className="py-2">
                  <div className="w-full border-t border-gray-100 dark:border-neutral-700"></div>
                </div>
                <a className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:bg-neutral-700">
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
                </a>
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
                className="relative grid gap-1 p-1 grid-cols-1"
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
                className=" grid gap-1 p-1 grid-cols-1"
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
                className=" grid gap-1 p-1 grid-cols-1"
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
                            'focus:outline-none relative flex cursor-pointer rounded-lg px-2 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700',
                            {
                              'ring-2': active,
                              'bg-white bg-opacity-75 text-slate-900 dark:text-slate-50 dark:bg-neutral-700':
                                checked,
                            }
                          )
                        }
                      >
                        {({ checked }) => (
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full focus:outline-none bg-neutral-200 fill-neutral-700 dark:fill-neutral-200 dark:bg-neutral-700">
                                <theme.icon
                                  className="flex-shrink-0 h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium`}
                                >
                                  {theme.name}
                                </RadioGroup.Label>
                                <p className={`text-xs text-neutral-400`}>
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
      </motion.div>
      </AnimateSharedLayout>
  );
};

export default MainPanel;
