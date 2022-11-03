import { Tab } from '@headlessui/react'
import { Dispatch, Fragment, useMemo } from 'react'
import { motion } from 'framer-motion'
import { getSystemTheme, useTheme } from '@fafty/shared/theme'

type TabType = {
  title: string;
  value: string;
};

type TabsProps = {
  tabIndex: number;
  setTabIndex: Dispatch<number>;
  tabs: TabType[];
};

const Tabs = ({ tabIndex, setTabIndex, tabs }: TabsProps) => {
  const { theme } = useTheme()

  const tabsTitlesId = useMemo(() => {
    return tabs.map(({ title }) => title).join('_')
  }, [tabs])

  const isDarkMode = useMemo(() => {
    // FIXME Module '"@fafty/theme"' has no exported member 'getSystemTheme'.
    const currentTheme = theme === 'system' ? getSystemTheme() : theme

    return currentTheme === 'dark'
  }, [theme])

  const tabStyles = useMemo(() => {
    return {
      background: isDarkMode ? 'rgb(249 250 251)' : 'rgb(55 65 81)',
      text: isDarkMode ? 'rgb(55 65 81)' : 'rgb(249 250 251)',
    }
  }, [isDarkMode])

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
      <div className="flex w-full flex-col items-start justify-start space-y-8">
        <div className="flex w-full flex-col items-start justify-start rounded-full border-2 border-gray-200 p-1 dark:border-neutral-700">
          <Tab.List>
            <div className="inline-flex items-start justify-start space-x-2 overflow-hidden">
              {tabs.map((tab) => (
                <Tab as={Fragment} key={tab.value}>
                  {({ selected }) => (
                    <motion.div
                      className="relative flex cursor-pointer items-center justify-center rounded-full px-3 py-1.5 outline-none"
                      initial={{
                        color: selected ? tabStyles.text : '',
                      }}
                      animate={{
                        color: selected ? tabStyles.text : '',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="z-1 relative text-sm font-bold leading-none outline-none">
                        {tab.title}
                      </span>
                      {selected && (
                        <motion.div
                          className="absolute top-0 left-0 h-full w-full rounded-full outline-none"
                          layoutId={tabsTitlesId}
                          initial={{
                            opacity: 0,
                            backgroundColor: 'transparent',
                          }}
                          animate={{
                            opacity: 1,
                            backgroundColor: tabStyles.background,
                          }}
                          transition={{ duration: 0.3, staggerDirection: -1 }}
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
  )
}

export default Tabs
