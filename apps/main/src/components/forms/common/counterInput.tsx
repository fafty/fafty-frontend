import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  initial: number
  hasError?: boolean
  onChange: (value: number) => void
}
/**
 * @name CounterInput
 * @description Counter input component with plus and minus buttons to increase or decrease the value by 1.
 * @param {Props} props
 * @param {number} props.initial - initial value
 * @param {boolean} props.hasError - has error
 * @param {Function} props.onChange - on change callback
 * @param {(value: number) => void} props.onChange - on change callback
 * @returns {JSX.Element} - CounterInput component
 * @example
 * <CounterInput initial={initial} hasError={hasError} onChange={onChange} />
 */
const CounterInput = ({ initial, onChange, hasError }: Props): JSX.Element => {
  const [value, setValue] = useState(initial)

  const emitOnChange = useCallback(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    emitOnChange()
  }, [emitOnChange])

  return (
    <div className="custom-number-input h-20 w-32">
      <div className="item relative my-2 flex h-12 w-full cursor-pointer flex-row overflow-hidden rounded bg-white bg-opacity-75 text-slate-900 shadow ring-2  ring-blue-600 focus:outline-none dark:bg-neutral-700 dark:text-slate-50">
        <button
          type="button"
          title="Decrement"
          className="decoration-none flex h-full w-20 cursor-pointer items-center justify-center rounded-l text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-neutral-900/90"
          onClick={() => setValue(value > 1 ? value - 1 : 1)}
        >
          <div className="align-center m-auto justify-center text-2xl font-bold">
            <MinusIcon className="h6 w-6" strokeWidth={2} />
          </div>
        </button>
        <input
          type="number"
          title="Counter"
          className="decoration-none flex w-full cursor-default items-center border-transparent text-center text-xl font-semibold text-blue-600 outline-none focus:border-transparent focus:text-blue-800 focus:outline-none focus:ring-0 focus:ring-offset-0 dark:bg-neutral-900/90 md:text-base"
          name="custom-input-number"
          value={value}
          min="1"
          {...(hasError && { 'aria-invalid': true })}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />
        <button
          onClick={() => setValue(value + 1)}
          type="button"
          title="Increment"
          className="decoration-none flex h-full w-20 cursor-pointer items-center justify-center rounded-r text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-neutral-900/90"
        >
          <div className="text-2xl font-bold">
            <PlusIcon className="h-6 w-6" strokeWidth={2} />
          </div>
        </button>
      </div>
    </div>
  )
}

export default CounterInput
