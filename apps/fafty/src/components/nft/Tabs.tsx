import { Tab } from '@headlessui/react';
import { Dispatch, Fragment, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getSystemTheme, useTheme } from '@fafty-frontend/theme';

const TABS = [
  { title: 'Info', value: 'info' },
  { title: 'Owners', value: 'owners' },
  { title: 'History', value: 'history' },
  { title: 'Bids', value: 'bids' },
];

type Props = {
  tabIndex: number;
  setTabIndex: Dispatch<number>;
};

export const Tabs = ({ tabIndex, setTabIndex }: Props) => {
  const { theme } = useTheme();

  const isDarkMode = useMemo(() => {
    // FIXME Module '"@fafty-frontend/theme"' has no exported member 'getSystemTheme'.
    const currentTheme = theme === 'system' ? getSystemTheme() : theme;

    return currentTheme === 'dark';
  }, [theme]);

  const tabStyles = useMemo(() => {
    return {
      background: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
      text: isDarkMode ? 'rgb(55 65 81)' : 'rgb(249 250 251)',
    };
  }, [isDarkMode]);

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
      <div className="flex flex-col space-y-8 items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start w-full p-1 border-2 rounded-full border-gray-200 dark:border-neutral-700">
          <Tab.List>
            <div className="inline-flex space-x-2 items-start justify-start w-96 transition-[background-color] duration-100 ease-linear">
              {TABS.map((tab) => (
                <Tab as={Fragment} key={tab.value}>
                  {({ selected }) => (
                    <motion.div
                      className="flex items-center relative justify-center px-3 py-1.5 rounded-full outline-none cursor-pointer"
                      initial={{
                        color: selected ? tabStyles.text : '',
                      }}
                      animate={{
                        color: selected ? tabStyles.text : '',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="relative outline-none text-sm font-bold leading-none z-1">
                        {tab.title}
                      </span>
                      {selected && (
                        <motion.div
                          className="absolute w-full h-full rounded-full top-0 left-0 outline-none"
                          layoutId="selected"
                          initial={{
                            backgroundColor: tabStyles.background,
                          }}
                          animate={{
                            backgroundColor: tabStyles.background,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  )}
                </Tab>
              ))}
            </div>
          </Tab.List>
        </div>
      </div>
    </Tab.Group>
  );
};
