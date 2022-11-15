
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

interface Props {
  initial: number;
  hasError?: boolean;
  onChange: (value: number) => void;
}
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
      <div className="flex flex-row h-12 w-full item my-2 focus:outline-none cursor-pointer rounded overflow-hidden relative shadow ring-2 ring-blue-600 bg-white  bg-opacity-75 text-slate-900 dark:text-slate-50 dark:bg-neutral-700">
        <button
          type="button"
          title="Decrement"
          className="flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 dark:bg-neutral-900/90 h-full w-20 rounded-l cursor-pointer decoration-none"
          onClick={() => setValue(value > 1 ? value - 1 : 1)}
        >
          <div className="m-auto text-2xl align-center justify-center font-bold">
            <MinusIcon className="h6 w-6" strokeWidth={2} />
          </div>
        </button>
        <input
          type="number"
          title="Counter"
          className="border-transparent focus:border-transparent focus:ring-0 focus:ring-offset-0 outline-none text-blue-600 focus:outline-none text-center w-full font-semibold text-xl dark:bg-neutral-900/90 focus:text-blue-800 md:text-base cursor-default flex items-center decoration-none"
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
          className="flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 dark:bg-neutral-900/90 h-full w-20 rounded-r cursor-pointer decoration-none"
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
