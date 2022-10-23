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
      <h4 className="font-bold">Check asset</h4>
      <div className="flex flex-col min-h-[250px] items-center justify-center">
        {renderStatus}
      </div>
    </div>
  );
};

export default SelectStep4;
