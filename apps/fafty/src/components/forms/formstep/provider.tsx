import { useState, ReactNode, useEffect, useCallback } from 'react';
import Context, {
  CommentsModerationType,
  CommentsOrderType,
  SetStepDataProps,
} from './context';

export const StepperContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [step1Answered, setStep1Answered] = useState(false);
  const [step2Answered, setStep2Answered] = useState(false);
  const [step3Answered, setStep3Answered] = useState(false);

  const [step1Errored, setStep1Errored] = useState(false);
  const [step2Errored, setStep2Errored] = useState(false);
  const [step3Errored, setStep3Errored] = useState(false);

  const [finished, setFinished] = useState<boolean>(false);
  const [stepData, setStepData] = useState({
    asset: {
      id: '',
    },
    step1: {
      state: {
        name: '',
        description: null,
        unlockable_content: null,
        adult_content: false,
      },
      solved: false,
      error: false
    },
    step2: {
      state: {
        blockchain: 'dfinity',
        supply_units: 1,
        collection_token: '',
      },
      solved: false,
      error: false
    },
    step3: {
      state: {
        allow_ratings: true,
        comments_moderation: '' as CommentsModerationType,
        comments_order: 'newest' as CommentsOrderType,
        tags: [],
      },
      solved: false,
      error: false
    },
  });

  useEffect(() => {
    console.log('stepData in provider', stepData);
  }, [stepData]);

  const onSetStepData = useCallback(
    (data: SetStepDataProps) => {
      setStepData((prev) => ({ ...prev, ...data }));
    },
    [setStepData]
  );

  const contextValues = {
    step1Answered,
    setStep1Answered,
    step1Errored,
    setStep1Errored,
    step2Answered,
    setStep2Answered,
    step2Errored,
    setStep2Errored,
    step3Answered,
    setStep3Answered,
    step3Errored,
    setStep3Errored,
    finished,
    setFinished,
    stepData,
    setStepData: onSetStepData,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};
