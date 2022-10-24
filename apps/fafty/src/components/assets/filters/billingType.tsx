import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

export type BillingTypeValue = 'fixed_price' | 'auction' | null;

export const BILLING_TYPE_OPTIONS = [
  {
    title: 'All',
    value: null,
  },
  {
    title: 'Fixed price',
    value: 'fixed_price',
  },
  {
    title: 'Auction',
    value: 'auction',
  },
];

type Props = {
  value?: BillingTypeValue;
  onChange: (value: BillingTypeValue) => void;
};

export const BillingType = ({ value = null, onChange }: Props) => {
  return (
    <div className="flex px-2.5">
      <RadioGroup onChange={onChange} value={value}>
        {BILLING_TYPE_OPTIONS.map((billingOption) => (
          <RadioGroup.Option
            value={billingOption.value}
            key={billingOption.value}
          >
            {({ checked }) => (
              <div className="flex mb-2.5 items-center cursor-pointer">
                <div
                  className={classNames(
                    {
                      'flex items-center justify-center': checked,
                    },
                    'rounded-full w-4 h-4 mr-2.5 border border-blue-700 dark:border-gray-200'
                  )}
                >
                  <AnimatePresence>
                    {checked && (
                      <motion.div
                        className="flex rounded w-2 h-2 bg-blue-700 dark:bg-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-lg w-10 whitespace-nowrap">
                  {billingOption.title}
                </span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};
