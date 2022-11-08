import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { BLOCKCHAIN_CHECKS } from './constants'
import { Checkbox } from '../../../../common/checkbox'
import { BlockchainValues } from './types'

type Props = {
  value: BlockchainValues[];
  onChange: (value: BlockchainValues[]) => void;
};

export const Blockchain = ({ value = [], onChange }: Props) => {
  const [localValue, setLocalValue] = useState<BlockchainValues[]>(value)

  const onChangeCheckbox = (checkboxValue) => () => {
    const isIncludes = localValue.includes(checkboxValue)

    if (isIncludes) {
      setLocalValue(
        localValue.filter((filterValue) => filterValue !== checkboxValue)
      )
    } else {
      setLocalValue([...localValue, checkboxValue])
    }
  }

  const onSaveFilters = () => {
    onChange(localValue)
  }

  return (
    <Transition
      as={Fragment}
      show
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div className="flex w-auto w-screen transform items-center sm:px-0">
        <div className="flex w-[150px] flex-col items-center overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 drop-shadow-lg dark:bg-neutral-800">
          <div className="flex w-full flex-col justify-start gap-2.5 p-3">
            {BLOCKCHAIN_CHECKS.map((check) => (
              <div className="flex" key={check.title}>
                <Checkbox
                  onChange={onChangeCheckbox(check.value)}
                  checked={localValue?.includes(
                    check.value as BlockchainValues
                  )}
                  title={check.title}
                  namespace={`filters_restrictions_assets_${check.title}`}
                />
              </div>
            ))}
          </div>
          <div className=" flex w-full justify-end border-t border-white p-1">
            <button
              type="button"
              className="relative mt-2 inline-block rounded-md border border-transparent bg-blue-600 py-1 px-3 text-center font-medium text-white hover:bg-blue-700"
              onClick={onSaveFilters}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}
