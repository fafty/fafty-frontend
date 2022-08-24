import { useState, ReactNode, useEffect } from 'react';
import Context, { ContextProps, StepsProps } from './context';

export const StepperContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [step1Answered, setStep1Answered] = useState(false);
  const [step2Answered, setStep2Answered] = useState(false);
  const [step3Answered, setStep3Answered] = useState(false);

  // const [pendingSave, setPendingSave] = useState(false);

  const [finished, setFinished] = useState<boolean>(false);
  const [stepData, setStepData] = useState({
    asset: {},
    step1: {
      state: {
        name: '' ,
        description: {},
        unlockable_content: {},
        adult_content: false,
      },
      solved: false,
    },
    step2: {
      state: {
        blockchain_name: 'dfinity',
        supply_units: 1,
        collection_token: 'none',
      },
      solved: false,
    },
    step3: {
      state: { citizens: 0, age: 0 },
      solved: false,
    },
  });

  useEffect(() => {
    console.log('stepData in provider', stepData)
  }, [stepData])

  const contextValues = {    	
		step1Answered,
    setStep1Answered,
		step2Answered,
    setStep2Answered,
		step3Answered,
    setStep3Answered,
	  finished,
    setFinished,
	  stepData,
    setStepData
	};

  return (<Context.Provider value={contextValues}>{children}</Context.Provider>);
};
