import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import classNames from "classnames";

interface StepbarProps {
  name: string;
  active: boolean;
  completed?: boolean;
  optional?: boolean;
  skipped?: boolean;
  error?: boolean;
}

interface Props {
  active: number
  steps: StepbarProps[]
  setActive: (step: number) => void
}

const StepsBar = ({ active, steps, setActive }: Props) => {
  return (
    <div className="w-full pb-4">
      <div className="flex justify-center w-full">
        {steps.map((step, index) => (
          <div className="w-1/4" key={index}>
            <div
              className={classNames(
                {
                  'text-blue-600': active === index,
                },
                "text-xs text-center font-bold"
              )}
            >
              {step.name}
            </div>
            <div className="relative mt-2">
              {index !== 0 && (
                <div
                  className="absolute top-[50%] translate-x-[-50%] flex align-center items-center align-middle content-center w-[calc(100%_-_1.5rem_-_1rem)]"
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className={classNames(
                        {
                          'bg-blue-600': active >= index,
                          'bg-gray-200': active < index,
                        },
                        "w-full h-[2px] rounded"
                      )}
                    ></div>
                  </div>
                </div>
              )}
              <div
                onClick={() => setActive(index)}
                className={classNames(
                  {
                    'bg-blue-700': !step.error,
                    'bg-red-600': step.error,
                  },
                  "w-6 h-6 mx-auto cursor-pointer text-white rounded-full text-lg  flex items-center"
                )}
              >
                {step.completed && (
                  <CheckIcon strokeWidth={2} className="w-4 h-4 mx-auto" />
                )}
                {step.error && (
                  <ExclamationCircleIcon
                    strokeWidth={2}
                    className="w-5 h-5 mx-auto"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsBar;
