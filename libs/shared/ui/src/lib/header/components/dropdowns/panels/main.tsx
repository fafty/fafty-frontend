import {useState, useEffect, SVGProps, ReactNode, ComponentProps} from 'react';
import { Transition, RadioGroup } from '@headlessui/react';
import {
  AnnotationIcon,
  CogIcon,
  MenuIcon,
  MoonIcon,
  ArrowSmLeftIcon,
  ChevronRightIcon,
  LogoutIcon,
  SunIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import { BrushIcon } from '@remixicons/react/line';
import { useTheme } from '@fafty-frontend/theme';
import classNames from 'classnames';
import Link from "next/link";

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

const MainPanel = ({ open, close }: { open: boolean, close: boolean }): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [beforeMenu, setBeforeMenu] = useState('');

  const [mainMenuEnterFrom, setMainMenuEnterFrom] = useState('');
  const [menuHeight, setMenuHeight] = useState(270);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setActiveMenu('main');
  }, [close]);

  useEffect(() => {
    activeMenu == 'main' && beforeMenu !== '' && setMainMenuEnterFrom('transform -translate-x-[110%] opacity-0');
  }, [activeMenu, beforeMenu])

  interface DropdownItemOrBackProps {
    children: ReactNode
    goToMenu?: string
    leftIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
    rightIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
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
            <ArrowSmLeftIcon
              className="h-6 w-6"
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
  }
  const goTo = (goToMenu: string | undefined) => {
    setBeforeMenu(activeMenu);
    goToMenu && setActiveMenu(goToMenu);
  }
  const DropdownItem = (props: DropdownItemOrBackProps): JSX.Element => {
    const {children, goToMenu, leftIcon: LeftIcon, rightIcon: RightIcon} = props;

    return (
      <a
        className="cursor-pointer focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
        onClick={() => goTo(goToMenu)}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:fill-neutral-200 dark:bg-neutral-700">
          {LeftIcon && (<LeftIcon className="h-6 w-6" aria-hidden="true" /> )}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium">{children}</p>
        </div>
        <div className="justify-end ml-auto">
          {RightIcon && (<RightIcon className="h-6 w-6" aria-hidden="true" /> )}
        </div>
      </a>
    );
  }
  return (
      <div
        style={{height: menuHeight}}
        className="relative overflow-hidden transition-[height] duration-200 p-2 rounded-lg text-gray-500 dark:text-gray-500 bg-white dark:bg-neutral-800"
      >
        <Transition
          as="div"
          show={activeMenu == 'main'}
          appear={true}
          beforeEnter={() => setMenuHeight(420)}
          enterFrom={mainMenuEnterFrom}
          enterTo="transform translate-x-0 opacity-1"
          leaveFrom="transform translate-x-0 opacity-1"
          leaveTo="transform -translate-x-[110%] opacity-0"
          className="absolute w-[19rem] transition duration-200 ease-in-out"
        >
          <div className="relative grid gap-1 p-1 grid-cols-1">
            <Link href={'/profile'}>
              <a
                className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-blue-600 rounded-full hover:bg-blue-500 px-1 py-1 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  <img
                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white m-1"
                    src="https://avatars.githubusercontent.com/u/3300389?v=4"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Andrew Zhuk</p>
                  <p className="text-xs text-neutral-400">See your profile</p>
                </div>
              </a>
            </Link>
            <div className="py-2">
              <div className="w-full border-t border-gray-100 dark:border-neutral-700"></div>
            </div>
            <a
              className="focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
              <div
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:bg-neutral-700">
                <AnnotationIcon className="h-6 w-6" aria-hidden="true"/>
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
            <DropdownItem leftIcon={LogoutIcon}>Disconnect</DropdownItem>
          </div>
        </Transition>
        <Transition
          as="div"
          show={activeMenu === 'settings'}
          beforeEnter={() => setMenuHeight(320)}
          enter="transition duration-200 ease-in-out"
          enterFrom="transform translate-x-[110%]"
          enterTo="transform translate-x-0"
          leave="transition duration-200 ease-in-out"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-[110%]"
          className="absolute w-[19rem] bg-white dark:bg-neutral-800"
        >
          <div className="relative grid gap-1 p-1 grid-cols-1">
            <DropdownBack goToMenu="main">Settings</DropdownBack>
            <DropdownItem leftIcon={MenuIcon}>HTML</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>CSS</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>JavaScript</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>Awesome!</DropdownItem>
          </div>
        </Transition>
        <Transition
          as="div"
          show={activeMenu === 'help'}
          beforeEnter={() => setMenuHeight(320)}
          enter="transition duration-200 ease-in-out"
          enterFrom="transform translate-x-[110%]"
          enterTo="transform translate-x-0"
          leave="transition duration-200 ease-in-out"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-[110%]"
          className="absolute w-[19rem] bg-white dark:bg-neutral-800"
        >
          <div className="relative grid gap-1 p-1 grid-cols-1">
            <DropdownBack goToMenu="main">Display & Accessibility</DropdownBack>
            <DropdownItem leftIcon={MenuIcon}>HTML</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>CSS</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>JavaScript</DropdownItem>
            <DropdownItem leftIcon={MenuIcon}>Awesome!</DropdownItem>
          </div>
        </Transition>
        <Transition
          as="div"
          show={activeMenu === 'appearance'}
          beforeEnter={() => setMenuHeight(345)}
          enter="transition duration-200 ease-in-out"
          enterFrom="transform translate-x-[110%]"
          enterTo="transform translate-x-0"
          leave="transition duration-200 ease-in-out"
          leaveFrom="transform translate-x-0"
          leaveTo="transform translate-x-[110%]"
          className="absolute w-[19rem] bg-white dark:bg-neutral-800"
        >
          <div className="relative grid gap-1 p-1 grid-cols-1">
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
                    className={({active, checked}) =>
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
                          <div
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full focus:outline-none bg-neutral-200 fill-neutral-700 dark:fill-neutral-200 dark:bg-neutral-700">
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
                            <CheckIcon className="h-6 w-6"/>
                          ) : (
                            <div className="h-6 w-6"/>
                          )}
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </Transition>
      </div>
  );
};

export default MainPanel;
