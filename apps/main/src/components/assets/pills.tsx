import { useRouter } from 'next/router'
import qs from 'qs'
import { useMemo } from 'react'
import {
  BILLING_TYPE_OPTIONS,
  BillingTypeValue,
  PriceFiltersValue
} from './filters'
import { CloseIcon } from '@remixicons/react/fill'
import { FiltersValues } from '../../pages/assets'
import { motion } from 'framer-motion'

type Pill = {
  title: string
  value: keyof FiltersValues
}

type Props = {
  onClosePill: (key: keyof FiltersValues) => void
  onClearFilters: VoidFunction
}

export const Pills = ({ onClosePill, onClearFilters }: Props) => {
  const { asPath } = useRouter()

  const search = asPath.split('?')[1] || ''
  const params = qs.parse(search)

  const queryPills = useMemo(() => {
    return Object.keys(params).reduce((total, currentKey) => {
      if (currentKey === 'price') {
        const value = params[currentKey] as PriceFiltersValue

        if (value.currency) {
          let title = `${value.currency.toUpperCase()}`

          if (value.from) {
            title += ` min: ${value.from}`
          }

          if (value.to) {
            title += ` max: ${value.to}`
          }

          total.push({
            title,
            value: 'price'
          })
        }
      }

      if (currentKey === 'billing_type') {
        const value = params[currentKey] as BillingTypeValue
        if (value) {
          const optionTitle = BILLING_TYPE_OPTIONS.find(
            (option) => option.value === value
          )?.title

          total.push({
            title: `Billing type: ${optionTitle?.toLowerCase()}`,
            value: 'billing_type'
          })
        }
      }

      return total
    }, [] as Pill[])
  }, [params])

  const onClickPill = (value: keyof FiltersValues) => {
    onClosePill(value)
  }

  const variants = {
    visible: {
      height: 'auto',
      transition: {
        duration: 0.2,
        delay: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {
      height: 0,
      transition: {
        duration: 0.2,
        delay: 0.2,
        staggerChildren: 0.3,
        when: 'beforeChildren',
        staggerDirection: -1
      }
    }
  }

  const childVariants = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2
      }
    },
    hidden: {
      opacity: 0,
      className: 'pointer-events-none',
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }

  return (
    <div className="flex">
      <motion.div
        className="flex items-center gap-[8px]"
        initial={'hidden'}
        variants={variants}
        animate={queryPills?.length ? 'visible' : 'hidden'}
      >
        <motion.div
          className="flex min-h-[30px] flex-row items-center gap-[8px]"
          variants={childVariants}
        >
          {queryPills?.map(({ title, value }) => (
            <motion.div
              variants={childVariants}
              key={value}
              className="relative flex justify-between rounded-md border border-transparent bg-blue-600 p-1 pl-2 pr-7 text-center font-medium text-white hover:bg-blue-700"
            >
              {title}
              <div
                onClick={() => onClickPill(value)}
                className="absolute top-0 bottom-0 right-0 flex w-8 cursor-pointer items-center justify-center"
              >
                <CloseIcon className="h-5 w-5 fill-white" />
              </div>
            </motion.div>
          ))}
          {!!queryPills?.length && (
            <motion.div
              onClick={onClearFilters}
              className="cursor-pointer px-2.5 text-slate-900 dark:text-white"
            >
              Clear filters
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
