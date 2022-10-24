import React, {
  useContext,
  Context,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { ContextProps } from '../types';
import { CheckIcon } from '@remixicons/react/fill';

const SelectStep4 = ({ Context }: { Context: Context<ContextProps> }) => {
  const { setStep4Answered, stepData, setStepData } =
    useContext<ContextProps>(Context);

  const [isLoading, setIsLoading] = useState(!stepData.step4.solved);
  const tm: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    if (isLoading) {
      tm.current && clearTimeout(tm.current);

      tm.current = setTimeout(() => {
        setIsLoading(false);
        setStep4Answered(true);
        setStepData({
          step4: {
            state: {
              is_checked: true,
            },
            solved: true,
            error: false,
          },
        });
      }, 1500);

      return () => {
        tm.current && clearTimeout(tm.current);
      };
    } else {
      setStep4Answered(true);
    }
  }, []);

  const renderStatus = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center">
          <span className="text-xl font-bold ">Checking asset...</span>
          <svg
            className="animate-spin ml-4 mr-3 text-white w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    return (
      <>
        <span className="text-xl font-bold ">Validation has been passed</span>
        <div className="flex mt-4 w-12 h-12 border border-green-600 rounded-full items-center justify-center">
          <CheckIcon className="w-6 h-6 fill-green-600" />
        </div>
      </>
    );
  }, [stepData?.step4?.solved, isLoading]);

  return (
    <div className="flex flex-col flex-1">
      <h3 className="text-xl font-bold">
        Verification
      </h3>
      <div className="my-5">
        <p className="text-sm">
          We will check to see if the file contains violations that could restrict its publication. If it turns out that the file does not meet the requirements, you can take action before it is published.
          <a className="block text-sm text-blue-600 font-semibold">
            Read more… 
          </a>
        </p>
      </div>
        
      <div className="flex space-beetwen items-center justify-center my-8">
        <div className="flex items-center justify-center">
          <div className="relative focus:outline-none flex items-center rounded-lg p-2 transition duration-150 ease-in-out text-neutral-700 bg-neutral-100 dark:text-neutral-100 dark:bg-neutral-700">
            <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full px-1 py-1 focus:outline-none bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:bg-neutral-600">
              <CheckIcon
                className="h-8 w-8 fill-green-600"
                strokeWidth="2"
                aria-hidden="true"
              />
            </div>
            <div className="ml-2 border-l border-gray-200 dark:border-neutral-500">
              <div className="ml-3">
                <p className="text-md font-medium">Copyright</p>
                <p className="text-xs text-neutral-400">
                  No violations found.
                </p>
              </div>
            </div>
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="w-full border-t border-gray-100 dark:border-neutral-700" />
      </div>
      <div>
        <p className="text-xs text-neutral-400">
          Keep in mind that only a preliminary check is carried out during the download phase. If there are violations in your file, they may be detected later.  
          
          <a className="ml-1 text-sm text-blue-600 font-semibold">
            Read more… 
          </a>
        </p>
      </div>
    </div>
  );
};

export default SelectStep4;
