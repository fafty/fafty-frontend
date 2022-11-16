import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface StepbarProps {
  name: string
  active: boolean
  completed?: boolean
  optional?: boolean
  skipped?: boolean
  error?: boolean
}

interface Props {
  active: number
  disabled: boolean
  steps: StepbarProps[]
  setActive: (step: number) => void
}

/**
 * Stepbar component
 * @name StepsBar
 * @param {number} active - active step
 * @param {boolean} disabled - disable step
 * @param {StepbarProps[]} steps - steps
 * @param {(step: number) => void} setActive - set active step
 * @returns {JSX.Element} - Stepbar component
 * @example
 * <StepsBar active={active} disabled={disabled} steps={steps} setActive={setActive} />
 */
const StepsBar = ({
  active,
  disabled,
  steps,
  setActive
}: Props): JSX.Element => {
  return (
    <div className="w-full pb-4">
      <div className="flex w-full justify-center">
        {steps.map((step, index) => (
          <div className="w-1/4" key={index}>
            <div
              className={classNames(
                {
                  'text-blue-600': active === index
                },
                'text-center text-xs font-bold'
              )}
            >
              {step.name}
            </div>
            <div className="relative mt-2">
              {index !== 0 && (
                <div className="align-center absolute top-[50%] flex w-[calc(100%_-_1.5rem_-_1rem)] translate-x-[-50%] content-center items-center align-middle">
                  <div className="align-center w-full flex-1 items-center rounded bg-gray-200 align-middle">
                    <div
                      className={classNames(
                        {
                          'bg-blue-600': active >= index,
                          'bg-gray-200': active < index
                        },
                        'h-[2px] w-full rounded'
                      )}
                    ></div>
                  </div>
                </div>
              )}
              <div
                onClick={() => !disabled && setActive(index)}
                className={classNames(
                  {
                    'bg-blue-700': !step.error,
                    'bg-red-600': step.error
                  },
                  'mx-auto flex h-6 w-6 cursor-pointer items-center rounded-full  text-lg text-white'
                )}
              >
                {step.error ? (
                  <ExclamationCircleIcon
                    strokeWidth={2}
                    className="mx-auto h-5 w-5"
                  />
                ) : step.completed ? (
                  <CheckIcon strokeWidth={2} className="mx-auto h-4 w-4" />
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepsBar
